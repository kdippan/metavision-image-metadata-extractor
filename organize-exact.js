const fs = require('fs');

// Just create folders, don't rename anything
const folders = ['windows11', 'android', 'ios'];

folders.forEach(folder => {
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
        console.log(`✅ Created: ${folder}`);
    }
});

console.log('📁 Move your icon files to these folders:');
console.log('   • windows11/ - AllWindows files');
console.log('   • android/ - All Android files');
console.log('   • ios/ - All iOS files (16.png, 20.png, etc.)');
console.log('✨ Keep original filenames - no renaming needed!');