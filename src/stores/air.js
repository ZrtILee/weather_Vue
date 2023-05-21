import { defineStore } from "pinia";
import geoFindMe from "../util/geolocation";
import { KEY } from "../util/constant";
import axios from "axios";

const url = 'https://devapi.qweather.com/v7/air/5d?'

export const useAirStore = defineStore({
    id:'air',
    state:()=>({data:[]}),
    actions:{
        getData(){
            geoFindMe((code)=>{
                axios.get(url + `location=${code}&key=${KEY}`).then(res=>{
                    // console.log(res.data.code == 200)
                    if(res.data.code == 200){
                        this.data = res.data.daily
                        sessionStorage.setItem('air',JSON.stringify(res.data.daily))
                    console.log(res)
                    }else{
                        this.data = JSON.parse(sessionStorage.getItem('air'))
                    }
                })
            })
        }
    }
})