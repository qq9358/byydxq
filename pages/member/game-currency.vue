<template>
	<view class="view-game-integral">
		<view class="view-integral-info">
			<view class="integral-info-title">游戏币总额：</view>
			<view class="integral-info-num">{{ totalintegral }}</view>
		</view>
		<view class="view-integral-list">
			<view class="integral-list-title">游戏币交易明细</view>
			<view class="integral-list-head">
				<view class="integral-col-ctime">交易时间</view>
				<view class="integral-col-type">类型</view>
				<view class="integral-col-value">金额</view>
				<view class="integral-col-surplus">余额</view>
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
			totalintegral: 1234,
			surplusintegral: 876,
			integrals: [
				{
					cTime: '2020-01-01 12:34:56',
					value: 100,
					typeName: '存入',
					surplusNum: 100
				},
				{
					cTime: '2020-01-02 12:34:56',
					value: 20,
					typeName: '支出',
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
.view-game-integral {
	background: #f0f0f0;
	.view-integral-info {
		display: flex;
		justify-content: center;
		background: #ffffff;
		padding: 25px 35px 15px 25px;

		.integral-info-num {
			color: #127d11;
			font-size: 20px;
			margin-top: -7px;
		}
	}
}
</style>
