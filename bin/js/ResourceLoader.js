var ResourceLoader = (function(_super){
    function ResourceLoader(){
        ResourceLoader.super(this);
    }
    Laya.class(ResourceLoader, "ResourceLoader", _super);

    var _proto = ResourceLoader.prototype;

    //初始化
    _proto.init = function(){
        this.loadGameImge();
    }

    //加载游戏图片
    _proto.loadGameImge = function(){
        //缓存飞机的动作
        Laya.Animation.createFrames(["resource/hero_fly1.png","resource/hero_fly2.png"],"hero_fly");
        //缓存集中爆炸动作
        Laya.Animation.createFrames(["resource/hero_down1.png","resource/hero_down2.png"
        ,"resource/hero_down3.png","resource/hero_down4.png"],"hero_down");

        //缓存敌机1飞行动作
        Laya.Animation.createFrames(["resource/enemy1_fly1.png"],"enemy1_fly");
        //缓存敌机1爆炸动作
        Laya.Animation.createFrames(["resource/enemy1_down1.png","resource/enemy1_down2.png","resource/enemy1_down3.png"
        ,"resource/enemy1_down4.png"],"enemy1_down");

        //缓存敌机2飞行动作
        Laya.Animation.createFrames(["resource/enemy2_fly1.png"],"enemy2_fly");
        //缓存敌机2爆炸动作
        Laya.Animation.createFrames(["resource/enemy2_down1.png","resource/enemy2_down2.png","resource/enemy2_down3.png"
        ,"resource/enemy2_down4.png"],"enemy2_down");
        //缓存敌机2碰撞动作
        Laya.Animation.createFrames(["resource/enemy2_hit.png"],"enemy2_hit");

        //缓存敌机3飞行动作
        Laya.Animation.createFrames(["resource/enemy3_fly1.png","resource/enemy3_fly2.png"],"enemy3_fly");
        //缓存敌机3爆炸动作
        Laya.Animation.createFrames(["resource/enemy3_down1.png","resource/enemy3_down2.png","resource/enemy3_down3.png"
        ,"resource/enemy3_down4.png","resource/enemy3_down5.png","resource/enemy3_down6.png"],"enemy3_down");
        //缓存敌机3碰撞动作
        Laya.Animation.createFrames(["resource/enemy3_hit.png"],"enemy3_hit");

        //缓存子弹动画
        Laya.Animation.createFrames(["resource/bullet1.png"],"bullet1_fly");

        //缓存强化包
        Laya.Animation.createFrames(["resource/ufo1.png"],"ufo1_fly");
        //缓存医疗包
        Laya.Animation.createFrames(["resource/ufo2.png"],"ufo2_fly");
    }

    return ResourceLoader;
})(Laya.Sprite)