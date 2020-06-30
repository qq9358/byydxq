<template>
	<view class="view-course-search">
		<view class="tui-header">
			<view class="tui-header-bottom">
				<view class="tui-bottom-item" :class="[proDropIndex == 0 ? 'tui-btmItem-active' : '']" @tap="btnDropChange(0)">
					<view class="tui-bottom-text" :class="[proDropIndex == 0 ? 'tui-active' : '']">选择会员</view>
					<view class="iconfont icon-angle" :class="[proDropIndex == 0 ? 'tui-active' : '']"></view>
				</view>
				<view class="tui-bottom-item" :class="[proDropIndex == 1 ? 'tui-btmItem-active' : '']" @tap="btnDropChange(1)">
					<view class="tui-bottom-text" :class="[proDropIndex == 1 ? 'tui-active' : '']">日期范围</view>
					<view class="iconfont icon-angle" :class="[proDropIndex == 1 ? 'tui-active' : '']"></view>
				</view>
				<view class="tui-bottom-high"><view class="bottom-high-text">高级检索</view></view>
			</view>
		</view>

		<view class="course-list-view">
			<view v-for="course in courses" :key="course.courseId" class="course-item-view">
				<view class="course-item-title">{{ course.name }}</view>
				<view class="course-item-info">
					<view class="item-info-view">
						<view class="item-info-row">
							<view class="item-info-tap">上课时间</view>
							<view class="item-info-value">{{ course.startTime }}</view>
						</view>
						<view class="item-info-row">
							<view class="item-info-tap">签到时间</view>
							<view class="item-info-value">{{ course.signTime }}</view>
						</view>
						<view class="item-info-row">
							<view class="item-info-tap">课程价格</view>
							<view class="item-info-value">￥ {{ course.price }}元</view>
						</view>
						<view class="item-info-row">
							<view class="item-info-tap">会员</view>
							<view class="item-info-value">{{ course.memberName }}</view>
						</view>
						<view class="item-info-row">
							<view class="item-info-tap">会员卡号</view>
							<view class="item-info-value">{{ course.cardNo }}</view>
						</view>
					</view>
					<view class="item-info-button"><button @tap="btnEvaluate" class="evaluate-button">评价</button></view>
				</view>
				<view class="course-item-evaluate">
					<view v-for="(evaluate, evaluateIndex) in course.evaluates" :key="evaluateIndex" class="item-evaluate-view">
						<view class="item-evaluate-content">{{ evaluate.content }}</view>
						<view class="item-evaluate-ctime">
							<view class="evaluate-ctime-text">{{ evaluate.cTime }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<tui-top-dropdown :show="dropShow" :paddingbtm="110" :translatey="translateY" :height="600" @close="btnCloseDrop">
			<scroll-view class="tui-scroll-box" scroll-y scroll-with-animation :scroll-top="scrollTop">
				<view class="tui-seizeaseat-20"></view>
				<view
					class="tui-drop-item"
					:class="[item.selected ? 'tui-bold' : '']"
					v-for="(item, index) in proDropData"
					:key="index"
					@tap.stop="btnSelected"
					:data-index="index"
				>
					<tui-icon name="check" :size="16" color="#5677fc" :bold="true" v-if="item.selected"></tui-icon>
					<text class="tui-ml tui-middle">{{ item.name }}</text>
				</view>
				<view class="tui-seizeaseat-30"></view>
			</scroll-view>
			<view class="tui-drop-btnbox">
				<view class="tui-drop-btn tui-button-white" hover-class="tui-button-white_hover" :hover-stay-time="150" @tap="reset">重置</view>
				<view class="tui-drop-btn tui-button-primary" hover-class="tui-button-hover" :hover-stay-time="150" @tap="btnCloseDrop">确定</view>
			</view>
		</tui-top-dropdown>
	</view>
</template>

<script>
import toastHelper from '@/utils/toastHelper.js';

export default {
	data() {
		return {
			proDropList: [
				{
					list: [
						{
							name: 'trendsetter',
							selected: false
						},
						{
							name: '维肯（Viken）',
							selected: false
						},
						{
							name: 'AORO',
							selected: false
						},
						{
							name: '苏发',
							selected: false
						},
						{
							name: '飞花令（FHL）',
							selected: false
						},
						{
							name: '叶梦丝',
							selected: false
						},
						{
							name: 'ITZOOM',
							selected: false
						},
						{
							name: '亿魅',
							selected: false
						},
						{
							name: 'LEIKS',
							selected: false
						},
						{
							name: '雷克士',
							selected: false
						},
						{
							name: '蕊芬妮',
							selected: false
						},
						{
							name: '辉宏达',
							selected: false
						},
						{
							name: '英西达',
							selected: false
						},
						{
							name: '戴为',
							selected: false
						},
						{
							name: '魔风者',
							selected: false
						},
						{
							name: '即满',
							selected: false
						},
						{
							name: '北比',
							selected: false
						},
						{
							name: '娱浪',
							selected: false
						},
						{
							name: '搞怪猪',
							selected: false
						}
					]
				},
				{
					list: [
						{
							name: '线充套装',
							selected: false
						},
						{
							name: '单条装',
							selected: false
						},
						{
							name: '车载充电器',
							selected: false
						},
						{
							name: 'PD快充',
							selected: false
						},
						{
							name: '数据线转换器',
							selected: false
						},
						{
							name: '多条装',
							selected: false
						},
						{
							name: '充电插头',
							selected: false
						},
						{
							name: '无线充电器',
							selected: false
						},
						{
							name: '座式充电器',
							selected: false
						},
						{
							name: '万能充',
							selected: false
						},
						{
							name: '转换器/转接线',
							selected: false
						},
						{
							name: 'MFI苹果认证',
							selected: false
						},
						{
							name: '转换器',
							selected: false
						},
						{
							name: '苹果认证',
							selected: false
						}
					]
				},
				{
					list: [
						{
							name: '通用',
							selected: false
						},
						{
							name: 'vivo',
							selected: false
						},
						{
							name: 'OPPO',
							selected: false
						},
						{
							name: '魅族',
							selected: false
						},
						{
							name: '苹果',
							selected: false
						},
						{
							name: '华为',
							selected: false
						},
						{
							name: '三星',
							selected: false
						},
						{
							name: '荣耀',
							selected: false
						},
						{
							name: '诺基亚5',
							selected: false
						},
						{
							name: '荣耀4',
							selected: false
						},
						{
							name: '诺基',
							selected: false
						},
						{
							name: '荣耀',
							selected: false
						},
						{
							name: '诺基亚2',
							selected: false
						},
						{
							name: '荣耀2',
							selected: false
						},
						{
							name: '诺基',
							selected: false
						}
					]
				}
			],
			proDropData: [],
			proDropIndex: -1,
			dropShow: false,
			scrollTop: 0,
			courses: [
				{
					courseId: '1',
					name: '普通冰球1:1',
					startTime: '2020-07-01 12:34-13:30',
					signTime: '2020-07-01 12:00',
					price: '123.45',
					memberName: '陈小宝',
					cardNo: 'wx20123412341234',
					evaluates: [
						{
							content: '效果不错，也很有兴趣，比作文班，和数学班要轻松的多，娱乐的同时收获技艺',
							cTime: '2020-07-02 08:12:34'
						}
					]
				},
				{
					courseId: '2',
					name: '普通冰球1:1',
					startTime: '2020-07-01 12:34-13:30',
					signTime: '2020-07-01 12:00',
					price: '123.45',
					memberName: '陈小宝',
					cardNo: 'wx20123412341234',
					evaluates: [
						{
							content: '效果不错，也很有兴趣，比作文班，和数学班要轻松的多，娱乐的同时收获技艺',
							cTime: '2020-07-02 08:12:34'
						}
					]
				},
				{
					courseId: '3',
					name: '普通冰球1:1',
					startTime: '2020-07-01 12:34-13:30',
					signTime: '2020-07-01 12:00',
					price: '123.45',
					memberName: '陈小宝',
					cardNo: 'wx20123412341234',
					evaluates: [
						{
							content: '效果不错，也很有兴趣，比作文班，和数学班要轻松的多，娱乐的同时收获技艺',
							cTime: '2020-07-02 08:12:34'
						}
					]
				}
			]
		};
	},
	computed: {
		translateY() {
			let clientHeight = uni.getSystemInfoSync().screenHeight;
			let translate = 290 - clientHeight * 0.2;
			//#ifdef MP-WEIXIN
			translate-= 80;
			//#endif
			return translate;
		}
	},
	methods: {
		btnDropChange(index) {
			this.proDropData = [...this.proDropList[index].list];
			this.proDropIndex = index;
			this.dropShow = true;
			this.dropdownShow = false;
		},
		btnSelected: function(e) {
			this.reset();
			let index = e.currentTarget.dataset.index;
			let obj = this.proDropData[index];
			this.$set(obj, 'selected', !obj.selected);

			console.log(obj);
		},
		reset() {
			let arr = this.proDropData;
			for (let item of arr) {
				item.selected = false;
			}
			this.proDropData = arr;
		},
		btnCloseDrop() {
			this.scrollTop = 1;
			this.$nextTick(() => {
				this.scrollTop = 0;
			});
			this.dropShow = false;
			this.proDropIndex = -1;
		},
		btnEvaluate() {
			toastHelper.noneToast('点击了评价');
		}
	}
};
</script>

<style lang="scss">
.view-course-search {
	.tui-header {
		height: 40px;
		.tui-header-bottom {
			.tui-bottom-item {
				.icon-angle {
					font-size: 12px;
					transform: scale(0.9);
					padding: 2px 0px 0px 2px;
				}
			}
			.tui-bottom-high {
				flex: 0.6;
				text-align: right;
				.bottom-high-text {
				}
			}
		}
	}
	.course-list-view {
		background: #ebebeb;
		padding: 40px 0px 0px 0px;
		.course-item-view {
			background: #ffffff;
			margin-bottom: 10px;
			.course-item-title {
				padding: 10px 15px 10px 25px;
				font-size: 15px;
			}
			.course-item-info {
				border-top: 1px solid #dddddd;
				padding: 15px 15px 10px 25px;
				display: flex;
				justify-content: space-between;
				font-size: 13px;
				.item-info-view {
					flex: 0.8;
					.item-info-row {
						display: flex;
						padding: 0px 0px 5px 0px;
						.item-info-tap {
							background: #4cbbff;
							width: 65px;
							text-align-last: justify;
							text-align: justify;
							text-justify: distribute-all-lines; // 这行必加，兼容ie浏览器
							border-top-right-radius: 15px;
							border-bottom-right-radius: 15px;
							padding: 2px 10px 2px 10px;
							color: #ffffff;
						}
						.item-info-value {
							padding: 0px 0px 0px 15px;
						}
					}
				}
				.item-info-button {
					flex: 0.2;
					margin-top: auto;
					padding: 0px 0px 5px 0px;
					.evaluate-button {
						font-size: 14px;
						border-radius: 4px;
						background-image: -webkit-linear-gradient(left, #ffa500, #ff7800);
					}
				}
			}
			.course-item-evaluate {
				border-top: 1px solid #dddddd;
				padding: 10px 15px 10px 25px;
				.item-evaluate-view {
					font-size: 12px;
					.item-evaluate-content {
						color: #4c4c4c;
					}
					.item-evaluate-ctime {
						color: #b2b2b2;
						padding: 7px 0px 0px 0px;
						.evaluate-ctime-text {
							transform: scale(0.9);
							margin-left: -18px;
						}
					}
				}
			}
		}
	}
}
</style>

<style>
/* 隐藏scroll-view滚动条*/
::-webkit-scrollbar {
	width: 0;
	height: 0;
	color: transparent;
}

/*header*/
.tui-header {
	width: 100%;
	/* box-shadow: 0 15rpx 10rpx -15rpx #f2f2f2; */
	box-sizing: border-box;
	background-image: -webkit-linear-gradient(left, #009eff, #00d0ff);
	position: fixed;
	z-index: 1000;
	color: #ffffff;
}

.tui-header-top,
.tui-header-bottom {
	display: flex;
	align-items: center;
	font-size: 26rpx;
}

.tui-top-item {
	height: 26rpx;
	line-height: 26rpx;
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
}

.tui-topitem-active {
	position: relative;
	font-weight: bold;
}

.tui-topitem-active::after {
	content: '';
	position: absolute;
	width: 44rpx;
	height: 6rpx;
	background: #5677fc;
	border-radius: 6rpx;
	bottom: -10rpx;
	left: 50%;
	-webkit-transform: translateX(-50%);
	transform: translateX(-50%);
}

.tui-price-arrow {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 20rpx;
}

.tui-bottom-item .tui-icon-class,
.tui-screen .tui-icon-class {
	margin-left: 6rpx;
}

.tui-icon-box {
	line-height: 12px !important;
	padding: 0 !important;
	display: block !important;
	position: relative;
}

.tui-arrow-up {
	top: 5px;
}

.tui-arrow-down {
	top: -3px;
}

.tui-header-bottom {
	height: 40px;
	padding: 0 30rpx;
	box-sizing: border-box;
	font-size: 28rpx;
	align-items: center;
	overflow: hidden;
}

.tui-bottom-text {
	line-height: 24rpx;
}

.tui-icon-arrowdown {
	line-height: initial;
}

.tui-bottom-item {
	flex: 0.2;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 18rpx 12rpx;
	border-radius: 40rpx;
	box-sizing: border-box;
	/* background: #f2f2f2; */
	margin-right: 20rpx;
	white-space: nowrap;
	height: 40px;
}

.tui-bottom-item:last-child {
	margin-right: 0;
}

.tui-btmItem-active {
	padding-bottom: 28rpx;
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
	background: #f2f2f2;
}

.tui-bold {
	font-weight: bold;
}

.tui-active {
	color: #5677fc;
}

.tui-ml {
	margin-left: 6rpx;
}

.tui-seizeaseat-20 {
	height: 20rpx;
}

.tui-seizeaseat-30 {
	height: 30rpx;
}

.tui-middle {
	vertical-align: middle;
}

.tui-drop-item .tui-icon-class {
	vertical-align: middle;
}

/*header*/

/*header 下拉选择*/

.tui-scroll-box {
	width: 100%;
	height: 480rpx;
	box-sizing: border-box;
	position: relative;
	z-index: 99;
	color: #fff;
	font-size: 30rpx;
	word-break: break-all;
}

.tui-drop-item {
	color: #333;
	height: 80rpx;
	font-size: 28rpx;
	padding: 20rpx 40rpx 20rpx 40rpx;
	box-sizing: border-box;
	display: inline-block;
	width: 50%;
}

.tui-drop-btnbox {
	width: 100%;
	height: 100rpx;
	position: absolute;
	left: 0;
	bottom: 0;
	box-sizing: border-box;
	display: flex;
}

.tui-drop-btn {
	width: 50% !important;
	border-radius: 0 !important;
	font-size: 32rpx !important;
	text-align: center;
	height: 100rpx;
	line-height: 100rpx;
	border: 0;
}

.top-dropdown-box {
	margin-top: 40px;
}
</style>

<style lang="scss" scoped>
.tui-dropdown-box {
	top: 40px;
}
</style>
