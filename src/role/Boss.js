/*
* name;
*/
var BossState = {
    SHOW: 0,
    ACTIONABLE: 1,
    DEATH: 2
}
var Boss = (function (_super) {
    function Boss() {
        Boss.super(this);
        this.className = "Boss";
        this.type = 'enemy3';
        var info = {"type" : "enemy3", "camp" : 1, "speed" : 1 + 1 * 0.5, "hp" : 1 * 3, "hitRadius" : 75};
        this.init(info);

        this.hp = 10;
        //速度
        this.speedY = 1;
        this.speedX = 1;
        this.dir = 1;
        this.state = BossState.SHOW;
        // 攻击最大冷却时间
        this.maxCd = 80;
        // 当前冷却
        this.curCd = this.maxCd;
    }

    Laya.class(Boss, "Boss", _super);

    var _proto = Boss.prototype;

    _proto.dodo = function(){

        switch (this.state) {
            case BossState.SHOW:
                this.y += this.speedY;
                if (this.y >= 200){
                    this.state = BossState.ACTIONABLE;
                }
                break;
            case BossState.ACTIONABLE:
                this.x += this.speedX * this.dir;
                if (this.x <= 0 || this.x >= 400){
                    this.dir = -this.dir;
                }
                if (this.curCd >= 0) {
                    this.curCd--;
                } else {
                    this.curCd = this.maxCd;
                    var bullet1 = new EnemyBullet({});
                    bullet1.pos(this.x - 20 , this.y);
                    var bullet2 = new EnemyBullet({});
                    bullet2.pos(this.x + 20 , this.y);
                    var bulletSide1 = new EnemyBullet({vx: 1, vy: 1.5});
                    var bulletSide2 = new EnemyBullet({vx: -1, vy: 1.5});
                    bulletSide1.pos(this.x - 20 , this.y);
                    bulletSide2.pos(this.x + 20 , this.y);
                    gameMain.enemyBulletsBox.addChild(bullet1);
                    gameMain.enemyBulletsBox.addChild(bullet2);
                    gameMain.enemyBulletsBox.addChild(bulletSide1);
                    gameMain.enemyBulletsBox.addChild(bulletSide2);
                }
                break;
            case BossState.DEATH:

                break;
            default:
                console.log('unknow boss_state!');
        }

    }

    _proto.hitAction = function(loseHp){
        this.hp -= loseHp;
        if(this.hp > 0){
            this.playAction("hit");
        }else{
            this.playAction("down");
            Laya.SoundManager.playSound(MusicConf.ENEMY3_DOWN);
            return true;
        }
       
    }


    return Boss;
}(Role));