<script setup>
import { ref } from "vue";
import { useWeeksStore } from "../../stores/weeks";
import { useAirStore } from "../../stores/air";

const props = defineProps(["index"]);
const weeks = ref(JSON.parse(sessionStorage.getItem('weeks')))
const air = ref(JSON.parse(sessionStorage.getItem('air')))

const Item1 = ref(null);
const Item2 = ref(null);

// console.log(air[props.index]);
let item = weeks.value[props.index];

(Item1.value = [
  { name: "空气湿度", value: item.humidity, k: "%" },
  { name: "降水强度", value: item.precip, k: "mm" },
  { name: "云量", value: item.cloud, k: "%" },
]),
  (Item2.value = [
    {
      name: "空气质量",
      value: air.value[props.index] ? air.value[props.index].aqi : "暂无数据",
      k: "",
      feel: air.value[props.index] ? air.value[props.index].category : "",
    },
    {
      name: "紫外线",
      value: item.uvIndex,
      k: "级",
      feel:
        item.uvIndex > 9
          ? "务必防晒"
          : item.uvIndex > 4
          ? "需要防晒"
          : "无需防晒",
      color:
        item.uvIndex > 9 ? "#af0303" : item.uvIndex > 4 ? "#ff8800" : "#45c569",
    },
    { name: item.windDirDay, value: item.windScaleDay, k: "级", feel: "" },
    {
      name: "能见度",
      value: item.vis,
      k: "km",
      feel:
        item.vis > 20
          ? "视野清晰"
          : item.uvIndex > 10
          ? "视野正常"
          : "视野很差",
      color: item.vis > 20 ? "#45c569" : item.vis > 10 ? "#177afb" : "#af0303",
    },
    {
      name: "气压",
      value: item.pressure,
      k: "hpa",
      feel: "气压正常",
      color: "#177afb",
    },
    {
      name: "月相",
      value: item.moonPhase,
      k: "",
      feel: "感觉还好",
      icon: item.moonPhaseIcon,
    },
  ]);
</script>
<template>
  <div class="more">
    <div class="Item1">
      <div v-for="(n, index) in Item1" :key="index" class="Item1_wrap">
        <span class="name">{{ n.name }}</span>
        <span style="font-size: 8vw; transform: scaleY(1.2)"
          >{{ n.value }}<span style="font-size: vw">{{ n.k }}</span></span
        >
      </div>
    </div>
    <ul class="Item2">
      <li v-for="(n, index) in Item2" :key="index" class="Item2_wrap">
        <div class="name">{{ n.name }}</div>
        <div class="Item2_wrap_bottom">
          <span style="font-size: 5vw"
            >{{ n.value }}<span style="font-size: 4vw">{{ n.k }}</span></span
          >
          <span v-if="n.name == '月相'" style="font-size: 6vw"
            ><i :class="'qi-' + n.icon"></i
          ></span>
          <span v-else :style="{ color: n.color, fontSize: '3vw' }">{{
            n.feel
          }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<style scoped>
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
.Item1 {
  background-color: #fff;
  padding: 2vw;
  display: flex;
  justify-content: space-between;
}
.Item1_wrap {
  display: flex;
  flex-direction: column;
  line-height: 7vw;
}
.Item2 {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.Item2_wrap {
  width: 43vw;
  background-color: #fff;
  margin-top: 2.5vw;
  padding: 2vw;
  line-height: 6vw;
}
.Item2_wrap_bottom {
  font-size: 8vw;
  display: flex;
  justify-content: space-between;
}
</style>
