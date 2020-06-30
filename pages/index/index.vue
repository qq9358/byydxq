<template>
	<view class="view-index">
		<view class="gradient-view">
			<view class="tui-banner-box">
				<swiper
					:indicator-dots="true"
					:autoplay="true"
					:interval="5000"
					:duration="150"
					class="tui-banner-swiper"
					:circular="true"
					indicator-color="rgba(255, 255, 255, 0.8)"
					indicator-active-color="#fff"
				>
					<swiper-item v-for="(item, index) in images" :key="index" @tap.stop="detail">
						<view class="view-gradient" :style="{ background: `linear-gradient(to bottom right, ${selectColors[index][0]}, ${selectColors[index][1]})` }">
							<view class="view-style"><img class="style-img" src="@/static/images/pages/index/index_header_style.png" /></view>
							<view class="view-title">冰场票务中心</view>
							<image :src="item" class="tui-slide-image" mode="scaleToFill" />
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view @click="onShowNotice" class="scenic-event">
			<view>
				<text class="iconfont icon-gonggao"></text>
				<span>{{ scenic.noticeTitle }}看一看，瞧一瞧啦，这里有公告</span>
			</view>
			<view class="scenic-more"><text class="iconfont icon-arrow"></text></view>
		</view>
		<view class="view-icon-button">
			<view class="view-tap">
				<view class="icon-button-gift icon-button-view"><view class="iconfont icon-gift1"></view></view>
				<view class="icon-button-tap">冰场活动</view>
			</view>
			<view class="view-tap">
				<view class="icon-button-alarm icon-button-view"><view class="iconfont icon-alarm"></view></view>
				<view class="icon-button-tap">课程预约</view>
			</view>
			<view class="view-tap">
				<view class="icon-button-ice-skate icon-button-view"><view class="iconfont icon-ice-skate"></view></view>
				<view class="icon-button-tap">冰场简介</view>
			</view>
			<view class="view-tap">
				<view class="icon-button-coach icon-button-view"><view class="iconfont icon-coach"></view></view>
				<view class="icon-button-tap">教练介绍</view>
			</view>
		</view>
		<view class="view-activity-swiper">
			<view class="tui-banner-box tui-activity-box">
				<swiper
					:indicator-dots="true"
					:autoplay="true"
					:interval="5000"
					:duration="150"
					class="tui-banner-swiper tui-activity-swiper"
					:circular="true"
					indicator-color="rgba(255, 255, 255, 0.8)"
					indicator-active-color="#fff"
				>
					<swiper-item v-for="(item, index) in activityImages" :key="index" @tap.stop="detail">
						<view class="view-activity-image"><image :src="item" class="activity-image" mode="scaleToFill" /></view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view v-if="showStudent" class="view-module">
			<view v-if="showClothing" class="module-left" @click="showClothing = false">
				<view class="module-view module-big-ticket">
					<view class="module-title big-ticket-title">冰场滑冰票</view>
					<view class="module-button ticket-button">
						立即预订
						<text class="iconfont icon-arrow"></text>
					</view>
				</view>
			</view>
			<view v-if="!showClothing" class="module-left">
				<view class="module-view module-ticket" @click="onTicketClick">
					<view class="module-title ticket-title">冰场滑冰票</view>
					<view class="module-button ticket-button">
						立即预订
						<text class="iconfont icon-arrow"></text>
					</view>
				</view>
				<view class="module-view module-clothing" @click="showClothing = true">
					<view class="module-title clothing-title">护具出租</view>
					<view class="module-button clothing-button">
						立即预订
						<text class="iconfont icon-arrow"></text>
					</view>
				</view>
			</view>
			<view class="module-right">
				<view class="module-view module-course" @click="showStudent = false">
					<view class="module-title course-title">学员课程</view>
					<view class="module-button course-button">
						立即预订
						<text class="iconfont icon-arrow"></text>
					</view>
				</view>
				<view class="module-view module-card">
					<view class="module-title card-title">会员卡</view>
					<view class="module-button card-button">
						立即预订
						<text class="iconfont icon-arrow"></text>
					</view>
				</view>
			</view>
		</view>
		<view v-if="!showStudent" class="view-coach">
			<view class="coach-row">
				<view class="coach-view coach-confirm">
					<view v-if="true" class="coach-num">
						待确认
						<br />
						3
					</view>
					<view v-else class="coach-num-null"></view>
					<view class="coach-icon"><img class="coach-icon-img" src="@/static/images/pages/index/coach_icon_confirm.png" /></view>
					<view class="icon-background"><text class="iconfont icon-kecheng icon-kecheng-confirm"></text></view>
					<view class="coach-title">待确认课程</view>
				</view>
				<view class="coach-view coach-teach" @click="showStudent = true">
					<view v-if="true" class="coach-num">
						待确认
						<br />
						2
					</view>
					<view v-else class="coach-num-null"></view>
					<view class="coach-icon"><img class="coach-icon-img" src="@/static/images/pages/index/coach_icon_teach.png" /></view>
					<view class="icon-background"><text class="iconfont icon-kecheng icon-kecheng-teach"></text></view>
					<view class="coach-title">待教学课程</view>
				</view>
			</view>
			<view class="coach-row">
				<view class="coach-view coach-end">
					<view v-if="true" class="coach-num">
						待确认
						<br />
						1
					</view>
					<view v-else class="coach-num-null"></view>
					<view class="coach-icon"><img class="coach-icon-img" src="@/static/images/pages/index/coach_icon_end.png" /></view>
					<view class="icon-background"><text class="iconfont icon-kecheng icon-kecheng-end"></text></view>
					<view class="coach-title">已完结课程</view>
				</view>
				<view class="coach-view coach-lesson">
					<view v-if="false" class="coach-num">
						待确认
						<br />
						3
					</view>
					<view v-else class="coach-num-null"></view>
					<view class="coach-icon"><img class="coach-icon-img" src="@/static/images/pages/index/coach_icon_lesson.png" /></view>
					<view class="icon-background"><text class="iconfont icon-kecheng icon-kecheng-lesson"></text></view>
					<view class="coach-title">教练课表</view>
				</view>
			</view>
		</view>
		<ticket-notice v-model="showNotice" @close="onCloseNotice"></ticket-notice>
	</view>
