<template>
	<view class="view-regist-member">
		<view class="view-regist-input">
			<custom-field v-for="(param, paramIndex) in params" :key="paramIndex" :param="param" ></custom-field>
			<custom-field v-if="!editFlag" :param="mobile" @end="onEditClick(mobile)"></custom-field>
			<custom-field v-if="editFlag" v-for="(editParam, editParamIndex) in editParams" :key="editParam.label" :param="editParam" @end="onCodeClick(editParam)"></custom-field>
		</view>
		<view v-if="editFlag" class="view-regist-button"><button class="enter-button" @tap="btnSave">保存</button></view>
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
					label: '会员姓名',
					vmodel: '',
					error: false,
					validTypeId: 6,
					disabled: true
				},
				{
					label: '性别',
					vmodel: '',
					validTypeId: 6,
					disabled: true
				},
				{
					label: '出生日期',
					vmodel: '',
					validTypeId: 6,
					disabled: true
				},
				{
					label: '详细地址',
					vmodel: '',
					error: false,
					validTypeId: 6,
					disabled: true
				}
			],
			mobile: {
				label: '手机号码',
				vmodel: '',
				error: false,
				validTypeId: 6,
				endTypeId: 1,
				endValue: '修改'
			},
			editParams: [
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
			],
			editFlag: false
		};
	},
	async onLoad() {
		let memberData = {
			memberName: '陈典',
			sex: '女',
			birthDay: '2020-01-01',
			address: '宝安区新安街道33区瓦窑花园二巷75号',
			mobile: '13203007572'
		};
		this.params[0].vmodel = memberData.memberName;
		this.params[1].vmodel = memberData.sex;
		this.params[2].vmodel = memberData.birthDay;
		this.params[3].vmodel = memberData.address;
		this.editParams[0].vmodel = memberData.mobile;
		this.mobile.vmodel = memberData.mobile;
	},
	methods: {
		validParams() {
			for (let i = 0; i < this.editParams.length; i++) {
				let param = this.editParams[i];
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
		onCodeClick(param) {
			if (param.label == '验证码') {
				toastHelper.noneToast('获取验证码');
			}
		},
		btnSave() {
			console.log(this.editParams);
			let errorMsg = this.validParams();
			if (errorMsg) {
				toastHelper.noneToast(errorMsg);
			} else {
				toastHelper.noneToast('保存成功');
				uni.navigateBack({
					delta: 1
				});
			}
		},
		onBindClick() {
			uni.redirectTo({
				url: '/pages/member/bind-member'
			});
		},
		onEditClick() {
			this.editFlag = true;
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
	.view-regist-explain {
		text-align: right;
		padding: 20px 15px 0px 0px;
		font-size: 14px;
	}
}
</style>
