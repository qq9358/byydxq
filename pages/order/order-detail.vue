<template>
	<div class="order-detail-wrapper">
		<view v-model="isLoadingData" @refresh="loadData" class="van-pull-refresh-blue">
			<div v-if="!isLoadingData" class="order-detail">
				<section class="order-detail-status">
					<view>
						<text class="iconfont icon-more-o" />
						<span>{{ orderInfo.orderStatusName }}</span>
					</view>
					<div v-if="statusInfo" class="order-detail-status-info">{{ statusInfo }}</div>
				</section>

				<section v-if="orderInfo.shouldPay" class="order-detail-countdown">
					<div>
						<span class="order-detail-countdown-title">剩余支付时间</span>
						<span>{{ countdownText }}</span>
					</div>
					<button type="price" :square="true" @click="pay">继续支付</button>
				</section>

				<section class="order-detail-action margin-bottom-10">
					<div class="order-detail-action-total">
						<div>
							<label>订单总额</label>
							<span class="order-detail-action-total-price">
								<text>¥</text>
								<span>{{ orderInfo.totalMoney }}</span>
							</span>
						</div>
					</div>
				</section>

				<section v-if="orderInfo.refundStatusName" class="order-detail-refund">
					<div>{{ orderInfo.refundStatusName }}</div>
					<div @click="refundDetail" class="order-detail-refund-action">
						<span>查看详情</span>
						<text class="iconfont icon-arrow" />
					</div>
				</section>

				<section v-if="orderInfo.hasDetail">
					<div v-for="(detail, index) in orderInfo.details" :key="index" class="order-detail-list margin-bottom-10">
						<ul>
							<li>
								<h3 class="order-detail-list-title">{{ detail.ticketTypeName }}</h3>
							</li>
							<li>
								<p>
									<label class="order-detail-list-label">使用日期</label>
									<span class="order-detail-list-text">
										<span>{{ orderInfo.travelDate }}</span>
										<span v-if="detail.eTime && detail.eTime != orderInfo.travelDate">至{{ detail.eTime }}</span>
									</span>
								</p>
								<p>
									<label class="order-detail-list-label">购买份数</label>
									<span class="order-detail-list-text">
										<text>￥</text>
										{{ detail.reaPrice }} X {{ detail.totalNum }}份
									</span>
								</p>
								<p v-if="detail.usableQuantity > 0">
									<label class="order-detail-list-label">可用数量</label>
									<span class="order-detail-list-text">{{ detail.usableQuantity }}</span>
								</p>
							</li>
							<li style="border-bottom:none;">
								<p>
									<label class="order-detail-list-label">使用方法</label>
									<span class="order-detail-list-text">
										<span>凭</span>
										<span v-if="detail.hasTicket">以下</span>
										<span>二维码直接检票入园</span>
									</span>
								</p>
								<div v-if="detail.hasTicket">
									<div
										v-for="(ticket, index) in detail.tickets"
										:key="ticket.ticketCode"
										@click="onBarcodeClick(ticket)"
										class="order-detail-code-item"
										:class="{
											pb16: ticket.isUsable && !isBarcodeCollapse(ticket)
										}"
									>
										<div class="order-detail-code-item-angle">
											<span class="order-detail-code-item-angle-index">{{ index + 1 }}</span>
										</div>
										<div
											class="order-detail-code-item-text"
											:class="{
												'order-detail-code-item-text-disable': !ticket.isUsable
											}"
										>
											<span>入园凭证：</span>
											<span>{{ ticket.ticketCode }}</span>
										</div>
										<div v-if="ticket.isUsable" class="order-detail-code-item-img">
											<div v-if="isBarcodeCollapse(ticket)" class="order-detail-code-item-img-btn">
												<text class="iconfont icon-qr" />
												<span>查看二维码</span>
											</div>
											<img v-if="!isBarcodeCollapse(ticket)" :src="ticket.qrcode" class="order-detail-code-item-img-src" />
										</div>
									</div>
								</div>
							</li>
						</ul>
						<div v-if="false" class="order-detail-textbutton order-detail-rules">
							<span>退改规则</span>
							<text class="iconfont icon-arrow" />
						</div>
						<div v-if="false" class="order-detail-info"><p>该产品工作日支持取消。如需取消，请登录携程账户申请取消。</p></div>
					</div>
				</section>

				<section v-if="changCiOrderDetails.length > 0" class="order-detail-list margin-bottom-10">
					<h3 class="order-detail-list-title-gray">场次信息</h3>
					<ul v-for="(detail, index) in changCiOrderDetails" :key="index" class="order-detail-list-reset">
						<li v-for="(changCi, index) in detail.groundChangCis" :key="index">
							<span class="order-detail-list-text">
								{{ changCi.groundName }}，{{ orderInfo.travelDate }}日{{ changCi.changCiName }}
								<span v-for="(seat, index) in changCi.seats" :key="index">，{{ seat.seatName }}</span>
							</span>
						</li>
					</ul>
				</section>

				<section v-if="orderInfo.tourists && orderInfo.tourists.length > 0" class="order-detail-list margin-bottom-10">
					<h3 class="order-detail-list-title-gray">出行人信息</h3>
					<div class="order-detail-list-tourist-box">
						<div
							v-for="(tourist, index) in orderInfo.tourists"
							:key="index"
							class="order-detail-list-tourist"
							:class="{ 'no-border': index == orderInfo.tourists.length - 1 }"
						>
							<label class="order-detail-list-label">出行人{{ index + 1 }}</label>
							<div style="flex:1;">
								<div v-if="tourist.name" class="order-detail-list-tourist-item">{{ tourist.name }}</div>
								<div v-if="tourist.mobile" class="order-detail-list-tourist-item">手机号码 {{ tourist.mobile }}</div>
								<div v-if="tourist.certNo" class="order-detail-list-tourist-item">身份证 {{ tourist.certNo }}</div>
							</div>
						</div>
					</div>
				</section>

				<section v-if="orderInfo.hasContact" class="order-detail-list margin-bottom-10">
					<h3 class="order-detail-list-title-gray">联系信息</h3>
					<ul class="order-detail-list-reset">
						<li v-if="orderInfo.contact.contactName">
							<label class="order-detail-list-label">姓名</label>
							<span class="order-detail-list-text">{{ orderInfo.contact.contactName }}</span>
						</li>
						<li v-if="orderInfo.contact.contactMobile">
							<label class="order-detail-list-label">联系手机</label>
							<span class="order-detail-list-text">{{ orderInfo.contact.contactMobile }}</span>
						</li>
						<li v-if="orderInfo.contact.contactCertNo">
							<label class="order-detail-list-label">身份证</label>
							<span class="order-detail-list-text">{{ orderInfo.contact.contactCertNo }}</span>
						</li>
					</ul>
				</section>

				<section class="order-detail-list">
					<h3 class="order-detail-list-title-gray">订单信息</h3>
					<ul class="order-detail-list-reset">
						<li>
							<label class="order-detail-list-label">订单编号</label>
							<span class="order-detail-list-text">{{ orderInfo.listNo }}</span>
						</li>
						<li>
							<label class="order-detail-list-label">下单时间</label>
							<span class="order-detail-list-text">{{ orderInfo.cTime }}</span>
						</li>
					</ul>
				</section>

				<section class="action-button-box">
					<button v-if="orderInfo.allowCancel" type="primary" plain :loading="saving" @click="refund" class="plain-button">{{ refundText }}</button>
					<button v-if="!orderInfo.allowCancel" type="primary" plain @click="buyAgain" class="plain-button">再次预订</button>
					<button v-if="orderInfo.showFace" type="primary" plain @click="enrollFace" class="plain-button">登记人脸</button>
				</section>
			</div>
		</view>
	</div>
