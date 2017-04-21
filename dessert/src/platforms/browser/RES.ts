namespace RES {

	/**
	 *  拿到一个名字，用该名字遍历数组找到ImageData，返回ImageResource
	 * */
	export function getRes(name: string): dessert.ImageResource {

		var map = ImageLoader.ResourcesFile;
		if (map[name].url != null) {
			map[name].load();
			return map[name]
		}
		else {
			map[name] = new Image();
		}
	};

	export type ImageData = {
		name: string,
		type: string,
		url: string,
		width: number,
		height: number;
	}

	export class ImageLoader {
		static ResourcesFile = {};

		static loadImageConfig(ResourcesFile: ImageData[]) {
			// ImageLoader.ResourcesFile = ResourcesFile;
			for (let image of ResourcesFile) {
				let name = image.name;
				let type = image.type;
				let width = image.width;
				let height = image.height;
				let url = image.url
				let imageResource = new dessert.ImageResource(name, width, height, url);
				let map = ImageLoader.ResourcesFile;
				map[name] = imageResource;
			}
		}


	}
}