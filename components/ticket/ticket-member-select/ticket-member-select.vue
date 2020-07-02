<template>
	<view class="view-member-select">
		<uni-popup ref="popup" type="center" @change="onPopupChange">
			<view class="view-select-popup">
				<view class="view-select-button"><button class="select-button select-bind-button" @tap="btnBindMember">线下已有会员，绑定会员</button></view>
				<view class="view-select-button"><button class="select-button" @tap="btnRegistMember">注册会员</button></view>
				<view class="view-select-button"><button class="select-button" @tap="onClose">不注册会员</button></view>
				<view class="view-select-explain">说明：注册会员可以在微信公众号上查看电子票、游戏币、积分情况</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
export default {
	name: 'notice',
	props: {
		value: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			showPopup: false
		};
	},
	watch: {
		value(val) {
			if (val) {
				this.$refs.popup.open();
			} else {
				this.$refs.popup.close();
			}
		}
	},
	methods: {
		onPopupChange(res) {
			if (!res.show) {
				this.$emit('input', false);
			}
		},
		btnBindMember(){
			this.onClose();
			uni.navigateTo({
				url: '/pages/member/bind-member'
			});
		},
		btnRegistMember(){
			this.onClose();
			uni.navigateTo({
				url: '/pages/member/regist-member'
			});
		},
		onClose(){
			this.$emit('close', {});
		}
	}
};
</script>

<style lang="scss">
.view-member-select {
	.view-select-popup {
		background-color: #dedede;
		transition: all 0.3s ease;
		transform: translateY(0);
		height: 200px;
		width: 225px;
		padding: 5px 20px 22px 20px;
		border-radius: 10px;
		.view-select-button {
			padding: 17px 0px 0px 0px;
			.select-button {
				border-radius: 5px;
				padding: 8px 15px 8px 15px;
				box-shadow: 6px 6px 5px #aba9a9;
				background: rgba(208, 225, 125, 1);
				color: #333;
			}
			.select-bind-button {
				background: rgba(255, 223, 37, 1);
			}
		}
		.view-select-explain {
			padding: 10px 8px 0px 8px;
			font-size: 12px;
		}
	}
}
</style>
