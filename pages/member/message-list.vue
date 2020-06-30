<template>
	<view class="view-message-list">
		<view v-for="(message, messageIndex) in messages" :key="messageIndex" class="message-list-view">
			<view class="view-message-img">
				<img class="message-img" :src="message.imgUrl" />
			</view>
			<view class="view-message-text">
				<view class="message-text-title">{{message.title}}</view>
				<view class="message-text-content">{{message.content}}</view>
				<view class="message-text-ctime">{{message.cTime}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import iMessageImg from "@/static/images/pages/message-list/message_item_img.jpg";
	export default{
		data(){
			return {
				messages: [
					{
						imgUrl: iMessageImg,
						title: "开业6周年优惠活动通知",
						content: "毛泽东 《矛盾论》“例如，数学中的正数和负数，机械学中的作用和反作用…",
						cTime: "2020-07-02"
					},
					{
						imgUrl: iMessageImg,
						title: "开业6周年优惠活动通知",
						content: "毛泽东 《矛盾论》“例如，数学中的正数和负数，机械学中的作用和反作用…",
						cTime: "2020-07-02"
					},
					{
						imgUrl: iMessageImg,
						title: "开业6周年优惠活动通知",
						content: "毛泽东 《矛盾论》“例如，数学中的正数和负数，机械学中的作用和反作用…",
						cTime: "2020-07-02"
					},
					{
						imgUrl: iMessageImg,
						title: "开业6周年优惠活动通知",
						content: "毛泽东 《矛盾论》“例如，数学中的正数和负数，机械学中的作用和反作用…",
						cTime: "2020-07-02"
					},
					{
						imgUrl: iMessageImg,
						title: "开业6周年优惠活动通知",
						content: "毛泽东 《矛盾论》“例如，数学中的正数和负数，机械学中的作用和反作用…",
						cTime: "2020-07-02"
					},
				]
			}
		}
	}
</script>

<style lang="scss">
	.view-message-list{
		.message-list-view{
			display: flex;
			justify-content: space-between;
			padding: 30px 15px 20px 15px;
			background: #ffffff;
			border-bottom: 1px solid #efefef;
			.view-message-img{
				flex: 0.25;
				border-radius: 6px;
				overflow: hidden;
				width: 80px;
				.message-img{
					width: 100%;
					height: 100%;
				}
			}
			.view-message-text{
				flex: 0.75;
				padding: 0px 0px 0px 15px;
				.message-text-title{
					font-size: 15px;
					color: #4c4c4c;
					// font-weight: bold;
				}
				.message-text-content{
					padding: 5px 0px 2px 0px;
					font-size: 13px;
					color: #808080;
				}
				.message-text-ctime{
					font-size: 12px;
					tramsform: scale(0.9);
					margin-left: -1px;
					color: #808080;
				}
			}
		}
	}
</style>
