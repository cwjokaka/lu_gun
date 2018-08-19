var HomePage = (function(_super){
    function HomePage(_gameMain){
        HomePage.super(this);
        // var obj = Laya.stage.getChildByName('GameMain');
        //注册按钮点击事件，点击后暂停游戏
        // this.bg1 = new Laya.Sprite();
        // this.bg1.loadImage("resource/home_bg.png");
        // this.addChild(this.bg1);
        this.startLabel.on(Laya.Event.CLICK, this, this.startGame);
    }
    //注册类
    Laya.class(HomePage, "HomePage", _super);
    var _proto = HomePage.prototype;

    _proto.startGame = function(){
        var gameMain = new GameMain();
        Laya.stage.replaceChild(gameMain, this);
    }
    return HomePage;
})(ui.HomePageUI);