</template>

<script>
import dayjs from 'dayjs';
import { mapState, mapMutations } from 'vuex';
import { mobileMixin } from './../../mixins/mobileMixin.js';
import ticketTypeService from './../../services/ticketTypeService.js';
import scenicService from './../../services/scenicService.js';
import settingService from './../../services/settingService.js';
import memberService from '@/services/memberService.js';
import iSwiperOne from '@/static/images/pages/index/index_swiper_one.png';
import iSwiperTwo from '@/static/images/pages/index/index_swiper_two.png';
import iSwiperThree from '@/static/images/pages/index/index_swiper_three.png';
import iActivityOne from '@/static/images/pages/index/activity_swiper_one.png';
import iActivityTwo from '@/static/images/pages/index/activity_swiper_two.png';
import iActivityThree from '@/static/images/pages/index/activity_swiper_three.png';

const today = dayjs();
const tomorrow = dayjs().addDays(1);
export default {
	mixins: [mobileMixin],
	props: {
		publicSaleFlag: {
			type: [Boolean, String],
			default: true
		}
	},
	data() {
		return {
			href: 'https://uniapp.dcloud.io/collocation/pages?id=easycom',
			swiper: {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			},
			introductionTitle: '景区特色  景区简介',
			categorys: [
				{
					id: 1,
					name: '景区门票',
					items: [
						{
							id: 1,
							name: '欢乐票',
							price: 12.34
						},
						{
							id: 2,
							name: '开发票',
							price: 23.45
						}
					]
				},
				{
					id: 2,
					name: '餐饮',
					items: [
						{
							id: 1,
							name: '河粉',
							price: 5.5
						},
						{
							id: 2,
							name: '米饭',
							price: 3
						}
					]
				}
			],
			images: [iSwiperOne, iSwiperTwo, iSwiperThree],
			activityImages: [iActivityOne, iActivityTwo, iActivityThree],
			scenic: {},
			ticketTypes: [],
			selectedTicketType: {},
			origin: 'http://localhost:8080',
			shareImgUrl: '',
			groundId: 1,
			showDescription: false,
			showNotice: false,
			screenWidth: 0,
			selectColors: [['#A5B4E4', '#6361EE'], ['#FB754E', '#FB3A47'], ['#254334', '#BF94D8']],
			showClothing: false,
			showStudent: true
		};
	},
	computed: {
		swipeHeight() {
			return (this.screenWidth / 640) * 360;
		}
	},
	async onLoad() {
		/* #ifndef MP */
		await memberService.loginFromWeChatAsync({
			code: '',
			state: ''
		});
		/* #endif */
		/* #ifdef MP */
		await memberService.loginFromMiniAsync();
		/* #endif */
		let systemInfo = await uni.getSystemInfo();
		this.screenWidth = systemInfo[1].screenWidth;

		await settingService.getSettingsFromWeChatAsync();

		const getTicketTypeTask = ticketTypeService
			.getTicketTypesForWeiXinSaleAsync({
				publicSaleFlag: this.publicSaleFlag,
				groundId: ''
			})
			.then(ticketTypes => {
				for (const ticketType of ticketTypes) {
					ticketType.travelDateText = this.getTravelDateText(ticketType);
					ticketType.refundText = this.getRefundText(ticketType);
				}

				this.ticketTypes = ticketTypes;
			});

		const getScenicTask = scenicService
			.getScenicAsync()
			.then(scenic => {
				if (scenic.photoList && scenic.photoList.length > 0) {
					this.images = scenic.photoList.map(p => p.url);
					this.shareImgUrl = this.images[0];
				}

				if (scenic.openTime && scenic.closeTime) {
					const today = dayjs().toDateString();
					const openTime = dayjs(`${today} ${scenic.openTime}:00`);
					const closeTime = dayjs(`${today} ${scenic.closeTime}:00`);
					const now = dayjs();
					if (now.isBefore(openTime)) {
						scenic.openText = `未开园 ${scenic.openTime}开园`;
					} else if (now.isBetween(openTime, closeTime)) {
						scenic.openText = `开放中 ${scenic.closeTime}闭园`;
					} else {
						scenic.openText = `已闭园 明日${scenic.openTime}开园`;
					}
				}

				this.scenic = scenic;
			})
			.then(() => {
				let shareUrl = `${this.origin}/tickettype/${this.publicSaleFlag}`;
				if (this.groundId) {
					shareUrl += `?groundId=${this.groundId}`;
				}
				// settingService.configWxJsApi().then(() => {
				// 	settingService.configWxShareUrl(shareUrl, this.shareImgUrl);
				// });
			});

		try {
			await Promise.all([getTicketTypeTask, getScenicTask]);
			this.pageLoaded = true;
		} finally {
		}
	},
	methods: {
		onIntroduction() {
			this.$refs.introductionPopup.open();
		},
		onBook() {
			uni.navigateTo({
				url: '../ticket/buy-ticket'
			});
		},
		onBuy(ticketType) {
			if (ticketType.shouldReadDescription) {
				this.onShowDescription(ticketType);
			} else {
				uni.navigateTo({
					url: '/pages/ticket/buy-ticket?ticketTypeId=' + ticketType.id
				});
			}
		},
		onShowDescription(ticketType) {
			this.selectedTicketType = ticketType;
			this.showDescription = true;
			// this.$refs.itemExplainPopup.open();
		},
		getTravelDateText(ticketType) {
			const startTravelDate = dayjs(ticketType.startTravelDate);
			let travelDateText = '';
			if (startTravelDate.isSameOrBefore(today)) {
				travelDateText = '今日';
			} else if (startTravelDate.isSameOrBefore(tomorrow)) {
				travelDateText = '明日';
			} else {
				travelDateText = startTravelDate.format('MM月DD日');
			}

			return `最早可订${travelDateText}票`;
		},
		getRefundText(ticketType) {
			if (ticketType.allowRefund === false) {
				return '不可退';
			}

			return ticketType.refundLimited ? '有条件退' : '随时退';
		},
		getRefundColor(ticketType) {
			if (ticketType.allowRefund === false) {
				return '#ff2f39';
			}
			return ticketType.refundLimited ? '#ffae13' : '#099fde';
		},
		onShowNotice() {
			this.showNotice = true;
		},
		onCloseNotice() {
			this.showNotice = false;
		},
		onTicketClick() {
			uni.navigateTo({
				url: '/pages/ticket/ticket-type'
			});
		},
		...mapMutations(['setGroundId'])
	}
};
</script>

