<template>
	<view class="view-regist-member">
		<view class="view-regist-input"><custom-field v-for="(param, paramIndex) in params" :key="paramIndex" :param="param" v-model="param.vmodel" @end="onEndClick(param)"></custom-field></view>
		<view class="view-regist-button"><button class="enter-button" @tap="btnBind">立即绑定</button></view>
	</view>
</template>

<script>
import validate from '@/utils/validator.js';
import validRules from '@/utils/validRules.js';
import toastHelper from '@/utils/toastHelper.js';

export default {
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
					endTypeId: 1,
					endValue: '验证码'
				}
			]
		};
	},
	methods: {
		validParams() {
			for (let i = 0; i < this.params.length; i++) {
				let param = this.params[i];
				const rules = validRules.getValidRules(param);
				let result = validate([
					{
						value: param.vmodel,
						name: param.label,
						rules: rules
					}
				]);
				param.error = !result.success;
				if (!result.success) {
					return result.message;
				}
			}
			return null;
		},
		onEndClick(param) {
			if (param.label == '验证码') {
				toastHelper.noneToast('获取验证码');
			}
		},
		btnBind(){
			let errorMsg = this.validParams();
			if(errorMsg){
				toastHelper.noneToast(errorMsg);
			} else {
				toastHelper.noneToast('绑定成功');
				uni.navigateBack({
					delta: 1
				});
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
