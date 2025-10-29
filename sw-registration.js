// Service Worker Registration for MetaVision
// Handles registration, updates, and lifecycle events

(function() {
  'use strict';
  
  // Check if service workers are supported
  if (!('serviceWorker' in navigator)) {
    console.warn('Service Workers not supported in this browser');
    return;
  }
  
  // Configuration
  const SW_PATH = '/service-worker.js';
  const UPDATE_CHECK_INTERVAL = 60 * 60 * 1000; // Check every hour
  
  // Register service worker
  function registerServiceWorker() {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(SW_PATH)
        .then((registration) => {
          console.log('✅ ServiceWorker registered:', registration.scope);
          
          // Check for updates periodically
          setInterval(() => {
            registration.update();
          }, UPDATE_CHECK_INTERVAL);
          
          // Handle updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            console.log('🔄 ServiceWorker update found');
            
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New service worker available
                showUpdateNotification(newWorker);
              }
            });
          });
        })
        .catch((error) => {
          console.error('❌ ServiceWorker registration failed:', error);
        });
      
      // Handle controller change
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('🔄 ServiceWorker controller changed');
        
        // Show notification that app has been updated
        if (window.location.search.includes('sw-updated')) {
          return;
        }
        
        // Reload the page to use new service worker
        window.location.href = window.location.href + '?sw-updated=true';
      });
    });
  }
  
  // Show update notification to user
  function showUpdateNotification(worker) {
    const notification = document.createElement('div');
    notification.id = 'sw-update-notification';
    notification.style.cssText = `
      position: fixed;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      z-index: 10000;
      display: flex;
      align-items: center;
      gap: 16px;
      animation: slideUp 0.3s ease-out;
      max-width: 90%;
      width: 400px;
    `;
    
    notification.innerHTML = `
      <div style="flex: 1;">
        <strong style="display: block; margin-bottom: 4px;">Update Available!</strong>
        <span style="font-size: 14px; opacity: 0.9;">A new version of MetaVision is ready.</span>
      </div>
      <button id="sw-update-btn" style="
        background: white;
        color: #6366f1;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s;
      ">Update</button>
      <button id="sw-dismiss-btn" style="
        background: transparent;
        color: white;
        border: 1px solid white;
        padding: 8px 16px;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s;
      ">Later</button>
    `;
    
    document.body.appendChild(notification);
    
    // Update button
    document.getElementById('sw-update-btn').addEventListener('click', () => {
      worker.postMessage({ action: 'skipWaiting' });
      notification.remove();
    });
    
    // Dismiss button
    document.getElementById('sw-dismiss-btn').addEventListener('click', () => {
      notification.remove();
    });
  }
  
  // Add animation keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideUp {
      from {
        transform: translateX(-50%) translateY(100px);
        opacity: 0;
      }
      to {
        transform: translateX(-50%) translateY(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Initialize
  registerServiceWorker();
  
  // Expose API for manual cache clearing
  window.clearAppCache = function() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.controller.postMessage({ action: 'clearCache' });
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      }).then(() => {
        console.log('✅ Cache cleared successfully');
        window.location.reload();
      });
    }
  };
  
})();