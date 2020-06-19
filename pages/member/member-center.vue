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
			<view class="icon-vertical-center" @click="onMyTicket">
				<view class="title-icon"><view class="iconfont icon-menpiao"></view></view>
				<view class="title-text">我的门票</view>
				<view class="title-arrow"><view class="iconfont icon-arrow"></view></view>
			</view>
			<view class="icon-vertical-center" @click="onMyFace">
				<view class="title-icon"><view class="iconfont icon-face"></view></view>
				<view class="title-text">登记人脸</view>
				<view class="title-arrow"><view class="iconfont icon-arrow"></view></view>
			</view>
			<!-- <view
				v-permission="[permissions.TMSWeChat_CheckTicket]"
				title="门票核销"
				is-link
				icon="yanpiao"
				to="/CheckTicket"
				class="icon-vertical-center"
			  />
			  <view
				v-permission="[permissions.TMSWeChat_QueryTicket]"
				title="门票查询"
				is-link
				icon="search"
				to="/QueryTicket"
			  />
			  <view
				v-permission="[permissions.TMSWeChat_Distribution]"
				title="分销平台"
				is-link
				icon="apps-o"
				to="/Distribution"
			  />
			  <view
				v-permission="[permissions.TMSWeChat_TicketSaleStat]"
				title="售票统计"
				is-link
				icon="tongji"
				to="/TicketSaleStat"
				class="icon-vertical-center"
			  />
			  <view
				v-permission="[permissions.TMSWeChat_TradeStat]"
				title="收入汇总"
				is-link
				icon="tongji"
				to="/TradeStat"
				class="icon-vertical-center"
			  />
			  <view
				v-permission="[permissions.TMSWeChat_TicketCheckStat]"
				title="检票统计"
				is-link
				icon="tongji"
				to="/TicketCheckStat"
				class="icon-vertical-center"
			  /> -->
		</view>
	</div>
</template>

<script>
import defaultHeadImg from '@/static/image/portrait_bg.png';
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
		onMyTicket() {
			uni.navigateTo({
				url: '/pages/member/my-ticket'
			});
		},
		onMyFace() {
			uni.navigateTo({
				url: '/pages/member/enroll-face'
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
