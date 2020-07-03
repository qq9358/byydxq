<template>
	<div>
		<view type="flex" align="center" class="poster margin-bottom-10">
			<view span="8" class="poster-headimg"><image :src="member.headImgUrl" class="head-image" /></view>
			<view span="16">
				<div class="poster-name margin-bottom-10">{{ member.name }}</div>
				<div class="poster-name" v-if="member.customerName">{{ member.customerName }}</div>
			</view>
		</view>

		<view class="view-cell">
			<view class="icon-vertical-center" @click="onMyCard">
				<view class="title-icon"><view class="iconfont icon-huiyuanka"></view></view>
				<view class="title-text">我的会员卡</view>
				<view class="title-arrow"><view class="iconfont icon-arrow"></view></view>
			</view>
			<view class="icon-vertical-center" @click="onMyIntegral">
				<view class="title-icon"><view class="iconfont icon-jifen"></view></view>
				<view class="title-text">我的积分</view>
				<view class="title-arrow"><view class="iconfont icon-arrow"></view></view>
			</view>
			<view class="icon-vertical-center" @click="onMyGameCurrency">
				<view class="title-icon"><view class="iconfont icon-currency"></view></view>
				<view class="title-text">我的游戏币</view>
				<view class="title-arrow"><view class="iconfont icon-arrow"></view></view>
			</view>
			<view class="icon-vertical-center" @click="onEditData">
				<view class="title-icon"><view class="iconfont icon-edit"></view></view>
				<view class="title-text">修改资料</view>
				<view class="title-arrow"><view class="iconfont icon-arrow"></view></view>
			</view>
		</view>
	</div>
</template>

<script>
import memberService from '@/services/memberService.js';

export default {
	data() {
		return {};
	},
	computed: {
		headImgUrl() {
			return this.member.headImgUrl || defaultHeadImg;
		},
		member() {
			return memberService.getMember();
		}
	},
	methods: {
		onMyCard() {
			uni.navigateTo({
				url: '/pages/member/my-card'
			});
		},
		onMyIntegral() {
			uni.navigateTo({
				url: '/pages/member/my-integral'
			});
		},
		onMyGameCurrency(){
			uni.navigateTo({
				url: '/pages/member/game-currency'
			});
		},
		onEditData(){
			uni.navigateTo({
				url: '/pages/member/edit-data'
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.poster {
	height: 100px;
	color: white;
	background-color: #19a0f0;
	display: flex;
	align-items: center;

	&-headimg {
		height: 60px;
		width: 60px;
		border-radius: 50%;
		overflow: hidden;
		margin-left: 15px;
	}

	&-name {
		font-weight: bold;
		margin-left: 15px;
	}

	.head-image {
		width: 100%;
		height: 100%;
	}
}
.view-cell {
	background-color: #ffffff;
	.icon-vertical-center {
		/deep/ .view__left-icon {
			margin-top: -2px;
		}
		display: flex;
		align-items: center;
		padding: 10px 16px 10px 0px;
		margin-left: 16px;
		border-bottom: 1px solid #efefef;
		.title-icon {
		}
		.title-text {
			width: calc(100vw - 60px);
			padding: 0px 5px 0px 5px;
		}
		.title-arrow {
		}
	}
}
</style>
