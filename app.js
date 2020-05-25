//app.js
App({
  onLaunch: function () {
  var that = this;
  wx.login({
    success:function(res){
      if(res.code){
        wx.request({
          url:"",
          data:{
            code:res.code
          },
          header:{
            "Content-Type":"application/json"
          },
          success:function(res){
            var res = JSON.parse(res.data);
            that.globalData.openid = res.openid;
          }
        })
      }else{
        console.log('登陆失败'+res.errMsg)
      }
    }
  })
  },
  globalData: {
    openid:''
  }
})