"use strict";
class Bouncer extends Entity {
  constructor(text, container) {
    super(5, 20, 1, 1);
    this.text = text;
    this.velocityPerSecond = 240;
    this.width = 0;
    this.height = 20;
    this.dimensions = container;
  }
  
  isXOutOfBounds() {
    return this.x < 0 || (this.x + this.width) > this.dimensions.width;
  }

  isYOutOfBounds() {
    return (this.y - this.height) < 0 || this.y > this.dimensions.height;
  }

  update(delta) {
    const percentageOfSecond = delta / 1_000;
    const velocity = percentageOfSecond * this.velocityPerSecond;

    const xVelocity = velocity % (this.dimensions.width / 2);
    this.x += xVelocity * this.dx;
    if (this.isXOutOfBounds()) {
      this.dx *= -1;
      this.x += this.dx * (xVelocity * 2);
    }

    const yVelocity = velocity % (this.dimensions.height / 2);
    this.y += yVelocity * this.dy;
    if (this.isYOutOfBounds()) {
      this.dy *= -1;
      this.y += this.dy * (yVelocity * 2);
    }
  }

  display(ctx) {
    if (this.width === 0) {
      this.width = ctx.measureText(this.text).width
    }

    utility.strokeText(ctx, this.text, this.x, this.y);
  }
};
