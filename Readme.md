github地址，可以直接clone复用：[navbar-for-wxapp](https://github.com/mtonhuang/navbar-for-wxapp)

<div style="align: center">
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c0515bc779440bf95c812adfb02a8a8~tplv-k3u1fbpfcp-zoom-1.image"/>
</div>

看了上图，你可以能会说：“就这? 丑不拉几的...”

当然，人靠衣装，navbar靠背景，换张背景图，你可能就经常见过啦，效果如下：（随便拿了星巴克小程序图，侵删）

<div style="align: center">
<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2fb10ac0e8114f9abe468620d5ad74f8~tplv-k3u1fbpfcp-zoom-1.image"/>
</div>

---

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
        const self = this;
        self.getSysmInfo();
    },
    data: {

    },
    methods: {
        getSysmInfo: function() {
            const self = this;
            wx.getSystemInfo({
                success: function(res) {
                    let isIos = res.system.indexOf('iOS') > -1;
                    let status = res.statusBarHeight;
                    self.setData({
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

```

### 2. index.wxml
```html
<view class="nav" style="height: {{status + navHeight}}px">
    <view class="index-banner" wx:if="{{backgroundImg}}">
        <image class="index-banner__cover" mode="scaleToFill" src="{{backgroundImg}}"></image>
    </view>
    <view class="status" style="height: {{status}}px;"></view>
    <view class="navbar" style="height:{{navHeight}}px;">
        <view class="capsule" style="{{backIcon ? '' : 'width: 152rpx;margin-left: 24rpx'}}">
            <view class="back-icon" wx:if="{{backIcon}}" bindtap="back">
                <image class="imag_back" src="{{backIcon}}"></image>
            </view>
            <view class="home-icon" wx:if="{{homeIcon}}" bindtap="home" style="{{backIcon ? '' : 'left: 84.2rpx'}}">
                <image class="imag_home" src="{{homeIcon}}"></image>
            </view>
        </view>
        <view class="nav-title" wx:if="{{titleText}}">
            <text>{{titleText}}</text>
        </view>
    </view>
</view>
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

当然，喜欢的话，请不要吝啬您的start for my [github blog](https://github.com/mtonhuang/blog)，Thanks♪(･ω･)ﾉ


