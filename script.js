// ===================================
// Global Variables & Configuration
// ===================================
const CONFIG = {
    IMGBB_API_KEY: 'f1e285f7990c85b05f85900d9d10238d',
    IMGBB_ENDPOINT: 'https://api.imgbb.com/1/upload',
    MAX_FILE_SIZE: 32 * 1024 * 1024, // 32MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/bmp']
};

let currentImage = null;
let allMetadata = {};

// ===================================
// DOM Elements
// ===================================
const elements = {
    privacyBanner: document.getElementById('privacyBanner'),
    closeBanner: document.getElementById('closeBanner'),
    themeToggle: document.getElementById('themeToggle'),
    uploadZone: document.getElementById('uploadZone'),
    fileInput: document.getElementById('fileInput'),
    loadingSpinner: document.getElementById('loadingSpinner'),
    loadingText: document.getElementById('loadingText'),
    resultsSection: document.getElementById('resultsSection'),
    gpsWarning: document.getElementById('gpsWarning'),
    copyAllBtn: document.getElementById('copyAllBtn'),
    downloadJsonBtn: document.getElementById('downloadJsonBtn'),
    newUploadBtn: document.getElementById('newUploadBtn'),
    tabs: document.querySelectorAll('.tab'),
    tabPanels: document.querySelectorAll('.tab-panel')
};

// ===================================
// Initialization
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    initializeTheme();
});

function initializeEventListeners() {
    // Privacy banner
    elements.closeBanner?.addEventListener('click', () => {
        elements.privacyBanner.style.display = 'none';
        localStorage.setItem('privacyBannerClosed', 'true');
    });
    
    if (localStorage.getItem('privacyBannerClosed')) {
        elements.privacyBanner.style.display = 'none';
    }
    
    // Theme toggle
    elements.themeToggle?.addEventListener('click', toggleTheme);
    
    // Upload zone
    elements.uploadZone?.addEventListener('click', () => elements.fileInput.click());
    elements.uploadZone?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            elements.fileInput.click();
        }
    });
    
    // Drag and drop
    elements.uploadZone?.addEventListener('dragover', handleDragOver);
    elements.uploadZone?.addEventListener('dragleave', handleDragLeave);
    elements.uploadZone?.addEventListener('drop', handleDrop);
    
    // File input
    elements.fileInput?.addEventListener('change', handleFileSelect);
    
    // Action buttons
    elements.copyAllBtn?.addEventListener('click', copyAllMetadata);
    elements.downloadJsonBtn?.addEventListener('click', downloadMetadataJson);
    elements.newUploadBtn?.addEventListener('click', resetUpload);
    
    // Tabs
    elements.tabs.forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ===================================
// Theme Management
// ===================================
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = elements.themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ===================================
// File Upload Handlers
// ===================================
function handleDragOver(e) {
    e.preventDefault();
    elements.uploadZone.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.preventDefault();
    elements.uploadZone.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    elements.uploadZone.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        processFile(files[0]);
    }
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        processFile(file);
    }
}

// ===================================
// File Processing
// ===================================
async function processFile(file) {
    // Validate file
    if (!validateFile(file)) {
        return;
    }
    
    currentImage = file;
    showLoading('Uploading image to ImgBB...');
    
    try {
        // Upload to ImgBB
        const imgbbUrl = await uploadToImgBB(file);
        
        // Extract all metadata
        showLoading('Extracting metadata...');
        await extractAllMetadata(file, imgbbUrl);
        
        // Display results
        hideLoading();
        displayResults();
        
    } catch (error) {
        console.error('Processing error:', error);
        hideLoading();
        showError('Failed to process image: ' + error.message);
    }
}

function validateFile(file) {
    if (!CONFIG.ALLOWED_TYPES.includes(file.type)) {
        showError('Invalid file type. Please upload an image (JPG, PNG, GIF, WEBP, BMP).');
        return false;
    }
    
    if (file.size > CONFIG.MAX_FILE_SIZE) {
        showError('File size exceeds 32MB limit.');
        return false;
    }
    
    return true;
}

