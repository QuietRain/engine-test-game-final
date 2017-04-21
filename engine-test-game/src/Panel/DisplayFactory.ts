class DisplayFacory {

	getDesciption(property: Property) {//传入一个属性组
		return property.name + " : " + property.quality;

	}

	createPropertyButton(PropertyButton: dessert.Bitmap, panel: dessert.Bitmap, stage: dessert.DisplayObjectContainer, hero: Hero, x: number, y: number): dessert.DisplayObjectContainer {
		var ButtonContainer = new dessert.DisplayObjectContainer;
		PropertyButton.touchEnabled = true;

		PropertyButton.addEventListener(dessert.MouseState.MOUSE_CLICK, () => {
			var locked = User.user.statemachine.locked;

			var currentx = 60;
			var currenty = 300;
			if (locked == 0) {
				User.user.statemachine.locked++;
				PropertyButton.touchEnabled = false;
				var container = new dessert.DisplayObjectContainer();


				container.x = 650;
				container.y = 130;
				container.addChild(panel);

				var closefield = new dessert.TextField();
				closefield.text = "关闭";
				closefield.textcolor = "#000000";
				closefield.x = 400;
				// closefield.y = 140;
				closefield.touchEnabled = true;
				container.addChild(closefield);

				for (var equipment of hero.equipments) {
					if (equipment) {
						currentx = x;
						var equipment_bitmap = equipment.equipment_bitmap;
						equipment_bitmap.x = currentx;
						equipment_bitmap.y = currenty;
						container.addChild(equipment_bitmap);
						currentx = currentx + 200;
						for (var jewel of equipment.jewels) {
							if (jewel) {
								var jewel_bitmap = jewel.jewel_bitmap;
								jewel_bitmap.x = currentx;
								jewel_bitmap.y = currenty;
								container.addChild(jewel_bitmap);
								currentx = currentx + 120;
							}
						}
						currenty = currenty + 150;
					}
				}

				var heroContainer = this.createHero(User.user.heroes[0], 100, 88);
				container.addChild(heroContainer);
				var equipContainer = this.createEquitment(User.user.heroes[0].equipments, 320, 88);
				container.addChild(equipContainer);

				container.touchEnabled = true;

				stage.addChild(container);
				closefield.addEventListener(dessert.MouseState.MOUSE_CLICK, () => {

					User.user.statemachine.locked--;
					stage.removeChild(container);

					PropertyButton.touchEnabled = true;

				})
			}
		});
		ButtonContainer.addChild(PropertyButton);
		return ButtonContainer;
	}



	createHero(hero: Hero, x, y): dessert.DisplayObjectContainer {
		var _y = 25;
		var container = new dessert.DisplayObjectContainer();

		for (var i = 0; i < hero.properties.order.length; i++) {
			var p = hero.properties[hero.properties.order[i]];
			if (p) {
				var tf = new dessert.TextField();
				if (hero.properties.all[i].isRate) {
					tf.text = this.getDesciption(hero.properties.all[i]) + " " + p / 10 + "%";
				} else {
					tf.text = this.getDesciption(hero.properties.all[i]) + " " + p;
				}

				tf.textcolor = "#000000";
				tf.y = _y;
				_y = _y + 45;
				container.addChild(tf);
			}
			;
		}
		container.x = x;
		container.y = y
		return container;
	}

	createEquitment(equipments: Equipment[], x, y): dessert.DisplayObjectContainer {
		var _y = 25;
		var container = new dessert.DisplayObjectContainer();
		for (var i = 0; i < User.user.heroes[0].properties.order.length; i++) {           //遍历属性
			var result = 0;
			for (let equip of equipments) {      //遍历装备
				result = result + equip.properties[equip.properties.order[i]];
				for (let jewel of equip.jewels) {   //遍历宝石
					result = result + jewel.properties[jewel.properties.order[i]];    //结果加上装备和宝石的第i个属性
				}
			}
			var tf = new dessert.TextField();
			if (result != 0) {
				if (User.user.heroes[0].properties.all[i].isRate) {
					tf.text = " + " + result / 10 + " %";
				} else {
					tf.text = " + " + result + " ";
				}
			}
			tf.y = _y;
			tf.textcolor = "#000000";
			_y = _y + 45;
			container.addChild(tf);


		}
		container.x = x;
		container.y = y
		return container;
	}


	createPropertyPanel(properties: Properties, stage: dessert.DisplayObjectContainer, x, y) {
		var locked = User.user.statemachine.locked;
		locked++;

		var container = new dessert.DisplayObjectContainer();
		var panel = new dessert.Shape();
		panel.beginFill("#FFFFFF", 0.8);
		panel.drawRect(x, y, 400, 400);
		// panel.endFill();
		y = y + 20;
		stage.addChild(panel);
		var count = 0;
		for (var i = 0; i < properties.order.length; i++) {

			var p = properties[properties.order[i]];

			if (p) {
				var tf = new dessert.TextField();
				console.log("打印数据")

				if (properties.all[i].isRate) {
					tf.text = this.getDesciption(properties.all[i]) + " " + p / 10 + "%";
				} else {
					tf.text = this.getDesciption(properties.all[i]) + " " + p;
				}
				tf.x = x;
				tf.y = y;
				y = y + 48;
				container.addChild(tf);
			}
		}
		stage.addChild(container);
		panel.touchEnabled = true;
		panel.addEventListener(dessert.MouseState.MOUSE_CLICK, () => {

			stage.removeChild(container);
			stage.removeChild(panel);
			if (locked >= 0) {
				locked--;
			}
		})
	}

	createModel(model: dessert.DisplayObjectContainer, scale: number, stage: dessert.DisplayObjectContainer, x: number, y: number) {
		stage.addChild(model);
		model.x = x;
		model.y = y;
		model.scaleX = scale;
		model.scaleY = scale;
	}
}