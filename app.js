// Register Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js', { scope: './' })
        .then(reg => {
            console.log('[App] Service Worker Registered:', reg);
            return navigator.serviceWorker.ready;
        })
        .then(reg => {
            console.log('[App] Service Worker Ready:', reg);
        })
        .catch(error => console.error('[App] Service Worker Registration Failed:', error));
} else {
    console.warn('[App] Service Worker not supported in this browser.');
}

// Request Notification Permission
if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
        console.log('[App] Notification Permission:', permission);
    });
} else {
    console.warn('[App] Notifications not supported.');
}

// Send Test Notification
function sendNotification() {
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.getRegistration().then(reg => {
            reg.showNotification('Baby Cry Detected!', {
                body: 'Your baby is crying!',
                icon: 'icon.png'
            });
        });
    } else {
        console.warn('[App] Notifications not allowed.');
    }
}
