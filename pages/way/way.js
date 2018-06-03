const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ways:[],
    stations:[],
    lineName:app.globalData.lineName,
    stationName:app.globalData.stationName,
  },
  onLoad: function (options) {
    let ways = options.ways.split(',');
    let stations = options.stations.split(',');
    this.setData({
      ways: ways,
      stations: stations
    })
    let solution = [];
    let wayLines =-1;
    for (let i = 0; i < stations.length;i++){
      if (ways[i]!=wayLines){
        let wayLine = {
          start:stations[i],
          end:''
        }
      }
    }
    // let stationName=[];
    // for(let i=0;i<options.stations.length;i++){
    //   stationName[i] = app.globalData.stationName[this.data.stations[i]];
    //   // console.log(JSON.parse(options.stations)[i]);
    //   // console.log(stationName[i]);
    // }
    // console.log(stationName);
    // console.log(this.data.stationName[this.data.stations[5]]);
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