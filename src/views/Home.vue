<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onActivated, onDeactivated, onMounted, ref } from 'vue'
import {useIndicesStore} from '../stores/indices'
import {useWeeksStore} from '../stores/weeks'
import {useHourlyStore} from '../stores/hourly'
import {useAirStore} from '../stores/air'

import ShortTimeVue from '../components/ShortTime.vue'
import Weeks from '../components/Weeks.vue';
import Advice from '../components/Advice.vue';
import Indices from '../components/Indices.vue'
import geo from '../util/geolocation'
import geoFindMe from '../util/geolocation'


const hourly = useHourlyStore()
const weeks = useWeeksStore()
const airQ = useAirStore()
const indices = useIndicesStore()
const opacity = ref(0)
const scrollTop = ref(0)
const videoRef = ref(null)
const wrap = ref(null)
const location = ref('定位中...')

const scrollColor = (e)=>{
  // console.log(e);
    /* console.log(e)
    opacity.value = (e.srcElement.scrollTop/345).toFixed(2)
    scrollTop.value = (e.srcElement.scrollTop).toFixed(2) */

    if(e.srcElement.scrollTop >= 0 && e.srcElement.scrollTop <= 345){
        opacity.value = (e.srcElement.scrollTop/345).toFixed(2)
        // console.log(e.srcElement.scrollTop/345)
    }else{
        opacity.value = 1
    }
    
}

function getImageUrl() {
  let dir
  const reg = /晴|云|阴|雨|暴雨|雪|雾|霾|沙|尘/
  const obj ={
   "晴":'../assets/video/s.mp4',
   "云":'../assets/video/b.mp4',
   "阴":'../assets/video/b.mp4',
   "雨":'../assets/video/p.mp4',
   "暴雨":'../assets/video/t.mp4',
   "雪":'../assets/video/r.mp4',
   "霾":'../assets/video/f.mp4',
   "沙":'../assets/video/q.mp4',
   "尘":'../assets/video/q.mp4',
 }
 if(hourly.data[0]){
     let str = hourly.data[0].text.match(reg)
     dir = obj[str[0]]
   }

  return new URL(`${dir}`, import.meta.url).href
}



onActivated(()=>{
  // console.log('Activated')
  geoFindMe((x,y)=>{
      location.value = y
    })     
    videoRef.value.play()
    opacity.value = 0
    wrap.value

    hourly.getData()
    weeks.getData()
    airQ.getData()
    indices.getData()
    // console.log(scrollTop.value)
})

</script>

<template>
  <div v-if="!weeks.data[0]" class="loading">
    <img class="rotate" style="width: 30vw;height: 30vw;" src="../assets/images/loading.png" alt="">
    加载中...
  </div>
  <video ref="videoRef" :src="getImageUrl()" loop muted autoplay :style="{opacity:1-opacity}"></video>
  <header ref="wrap" :style="{backgroundColor:'rgba(255, 254, 255,'+opacity+')',borderBottom:opacity == 1?'1px solid #e2e2e2':''}">
    <div  v-if="hourly.data[0]">{{location}} <span :style="{opacity:opacity,marginLeft:1-opacity + 'vw'}">{{hourly.data[0].temp}}°</span></div>
    <div></div>
  </header>
  
  <main v-show="weeks.data[0]" @scroll='(e)=>scrollColor(e)' style="height: 100vh;overflow: scroll;">
    <ShortTimeVue></ShortTimeVue>
    <Weeks/>
    <Advice/>
    <Indices v-if="indices.data[0]" :type='[1,2,3,5,9,15]' :index="0" :open="true" />
  </main>
  
</template>

<style scoped>
@keyframes rotate{
  0%{
    transform: rotate(0deg);
  }
  25%{
    transform: rotate(90deg);
  }
  50%{
    transform: rotate(180deg);
  }
  75%{
    transform: rotate(270deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
.rotate{
  animation: rotate 2s infinite linear;
}
.loading{
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center
  ;background-color: #fff;
  width: 100vw;
  height: 100vh;
}
header{
  position: fixed;
  z-index: 999;
  width: 100vw;
  font-size: 5vw;
  font-weight: 600;
  line-height: 1.5;
  max-height: 100vh;
  padding: 5vw;
  background-color: #fffeff;
}
main{
  padding-top: 90vw;
}
video{
  width: 100vw;
  position: absolute;
  z-index: -999;
}
.warp{
  margin: 0 auto;
  width: 90vw;
  font-size: 5vw;
  background-color: #fffeff;
  margin-top:6vw;
  margin-bottom:6vw;
  border-radius: 10px;
}


</style>
