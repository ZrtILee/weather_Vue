<script setup>
import { ref, onMounted, onActivated } from "vue";
import { useRouter, useRoute } from "vue-router";
import geoFindMe from "../util/geolocation";

const router = useRouter();
const route = useRoute();

// console.log(history.state.data)
const detail = ref(null);
const weather = ref(null);
const location = ref(null)
const obj = {
  运动指数: {
    color: "rgba(110, 172, 224,0.9)",
    img: "https://img.icons8.com/cotton/512/beach-ball--v4.png",
    text: "温度范围",
    text2: "风力风向",
  },
  洗车指数: {
    color: "rgba(110, 172, 224,0.9)",
    img: "https://img.icons8.com/fluency/256/carpool.png",
    text2: "风力风向",
  },
  穿衣指数: {
    color: "rgba(87, 202, 213,0.9)",
    img: "https://img.icons8.com/color/256/clothes.png",
    text: "温度范围",
    text2: "风力风向",
  },
  紫外线指数: {
    color: "rgba(243, 118, 101,0.9)",
    img: "https://img.icons8.com/color/512/sun-star.png",
    text: "温度范围",
    text2: "日出日落",
  },
  感冒指数: {
    color: "rgba(244, 195, 119,0.9)",
    img: "https://img.icons8.com/fluency/256/pill.png",
    text: "昼夜温差",
    text2: "风力风向",
  },
  交通指数: {
    color: "rgba(110, 217, 149,0.9)",
    img: "https://img.icons8.com/cotton/256/traffic-light.png",
    text: "温度范围",
    text2: "日出日落",
  },
};
const goBack = () => {
  router.go(-1);
};

onActivated(() => {
  /* console.log(route.params)
    console.log(2,history.state) */
  detail.value = history.state.data.detail;
  weather.value = history.state.data.weather;
  geoFindMe((x,y)=>{
    location.value = y
  })
  // console.log(location.value);
});
</script>
<template>
  <header v-if="detail">
    <div class="top">
      <img
        src="../assets/images/arrow.png"
        alt=""
        style="width: 8vw"
        @click="() => goBack()"
      />
      <span style="padding-left: 10vw">{{ detail.name }}</span>
    </div>
  </header>
  <main class="main" v-if="detail">
    <div class="wrap1" :style="{ backgroundColor: obj[detail.name].color }">
      <img
        :src="obj[detail.name].img"
        alt=""
        style="position: absolute; right: 0; top: 0; z-index: -99; height: 25vw"
      />
      <div class="flex">
        <span style="font-size: 4.5vw; font-weight: bold">{{
          detail.category
        }}</span>
        <span style="font-size: 3.6vw; font-weight: bold">{{location}}</span>
      </div>
      <div
        style="
          width: 70vw;
          opacity: 0.7;
          font-size: 3.3vw;
          text-align: left;
          margin-top: 2vw;
        "
      >
        {{ detail.text }}
      </div>
    </div>
    <div class="flex wrap2" style="">
      <div class="flex column">
        <span style="color: rgb(177, 180, 182)">天气情况</span>
        <span>{{ weather.textDay }}</span>
      </div>
      <div class="flex column">
        <template v-if="detail.name !== '洗车指数'">
          <template v-if="detail.name == '感冒指数'">
            <span style="color: rgb(177, 180, 182)">昼夜温差</span>
            <span>{{ weather.tempMax - weather.tempMin }}</span>
          </template>
          <template v-else>
            <span style="color: rgb(177, 180, 182)">温度范围</span>
            <span>{{ weather.tempMin + "~" + weather.tempMax }}</span>
          </template>
        </template>
      </div>
      <div class="flex column">
        <!-- <template v-if="detail.name == '紫外线指数' || detail.name == '交通指数'">
                    <span style="color: rgb(177, 180, 182);;">日出/日落</span>
                    <span>{{}}</span>
                </template>
                <template v-else> -->
        <span style="color: rgb(177, 180, 182)">风力风向</span>
        <span>{{ weather.windDirDay + weather.windScaleDay + "级" }}</span>
        <!-- </template> -->
      </div>
    </div>
  </main>
</template>
<style scoped>
.top {
  display: flex;
  align-items: center;
  padding: 4vw;
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.column {
  flex-direction: column;
}
.main {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.wrap1 {
  position: relative;
  width: 90vw;
  margin: 0 auto;
  margin-top: 5vw;
  padding: 3vw;
  border-radius: 2vw;
  justify-content: space-around;
  color: white;
  background-color: #7cb4e3;
}
.wrap2 {
  justify-content: space-around;
  padding: 3vw 10vw;
  font-size: 3.5vw;
}
</style>
