import ajax from "@/utils/ajax.js";
import tokenService from "@/services/tokenService.js";

export default {
	async loginFromWeChatAsync(input) {
		const response = await ajax.post("/member/LoginFromWeChatAsync", input);
		this.setMember(response);
	},
	async loginFromMiniAsync(userInfo) {
		let self = this;
		await uni.login({
			async success(res) {
				if (res.code) {
					// 封装的缓存方法
					if (userInfo) {
						let params = {
							code: res.code,
							userInfo: userInfo
						}
						const response = await ajax.post('/member/LoginFromWechatMiniProgramAsync', params)
							.then((res) => {

								self.setMember(res);
							});
					} else {
						await uni.getUserInfo({
							async success(rest) {
								let params = {
									code: res.code,
									userInfo: rest.userInfo
								}
								const response = await ajax.post('/member/LoginFromWechatMiniProgramAsync', params)
									.then((res) => {

										self.setMember(res);
									});
							}
						})
					}
				} else {
					console.log('登录失败！' + res.errMsg)
				}
			}
		})
	},
	async bindStaffAsync(input) {
		const response = await ajax.post("/member/BindStaffAsync", input);
		this.setMember(response);
	},
	async registMemberCardAsync(input) {
		return await ajax.post("/member/RegistMemberCardAsync", input);
	},
	async getElectronicMemberCardAsync() {
		let response = await ajax.get("/member/GetElectronicMemberCardAsync");
		return response.result;
	},
	async renewMemberCardAsync(id) {
		return await ajax.post("/member/RenewMemberCardAsync", {
			id: id
		});
	},
	async validRepeatMobileAsync(mobile) {
		const response = await ajax.post(`/member/ValidRepeatMobileAsync?mobile=${mobile}`);
		return response.result;
	},
	async bindFromWeChatAsync(input) {
		let response = await ajax.post('/member/BindFromWeChatAsync', input);
		if (!response.result.error) {
			this.setMember(response);
		}
		return response.result;
	},
	async registFromWeChatAsync(input) {
		let response = await ajax.post('/member/RegistFromWeChatAsync', input);
		if (!response.result.error) {
			this.setMember(response);
		}
		return response.result;
	},
	async bindSendVerificationCodeAsync(mobile) {
		const response = await ajax.post(`/member/BindSendVerificationCodeAsync?mobile=${mobile}`);
		return response.result;
	},
	async registSendVerificationCodeAsync(mobile) {
		const response = await ajax.post(`/member/RegistSendVerificationCodeAsync?mobile=${mobile}`);
		return response.result;
	},
	setMember(response) {
		let member = response.result.member;
		member.permissions = response.result.permissions;
		uni.setStorageSync("member", JSON.stringify(member));

		tokenService.setToken(response.result.token);
	},
	getMember() {
		const member = uni.getStorageSync("member");
		if (member) {
			return JSON.parse(member);
		}
		return null;
	}
};
