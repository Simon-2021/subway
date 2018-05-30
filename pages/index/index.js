//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    cities:['上海','北京'],
    city:0,
    stationStart:'剑川路',
    stationEnd:'莘庄',
    lines: ['1号线', '2号线', '3号线', '4号线', '5号线', '6号线', '7号线'],
    line: 4,
  },
  onLoad: function () {
  }
})
