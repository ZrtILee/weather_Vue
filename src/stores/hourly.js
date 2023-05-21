import { defineStore } from "pinia";
import geoFindMe from "../util/geolocation";
import { KEY } from "../util/constant";
import axios from "axios";

const url = 'https://devapi.qweather.com/v7/weather/24h?'

export const useHourlyStore = defineStore({
    id:'hourly',
    state:()=>({
        data: []
    }),
    actions:{
        getData(){
            // console.log(this.data)
            geoFindMe((code)=>{
                axios.get(url + `location=${code}&key=${KEY}`).then(res=>{
                    // console.log(res.data.code == 200)
                    if(res.data.code == 200){
                        this.data = res.data.hourly
                        sessionStorage.setItem('hourly',JSON.stringify(res.data.hourly))
                    console.log(res.data)
                    }else{
                        this.data = JSON.parse(sessionStorage.getItem('hourly'))
                    }
                })
            })
        }
    }
})