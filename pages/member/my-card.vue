<template>
	<view class="view-my-integral">
		<view class="tui-header">
			<view class="tui-header-bottom">
				<view class="tui-bottom-item" @tap="dropDownList(-1)">
					<view class="tui-bottom-text">日期范围</view>
					<view class="iconfont icon-angle"></view>
				</view>
			</view>
		</view>
		<view class="tui-drop-input-box">
			<tui-dropdown-list :show="dropdownShow" :top="0" :height="400">
				<template v-slot:dropdownbox>
					<view class="tui-selected-list">
						<scroll-view scroll-y class="tui-dropdown-scroll">
							<block v-for="(item, index) in dropdownlistData" :key="index">
								<tui-list-cell padding="0" @click="dropDownList(index)" :unlined="dropdownlistData.length - 1 == index">
									<view class="tui-cell-class">
										<text class="iconfont icon-Member"></text>
										<text class="tui-ml-20">{{ item.name }}</text>
									</view>
								</tui-list-cell>
							</block>
						</scroll-view>
					</view>
				</template>
			</tui-dropdown-list>
		</view>
		<view class="view-card-list">
			<view v-for="(card, cardIndex) in cards" :key="cardIndex" class="view-card-item">
				<view class="card-item-title">{{ card.cardName }}</view>
				<view class="card-item-content">
					<view class="item-content-label">
						<view class="content-label-text">会员</view>
						:
					</view>
					<view class="item-content-value">{{ card.memberName }}</view>
				</view>
				<view class="card-item-content">
					<view class="item-content-label">
						<view class="content-label-text">有效期</view>
						:
					</view>
					<view class="item-content-value">{{ card.stime }}至{{ card.etime }}</view>
				</view>
				<view class="card-item-content">
					<view class="item-content-label">
						<view class="content-label-text">卡状态</view>
						:
					</view>
					<view class="item-content-value">{{ card.statusName }}</view>
				</view>
				<view class="card-item-content">
					<view class="item-content-label">
						<view class="content-label-text">卡号</view>
						:
					</view>
					<view class="item-content-value">{{ card.cardNo }}</view>
				</view>
				<view class="card-item-content">
					<view class="item-content-label">
						<view class="content-label-text">总次数</view>
						:
					</view>
					<view class="item-content-value">{{ card.totalNum }}</view>
				</view>
				<view class="card-item-content">
					<view class="item-content-label">
						<view class="content-label-text">剩余数</view>
						:
					</view>
					<view class="item-content-value">{{ card.surplusNum }}</view>
				</view>
				<view class="view-item-img">
					<img :src="card.qrcode" class="item-img" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import qrcodeHelper from "@/utils/qrcodeHelper.js";
	
export default {
	data() {
		return {
			dropdownlistData: [
				{
					name: '微信支付'
				},
				{
					name: '支付宝支付'
				},
				{
					name: '银行卡支付'
				}
			],
			dropdownShow: false,
			totalIntegral: 1234,
			surplusIntegral: 876,
			cards: [
				{
					cardName: '十五小时卡',
					memberName: '左左',
					stime: '2020-01-02',
					etime: '2021-01-02',
					statusName: '已售',
					cardNo: '234923842384',
					totalNum: 500,
					surplusNum: 500,
					qrcode: ''
				},
				{
					cardName: '十五小时卡',
					memberName: '左左',
					stime: '2020-01-02',
					etime: '2021-01-02',
					statusName: '已售',
					cardNo: '234923842385',
					totalNum: 500,
					surplusNum: 500,
					qrcode: ''
				},
				{
					cardName: '十五小时卡',
					memberName: '左左',
					stime: '2020-01-02',
					etime: '2021-01-02',
					statusName: '已售',
					cardNo: '234923842386',
					totalNum: 500,
					surplusNum: 500,
					qrcode: ''
				},
				{
					cardName: '十五小时卡',
					memberName: '左左',
					stime: '2020-01-02',
					etime: '2021-01-02',
					statusName: '已售',
					cardNo: '234923842388',
					totalNum: 500,
					surplusNum: 500,
					qrcode: ''
				}
			]
		};
	},
	async onLoad(){
		this.cards.forEach(async(card) =>{
			card.qrcode = await qrcodeHelper.createQRCodeAsync(card.cardNo);
		});
		console.log(this.cards);
	},
	methods: {
		dropDownList(index) {
			if (index !== -1) {
				this.tui.toast('index：' + index);
			}
			this.dropdownShow = !this.dropdownShow;
		}
	}
};
</script>

<style lang="scss">
.view-my-integral {
	.tui-header {
		.tui-header-bottom {
			.tui-bottom-item {
				.icon-angle {
					font-size: 12px;
					transform: scale(0.9);
					padding: 2px 0px 0px 2px;
				}
			}
		}
	}
	.tui-cell-class {
		padding: 10px 3px 9px 10px;
	}
	.view-card-list {
		.view-card-item {
			margin: 15px 0px 0px 0px;
			background: #ffffff;
			padding: 15px 20px 15px 20px;
			.card-item-title {
				font-weight: bold;
				font-size: 18px;
				padding: 0px 0px 10px 0px;
			}
			.card-item-content {
				display: flex;
				justify-content: space-between;
				.item-content-label {
					display: flex;
					.content-label-text {
						width: 43px;
						text-align-last: justify;
						text-align: justify;
						text-justify: distribute-all-lines; // 这行必加，兼容ie浏览bai器
					}
				}
				.item-content-value {
					text-align: right;
				}
			}
			.view-item-img{
				text-align: center;
				.item-img{
					display: block;
					    margin: auto;
					    background-color: #fff;
					    border-radius: 4px;
					    width: 130px;
					    height: 100%;
				}
			}
		}
	}
}
</style>

<style>
/* 隐藏scroll-view滚动条*/
::-webkit-scrollbar {
	width: 0;
	height: 0;
	color: transparent;
}

/*header*/
.tui-header {
	width: 100%;
	/* box-shadow: 0 15rpx 10rpx -15rpx #f2f2f2; */
	box-sizing: border-box;
	background-image: -webkit-linear-gradient(left, #009eff, #00d0ff);
	position: fixed;
	z-index: 1000;
	color: #ffffff;
}

.tui-header-bottom {
	display: flex;
	align-items: center;
	font-size: 26rpx;
}

.tui-bottom-item {
	margin-left: 6rpx;
}

.tui-header-bottom {
	height: 80rpx;
	padding: 0 30rpx;
	box-sizing: border-box;
	font-size: 28rpx;
	align-items: center;
	overflow: hidden;
}

.tui-bottom-text {
	line-height: 24rpx;
}

.tui-bottom-item {
	flex: 0.2;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 18rpx 12rpx;
	border-radius: 40rpx;
	box-sizing: border-box;
	/* background: #f2f2f2; */
	margin-right: 20rpx;
	white-space: nowrap;
}

.tui-bottom-item:last-child {
	margin-right: 0;
}

.tui-ml {
	margin-left: 6rpx;
}

/*header*/

/*header 下拉选择*/

.tui-drop-input-box {
	padding: 80rpx 50rpx 0rpx 50rpx;
	box-sizing: border-box;
	width: 300px;
}

.tui-selected-list {
	background-color: #fff;
	border-radius: 20rpx;
	overflow: hidden;
	transform: translateZ(0);
}

.tui-dropdown-scroll {
	height: 400rpx;
}

/* 下拉选择 */
</style>
