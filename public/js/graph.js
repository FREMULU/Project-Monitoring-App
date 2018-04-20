
$(document).ready(function () {

  var chart = new CanvasJS.Chart("chartContainer", {
      zoomEnabled: true,
      theme: "theme2",
      axisX: {
    		title: "Time",
        labelAngle: -50
    	},
    	axisY:{
      title: "Sensor Data value",
  		includeZero: false
    	},
      title: {
          text: "Line chart from Txt file"
      },
      data: [
      {
          type: "line",
          name:"Light-Sensor1",
          xValueType: "dateTime",
          xValueFormatString: "DDD HH:mm:ss",
          showInLegend: true,
          legentText:"Light-Sensor",
          dataPoints: []
      },
      {
          type: "line",
          name:"Light-Sensor2",
          xValueType: "dateTime",
          xValueFormatString: "DDD HH:mm:ss",
          showInLegend: true,
          legentText:"xxx",
          dataPoint2: []
      },
      {
          type: "line",
          name:"xxxx",
          xValueType: "dateTime",
          xValueFormatString: "DDD HH:mm:ss",
          showInLegend: true,
          legentText:"xxx",
          dataPoint3: []
      },
      {
          type: "line",
          xValueType: "dateTime",
          //yValueFormatString: "$####.00",
          xValueFormatString: "DDD HH:mm:ss",
          showInLegend: true,
              legentText:"xxx",
          dataPoint4: []
      }
      ]
  });
  var chart1 = new CanvasJS.Chart("chartContainer1", {
      zoomEnabled: true,
      theme: "theme2",
      axisX: {
    		title: "Time",
        labelAngle: -50
    	},
    	axisY:{
      title: "Sensor Data value",
  		includeZero: false
    	},
      title: {
          text: "Line chart from Txt file"
      },
      data: [
      {
          type: "line",
          name:"Light-Sensor1",
          xValueType: "dateTime",
          xValueFormatString: "DDD HH:mm:ss",
          showInLegend: true,
          legentText:"Light-Sensor",
          dataPoints: []
      },
      {
          type: "line",
          name:"Light-Sensor2",
          xValueType: "dateTime",
          xValueFormatString: "DDD HH:mm:ss",
          showInLegend: true,
          legentText:"xxx",
          dataPoint2: []
      },
      {
          type: "line",
          name:"xxxx",
          xValueType: "dateTime",
          xValueFormatString: "DDD HH:mm:ss",
          showInLegend: true,
          legentText:"xxx",
          dataPoint3: []
      },
      {
          type: "line",
          xValueType: "dateTime",
          //yValueFormatString: "$####.00",
          xValueFormatString: "DDD HH:mm:ss",
          showInLegend: true,
              legentText:"xxx",
          dataPoint4: []
      }
      ]
  });

  function processData(allText) {
      var allLinesArray = allText.split('\n');
      if (allLinesArray.length > 0) {
        var dataPoints = [];
        var dataPoint2 = [];
        var dataPoint3 = [];
        var dataPoint4 = [];

        var updateInterval = 3000;
        var time = new Date;
        //Starting of data logging

        time.setHours(10);
        time.setMinutes(22);
        time.setSeconds(00);
        time.setMilliseconds(00);
          for (var i = 0; i <= allLinesArray.length - 1; i++) {
         time.setTime(time.getTime()+ 3000);
        var rowData = allLinesArray[i].split(',');

        if(rowData && rowData.length > 1 )
            dataPoints.push({ x: time.getTime(), y: parseInt(rowData[0])});
            dataPoint2.push({ x: time.getTime(), y: parseInt(rowData[1])});
            dataPoint3.push({ x: time.getTime(), y: parseInt(rowData[2])});
            dataPoint4.push({ x: time.getTime(), y: parseInt(rowData[3])});

          }
          chart.options.data[0].dataPoints = dataPoints;
          chart.options.data[1].dataPoints = dataPoint2;
          chart.options.data[2].dataPoints = dataPoint3;
          chart.options.data[3].dataPoints = dataPoint4;
          chart.render();

          console.log(dataPoint2);
        //  chart1.render();
        chart1.options.data[0].dataPoints = dataPoints;
        //chart1.options.data[1].dataPoints = dataPoint2;
        //chart1.options.data[2].dataPoints = dataPoint3;
      //  chart1.options.data[3].dataPoints = dataPoint4;
        chart1.render();

          if(allLinesArray.length>1000){
            dataPoints.shift();
            dataPoint2.shift();
            dataPoint3.shift();
            dataPoint4.shift();
          }

          var total1 = 0;
          var total2 = 0
          datapoints_array=[];
          var mean1;
          for(i=0; i<dataPoints.length;i++){
              datapoints_array.push(dataPoints[i].y);
              total1+=dataPoints[i].y;
              var mean1=total1 / dataPoints.length;
              document.getElementById("demo1").innerHTML="Average Light Intensity1 = ";
              document.getElementById("demo1").innerHTML+=mean1.toPrecision(5);
            }

         for(i=0; i<dataPoints.length;i++){
                document.getElementById("min").innerHTML=" Min=";
                document.getElementById("min").innerHTML+=Math.min.apply(null, datapoints_array);
              }
          for(i=0; i<dataPoints.length;i++){
            document.getElementById("max").innerHTML=" Max=";
            document.getElementById("max").innerHTML+=Math.max.apply(null, datapoints_array);
          }
          var varia=0;
          var skw=0;
          var qd=0;
          var qdl=0;//quibic difference length
          var msvv=0;//mean square value variable
          var kqd=0;
          var variance,sd,skw,kur,msv,rmsv;
          for(i=0; i<datapoints_array.length;i++){
            var varia = varia+(datapoints_array[i]-mean1)*(datapoints_array[i]-mean1);
            var variance=varia/datapoints_array.length;
            var sd=Math.sqrt(variance);

            //var qd=qd+(datapoints_array[i]-mean1)*(datapoints_array[i]-mean1)*(datapoints_array[i]-mean1);
            var qd=qd+Math.pow(datapoints_array[i]-mean1,3);
             var qdl=qdl+Math.pow(datapoints_array[i]-mean1,4);
            sqdl=Math.pow(datapoints_array.length-1, 3);
            kqdl=Math.pow(datapoints_array.length-1, 4);

            var skw=qd/sqdl;
            var kur=qdl/kqdl;
            //mean square Value
            msvv=msvv+Math.pow(datapoints_array[i],2)
            var msv=msvv/datapoints_array.length;
            //Root mean square Value
            var rmsv=Math.sqrt(msv);
            document.getElementById("variance").innerHTML=" variance=";
            document.getElementById("variance").innerHTML+=variance.toPrecision(5);
            document.getElementById("standard-deviation").innerHTML=" standard deviation=";
            document.getElementById("standard-deviation").innerHTML+=sd.toPrecision(5);
            document.getElementById("skewness").innerHTML=" skewness=";
            document.getElementById("skewness").innerHTML+=skw.toPrecision(5);
            document.getElementById("kurtosis").innerHTML=" Kurtosis=";
            document.getElementById("kurtosis").innerHTML+=kur.toPrecision(5);
            document.getElementById("msv").innerHTML=" Mean Square Value=";
            document.getElementById("msv").innerHTML+=msv.toPrecision(5);
            document.getElementById("rmsv").innerHTML="Root Mean Square Value=";
            document.getElementById("rmsv").innerHTML+=rmsv.toPrecision(5);

          }

        




          for(i=0; i<dataPoints.length;i++){
            total2+=dataPoint2[i].y;
            var avg=total2 / dataPoints.length;
            document.getElementById("demo2").innerHTML="Average Light Intensity2 = ";
            document.getElementById("demo2").innerHTML+=avg.toPrecision(5);
          }

      }
  }

function updateChart(){
      $.ajax({
          type: "GET",
          url: "/js/data.txt",
          dataType: "text",
          success: function (data) {processData(data); }
      });
}
updateChart();
var updateInterval = 3000;
setInterval(function(){updateChart()}, updateInterval);

});
