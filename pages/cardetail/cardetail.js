// pages/cardetail/cardetail.js
import http from '../../utils/request.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        carDetail:{},
    },

    getCarDetail: function(data) {
        console.log(data);
        let that = this;
        http.post("cars/detail", data,
        (res) => {
            if (res.code == 0) {
                console.log(res.data);
                that.setData({
                    carDetail: res.data
                })
            }
        },
        (error) => {
            console.log("something bad happen: ", error);
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (option) {
    console.log(option.query)
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage');
    let that = this;
    // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      that.getCarDetail({id: data.data});
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