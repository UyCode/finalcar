// pages/carTypeList/carTypeList.js
import http from '../../utils/request.js';
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        starCount: 120,
        forksCount: 110,
        visitTotal: 130,
        PageCur: 'account',
        images: [{
                url: 'http://192.168.31.231:8088/images/car1.jpg',
            },
            {
                url: 'http://192.168.31.231:8088/images/car3.jpg',
            },
            {
                url: 'http://192.168.31.231:8088/images/car3.jpg',
            },
        ],
        userBg: 'http://192.168.31.231:8088/images/user-bg-1.png',
        notRegisteredInfo: 'سىز تىخى تېزىملاتماپسىز،  تېزىملىتىپ كىرىپ مەشخۇلاتنى داۋاملاشتۇرۇڭ',

        userInfo: '',
        hasUserInfo: '',
        canIUse: '',
        canIUseGetUserProfile: '',
        canIUseOpenData: ''

    },

    NavChange(e) {
        console.log(e);
        this.setData({
            PageCur: e.currentTarget.dataset.cur
        });
        wx.redirectTo({
            url: `../${this.data.PageCur}/${this.data.PageCur}`,
        });
    },
    onLoad() {
        console.log("app is: ",app);
        this.setData({
            userInfo: app.globalData.userInfo,
            hasUserInfo: app.globalData.hasUserInfo,
            canIUse: app.globalData.canIUse,
            canIUseGetUserProfile: app.globalData.canIUseGetUserProfile,
            canIUseOpenData: app.globalData.canIUseOpenData
        });
        if (wx.getUserProfile) {
            this.setData({
                canIUseGetUserProfile: true
            })
        }
    },
    getUserProfile(e) {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        console.log('e is :', e);
        wx.getUserProfile({
            desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (infoRes) => {
                console.log("user profile", infoRes)
                this.setData({
                    userInfo: infoRes.userInfo,
                    hasUserInfo: true
                });

                wx.login({
                    success(loginRes) {
                        const body = {
                            code: loginRes.code,
                            rawData: infoRes.rawData,
                            signature: infoRes.signature,
                            encryptedData: infoRes.encryptedData,
                            iv: infoRes.iv
                        };
                        http.post('user/login', body,
                            (res) => {
                                if (res.code == 0) {
                                    // 7.小程序存储skey（自定义登录状态）到本地
                                    wx.setStorageSync('userInfo', infoRes);
                                    wx.setStorageSync('skey', res.data.data);
                                } else {
                                    console.log('服务器异常');
                                }
                            }, (error) => {
                                console.log(error)
                            }, {});
                        /* wx.request({
                            url: 'http://localhost:8088/user/login',
                            method: 'POST',
                            header: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            data: {
                                code: loginRes.code, //临时登录凭证
                                rawData: infoRes.rawData, //用户非敏感信息
                                signature: infoRes.signature, //签名
                                encrypteData: infoRes.encryptedData, //用户敏感信息
                                iv: infoRes.iv //解密算法的向量
                            },
                            success: function (LocalRes) {
                                console.log(LocalRes);
                                if (LocalRes.statusCode == 200) {
                                    // 7.小程序存储skey（自定义登录状态）到本地
                                    wx.setStorageSync('userInfo', infoRes);
                                    wx.setStorageSync('skey', LocalRes.data.data);
                                } else {
                                    console.log('服务器异常');
                                }
                            },
                            fail: function (error) {
                                //调用服务端登录接口失败
                                console.log(error);
                            }

                        }); */
                    }
                });

            }
        })
    },

    authorizeUser: function () {

    },

    getUserInfo(e) {
        const userInfo = e.detail.userInfo;
        console.log("user info: ", userInfo);
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})