<template>
  <div class="page_view">
    <div class="title">报表测试</div>

    <div id="myChart1" class="chart-view"></div>

    <div id="myChart2" class="chart-view"></div>

    <div id="myChart3" class="chart-view"></div>

    <div id="myChart4" class="chart-view-4"></div>
  </div>
</template>

<script>
var that;

export default {
  name: "echart",
  data() {
    return {
      chart1_title: "柱图测试",
      chart1_dataName: "销量",
      chart1_name: null,
      chart1_data: null
    };
  },
  created: function() {
    // `this` 指向 vm 实例
    that = this;

    that.chart1_name = ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"];
    that.chart1_data = [5, 20, 36, 10, 10, 20];
  },
  mounted() {
    //页面加载完成后,才执行
    that.showChart1();

    that.showChart2();

    that.showChart3();

    that.showChart4();
  },
  methods: {
    showChart1() {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = that.$echarts.init(document.getElementById("myChart1"));
      // 绘制图表
      myChart1.setOption({
        title: { text: that.chart1_title },
        tooltip: {},
        xAxis: {
          data: that.chart1_name
        },
        yAxis: {},
        series: [
          {
            name: that.chart1_dataName,
            type: "bar",
            data: that.chart1_data
          }
        ]
      });
    },
    showChart2() {
      console.log("showChart2");
      let data2 = [
        { value: 335, name: "直接访问" },
        { value: 310, name: "邮件营销" },
        { value: 234, name: "联盟广告" },
        { value: 135, name: "视频广告" },
        { value: 1548, name: "搜索引擎" }
      ];

      // 基于准备好的dom，初始化echarts实例
      let myChart2 = that.$echarts.init(document.getElementById("myChart2"));
      // 绘制图表
      var option2 = {
        title: {
          text: "销量分布"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: {
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: data2
        }
      };

      myChart2.setOption(option2);
    },
    showChart3() {
      let myChart3 = that.$echarts.init(document.getElementById("myChart3"));
      var option3 = {
        title: {
          text: "环形图",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "right",
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "14",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1548, name: "搜索引擎" }
            ]
          }
        ]
      };
      myChart3.setOption(option3);
    },
    showChart4() {
      var myChart4 = that.$echarts.init(document.getElementById("myChart4"));
      let option4 = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: true },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ["蒸发量", "降水量", "平均温度"]
        },
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月"
            ],
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "水量",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value} ml"
            }
          },
          {
            type: "value",
            name: "温度",
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: "{value} °C"
            }
          }
        ],
        series: [
          {
            name: "蒸发量",
            type: "bar",
            data: [
              2.0,
              4.9,
              7.0,
              23.2,
              25.6,
              76.7,
              135.6,
              162.2,
              32.6,
              20.0,
              6.4,
              3.3
            ]
          },
          {
            name: "降水量",
            type: "bar",
            data: [
              2.6,
              5.9,
              9.0,
              26.4,
              28.7,
              70.7,
              175.6,
              182.2,
              48.7,
              18.8,
              6.0,
              2.3
            ]
          },
          {
            name: "平均温度",
            type: "line",
            yAxisIndex: 1,
            data: [
              2.0,
              2.2,
              3.3,
              4.5,
              6.3,
              10.2,
              20.3,
              23.4,
              23.0,
              16.5,
              12.0,
              6.2
            ]
          }
        ]
      };
      myChart4.setOption(option4);
    }
  }
};
</script>

<style>
.page_view {
  padding: 20px 3%;
  text-align: center;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.chart-view {
  margin: 20px auto;
  width: 400px;
  height: 400px;
}

.chart-view-4 {
  margin: 20px auto;
  width: 800px;
  height: 600px;
}
</style>