// ===================================
// ImgBB Upload
// ===================================
async function uploadToImgBB(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = async function(e) {
            const base64String = e.target.result.split(',')[1];
            
            const formData = new FormData();
            formData.append('key', CONFIG.IMGBB_API_KEY);
            formData.append('image', base64String);
            formData.append('name', file.name);
            
            try {
                const response = await fetch(CONFIG.IMGBB_ENDPOINT, {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                if (data.success) {
                    resolve(data.data.url);
                } else {
                    reject(new Error('ImgBB upload failed'));
                }
            } catch (error) {
                reject(error);
            }
        };
        
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
    });
}

// ===================================
// Metadata Extraction
// ===================================
async function extractAllMetadata(file, imageUrl) {
    allMetadata = {
        file: {},
        image: {},
        camera: {},
        location: {},
        colors: {},
        text: {},
        technical: {}
    };
    
    // File Information
    await extractFileMetadata(file);
    
    // Image Properties & EXIF
    await extractImageMetadata(file);
    
    // Color Analysis
    await extractColorMetadata(imageUrl);
    
    // OCR Text Extraction
    await extractTextMetadata(imageUrl);
    
    // QR Code Detection
    await extractQRMetadata(file);
    
    return allMetadata;
}

// File Metadata
async function extractFileMetadata(file) {
    allMetadata.file = {
        filename: file.name,
        file_size: formatBytes(file.size),
        mime_type: file.type,
        last_modified: new Date(file.lastModified).toLocaleString(),
        sha256_hash: await calculateSHA256(file)
    };
}

// Image Properties & EXIF
async function extractImageMetadata(file) {
    try {
        // Get basic image dimensions
        const img = await createImageElement(file);
        
        allMetadata.image = {
            width: img.naturalWidth + 'px',
            height: img.naturalHeight + 'px',
            aspect_ratio: (img.naturalWidth / img.naturalHeight).toFixed(2),
            has_alpha: await hasAlphaChannel(file)
        };
        
        // Extract EXIF data using exifr
        if (typeof exifr !== 'undefined') {
            try {
                const exifData = await exifr.parse(file, {
                    tiff: true,
                    exif: true,
                    gps: true,
                    interop: true,
                    ifd0: true,
                    ifd1: true
                });
                
                if (exifData) {
                    // Camera & EXIF
                    allMetadata.camera = {
                        make: exifData.Make || 'N/A',
                        model: exifData.Model || 'N/A',
                        lens: exifData.LensModel || 'N/A',
                        exposure_time: exifData.ExposureTime ? `1/${Math.round(1/exifData.ExposureTime)}s` : 'N/A',
                        iso: exifData.ISO || 'N/A',
                        aperture: exifData.FNumber ? `f/${exifData.FNumber}` : 'N/A',
                        focal_length: exifData.FocalLength ? `${exifData.FocalLength}mm` : 'N/A',
                        flash: exifData.Flash !== undefined ? (exifData.Flash ? 'Fired' : 'Not Fired') : 'N/A',
                        software: exifData.Software || 'N/A',
                        capture_date: exifData.DateTimeOriginal ? new Date(exifData.DateTimeOriginal).toLocaleString() : 'N/A'
                    };
                    
                    // Location (GPS)
                    if (exifData.latitude && exifData.longitude) {
                        allMetadata.location = {
                            latitude: exifData.latitude.toFixed(6),
                            longitude: exifData.longitude.toFixed(6),
                            altitude: exifData.GPSAltitude ? `${exifData.GPSAltitude}m` : 'N/A',
                            has_gps: true
                        };
                    } else {
                        allMetadata.location = {
                            latitude: 'N/A',
                            longitude: 'N/A',
                            altitude: 'N/A',
                            has_gps: false
                        };
                    }
                    
                    // Technical Details
                    allMetadata.technical = {
                        orientation: exifData.Orientation || 'N/A',
                        color_space: exifData.ColorSpace === 1 ? 'sRGB' : exifData.ColorSpace || 'N/A',
                        compression: exifData.Compression || 'N/A',
                        x_resolution: exifData.XResolution ? `${exifData.XResolution} dpi` : 'N/A',
                        y_resolution: exifData.YResolution ? `${exifData.YResolution} dpi` : 'N/A'
                    };
                }
            } catch (exifError) {
                console.warn('EXIF extraction failed:', exifError);
                setDefaultCameraMetadata();
            }
        } else {
            setDefaultCameraMetadata();
        }
        
        allMetadata.image.preview_url = URL.createObjectURL(file);
        
    } catch (error) {
        console.error('Image metadata extraction error:', error);
        setDefaultCameraMetadata();
    }
}

