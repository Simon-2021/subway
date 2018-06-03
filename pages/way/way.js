const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ways:[],
    stations:[],
    start:0,
    end:0,
    lineArray:[],
    lineName:app.globalData.lineName,
    stationName:app.globalData.stationName,
  },
  onLoad: function (options) {
    let ways = options.ways.split(',');
    let stations = options.stations.split(',');
    let start = stations[0];
    let end = stations[stations.length - 1];
    // let lineArray = [ways[0]];
    let lineEnd = [];
    let lineArray = [{
      id:0,
      lineId: ways[0],
      lineEnd:0,
      stationArray:[]
    }];
    let n=0;
    let lineFlag = ways[0];
    for (let i = 0; i < ways.length;i++){
      lineArray[n].stationArray.push(stations[i]);      
      if (ways[i]!=lineFlag){
        lineArray[n].lineEnd=stations[i];
        n=n+1;
        let lineItem = {
          id: n,
          lineId: ways[i],
          lineEnd: 0,
          stationArray: []
        }
        lineArray.push(lineItem); 
        lineFlag = ways[i];
      }
    }
    lineArray[n].stationArray.push(end);
    lineArray[n].lineEnd = end;
    console.log(lineArray);
    console.log(options);
    this.setData({
      ways: ways,
      stations: stations,
      start: start,
      end: end,
      lineArray:lineArray
    })
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