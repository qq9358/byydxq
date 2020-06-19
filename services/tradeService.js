import ajax from "@/utils/ajax.js";

export default {
  async statTradeAsync(input) {
    const response = await ajax.post("/trade/StatTradeAsync", input);
    return response.result;
  },
  async statPayDetailJbAsync(input) {
    const response = await ajax.post("/trade/StatPayDetailJbAsync", input);
    return response.result;
  }
};
