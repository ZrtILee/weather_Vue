<script setup>
import { defineStore } from 'pinia'
import { ref } from 'vue'
import {useWeeksStore} from '../../stores/weeks'

const props = defineProps(['index'])
const weeks = ref(JSON.parse(sessionStorage.getItem('weeks')))


let item = weeks.value[props.index]
//  计算太阳位置
function sunLocation(){
        let date = new Date()
        // console.log(date.getHours())
        let sunTime = item.sunset.substring(0,2)- item.sunrise.substring(0,2)
        let overTime = date.getHours() -item.sunrise.substring(0,2)
        // console.log(sunTime,overTime)
        if(overTime>sunTime){
            return 1
        }else if(overTime<0){
            return 0
        }else{
            return parseFloat(1 * (overTime/sunTime)).toFixed(2) - 0
        }
    }

</script>
<template>
    <div v-if="item" class="more" style="background-color: #fff;position: relative;height: 53vw;">
                        <div  :style="{transform:`rotate(${180*sunLocation()}deg)`}">
                            <div style="width: 55vw;height: 55vw;margin: 0 auto;border-radius: 30vw;border: 1vw dashed #ffc335;border-top: 1vw dashed #7a7a7a;border-left: 1vw dashed #7a7a7a;margin: 10vw auto;transform: rotate(45deg);">
                                <div style="width: 10vw;height: 55vw;margin: 0 auto;transform: rotate(45deg);position: relative;">
                                    <img src="../../assets/images/h.png" alt="" style="position: absolute;left: 0;bottom:-4vw;width:10vw">
                                </div>
                            </div>
                        </div>
                        <div style="padding: 2vw 5vw;;background-color: #fff;height: 15vw;width:75vw;margin: 0 auto;border-top: 1px solid #f3f3f3;position: absolute;bottom: 0;left:7.5vw;display: flex;justify-content: space-between;">
                            <div style="display: flex;">
                                <div><img style="width: 7vw;" src="../../assets/images/ni.png" alt=""></div>
                                <div style="display: flex;flex-direction: column;font-size: 3vw;margin-left: 1vw;">
                                    <span>{{item.sunrise}}</span>
                                    <span style="color: #7a7a7a;">日出</span>
                                </div>
                            </div>
                            <div style="display: flex;">
                                <div><img style="width: 7vw;" src="../../assets/images/nj.png" alt=""></div>
                                <div style="display: flex;flex-direction: column;font-size: 3vw;margin-left: 1vw;">
                                    <span>{{item.sunset}}</span>
                                    <span style="color: #7a7a7a;">日落</span>
                                </div>
                            </div>
                        </div>
                    </div>
</template>
<style scoped>

</style>