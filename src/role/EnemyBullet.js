/*
* name;
*/
var EnemyBullet = (function (_super) {
    function EnemyBullet(opts) {
        EnemyBullet.super(this);
        this.className = "EnemyBullet";
        this.graphics.drawRect(0, 0, 5, 5, 'red');
        this.vx = opts.vx || 0;
        this.vy = opts.vy || 2;
    }
    Laya.class(EnemyBullet, "EnemyBullet", _super);
    
    var _proto = EnemyBullet.prototype;

    _proto.move = function() {
        this.x += this.vx;
        this.y += this.vy;
    }

    return EnemyBullet;
}(Role));