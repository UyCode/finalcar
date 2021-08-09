const App = getApp();

Component({
    data:{
        loadModal: false
    },

    properties:{
        loadModal:{
            type: [Boolean, String],
            default: false
        }
    },

    methods:{
        loadModal() {
            this.setData({
                loadModal: true
            })
            setTimeout(() => {
                this.setData({
                    loadModal: false
                })
            }, 2000)
        }
    }
})