# 📷 MetaVision - Advanced Image Metadata Extractor

<div align="center">

![MetaVision Logo](https://user-gen-media-assets.s3.amazonaws.com/seedream_images/b530bc84-19fc-43fa-8526-1ff552c9ae49.png)

**Extract comprehensive metadata from images with complete privacy protection**

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://bejewelled-sopapillas-bef28b.netlify.app)
[![GitHub](https://img.shields.io/badge/github-repository-blue)](https://github.com/kdippan/metavision-image-metadata-extractor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Netlify Status](https://api.netlify.com/api/v1/badges/auto/deploy-status)](https://bejewelled-sopapillas-bef28b.netlify.app)

[Live Demo](https://bejewelled-sopapillas-bef28b.netlify.app) • [Report Bug](https://github.com/kdippan/metavision-image-metadata-extractor/issues) • [Request Feature](https://github.com/kdippan/metavision-image-metadata-extractor/issues)

</div>

---

## 🌟 Overview

**MetaVision** is a powerful, client-side image metadata extraction tool that analyzes images and extracts comprehensive information including EXIF data, GPS coordinates, camera settings, color palettes, OCR text, and QR codes - all processed locally in your browser for maximum privacy and security.

### ✨ Key Features

- 📸 **Complete EXIF Data Extraction**
  - Camera make, model, and lens information
  - Exposure time, ISO, aperture, and focal length
  - Software and capture date/time
  - Flash settings and orientation

- 🗺️ **GPS Location Analysis**
  - Latitude, longitude, and altitude coordinates
  - Interactive OpenStreetMap visualization
  - Privacy warnings for sensitive location data

- 🎨 **Advanced Color Analysis**
  - Dominant color extraction
  - Full color palette generation with Vibrant.js
  - Average color calculation
  - Brightness and saturation metrics
  - Interactive color swatches (click to copy hex codes)

- 📝 **OCR Text Extraction**
  - Powered by Tesseract.js
  - Extract embedded text from images
  - Confidence score reporting
  - Word count statistics

- 📱 **QR Code & Barcode Detection**
  - Real-time QR code scanning with jsQR
  - Barcode detection and decoding
  - Location coordinates of detected codes

- 📂 **Comprehensive File Information**
  - Filename, size, and MIME type
  - Last modified timestamp
  - SHA-256 hash for file integrity
  - Image dimensions and aspect ratio

- 🔐 **Privacy-First Architecture**
  - 100% client-side processing
  - No server-side data storage
  - Images only uploaded to ImgBB for hosting (optional)
  - Privacy warnings for GPS data
  - Secure HTTPS connections

- 🎨 **Modern User Experience**
  - Beautiful gradient UI (purple to blue)
  - Smooth page load animations
  - Drag & drop file upload
  - Dark/Light theme toggle
  - Fully responsive design (mobile, tablet, desktop)
  - Tabbed interface for organized metadata display
  - Copy-to-clipboard functionality
  - Download metadata as JSON
  - Loading progress indicators

---

## 🚀 Live Demo

**👉 [Launch MetaVision](https://bejewelled-sopapillas-bef28b.netlify.app)**

Experience the full power of MetaVision by uploading your own images and exploring the extracted metadata across seven comprehensive categories.

---

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup with accessibility support
- **CSS3** - Modern styling with CSS Grid, Flexbox, and animations
- **JavaScript (ES6+)** - Vanilla JavaScript for optimal performance

### APIs & Web Technologies
- **ImgBB API** - Image hosting and URL generation
- **Web Crypto API** - SHA-256 hash calculation
- **Canvas API** - Image manipulation and analysis
- **File API** - Client-side file handling

### External Libraries (CDN)
- **[exifr](https://github.com/MikeKovarik/exifr)** `v7.x` - Fast EXIF data extraction
- **[Tesseract.js](https://github.com/naptha/tesseract.js)** `v5.0.4` - OCR text recognition
- **[jsQR](https://github.com/cozmo/jsqr)** - QR code detection
- **[Vibrant.js](https://github.com/Vibrant-Colors/node-vibrant)** - Color palette extraction
- **[Font Awesome 6](https://fontawesome.com)** - Icon library
- **[Lordicon](https://lordicon.com)** - Animated icons
- **[Google Fonts](https://fonts.google.com)** - Poppins, Inter, Roboto Mono

### Design System
- **Fonts:** Poppins (primary), Inter (secondary), Roboto Mono (code)
- **Colors:** Purple (#6366f1) to Blue (#8b5cf6) gradient theme
- **Responsive Breakpoints:**
  - Mobile: 320-767px
  - Tablet: 768-1023px
  - Desktop: 1024-1439px
  - Large: 1440px+

---

## 📦 Installation & Setup

### Option 1: Clone and Run Locally

```
# Clone the repository
git clone https://github.com/kdippan/metavision-image-metadata-extractor.git

# Navigate to project directory
cd metavision-image-metadata-extractor

# Open with a local server (choose one):

# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (http-server)
npx http-server -p 8000

# Using PHP
php -S localhost:8000

# Then visit: http://localhost:8000
```

### Option 2: Direct File Access

Simply open `index.html` in your web browser. However, using a local server is recommended for full functionality.

### Option 3: Deploy Your Own

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/kdippan/metavision-image-metadata-extractor)

---

## 📖 Usage Guide

### Step 1: Upload Your Image
- **Drag & Drop:** Simply drag an image file into the upload zone
- **Click to Browse:** Click the upload zone to select a file from your device
- **Supported Formats:** JPG, PNG, GIF, WEBP, BMP
- **File Size Limit:** Maximum 32MB

### Step 2: Processing
The application will:
1. Upload your image to ImgBB (secure hosting)
2. Extract file metadata (name, size, hash)
3. Analyze image properties (dimensions, colors)
4. Parse EXIF data (camera settings)
5. Extract GPS coordinates (if available)
6. Perform OCR text recognition
7. Detect QR codes and barcodes
8. Generate color palettes and histograms

### Step 3: Explore Results
Navigate through 7 metadata categories:
- **File Info** - File properties and hash
- **Image** - Preview and dimensions
- **Camera** - EXIF and camera settings
- **Location** - GPS data with map
- **Colors** - Palettes and analysis
- **Text/QR** - OCR and QR codes
- **Technical** - Advanced details

### Step 4: Export Data
- **Copy All:** Copy complete metadata to clipboard
- **Download JSON:** Export metadata as JSON file
- **Copy Colors:** Click color swatches to copy hex codes

### Step 5: Upload Another
Click "New Upload" to analyze a different image.

---

## 🎯 Use Cases

- **Photographers:** Verify camera settings and EXIF data
- **Digital Forensics:** Analyze image metadata for investigations
- **Privacy Advocates:** Check images for sensitive GPS data before sharing
- **Designers:** Extract color palettes from images
- **Developers:** Verify image properties and technical details
- **Archivists:** Document image metadata for records
- **QR Code Readers:** Extract data from QR codes in images
- **OCR Users:** Extract text from image screenshots

---

## 🗂️ Project Structure

```
metavision-image-metadata-extractor/
├── index.html              # Main HTML structure
├── styles.css              # Complete CSS styling and animations
├── script.js               # Core JavaScript functionality
├── README.md               # Project documentation
├── LICENSE                 # MIT License
├── netlify.toml           # Netlify configuration
└── _redirects             # Netlify redirect rules
```

---

## 🔒 Privacy & Security

### Client-Side Processing
- All metadata extraction happens entirely in your browser
- No data is sent to external servers (except ImgBB for image hosting)
- Your images never touch our servers

### Data Handling
- **ImgBB Upload:** Images are only uploaded to ImgBB API for hosting purposes
- **Local Analysis:** EXIF, color, OCR, and QR processing happens client-side
- **No Storage:** We don't store any images or metadata
- **No Tracking:** No analytics or user tracking implemented

### Security Features
- **HTTPS Encryption:** All connections are secured
- **SHA-256 Hashing:** File integrity verification
- **GPS Warnings:** Alerts when location data is detected
- **Content Security Policy:** Implemented via Netlify headers
- **Subresource Integrity:** CDN resources verified

### Privacy Warnings
MetaVision automatically alerts you when:
- GPS coordinates are found in your image
- Location data could compromise privacy
- Sensitive metadata should be stripped before sharing

---

## 🎨 Features Showcase

### Metadata Categories

| Category | Data Extracted |
|----------|----------------|
| **File Information** | Filename, size, type, modified date, SHA-256 hash |
| **Image Properties** | Width, height, aspect ratio, DPI, orientation, alpha channel |
| **Camera & EXIF** | Make, model, lens, exposure, ISO, aperture, focal length, flash, software, date |
| **GPS Location** | Latitude, longitude, altitude, interactive map |
| **Color Analysis** | Dominant colors, palette (6 colors), average color, brightness, saturation |
| **Text & Codes** | OCR text, confidence score, QR codes, barcodes, location |
| **Technical Details** | Orientation, color space, compression, bit depth, resolution |

### Animations & Interactions
- Smooth fade-in page load animation
- Staggered card entry effects
- Hover transformations on buttons
- Pulse animation on drag-over
- Gradient rotation loading spinner
- Slide-in results with bounce effect
- Theme toggle rotation animation
- Notification slide-in/out

---

## 🚀 Deployment

### Deployed on Netlify
**Live URL:** [https://bejewelled-sopapillas-bef28b.netlify.app](https://bejewelled-sopapillas-bef28b.netlify.app)

### Deploy Your Own Instance

1. **Fork this repository**
```
# Via GitHub UI or:
gh repo fork kdippan/metavision-image-metadata-extractor
```

2. **Connect to Netlify**
   - Sign up at [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Select GitHub and authorize
   - Choose your forked repository
   - Deploy settings:
     - **Build command:** (leave empty - static site)
     - **Publish directory:** `.` (root)
   - Click "Deploy site"

3. **Custom Domain (Optional)**
   - Go to Site settings → Domain management
   - Add your custom domain
   - Configure DNS records as instructed

### Configuration Files

**netlify.toml** (already included):
- No build command needed (static site)
- Security headers configured
- Cache optimization for assets
- CSP headers for security

**_redirects** (already included):
- SPA routing configuration
- 404 handling

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

### How to Contribute

1. **Fork the repository**
```
gh repo fork kdippan/metavision-image-metadata-extractor
```

2. **Create a feature branch**
```
git checkout -b feature/amazing-feature
```

3. **Make your changes**
   - Follow existing code style
   - Add comments for complex logic
   - Test thoroughly across browsers

4. **Commit your changes**
```
git commit -m "Add some amazing feature"
```

5. **Push to your branch**
```
git push origin feature/amazing-feature
```

6. **Open a Pull Request**
   - Describe your changes clearly
   - Link any related issues
   - Add screenshots if applicable

### Bug Reports & Feature Requests
- **Report Bugs:** [Open an issue](https://github.com/kdippan/metavision-image-metadata-extractor/issues)
- **Request Features:** [Open an issue](https://github.com/kdippan/metavision-image-metadata-extractor/issues)

---

## 📱 Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Fully Supported |
| Firefox | 88+ | ✅ Fully Supported |
| Safari | 14+ | ✅ Fully Supported |
| Edge | 90+ | ✅ Fully Supported |
| Opera | 76+ | ✅ Fully Supported |
| Mobile Safari | iOS 14+ | ✅ Fully Supported |
| Chrome Mobile | Android 90+ | ✅ Fully Supported |

### Requirements
- JavaScript enabled
- Modern browser with ES6+ support
- Internet connection (for CDN libraries)
- Camera/file access permissions (for upload)

---

## 📊 Performance

### Core Web Vitals
- **Largest Contentful Paint (LCP):** < 2.5s
- **First Input Delay (FID):** < 100ms
- **Cumulative Layout Shift (CLS):** < 0.1

### Optimization Features
- Minified assets
- CDN delivery for libraries
- Lazy loading for images
- Efficient animations (GPU-accelerated)
- Progressive enhancement
- Responsive images

### Bundle Sizes
- **HTML:** ~15KB
- **CSS:** ~25KB
- **JavaScript:** ~35KB (core)
- **Total (before CDN libraries):** ~75KB

---

## 🐛 Known Issues

- **Large Images:** Very large images (>20MB) may take longer to process OCR
- **Complex QR Codes:** Some heavily stylized QR codes may not be detected
- **Browser Compatibility:** OCR may be slower on older mobile devices
- **EXIF Data:** Some camera manufacturers use proprietary EXIF tags not always parsed

### Workarounds
- Compress large images before upload for faster OCR
- Use standard QR codes for best detection
- Update to latest browser version
- Report parsing issues with sample images

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Dippan Bhusal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👨‍💻 Developer

<div align="center">

### **Dippan Bhusal**

[![Email](https://img.shields.io/badge/Email-connect.dippan%40gmail.com-red?style=for-the-badge&logo=gmail)](mailto:connect.dippan@gmail.com)
[![Instagram](https://img.shields.io/badge/Instagram-%40dippan.bhusal-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/dippan.bhusal)
[![Twitter](https://img.shields.io/badge/Twitter-%40DippanBhusal-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/DippanBhusal)
[![Facebook](https://img.shields.io/badge/Facebook-dippan.bhusall-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://facebook.com/dippan.bhusall)
[![GitHub](https://img.shields.io/badge/GitHub-KDippan-181717?style=for-the-badge&logo=github)](https://github.com/KDippan)

</div>

---

## 🙏 Acknowledgments

### Libraries & Tools
- **[exifr](https://github.com/MikeKovarik/exifr)** by MikeKovarik - EXIF extraction
- **[Tesseract.js](https://github.com/naptha/tesseract.js)** by Naptha - OCR engine
- **[jsQR](https://github.com/cozmo/jsqr)** by Cozmo - QR detection
- **[Vibrant.js](https://github.com/Vibrant-Colors/node-vibrant)** - Color extraction
- **[ImgBB](https://imgbb.com)** - Image hosting API
- **[Font Awesome](https://fontawesome.com)** - Icon library
- **[Google Fonts](https://fonts.google.com)** - Typography
- **[Netlify](https://netlify.com)** - Hosting platform

### Inspiration
- Modern web design principles
- Privacy-first architecture
- Accessibility standards (WCAG 2.1 AA)
- Progressive web app concepts

---

## 📈 Roadmap

### Upcoming Features
- [ ] Batch image processing
- [ ] Export stripped metadata images
- [ ] Histogram visualization
- [ ] Advanced filter options
- [ ] Image comparison tool
- [ ] Metadata editing capability
- [ ] PWA support (offline mode)
- [ ] Multiple language support
- [ ] PDF metadata extraction
- [ ] Video metadata support

### Community Requests
- [ ] Custom ImgBB API key input
- [ ] Local-only mode (no ImgBB upload)
- [ ] Metadata history/bookmarks
- [ ] Share results via URL
- [ ] Dark mode enhancements

Want to see a feature? [Request it here](https://github.com/kdippan/metavision-image-metadata-extractor/issues)!

---

## ⭐ Show Your Support

If this project helped you, please consider:
- ⭐ **Starring the repository** on GitHub
- 🐛 **Reporting bugs** you encounter
- 💡 **Suggesting features** you'd like to see
- 🤝 **Contributing** code improvements
- 📢 **Sharing** with others who might benefit

---

## 📞 Support & Contact

- **Issues:** [GitHub Issues](https://github.com/kdippan/metavision-image-metadata-extractor/issues)
- **Email:** [connect.dippan@gmail.com](mailto:connect.dippan@gmail.com)
- **Twitter:** [@DippanBhusal](https://twitter.com/DippanBhusal)

---

<div align="center">

**[⬆ Back to Top](#-metavision---advanced-image-metadata-extractor)**

Made with ❤️ by [Dippan Bhusal](https://github.com/KDippan)

© 2024 Dippan Bhusal. All rights reserved.

</div>
