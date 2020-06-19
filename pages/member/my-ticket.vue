<template>
  <view class="ticket">
    <no-data v-if="dataLoaded && tickets.length === 0" :content-height="contentHeight"></no-data>
    <view v-else v-model="loading" :finished="finished" @load="getTickets">
      <view
        v-for="(ticket, index) in tickets"
        :key="index"
        :title="ticket.ticketCode"
        :status="ticket.statusName"
        class="margin-bottom-10"
      >
        <view>
          <view :title="ticket.ticketTypeName" />
          <view title="有效期" class="ticket-time">
            <span>{{ ticket.startDate }}</span>
            <span v-if="ticket.endDate !== ticket.startDate">至{{ ticket.endDate }}</span>
          </view>
          <view title="下单时间" :value="ticket.cTime" />
        </view>
        <view
          v-for="(groundChangCi, index) in ticket.groundChangCis"
          :key="index"
          :title="groundChangCi.groundName"
          class="ticket-ground van-hairline--bottom"
        >
          <span>{{ groundChangCi.groundName }}</span>
          <span>，{{ ticket.startDate }}日{{ groundChangCi.changCiName }}</span>
          <span v-for="(seat, seatIndex) in groundChangCi.seats" :key="seatIndex"
            >，{{ seat }}</span
          >
        </view>
        <view class="ticket-qrcode">
          <img :src="ticket.qrcode" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import qrcodeHelper from "./../../utils/qrcodeHelper.js";
import ticketService from "@/services/ticketService.js";

export default {
  data() {
    return {
      loading: false,
      dataLoaded: false,
      finished: false,
      queryInput: {
        skipCount: 0,
        maxResultCount: 10
      },
      tickets: []
    };
  },
  computed: {
    contentHeight() {
      return this.$store.state.clientHeight - 46;
    }
  },
  async onLoad(){
	  await this.getTickets();
  },
  methods: {
    async getTickets() {
      try {
        this.loading = true;
        this.dataLoaded = false;

        let result = await ticketService.getMemberTicketsForMobileAsync(this.queryInput);
        for (let i = 0; i < result.items.length; i++) {
          let ticket = result.items[i];
          ticket.qrcode = await qrcodeHelper.createQRCodeAsync(ticket.ticketCode);
          this.tickets.push(ticket);
        }

        this.queryInput.skipCount = this.queryInput.skipCount + result.items.length;

        this.finished = this.tickets.length === result.totalCount;
      } catch (err) {
        return;
      } finally {
        this.loading = false;
        this.dataLoaded = true;
      }
    }
  }
};
</script>

<style lang="scss">
.ticket {
  &-qrcode {
    width: 100%;
    text-align: center;
  }

  &-time {
    /deep/ .view__value {
      flex: 2;
    }
  }

  &-ground {
    padding: 10px 16px;
  }
}
</style>
