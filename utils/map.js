import axios from "axios";
const ajax = axios.create({
    timeout: 10000
  });

export default{
    async getGeocoder(){
        const response = await ajax.get(`https://apis.map.qq.com/ws/geocoder/v1/?location=39.984154,116.307490&key=ORXBZ-VFLRQ-MUS53-GNC4G-FFACE-SPFBQ&get_poi=1`,{
			headers: {
				referer: 'https://apis.map.qq.com',
				host: 'apis.map.qq.com'
			}
		});
        return response;
    }
}