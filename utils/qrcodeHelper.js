import QRCode from "qrcode";
import ajax from "./ajax.js";

export default {
  async createQRCodeAsync(value) {
    try {
      let qrcode = await QRCode.toDataURL(value, {
        width: 200
      });
	  return qrcode;
    } catch(ex){
      const response = await ajax.get(`/common/CreateQRCodeAsync?value=${value}`);
      return response.result;
    }
  }
};
