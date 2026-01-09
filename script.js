const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Update slider values in real-time
const angleSlider = document.getElementById("angle");
const velocitySlider = document.getElementById("velocity");
const gravitySlider = document.getElementById("gravity");

const angleVal = document.getElementById("angleVal");
const velVal = document.getElementById("velVal");
const gravVal = document.getElementById("gravVal");

angleSlider.addEventListener("input", () => { angleVal.innerText = angleSlider.value; });
velocitySlider.addEventListener("input", () => { velVal.innerText = velocitySlider.value; });
gravitySlider.addEventListener("input", () => { gravVal.innerText = gravitySlider.value; });

// Buttons
document.getElementById("simulateBtn").addEventListener("click", simulate);
document.getElementById("resetBtn").addEventListener("click", resetCanvas);

function simulate() {
    resetCanvas();

    let angle = parseFloat(angleSlider.value) * Math.PI / 180; // convert to radians
    let velocity = parseFloat(velocitySlider.value);
    let gravity = parseFloat(gravitySlider.value);

    let vx = velocity * Math.cos(angle);
    let vy = velocity * Math.sin(angle);

    // Calculated metrics
    let timeOfFlight = (2 * vy) / gravity;
    let range = vx * timeOfFlight;
    let height = (vy * vy) / (2 * gravity);

    document.getElementById("time").innerText = timeOfFlight.toFixed(2);
    document.getElementById("range").innerText = range.toFixed(2);
    document.getElementById("height").innerText = height.toFixed(2);

    let t = 0;
    const dt = 0.02;

    function animate() {
        // Position at time t
        let x = vx * t;
        let y = vy * t - 0.5 * gravity * t * t;

        if (y < 0) return; // stop when projectile hits ground

        // Scale for canvas (pixels)
        let sx = x * 5;
        let sy = canvas.height - y * 5;

        ctx.fillStyle = "red";
        ctx.fillRect(sx, sy, 3, 3);

        t += dt;
        requestAnimationFrame(animate);
    }

    animate();
}

function resetCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
