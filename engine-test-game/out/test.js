var canvas = document.getElementById("app");
var stage = engine.run(canvas);
var bitmap = new engine.Bitmap();
stage.addChild(bitmap);
// var button = new engine.Bitmap();
// button.ImageResource.src = "按钮.png";
// button.x = 300;
// var bitmap1 = new engine.Bitmap();
// bitmap1.ImageResource.src = "1.png";
// bitmap1.x = 300;
/**
 * 动画
 *
 */
var resourcesFile = [
    {
        name: "stand1.png",
        type: "image",
        url: "resource/stand/stand1.png",
        width: 82,
        height: 118
    },
    {
        name: "stand2.png",
        type: "image",
        url: "resource/stand/stand2.png",
        width: 82,
        height: 118
    }, {
        name: "stand3.png",
        type: "image",
        url: "resource/stand/stand3.png",
        width: 82,
        height: 118
    }, {
        name: "stand4.png",
        type: "image",
        url: "resource/stand/stand4.png",
        width: 82,
        height: 118
    }, {
        name: "stand5.png",
        type: "image",
        url: "resource/stand/stand5.png",
        width: 82,
        height: 118
    }, {
        name: "stand6.png",
        type: "image",
        url: "resource/stand/stand6.png",
        width: 82,
        height: 118
    }, {
        name: "stand7.png",
        type: "image",
        url: "resource/stand/stand7.png",
        width: 82,
        height: 118
    }, {
        name: "stand8.png",
        type: "image",
        url: "resource/stand/stand8.png",
        width: 82,
        height: 118
    }, {
        name: "moveR1.png",
        type: "image",
        url: "resource/moveR/moveR1.png",
        width: 108,
        height: 114
    }, {
        name: "moveR2.png",
        type: "image",
        url: "resource/moveR/moveR2.png",
        width: 108,
        height: 114
    }, {
        name: "moveR3.png",
        type: "image",
        url: "resource/moveR/moveR3.png",
        width: 108,
        height: 114
    }, {
        name: "moveR4.png",
        type: "image",
        url: "resource/moveR/moveR4.png",
        width: 108,
        height: 114
    }, {
        name: "moveR5.png",
        type: "image",
        url: "resource/moveR/moveR5.png",
        width: 108,
        height: 114
    }, {
        name: "moveR6.png",
        type: "image",
        url: "resource/moveR/moveR6.png",
        width: 108,
        height: 114
    }, {
        name: "moveR7.png",
        type: "image",
        url: "resource/moveR/moveR7.png",
        width: 108,
        height: 114
    }, {
        name: "moveR8.png",
        type: "image",
        url: "resource/moveR/moveR8.png",
        width: 108,
        height: 114
    }, {
        name: "moveL1.png",
        type: "image",
        url: "resource/moveL/moveL1.png",
        width: 108,
        height: 114
    }, {
        name: "moveL2.png",
        type: "image",
        url: "resource/moveL/moveL2.png",
        width: 108,
        height: 114
    }, {
        name: "moveL3.png",
        type: "image",
        url: "resource/moveL/moveL3.png",
        width: 108,
        height: 114
    }, {
        name: "moveL4.png",
        type: "image",
        url: "resource/moveL/moveL4.png",
        width: 108,
        height: 114
    }, {
        name: "moveL5.png",
        type: "image",
        url: "resource/moveL/moveL5.png",
        width: 108,
        height: 114
    }, {
        name: "moveL6.png",
        type: "image",
        url: "resource/moveL/moveL6.png",
        width: 108,
        height: 114
    }, {
        name: "moveL7.png",
        type: "image",
        url: "resource/moveL/moveL7.png",
        width: 108,
        height: 114
    }, {
        name: "moveL8.png",
        type: "image",
        url: "resource/moveL/moveL8.png",
        width: 108,
        height: 114
    }, {
        name: "fight1.png",
        type: "image",
        url: "resource/fight/fight1.png",
        width: 128,
        height: 128
    }, {
        name: "fight2.png",
        type: "image",
        url: "resource/fight/fight2.png",
        width: 128,
        height: 128
    }, {
        name: "fight3.png",
        type: "image",
        url: "resource/fight/fight3.png",
        width: 128,
        height: 128
    }, {
        name: "fight4.png",
        type: "image",
        url: "resource/fight/fight4.png",
        width: 128,
        height: 128
    }, {
        name: "fight5.png",
        type: "image",
        url: "resource/fight/fight5.png",
        width: 128,
        height: 128
    }, {
        name: "fight6.png",
        type: "image",
        url: "resource/fight/fight6.png",
        width: 128,
        height: 128
    }, {
        name: "fight7.png",
        type: "image",
        url: "resource/fight/fight7.png",
        width: 128,
        height: 128
    }, {
        name: "fight8.png",
        type: "image",
        url: "resource/fight/fight8.png",
        width: 128,
        height: 128
    }];
