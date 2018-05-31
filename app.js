//app.js
App({
  onLaunch: function () {
  var stations=[{stationName:'0',
  stationId:0,
  }, {
    stationName:'1',
    stationId:1,
    }, {
      stationName:'2',
      stationId:2,
  }, {
    stationName:'3',
    stationId:3,
    }, {
      stationName:'4',
      stationId:4,
  }, {
    stationName:'5',
    stationId:5,
    }, {
      stationName: '6',
      stationId: 6,
  }, {
    stationName: '7',
    stationId: 7,
    }, {
      stationName: '8',
      stationId: 8,
  }, {
    stationName: '9',
    stationId: 9,
  },];
  var lines=[{
    lineName:'0',
    lineId:0,
    stations:[0,1,2,5],
  }, {
    lineName:'1',
    lineId:1,
    stations:[1,3,4],
    }, {
      lineName:'2',
      lineId:2,
      stations:[1, 2, 5],
    },
    {
      lineName: '3',
      lineId: 3,
      stations: [0,6,7,8,9,3],
    },]
  this.establish(lines, stations);
  console.log(this.globalData);
  //寻找算法,method=0,路径最短;method=1,换乘最少;method=2,综合最优.
  var find = this.findLine(0,3,1);
  console.log(find);

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
      this.globalData.stations.push(newStation);0
    }
    //根据线路图,填写站点信息库
    for (i = 0; i < lines.length; i++) {
      var newLine = new Object();
      newLine.lineId = lines[i].lineId;
      newLine.name = lines[i].lineName;
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
   
    do{
      var nowLine=group.shift();
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
      var show=new Array();
      for(var m=0;m<group.length;m++)
      {
        show.push(group[m]);
      }
      console.log(show)
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