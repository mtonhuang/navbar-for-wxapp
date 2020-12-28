效果如图：

<div style="align: center">
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c0515bc779440bf95c812adfb02a8a8~tplv-k3u1fbpfcp-zoom-1.image"/>
</div>

看了上图，你可以能会说：“就这? 丑不拉几的...”

当然，人靠衣装，navbar靠背景，换张背景图，你可能就经常见过啦，效果如下：（随便拿了星巴克小程序图，侵删）

<div style="align: center">
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2fb10ac0e8114f9abe468620d5ad74f8~tplv-k3u1fbpfcp-zoom-1.image"/>
</div>
<div style="align: center">
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a82a79d1507d419b81b5e05ad285caea~tplv-k3u1fbpfcp-zoom-1.image"/>
</div>

ok，废话不多说，直接代码走起...

## 一、如何实现
### 1. index.js
```JS
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

```

### 2. index.wxml
```html
<view class="nav" style="height: {{status + navHeight}}px;">
  <view class="status" style="height: {{status}}px;{{containerStyle}}"></view>
  <view class="navbar" style="height:{{navHeight}}px;{{containerStyle}}">
    <view style="{{backIcon ? '' : 'width: 152rpx;margin-left: 24rpx'}}">
      <view class="back-icon" wx:if="{{backIcon}}" bindtap="back">
        <image class="imag_back" src="{{backIcon}}"></image>
      </view>
      <view
        class="home-icon"
        wx:if="{{homeIcon}}"
        bindtap="home"
        style="{{backIcon ? '' : 'left: 84.2rpx'}}"
      >
        <image class="imag_home" src="{{homeIcon}}"></image>
      </view>
    </view>
    <view class="nav-icon" wx:if="{{titleImg}}">
      <image class="image_nav" src="{{titleImg}}" style="{{iconStyle}}"></image>
    </view>
    <view class="nav-title" wx:if="{{titleText && !titleImg}}">
      <text style="{{textStyle}}">{{titleText}}</text>
    </view>
  </view>
  <view class="index-banner" wx:if="{{backgroundImg}}">
    <image class="index-banner__cover" mode="scaleToFill" src="{{backgroundImg}}"></image>
  </view>
</view>
```

### 3.index.wxss

```css
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
}
.navbar {
  position: relative;
  display: flex;
  align-items: center;
}
.back-icon,
.home-icon {
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  display: flex;
}
.back-icon {
  left: 28rpx;
  z-index: 10002;
}
.home-icon {
  left: 124rpx;
  z-index: 10002;
}
.back-icon .imag_back {
  margin: auto;
  width: 48rpx;
  height: 48rpx;
  vertical-align: -1rpx;
}
.home-icon .imag_home {
  margin: auto;
  width: 32rpx;
  height: 32rpx;
  vertical-align: -1rpx;
}
.nav-title,
.nav-icon {
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  font-size: 0;
  font-weight: bold;
}

.index-banner {
  padding-top: 270rpx;
  position: relative;
}
.index-banner__cover {
  width: 100%;
  z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 500rpx;
}

```

## 二、如何使用

### 1. 【必填】index.json

```JS
{
    "navigationStyle": "custom", //自定义导航栏，必填
    "usingComponents": {
        "nav-bar": "../../components/navBar/navBar" //引入我们的组件
    }
}
```

### 2. 【必填】index.wxml

- 给页面的最大父级 padding-top
- 引入组件，名称为 index.json 中自定义的组件名称 nav-bar
- 根据自己需要配置 背景图，回退 icon，小房子按钮，标题文字等

```JS
<view class="page" style="padding-top: {{height + status}}px">
  <nav-bar
  bindback="back"
  bindhome="home"
  backIcon="../../assets/img/svg/back.svg"
  homeIcon="../../assets/img/svg/home.svg"
  titleText="这是自定义导航栏"
  backgroundImg="test.png">
  </nav-bar>
</view>
```

### 3. 【必填】根据不同机型，计算出 height 与 status 的值

```JS
onLoad() {
        let that = this;
        wx.getSystemInfo({
            success: function(res) {
                let isIos = res.system.indexOf('iOS') > -1;
                let status = res.statusBarHeight;
                that.setData({
                    height: isIos ? 44 : 48,
                    status: status
                })
            }
        })
    }
```

### 4. 【选填】事件 back 或者 home

```JS
// 根据业务需求
back: function () {
    wx.reLaunch({
        url: '../index/index'
    })
}
home: function () {
    wx.reLaunch({
        url: '../index/index'
    })
}
```

### 5.【选填】读者也可以自定义字体颜色等，写法就不再赘述

---

### Contributor

- mtonhuang

github地址，可以直接clone复用：[navbar-for-wxapp](https://github.com/mtonhuang/navbar-for-wxapp)

当然，喜欢的话，请不要吝啬您的start for my [github blog](https://github.com/mtonhuang/blog)，Thanks♪(･ω･)ﾉ


