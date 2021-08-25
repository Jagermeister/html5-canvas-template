
const bouncer = {
  text: "Hello World!",
  velocityPerSecond: 240,
  x: 5,
  dx: 1,
  width: 0,//,
  y: 20,
  dy: 1,
  height: 20,
  display: (ctx) => {
    if (bouncer.width === 0) {
      bouncer.width = ctx.measureText(bouncer.text).width
    }

    utility.strokeText(ctx, bouncer.text, bouncer.x, bouncer.y);
  },
  isXOutOfBounds: () => bouncer.x < 0 || (bouncer.x + bouncer.width) > dimensions.width,
  isYOutOfBounds: () => (bouncer.y - bouncer.height) < 0 || bouncer.y > dimensions.height,
  update: (delta) => {
    const percentageOfSecond = delta / 1_000;
    const velocity = percentageOfSecond * bouncer.velocityPerSecond;

    const xVelocity = velocity % (dimensions.width / 2);
    bouncer.x += xVelocity * bouncer.dx;
    if (bouncer.isXOutOfBounds()) {
      bouncer.dx *= -1;
      bouncer.x += bouncer.dx * (xVelocity * 2);
    }

    const yVelocity = velocity % (dimensions.height / 2);
    bouncer.y += yVelocity * bouncer.dy;
    if (bouncer.isYOutOfBounds()) {
      bouncer.dy *= -1;
      bouncer.y += bouncer.dy * (yVelocity * 2);
    }
  }
};
