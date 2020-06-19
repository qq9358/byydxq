import ajax from "@/utils/ajax.js";

export default {
  async checkTicketFromMobileAsync(input, config) {
    const response = await ajax.post("/ticket/CheckTicketFromMobileAsync", input, config);
    return response.result;
  },
  async enrollFaceAsync(formData) {
    const response = await ajax.post("/ticket/EnrollFaceAsync", formData);
    return response.result;
  },
  async deleteFaceAsync(id) {
    const response = await ajax.post("/ticket/DeleteFaceAsync", { id });
    return response;
  },
  async getMemberTicketsForMobileAsync(input) {
    let response = await ajax.post("/ticket/GetMemberTicketsForMobileAsync", input);
    return response.result;
  },
  async getTicketFullInfoAsync(input) {
    const response = await ajax.post("/ticket/GetTicketFullInfoAsync", input);
    return response.result;
  },
  async getTicketSalePhotosByListNoAsync(listNo) {
    const response = await ajax.get(`/ticket/GetTicketSalePhotosByListNoAsync?listNo=${listNo}`);
    return response.result;
  },
  async getLocalTicketsForEnrollFaceAsync() {
    const response = await ajax.get("/ticket/GetLocalTicketsForEnrollFaceAsync");
    return response.result;
  },
  async getLocalTicketForEnrollFaceAsync(ticketCode) {
    const response = await ajax.get(
      `/ticket/GetLocalTicketForEnrollFaceAsync?ticketCode=${ticketCode}`
    );
    return response.result;
  },
  async statTouristBySexAsync(input) {
    let response = await ajax.post("/ticket/StatTouristBySexAsync", input);
    return response.result;
  },
  async statTouristByAgeRangeAsync(input) {
    input.statType = 2;
    let response = await ajax.post("/ticket/StatTouristByAgeRangeAsync", input);
    return response.result;
  },
  async statTouristByAreaAsync(input) {
    input.statType = 2;
    let response = await ajax.post("/ticket/StatTouristByAreaAsync", input);
    return response.result;
  },
  async getTicketCheckOverviewAsync(date) {
    let response = await ajax.post("/ticket/GetTicketCheckOverviewAsync", {
      StartDate: date,
      EndDate: date
    });
    return response.result;
  },
  async getStadiumTicketCheckOverviewAsync(input) {
    let response = await ajax.post("/ticket/GetStadiumTicketCheckOverviewAsync", input);
    return response.result;
  },
  async getScenicCheckInQuantityAsync(input) {
    let response = await ajax.post("/ticket/GetScenicCheckInQuantityAsync", input);
    return response.result;
  },
  async statTicketCheckInByGroundAndGateGroupAsync(input) {
    const response = await ajax.post("/ticket/StatTicketCheckInByGroundAndGateGroupAsync", input);
    return response.result;
  },
  async statTicketCheckByGroundAndTimeAsync(input) {
    const response = await ajax.post("/ticket/StatTicketCheckByGroundAndTimeAsync", input);
    return response.result;
  },
  async statTicketCheckByTradeSourceAsync(input) {
    let response = await ajax.post("/ticket/StatTicketCheckByTradeSourceAsync", input);
    return response.result;
  },
  async statTicketSaleAsync(input) {
    const response = await ajax.post("/ticket/StatTicketSaleAsync", input);
    return response.result;
  }
};
