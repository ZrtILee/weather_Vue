import axios from "axios";
import { KEY } from "./constant";
const url = 'https://geoapi.qweather.com/v2/city/lookup?'


export default function geoFindMe(func) {
  window._AMapSecurityConfig = {
    securityJsCode: "35c9b80893608b4dbfc8afea1eee20e0",
  };
  AMapLoader.load({
    key: "b1ecf9d658e27d3010c924c8b54d0285", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JS API 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.CitySearch"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      let location = new AMap.CitySearch();
      location.getLocalCity(function (status, result) {
        if(status == 'complete' && result.info == 'OK'){
          axios.get(url+`location=${result.city}&key=${KEY}`).then((response)=>{
            if(response.status == 200 && response.data.code == 200){
              // console.log(response.data.location[0].id,result.city)
              func(response.data.location[0].id,result.city)
            }else{
              func('101280101',result.city)
            }
            // console.log(response,response.data.location[0].id,response.data.code == 200,res)
          })
        }
      });
    })
    .catch((e) => {
      console.error(e); //加载错误提示
    })
}
