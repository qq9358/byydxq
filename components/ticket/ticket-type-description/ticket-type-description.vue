<template>
	<tui-bottom-popup ref="descriptionPopup" type="bottom" @change="popupChange">
		<div class="view-popup description">
			<div class="popup-header">
				<div>购买须知</div>
				<!-- <div class="description-close-btn" @click="onClose"><van-icon name="cuowu" /></div> -->
			</div>
			<div class="popup-body">
				<div class="description-content">
					<div class="description-content-item description-content-title">
						<span>{{ ticketTypeName }}</span>
					</div>
					<div v-if="description.bookDescription" class="description-content-item">
						<h3>预订说明</h3>
						<div class="description-content-item-text" v-html="description.bookDescription"></div>
					</div>
					<div v-if="description.feeDescription" class="description-content-item">
						<h3>费用说明</h3>
						<div class="description-content-item-text" v-html="description.feeDescription"></div>
					</div>
					<div v-if="description.usageDescription" class="description-content-item">
						<h3>使用说明</h3>
						<div class="description-content-item-text" v-html="description.usageDescription"></div>
					</div>
					<div v-if="description.refundDescription" class="description-content-item">
						<h3>退改说明</h3>
						<div class="description-content-item-text" v-html="description.refundDescription"></div>
					</div>
					<div v-if="description.otherDescription" class="description-content-item">
						<h3>其他说明</h3>
						<div class="description-content-item-text" v-html="description.otherDescription"></div>
					</div>
					<div v-if="showBuy" :style="submitStyle">&nbsp;</div>
				</div>
				<view v-if="showBuy" class="body-active">
					<view :class="{ 'view-checkbox': true, 'view-checkbox-disable': second > 0 }">
						<checkbox-group @change="acceptChange">
							<label>
								<checkbox value="accept" :disabled="second > 0" />
								我已认真阅读购买须知并同意
								<text v-if="second > 0">({{ second }})</text>
							</label>
						</checkbox-group>
					</view>
					<view class="view-book">
						<view class="book-price">￥{{ price }}</view>
						<view class="book-button"><button @click="onBuy" :disabled="!accept" class="order-button">立即预订</button></view>
					</view>
				</view>
			</div>
		</div>
	</tui-bottom-popup>
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
				this.$refs.descriptionPopup.close();
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
				this.$refs.descriptionPopup.open();
			}
		}
	},
	methods: {
		onClose() {
			this.show = false;
		},
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
		popupChange(a) {
			if (!a.show) {
				this.show = false;
				this.accept = false;
			}
		},
		acceptChange(a){
			if(a.detail.value.length > 0){
				this.accept = true;
			}else{
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
		background-color: #efefef;
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
		height: 84vh;
		overflow-y: auto;
		box-sizing: border-box;

		&-item {
			margin-left: 15px;
			padding: 15px 15px 15px 0;
			word-wrap: break-word;
			word-break: normal;
			border-bottom: 1px solid #dbdbdb;

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
</style>
