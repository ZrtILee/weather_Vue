<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Virtual, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

import Indices from "../components/Indices.vue";
import Day_Night from "../components/WeeksDetail/Day_Night.vue";
import More from "../components/WeeksDetail/More.vue";
import Chart24 from "../components/WeeksDetail/Chart24.vue";
import Sunrise from "../components/WeeksDetail/Sunrise.vue";

const router = useRouter();
const opacity = ref(0)
const weeks = ref(JSON.parse(sessionStorage.getItem("weeks")));
const week = {
  0: "周日",
  1: "周一",
  2: "周二",
  3: "周三",
  4: "周四",
  5: "周五",
  6: "周六",
};

let swiperRef = null;

const setSwiperRef = (swiper) => {
  console.log(swiper);
  // swiperRef = swiper;
};

const scrollColor = (e) => {
    // console.log(e);
  if (e.srcElement.scrollTop >= 0 && e.srcElement.scrollTop <= 345) {
    opacity.value = (e.srcElement.scrollTop / 345).toFixed(2);
    // console.log(e.srcElement.scrollTop/345)
  } else {
    opacity.value = 1;
  }
};
</script>
<template>
  <header>
    <div class="bgc"></div>
    <div class="top" :style="{backgroundColor:'rgba(255, 254, 255,'+opacity+')'}">
      <img
        src="../assets/images/arrow.png"
        alt=""
        :style="{width: '8vw',filter:`invert(${100*(1-opacity)}%)`}"
        @click="() => router.go(-1)"
      />
      <span :style="{filter:`invert(${100*(1-opacity)}%)`,fontWeight:'bold'}">周预报</span>
      <span style="width: 8vw"></span>
    </div>
  </header>

  <main @scroll='(e)=>scrollColor(e)'>
    <!-- <swiper class="mySwiper" :virtual="true" :modules="[Autoplay,Virtual]"> -->
    <Swiper class="mySwiper">
      <!-- <swiper-slide v-for="(n,index) in 6" :key="index" :virtualIndex="index"> -->
      <SwiperSlide v-for="(n, index) in weeks" :key="index">
        <div style="text-align: center">
          <span style="font-size: 6vw; color: #ffffff">{{
            index == 0
              ? "今天"
              : index == 1
              ? "明天"
              : week[new Date(n.fxDate).getDay()]
          }}</span>
          <span style="font-size: 5vw; color: #ffffff"
            >&nbsp;&nbsp;&nbsp;{{ n.fxDate.substring(5, 7) }}/{{
              n.fxDate.substring(8)
            }}</span
          >
        </div>
        <!-- 昼夜 -->
        <Day_Night :index="index" />
        <!-- 详情 -->
        <More :index="index" />
        <!-- 24h表 -->
        <Chart24 :index="index" />
        <!-- 日落日出 -->
        <Sunrise :index="index" />
        <!-- 天气指数 -->
        <Indices :type="[2, 3, 5, 4, 8, 16]" :index="index" :open="false" />
      </SwiperSlide>
    </Swiper>
  </main>
</template>
<style scoped>
main {
  padding-top: 15vw;
  height: 100vh;
  overflow: scroll;
}
.bgc {
  position: absolute;
  z-index: -99;
  width: 100vw;
  height: 100vw;
  background: linear-gradient(#222b3d 80%, #f2f2f2);
}
.top {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 999;
  padding: 4vw;
  width: 100vw;
}
.flex_column {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.more {
  width: 90vw;
  background-color: #f7f8fa;
  margin: 0 auto;
  margin-top: 5vw;
  border-radius: 3vw;
  overflow: hidden;
}
.name {
  color: #7a7a7a;
  font-size: 3.2vw;
  font-weight: bold;
}
</style>
