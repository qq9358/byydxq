<template>
	<view>
		<view class="dategroup">
			<view class="date-item">
				<view
					v-for="(date, index) in showDates"
					:key="date.date"
					class="dategroup-date"
					:class="{
						'dategroup-selected': selectedDate === date.date,
						'dategroup-disabled': date.disable
					}"
					@click="dateChanged(index)"
				>
					<view>
						<view class="dategroup-date-text">{{ date.text }}</view>
						<view v-if="date.disable">不可订</view>
						<view v-else-if="date.price" class="dategroup-date-price">
							<span>¥</span>
							{{ date.price }}
						</view>
					</view>
					<view v-if="selectedDate === date.date" class="triangle-right-bottom"><view class="iconfont icon-check"></view></view>
				</view>
				<view class="dategroup-date" @click="selectMoreDate">
					<view>
						<view class="dategroup-date-text dategroup-date-more">
							<span>更多日期</span>
							<view name="arrow"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="calendarPopup" type="bottom">
			<calendar :ago-day-hide="minDateTime" :future-day-hide="maxDateTime" :prices="dates" :disabled-weeks="disabledWeeks" @choseDay="confirmMoreDate"></calendar>
		</uni-popup>
	</view>
</template>

<script>
import dayjs from 'dayjs';

const weekNames = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

export default {
	name: 'date-selector',
	data() {
		return {
			selectedDate: this.value,
			showDateTimePicker: false
		};
	},
	props: {
		value: {
			type: String,
			default: dayjs().toDateString()
		},
		dates: {
			type: Array,
			default() {
				let now = dayjs();
				let tomorrow = dayjs().addDays(1);
				let afterTomorrow = dayjs().addDays(2);
				return [
					{
						date: now.toDateString(),
						text: '今天' + now.format('MM-DD'),
						disable: false
					},
					{
						date: tomorrow.toDateString(),
						text: '明天' + tomorrow.format('MM-DD'),
						disable: false
					},
					{
						date: afterTomorrow.toDateString(),
						text: afterTomorrow.format('MM-DD') + weekNames[afterTomorrow.day()],
						disable: false
					}
				];
			}
		},
		moreDate: {
			type: Boolean,
			default: true
		},
		disabledWeeks: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	computed: {
		showDates() {
			const today = dayjs().toDateString();
			const tomorrow = dayjs()
				.addDays(1)
				.toDateString();

			let dates = this.dates.slice(0, 3);
			if (this.selectedDate && !dates.some(d => d.date == this.selectedDate)) {
				const selectedDateObj = this.dates.filter(d => d.date == this.selectedDate)[0];
				if (selectedDateObj) {
					dates[dates.length - 1] = selectedDateObj;
				} else {
					dates[dates.length - 1] = {
						date: this.selectedDate,
						text: `${this.selectedDate.substr(5, 5)}${weekNames[dayjs(this.selectedDate).day()]}`,
						disable: false
					};
				}
			}

			dates.forEach(date => {
				if (!date.text) {
					if (date.date === today) {
						date.text = `今天${date.date.substr(5, 5)}`;
					} else if (date.date === tomorrow) {
						date.text = `明天${date.date.substr(5, 5)}`;
					} else {
						date.text = `${date.date.substr(5, 5)}${weekNames[dayjs(date.date).day()]}`;
					}
				}
			});
			return dates;
		},
		minDate() {
			let date = this.dates.filter(d => !d.disable)[0];
			if (date) {
				return new Date(date.date);
			}
			return new Date();
		},
		minDateTime() {
			return (this.minDate.getTime() / 1000).toString();
		},
		maxDate() {
			const date = this.dates[this.dates.length - 1];
			if (date) {
				return new Date(date.date);
			}
			return new Date();
		},
		maxDateTime() {
			return (this.maxDate.getTime() / 1000).toString();
		}
	},
	watch: {
		value: function(val, oldVal) {
			if (!oldVal && val) {
				this.selectedDate = val;
			}
		}
	},
	methods: {
		dateChanged(index) {
			let date = this.dates[index];
			if (date.disable) {
				return;
			}

			this.selectedDate = date.date;
			this.$emit('input', this.selectedDate);
		},
		selectMoreDate() {
			this.$refs.calendarPopup.open();
		},
		confirmMoreDate(value) {
			this.$refs.calendarPopup.close();

			this.selectedDate = dayjs(value).toDateString();
			this.$emit('input', this.selectedDate);
		},
		cancelMoreDate() {
			this.showDateTimePicker = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.dategroup {
	background-color: white;
	font-size: 12px;
	padding: 10px 10px;

	&-date {
		height: 45px;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		border: #999 solid 1px;
		border-radius: 5px;
		width: 22%;

		&-text {
			font-size: 12px;
			line-height: 14px;
			color: #19a0f0;
		}

		&-price {
			font-weight: 400;
			line-height: 20px;
			font-size: 13px;
			color: #f40;

			span {
				margin-right: 2px;
			}
		}

		&-more {
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	&-selected {
		border: #19a0f0 solid 1px;
		background-size: 17px;
		position: relative;
	}

	&-disabled {
		color: #bbb;

		.dategroup-date-text {
			color: #bbb;
		}
	}

	.date-item {
		display: flex;
		justify-content: space-around;
	}
}
</style>
