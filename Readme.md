# navbar-for-wxapp

## 1. 【必填】index.json

```JS
{
    "navigationStyle": "custom", //自定义导航栏，必填
    "usingComponents": {
        "nav-bar": "../../components/navBar/navBar" //引入我们的组件
    }
}
```

## 2. 【必填】index.wxml

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
  backgroundImg="test.png"
  backIcon="../../assets/img/svg/back_default.svg">
  </nav-bar>
</view>
```

## 3. 【必填】根据不同机型，计算出 height 与 status 的值

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

## 4. 【选填】事件 back 或者 home

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

## 5.【选填】读者也可以自定义字体颜色等，写法就不再赘述

---

## Contributor

- mtonhuang
