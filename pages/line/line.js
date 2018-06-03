// pages/line/line.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lines: ['1号线', '2号线', '3号线', '4号线', '5号线', '6号线', '7号线', '8号线', '9号线', '10号线', '11号线', '11号线支线', '12号线', '13号线', '16号线', '17号线', '浦江线'],
    lineId:0,
    lineStation:[
      // {
      //   id:1,
      //   name:'闵行开发区',
      //   img:''
      // },
      // {
      //   id: 2,
      //   name: '东川路',
      //   img: ''
      // }, {
      //   id: 3,
      //   name: '剑川路',
      //   img: ''
      // }, {
      //   id: 4,
      //   name: '颛桥',
      //   img: ''
      // }, {
      //   id: 5,
      //   name: '莘庄',
      //   img: ''
      // },
    ]
  },

  //监听用户选择的线路
  listenerPickerSelected:function (e){
    this.data.lineId=e.detail.value;
    var stations = app.globalData.lines[this.data.lineId].stations;
    console.log(stations)
    var information = new Array();
    console.log(stations)
    for (var i = 0; i < stations.length; i++) {
      var newStation = new Object();
      newStation.id = i + 1;
      console.log(stations[i])
      console.log(app.globalData.stations)
      console.log(app.globalData.stations[stations[i]])

      newStation.name = app.globalData.stations[stations[i]].stationName;
      newStation.img = '';
      information.push(newStation);
    }
    console.log(information)
    this.setData({
      lineStation: information,
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var stations = app.globalData.lines[this.data.lineId].stations;
    console.log(stations)
    var information=new Array();
    console.log(stations)
    for(var i=0;i<stations.length;i++)
    {
      var newStation=new Object();
      newStation.id=i+1;
      console.log(stations[i])
      console.log(app.globalData.stations)
      console.log(app.globalData.stations[stations[i]])

      newStation.name = app.globalData.stations[stations[i]].stationName;
      newStation.img='';
      information.push(newStation);
    }
    console.log(information)
    this.setData({
      lineStation: information,
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
  
  }
})