</template>

<script>
import dayjs from 'dayjs';
import qrcodeHelper from './../../utils/qrcodeHelper.js';
import orderService from '@/services/orderService.js';
import toastHelper from "@/utils/toastHelper.js";

export default {
	data() {
		return {
			orderInfo: { details: [] },
			currentBarcode: '',
			countdownText: '',
			timer: -1,
			saving: false,
			isLoadingData: false,
			allowLeave: false
		};
	},
	computed: {
		statusInfo() {
			switch (this.orderInfo.orderStatusName) {
				case '待付款': {
					return '库存有限，请尽快完成付款';
				}
				case '退款中': {
					return '退款申请已提交，我们将尽快为您处理';
				}
				case '已取消': {
					return '您的订单已取消，欢迎重新预订';
				}
				case '已审核': {
					return '预订已成功，祝您出游愉快';
				}
			}
			return '';
		},
		allowCancel() {
			return this.orderInfo.shouldPay || this.orderInfo.totalMoney == 0;
		},
		refundText() {
			return this.allowCancel ? '申请取消' : '申请退款';
		},
		changCiOrderDetails() {
			return this.orderInfo.details.filter(detail => detail.groundChangCis && detail.groundChangCis.length > 0);
		}
	},
	async onLoad(event) {
		this.listNo = event.listNo;
		await this.loadData();
	},
	async onPullDownRefresh() {
		await this.loadData();
	},
	async beforeRouteLeave(to, from, next) {
		if (this.allowLeave) {
			next();
			return;
		}

		clearInterval(this.timer);

		next();
	},
	methods: {
		async loadData() {
			await this.getOrderInfo();
			this.startCountdown();
		},
		async getOrderInfo() {
			try {
				this.isLoadingData = true;
				this.currentBarcode = '';

				uni.showLoading({
					duration: 0,
					title: '加载中...'
				});

				let order = await orderService.getOrderInfoForMobileAsync(this.listNo);
				order.hasContact = order.contact.contactName || order.contact.contactCertNo || order.contact.contactMobile;
				await this.generateQRCodeAsync(order);

				this.orderInfo = order;
			} catch (err) {
				return;
			} finally {
				uni.hideLoading();
				this.isLoadingData = false;
			}
		},
		async generateQRCodeAsync(order) {
			order.hasDetail = order.details && order.details.length > 0;
			if (!order.hasDetail) return;

			for (let detail of order.details) {
				detail.hasTicket = detail.tickets && detail.tickets.length > 0;
				if (!detail.hasTicket) continue;

				for (let ticket of detail.tickets) {
					if (!ticket.isUsable) continue;

					ticket.qrcode = await qrcodeHelper.createQRCodeAsync(ticket.ticketCode);
					if (!this.currentBarcode) {
						this.currentBarcode = ticket.ticketCode;
					}
				}
			}
		},
		startCountdown() {
			clearInterval(this.timer);

			if (!this.orderInfo.shouldPay) {
				return;
			}

			const endTime = dayjs('2018-01-01 00:00:00');
			let countdown = endTime.clone().addSeconds(this.orderInfo.expireSeconds);

			const formatStr = this.orderInfo.expireSeconds > 3600 ? 'HH:mm:ss' : 'mm:ss';
			this.countdownText = countdown.format(formatStr);

			this.timer = setInterval(() => {
				countdown = countdown.subtract(1, 'seconds');
				this.countdownText = countdown.format(formatStr);
				if (countdown.isSame(endTime)) {
					clearInterval(this.timer);
					this.getOrderInfo();
				}
			}, 1000);
		},
		onBarcodeClick(ticket) {
			this.currentBarcode = ticket.ticketCode;
		},
		isBarcodeCollapse(ticket) {
			return this.currentBarcode !== ticket.ticketCode;
		},
		pay() {
			uni.navigateTo({
				url: '/pages/payment/wx-js-pay?listNo=' + this.listNo
			});
		},
		async refund() {
			if (this.allowCancel) {
				await this.cancelOrder();
			} else {
				uni.navigateTo({
					url: '/pages/order/refund-ticket?listNo=' + this.listNo
				});
			}
		},
		async cancelOrder() {
			try {
				this.saving = true;
				let cancelResult = await uni.showModal({
					content: '确定取消订单？'
				});
				if (cancelResult[1].confirm) {
					let response = await orderService.cancelOrderAsync(this.listNo);
					if (response.success) {
						toastHelper.noneToast('取消成功');
						await this.getOrderInfo();
					}
				}
			} catch (err) {
				return;
			} finally {
				this.saving = false;
			}
		},
		buyAgain() {
			uni.switchTab({
				url: '/pages/index/index'
			});
		},
		refundDetail() {
			uni.navigateTo({
				url: '/pages/order/refnd-detail?listNo=' + this.listNo
			});
		},
		enrollFace() {
			uni.navigateTo({
				url: '/pages/member/enroll-face?listNo=' + this.listNo
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.pb16 {
	padding-bottom: 16px;
}

.order-detail-wrapper {
	background-color: #19a0f0;
}

.order-detail {
	background-color: #c0c7cf;
	padding-bottom: 10px;
	min-height: calc(100vh - 106px);
	margin-bottom: 50px;

	&-status {
		background-color: #19a0f0;
		padding: 0 15px 12px;
		color: #fff;
		word-break: break-all;

		i {
			margin-right: 10px;
			font-size: 16px;
		}

		h1 {
			font-size: 23px;
			font-weight: 400;
		}

		&-info {
			padding-left: 22px;
			font-size: 12px;
		}
	}

	&-countdown {
		display: flex;
		padding-left: 15px;
		height: 45px;
		line-height: 45px;
		background-color: #fefcf3;
		font-size: 16px;
		color: #481a03;
		justify-content: space-between;

		&-title {
			margin-left: 0;
			margin-right: 6px;
			font-weight: 400;
		}

		span {
			font-size: 18px;
		}

		button {
			height: 45px;
			width: 30%;
			font-size: 18px;
			padding: 0;
		}
	}

	&-action {
		background: #fff;
		overflow: hidden;

		&-total {
			display: flex;
			justify-content: space-between;
			align-items: center;
			line-height: 54px;
			padding-left: 15px;
			padding-right: 15px;

			label {
				margin-right: 15px;
			}

			&-price {
				color: #f40;
				span {
					font-size: 21px;
				}
			}
		}

		&-button {
			padding-bottom: 15px;
			padding-left: 10px;
			padding-right: 10px;

			button {
				border: #099fde solid 1px;
				border-radius: 5px;
				font-size: 16px;
				width: 100%;
				color: #099fde;
			}
		}
	}

	&-textbutton {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 13px;
		line-height: 0.0028px;
		color: #099fde;
		text-decoration: none;

		i {
			font-size: 10px;
		}
	}

	&-buy {
		height: 40px;
		background-color: #fff;
		border-top: 1px solid #ececec;

		i {
			margin-right: 2px;
		}
	}

	&-info {
		padding: 11px 14px 9px 15px;
		background: #fffdf2;

		p {
			line-height: 18px;
			color: #481a03;
			font-size: 13px;
		}
	}

	&-refund {
		border-radius: 5px;
		padding: 10px 15px;
		display: flex;
		justify-content: space-between;
		align-content: center;
		background-color: #fff;
		font-size: 13px;
		margin: 0 6px 10px;

		&-action {
			span {
				display: inline-block;
				vertical-align: middle;
			}

			i {
				vertical-align: middle;
				margin-top: -2px;
			}
		}
	}

	&-list {
		border-radius: 5px;
		margin-right: 6px;
		margin-left: 6px;
		background-color: #fff;
		box-shadow: 0 1px 0 0 #a3aab2;
		overflow: hidden;

		ul {
			border-bottom: 1px solid #ececec;
			padding-bottom: 10px;
		}

		li {
			margin-left: 15px;
			padding: 6px 15px 5px 0;
			line-height: 29px;
			position: relative;
			border-bottom: 1px solid #ececec;
			list-style: none;
		}

		&-title {
			line-height: 18px;
			padding: 8px 0 4px;
			font-size: 16px;
			color: #000;
			font-weight: 400;
		}

		&-title-gray {
			position: relative;
			padding: 10px 38px 8px 15px;
			font-size: 14px;
			line-height: 1.3;
			color: #808080;
			background: #eff0f2;
		}

		&-label {
			color: #666;
			display: table-cell;
			width: 85px;
			font-size: 14px;
			vertical-align: top;
			line-height: 22px;
			padding: 4px 0;
		}

		&-text {
			display: table-cell;
			word-break: break-all;
			padding-top: 5px;
			line-height: 21px;
		}

		&-reset {
			padding-bottom: 0 !important;

			li {
				padding-top: 10px;
				padding-bottom: 10px;
			}
		}

		&-tourist {
			&-box {
				padding: 5px 0;
			}

			padding: 5px 15px 5px 0;
			margin-left: 15px;
			line-height: 16px;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #ececec;

			&-item {
				display: inline-block;
				vertical-align: middle;
				width: 100%;
				font-size: 12px;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}
		}
	}

	&-rules {
		height: 37px;

		i {
			margin-left: 2px;
		}

		i::before {
			transition: 0.3s;
			transform: rotate(90deg);
		}
	}

	&-code-item {
		background-color: #f7f9fa;
		margin-bottom: 10px;
		border-radius: 6px;
		position: relative;
		overflow: hidden;

		&-angle {
			width: 0;
			height: 0;
			border-top: 30px solid #e9edf0;
			border-left: 30px solid transparent;
			position: absolute;
			right: 0;
			top: 0;
			color: #6d6e6f;
			text-align: center;
			line-height: 30px;
			font-size: 10px;

			&-index {
				position: absolute;
				left: -24px;
				top: -35px;
				width: 30px;
				height: 30px;
			}
		}

		&-text {
			padding: 16px;
			font-size: 14px;
			line-height: 14px;

			&-disable {
				color: #dededf;
				text-decoration: line-through;
				font-size: 16px;
			}
		}

		&-img {
			&-btn {
				color: #099fde;
				font-size: 14px;
				line-height: 0.0028px;
				padding: 0 16px 16px;
				display: flex;
				align-items: center;

				i {
					margin-right: 5px;
				}
			}

			&-border {
				margin: 0 16px;
			}

			&-src {
				display: block;
				margin: auto;
				background-color: #fff;
				border-radius: 4px;
				width: 200px;
			}
		}
	}
}

.action-button-box {
	position: fixed;
	bottom: 0;
	left: 0;
	height: 50px;
	width: 100%;
	padding: 0 10px;
	background-color: #fff;
	display: flex;
	align-items: center;

	.button {
		margin-left: 10px;
	}
}

.no-border {
	border: none;
}

.plain-button {
	margin-left: 10px;
}
</style>
