//app.js
App({
  onLaunch: function () {
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
      newLine.name = lines[i].name;
      newLine.stations = new Array();
      for (j = 0; j < lines[i].stations.length; j++) {
        var nowStation = lines[i].stations[j];
        var nowLine = lines[i].lineID;
        newLine.stations.push(nowStation)
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

  
  findLine: function (start,end,method) {}

})