function setDefaultCameraMetadata() {
    allMetadata.camera = {
        make: 'N/A',
        model: 'N/A',
        lens: 'N/A',
        exposure_time: 'N/A',
        iso: 'N/A',
        aperture: 'N/A',
        focal_length: 'N/A',
        flash: 'N/A',
        software: 'N/A',
        capture_date: 'N/A'
    };
    
    allMetadata.location = {
        latitude: 'N/A',
        longitude: 'N/A',
        altitude: 'N/A',
        has_gps: false
    };
    
    allMetadata.technical = {
        orientation: 'N/A',
        color_space: 'N/A',
        compression: 'N/A',
        x_resolution: 'N/A',
        y_resolution: 'N/A'
    };
}

// Color Analysis
async function extractColorMetadata(imageUrl) {
    try {
        if (typeof Vibrant !== 'undefined') {
            const vibrant = new Vibrant(imageUrl);
            const palette = await vibrant.getPalette();
            
            const colors = [];
            for (const [name, swatch] of Object.entries(palette)) {
                if (swatch) {
                    colors.push({
                        name: name,
                        hex: swatch.getHex(),
                        rgb: swatch.getRgb(),
                        population: swatch.getPopulation()
                    });
                }
            }
            
            allMetadata.colors = {
                palette: colors,
                dominant_color: colors[0]?.hex || 'N/A',
                total_colors: colors.length
            };
            
            // Calculate average color and brightness
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = imageUrl;
            await img.decode();
            
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const { avgColor, brightness } = analyzeImageData(imageData);
            
            allMetadata.colors.average_color = avgColor;
            allMetadata.colors.brightness = brightness;
            
        } else {
            allMetadata.colors = {
                palette: [],
                dominant_color: 'N/A',
                total_colors: 0,
                average_color: 'N/A',
                brightness: 'N/A'
            };
        }
    } catch (error) {
        console.error('Color extraction error:', error);
        allMetadata.colors = {
            palette: [],
            dominant_color: 'N/A',
            total_colors: 0
        };
    }
}

// OCR Text Extraction
async function extractTextMetadata(imageUrl) {
    try {
        if (typeof Tesseract !== 'undefined') {
            showLoading('Extracting text (OCR)...');
            
            const { data } = await Tesseract.recognize(imageUrl, 'eng', {
                logger: m => console.log(m)
            });
            
            allMetadata.text = {
                ocr_text: data.text.trim() || 'No text detected',
                confidence: `${Math.round(data.confidence)}%`,
                word_count: data.words.length
            };
        } else {
            allMetadata.text = {
                ocr_text: 'OCR library not loaded',
                confidence: 'N/A',
                word_count: 0
            };
        }
    } catch (error) {
        console.error('OCR error:', error);
        allMetadata.text = {
            ocr_text: 'OCR failed',
            confidence: 'N/A',
            word_count: 0
        };
    }
}

// QR Code Detection
async function extractQRMetadata(file) {
    try {
        const img = await createImageElement(file);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        ctx.drawImage(img, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        if (typeof jsQR !== 'undefined') {
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            
            if (code) {
                allMetadata.text.qr_code = code.data;
                allMetadata.text.qr_location = `(${code.location.topLeftCorner.x}, ${code.location.topLeftCorner.y})`;
            } else {
                allMetadata.text.qr_code = 'No QR code detected';
                allMetadata.text.qr_location = 'N/A';
            }
        } else {
            allMetadata.text.qr_code = 'QR scanner not loaded';
            allMetadata.text.qr_location = 'N/A';
        }
    } catch (error) {
        console.error('QR detection error:', error);
        allMetadata.text.qr_code = 'QR detection failed';
        allMetadata.text.qr_location = 'N/A';
    }
}

// ===================================
// Helper Functions
// ===================================
async function calculateSHA256(file) {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    } catch (error) {
        console.error('SHA-256 calculation error:', error);
        return 'N/A';
    }
}

function createImageElement(file) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);
        
        img.onload = () => {
            URL.revokeObjectURL(url);
            resolve(img);
        };
        
        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Failed to load image'));
        };
        
        img.src = url;
    });
}

