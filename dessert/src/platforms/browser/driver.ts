namespace dessert {
	export let run = (canvas: HTMLCanvasElement) => {
		/**
		 * 底层容器
		 */
		var stage = new DisplayObjectContainer();
		let context2D = canvas.getContext("2d");
		let lastNow = Date.now();  //记录当前时间
		let render = new Canvas2DRender(stage, context2D);
		let frameHandler = () => {
			let now = Date.now();
			let deltaTime = now - lastNow;
			Ticker.getInstance().notify(deltaTime);//心跳控制器广播
			render.render();
			lastNow = now;
			window.requestAnimationFrame(frameHandler);
		}
		window.requestAnimationFrame(frameHandler);
		window.onmousedown = (e) => {
			stage.handle(e, MouseState.MOUSE_DOWN);

			let downX = e.offsetX;
			let downY = e.offsetY;
			window.onmousemove = (e) => {
				stage.handle(e, MouseState.MOUSE_MOVE);
			}
			window.onmouseup = (e) => {
				stage.handle(e, MouseState.MOUSE_UP);
				window.onmousemove = (e) => { }
				let upX = e.offsetX;
				let upY = e.offsetY;
				let resultX = Math.abs(upX - downX);
				let resultY = Math.abs(upY - downY);
				if (resultX < 10 &&
					resultY < 10) {
					stage.handle(e, MouseState.MOUSE_CLICK);
				}
			}
		}
		return stage;
	}


	export class Canvas2DRender {
		private stage: DisplayObjectContainer
		private context2D: CanvasRenderingContext2D
		constructor(stage: DisplayObjectContainer, context2D: CanvasRenderingContext2D) {
			this.stage = stage;
			this.context2D = context2D;
		}

		render() {
			let stage = this.stage;
			let context = this.context2D;
			stage.update();
			context.clearRect(0, 0, 1000, 1000);
			context.save();
			this.renderContainer(stage);
			context.restore();
		}


		renderContainer(stage: DisplayObjectContainer) {
			// for (let displayObject of DisplayObject.renderList) {
			for (let displayObject of stage.children) {
				let context2D = this.context2D;
				context2D.globalAlpha = displayObject.globalAlpha;
				let m = displayObject.globalMatrix;
				context2D.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
				if (displayObject.type == "Bitmap") {
					this.renderBitmap(displayObject as Bitmap);
				}
				else if (displayObject.type == "TextField") {
					this.renderTextField(displayObject as TextField);
				}
				else if (displayObject.type == "Shape") {
					this.renderShape(displayObject as Shape);
				}
				else if (displayObject.type == "DisplayObjectContainer") {
					this.renderContainer(displayObject as DisplayObjectContainer);
				}
			}
		}

		private renderBitmap(bitmap: Bitmap) {

			let context = this.context2D;
			if (bitmap.imageResource) {
				context.drawImage(bitmap.imageResource.bitmapData, 0, 0);
			}
		}

		private renderTextField(textField: TextField) {
			let context = this.context2D;
			context.fillStyle = textField.textcolor
			context.font = textField.size + "px " + textField.font;
			context.fillText(textField.text, 0, 0);
		}

		private renderShape(shape: Shape) {
			let context = this.context2D;
			context.fillStyle = shape.color;
			switch (shape.shapeType) {
				case "Rect":
					context.fillRect(0, 0, shape.width, shape.height);
					break;
			}
		}
	}
}