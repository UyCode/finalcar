// app.js
import http from './utils/request.js'
App({
  onLaunch() {
    const _this = this;
    console.log("app info :", _this);
    wx.login({
      success(loginRes) {
        const body = {
          code: loginRes.code
        };
        http.post('user/login', body, res => {
          console.log(res);
          if (res.code == 0) {
            wx.setStorageSync('userInfo', res.data);
            wx.setStorageSync('skey', res.data.skey);
            wx.setStorageSync('token', res.data.token);

            _this.globalData.userInfo = wx.getStorageSync('userInfo');
            _this.globalData.hasUserInfo = true;
            _this.globalData.canIUseOpenData = true;
            _this.globalData.canIUseGetUserProfile = true,
              _this.globalData.canIUse = wx.canIUse('button.open-type.getUserInfo')
          }
        }, error => console.log(error));
      },
    });
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },

  loadModal() {
    this.globalData.loadModal = true;
    const _this = this;
    console.log("this on app modal: ", _this);
    setTimeout(() => {
      console.log("this in interval: ", this);
      _this.globalData.loadModal = false;
    }, 500);
  },
  globalData: {
    loadModal: false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: false,
    canIUseGetUserProfile: false,
    canIUseOpenData: false,
    token: ''
  },
})