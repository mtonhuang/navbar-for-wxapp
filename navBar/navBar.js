/*
 * @Author: mtonhuang
 * @Feature: 小程序自定义导航栏组件 
 */

Component({
    properties: {
        background: { //背景颜色，导航栏
            type: String,
            value: '#fff'
        },
        color: { //字体颜色
            type: String,
            value: 'rgba(0, 0, 0, 1)'
        },
        titleText: { //导航栏文字
            type: String,
            value: ''
        },
        backgroundImg: { //背景图片路径
            type: String,
            value: ''
        },
        titleImg: { //标题图片
            type: String,
            value: ''
        },
        backIcon: { //返回按钮
            type: String,
            value: ''
        },
        homeIcon: { //房子按钮
            type: String,
            value: ''
        },
        fontSize: { //字体大小
            type: Number,
            value: 16
        },
        iconHeight: { //icon高度
            type: Number,
            value: 19
        },
        iconWidth: { //icon宽度
            type:Number,
            value: 58
        }
    },
    attached: function(){
        var that = this;
        that.setNavSize();
        that.setStyle();
    },
    data: {

    },
    methods: {
        // 通过获取系统信息计算导航栏高度
        setNavSize: function() {
            let that = this, 
            sysinfo = wx.getSystemInfoSync(), 
            statusHeight = sysinfo.statusBarHeight, 
            isiOS = sysinfo.system.indexOf('iOS') > -1,
            navHeight;
            if (!isiOS) {
                navHeight = 48;
            } else {
                navHeight = 44;
            }
            that.setData({
                status: statusHeight,
                navHeight: navHeight
            })
        },
        setStyle: function() {
            var that  = this, 
            containerStyle, 
            textStyle, 
            iconStyle;
            containerStyle = ['background:' + that.data.background].join(';');
            textStyle = ['color:' + that.data.color,'font-size:' + that.data.fontSize + 'px'].join(';');
            iconStyle = ['width: ' + that.data.iconWidth + 'px','height: ' + that.data.iconHeight + 'px'].join(';');
            that.setData({
                containerStyle: containerStyle,
                textStyle: textStyle,
                iconStyle: iconStyle
            })
        },
        // 返回事件
        back: function(){
            this.triggerEvent('back')
        },
        home: function() {
            this.triggerEvent('home');
        }
    }
})

