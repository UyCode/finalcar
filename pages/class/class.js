import http from '../../utils/request.js'
const app = getApp();
Page({
    data: {
        iconList: [],
        gridCol: 3,
        skin: true,
        loadModal: false,
        PageCur: 'class',
        msgList: [],
    },
    onLoad: function (options) {
        this.loadModal();
        http.get('/type/list', {},
            (res) => {
                if (res.code == '0') {
                    console.log(res.data);
                    this.setData({
                        iconList: res.data
                    })
                }
            },
            (error) => {console.log(error);}
        );

        this.setData({
            msgList: [{
                    title: "ئۇقتۇرۇش: 7-ئاينىڭ31-كۈنى مۇلازىمەت توختايدۇ"
                },
                {
                    title: "ئۇقتۇرۇش: 8-ئاينىڭ31-كۈنى مۇلازىمەت توختايدۇ"
                },
                {
                    title: "ئۇقتۇرۇش: 9-ئاينىڭ30-كۈنى مۇلازىمەت توختايدۇ"
                }
            ]
        });
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

    loadModal() {
        this.setData({
            loadModal: true
        })
        setTimeout(() => {
            this.setData({
                loadModal: false
            })
        }, 500);
    },

    onHide: function () {

    },
    onShow: function () {
        const pages = getCurrentPages()
        const perpage = pages[pages.length - 1]
        perpage.onLoad();
    }
});