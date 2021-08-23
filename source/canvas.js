'use strict';

const utility = {};

utility.getParameterByName = (name) => {
    const url = window.location.href,
      paramName =  name.replace(/[\[\]]/g, "\\$&"),
      regex = new RegExp("[?&]" + paramName + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
};

utility.canvasCreate = (containerId, id, dimensions) => {
    const container = document.getElementById(containerId);
    if (container) {
        const canvas = document.createElement('CANVAS');
        canvas.id = id;
        canvas.setAttribute('width', dimensions.width);
        canvas.setAttribute('height', dimensions.height);
        canvas.oncontextmenu = 'return false;';
        container.appendChild(canvas);
        return canvas;
    }
};

utility.xyFromMouse = (canvas, event) => {
  const canvas_bounds = canvas.getBoundingClientRect();
  const y = (event.clientY - canvas_bounds.top),
      x = (event.clientX - canvas_bounds.left);
  return [x, y];
};

utility.strokeText = (ctx, text, x, y, isAlignedRight) => {
    if (isAlignedRight) x -= ctx.measureText(text).width;
    ctx.strokeText(text, x, y);
};

utility.strokeLines = (ctx, data) => {
    ctx.moveTo(...data.shift());
    for (let i = 0, l = data.length; i < l; i++) {
        ctx.lineTo(...data[i]);
    }

    ctx.stroke();
};
