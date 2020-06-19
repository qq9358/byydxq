<template>
  <section class="wh_container">
    <div class="wh_content_all">
      <div class="wh_top_changge">
        <li @click="PreMonth(myDate, false)">
          <div class="wh_jiantou1"></div>
        </li>
        <li class="wh_content_li">{{ dateTop }}</li>
        <li @click="NextMonth(myDate, false)">
          <div class="wh_jiantou2"></div>
        </li>
      </div>
      <div class="wh_content">
        <div class="wh_content_item" v-for="(tag, index) in textTop" :key="index">
          <div class="wh_top_tag">{{ tag }}</div>
        </div>
      </div>
      <div class="wh_content">
        <div
          class="wh_content_item"
          v-for="(item, index) in list"
          :key="index"
          @click="clickDay(item, index)"
        >
          <div
            class="wh_item_date"
            v-bind:class="[
              { wh_isMark: item.isMark },
              { wh_other_dayhide: item.otherMonth !== 'nowMonth' },
              { wh_want_dayhide: item.dayHide },
              { wh_isToday: item.isToday },
              { wh_chose_day: item.chooseDay },
              setClass(item)
            ]"
          >
            <div>
              <div class="text">{{ item.id }}</div>
              <div v-if="item.price && !item.dayHide" class="price">
                <span>¥</span>
                {{ item.price }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import timeUtil from "./calendar.js";

export default {
  name: "calendar",
  data() {
    return {
      textTop: ["一", "二", "三", "四", "五", "六", "日"],
      myDate: [],
      list: [],
      historyChose: [],
      dateTop: ""
    };
  },
  props: {
    markDate: {
      type: Array,
      default: () => []
    },
    markDateMore: {
      type: Array,
      default: () => []
    },
    sundayStart: {
      type: Boolean,
      default: () => false
    },
    agoDayHide: {
      type: String,
      default: `0`
    },
    futureDayHide: {
      type: String,
      default: `2554387200`
    },
    disabledWeeks: {
      type: Array,
      default() {
        return [];
      }
    },
    prices: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  created() {
    this.intStart();
    this.myDate = new Date();
  },
  methods: {
    intStart() {
      if (this.sundayStart) {
        this.textTop = ["日", "一", "二", "三", "四", "五", "六"];
      } else {
        this.textTop = ["一", "二", "三", "四", "五", "六", "日"];
      }
      timeUtil.sundayStart = this.sundayStart;
    },
    setClass(data) {
      let obj = {};
      obj[data.markClassName] = data.markClassName;
      return obj;
    },
    clickDay: function(item) {
      if (item.dayHide) {
        return;
      }
      if (item.otherMonth === "nowMonth") {
        this.getList(this.myDate, item.date);
      }
      if (item.otherMonth !== "nowMonth") {
        item.otherMonth === "preMonth" ? this.PreMonth(item.date) : this.NextMonth(item.date);
      }
    },
    ChoseMonth: function(date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = new Date(date);
      this.$emit("changeMonth", timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    PreMonth: function(date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = timeUtil.getOtherMonth(this.myDate, "preMonth");
      this.$emit("changeMonth", timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    NextMonth: function(date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = timeUtil.getOtherMonth(this.myDate, "nextMonth");
      this.$emit("changeMonth", timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    forMatArgs: function() {
      let markDate = this.markDate;
      let markDateMore = this.markDateMore;
      markDate = markDate.map(k => {
        return timeUtil.dateFormat(k);
      });
      markDateMore = markDateMore.map(k => {
        k.date = timeUtil.dateFormat(k.date);
        return k;
      });
      return [markDate, markDateMore];
    },
    getList: function(date, chooseDay) {
      const [markDate, markDateMore] = this.forMatArgs();
      this.dateTop = `${date.getFullYear()}年${date.getMonth() + 1}月`;
      let arr = timeUtil.getMonthList(this.myDate);
      for (let i = 0; i < arr.length; i++) {
        let markClassName = "";
        let k = arr[i];
        k.chooseDay = false;
        const nowTime = k.date;
        const t = new Date(nowTime).getTime() / 1000;
        //看每一天的class
        for (const c of markDateMore) {
          if (c.date === nowTime) {
            markClassName = c.className || "";
          }
        }
        //标记选中某些天 设置class
        k.markClassName = markClassName;
        k.isMark = markDate.indexOf(nowTime) > -1;
        //无法选中某天
        k.dayHide = t < this.agoDayHide || t > this.futureDayHide;
        if (!k.dayHide) {
          let week = new Date(nowTime).getDay();
          if (this.disabledWeeks.some(w => w == week)) {
            k.dayHide = true;
          }
        }

        const price = this.prices.filter(p => p.date === nowTime)[0];
        if (price) {
          k.price = price.price;
        }

        if (k.isToday) {
          this.$emit("isToday", nowTime);
        }
        let flag = !k.dayHide && k.otherMonth === "nowMonth";
        if (chooseDay && chooseDay === nowTime && flag) {
          this.$emit("choseDay", nowTime);
          this.historyChose.push(nowTime);
          k.chooseDay = true;
        } else if (
          this.historyChose[this.historyChose.length - 1] === nowTime &&
          !chooseDay &&
          flag
        ) {
          k.chooseDay = true;
        }
      }
      this.list = arr;
    }
  },
  mounted() {
    this.getList(this.myDate);
  },
  watch: {
    markDate() {
      this.getList(this.myDate);
    },
    markDateMore() {
      this.getList(this.myDate);
    },
    agoDayHide(val) {
      this.agoDayHide = parseInt(val);
      this.getList(this.myDate);
    },
    futureDayHide(val) {
      this.futureDayHide = parseInt(val);
      this.getList(this.myDate);
    },
    sundayStart() {
      this.intStart();
      this.getList(this.myDate);
    },
    disabledWeeks() {
      this.getList(this.myDate);
    }
  }
};
</script>

<style lang="scss">
.wh_container li {
  list-style-type: none;
}

.wh_top_changge {
  display: flex;
}

.wh_top_changge li {
  cursor: pointer;
  display: flex;
  color: #333;
  font-size: 18px;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 47px;
}

.wh_top_changge .wh_content_li {
  cursor: auto;
  flex: 2.5;
}

.wh_content_all {
  background-color: #fff;
  width: 100%;
  overflow: hidden;
  padding-bottom: 30px;
}

.wh_content {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.wh_content:first-child .wh_content_item_tag,
.wh_content:first-child .wh_content_item {
  color: #ddd;
  font-size: 16px;
}

.wh_content_item,
.wh_content_item_tag {
  font-size: 15px;
  width: calc(100% / 7);
  text-align: center;
  color: #333;
  position: relative;
}

.wh_top_tag {
  height: 40px;
  line-height: 40px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.wh_item_date {
  height: 70px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  .text {
    height: 18px;
    line-height: 18px;
    font-size: 17px;
  }

  .price {
    color: red;
    font-size: 10px;
    height: 16px;
    line-height: 16px;
    margin-top: 3px;
  }
}

.wh_jiantou1 {
  width: 12px;
  height: 12px;
  border-top: 2px solid #999;
  border-left: 2px solid #999;
  transform: rotate(-45deg);
}

.wh_jiantou1:active,
.wh_jiantou2:active {
  border-color: #ddd;
}

.wh_jiantou2 {
  width: 12px;
  height: 12px;
  border-top: 2px solid #999;
  border-right: 2px solid #999;
  transform: rotate(45deg);
}

.wh_content_item > .wh_isMark {
  margin: auto;
  border-radius: 100px;
  background: blue;
  z-index: 2;
}

.wh_content_item .wh_other_dayhide {
  color: #333;
}

.wh_content_item .wh_want_dayhide {
  color: #aaa;
}

.wh_content_item .wh_isToday {
  background: white;
}

.wh_content_item .wh_chose_day {
  background: #19a0f0;
  color: #fff;

  .price {
    color: #fff;
  }
}
</style>
