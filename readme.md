---

```markdown
# 🌸 Magical Bioluminescent Sakura Garden

A mesmerising, interactive generative art piece built with **HTML5 Canvas** and vanilla **JavaScript**. This project features a fast-growing, gnarled Sakura tree that splits into multiple trunks, a vibrant multi-colored ground garden, drifting fireflies, and a gentle falling petal blizzard.



## ✨ Features

* **Recursive Growth Algorithm:** The Sakura tree uses a depth-first recursion to create organic, gnarled branching patterns.
* **Initial Blooming:** The central tree splits into three main trunks for a lush, wide canopy.
* **Dual-Plant System:** * *Main Sakura:* Fast-growing with dark wood and soft pink/white blossoms.
    * *Ground Garden:* Slower-growing, multi-colored neon plants that sprout from the bottom.
* **Dynamic Particle Systems:**
    * **Fireflies:** Slow-drifting, glowing teal orbs with a pulsating opacity.
    * **Petal Blizzard:** Soft pink petals that drop from the Sakura branches and drift with a sine-wave wind effect.
* **Responsive Design:** The canvas automatically adjusts to fit any screen size.

---

## 🚀 Getting Started

Since this project is built with standard web technologies, there are no dependencies or build steps required.

### 📂 File Structure
```text
├── index.html   # Structure and UI
├── style.css    # Dark-themed styling and typography
└── script.js    # Generative logic and animation loop

```

### 🛠️ Installation

1. **Clone or Download** this repository to your local machine.
2. Ensure `index.html`, `style.css`, and `script.js` are in the **same folder**.
3. Open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).

---

## 🎨 How It Works

### The Growth Engine

The tree is built using a custom `Branch` class. Unlike static fractals, this branch tracks its `currentLen`. The animation loop increments this length every frame, creating the illusion of a physical plant "climbing" the screen.

### Visual Effects

* **Bioluminescence:** Achieved using the Canvas `shadowBlur` and `shadowColor` properties to create a neon glow around flowers and fireflies.
* **Organic Movement:** The gnarled wood effect is created by using `quadraticCurveTo` with randomized control points, preventing the branches from looking like perfect, straight lines.

---

## ⚙️ Customization

You can easily tweak the atmosphere by modifying variables in `script.js`:

| Variable | Description |
| --- | --- |
| `this.speed` | Change how fast the Sakura or Ground plants grow. |
| `sakuraColors` | Edit the array to change the blossom colors (e.g., to red or gold). |
| `fireflies.v` | Adjust the drift speed of the glowing particles. |
| `depth` | Increase the number to make the tree more complex (Warning: High values impact performance). |

---

## 📜 License

This project is open-source and free to use for personal and educational purposes.

Happy Valentine's Day! 💖

```

---

```