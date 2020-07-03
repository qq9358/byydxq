<template>
	<uni-popup ref="popup" type="bottom" @change="onPopupChange">
		<view class="view-popup description">
			<view class="description-title">
				<view class="title-icon"><text class="iconfont icon-menpiao"></text></view>
				<view class="title-text">{{ ticketTypeName }}</view>
				<view class="description-close-btn" @click="onPopupChange(false)"><text class="iconfont icon-cuowu"></text></view>
			</view>
			<view class="popup-body">
				<view class="view-description-content">
					<view class="description-content">
						<view v-if="description.bookDescription" class="description-content-item">
							<view class="content-item-title">
								<view class="item-title-line"></view>
								<h3>预订说明</h3>
							</view>
							<view class="description-content-item-text" v-html="description.bookDescription"></view>
						</view>
						<view v-if="description.feeDescription" class="description-content-item">
							<h3>费用说明</h3>
							<view class="description-content-item-text" v-html="description.feeDescription"></view>
						</view>
						<view v-if="description.usageDescription" class="description-content-item">
							<h3>使用说明</h3>
							<view class="description-content-item-text" v-html="description.usageDescription"></view>
						</view>
						<view v-if="description.refundDescription" class="description-content-item">
							<h3>退改说明</h3>
							<view class="description-content-item-text" v-html="description.refundDescription"></view>
						</view>
						<view v-if="description.otherDescription" class="description-content-item">
							<h3>其他说明</h3>
							<view class="description-content-item-text" v-html="description.otherDescription"></view>
						</view>
						<view v-if="showBuy" :style="submitStyle">&nbsp;</view>
					</view>
					<view v-if="showBuy" class="body-active">
						<view v-if="shouldRead" :class="{ 'view-checkbox': true, 'view-checkbox-disable': second > 0 }">
							<checkbox-group @change="acceptChange">
								<label>
									<checkbox value="accept" :disabled="second > 0" />
									我已认真阅读购买须知并同意
									<text v-if="second > 0">({{ second }})</text>
								</label>
							</checkbox-group>
						</view>
						<view class="view-book">
							<view class="book-price">
								￥{{ price }}
								<text class="price-text">起</text>
							</view>
							<view class="book-button"><button @click="onBuy" :disabled="!accept" class="order-button">立即预订</button></view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
import ticketTypeService from '@/services/ticketTypeService.js';
import { mobileMixin } from '@/mixins/mobileMixin.js';

export default {
	name: 'ticket-type-description',
	mixins: [mobileMixin],
	props: {
		ticketTypeId: {
			type: Number,
			default: 0
		},
		ticketTypeName: {
			type: String
		},
		price: {
			type: Number,
			default: 0
		},
		showBuy: {
			type: Boolean,
			default: false
		},
		value: {
			type: Boolean,
			default: false
		},
		shouldRead: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			description: {
				bookDescription: '',
				feeDescription: '',
				usageDescription: '',
				refundDescription: '',
				otherDescription: ''
			},
			show: this.value,
			second: 0,
			hasRead: false,
			hasLoaded: false,
			timer: -1,
			accept: false
		};
	},
	computed: {
		ticketTypePrice() {
			return this.price * 100;
		},
		allowSubmit() {
			return !this.shouldRead || this.hasRead;
		},
		submitStyle() {
			return { height: (this.shouldRead ? 90 : 50) + 'px' };
		}
	},
	watch: {
		ticketTypeId() {
			this.hasLoaded = false;
		},
		async value(val) {
			this.show = val;
			if (val) {
				if (this.showBuy && this.shouldRead) {
					this.countdown();
				}
				if (!this.hasLoaded) {
					await this.loadDescription();
				}
			} else {
				this.$refs.popup.close();
			}
		},
		show(val) {
			if (!val) {
				if (this.showBuy) {
					this.hasRead = false;
					if (this.second > 0) {
						clearInterval(this.timer);
					}
				}
				this.$emit('input', val);
			} else {
				this.$refs.popup.open();
			}
		}
	},
	methods: {
		onBuy() {
			uni.navigateTo({
				url: '/pages/ticket/buy-ticket?ticketTypeId=' + this.ticketTypeId
			});
		},
		async loadDescription() {
			const description = await ticketTypeService.getTicketTypeDescriptionAsync(this.ticketTypeId);
			this.description = description;
			this.hasLoaded = true;

			this.$nextTick(() => {
				this.normalizeImage('.description-content-item');
			});
		},
		countdown() {
			this.second = 5;
			this.timer = setInterval(() => {
				if (this.second > 0) {
					this.second--;
				} else {
					clearInterval(this.timer);
				}
			}, 1000);
		},
		onPopupChange(res) {
			if (!res.show) {
				this.show = false;
			}
		},
		acceptChange(a) {
			if (a.detail.value.length > 0) {
				this.accept = true;
			} else {
				this.accept = false;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.description {
	background-color: #fff;
	transition: all 0.3s ease;
	transform: translateY(0);

	&-title {
		left: 0;
		top: 0;
		width: 100%;
		z-index: 100;
		position: fixed;
		height: 40px;
		line-height: 40px;
		font-size: 18px;
		text-align: center;
		// background-color: #efefef;
		display: flex;
		.title-icon {
			padding: 6px 12px 0px 15px;
			.iconfont {
				color: #ff7d13;
				font-size: 27px;
			}
		}
	}

	&-close-btn {
		right: 0;
		top: 0;
		position: absolute;
		color: #999;
		width: 40px;
		height: 40px;
	}

	&-content {
		position: relative;
		font-size: 15px;
		overflow-y: auto;
		box-sizing: border-box;
		padding: 20px 0px 0px 0px;

		&-item {
			// margin: 0px 15px 0px 15px;
			// padding: 15px 15px 15px 0;
			word-wrap: break-word;
			word-break: normal;

			h3 {
				color: #333;
				font-size: 100%;
				font-weight: 700;
				padding-bottom: 5px;
			}

			&-text {
				margin-left: 15px;
			}

			/deep/ img {
				max-width: 100% !important;
			}
		}

		&-title {
			margin-left: 0;
			padding-left: 15px;
			color: #000;
			font-weight: 700;
			border-bottom: 1px solid #dbdbdb;
		}
	}

	&-read {
		justify-content: center;
		padding: 10px 0;
	}
}

.price-text {
	font-size: 14px;
	color: #444444;
	padding: 0px 0px 0px 3px;
}

.view-description-content {
	
	    padding: 55px 0px 0px 0px;
		.description-content{
			    margin: 0px 15px 0px 15px;
			    border: 1px solid #efefef;
		}
	.content-item-title {
		display: flex;
		.item-title-line {
			width: 0px;
			height: 20px;
			margin: -1px 8px 0px 3px;
			border: 1.5px solid #5296de;
		}
	}
}
</style>
