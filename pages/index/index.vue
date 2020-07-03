<template>
	<view class="view-index">
		<view class="gradient-view">
			<view class="tui-banner-box" :style="{ height: swipeHeight + 'px' }">
				<swiper
					:autoplay="true"
					:interval="5000"
					:duration="150"
					class="tui-banner-swiper"
					:circular="true"
					indicator-color="rgba(255, 255, 255, 0.8)"
					indicator-active-color="#fff"
				>
					<swiper-item v-for="(item, index) in images" :key="index"><image :src="item" class="tui-slide-image" mode="scaleToFill" /></swiper-item>
				</swiper>
			</view>
		</view>
		<view v-if="scenic.noticeTitle" @click="onShowNotice" class="scenic-event">
			<view>
				<text class="iconfont icon-gonggao"></text>
				<span>{{ scenic.noticeTitle }}</span>
			</view>
			<view class="scenic-more"><text class="iconfont icon-arrow"></text></view>
		</view>
		<view class="scenic-ext" @click="onIntroduction">
			<view>
				<view class="scenic-ext-title">
					<span v-if="scenic.openText">开放时间</span>
					<span>景区特色</span>
					<span>景区简介</span>
				</view>
				<view v-if="scenic.openText" class="scenic-ext-word">{{ scenic.openText }}</view>
			</view>
			<view class="scenic-more">
				<text class="active-text">详情</text>
				<text class="iconfont icon-arrow"></text>
			</view>
		</view>
		<view class="view-categorys">
			<view v-for="category in categorys" :key="category.id" class="view-category">
				<view class="category-header">
					<view class="iconfont icon-menpiao"></view>
					<text>{{ category.name }}</text>
				</view>
				<view class="category-body">
					<view v-for="ticketType in ticketTypes" :key="ticketType.id" class="view-items">
						<view class="item-content">
							<view class="item-name">{{ ticketType.name }}</view>
							<view class="item-status">
								<text>{{ ticketType.travelDateText }}</text>
								<text :style="{ color: getRefundColor(ticketType) }">{{ ' ' + ticketType.refundText + ' ' }}</text>
								<text>无需取票</text>
							</view>
							<view class="item-explain" @click="onShowDescription(ticketType)"><text>新品 | 购买须知></text></view>
						</view>
						<view class="item-active">
							<view class="view-price">
								<text class="text-price">￥{{ ticketType.price }}</text>
							</view>
							<view class="view-book" @click="onBuy(ticketType)"><button>立即预订</button></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<ticket-notice v-model="showNotice" :scenic="scenic" @close="onCloseNotice"></ticket-notice>
		<ticket-introduction v-model="showIntroduction" :scenic="scenic" @close="onIntroductionClose"></ticket-introduction>
		<ticket-type-description
			v-model="showDescription"
			:show-buy="true"
			:ticketTypeId="selectedTicketType.id"
			:ticketTypeName="selectedTicketType.name"
			:price="selectedTicketType.price"
			:shouldRead="selectedTicketType.shouldReadDescription"
			@close="onDescriptionClose"
		></ticket-type-description>
		<ticket-member-select v-model="showMemberSelect" @close="onMemberSelectClose"></ticket-member-select>
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
			scenic: {},
			ticketTypes: [],
			selectedTicketType: {},
			origin: 'http://localhost:8080',
			shareImgUrl: '',
			groundId: 1,
			showDescription: false,
			showNotice: false,
			swipeHeight: 150,
			selectColors: [['#A5B4E4', '#6361EE'], ['#FB754E', '#FB3A47'], ['#254334', '#BF94D8']],
			showClothing: false,
			showStudent: true,
			showIntroduction: false,
			showMemberSelect: false,
			memberSelect: false,
			images: []
		};
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
		let systemInfo = uni.getSystemInfoSync();
		this.swipeHeight = (systemInfo.screenWidth / 640) * 360;

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
				this.setPageLabelMainText(this.scenic.pageLabelMainText);
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
			this.showIntroduction = true;
		},
		onIntroductionClose() {
			this.showIntroduction = false;
		},
		onBook() {
			uni.navigateTo({
				url: '../ticket/buy-ticket'
			});
		},
		onBuy(ticketType) {
			this.selectedTicketType = ticketType
			if(!this.memberSelect){
				this.showMemberSelect = true;
			} else {
				this.toBuy();
			}
		},
		onShowDescription(ticketType) {
			this.selectedTicketType = ticketType;
			this.showDescription = true;
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
		onDescriptionClose(){
			this.showDescription = false;
		},
		onMemberSelectClose(){
			this.showMemberSelect = false;
			this.memberSelect = true;
			this.toBuy();
		},
		toBuy(){
			if (this.selectedTicketType.shouldReadDescription) {
				this.onShowDescription(this.selectedTicketType);
			} else {
				uni.navigateTo({
					url: '/pages/ticket/buy-ticket?ticketTypeId=' + this.selectedTicketType.id
				});
			}
		},
		...mapMutations(['setGroundId', 'setPageLabelMainText'])
	}
};
</script>

