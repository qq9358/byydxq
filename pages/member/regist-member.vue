<template>
	<view class="view-regist-member">
		<view class="view-regist-input"><custom-field v-for="(param, paramIndex) in params" :key="paramIndex" :param="param" @end="onEndClick(param)"></custom-field></view>
		<view class="view-regist-button"><button class="enter-button" @tap="btnRegist">注册</button></view>
		<view class="view-regist-explain" @click="onBindClick">已有会员<text class="link-text">点击</text>绑定</view>
		<tui-modal :show="showModal" @click="modalClick" @cancel="modalClick" :title="'温馨提示'" content="会员注册成功！" :button="modalButton"></tui-modal>
	</view>
</template>

<script>
import validate from '@/utils/validator.js';
import validRules from '@/utils/validRules.js';
import toastHelper from '@/utils/toastHelper.js';
import { mobileMixin } from "@/mixins/mobileMixin.js";
import memberService from "@/services/memberService.js";

export default {
	mixins: [mobileMixin],
	data() {
		return {
			params: [
				{
					label: '会员姓名',
					vmodel: '',
					placeholder: '请输入姓名',
					error: false,
					validTypeId: 6,
					disabled: true
				},
				{
					label: '性别',
					vmodel: '',
					paramSelectDtos: [
						{
							displayText: '男',
							value: '1'
						},{
							displayText: '女',
							value: '2'
						}
					],
					validTypeId: 2,
					disabled: true
				},
				{
					label: '出生日期',
					vmodel: '',
					paramSelectDtos: [
						{
							displayText: '男',
							value: '1'
						},{
							displayText: '女',
							value: '2'
						}
					],
					placeholder: '请选择出生日期',
					validTypeId: 8,
					disabled: true
				},
				{
					label: '详细地址',
					vmodel: '',
					placeholder: '请输入详细地址',
					error: false,
					validTypeId: 6,
					disabled: true
				},
				{
					label: '手机号码',
					vmodel: '',
					placeholder: '请输入手机号码',
					error: false,
					validTypeId: 3,
					disabled: true
				},
				{
					label: '验证码',
					vmodel: '',
					placeholder: '请输入验证码',
					error: false,
					validTypeId: 6,
					endTypeId: 1,
					endValue: '验证码',
					disabled: true
				}
			],
			showModal: false,
			modalButton: [
				{
					text: '确定',
					type: 'red'
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
		btnRegist(){
			// let errorMsg = this.validParams();
			let errorMsg = "";
			if(errorMsg){
				toastHelper.noneToast(errorMsg);
			} else {
				this.showModal = true;
			}
		},
		onBindClick(){
			uni.redirectTo({
				url: '/pages/member/bind-member'
			});
		},
		modalClick(){
			this.showModal = false;
			uni.navigateBack({
				delta: 1
			});
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
	.view-regist-explain{
		text-align: right;
		padding: 20px 15px 0px 0px;
		font-size: 14px;
	}
}
</style>
