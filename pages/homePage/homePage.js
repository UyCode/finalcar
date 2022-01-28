// pages/homePage/homePage.js
import http from '../../utils/request.js'
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        carSwiper: [
            {
                id: 0,
                type: 'image',
                url: 'http://192.168.31.231:8088/images/car1.jpg'
            },
            {
                id: 1,
                type: 'image',
                url: 'http://192.168.31.231:8088/images/car2.jpg'
            },
            {
                id: 3,
                type: 'image',
                url: 'http://192.168.31.231:8088/images/car3.jpg'
            },
            {
                id: 4,
                type: 'image',
                url: 'http://192.168.31.231:8088/images/car2.jpg'
            },
            {
                id: 5,
                type: 'image',
                url: 'http://192.168.31.231:8088/images/car1.jpg'
            },
            {
                id: 6,
                type: 'image',
                url: 'http://192.168.31.231:8088/images/car3.jpg'
            },
        ],
        cardCur: 0,
        carList: [],
        PageCur: 'homePage',
        loadModal: true

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
    getCar: function () {
        http.get('cars/list',{},
            (res) => {
                if (res.code == 0) {
                    this.setData({
                        carList: res.data
                    })
                }
            },
            (error) => {console.log(error);}
        );
    },

    getDetail: function(event){
        console.log(event.currentTarget.dataset.carId);
        const id = event.currentTarget.dataset.carId;
        wx.navigateTo({
            url: `../cardetail/cardetail`,
            events: {
              // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
              acceptDataFromOpenedPage: function(id) {
                console.log(id)
              },
              someEvent: function(id) {
                console.log(id)
              }
            },
            success: function(res) {
              // 通过eventChannel向被打开页面传送数据
              res.eventChannel.emit('acceptDataFromOpenerPage', { data: id})
            }
          })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getCar();
        console.log("app on home page:", app);
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
        this.getCar();
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

    },
      // cardSwiper
      cardSwiper(e) {
        this.setData({
          cardCur: e.detail.current
        })
      },
    
})