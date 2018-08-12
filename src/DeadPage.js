var DeadPage = (function(_super){
    function DeadPage(_gameMain){
        DeadPage.super(this);
        this.adviceBtn.on(Laya.Event.CLICK, this, this.adviceStart);
        this.restartBtn.on(Laya.Event.CLICK, this, this.restart);
        //初始化UI 显示
        this.gameMain = _gameMain;
    }
    //注册类
    Laya.class(DeadPage, "DeadPage", _super);
    var _proto = DeadPage.prototype;

    _proto.restart = function(event){
        console.log('restart111');
        this.gameMain.restart();
        Laya.stage.removeChild(this);
    }
    _proto.adviceStart = function(){
        console.log('adviceStart11111');
        this.gameMain.adviceRestart(true);
        Laya.stage.removeChild(this);
    }

    return DeadPage;
})(ui.DeadPageUI);