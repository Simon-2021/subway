// pages/line/line.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lines: ['1号线', '2号线', '3号线', '4号线', '5号线', '6号线', '7号线'],
    line:4,
    lineStation:[
      {
        id:1,
        name:'闵行开发区',
        img:''
      },
      {
        id: 2,
        name: '东川路',
        img: ''
      }, {
        id: 3,
        name: '剑川路',
        img: ''
      }, {
        id: 4,
        name: '颛桥',
        img: ''
      }, {
        id: 5,
        name: '莘庄',
        img: ''
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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