var standData = {
    name: "stand",
    frames: [
        { image: "stand1.png" },
        { image: "stand2.png" },
        { image: "stand3.png" },
        { image: "stand4.png" },
        { image: "stand5.png" },
        { image: "stand6.png" },
        { image: "stand7.png" },
        { image: "stand8.png" },
    ]
};
var moveRightData = {
    name: "MoveRight",
    frames: [
        { image: "moveR1.png" },
        { image: "moveR2.png" },
        { image: "moveR3.png" },
        { image: "moveR4.png" },
        { image: "moveR5.png" },
        { image: "moveR6.png" },
        { image: "moveR7.png" },
        { image: "moveR8.png" },
    ]
};
var moveLeftData = {
    name: "MoveLight",
    frames: [
        { image: "moveL1.png" },
        { image: "moveL2.png" },
        { image: "moveL3.png" },
        { image: "moveL4.png" },
        { image: "moveL5.png" },
        { image: "moveL6.png" },
        { image: "moveL7.png" },
        { image: "moveL8.png" },
    ]
};
var fightData = {
    name: "Fight",
    frames: [
        { image: "fight1.png" },
        { image: "fight2.png" },
        { image: "fight3.png" },
        { image: "fight4.png" },
        { image: "fight5.png" },
        { image: "fight6.png" },
        { image: "fight7.png" },
        { image: "fight8.png" },
    ]
};
/**
 * 来个形状和文字
 */
var shape = new engine.Shape();
shape.beginFill("#000000", 0.5);
shape.drawRect(200, 100, 100, 100);
var text1 = new engine.TextField();
text1.text = "lalala";
text1.textcolor = "#0000FF";
text1.x = 300;
text1.y = 100;
var text2 = new engine.TextField();
text2.text = "lalala";
text2.textcolor = "#0000FF";
text2.size = 20;
text2.x = 300;
text2.y = 110;
//动画序列
var moveRightclip = new engine.MovieClip(moveRightData);
var moveLeftclip = new engine.MovieClip(moveLeftData);
var fightclip = new engine.MovieClip(fightData);
var standclip = new engine.MovieClip(standData);
var container1 = new engine.DisplayObjectContainer();
container1.x = 0;
var container2 = new engine.DisplayObjectContainer();
container2.x = 100;
var container3 = new engine.DisplayObjectContainer();
container3.x = 100;
container3.y = 100;
var container4 = new engine.DisplayObjectContainer();
container4.x = 100;
container4.y = 200;
var container5 = new engine.DisplayObjectContainer();
container4.x = 100;
container4.y = 300;
// container1.addChild(bitmap1);
// container1.addChild(button);
container2.addChild(moveRightclip);
container3.addChild(moveLeftclip);
container4.addChild(fightclip);
container5.addChild(standclip);
stage.addChild(container2);
stage.addChild(container3);
stage.addChild(container4);
stage.addChild(container5);
var container6 = new engine.DisplayObjectContainer();
var bitmap1 = new engine.Bitmap();
RES.ImageLoader.loadImageConfig(resourcesFile);
bitmap1.imageResource = RES.getRes("fight1.png");
bitmap1.x = 300;
container6.addChild(bitmap1);
stage.addChild(container6);
// moveRightclip.touchEnabled = true;
// moveRightclip.addEventListener(engine.MouseState.MOUSE_MOVE, (e) => {
// 	console.log("e.offsetX: " + e.offsetX + "  e.offsetY: " + e.offsetY);
// 	container2.x += e.movementX;
// 	container2.y += e.movementY;
// });
// moveLeftclip.touchEnabled = true;
// moveLeftclip.addEventListener(engine.MouseState.MOUSE_CLICK, (e) => {
// 	alert("111");
// });
shape.touchEnabled = true;
text2.touchEnabled = true;
text2.addEventListener(engine.MouseState.MOUSE_DOWN, function (e) {
    var width = text2.width;
    var height = text2.height;
});
