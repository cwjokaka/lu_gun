 var WebGL = laya.webgl.WebGL;
(function(){
        (function Main(){
            Laya.init(400, 852, WebGL);
            Laya.Stat.show(0,0);
            //屏幕缩放模式 始终等比显示
            Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
            //水平对齐方式， 水平居中
            Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
            //垂直对其方式， 垂直居中
            Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
            //屏幕适配  横屏还是竖屏， 默认不改变
            Laya.stage.screenMode = Laya.Stage.SCREEN_NONE;
            var homePage = new HomePage();
            Laya.stage.addChild(homePage);
        })();
 })();