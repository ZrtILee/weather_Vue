<script setup>
import { useWeeksStore } from "../../stores/weeks";

const weeks = useWeeksStore();
const week = {
        0:'周日',
        1:'周一',
        2:'周二',
        3:'周三',
        4:'周四',
        5:'周五',
        6:'周六',
    }
</script>
<template>
  <div class="time">
    <ul>
      <li v-for="(n, index) in weeks.data" :key="index" class="time_box">
        <span style="font-size: 4vw; color: #7a7a7a">{{
          index == 0
            ? "今天"
            : index == 1
            ? "明天"
            : week[new Date(n.fxDate).getDay()]
        }}</span>
        <span style="font-size: 3.5vw; color: #7a7a7a"
          >{{ n.fxDate.substring(5, 7) }}/{{ n.fxDate.substring(8) }}</span
        >
      </li>
    </ul>
  </div>
</template>
<style scoped>
.time {
  display: flex;
  margin-top: 10vw;
}
.time ul {
  display: flex;
  overflow-x: auto;
}
.time_box {
  display: flex;
  flex-direction: column;
  padding: 0 5.5vw;
  color: white;
  text-align: center;
  /* width: 30vw; */
  flex-shrink: 0;
}
</style>
