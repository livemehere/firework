import Tail from "./objects/Tail.js";
import { degToRad, rand } from "./utils.js";
import Particle from "./objects/Particle.js";
import { AudioManager } from "./AudioManager.js";

export class App {
  constructor() {
    this.audioManager = new AudioManager();
    this.audioManager.init();
    this.canvasElement = document.querySelector("canvas");
    this.ctx = this.canvasElement.getContext("2d");

    document.querySelector("#sound-start").addEventListener("click", () => {
      this.audioManager.play("firework", 0);
      document.querySelector("section").style.display = "none";
    });
    this.canvasElement.addEventListener(
      "mousedown",
      this.onMouseDown.bind(this),
    );

    this.resize();
    window.addEventListener("resize", this.resize.bind(this));

    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.tails = [];
    this.particles = [];
    this.animate();
  }

  resize() {
    this.dpr = window.devicePixelRatio > 1 ? 2 : 1;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.stageWidth = this.width * this.dpr;
    this.stageHeight = this.height * this.dpr;
    this.canvasElement.width = this.stageWidth;
    this.canvasElement.height = this.stageHeight;
    this.canvasElement.style.width = `${this.width}px`;
    this.canvasElement.style.height = `${this.height}px`;
    this.ctx.scale(this.dpr, this.dpr);
  }

  draw() {
    if (rand(0, 1) < 0.03 && this.tails.length < 13) {
      this.createTail(1);
    }
    this.drawBg();
    this.drawTails();
    this.drawParticles();
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.draw();
  }

  drawBg() {
    this.ctx.save();
    this.ctx.fillStyle = "rgba(0,0,0,0.1)";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.restore();
  }

  createTail(n, option) {
    for (let i = 0; i < n; i++) {
      const radius = 2;
      const x = option?.x ?? rand(radius, this.width);
      const y = option?.y ?? this.height + radius;
      const vx = 0;
      const vy = (-this.height / 50) * rand(1, 1.5);
      const colorDeg = rand(0, 360);
      this.tails.push(new Tail(x, y, vx, vy, colorDeg, radius));
      this.audioManager.play("firework", 0.02);
    }
  }

  createParticle(x, y, n, colorDeg) {
    for (let i = 0; i < n; i++) {
      const deg = degToRad(rand(0, 360));
      const vx = Math.cos(deg) * rand(0, 10);
      const vy = Math.sin(deg) * rand(0, 10);
      this.particles.push(new Particle(x, y, vx, vy, 2, colorDeg));
    }
    this.audioManager.play("explosion", 0.3);
  }

  drawTails() {
    this.tails.forEach((tail, index) => {
      tail.update();
      tail.draw(this.ctx);
      if (tail.velocity.y >= -0.1) {
        this.tails.splice(index, 1);
        this.createParticle(tail.vector.x, tail.vector.y, 150, tail.colorDeg);
        this.drawFlash();
      }
    });
  }

  drawParticles() {
    this.particles.forEach((particle, index) => {
      particle.update();
      particle.draw(this.ctx);
      if (particle.opacity <= 0) {
        this.particles.splice(index, 1);
      }
    });
  }

  drawFlash() {
    this.ctx.save();
    this.ctx.fillStyle = "rgba(255,255,255,0.17)";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.restore();
  }

  onMouseDown(e) {
    const rect = this.canvasElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.createTail(1, { x, y });
  }
}
