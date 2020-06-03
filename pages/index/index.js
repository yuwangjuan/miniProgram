//index.js
const app = getApp()
const db = wx.cloud.database();
const book = db.collection('test02');
Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    book_list:[],
    background:['../../images/aaa.jpg','../../images/book.jpg','../../images/02.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    getTime:'',
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    var _this = this;
    db.collection('test02').get({
      success:res=>{
        console.log(this)
        this.setData({
          book_list:res.data
        })
      }

      })
  },
  onReady:function(){
    this.setCountDown();
  },
  setCountDown:function(){
    var mydate = new Date();
    var totalSecond =parseInt(86400*10 - ((mydate.getHours() * 60 * 60) + (mydate.getMinutes() * 60) + (mydate.getSeconds())));
    var interval = setInterval(function () {
     // 秒数
     var second = totalSecond;
    
     // 天数位
     var day = Math.floor(second / 3600 / 24);
     var dayStr = day.toString();
     if (dayStr.length == 1) dayStr = '0' + dayStr;
    
     // 小时位
     var hr = Math.floor((second - day * 3600 * 24) / 3600);
     var hrStr = hr.toString();
     if (hrStr.length == 1) hrStr = '0' + hrStr;
    
     // 分钟位
     var min = Math.floor((second - day * 3600 *24 - hr * 3600) / 60);
     var minStr = min.toString();
     if (minStr.length == 1) minStr = '0' + minStr;
    
     // 秒位
     var sec = second - day * 3600 * 24 - hr * 3600 - min*60;
     var secStr = sec.toString();
     if (secStr.length == 1) secStr = '0' + secStr;
    
     this.setData({
      countDownDay: dayStr,
      countDownHour: hrStr,
      countDownMinute: minStr,
      countDownSecond: secStr,
     });
     totalSecond--;
     if (totalSecond < 0) {
      clearInterval(interval);
      wx.showToast({
       title: '活动已结束',
      });
      this.setData({
       countDownDay: '00',
       countDownHour: '00',
       countDownMinute: '00',
       countDownSecond: '00',
      });
     }
    }.bind(this), 1000);
},
buyNow:function(){
  wx.navigateTo({
    url: '../bookDetails/bookDetails',
    events: {
      // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
      acceptDataFromOpenedPage: function(data) {
        console.log(data)
      },
      someEvent: function(data) {
        console.log(data)
      }
    },
    success: function(res) {
      // 通过eventChannel向被打开页面传送数据
      res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
    }
  })
},


  // onGetUserInfo: function(e) {
  //   if (!this.data.logged && e.detail.userInfo) {
  //     this.setData({
  //       logged: true,
  //       avatarUrl: e.detail.userInfo.avatarUrl,
  //       userInfo: e.detail.userInfo
  //     })
  //   }
  // },

  // onGetOpenid: function() {
  //   // 调用云函数
  //   wx.cloud.callFunction({
  //     name: 'login',
  //     data: {},
  //     success: res => {
  //       console.log('[云函数] [login] user openid: ', res.result.openid)
  //       app.globalData.openid = res.result.openid
  //       wx.navigateTo({
  //         url: '../userConsole/userConsole',
  //       })
  //     },
  //     fail: err => {
  //       console.error('[云函数] [login] 调用失败', err)
  //       wx.navigateTo({
  //         url: '../deployFunctions/deployFunctions',
  //       })
  //     }
  //   })
  // },

  // 上传图片
  // doUpload: function () {
  //   // 选择图片
  //   wx.chooseImage({
  //     count: 1,
  //     sizeType: ['compressed'],
  //     sourceType: ['album', 'camera'],
  //     success: function (res) {

  //       wx.showLoading({
  //         title: '上传中',
  //       })

  //       const filePath = res.tempFilePaths[0]
        
  //       // 上传图片
  //       const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
  //       wx.cloud.uploadFile({
  //         cloudPath,
  //         filePath,
  //         success: res => {
  //           console.log('[上传文件] 成功：', res)

  //           app.globalData.fileID = res.fileID
  //           app.globalData.cloudPath = cloudPath
  //           app.globalData.imagePath = filePath
            
  //           wx.navigateTo({
  //             url: '../storageConsole/storageConsole'
  //           })
  //         },
  //         fail: e => {
  //           console.error('[上传文件] 失败：', e)
  //           wx.showToast({
  //             icon: 'none',
  //             title: '上传失败',
  //           })
  //         },
  //         complete: () => {
  //           wx.hideLoading()
  //         }
  //       })

  //     },
  //     fail: e => {
  //       console.error(e)
  //     }
  //   })
  // },
  viewItem:function(event){
    console.log(event.currentTarget.dataset.id)
    var id=event.currentTarget.dataset.id;
      wx.navigateTo({
        url: '../bookDetail/bookDetail?id='+id
      })
  }
})
