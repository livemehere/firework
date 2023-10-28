import Vector from "../Vector.js";
import { rand } from "../utils.js";

export default class Particle {
  constructor(x, y, vx, vy, radius, colorDeg) {
    this.vector = new Vector(x, y);
    this.velocity = new Vector(vx, vy);
    this.radius = radius;
    this.colorDeg = colorDeg;
    this.friction = 0.97;
    this.gravity = rand(0.1, 0.2);
    this.opacity = 1;
  }

  update() {
    this.velocity.mult(this.friction);
    this.vector.add(this.velocity);
    this.velocity.y += this.gravity;
    this.opacity -= 0.01;
  }

  draw(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = `hsla(${this.colorDeg}, 100%, 50%, ${this.opacity})`;
    ctx.arc(this.vector.x, this.vector.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}
