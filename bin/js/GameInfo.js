var GameInfo = (function(_super){
    function GameInfo(_gameMain){
        GameInfo.super(this);
        // var obj = Laya.stage.getChildByName('GameMain');
        //注册按钮点击事件，点击后暂停游戏
        this.pauseBtn.on(Laya.Event.CLICK, this, this.onPauseBtnClick);
        //初始化UI 显示
        this.reset();
        this.gameMain = _gameMain;
    }
    //注册类
    Laya.class(GameInfo, "GameInfo", _super);
    var _proto = GameInfo.prototype;

    _proto.reset = function(){
        this.infoLabel.text = "";
        this.showHp(5);
        this.showLevel(1);
        this.showScore(0)
    }

    //暂停按钮点击事件
    _proto.onPauseBtnClick = function(event){
        //阻止事件往下传递
        event.stopPropagation();
        this.infoLabel.text = "游戏已暂停，点击任意地方回复游戏";
        this.gameMain.pause();
        Laya.stage.once(Laya.Event.CLICK, this, this.onStageClick);
    }
    //恢复游戏
    _proto.onStageClick = function(){
        this.infoLabel.text = "";
        this.gameMain.resume();
    }

    //显示血量
    _proto.showHp = function(value){
        this.hpLabel.text = "HP:" + value;
    }
    //显示等级
    _proto.showLevel = function(value){
        this.levelLabel.text = "level:" + value;
    }
    //显示积分
    _proto.showScore = function(value){
        this.scoreLabel.text = "score:" + value;
    }
    return GameInfo;
})(ui.GameInfoUI);