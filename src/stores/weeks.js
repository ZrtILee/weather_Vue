import { defineStore } from "pinia";
import geoFindMe from "../util/geolocation";
import { KEY } from "../util/constant";
import axios from "axios";

const url = 'https://devapi.qweather.com/v7/weather/7d?'

export const useWeeksStore = defineStore({
    id:'weeks',
    state:()=>({
        data:[]
    }),
    actions:{
        getData(){
            geoFindMe((code)=>{
                axios.get(url + `location=${code}&key=${KEY}`).then(res=>{
                    // console.log(res.data.code == 200)
                    if(res.data.code == 200){
                        this.data = res.data.daily
                        sessionStorage.setItem('weeks',JSON.stringify(res.data.daily))
                    // console.log(res,this.data)

                    }else{
                        this.data = JSON.parse(sessionStorage.getItem('weeks'))
                    }
                })
            })
        }
    }
})