<script setup>
import { ref ,onMounted, onActivated} from 'vue';
import { useRouter, useRoute } from 'vue-router'

const props = defineProps(['type','weather','index','open'])
const weeks = ref(JSON.parse(sessionStorage.getItem('weeks')))
const indices = ref(JSON.parse(sessionStorage.getItem('indices')))


const router = useRouter()

let arrRes = ref(null)
const fliterData = {
      0:[0,16],
      1:[16,32],
      2:[32,48]
    }
const img = {
      1:'https://img.icons8.com/cotton/512/beach-ball--v4.png',
      2:'https://img.icons8.com/fluency/256/carpool.png',
      3:'https://img.icons8.com/color/256/clothes.png',
      4:'https://img.icons8.com/office/256/whole-fish.png',
      5:'https://img.icons8.com/color/512/sun-star.png',
      6:'https://img.icons8.com/office/256/suitcase.png',
      7:'https://img.icons8.com/office/512/runny-nose.png',
      8:'https://img.icons8.com/office/512/jacket.png',
      9:'https://img.icons8.com/fluency/256/pill.png',
      10:'https://img.icons8.com/office/512/air-quality.png',
      11:'https://img.icons8.com/office/512/air-conditioner.png',
      12:'https://img.icons8.com/office/512/vintage-glasses.png',
      13:'https://img.icons8.com/office/512/cosmetic-brush.png',
      14:'https://img.icons8.com/office/512/hanger.png',
      15:'https://img.icons8.com/cotton/256/traffic-light.png',
      16:'https://img.icons8.com/office/256/umbrella.png',
    }


const toIndices = (item,index)=>{
    if(props.open === true && [1,2,3,5,9,15].some(item2=>item2 == item.type)){
        router.push({
            name:'indices',
            state:{data:{detail:{...item},weather:{...weeks.value[index]}}}
        })
    }
 
}

onActivated(()=>{
    // console.log('onAct')
})
onMounted(()=>{
    // console.log('onMounted')
    if(props.index<3){
        arrRes.value = indices.value.slice(...fliterData[props.index]).filter(item=>{
            return props.type.some(itemt=>itemt == item.type)
        })
    }

})
</script>
<template>
    <div v-if="arrRes !== null&&props.index<3"  class="warp indices_wrap more" style="background-color: #fff;margin-bottom: 10vw;">
        <div>
            <ul  class="indices">
                <li v-for="(item,index) in arrRes" :key="index" @click="()=>toIndices(item,index)">
                    <div class="flexBox" style="text-align: center;margin: 3vw 0;">
                        <span>
                            <img :src="img[item.type]" alt=""/>
                        </span>
                        <span style="font-size: 4vw;">{{item.name}}</span>
                        <span style="font-size: 3vw;color: rgb(165, 165, 165);;">{{item.category}}</span>
                    </div>
                </li>
            </ul>
        </div> 
    </div>
</template>
<style scoped>
.indices{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}
.indices li{
    display: flex;
    justify-content: center;
    width: 25vw;
}
img{
    width: 8vw;
}
.indices_wrap{
    padding: 1vw 3vw;
}
.flexBox{
    display: flex;
    flex-direction: column;
}
</style>