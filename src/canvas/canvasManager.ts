import { Dimension } from "../entity/entity";
import { Canvas } from "./canvas";

export class CanvasManager {
  canvases: Canvas[] = [];
  canvasById: { [id: string]: Canvas } = {};

  private canvasEventCapture: HTMLCanvasElement;

  constructor() {

  }

  init(containerId: string, dimensions: Dimension) {
    const canvas = Canvas.create(containerId, 'canvasManager__EventCapture', dimensions);
    this.canvasEventCapture = canvas.nativeElement;
    this.attachEvents();
  }

  add(id: string, canvas: Canvas) {
    if (id in this.canvasById) {
      throw new Error(`Canvas with id '${id}' already exists.`);
    }

    this.canvases.push(canvas);
    this.canvasById[id] = canvas;
  }

  update(delta: number) {
    for (let i = 0; i < this.canvases.length; i++) {
      this.canvases[i].update(delta);
    }
  }

  display() {
    for (let i = 0; i < this.canvases.length; i++) {
      const c = this.canvases[i];
      c.isDrawing && c.display();
    }
  }

  private attachEvents() {
    this.attachMouseEvent('mousedown');
    this.attachMouseEvent('mousemove');
    this.attachMouseEvent('mouseup');
  }

  private attachMouseEvent(eventName: string) {
    this.canvasEventCapture.addEventListener(eventName, this.delegateMouseEvent());
  }

  private delegateMouseEvent() {
    return (event: MouseEvent) => this.canvases.some((c) => c.handleMouseEvent(event));
  }
}
