// rename.js - Run this in Node.js or Spck terminal

const fs = require('fs');
const path = require('path');

const splashDir = './splash_screens';

const renameMap = {
  '4__iPhone_SE__iPod_touch_5th_generation__portrait.png': 'iphone5_splash.png',
  '4__iPhone_SE__iPod_touch_5th_generation__landscape.png': 'iphone5_landscape.png',
  '8.5__iPad_Mini_portrait.png': 'ipad_mini_splash.png',
  '8.5__iPad_Mini_landscape.png': 'ipad_mini_landscape.png',
  '9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad__portrait.png': 'ipad_splash.png',
  '9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad__landscape.png': 'ipad_landscape.png',
  '10.2__iPad_portrait.png': 'ipad_102_splash.png',
  '10.2__iPad_landscape.png': 'ipad_102_landscape.png',
  '10.5__iPad_Air_portrait.png': 'ipad_air_splash.png',
  '10.5__iPad_Air_landscape.png': 'ipad_air_landscape.png'
};

Object.entries(renameMap).forEach(([oldName, newName]) => {
  const oldPath = path.join(splashDir, oldName);
  const newPath = path.join(splashDir, newName);
  
  try {
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
      console.log(`✅ ${oldName} → ${newName}`);
    }
  } catch (err) {
    console.error(`❌ Error: ${err.message}`);
  }
});

console.log('🎉 All files renamed!');