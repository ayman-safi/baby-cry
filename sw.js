// sw.js - Service Worker for Baby Cry Detector

self.addEventListener('install', function(event) {
    self.skipWaiting();
  });
  
  self.addEventListener('activate', function(event) {
    return self.clients.claim();
  });
  
  self.addEventListener('push', function(event) {
    const title = 'Baby Cry Detected!';
    const options = {
      body: 'Your baby might be crying. Please check.',
      icon: '/icon.png',
      vibrate: [200, 100, 200]
    };
    
    event.waitUntil(self.registration.showNotification(title, options));
  });
  
  self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    
    event.waitUntil(
      clients.matchAll({type: 'window'}).then(function(clientList) {
        if (clientList.length > 0) {
          return clientList[0].focus();
        }
        return clients.openWindow('/');
      })
    );
  });