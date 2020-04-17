<template>
<div>
  <el-container>
    <el-header>
      <div class="home_title">个人主页</div>
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#20a0ff"
        text-color="#fff"
      >
        <!-- <el-menu-item index="1"></el-menu-item> -->
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1" @click="notice">公告</el-menu-item>
          <el-menu-item index="2-2" @click="logout">退出</el-menu-item>
        </el-submenu>
        <el-menu-item index="3" @click="imgShow">照片墙</el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting" @click="home"></i>
          <!-- <span slot="title">微社区管理</span> -->
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
    <el-aside width="200px">
     
      <el-row >
  
    <!-- <el-card :body-style="{ padding: '0px' }">
      <img :src="image[1].url" class="image">
      <div >
        <span>曾剑</span>
       
        <div class="bottom clearfix">
          <time class="time">{{ currentDate }}</time>
          <el-button type="text" class="button">操作按钮</el-button>
        </div>
      </div>
    </el-card> -->
    <!-- <div style="display: flex;justify-content: space-around;flex-wrap: wrap">
      <el-card style="width:330px;margin-top: 10px;" >
        <div slot="header" style="text-align: left">
          <div> -->
            <!-- <img :src="user.userface" :alt="user.nickname" style="width: 70px;height: 70px"> -->
            <!-- <img :src="image[1].url" class="image"  style="width: 70px;height: 70px">
            </div>
          <div style="text-align: left;color:#20a0ff;font-size: 12px;margin-top: 13px">
            <span>账号:</span><span>wef</span>
          </div>
          <div style="text-align: left;color:#20a0ff;font-size: 12px;margin-top: 13px">
            <span>用户名:</span> <span>wef</span>
          </div>
          <div style="text-align: left;color:#20a0ff;font-size: 12px;margin-top: 13px">
            <el-button type="primary" size="small" style="margin-left: 3px" >
              <span>wef&nbsp;的空间</span>
            </el-button>
          </div>
          <div style="text-align: left;color:#20a0ff;font-size: 12px;margin-top: 13px">
            <span>电子邮箱:</span><span>sadf</span>
          </div>
          <div style="text-align: left;color:#20a0ff;font-size: 12px;margin-top: 13px">
            <span>注册时间:</span><span>asdf</span>
          </div>
        </div>
      </el-card>
    </div> -->
    <div style="display: flex;justify-content: space-around;flex-wrap: wrap">
      <el-card style="width:330px;margin-top: 10px;" v-for="(user,index) in users" :key="index"
              >
        <div slot="header" style="text-align: left">
          <div><img :src="user.userface" :alt="user.nickname" style="width: 70px;height: 70px"></div>
          <div style="text-align: left;color:#20a0ff;font-size: 12px;margin-top: 13px">
            <span>账号:</span><span>{{user.username}}</span>
          </div>
          <div style="text-align: left;color:#20a0ff;font-size: 12px;margin-top: 13px">
            <span>用户名:</span> <span>{{user.nickname}}</span>
          </div>
          <div style="text-align: left;color:#20a0ff;font-size: 12px;margin-top: 13px" >
            <el-button type="primary" size="small" style="margin-left: 3px">
              <span>{{user.nickname}}&nbsp;的空间</span>
            </el-button>
          </div>
          <div style="text-align: left;color:#20a0ff;font-size: 12px;margin-top: 13px">
            <span>电子邮箱:</span><span>{{user.email}}</span>
          </div>
          <div style="text-align: left;color:#20a0ff;font-size: 12px;margin-top: 13px">
            <span>注册时间:</span><span>{{user.regTime | formatDateTime}}</span>
          </div>
        </div>
      </el-card>
    </div>
  
</el-row>
    </el-aside>
    <el-container>
    
    <el-main  >
      <!-- <el-carousel>
<el-carousel-item v-for="item in 4" :key="item">
       <image src="src\assets\logo.png"></image>
      </el-carousel-item>
      </el-carousel> -->
      <!-- <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in image" :key="item.id">
          <img :src="item.url" class="image">
        </el-carousel-item>
      </el-carousel>  -->
    <!-- <el-carousel :interval="4000" type="card" :height="bannerHeight+'px'">
      <el-carousel-item v-for="item in imgUrls" :key="item.id">
        <el-row>
          <el-col :span="24" class="banner_img"> 
            <img ref="bannerHeight" :src="item.idView" class="bannerimg" @load="imgLoad">
          </el-col>
        </el-row>
      </el-carousel-item>
    </el-carousel> -->
     <el-carousel indicator-position="outside" :height="bannerHeight+'PX'" >
      <el-carousel-item v-for="item in image" :key="item.id">
        <img :src="item.url"  class="bannerImg">
      </el-carousel-item>
    </el-carousel> 

      <div class="page_view">
        <div class="title">报表测试</div>

        <div id="myChart1" class="chart-view"></div>

        <div id="myChart2" class="chart-view"></div>

        <div id="myChart3" class="chart-view"></div>

        <div id="myChart4" class="chart-view-4"></div>
      </div>
    </el-main>
    <el-footer>
      <div>
        <p>Copyright &copy; https://github.com/AlbertZJ</p>
      </div>
    </el-footer>
    </el-container>
    </el-container>
  </el-container>
  </div>
