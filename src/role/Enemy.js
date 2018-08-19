var Enemy = (function(_super){
    function Enemy(){
        Enemy.super(this);
        this.className = "Enemy";
        this.enemyType = "";
        this.score = 1;
    }
    Laya.class(Enemy, "Enemy", _super);
    var _proto = Enemy.prototype;

    _proto.hitAction = function(loseHp){
        this.hp -= loseHp;
        if(this.hp > 0){
            this.playAction("hit");
        }else{
            this.playAction("down");
            Laya.SoundManager.playSound(MusicConf.ENEMY3_DOWN);
        }
       
    }
    return Enemy;
})(Role);