<template>
	<view>
		<s-tabs :effect="false" v-model="tabIndex" @change="tabClick" :nav-per-view="3" class="s-tabs" :height="88">
			<s-tab title="全部"></s-tab>
			<s-tab title="待付款"></s-tab>
			<s-tab title="待使用"></s-tab>
		</s-tabs>
		<view style="margin-top:54px;">
			<no-data v-if="dataLoaded && orders.length === 0" :content-height="contentHeight"></no-data>
			<view v-else v-model="loading" :finished="finished" :immediate-check="false" @load="onLoad">
				<view v-for="order in orders" :key="order.listNo" @click="onPanelClick(order.listNo)" class="panel">
					<view class="panel-title">
						<view span="16">{{ order.listNo }}</view>
						<view span="8" class="panel-title-status">{{ order.orderStatusName }}</view>
					</view>
					<view class="panel-item">
						<view>游玩日期：{{ order.travelDate }}</view>
					</view>
					<view class="panel-item">
						<view>数量：{{ order.totalNum }}</view>
					</view>
					<view v-if="!order.isFree" class="panel-item">
						<view>总价：{{ order.totalMoney }}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import orderService from '@/services/orderService.js';

export default {
	name: 'order',
	data() {
		return {
			loading: false,
			dataLoaded: false,
			finished: false,
			queryInput: {
				isUsable: '',
				isNotPaid: '',
				skipCount: 0,
				maxResultCount: 20
			},
			tabIndex: 0,
			orders: [],
			currentListNo: ''
		};
	},
	computed: {
		contentHeight() {
			return this.$store.state.clientHeight - 150;
		},
		isNotPaid() {
			return this.tabIndex === 1 ? true : null;
		},
		isUsable() {
			return this.tabIndex === 2 ? true : null;
		}
	},
	beforeRouteEnter(to, from, next) {
		next(async vm => {
			if (from.name == 'orderdetail') {
				await vm.refreshOrder();
			} else {
				vm.tabIndex = 0;
				await vm.loadData();
			}
		});
	},
	methods: {
		async tabClick(index) {
			this.tabIndex = index;
			await this.loadData();
		},
		async onLoad() {
			await this.getOrders();
		},
		onPanelClick(listNo) {
			this.currentListNo = listNo;
			uni.navigateTo({
				url: '/pages/order/order-detail?listNo=' + listNo
			});
		},
		async loadData() {
			this.queryInput.skipCount = 0;
			this.orders = [];
			await this.getOrders();
		},
		async getOrders() {
			try {
				this.loading = true;
				this.dataLoaded = false;

				this.queryInput.isNotPaid = this.isNotPaid;
				this.queryInput.isUsable = this.isUsable;
				let result = await orderService.getMemberOrdersForMobileAsync(this.queryInput);

				result.items.forEach(item => {
					this.orders.push(item);
				});

				this.queryInput.skipCount = this.queryInput.skipCount + result.items.length;

				this.finished = this.orders.length === result.totalCount;
			} catch (err) {
				return;
			} finally {
				this.loading = false;
				this.dataLoaded = true;
			}
		},
		async refreshOrder() {
			if (!this.currentListNo) {
				return;
			}
			const order = await orderService.getMemberOrderForMobileAsync(this.currentListNo);
			let originalOrder = this.orders.filter(o => o.listNo == this.currentListNo)[0];
			originalOrder.orderStatusName = order.orderStatusName;
		}
	}
};
</script>

<style lang="scss" scoped>
.order-tabs {
	position: fixed;
	width: 100%;
	top: 46px;
	left: 0;
	z-index: 100;
}

.panel {
	background-color: white;
	padding: 15px 20px;
	border-bottom: 1px solid #ececec;

	&-title {
		font-size: 16px;
		display: flex;
		justify-content: space-between;
		&-status {
			text-align: right;
			color: #19a0f0;
			font-size: 13px;
		}
	}

	&-item {
		font-size: 13px;
		color: #999;
	}
}

.s-tab-wrap {
	height: 0rpx;
	padding: 0rpx;
	font-size: 28rpx;
}

.s-tabs {
	position: fixed;
	/* #ifndef MP */
	top: 44px;
	/* #endif */
	/* #ifdef MP */
	top: 0px;
	/* #endif */
	width: 100%;
}
</style>
