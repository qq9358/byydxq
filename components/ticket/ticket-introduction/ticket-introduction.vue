<template>
	<div>
		<uni-popup ref="popup" type="bottom" @change="onPopupChange">
			<div class="description">
				<div class="description-title">
					<div>{{ scenic.scenicName }}</div>
					<div class="description-close-btn" @click="onPopupChange(false)"><text class="iconfont icon-cuowu"></text></div>
				</div>
				<div style="height: 100%; overflow-y: auto;">
					<div class="description-content">
						<div style="height:40px;">&nbsp;</div>
						<div v-if="scenic.openTime && scenic.closeTime" class="description-content-item">
							<h3>开放时间</h3>
							<div class="description-content-item-text">{{ scenic.openTime }}至{{ scenic.closeTime }}</div>
						</div>
						<div v-if="scenic.scenicIntro" class="description-content-item">
							<h3>{{ pageLabelMainText }}简介</h3>
							<div class="description-content-item-text" v-html="scenic.scenicIntro"></div>
						</div>
						<div v-if="scenic.scenicFeature" class="description-content-item">
							<h3>{{ pageLabelMainText }}特色</h3>
							<div class="description-content-item-text" v-html="scenic.scenicFeature"></div>
						</div>
					</div>
				</div>
			</div>
		</uni-popup>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'notice',
	props: {
		value: {
			type: Boolean,
			default: false
		},
		scenic: {}
	},
	data() {
		return {
			showPopup: false
		};
	},
	watch: {
		value(val) {
			if(val){
				this.$refs.popup.open();
			} else {
				this.$refs.popup.close();
			}
		}
	},
	computed: {
		...mapState(['pageLabelMainText'])
	},
	methods: {
		onPopupChange(res) {
			if(!res.show){
				this.$emit('input', false);
			}
		}
	}
};
</script>

<style lang="scss">
.popup-div {
	padding: 100px 0px 100px 0px;
}
</style>

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
	}
}
</style>
