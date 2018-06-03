//app.js
App({
  onLaunch: function () {
    wx.request({
      url: 'https://www.bein.xin/subway',
      method:'post',
      data:{
        text:'上海地铁线路图'
      },
      success:(res)=>{
        var starttime = new Date().getTime();
        // console.log(res.data);
        this.establish(res.data.lines, res.data.stations);
        var endtime = new Date().getTime();
        // console.log(endtime - starttime)
        var line=this.findLine(0,3,1)
        // console.log(line)
      }
    })
  },
  globalData: {
    stations:[],
    lines:[],
  },

  establish: function (lines,stations) {
    //建立站点信息库
    var i;
    var j;
    for (i = 0; i < stations.length; i++) {
      var newStation = new Object();
      newStation.stationName = stations[i].stationName;
      newStation.stationId = stations[i].stationId;
      newStation.nextStations = new Array();
      newStation.nextWays = new Array();
      newStation.lines = new Array();
      this.globalData.stations.push(newStation);
    }
    //根据线路图,填写站点信息库
    for (i = 0; i < lines.length; i++) {
      var newLine = new Object();
      newLine.lineId = lines[i].lineId;
      newLine.lineName = lines[i].lineName;
      newLine.stations = new Array();
      for (j = 0; j < lines[i].stations.length; j++) {
        var nowStation = lines[i].stations[j];
        var nowLine = lines[i].lineId;
        newLine.stations.push(nowStation);
        this.globalData.stations[nowStation].lines.push(nowLine);
        if (j < lines[i].stations.length - 1) {
          var nextStation = lines[i].stations[j + 1];
          this.globalData.stations[nowStation].nextStations.push(nextStation);
          this.globalData.stations[nowStation].nextWays.push(nowLine);
          this.globalData.stations[nextStation].nextStations.push(nowStation);
          this.globalData.stations[nextStation].nextWays.push(nowLine);
        }
      }
      this.globalData.lines.push(newLine);
    }
  },

//寻找算法,method=0,路径最短;method=1,换乘最少;method=2,综合最优.
  findLine: function (startId,endId,method) {
    var i=0;
    var j=0;
    var groupValues=new Array();
    var minOfNow = 100000;
    var valueOfLength=0;
    var valueOfChange=0;
    var group=new Array();
    var best;
    var begin=new Object();
    var min = new Array(this.globalData.stations.length);
    // console.log('findLine:'+this.globalData.stations);
    for (i=0;i<this.globalData.stations.length;i++)
    {
    var use = new Array(this.globalData.stations.length);
    for (j = 0; j < this.globalData.stations.length; j++)
    {
      use[j]=10000000;
      if(i==j)
      {
        use[j] = -100;
      }
    }
    min[i] = use;
    }

    if(method==0)
    {
      valueOfChange=0.001;
      valueOfLength=1;
    }
    else if (method == 1){
      valueOfChange = 1;
      valueOfLength = 0.001;
    }
    else{
      valueOfChange = 0.5;
      valueOfLength = 1;
    }
    //初始化
    begin.ways=new Array();
    begin.stations = new Array();
    begin.lastWay='啥都没有';
    begin.lastStation = startId;
    begin.stations.push(startId);
    begin.value=0;
    group.push(begin);
    groupValues.push(begin.value);
    // console.log(begin)
    // console.log(group);
   
    do{
      var nowLine=group.shift();
      // console.log(nowLine.lastStation);
      // console.log(this.globalData.stations)
      for (i = 0; i < this.globalData.stations[nowLine.lastStation].nextStations.length;i++)
      {
        var mark=0;
        for (var m = 0; m < nowLine.stations.length;m++)
        {
          if (nowLine.stations[m] == this.globalData.stations[nowLine.lastStation].nextStations[i]){
            mark = 1;
            continue;
          }
          
        }
        if(mark==1)continue;
        var newLine=new Object();
        newLine.ways = nowLine.ways.slice(0);
        newLine.stations = nowLine.stations.slice(0);
        newLine.value = nowLine.value;
        if (nowLine.lastWay != this.globalData.stations[nowLine.lastStation].nextWays[i])
        {
          newLine.value = newLine.value + valueOfLength + valueOfChange;
        }
        else{
          newLine.value = newLine.value + valueOfLength;
        }
        newLine.ways.push(this.globalData.stations[nowLine.lastStation].nextWays[i]);
        newLine.stations.push(this.globalData.stations[nowLine.lastStation].nextStations[i]);
        newLine.lastWay = this.globalData.stations[nowLine.lastStation].nextWays[i];
        newLine.lastStation = this.globalData.stations[nowLine.lastStation].nextStations[i];
        //小于则更新数据库以及列表
        if (newLine.value < min[startId][newLine.lastStation] + valueOfChange)
        {
          if (newLine.value < min[startId][newLine.lastStation] )
          {
            min[startId][newLine.lastStation] = newLine.value;
          }
          groupValues.push(newLine.value);
          group.push(newLine);
          if (newLine.value < minOfNow && newLine.lastStation == endId)
          {
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
      for (i = 0; i < groupValues.length;i++)
      {
        if (groupValues[i] < minOfGroup)
        {
          minOfGroup = groupValues[i] ;
        }
      }
    }
    while (minOfGroup < minOfNow);
    return(best);
  },

  getLineInformation:function(lineID){},
  getStationInformation: function (stationID) { },

})