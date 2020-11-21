/*
 * @Author: mtonhuang
 * @Feature: 小程序自定义导航栏组件 
 */

Component({
    properties: {
        titleText: { //导航栏文字
            type: String,
            value: '导航栏'
        },
        backgroundImg: { //背景图片路径
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
        }
    },
    attached: function(){
        var that = this;
        that.getSysmInfo();
        that.setStyle();
    },
    data: {

    },
    methods: {
        getSysmInfo: function() {
            wx.getSystemInfo({
                success: function(res) {
                    let isIos = res.system.indexOf('iOS') > -1;
                    let status = res.statusBarHeight;
                    that.setData({
                        navHeight: isIos ? 44 : 48,
                        status: status
                    })
                }
            })
        },
        back: function(){
            this.triggerEvent('back')
        },
        home: function() {
            this.triggerEvent('home');
        }
    }
})