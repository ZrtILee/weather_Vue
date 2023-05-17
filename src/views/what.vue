<template>
  <swiper :modules="[Virtual]" :slides-per-view="1" virtual>
    <swiper-slide
      v-for="(slideContent, index) in slides"
      :key="index"
      :virtualIndex="index"
      ><div style="background-color: #fff; width: 90vw; border: 1px solid red">
        <button id="find-me" @click="() => geolocation()">显示我的位置</button
        ><br />
        <p id="status"></p>
        <a id="map-link" target="_blank"></a></div
    ></swiper-slide>
  </swiper>
  <h1>{{res}}123</h1>
  <div>
    <!-- <p id="demo">点击按钮获取您当前坐标（可能需要比较长的时间获取）：</p>
<button @click="getLocation()">点我</button> -->
  </div>
</template>
<script>
import { Virtual } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import geolocation from "../util/geolocation";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },

  setup() {
    // Create array with 1000 slides
    const slides = Array.from({ length: 1000 }).map(
      (el, index) => `Slide ${index + 1}`
    );
    const res = null
    function haha(x,y){
      console.log(x,y)
      res = y
    }
    console.log(geolocation(haha))
    return {
      slides,
      Virtual,
      haha,
      // res,
      geolocation,
    };
  },
};
</script>
