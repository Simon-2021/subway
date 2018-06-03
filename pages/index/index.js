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
    // for(let i=0;i<app.globalData.stations.length;i++){
    //   console.log('id:' + app.globalData.stations[i].stationId+'; Num:'+i);
    // }
    // for(let i=0;i<app.globalData.lines.length;i++){
    //   console.log('id:' + app.globalData.lines[i].lineName+'; Num:'+i);
    // }
  },
  search:function(e){
    // console.log(e.detail.value.start)
    // console.log(e.detail.value.end)    
    // console.log('search：'+e.detail);
    let startId =-1;
    let endId = -1;    
    for(let i = 0;i<app.globalData.stations.length;i++){
      if (e.detail.value.start == app.globalData.stations[i].stationName){
        startId = app.globalData.stations[i].stationId;
        if (endId != -1){
          break;
        }
      }
      if (e.detail.value.end == app.globalData.stations[i].stationName) {
        endId = app.globalData.stations[i].stationId;
        if (startId != -1) {
          break;
        }
      }
    }
    if (startId ==-1){
      wx.showToast({
        title: '起点错误',
        icon:'none'
      })
    } else if (endId == -1){
      wx.showToast({
        title: '终点错误',
        icon: 'none'
      })
    } else {
      let solution = this.findLine(startId, endId,2);
      // console.log(solution);
      wx.navigateTo({
        url: `../way/way?ways=${solution.ways}&&stations=${solution.stations}`,
      })
    }
  },
  //寻找算法,method=0,路径最短;method=1,换乘最少;method=2,综合最优.
  findLine: function (startId, endId, method) {
    var i = 0;
    var j = 0;
    var groupValues = new Array();
    var minOfNow = 100000;
    var valueOfLength = 0;
    var valueOfChange = 0;
    var group = new Array();
    var best;
    var begin = new Object();
    var min = new Array(app.globalData.stations.length);
    for (i = 0; i < app.globalData.stations.length; i++) {
      var use = new Array(app.globalData.stations.length);
      for (j = 0; j < app.globalData.stations.length; j++) {
        use[j] = 10000000;
        if (i == j) {
          use[j] = -100;
        }
      }
      min[i] = use;
    }

    if (method == 0) {
      valueOfChange = 0.001;
      valueOfLength = 1;
    }
    else if (method == 1) {
      valueOfChange = 1;
      valueOfLength = 0.001;
    }
    else {
      valueOfChange = 0.5;
      valueOfLength = 1;
    }
    //初始化
    begin.ways = new Array();
    begin.stations = new Array();
    begin.lastWay = '啥都没有';
    begin.lastStation = startId;
    begin.stations.push(startId);
    begin.value = 0;
    group.push(begin);
    groupValues.push(begin.value);
    // console.log(begin)
    // console.log(group);

    do {
      var nowLine = group.shift();
      // console.log(nowLine.lastStation);
      // console.log(app.globalData.stations)
      for (i = 0; i < app.globalData.stations[nowLine.lastStation].nextStations.length; i++) {
        var mark = 0;
        for (var m = 0; m < nowLine.stations.length; m++) {
          if (nowLine.stations[m] == app.globalData.stations[nowLine.lastStation].nextStations[i]) {
            mark = 1;
            continue;
          }

        }
        if (mark == 1) continue;
        var newLine = new Object();
        newLine.ways = nowLine.ways.slice(0);
        newLine.stations = nowLine.stations.slice(0);
        newLine.value = nowLine.value;
        if (nowLine.lastWay != app.globalData.stations[nowLine.lastStation].nextWays[i]) {
          newLine.value = newLine.value + valueOfLength + valueOfChange;
        }
        else {
          newLine.value = newLine.value + valueOfLength;
        }
        newLine.ways.push(app.globalData.stations[nowLine.lastStation].nextWays[i]);
        newLine.stations.push(app.globalData.stations[nowLine.lastStation].nextStations[i]);
        newLine.lastWay = app.globalData.stations[nowLine.lastStation].nextWays[i];
        newLine.lastStation = app.globalData.stations[nowLine.lastStation].nextStations[i];
        //小于则更新数据库以及列表
        if (newLine.value < min[startId][newLine.lastStation] + valueOfChange) {
          if (newLine.value < min[startId][newLine.lastStation]) {
            min[startId][newLine.lastStation] = newLine.value;
          }
          groupValues.push(newLine.value);
          group.push(newLine);
          if (newLine.value < minOfNow && newLine.lastStation == endId) {
            best = newLine;
            minOfNow = newLine.value;
          }
        }
      }
      //更新数值组
      // var show=new Array();
      // for(var m=0;m<group.length;m++)
      // {
      //   show.push(group[m]);
      // }
      // console.log(show)
      groupValues.shift();
      var minOfGroup = 1000000;
      for (i = 0; i < groupValues.length; i++) {
        if (groupValues[i] < minOfGroup) {
          minOfGroup = groupValues[i];
        }
      }
    }
    while (minOfGroup < minOfNow);
    return (best);
  },
})
