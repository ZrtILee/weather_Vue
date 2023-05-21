import { defineStore } from "pinia";
import geoFindMe from "../util/geolocation";
import { KEY } from "../util/constant";
import axios from "axios";

const url = 'https://devapi.qweather.com/v7/indices/3d?'
const type = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16'

export const useIndicesStore = defineStore({
    id:'indices',
    state:()=>({data:[]}),
    actions:{
        getData(){
            geoFindMe((code)=>{
                axios.get(url + `location=${code}&type=${type}&key=${KEY}`).then(res=>{
                    // console.log(res)
                    if(res.data.code == 200){
                        this.data = res.data.daily
                        sessionStorage.setItem('indices',JSON.stringify(res.data.daily))
                    console.log(res.data)
                    }else{
                        this.data = JSON.parse(sessionStorage.getItem('indices'))
                    }
                })
            })
        }
    }
})