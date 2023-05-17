<script setup>
import { useHourlyStore } from "../../stores/hourly";
import * as echarts from 'echarts';
import { onMounted, ref } from "vue";


const  hourly = ref(JSON.parse(sessionStorage.getItem('hourly')))
const props = defineProps(["index"]);

onMounted(()=>{
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('chart'),/* 'dark' */);
    //绘制图表
    myChart.setOption({
        grid: {
        x: 0,
        y: 0,
        x2: 20,
        y2: 0
        },
        xAxis: {
            splitLine:{show:false},//去除网格线
            axisLine: {show:false},//轴线不显示
            splitArea : {show : false},//去除网格区域
            axisLabel: {show: false},
            axisTick: {show: false},
            data: hourly.value.map((item,index)=> index)
        },
        yAxis: {
            splitLine:{show:false},//去除网格线
            axisLabel: {show: false},
            axisLine: {show:false},//轴线不显示
            splitArea : {show : false},//去除网格区域
            min:Math.min(...hourly.value.map(item=>item.temp)) - 10,
            max:Math.max(...hourly.value.map(item=>item.temp)) + 10
        },
        series: [
            {
            name: '销量',
            type: 'line',
            smooth:true,
            symbolSize:0,
            data: hourly.value.map(item=>item.temp),
            label: {
                    show: true, //开启显示
                    position: 'top', //在上方显示
                    formatter: '{c}°',//显示百分号
                    textStyle: { //数值样式
                        color: 'black',//字体颜色
                        fontSize: 10//字体大小
                    }
                },
            itemStyle: {
                normal: {
                    lineStyle: {
                        color: '#5bbefa' //改变折线颜色
                    }
                }
			},
            },
        ]
    });
})
</script>
<template>
  <div v-if="hourly[0] && props.index == 0" class="chart_24">
    <ul style="display: flex; position: relative">
      <div id="chart" class="chart" style=""></div>
      <li v-for="(n, index) in hourly" :key="index">
        <span style="color: #58c5f5"
          ><i :class="'qi-' + n.icon + '-fill'"></i
        ></span>
        <span style="margin: 11vw 0"></span>
        <div class="chart_bottom">
          <span style="color: #7a7a7a">
            <span
              :style="{
                display: 'inline-block',
                transform: `rotate(${n.wind360}deg)`,
              }"
              ><img
                src="https://img.icons8.com/fluency-systems-filled/1x/gps-device.png"
                alt=""
                style="width: 3vw"
            /></span>
            <span>{{ n.windScale + "级" }}</span>
          </span>
          <span class="wind">{{ n.windDir }}</span>
          <span style="font-weight: bold">{{
            n.fxTime.substring(11, 16)
          }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<style scoped>
.chart_24 {
  width: 90vw;
  background-color: #fff;
  overflow: auto;
  margin: 0 auto;
  margin-top: 5vw;
  border-radius: 3vw;
  padding: 4vw 0 4vw 5vw;
}
.chart_24 li {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  padding: 0 1vw;
}
.chart {
  width: 413vw;
  height: 20vw;
  position: absolute;
  top: 10vw;
}
.chart_bottom {
  display: flex;
  flex-direction: column;
  font-size: 3vw;
}
.wind {
  width: 15vw;
  color: #54d5aa;
  background-color: #ecfaf6;
  border-radius: 5vw;
}
</style>