</template>

<script>
import { getRequest } from "@/utils/api"
import i1 from "@/assets/img/bg/back.jpg"
import i2 from "@/assets/img/bg/1.jpg"
import i3 from "@/assets/img/bg/2.jpg"
import i4 from "@/assets/img/bg/3.jpg"
import i5 from "@/assets/img/bg/6.jpg"
import i6 from "@/assets/img/bg/5.jpg"

var _this;

export default {
  data() {

     var urls=require('../../assets/img/bg/back.jpg');
     var urls1=require('../../assets/img/bg/1.jpg');
    return {
      users:[],
     currentDate:new Date(),
      chart1_title: "柱图测试",
      chart1_dataName: "销量",
      chart1_name: null,
      chart1_data: null,
      bannerHeight:"",
      BannerImg:[
        {id:0,url:urls},
        {id:1,url:urls1},
      {id:2,url:urls}
      ],
      imgUrls:[{id:0,idView:urls},
      {id:1,idView:urls1},
      {id:2,idView:urls}],
      image:[{id:0,url:urls},
      {id:1,url:i1},
      {id:2,url:i2},
      {id:3,url:i3},
      {id:4,url:i4}]
    //  imagesbox:[{id:0,idView:require("")},
    //  {id:1,idView:require("")},
    //  {id:2,idView:require("")}]
    };
  },
  created: function() {
    // `this` 指向 vm 实例
    _this = this;
    _this.chart1_name = ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"];
    _this.chart1_data = [5, 20, 36, 10, 10, 20];
  },
  mounted() {
    var _this = this;
            
    this.setSize();
    
    //页面加载完成后,才执行
    _this.showChart1();

    _this.showChart2();

    _this.showChart3();

    _this.showChart4();
   _this.new();
    _this.$alert(this.users+"guy");
  },
  methods: {
    setSize:function(){
      this.bannerHeight=740/2560*this.screenWidth
      if(this.bannerHeight>740) this.bannerHeight=740
      if(this.bannerHeight<360) this.bannerHeight=360
    },
    imgLoad(){
 this.$nextTick(()=>{
    this.bannerHeight=this.$refs.bannerHeight[0].bannerHeight;
    console.log(this.$refs.bannerHeight[0].height);
  })
    },
    logout() {
      var _this = this;
      this.$confirm("注销登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(
        function() {
          getRequest("/logout");
          _this.$alert("asdf");
          _this.currentUserName = "游客";
          _this.$router.replace({ path: "/" });
        },
        function() {
          //取消
        }
      );
    },
    notice() {
      getRequest("/notice/sys").then(function(msg) {
        //  _this.$alert(msg.data);
        _this.$alert(msg.data.message, msg.data.title, {
          confirmButtonText: "确定",
          callback: action => {}
        });
      });
    },
    imgShow(){
 _this.$router.replace({ path: "/imgShow" });
    },
    home(){
     // _this.$alert("sadf");
    _this.$router.replace({ path: "/home" });
    },
    new(){
      _this=this;
      getRequest("/news").then(resp => {
                   if (resp.status == 200) {
                     // _this.$alert(resp.data);
                        _this.users=resp.data;
                         _this.$alert(_this.users);
                    } else {
                        _this.$message({type: 'error', message: '数据加载失败!'});
                    }
                }, resp => {
                   _this.$alert(_this.users);
                    if (resp.response.status == 403) {
                        var data = resp.response.data;
                        _this.$message({type: 'error', message: data});
                    }
                });
    },
    showChart1() {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = _this.$echarts.init(document.getElementById("myChart1"));
      // 绘制图表
      myChart1.setOption({
        title: { text: _this.chart1_title },
        tooltip: {},
        xAxis: {
          data: _this.chart1_name
        },
        yAxis: {},
        series: [
          {
            name: _this.chart1_dataName,
            type: "bar",
            data: _this.chart1_data
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
      let myChart2 = _this.$echarts.init(document.getElementById("myChart2"));
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
      let myChart3 = _this.$echarts.init(document.getElementById("myChart3"));
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
      var myChart4 = _this.$echarts.init(document.getElementById("myChart4"));
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
/* .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  } */
  .bannerImg{
    width:100%;
    height:inherit;
    min-height: 360px;
    min-width: 1400px;
  }
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

  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
   .el-header{
        background-color:#20a0ff;
        color: #20a0ff;
        text-align: center;
        line-height: 60px;
    }
    .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    /* .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }
    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }*/
    body > .el-container {
        margin-bottom: 40px;
    }
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }
    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    } 
    
</style>
