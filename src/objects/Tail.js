import Vector from "../Vector.js";

export default class Tail {
  constructor(x, y, vx, vy, colorDeg, radius) {
    this.vector = new Vector(x, y);
    this.velocity = new Vector(vx, vy);
    this.colorDeg = colorDeg;
    this.radius = radius;
    this.opacity = 1;
    this.friction = 0.97;
    this.vxDeg = 0;
    this.vxSpeed = 0.5;
  }

  update() {
    this.vxDeg += this.vxSpeed;
    this.velocity.mult(this.friction);
    this.vector.add(this.velocity);
    this.velocity.x = Math.sin(this.vxDeg) * this.velocity.y * 0.3;
    this.opacity = -this.velocity.y;
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
