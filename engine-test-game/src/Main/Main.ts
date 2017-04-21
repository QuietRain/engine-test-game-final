/**
 * 得到一个json，返回一个object
 */
function getObjectfromJson(framesJson: string): dessert.res.FramesData {

      let framesObject: dessert.res.FramesData = JSON.parse(framesJson);
      return framesObject;
}


dessert.res.loadConfig("resource/default.json", () => {
      let loading = dessert.res.load("resource/default.json", (data) => {
            let resourceJson = dessert.res.get("default.json");
            let resource: dessert.res.ResourceData[] = JSON.parse(resourceJson)["resource"];


            for (let res of resource) { //加载所有资源
                  dessert.res.load(res.url, (data) => {
                  });
            }
            setTimeout(function () {
                  main()
            }, 1000);

      });




});

var main = () => {
      var canvas = document.getElementById("app") as HTMLCanvasElement;
      var stage = dessert.run(canvas);

      stage.scaleX = 0.8;
      stage.scaleY = 0.8;
      stage.touchEnabled = true;
      /*
            地图和命令表
      */
      var gamemap = new GameMap(stage);
      GameMap.replaceScene(gamemap);



      /*
            动画
      */

      let standData: string = dessert.res.get("standData.json");
      let fightData: string = dessert.res.get("fightData.json");
      let moveRData: string = dessert.res.get("moveRData.json");
      let moveLData: string = dessert.res.get("moveLData.json");

      let moveRConfig = getObjectfromJson(moveRData);
      let moveLConfig = getObjectfromJson(moveLData);
      let standConfig = getObjectfromJson(standData);
      let fightConfig = getObjectfromJson(fightData);

      var mc_stand: dessert.MovieClip = new dessert.MovieClip(standConfig);
      mc_stand.scaleX = 0.7;
      mc_stand.scaleY = 0.7;

      var mc_moveR: dessert.MovieClip = new dessert.MovieClip(moveRConfig);
      mc_moveR.scaleX = 0.7;
      mc_moveR.scaleY = 0.7;


      var mc_fight: dessert.MovieClip = new dessert.MovieClip(fightConfig);
      mc_fight.scaleX = 0.7;
      mc_fight.scaleY = 0.7;


      var mc_moveL: dessert.MovieClip = new dessert.MovieClip(moveLConfig);

      mc_moveL.scaleX = 0.7;
      mc_moveL.scaleY = 0.7;

      /*
          角色与状态机
       
      */


      var statemachine: StateMachine = new StateMachine(false, stage, mc_stand, mc_moveR, mc_moveL, mc_fight);
      stage.addChild(statemachine);
      var user = new User(statemachine, 1);


      /*
            英雄装备宝石   
            
      */



      var hero1 = new Hero(true, 34, 1001);

      var equip = new Equipment(15, 901);

      var jewel = new Jewel(3, 801);
      // equip.Addjewel(jewel);//加入宝石
      // hero1.AddEquipment(equip);//加入装备
      user.AddHero(hero1);//加入英雄


      /*
          任务service
      */
      var taskservice = new TaskService();

      /*
           NPC
      */
      var displayFactory = new DisplayFacory();

      var npc0dialoguePanel = new DialoguePanel("npc_0", stage, statemachine);
      var npc1dialoguePanel = new DialoguePanel("npc_1", stage, statemachine);
      npc0dialoguePanel.x = 300
      npc0dialoguePanel.y = 300
      npc1dialoguePanel.x = 300
      npc1dialoguePanel.y = 300

      var Npc0 = new NPC(stage, "npc_0", "Npc1.png", "tanhao.png", "wenhao2.png", "wenhao.png", npc0dialoguePanel, 1, 5);
      displayFactory.createModel(Npc0, 0.6, stage, 0 * gamemap.Boxsize, 5 * gamemap.Boxsize);

      var Npc1 = new NPC(stage, "npc_1", "Npc2.png", "tanhao.png", "wenhao2.png", "wenhao.png", npc1dialoguePanel, 8, 1);
      displayFactory.createModel(Npc1, 0.6, stage, 9 * gamemap.Boxsize, 1 * gamemap.Boxsize);

      stage.addChild(Npc0);
      stage.addChild(Npc1);

      /*
           任务
      */
      var npcTalkCondition = new NPCTalkCondition();
      var killMonsterTaskCondition = new KillMonsterTaskCondition(1);


      var task1: Task = new Task("task1", "新手教程", "与另一个NPC见面", "npc_0", "npc_1", 1, npcTalkCondition, taskservice, "task2");
      var task2: Task = new Task("task2", "杀敌", "击杀2个敌人", "npc_1", "npc_1", 2, killMonsterTaskCondition, taskservice);

      task1.status = TaskStatus.ACCEPTABLE;
      var taskPanel: TaskPanel = new TaskPanel(stage);
      stage.addChild(taskPanel);
      taskPanel.x = 1020
      taskPanel.y = 300

      taskservice.addObserver(Npc0);
      taskservice.addObserver(Npc1);
      taskservice.addObserver(taskPanel);

      taskservice.addTask(task1);
      taskservice.addTask(task2);

      var Monster = new dessert.Bitmap();
      Monster.imageResource = dessert.res.get("_monster.png");// "_monster.png";
      var MonsterButton = new Monstor(Monster, 1, 8000, 1400, 3, 7);
      stage.addChild(MonsterButton);
      displayFactory.createModel(MonsterButton, 1, stage, 4 * gamemap.Boxsize, 7 * gamemap.Boxsize);

      //属性按钮
      var PropertyButton_bitmap = new dessert.Bitmap();
      PropertyButton_bitmap.imageResource = dessert.res.get("Button.png")//"Button.png";


      var panel_bitmap = new dessert.Bitmap();
      panel_bitmap.imageResource = dessert.res.get("shuxing.jpg")//"shuxing.jpg";


      var PropertyButton = displayFactory.createPropertyButton(PropertyButton_bitmap, panel_bitmap, stage, User.user.heroes[0], 60, 300);
      stage.addChild(PropertyButton);
      PropertyButton.x = 1200;
      PropertyButton.y = 800;

      //宝箱按钮
      var box_bitmap = new dessert.Bitmap();
      box_bitmap.imageResource = dessert.res.get("box.png");//"box.png";
      box_bitmap.x = 8 * gamemap.Boxsize;
      box_bitmap.y = 9 * gamemap.Boxsize;
      stage.addChild(box_bitmap);
      box_bitmap.touchEnabled = true;
      box_bitmap.addEventListener(dessert.MouseState.MOUSE_CLICK, () => {
            // User.user.List.cancel();
            // User.user.List.addCommand(new WalkCommand(8 * GameMap.gamemap.Boxsize, 8 * GameMap.gamemap.Boxsize));
            // User.user.List.execute();

            equip.Addjewel(jewel);//加入宝石
            hero1.AddEquipment(equip);//加入装备

            box_bitmap.alpha = 0;
            box_bitmap.touchEnabled = false;

      });
}