async function hasAlphaChannel(file) {
    try {
        const img = await createImageElement(file);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = 1;
        canvas.height = 1;
        ctx.drawImage(img, 0, 0, 1, 1);
        
        const imageData = ctx.getImageData(0, 0, 1, 1);
        return imageData.data[3] < 255 ? 'Yes' : 'No';
    } catch {
        return 'Unknown';
    }
}

function analyzeImageData(imageData) {
    const data = imageData.data;
    let totalR = 0, totalG = 0, totalB = 0;
    let totalBrightness = 0;
    const pixelCount = data.length / 4;
    
    for (let i = 0; i < data.length; i += 4) {
        totalR += data[i];
        totalG += data[i + 1];
        totalB += data[i + 2];
        totalBrightness += (data[i] + data[i + 1] + data[i + 2]) / 3;
    }
    
    const avgR = Math.round(totalR / pixelCount);
    const avgG = Math.round(totalG / pixelCount);
    const avgB = Math.round(totalB / pixelCount);
    const brightness = Math.round((totalBrightness / pixelCount / 255) * 100);
    
    return {
        avgColor: `rgb(${avgR}, ${avgG}, ${avgB})`,
        brightness: `${brightness}%`
    };
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// ===================================
// Display Results
// ===================================
function displayResults() {
    // Show results section
    elements.resultsSection.classList.remove('hidden');
    elements.resultsSection.scrollIntoView({ behavior: 'smooth' });
    
    // Show GPS warning if location data exists
    if (allMetadata.location.has_gps) {
        elements.gpsWarning.classList.remove('hidden');
    }
    
    // Populate each metadata panel
    populateFileMetadata();
    populateImageMetadata();
    populateCameraMetadata();
    populateLocationMetadata();
    populateColorsMetadata();
    populateTextMetadata();
    populateTechnicalMetadata();
}

function populateFileMetadata() {
    const container = document.getElementById('fileMetadata');
    container.innerHTML = '';
    
    for (const [key, value] of Object.entries(allMetadata.file)) {
        if (key !== 'sha256_hash') {
            container.appendChild(createMetadataItem(formatLabel(key), value));
        } else {
            container.appendChild(createMetadataItem(formatLabel(key), value, true));
        }
    }
}

function populateImageMetadata() {
    const container = document.getElementById('imageMetadata');
    const previewContainer = document.getElementById('imagePreview');
    
    container.innerHTML = '';
    previewContainer.innerHTML = '';
    
    // Add image preview
    if (allMetadata.image.preview_url) {
        const img = document.createElement('img');
        img.src = allMetadata.image.preview_url;
        img.alt = 'Uploaded image preview';
        previewContainer.appendChild(img);
    }
    
    for (const [key, value] of Object.entries(allMetadata.image)) {
        if (key !== 'preview_url') {
            container.appendChild(createMetadataItem(formatLabel(key), value));
        }
    }
}

function populateCameraMetadata() {
    const container = document.getElementById('cameraMetadata');
    container.innerHTML = '';
    
    for (const [key, value] of Object.entries(allMetadata.camera)) {
        container.appendChild(createMetadataItem(formatLabel(key), value));
    }
}

function populateLocationMetadata() {
    const container = document.getElementById('locationMetadata');
    const mapContainer = document.getElementById('mapContainer');
    
    container.innerHTML = '';
    mapContainer.innerHTML = '';
    
    // Add map if GPS data exists
    if (allMetadata.location.has_gps) {
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${allMetadata.location.longitude},${allMetadata.location.latitude},${allMetadata.location.longitude},${allMetadata.location.latitude}&layer=mapnik&marker=${allMetadata.location.latitude},${allMetadata.location.longitude}`;
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('loading', 'lazy');
        mapContainer.appendChild(iframe);
    } else {
        mapContainer.innerHTML = '<p style="text-align: center; padding: 2rem; color: var(--text-tertiary);">No GPS data available</p>';
    }
    
    for (const [key, value] of Object.entries(allMetadata.location)) {
        if (key !== 'has_gps') {
            container.appendChild(createMetadataItem(formatLabel(key), value));
        }
    }
}

function populateColorsMetadata() {
    const container = document.getElementById('colorsMetadata');
    const paletteContainer = document.getElementById('colorPalette');
    
    container.innerHTML = '';
    paletteContainer.innerHTML = '';
    
    // Display color palette
    if (allMetadata.colors.palette && allMetadata.colors.palette.length > 0) {
        allMetadata.colors.palette.forEach(color => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch';
            swatch.style.backgroundColor = color.hex;
            swatch.textContent = color.hex;
            swatch.title = `${color.name}: ${color.hex}`;
            swatch.addEventListener('click', () => {
                navigator.clipboard.writeText(color.hex);
                showNotification('Color copied: ' + color.hex);
            });
            paletteContainer.appendChild(swatch);
        });
    }
    
    // Display color metadata
    const colorData = {
        dominant_color: allMetadata.colors.dominant_color,
        average_color: allMetadata.colors.average_color,
        brightness: allMetadata.colors.brightness,
        total_colors: allMetadata.colors.total_colors
    };
    
    for (const [key, value] of Object.entries(colorData)) {
        if (value && value !== 'N/A') {
            container.appendChild(createMetadataItem(formatLabel(key), value));
        }
    }
}

function populateTextMetadata() {
    const container = document.getElementById('textMetadata');
    container.innerHTML = '';
    
    for (const [key, value] of Object.entries(allMetadata.text)) {
        if (key === 'ocr_text') {
            const item = createMetadataItem(formatLabel(key), value);
            item.querySelector('.metadata-value').style.whiteSpace = 'pre-wrap';
            item.querySelector('.metadata-value').style.fontFamily = 'var(--font-mono)';
            container.appendChild(item);
        } else {
            container.appendChild(createMetadataItem(formatLabel(key), value));
        }
    }
}

function populateTechnicalMetadata() {
    const container = document.getElementById('technicalMetadata');
    container.innerHTML = '';
    
    for (const [key, value] of Object.entries(allMetadata.technical)) {
        container.appendChild(createMetadataItem(formatLabel(key), value));
    }
}

function createMetadataItem(label, value, isMono = false) {
    const item = document.createElement('div');
    item.className = 'metadata-item';
    
    const labelElem = document.createElement('div');
    labelElem.className = 'metadata-label';
    labelElem.textContent = label;
    
    const valueElem = document.createElement('div');
    valueElem.className = 'metadata-value' + (isMono ? ' mono' : '');
    valueElem.textContent = value;
    
    item.appendChild(labelElem);
    item.appendChild(valueElem);
    
    return item;
}

function formatLabel(key) {
    return key
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// ===================================
// Tab Switching
// ===================================
function switchTab(tabName) {
    // Update tab buttons
    elements.tabs.forEach(tab => {
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
        } else {
            tab.classList.remove('active');
            tab.setAttribute('aria-selected', 'false');
        }
    });
    
    // Update tab panels
    elements.tabPanels.forEach(panel => {
        if (panel.id === `${tabName}-panel`) {
            panel.classList.add('active');
        } else {
            panel.classList.remove('active');
        }
    });
}

// ===================================
// Action Buttons
// ===================================
function copyAllMetadata() {
    const text = JSON.stringify(allMetadata, null, 2);
    navigator.clipboard.writeText(text).then(() => {
        showNotification('All metadata copied to clipboard!');
    }).catch(err => {
        console.error('Copy failed:', err);
        showNotification('Failed to copy metadata', 'error');
    });
}

function downloadMetadataJson() {
    const dataStr = JSON.stringify(allMetadata, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `metadata_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showNotification('Metadata downloaded successfully!');
}

function resetUpload() {
    currentImage = null;
    allMetadata = {};
    elements.fileInput.value = '';
    elements.resultsSection.classList.add('hidden');
    elements.gpsWarning.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===================================
// UI Feedback
// ===================================
function showLoading(message = 'Processing...') {
    elements.loadingText.textContent = message;
    elements.loadingSpinner.classList.remove('hidden');
    elements.uploadZone.style.display = 'none';
}

function hideLoading() {
    elements.loadingSpinner.classList.add('hidden');
    elements.uploadZone.style.display = 'block';
}

function showError(message) {
    alert('Error: ' + message);
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success-color)' : 'var(--danger-color)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-xl);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
