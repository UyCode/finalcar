/**
 2  * @author uycode
 3  */    // 登录请求头
var header = {
    "content-type": "application/json;charset=utf-8", // 请求数据类型根据需求自行更改
    os: "android/ios",
    version: "1.0.0",
};
// url请求前缀（这里是开发配置，线上环境和上线测试应使用域名）
const BaseUrl = "http://192.168.31.231:8088/";

/**
 14  * function: 根据需求处理请求参数：添加固定参数配置等
 15  * @params 请求参数
 16  */
function dealParams(params) {
    console.log("请求参数:", params);
    return params;
}

/**
 23  * 供外部get请求调用
 24  */
function get(url, params, onSuccess, onFailed, useToken) {
    // console.log("请求方式：", "GET");
    // 判断是否携带token，token在用户登录后保存在app.js定义的对象中可根据自己保存策略获取。
    useToken == null || useToken == "undefined" ?
        (header["Authorization"] = "Bearer " + getApp().globalData.token) :
        delete header.Authorization; //wx.getStorageSync("token")
    wx.request({
        url: BaseUrl + url,
        params: dealParams(params),
        method: 'GET',
        header: header,
        timeout: 5000,
        success: function (res) {
            wx.hideLoading();
            console.log("响应：", res.data);
            if (res.data) {
                /** start 根据需求 接口的返回状态码进行处理 */
                if (res.statusCode == 200) {
                    onSuccess(res.data); //request success
                } else {
                    onFailed(res.data.message); //request failed
                }
                /** end 处理结束*/
            }
        },
        fail: function (error) {
            // onFailed(""); //failure for other reasons
            console.log(error);
        },
    });
}

/**
 31  * 供外部post请求调用
 32  */
function post(url, data, onSuccess, onFailed, useToken) {
    // console.log("请求方式：", "POST");
    // 判断是否携带token，token在用户登录后保存在app.js定义的对象中可根据自己保存策略获取。
    useToken == null || useToken == "undefined" ?
        (header["Authorization"] = "Bearer " + getApp().globalData.token) :
        delete header.Authorization; //wx.getStorageSync("token")
    wx.request({
        url: BaseUrl + url,
        data: data,
        method: 'POST',
        header: header,
        timeout: 5000,
        success: function (res) {
            wx.hideLoading();
            console.log("响应：", res.data);
            if (res.data) {
                /** start 根据需求 接口的返回状态码进行处理 */
                if (res.statusCode == 200) {
                    onSuccess(res.data); //request success
                } else {
                    onFailed(res.data.message); //request failed
                }
                /** end 处理结束*/
            }
        },
        fail: function (error) {
            // onFailed(""); //failure for other reasons
            console.log(error);
        },
    });
}

// 1.通过module.exports方式提供给外部调用
module.exports = {
    post: post,
    get: get
};