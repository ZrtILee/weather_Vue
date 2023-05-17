<script setup>
import * as echarts from 'echarts';
import {watch} from 'vue';
import { useRouter } from 'vue-router';
import {useWeeksStore} from '../stores/weeks'

const weeks = useWeeksStore()
const router = useRouter()
const week = {
        0:'周日',
        1:'周一',
        2:'周二',
        3:'周三',
        4:'周四',
        5:'周五',
        6:'周六',
    }

 const toWeeksDetail = ()=>{
    // console.log({...props.weeks})
    router.push({
        name:'weeks',
        // state:{data:toRaw(weeks),air:toRaw(props.air[0]),hourly:toRaw(props.hourly)}
    })
 }
    
watch(weeks,()=>{
    if(weeks.data[0]){
    //    console.log(document.getElementById('main'))
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'),/* 'dark' */);
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
                data: weeks.data.map((item,index)=> index)
            },
            yAxis: {
                splitLine:{show:false},//去除网格线
                axisLabel: {show: false},
                axisLine: {show:false},//轴线不显示
                splitArea : {show : false},//去除网格区域
                min:Math.min(...weeks.data.map(item=>item.tempMin)) - 10,
                max:Math.max(...weeks.data.map(item=>item.tempMax)) + 10
            },
            series: [
                {
                name: '销量',
                type: 'line',
                smooth:true,
                symbolSize:0,
                data: weeks.data.map(item=>item.tempMax),
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
                            color: '#ffc355' //改变折线颜色
                        }
                    }
                },
                },
                {
                    
                name: '销量',
                type: 'line',
                smooth:true,
                symbolSize:0,
                data: weeks.data.map(item=>item.tempMin),
                itemStyle: {
                    normal: {
                        lineStyle: {
                            color: '#54bdff' //改变折线颜色
                        }
                    }
                },
                label: {
                        show: true, //开启显示
                        position: 'bottom', //在上方显示
                        formatter: '{c}°',//显示百分号
                        textStyle: { //数值样式
                            color: 'black',//字体颜色
                            fontSize: 10//字体大小
                        }
                    }
                },
            ]
        });
        
    }
})

</script>
<template>
    <!-- <h1>{{weeks.data.length}}</h1> -->
    <div v-show="weeks.data[0]" class="warp week_wrap">
        <div>
            <ul  class="week" style="position: relative;">
                <div id="main" style="position: absolute;top:30vw"></div>
                <li v-for="(m,index) in weeks.data" :key="index" >
                    <div v-if="weeks.data[0]" class="flexBox" style="position: relative;">
                        <span style="font-weight: bold;">
                            {{index==0?'今天':index==1?'明天':week[new Date(m.fxDate).getDay()]}}
                        </span>
                        <span class="s_grey">{{m.fxDate.substring(5,7)+'/'+m.fxDate.substring(8,10)}}</span>
                        <span style="color:#58c5f5"><i :class="'qi-'+m.iconDay+'-fill'"></i></span>
                        <span class="s_grey">{{m.textDay}}</span>
                    </div>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <div class="flexBox">
                        <span class="s_grey">{{m.textNight}}</span>
                        <span style="color:#58c5f5"><i :class="'qi-'+m.iconNight+'-fill'"></i></span>
                        <span class="cloud">{{m.windDirNight}}</span>
                    </div>
                </li>
            </ul>
        </div> 
        <div class="weekButton" @click="()=>toWeeksDetail()">
            <span>查看七天日预报详情</span>
        </div> 
    </div>
</template>
<style scoped>
.week_wrap{
    padding-bottom: 5vw;
}
.week{
    display: flex;
    overflow-x: auto;
}
.week li{
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    font-size: 3.5vw;
    margin-top: 1vw;
    padding: 4vw 2vw;
    border-radius: 2vw;
    text-align: center;
}
.week li:first-of-type{
    background-color: #f7fbff;
}
.weekButton{
    text-align: center;
    color: #1d7efb;
    font-weight: bold;
}
.weekButton span{
    font-size: 3.5vw;
    padding: 2vw 10vw;
    border-radius: 2vw;
    background-color: #f9f9f9;
}
#main{
    position: absolute;
    top:25vw;
    width: 115vw;
    height: 20vw;
}
.flexBox{
    display: flex;
    flex-direction: column;
}
.s_grey{
    color: #a3a5a8;
}
.cloud{
    background-color: #e5f7ed;
    color: #00b03f;
    padding: 0 2vw;
    border-radius: 3vw;
}
</style>