<template>
	<view v-if="pageLoaded" ref="grbody" class="booking">
		<view class="booking-mod">
			<view class="booking-mod-hd"><text class="booking-mod-hd-title">使用日期</text></view>
			<view class="booking-mod-bd"><date-selector v-model="input.travelDate" :dates="ticketType.dailyPrices"></date-selector></view>
		</view>

		<view class="booking-mod">
			<view class="booking-mod-around">
				<view class="booking-multi-item">
					<view class="booking-multi-item-auto">
						<h3>{{ ticketType.name }}</h3>
						<ul class="booking-mod-around-label clearfix">
							<view :class="refundClass">
								<text :class="'iconfont icon-' + refundIcon" />
								<text>{{ refundText }}</text>
							</view>
							<view class="info right">
								<text class="iconfont icon-passed" />
								<text>入园保障</text>
							</view>
						</ul>
						<p @click="showDescription = true" class="booking-mod-around-resinfo">购买须知></p>
						<p v-if="ticketType.minBuyNum > 1" class="booking-mod-around-limited">至少需购买{{ ticketType.minBuyNum }}份</p>
					</view>
					<view>
						<view class="booking-mod-around-price">
							<span>¥</span>
							{{ price }}
						</view>
						<view class="booking-mod-around-num"><uni-number-box v-model="quantity" :min="minBuyNum" :max="maxBuyNum" integer @change="onQuantityChange" /></view>
					</view>
				</view>
				<p v-if="false" class="booking-mod-around-tips">景区统一限购，同一手机号1天内在所有网络平台最多只能预订5份。如您需要重复购买，请使用其他手机号购买。</p>
			</view>
		</view>

		<view v-if="ticketType.groundChangCis.length > 0" class="booking-mod">
			<view class="booking-mod-hd"><text class="booking-mod-hd-title">场次信息</text></view>
			<view class="booking-mod-bd">
				<view>
					<picker-field
						v-for="groundChangCi in ticketType.groundChangCis"
						:key="groundChangCi.groundId"
						:columns="groundChangCi.changCis"
						:label="groundChangCi.groundName"
						v-model="groundChangCi.changCiId"
						placeholder="请选择场次"
						class="changCi"
					/>
				</view>
			</view>
		</view>

		<view v-if="ticketType.touristInfoType == 3" class="booking-mod">
			<view class="booking-mod-hd">
				<text class="booking-mod-hd-title">出行人信息</text>
				<text class="booking-mod-hd-tips">
					需填写
					<em>{{ quantity }}个</em>
					出行人
				</text>
			</view>
			<view class="booking-mod-bd">
				<view v-if="quantity == 1">
					<input v-if="ticketType.needTouristName" v-model="firstTourist.name" clearable label="姓名" placeholder="须与证件上的名字一致" />
					<input v-if="ticketType.needTouristMobile" v-model="firstTourist.mobile" clearable label="手机号码" placeholder="请填写手机号码" />
					<input v-if="ticketType.needCert" v-model="firstTourist.certNo" clearable label="身份证" placeholder="请填写证件号码" />
				</view>
				<view v-if="quantity > 1" class="booking-tourist">
					<view style="width:75px;">出行人</view>
					<view style="flex:1;">
						<view :border="false">
							<template v-for="(tourist, index) in tourists">
								<van-cell
									v-if="tourist.name || tourist.mobile || tourist.certNo"
									:key="index"
									:class="{
										'booking-tourist-error': errorTouristIndex == index
									}"
									style="align-items: center;"
									@click="onTouristEdit(index)"
								>
									<p v-if="tourist.name" class="booking-tourist-item">{{ tourist.name }}</p>
									<p v-if="tourist.mobile" class="booking-tourist-item">手机号码 {{ tourist.mobile }}</p>
									<p v-if="tourist.certNo" class="booking-tourist-item">身份证 {{ tourist.certNo }}</p>
									<view slot="right-icon" name="edit" />
								</van-cell>
								<van-cell
									v-else
									:key="index"
									:title="`点击添加出行人${index + 1}`"
									:class="{
										'booking-tourist-error': errorTouristIndex == index
									}"
									@click="onTouristEdit(index)"
								>
									<view slot="right-icon" name="edit" />
								</van-cell>
							</template>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view v-if="ticketType.touristInfoType == 3 && !ticketType.needTouristMobile">
			<view class="booking-mod-hd"><text class="booking-mod-hd-title">联系信息</text></view>
			<view class="booking-mod-bd">
				<view class="view-input">
					<view class="input-label"><text>联系手机</text></view>
					<view class="input-view"><input v-model="input.contactMobile" type="tel" placeholder="请填写手机号码" /></view>
				</view>
			</view>
		</view>

		<view v-if="ticketType.touristInfoType == 2" class="booking-mod input-group">
			<view class="booking-mod-hd">
				<text class="booking-mod-hd-title">联系信息</text>
				<text class="booking-mod-hd-tips">
					需填写
					<em>1个</em>
					联系人
				</text>
			</view>
			<view v-if="ticketType.needTouristName" class="view-input">
				<view class="input-label"><text>姓名</text></view>
				<view class="input-view"><input v-model="input.contactName" placeholder="请填写姓名" /></view>
			</view>
			<view v-if="ticketType.needTouristMobile" class="view-input">
				<view class="input-label"><text>联系手机</text></view>
				<view class="input-view"><input v-model="input.contactMobile" type="tel" placeholder="请填写手机号码" /></view>
			</view>
			<view v-if="ticketType.needCert" class="view-input">
				<view class="input-label"><text>身份证</text></view>
				<view><input v-model="input.contactCert" type="tel" placeholder="请填写证件号码" /></view>
			</view>
		</view>

		<view class="body-active">
			<view class="view-book">
				<view class="book-price">
					<text class="price-label">总额：</text>
					￥{{ price.toFixed(2) }}
				</view>
				<view class="book-button"><button @click="onSubmit" class="order-button">{{submitText}}</button></view>
			</view>
		</view>

		<ticket-type-description v-model="showDescription" :show-buy="false" :ticket-type-id="ticketType.id" :ticket-type-name="ticketType.name" :price="price" />

		<uni-popup ref="touristPopup" v-if="ticketType.touristInfoType == 3" position="right">
			<view class="booking-tourist-edit">
				<van-nav-bar :title="`${editTouristTitle}出行人`" left-text="返回" left-arrow @click-left="showTourist = false" />
				<view class="booking-tourist-edit-content">
					<view :border="false" style="border-radius: 5px;">
						<input v-if="ticketType.needTouristName" v-model="editTourist.name" clearable label="姓名" placeholder="须与证件上的名字一致" />
						<input v-if="ticketType.needTouristMobile" v-model="editTourist.mobile" type="tel" clearable label="手机号码" placeholder="请填写手机号码" />
						<input v-if="ticketType.needCert" v-model="editTourist.certNo" clearable label="身份证" placeholder="请填写证件号码" />
					</view>
					<view class="booking-tourist-edit-btnbox"><van-button @click="onTouristSave">完成</van-button></view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import ticketTypeService from './../../services/ticketTypeService.js';
