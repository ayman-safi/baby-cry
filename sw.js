self.addEventListener("install", (event) => {
    console.log("Service Worker Installed");
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    console.log("Service Worker Activated");
});

self.addEventListener("fetch", () => {});

self.addEventListener("push", (event) => {
    self.registration.showNotification("Baby Crying Alert!", {
        body: "Your baby might be crying. Check on them!",
    });
});
