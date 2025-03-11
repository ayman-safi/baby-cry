// Request permissions and start listening when the button is clicked
document.getElementById("start").addEventListener("click", async () => {
    await Notification.requestPermission();
    await requestWakeLock();
    startListening();
});

// Start listening to the microphone
async function startListening() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        function detectCry() {
            analyser.getByteFrequencyData(dataArray);
            let volume = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

            if (volume > 50) { // Adjust this threshold
                sendNotification();
            }

            requestAnimationFrame(detectCry);
        }

        detectCry();
    } catch (error) {
        console.error("Error accessing microphone:", error);
    }
}

// Send a browser notification
function sendNotification() {
    if (Notification.permission === "granted") {
        new Notification("Baby Crying Alert!", {
            body: "Your baby might be crying. Check on them!",
            icon: "https://example.com/baby-icon.png" // Optional
        });
    }
}

// Register Service Worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js")
        .then(() => console.log("Service Worker Registered"))
        .catch(error => console.log("Service Worker Registration Failed", error));
}

// Enable Wake Lock to keep the screen on
let wakeLock = null;

async function requestWakeLock() {
    if ('wakeLock' in navigator) {
        try {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log('Wake Lock activated');
        } catch (err) {
            console.log(`Wake Lock error: ${err.name}, ${err.message}`);
        }
    }
}