import orderService from './../../services/orderService.js';
import validate from '@/utils/validator.js';
import toastHelper from '@/utils/toastHelper.js';
import { keyboardPopupMixin } from './../../mixins/KeyboardPopupMixin.js';
import { mobileMixin } from './../../mixins/mobileMixin.js';

class Tourist {
	constructor() {
		this.name = '';
		this.mobile = '';
		this.certNo = '';
	}
}

export default {
	mixins: [keyboardPopupMixin, mobileMixin],
	data() {
		return {
			input: {
				items: [
					{
						ticketTypeId: this.ticketTypeId,
						quantity: 1
					}
				],
				travelDate: '',
				contactName: '',
				contactMobile: '',
				contactCert: ''
			},
			quantity: 1,
			tourists: [],
			ticketType: {
				dailyPrices: [],
				groundChangCis: []
			},
			minBuyNum: 1,
			maxBuyNum: 1000,
			showDescription: false,
			saving: false,
			submited: false,
			showTourist: false,
			firstTourist: new Tourist(),
			currentTouristIndex: -1,
			editTourist: {},
			errorTouristIndex: -1,
			ticketTypeId: 0
		};
	},
	computed: {
		refundClass() {
			let className = 'info';
			if (this.ticketType.allowRefund === false) {
				className = 'error';
			} else if (this.ticketType.refundLimited) {
				className = 'warning';
			}
			let classObj = {};
			classObj[className] = true;
			return classObj;
		},
		refundIcon() {
			if (this.ticketType.allowRefund === false) {
				return 'close';
			}
			return this.ticketType.refundLimited ? 'info-o' : 'passed';
		},
		refundText() {
			if (this.ticketType.allowRefund === false) {
				return '不可退';
			}
			return this.ticketType.refundLimited ? '有条件退' : '随时退';
		},
		price() {
			const priceObj = this.ticketType.dailyPrices.find(p => p.date == this.input.travelDate);
			let priceResult = priceObj ? priceObj.price : 0;
			return priceResult;
		},
		totalMoney() {
			return this.price * this.quantity * 100;
		},
		submitText() {
			return this.totalMoney > 0 ? '去支付' : '提交订单';
		},
		editTouristTitle() {
			if (this.editTourist.name || this.editTourist.mobile || this.editTourist.certNo) {
				return '编辑';
			}
			return '新增';
		},
		...mapState(['promoterId'])
	},
	watch: {
		'input.travelDate': async function(val, oldVal) {
			if (!oldVal) {
				return;
			}

			if (!this.ticketType.hasGroundChangCi) {
				return;
			}

			try {
				this.loading();

				this.ticketType.groundChangCis = await ticketTypeService.getTicketTypeChangCiComboboxItemsAsync(this.ticketTypeId, val);
				this.setGroundChangCiDefaultValue();
			} finally {
				this.loaded();
			}
		},
		quantity: function(val, oldVal) {
			console.log(val);
			if (this.ticketType.touristInfoType != 3) return;

			const diff = val - oldVal;
			if (diff > 0) {
				for (let i = 0; i < diff; i++) {
					this.tourists.push(new Tourist());
				}
				if (val == 1) {
					this.firstTourist = this.tourists[0];
				}
			} else {
				this.tourists.length += diff;
			}
		}
	},
	async onLoad(event) {
		this.ticketTypeId = event.ticketTypeId;
		this.input.items[0].ticketTypeId = event.ticketTypeId;
		try {
			this.loading();

			this.ticketType = await ticketTypeService.getTicketTypeForWeiXinSaleAsync(this.ticketTypeId);

			this.minBuyNum = this.ticketType.minBuyNum > 1 ? this.ticketType.minBuyNum : 1;
			this.maxBuyNum = this.ticketType.maxBuyNum > 1 ? this.ticketType.maxBuyNum : 1000;
			this.quantity = this.minBuyNum;

			const priceObj = this.ticketType.dailyPrices.find(p => !p.disable);
			if (priceObj) {
				this.input.travelDate = priceObj.date;
			}

			this.setGroundChangCiDefaultValue();

			if (this.ticketType.touristInfoType == 3) {
				this.tourists.push(this.firstTourist);
			}

			this.pageLoaded = true;
		} finally {
			this.loaded();
		}
	},
	beforeRouteLeave(to, from, next) {
		if (this.showTourist) {
			this.showTourist = false;
			next(false);
			return;
		}

		if (this.submited || to.meta.shouldNotConfirm) {
			next();
			return;
		}

		this.$dialog
			.confirm({
				title: '确认离开订单填写页？',
				showCancelButton: true,
				confirmButtonText: '离开',
				cancelButtonText: '取消'
			})
			.then(() => {
				next();
			})
			.catch(() => {
				next(false);
			});
	},
	methods: {
		onQuantityChange(val) {
			if (val < this.minBuyNum) {
				this.$nextTick(() => {
					this.quantity = this.minBuyNum;
					toastHelper.noneToast(`至少需购买${this.minBuyNum}份`);
				});
			} else if (val > this.maxBuyNum) {
				this.$nextTick(() => {
					this.quantity = this.maxBuyNum;
					toastHelper.noneToast(`最多购买${this.maxBuyNum}份`);
				});
			}
		},
		onTouristEdit(index) {
			this.currentTouristIndex = index;
			const tourist = this.tourists[index];
			this.editTourist = { ...tourist };
			this.$refs.touristPopup.open();
		},
		onTouristSave() {
			if (!this.validateTourist(this.editTourist)) return;

			const index = this.tourists.findIndex(t => t.certNo == this.editTourist.certNo);
			if (index >= 0 && index != this.currentTouristIndex) {
				toastHelper.noneToast('身份证已添加');
				return;
			}

			this.tourists[this.currentTouristIndex] = { ...this.editTourist };
			if (this.currentTouristIndex == 0) {
				this.firstTourist = this.tourists[0];
			}
			this.$refs.touristPopup.close();
		},
		async onSubmit() {
			if (this.ticketType.groundChangCis.length > 0) {
				for (const groundChangCi of this.ticketType.groundChangCis) {
					if (!groundChangCi.changCiId) {
						if (groundChangCi.changCis.length === 1 && groundChangCi.changCis[0].disabled) {
							toastHelper.noneToast(groundChangCi.groundName + '暂无可售场次');
						} else {
							toastHelper.noneToast('请选择' + groundChangCi.groundName + '场次');
						}
						return;
					}
				}
			}

			if (this.ticketType.touristInfoType == 3) {
				for (let i = 0; i < this.tourists.length; i++) {
					const tourist = this.tourists[i];
					if (!this.validateTourist(tourist)) {
						this.errorTouristIndex = i;
						return;
					}
				}
				this.errorTouristIndex = -1;

				if (!this.ticketType.needTouristMobile) {
					const validateRules = [
						{
							value: this.input.contactMobile,
							name: '联系手机',
							rules: [{ rule: 'required' }, { rule: 'isMobile' }]
						}
					];
					let validateResult = validate(validateRules);
					if (!validateResult.success) {
						toastHelper.noneToast(validateResult.message);
						return;
					}
				}
			}

			if (this.ticketType.touristInfoType == 2) {
				const validateRules = [];
				if (this.ticketType.needTouristName) {
					validateRules.push({
						value: this.input.contactName,
						name: '姓名',
						rules: [{ rule: 'required' }]
					});
				}
				if (this.ticketType.needTouristMobile) {
					validateRules.push({
						value: this.input.contactMobile,
						name: '联系手机',
						rules: [{ rule: 'required' }, { rule: 'isMobile' }]
					});
				}
				if (this.ticketType.needCert) {
					validateRules.push({
						value: this.input.contactCert,
						name: '身份证',
						rules: [{ rule: 'required' }, { rule: 'isIdCard' }]
					});
				}
				let validateResult = validate(validateRules);
				if (!validateResult.success) {
					toastHelper.noneToast(validateResult.message);
					return;
				}
			}

			this.quantity = Math.max(this.minBuyNum, this.quantity);
			this.quantity = Math.min(this.maxBuyNum, this.quantity);
			await this.createOrder();
		},
		setGroundChangCiDefaultValue() {
			if (!this.ticketType.groundChangCis || this.ticketType.groundChangCis.length <= 0) {
				return;
			}

			this.ticketType.groundChangCis.forEach(groundChangCi => {
				if (groundChangCi.changCis.length == 0) {
					groundChangCi.changCis.push({
						value: '',
						displayText: '暂无可售场次',
						disabled: true
					});
				} else if (groundChangCi.changCis.length == 1) {
					groundChangCi.changCiId = groundChangCi.changCis[0].value;
				}
			});
		},
		validateTourist(tourist) {
			const rules = [];
			if (this.ticketType.needTouristName) {
				rules.push({
					value: tourist.name,
					name: '姓名',
					rules: [{ rule: 'required' }]
				});
			}
			if (this.ticketType.needTouristMobile) {
				rules.push({
					value: tourist.mobile,
					name: '手机号码',
					rules: [{ rule: 'required' }, { rule: 'isMobile' }]
				});
			}
			if (this.ticketType.needCert) {
				rules.push({
					value: tourist.certNo,
					name: '身份证',
					rules: [{ rule: 'required' }, { rule: 'isIdCard' }]
				});
			}
			let validateResult = validate(rules);
			if (!validateResult.success) {
				toastHelper.noneToast(validateResult.message);
				return false;
			}
			return true;
		},
		async createOrder() {
			try {
				this.input.items[0].quantity = this.quantity;
				this.input.items[0].tourists = this.tourists;
				this.input.items[0].groundChangCis = this.ticketType.groundChangCis.map(g => {
					return { groundId: g.groundId, changCiId: g.changCiId };
				});
				this.input.promoterId = this.promoterId;

				this.saving = true;
				const result = await orderService.createWeiXinOrderAsync(this.input);
				this.submited = true;
				if (result.shouldPay) {
					uni.setStorageSync('Pay:Product', this.ticketType.name);
				}
				
				if (result.shouldPay) {
					uni.redirectTo({
						url: '/pages/payment/wx-js-pay?listNo=' + result.listNo
					});
				} else {
					uni.redirectTo({
						url: '/pages/order/order-detail?listNo=' + result.listNo
					});
				}
			} finally {
				this.saving = false;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.booking {
	padding: 10px 6px 70px;
	background-color: #c0c7cf;
	min-height: calc(100vh - 46px);
	box-sizing: border-box;

	&-mod {
		margin-bottom: 10px;

		&-hd {
			padding: 10px 12px;
			border-radius: 5px 5px 0 0;
			background: #eff0f2;

			&-title {
				margin-right: 5px;
				font-size: 16px;
				line-height: 20px;
				color: #000;
			}

			&-tips {
				display: inline-block;
				vertical-align: middle;
				line-height: 18px;
				font-size: 13px;
				color: #999;
				word-break: break-all;

				em {
					color: #f40;
					font-style: normal;
					font-weight: 400;
				}
			}
		}

		&-bd {
			border-radius: 0 0 5px 5px;
			border-bottom: solid 1px #a3aab2;
			overflow: hidden;
			background: #fff;

			.van-cell {
				padding: 13px 15px;
			}
		}

		&-around {
			border-radius: 5px;
			background-color: #fff;
			padding: 15px;

			h3 {
				font-size: 16px;
				color: #333;
				font-weight: 700;
			}

			&-label {
				margin-top: 6px;
				font-size: 12px;
				height: 20px;
				overflow: hidden;
				display: flex;

				li {
					float: left;
					margin-right: 14px;
					line-height: 20px;

					.icon {
						vertical-align: middle;
						margin-right: 2px;
					}

					span {
						display: inline-block;
						vertical-align: middle;
					}
				}
				.iconfont {
					font-size: 13px;
				}

				.warning {
					color: #ffae13;
					.iconfont {
						color: #ffae13;
					}
				}

				.info {
					color: #999;
					.iconfont {
						color: #19a0f0;
					}
				}

				.right {
					padding: 0px 0px 0px 15px;
				}

				.error {
					color: #ff2f39;
					.iconfont {
						color: #ff2f39;
					}
				}
			}

			&-resinfo {
				font-size: 12px;
				color: #19a0f0;
				line-height: 20px;
			}

			&-limited {
				font-size: 12px;
				color: #999;
				line-height: 20px;
			}

			&-price {
				text-align: right;
				color: #f40;
				font-size: 21px;

				span {
					font-size: 15px;
				}

				i {
					font-size: 21px;
					margin-right: 1px;
					line-height: 21px;
					font-style: normal;
					font-weight: 400;
				}
			}

			&-num {
				.uni-number-box {
					display: flex;
				}

				/deep/ .uni-number-box__input {
					margin: 0;
					height: 33px;
				}
			}

			&-tips {
				margin: 5px -15px 0 -15px;
				padding: 10px 15px;
				background-color: #fff7e0;
				font-size: 12px;
				color: #481a03;
			}
		}
	}

	&-multi {
		&-item {
			display: flex;
			justify-content: space-between;
			align-items: center;

			&-auto {
				flex: 1;
			}
		}
	}

	.changCi {
		/deep/ .input .van-cell__title {
			max-width: 40%;
		}
	}

	&-tourist {
		display: flex;
		align-items: center;
		margin-left: 15px;

		.van-cell__title {
			color: #999;
		}

		.van-cell__value {
			line-height: 16px;
		}

		.view {
			color: #19a0f0;
		}

		&-error {
			background-color: #fffdf2;

			.booking-tourist-item,
			.van-cell__title {
				color: #ff2f39;
			}
		}

		&-item {
			display: inline-block;
			vertical-align: middle;
			width: 100%;
			font-size: 14px;
			color: #333;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}

		&-edit {
			width: 100vw;
			height: 100vh;
			background-color: #c0c7cf;

			&-content {
				padding: 10px 6px;
				overflow-y: auto;
			}

			&-btnbox {
				padding: 10px;

				.van-button {
					width: 100%;
					line-height: 44px;
					font-size: 18px;
					font-weight: 700;
					color: #fff;
					background-color: #ff9a14;
					border: 1px solid #ff9a14;
					letter-spacing: 1px;
					border-radius: 5px;
				}
			}
		}
	}

	.top-radius {
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
	}

	.bottom-radius {
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
	}

	.body-active {
		bottom: 0;
		.view-book {
			background-color: #fff;
		}
	}

	.input-group {
		border-radius: 5px;
		overflow: hidden;
	}

	.uni-numbox {
		width: 111px;
	}
}
</style>
