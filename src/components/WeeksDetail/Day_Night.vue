<script setup>
import { ref } from "vue";
import { useWeeksStore } from "../../stores/weeks";
const props = defineProps(["index"]);
const weeks = ref(JSON.parse(sessionStorage.getItem('weeks')))

let Item = [
  {
    name: "白天",
    temp: weeks.value[props.index].tempMax,
    icon: weeks.value[props.index].iconDay,
    text: weeks.value[props.index].textDay,
  },
  {
    name: "夜间",
    temp: weeks.value[props.index].tempMin,
    icon: weeks.value[props.index].iconNight,
    text: weeks.value[props.index].textNight,
  },
];
</script>
<template>
  <div v-if="weeks" class="day_night">
    <div v-for="(n, index) in Item" :key="index" class="day">
      <div style="font-size: 3vw; color: #7a7a7a">{{ n.name }}</div>
      <div style="display: flex">
        <div class="temp">{{ n.temp }}°</div>
        <div class="flex_column">
          <span><i :class="'qi-' + n.icon + '-fill'"></i></span>
          <span>{{ n.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.flex_column {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.day_night {
  display: flex;
  justify-content: space-between;
  width: 90vw;
  margin: 0 auto;
  color: white;
  margin-top: 5vw;
}
.day,
.night {
  width: 45vw;
}
.temp {
  font-size: 11vw;
  transform: scaleY(1.6);
}
</style>
