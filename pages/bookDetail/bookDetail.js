// pages/bookDetail/bookDetail.js
const db = wx.cloud.database();
// const mybook = db.collection('test02');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    db.collection('test02').doc(options.id).get({
      success:res=>{
        this.setData({
          book:res.data,
          id:options.id  
        })
      },
      fail:err=>{
        console.log(err,'err');
      }
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

  },
  update:function(event){
    console.log(this.data.id,'eventupdate')
      db.collection('test02').doc(this.data.id).update({
        data:{
          title:"局部更新测试3"
        },
        success:res=>{
          console.log(res,"resupdate");
        }
      })
      
  },
  delete:function(event){
    db.collection('test02').doc(this.data.id).remove({
      success:res=>{
        console.log(res,"resremove");
      },
      fail:res=>{
        console.log(res,"resremove");
      }
    })
  }
})