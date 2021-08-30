import { RenderContext } from "../canvas/renderContext";
import { Dimension, Entity, Point } from "./entity";

enum ImageLoadingStatus {
  unloaded,
  loading,
  loaded
}

export class EntityImage extends Entity {
  imagePath: string;
  image: HTMLImageElement;
  status: ImageLoadingStatus = ImageLoadingStatus.unloaded

  constructor(location: Point, dimensions: Dimension, container: Dimension, imagePath: string) {
    super(location, dimensions, container);
    this.imagePath = imagePath;
  }

  display(ctx: RenderContext) {
    switch (+this.status) {
      case ImageLoadingStatus.unloaded:
        this.loadResource();
        break;

      case ImageLoadingStatus.loading:
        break;

      case ImageLoadingStatus.loaded:
        this.drawResource(ctx);
        break;
    }
  }

  private loadResource() {
    this.status = ImageLoadingStatus.loading;
    const ref = this;
    this.image = new Image();
    this.image.addEventListener('load', () => ref.status = ImageLoadingStatus.loaded, false);
    this.image.src = `./dist/assets/${this.imagePath}`;
  }

  private drawResource(ctx: RenderContext) {
    ctx.context.drawImage(
      this.image,
      this.location.x, this.location.y,
      this.dimensions.width, this.dimensions.height);
  }
}