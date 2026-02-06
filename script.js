const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const sakuraColors = ["#ffb7c5", "#ffc0cb", "#ffffff", "#fbc2eb"];
const gardenColors = ["#66fcf1", "#ff4d6d", "#f6d365", "#b5ff42", "#a1c4fd"];

let branches = [];
let fireflies = [];
let petals = [];

// Initialize Fireflies (Slow speed)
for (let i = 0; i < 40; i++) {
    fireflies.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        s: Math.random() * 2 + 1,
        a: Math.random() * Math.PI * 2,
        v: 0.005 + Math.random() * 0.01
    });
}

class Branch {
    constructor(x, y, len, angle, width, depth, type = "sakura") {
        this.x = x;
        this.y = y;
        this.len = len;
        this.angle = angle;
        this.width = width;
        this.depth = depth;
        this.type = type;
        this.currentLen = 0;
        this.finished = false;
        this.speed = this.type === "sakura" ? 2.5 : 1.0;
    }

    draw() {
        if (this.currentLen < this.len) {
            this.currentLen += this.speed;
        } else if (!this.finished) {
            this.finished = true;
            this.split();
        }

        ctx.beginPath();
        ctx.save();
        ctx.strokeStyle = this.type === "sakura" ? "#1a1212" : "#1b4332";
        ctx.lineWidth = this.width;
        ctx.lineCap = "round";
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * Math.PI / 180);
        ctx.moveTo(0, 0);

        // Gnarled growth path
        ctx.quadraticCurveTo(Math.sin(this.currentLen / 5) * 3, -this.currentLen / 2, 0, -this.currentLen);
        ctx.stroke();

        if (this.currentLen >= this.len) {
            const colorArr = this.type === "sakura" ? sakuraColors : gardenColors;
            this.drawFlower(0, -this.currentLen, colorArr);
        }
        ctx.restore();
    }

    drawFlower(x, y, colors) {
        ctx.save();
        ctx.translate(x, y);
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.shadowBlur = 15;
        ctx.shadowColor = ctx.fillStyle;
        for (let i = 0; i < 5; i++) {
            ctx.rotate(Math.PI * 2 / 5);
            ctx.beginPath();
            ctx.ellipse(this.type === "sakura" ? 5 : 7, 0, 6, 3, 0, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();

        if (this.type === "sakura" && Math.random() > 0.98) {
            this.spawnPetal(this.x, this.y - this.currentLen);
        }
    }

    spawnPetal(x, y) {
        petals.push({
            x, y,
            s: Math.random() * 3 + 2,
            r: Math.random() * Math.PI,
            vx: Math.random() - 0.5,
            vy: 0.5 + Math.random()
        });
    }

    split() {
        if (this.type === "sakura" && this.depth >= 6) return;
        if (this.type === "ground" && this.depth >= 2) return;

        const rad = this.angle * Math.PI / 180;
        const newX = this.x + Math.sin(rad) * this.len;
        const newY = this.y - Math.cos(rad) * this.len;

        const num = (this.depth === 0 && this.type === "sakura") ? 3 : 2;
        for (let i = 0; i < num; i++) {
            const spread = (i - (num - 1) / 2) * (this.type === "sakura" ? 38 : 45);
            const newAngle = this.angle + spread + (Math.random() * 20 - 10);
            branches.push(new Branch(newX, newY, this.len * 0.78, newAngle, this.width * 0.7, this.depth + 1, this.type));
        }
    }
}

function init() {
    // Sakura Tree
    branches.push(new Branch(canvas.width / 2, canvas.height, 140, 0, 16, 0, "sakura"));
    // Ground Garden
    for (let i = 0; i < 15; i++) {
        const gx = Math.random() * canvas.width;
        const size = 30 + Math.random() * 50;
        branches.push(new Branch(gx, canvas.height, size, (Math.random() - 0.5) * 30, 4, 0, "ground"));
    }
}

function animate() {
    ctx.fillStyle = "#010208";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Stars
    ctx.fillStyle = "white";
    for (let i = 0; i < 60; i++) {
        ctx.beginPath();
        ctx.arc((i * 137) % canvas.width, (i * 243) % canvas.height, 0.7, 0, Math.PI * 2);
        ctx.fill();
    }

    // Fireflies
    fireflies.forEach(f => {
        f.a += f.v;
        f.x += Math.cos(f.a) * 0.2;
        f.y += Math.sin(f.a) * 0.2;
        ctx.beginPath();
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#66fcf1";
        ctx.fillStyle = "rgba(102, 252, 241, 0.4)";
        ctx.arc(f.x, f.y, f.s, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.shadowBlur = 0;

    // Petals
    ctx.fillStyle = "#ffb7c5";
    petals.forEach((p, i) => {
        p.y += p.vy;
        p.x += p.vx + Math.sin(Date.now() * 0.001);
        p.r += 0.02;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.r);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.s, p.s / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        if (p.y > canvas.height) petals.splice(i, 1);
    });

    branches.forEach(b => b.draw());
    requestAnimationFrame(animate);
}

window.onload = () => {
    init();
    animate();
    setTimeout(() => {
        document.getElementById('msg').style.opacity = 1;
    }, 1000);
};

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});