<template>
  <uni-popup ref="popup" type="bottom" @change="onPopupChange">
    <view class="description">
      <view class="description-title">
        <view>景区公告</view>
        <view class="description-close-btn" @click="onPopupChange(false)">
          <van-icon name="cuowu" />
        </view>
      </view>
      <view style="height: 100%; overflow-y: auto;">
        <view class="description-content">
          <view style="height:40px;">&nbsp;</view>
          <view v-if="scenic.noticeContent" class="description-content-item">
            <view class="description-content-item-text" v-html="scenic.noticeContent"></view>
          </view>
        </view>
      </view>
    </view>
  </uni-popup>
</template>

<script>
import { mobileMixin } from "@/mixins/mobileMixin.js";

export default {
  name: "ScenicNotice",
  mixins: [mobileMixin],
  props: {
    scenic: {},
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: this.value,
      imageNormalized: false
    };
  },
  watch: {
    value(val) {
      this.show = val;
      if (val && !this.imageNormalized) {
        this.$nextTick(() => {
          this.normalizeImage(".description-content-item");
          this.imageNormalized = true;
        });
      }
    },
    show(val) {
      value(val) {
      	if(val){
      		this.$refs.popup.open();
      	} else {
      		this.$refs.popup.close();
      	}
      }
    }
  },
  methods: {
    onPopupChange(res) {
    	if(!res.show){
    		this.$emit('input', false);
    	}
    }
  }
};
</script>

<style lang="scss" scoped>
.description {
  background-color: #fff;
  transition: all 0.3s ease;
  transform: translateY(0);

  &-title {
    left: 0;
    top: 0;
    width: 100%;
    z-index: 100;
    position: fixed;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    text-align: center;
    background-color: #efefef;
  }

  &-close-btn {
    right: 0;
    top: 0;
    position: absolute;
    color: #999;
    width: 40px;
    height: 40px;
  }

  &-content {
    position: relative;
    font-size: 15px;
    height: 84vh;
    overflow-y: auto;
    box-sizing: border-box;

    &-item {
      margin-left: 15px;
      padding: 15px 15px 15px 0;
      word-wrap: break-word;
      word-break: normal;
      border-bottom: 1px solid #dbdbdb;

      h3 {
        color: #333;
        font-size: 100%;
        font-weight: 700;
        padding-bottom: 5px;
      }

      &-text {
        margin-left: 15px;
      }

      /deep/ img {
        max-width: 100% !important;
      }
    }
  }
}
</style>
