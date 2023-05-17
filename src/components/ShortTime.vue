<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";

import { useHourlyStore } from "../stores/hourly";
import { useAirStore } from "../stores/air";

const hourly  = useHourlyStore();
const airQ = useAirStore();
const status_5h = computed(() => {
  let arr5 = hourly.data.slice(0, 5);
  let reg = /100|101|102|103|104|150|151|152|153/;
  return arr5.every((item) => {
    return reg.test(item.icon);
  });
});
</script>
<template>
  <div v-if="hourly.data[0]" class="warp" style="background-color: transparent">
    <span class="temp">{{ hourly.data[0].temp }}°</span>
    <span class="s_font" style="color: #58c5f5">{{ hourly.data[0].text }}</span>
    <span v-if="airQ.data[0]" class="s_font air">
      <img src="../assets/images/leaf.png" alt="" style="width: 3vw" />
      {{ airQ.data[0].aqi + " " + airQ.data[0].category }}
    </span>
    <div>
      <ul class="shortTime">
        <li v-for="(n, index) in hourly.data" :key="index">
          <template v-if="index == 0">
            <span class="bad">短时播报</span>
            <!-- It's raining <i class="qi-307-fill"></i> and cold <i class="qi-cold"></i> -->
            <span
              ><img src="../assets/images/time.png" alt="" style="width: 3.5vw"
            /></span>
            <span class="bad">{{ n.text }}</span>
            <span class="bad">{{ status_5h ? "放心出行" : "注意天气" }}</span>
          </template>
          <template v-else>
            <span :class="{ good: status_5h, bad: !status_5h }"
              >{{ n.temp }}°</span
            >
            <span :class="{ good: status_5h, bad: !status_5h }"
              ><i :class="'qi-' + n.icon + '-fill'"></i
            ></span>
            <span class="bad">{{ n.text }}</span>
            <span class="bad">{{ n.fxTime.substring(11, 16) }}</span>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.shortTime {
  display: flex;
  overflow-x: auto;
  font-size: 3vw;
}
.shortTime li {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}
.shortTime span {
  text-align: center;
  padding: 0 4vw;
}

.temp {
  color: #58c5f5;
  font-size: 25vw;
  letter-spacing: -3vw;
  transform: translate(120px, 50%);
}
.air {
  display: inline-block;
  width: 15vw;
  margin-left: 3vw;
  border-radius: 10px;
  text-align: center;
  background-color: #fff;
}
.s_font {
  font-size: 4vw;
}
.bad {
  color: #a5a7ab;
}
.good {
  color: #58c5f5;
}
</style>
