<template>
	<view class="view-regist-member">
		<view class="view-regist-input">
			<custom-field v-for="(param, paramIndex) in params" :key="paramIndex" :param="param" @end="onEndClick(param)">
			</custom-field>
		</view>
		<view class="view-regist-button"><button class="enter-button" @tap="btnBind" :loading="isLoading">立即绑定</button></view>
	</view>
</template>

<script>
import validate from '@/utils/validator.js';
import validRules from '@/utils/validRules.js';
import toastHelper from '@/utils/toastHelper.js';
import memberService from '@/services/memberService.js';
import commonService from '@/services/commonService.js';
import { mobileMixin } from '@/mixins/mobileMixin.js';

export default {
	mixins: [mobileMixin],
	data() {
		return {
			params: [
				{
					label: '手机号码',
					vmodel: '',
					placeholder: '请输入手机号码',
					error: false,
					validTypeId: 3
				},
				{
					label: '验证码',
					vmodel: '',
					placeholder: '请输入验证码',
					error: false,
					validTypeId: 6,
					endTypeId: 4,
					endValue: '验证码',
					isCountdownStart: false,
					second: 60
				}
			],
			timer: -1
		};
	},
	methods: {
		validParams() {
			let errorMsg = '';
			for (let i = 0; i < this.params.length; i++) {
				let param = this.params[i];
				errorMsg += validRules.validParam(param);
			}
			return errorMsg;
		},
		async onEndClick(param) {
			if (param.label == '验证码') {
				if (!this.params[1].isCountdownStart) {
					let errorMsg = validRules.validParam(this.params[0]);

					if (errorMsg) {
						toastHelper.noneToast(errorMsg);
					} else {
						// try {
						// 	this.isCodeLoading = true;
						// 	const sendResult = await memberService.bindSendVerificationCodeAsync(this.params[0].vmodel);
						// 	if (sendResult) {
						// 		toastHelper.noneToast(sendResult);
						// 	} else {
						// 		this.params[1].isCountdownStart = true;
						// 		this.params[1].second--;
						// 		this.timer = setInterval(() => {
						// 			this.params[1].second--;
						// 			if (this.params[1].second <= 0) {
						// 				this.params[1].isCountdownStart = false;
						// 				clearInterval(this.timer);
						// 				this.params[1].second = 60;
						// 			}
						// 		}, 1000);
						// 	}
						// } finally {
						// }
					}
				}
			}
		},
		async btnBind() {
			let errorMsg = this.validParams();
			if (errorMsg) {
				toastHelper.noneToast(errorMsg);
			} else {
				try {
					// uni.showLoading();

					let bindResult = await memberService.bindFromWeChatAsync({ mobile: this.params[0].vmodel, verificationCode: this.params[1].vmodel });
					console.log(bindResult);
					if (!bindResult.error) {
						uni.navigateBack({
							delta: 1
						});
					} else {
						toastHelper.noneToast(bindResult.error);
					}
				} finally {
					// uni.hideLoading();
				}
			}
		}
	}
};
</script>

<style lang="scss">
.view-regist-member {
	.view-regist-input {
		padding: 0px 5px 0px 5px;
		background: #ffffff;
		border-top: 1px solid #efefef;
	}
	.view-regist-button {
		padding: 30px 20px 0px 20px;
	}
}
</style>