<style lang="scss">
.view-index {
	font-size: 14px;
	background-color: #efefef;

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
		padding: 7px 15px 7px 15px;
		font-size: 13px;
		color: #ff0000;
		border-bottom: 1px solid #dbdbdb;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #ffffff;

		.icon-gonggao {
			margin-right: 5px;
			font-size: 14px;
			color: #ff0000;
		}
	}

	.scenic-ext {
		padding: 13px 15px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #ffffff;

		&-title {
			font-size: 15px;

			span {
				margin-right: 5px;
			}
		}

		&-word {
			margin-top: 8px;
			line-height: 13px;
			font-size: 12px;
			color: #999;
		}

		.iconfont {
			font-size: 14px;
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

	.view-introduction {
		display: flex;
		padding: 13px 15px;
		justify-content: space-between;
		font-size: 15px;
		background-color: #fff;
		.introduction-active {
			display: flex;
			justify-content: space-between;
			// align-items: center;
			color: #999;
			.icon-arrow {
				font-size: 20px;
			}
		}
	}
	.view-categorys {
		.view-category {
			margin-top: 10px;
			background: #fff;
			.category-header {
				display: flex;
				padding: 8px 15px;
				border-bottom: 1px solid #dbdbdb;
				font-size: 17px;
				align-items: center;
				.icon-menpiao {
					padding: 1px 3px 0px 3px;
					background-color: #ff7d13;
					border-radius: 25px;
					line-height: 1.5;
					color: #ffffff;
					font-size: 12px;
					height: 19px;
					margin-right: 7px;
				}
			}
			.category-body {
				.view-items {
					padding: 10px 13px 10px 0px;
					margin-left: 15px;
					display: flex;
					justify-content: space-between;
					border-bottom: 1px solid #dbdbdb;
					.item-content {
						.item-name {
							margin-bottom: 5px;
							padding-right: 0;
							line-height: 18px;
							font-size: 14px;
							color: #000;
							text-overflow: ellipsis;
							overflow: hidden;
						}
						.item-status {
							color: #099fde;
							font-size: 11px;
							padding: 0px 0px 7px 0px;
						}
						.item-explain {
							font-size: 12px;
							color: #999;
							height: 21px;
							line-height: 21px;
						}
					}
					.item-active {
						.view-price {
							font-size: 20px;
							font-style: normal;
							color: #f40;
							text-align: right;
							overflow: hidden;
							word-break: break-all;
							font-weight: 400;
							.text-price {
							}
						}
					}
				}
			}
		}
	}
}
</style>

<style>
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
	width: 100%;
	height: 100%;
	display: block;
	/* padding: 16rpx 30rpx 0px 30rpx; */
}

.tui-banner-swiper {
	width: 100%;
	height: 100%;
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
</style>