<style lang="scss">
.view-index {
	font-size: 14px;
	background-color: #ffffff;
	.color-swiper {
		width: 100%;
		overflow: hidden;
		border-bottom-right-radius: 20px;
		border-bottom-left-radius: 20px;
	}

	.view-gradient {
		height: 163px;
		width: 100%;
		margin: 0 auto;
		// padding: 0px 10px 0px 10px;
		border-bottom-right-radius: 20px;
		border-bottom-left-radius: 20px;
		.view-title {
			color: #ffffff;
			margin-top: -51px;
			font-size: 17px;
			text-align: center;
		}

		.view-style {
			overflow: hidden;
			height: 80px;
			.style-img {
				width: 100%;
			}
		}
	}

	.gradient-view {
		width: 100%;
		// border-radius: 6px;
		overflow: hidden;
		.gradient-img {
			width: 100%;
			height: 100%;
		}
	}

	.view-module {
		display: flex;
		justify-content: space-between;
		padding: 10px 11px 30px 11px;

		.module-left {
			width: 50%;
		}

		.module-right {
			width: 50%;
		}

		.module-view {
			margin: 10px 5px 0px 5px;
			height: 50%;
			.module-title {
				padding: 19px 0px 0px 18px;
				font-size: 18px;
				color: #ffffff;
			}

			.module-button {
				width: 62px;
				background: #ffffff;
				border-radius: 20px;
				padding: 2px 2px 2px 8px;
				margin: 10px 0px 0px 18px;
				font-size: 12px;
				.iconfont {
					font-size: 12px;
				}
			}
		}

		.module-ticket {
			background: url('@/static/images/pages/index/module_background_ticket.png');
			background-size: 100% 100%;
			color: #00a596;
			.iconfont {
				color: #00a596;
			}
		}

		.module-big-ticket {
			height: calc(100% + 10px);
			background: url('@/static/images/pages/index/module_background_big_ticket.png');
			background-size: 100% 100%;
			color: #00a596;
			.iconfont {
				color: #00a596;
			}
		}

		.module-course {
			background: url('@/static/images/pages/index/module_background_course.png');
			background-size: 100% 100%;
			color: #0081c3;
			.iconfont {
				color: #0081c3;
			}
		}

		.module-clothing {
			background: url('@/static/images/pages/index/module_background_clothing.png');
			background-size: 100% 100%;
			color: #ee7225;
			.iconfont {
				color: #ee7225;
			}
		}

		.module-card {
			background: url('@/static/images/pages/index/module_background_card.png');
			background-size: 100% 100%;
			color: #8804e1;
			.iconfont {
				color: #8804e1;
			}
		}
	}

	.view-coach {
		padding: 10px 10px 10px 10px;
		.coach-row {
			display: flex;
			justify-content: space-between;
		}

		.coach-view {
			width: 50%;
			border-radius: 5px;
			margin: 10px 5px 0px 5px;
			overflow: hidden;
			text-align: center;
		}

		.coach-num {
			background-image: url('@/static/images/pages/index/coach_background_color.png');
			background-size: 100% 100%;
			color: #ffffff;
			text-align: center;
			width: 50px;
			margin-left: auto;
			font-size: 12px;
			padding: 8px 3px 8px 3px;
		}

		.coach-num-null {
			height: 52px;
		}

		.coach-icon {
			margin-top: -38px;
		}

		.coach-icon-img {
			width: 58px;
			height: 58px;
		}

		.icon-background {
			margin-left: auto;
			width: 100px;
			margin-right: -30px;
			margin-bottom: -40px;
			margin-top: -26px;
		}

		.coach-title {
			margin-top: -80px;
			height: 35px;
			font-size: 16px;
		}

		.iconfont {
			font-size: 35px;
			// font-weight: bold;
		}

		.icon-kecheng {
			font-size: 80px;
		}

		.gradient-text {
			text-align: left;
			text-indent: 30px;
			line-height: 50px;
			font-size: 40px;
			position: relative;
		}

		.coach-confirm {
			background: #c1e4f8;
			.icon-icon- {
				color: #2999ff;
				font-size: 35px;
			}
			.icon-kecheng-confirm {
				color: #acdcf9;
			}
			.gradient-text-confirm {
				// background-image: -webkit-linear-gradient(top, #35b0ff, #024cff);
				// -webkit-background-clip: text;
				// -webkit-text-fill-color: transparent;
			}
		}

		.coach-teach {
			background: #ffd9c2;
			.icon-kecheng-teach {
				color: #fdcbac;
			}
			.gradient-text-teach {
				background-image: -webkit-linear-gradient(top, #fb9f00, #e36b24);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
		}

		.coach-end {
			background: #c4ffdc;
			.icon-kecheng-end {
				color: #aef4ca;
			}
			.gradient-text-end {
				background-image: -webkit-linear-gradient(top, #07d158, #00913a);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
		}

		.coach-lesson {
			background: #dedeff;
			.icon-kecheng-lesson {
				color: #c9d1ff;
			}
			.gradient-text-lesson {
				background-image: -webkit-linear-gradient(top, #941edb, #941edb);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}
		}
	}

	.view-activity-swiper {
		padding: 0px 15px 0px 15px;
		.view-activity-image {
			width: calc(100%);
			height: calc(100%);
			display: block;
			.activity-image {
				height: 100%;
				width: 100%;
				border-radius: 12px;
				overflow: hidden;
			}
		}
	}

	.view-icon-button {
		display: flex;
		justify-content: space-between;
		padding: 20px 25px 20px 25px;
		.view-tap {
			.icon-button-tap {
				padding: 5px 0px 0px 0px;
			}
			.iconfont {
				color: #ffffff;
				font-size: 22px;
				margin: 0 auto;
			}
			.icon-button-view {
				width: 50px;
				height: 50px;
				display: flex;
				align-items: center;
				border-radius: 25px;
				margin: 0 auto;
			}
			.icon-button-gift {
				background: linear-gradient(#951eda, #5d2afe);
			}
			.icon-button-alarm {
				background: linear-gradient(#fea100, #e66d25);
			}
			.icon-button-ice-skate {
				background: linear-gradient(#07d359, #00903a);
			}
			.icon-button-coach {
				background: linear-gradient(#36b1ff, #014aff);
			}
		}
	}

	.scenic-event {
		padding: 7px 20px 7px 30px;
		font-size: 13px;
		color: #383838;
		border-bottom: 1px solid #dbdbdb;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #ffffff;

		.icon-gonggao {
			margin-right: 5px;
			font-size: 14px;
			color: #fc9907;
		}
	}

	.scenic-more {
		text-align: right;
		line-height: 24px;
		color: #999;

		span {
			display: inline-block;
			vertical-align: middle;
			margin: 0 6px;
			height: 18px;
			line-height: 18px;
			font-size: 13px;
		}

		.iconfont {
			vertical-align: middle;
			font-size: 14px;
		}
	}
}
</style>

<style>
/* .color-swiper{
	height: 173px
} */
.tui-swiper {
	font-size: 26rpx;
	height: 60rpx;
	flex: 1;
	padding-left: 12rpx;
}

.tui-swiper-item {
	display: flex;
	align-items: center;
}

.tui-banner-box {
	width: 100%;
	/* padding: 0 30rpx; */
	box-sizing: border-box;
	// position: absolute;
	/* overflow: hidden; */
	z-index: 99;
	bottom: -80rpx;
	left: 0;
}

.tui-slide-image {
	width: calc(100% - 60rpx);
	height: 148px;
	display: block;
	padding: 16rpx 30rpx 0px 30rpx;
}

.tui-banner-swiper {
	width: 100%;
	height: 210px;
	/* border-radius: 12rpx; */
	overflow: hidden;
	transform: translateY(0);
}

/* #ifdef MP-WEIXIN */
.tui-banner-swiper .wx-swiper-dot {
	width: 8rpx;
	height: 8rpx;
	display: inline-flex;
	background: none;
	justify-content: space-between;
}

.tui-banner-swiper .wx-swiper-dot::before {
	content: '';
	flex-grow: 1;
	background-color: rgba(255, 255, 255, 0.8);
	border-radius: 16rpx;
	overflow: hidden;
}

.tui-banner-swiper .wx-swiper-dot-active::before {
	background-color: #fff;
}

.tui-banner-swiper .wx-swiper-dot.wx-swiper-dot-active {
	width: 16rpx;
}

/* #endif */

/* #ifndef MP-WEIXIN */
>>> .tui-banner-swiper .uni-swiper-dot {
	width: 8rpx;
	height: 8rpx;
	display: inline-flex;
	background-color: none;
	justify-content: space-between;
}

>>> .tui-banner-swiper .uni-swiper-dot::before {
	content: '';
	flex-grow: 1;
	background-color: rgba(255, 255, 255, 0.8);
	border-radius: 16rpx;
	overflow: hidden;
}

>>> .tui-banner-swiper .uni-swiper-dot-active::before {
	background-color: #fff;
}

>>> .tui-banner-swiper .uni-swiper-dot.uni-swiper-dot-active {
	width: 16rpx;
}

/* #endif */

.tui-activity-box {
	height: 156rpx;
}

.tui-activity-swiper {
	height: 156rpx;
	border-radius: 20rpx;
}

.view-module {
	height: 400rpx;
}

.coach-view {
	height: 200rpx;
}
</style>
