<script setup>
import { ref, watch } from 'vue';
import {useWeeksStore} from '../stores/weeks'

const weeks = useWeeksStore()
const today = ref(null)
watch(weeks,()=>{
    // console.log('改动')
    today.value = [
            {name:weeks.data[0].windDirDay,value:weeks.data[0].windScaleDay,k:'级',color:'#e78568'},
            {name:'相对湿度',value:weeks.data[0].humidity,k:'%',color:'#63a0ff'},
            {name:'体感温度',value:(parseInt(weeks.data[0].tempMin)+parseInt(weeks.data[0].tempMax))/2,k:'°C',color:'#4ccd8e'},
            {name:'气压',value:weeks.data[0].pressure,k:'hPa',color:'#45b8fc'},
        ]

})

</script>
<template>
    <div v-if="weeks.data[0]" class="warp advice_wrap">
        <p style="font-size: 3.7vw;font-weight: bold;">
            今天白天到夜间，{{weeks.data[0].textDay === weeks.data[0].textNight?weeks.data[0].textDay:weeks.data[0].textDay+'转'+weeks.data[0].textNight}}，
            {{weeks.data[0].windDirDay+weeks.data[0].windScaleDay+'级'}}，温度{{weeks.data[0].tempMin+'到'+weeks.data[0].tempMax}}度，如有外出活动，建议出行时及时关注天气变化。</p>
        <div>
            <ul  class="advice">
                <li v-for="(item,index) in today" :key="index">
                    <div class="flexBox" :style="{textAlign: 'center',margin:' 3vw 0',color:item.color}">
                        <span style="font-size: 6vw;">{{item.value}}<span style="font-size: 3vw;">{{item.k}}</span></span>
                        <span style="font-size: 3vw;">{{item.name}}</span>
                    </div>
                </li>
            </ul>
        </div> 
    </div>
</template>
<style scoped>
.advice{
    display: flex;
    justify-content: space-between;
}
.advice_wrap{
    padding: 3vw;
}
.flexBox{
    display: flex;
    flex-direction: column;
}
</style>