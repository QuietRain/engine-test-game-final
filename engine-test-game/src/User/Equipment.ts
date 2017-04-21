class Equipment {    //装备
	properties: Properties;
	equipment_bitmap: dessert.Bitmap;
	jewels: Jewel[] = []; //宝石
	constructor(Level: number, configId: number) {
		this.properties = new Properties(Level);
		for (var pro of EquipmentConfig) {
			if (pro.configId == configId) {
				this.equipment_bitmap = new dessert.Bitmap();
				this.equipment_bitmap.imageResource = dessert.res.get(pro.picture);//pro.picture;
				this.properties.AddFromConfig(pro);
				break;
			}
			else {
				console.log("没找到EquipmentConfig的文件, 位于Equipment类");
			}
		}


		this.equipment_bitmap.touchEnabled = true;
		this.equipment_bitmap.addEventListener(dessert.MouseState.MOUSE_CLICK, () => {
			if (User.user.statemachine.locked) {
				console.log("equipment被点击了");
				var displayFactory = new DisplayFacory();
				displayFactory.createPropertyPanel(this.properties, GameMap.gamemap.Stage, 600, 300);
			}
		});
	}

	Addjewel(jewel: Jewel) {
		this.jewels.push(jewel);
	}



}