Page({
  data:{
    cate_id: '',
    roomList:[],
    isLoadingBottom: false    
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.data.cate_id = options.cate_id
    wx.setNavigationBarTitle({
      title: options.game_name,
      success: function(res) {
        
      }
    })

    this.onPullDownRefresh()
  },

  onReachBottom:function(){
    if(this.data.isLoadingBottom){
      return;
    }

    this.data.isLoadingBottom = true;
    console.log('onReachBottom');
    var that = this;
    wx.request({
      url: 'http://www.douyutv.com/api/v1/live/'+ this.data.cate_id +'?offset='+ this.data.roomList.length +'&limit=20',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        for(var i = 0; i < res.data.data.length; i++){
          var online = res.data.data[i].online;
          if(online > 10000){
            res.data.data[i].online = parseFloat(online/10000.0).toFixed(1) + '万';
          }
        }

        that.setData({
          roomList: that.data.roomList.concat(res.data.data)
        })

      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
        that.data.isLoadingBottom = false;
      }
    })
  },

  onPullDownRefresh:function(){
    var that = this;
    wx.request({
      url: 'http://www.douyutv.com/api/v1/live/'+ this.data.cate_id +'?offset=0&limit=20',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        for(var i = 0; i < res.data.data.length; i++){
          var online = res.data.data[i].online;
          if(online >= 10000){
            res.data.data[i].online = parseFloat(online / 10000.0).toFixed(1) + '万';
          }
        }
        that.setData({
          roomList: res.data.data
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
        wx.stopPullDownRefresh()
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
    
  },
  onShow:function(){
    // 页面显示
    
  },
  onHide:function(){
    // 页面隐藏
    
  },
  onUnload:function(){
    // 页面关闭
    
  }
})