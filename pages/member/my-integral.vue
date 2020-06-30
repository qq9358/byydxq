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
										<tui-icon :name="item.icon" :size="item.size" :color="item.color"></tui-icon>
										<text class="tui-ml-20">{{ item.name }}</text>
									</view>
								</tui-list-cell>
							</block>
						</scroll-view>
					</view>
				</template>
			</tui-dropdown-list>
		</view>
		<view class="view-integral-info">
			<view class="integral-info-item">
				<view class="integral-info-title">总积分：￥</view>
				<view class="integral-info-num">{{ totalIntegral }}</view>
			</view>
			<view class="integral-info-item">
				<view class="integral-info-title">可用积分：￥</view>
				<view class="integral-info-num">{{ surplusIntegral }}</view>
			</view>
			<view class="integral-info-item">
				<view class="integral-info-title">已总积分：￥</view>
				<view class="integral-info-num">{{ totalIntegral - surplusIntegral }}</view>
			</view>
		</view>
		<view class="view-integral-list">
			<view v-for="(integral, integralIndex) in integrals" :key="integralIndex" class="integral-list-item">
				<view class="list-item-icon">
					<view class="item-icon-view"><img class="item-icon-img" src="@/static/images/pages/integral/integral_icon_item.png" /></view>
				</view>
				<view class="list-item-content">
					<view class="item-content-text">
						<view class="content-text-purpose">{{ integral.purpose }}</view>
						<view class="content-text-ctime">{{ integral.cTime }}</view>
					</view>
					<view class="list-item-value">
						<view :class="[integral.value > 0 ? 'item-value-positive' : 'item-value-negative']">{{ integral.value > 0 ? '+' : '' }}{{ integral.value }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			dropdownlistData: [
				{
					name: '微信支付',
					icon: 'wechat',
					color: '#80D640',
					size: 30
				},
				{
					name: '支付宝支付',
					icon: 'alipay',
					color: '#00AAEE',
					size: 30
				},
				{
					name: '银行卡支付',
					icon: 'bankcard-fill',
					color: '#ff7900',
					size: 28
				},
				{
					name: '微信支付',
					icon: 'wechat',
					color: '#80D640',
					size: 30
				},
				{
					name: '支付宝支付',
					icon: 'alipay',
					color: '#00AAEE',
					size: 30
				},
				{
					name: '银行卡支付',
					icon: 'bankcard-fill',
					color: '#ff7900',
					size: 28
				}
			],
			dropdownShow: false,
			totalIntegral: 1234,
			surplusIntegral: 876,
			integrals: [
				{
					purpose: '购买滑冰卡一张',
					cTime: '今天 09:12',
					value: 100
				},
				{
					purpose: '购买滑冰卡一张',
					cTime: '今天 09:12',
					value: -100
				},
				{
					purpose: '购买滑冰卡一张',
					cTime: '今天 09:12',
					value: 100
				},
				{
					purpose: '购买滑冰卡一张',
					cTime: '今天 09:12',
					value: -100
				},
				{
					purpose: '购买滑冰卡一张',
					cTime: '今天 09:12',
					value: 100
				},
				{
					purpose: '购买滑冰卡一张',
					cTime: '今天 09:12',
					value: 100
				},
				{
					purpose: '购买滑冰卡一张',
					cTime: '今天 09:12',
					value: 100
				},
				{
					purpose: '购买滑冰卡一张',
					cTime: '今天 09:12',
					value: -100
				},
				{
					purpose: '购买滑冰卡一张',
					cTime: '今天 09:12',
					value: -100
				}
			]
		};
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

	.view-integral-info {
		display: flex;
		justify-content: space-between;
		background: #f0f0f0;
		padding: 20px 25px 20px 25px;
		.integral-info-item {
			display: flex;
			font-size: 14px;
			.integral-info-title {
			}
			.integral-info-num {
				color: #fe7418;
				font-weight: bold;
			}
		}
	}

	.view-integral-list {
		.integral-list-item {
			display: flex;
			.list-item-icon {
				padding: 20px 20px 20px 20px;
				width: 23px;
				height: 23px;
				.item-icon-view {
					background: #fe7c18;
					border-radius: 50%;
					padding: 11px 11px 11px 11px;
					width: 100%;
					height: 100%;
					.item-icon-img {
						height: 100%;
						width: 100%;
					}
				}
			}
			.list-item-content {
				border-bottom: 1px solid #dbdbdb;
				padding: 20px 20px 20px 0px;
				width: calc(100% - 97px);
				margin-left: 24px;
				display: flex;
				justify-content: space-between;
				.item-content-text {
					.content-text-purpose {
						font-size: 15px;
					}
					.content-text-ctime {
						font-size: 13px;
						color: #999999;
						padding: 5px 0px 0px 0px;
					}
				}
			}
			.list-item-value{
				.item-value-positive{
					color: #fe7418;
				}
				.item-value-negative{
					color: #424242;
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
