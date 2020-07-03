<template>
	<view class="view-my-integral">
		<view class="view-integral-info">
			<view class="integral-info-item">
				<view class="integral-info-title">总积分</view>
				<view class="integral-info-num">{{ totalIntegral }}</view>
			</view>
			<view class="integral-info-item">
				<view class="integral-info-title">可用积分</view>
				<view class="integral-info-num info-num-useable">{{ surplusIntegral }}</view>
			</view>
			<view class="integral-info-item">
				<view class="integral-info-title">已总积分</view>
				<view class="integral-info-num">{{ totalIntegral - surplusIntegral }}</view>
			</view>
		</view>
		<view class="view-integral-list">
			<view class="integral-list-title">积分明细记录</view>
			<view class="integral-list-head">
				<view class="integral-col-ctime">消费时间</view>
				<view class="integral-col-type">类型</view>
				<view class="integral-col-value">积分</view>
				<view class="integral-col-surplus">积分余额</view>
			</view>
			<view v-for="(integral, integralIndex) in integrals" :key="integralIndex" class="integral-list-item">
				<view class="integral-col-ctime">{{ integral.cTime }}</view>
				<view class="integral-col-type">{{ integral.typeName }}</view>
				<view class="integral-col-value integral-col-num">{{ integral.value }}</view>
				<view class="integral-col-surplus integral-col-num">{{ integral.surplusNum }}</view>
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
					cTime: '2020-01-01 12:34:56',
					value: 100,
					typeName: '积分',
					surplusNum: 100
				},
				{
					cTime: '2020-01-02 12:34:56',
					value: 20,
					typeName: '兑换',
					surplusNum: 80
				},
				{
					cTime: '2020-01-03 12:34:56',
					value: 30,
					typeName: '积分',
					surplusNum: 110
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
	background: #f0f0f0;
	.view-integral-info {
		display: flex;
		justify-content: space-between;
		background: #ffffff;
		padding: 20px 25px 20px 25px;
		.integral-info-item {
			width: 90px;
			font-size: 14px;
			.integral-info-title {
				background: #19a0f0;
				border-radius: 5px 5px 0px 0px;
				color: #ffffff;
				text-align: center;
				width: 100%;
				padding: 6px 0px 1px 0px;
			}
			.integral-info-num {
				color: #fe7418;
				font-size: 18px;
				text-align: center;
				border: 1px solid #afafaf;
				border-radius: 0px 0px 5px 5px;
				padding: 8px 0px 8px 0px;
			}
			.info-num-useable {
				color: #127d11;
			}
		}
	}
}
</style>
