<template>
	<view class="no-data">
		<view type="flex" justify="center" align="center" >
			<view>
				<text class="iconfont icon-wushuju no-data-icon" />
				<view class="no-data-text">暂无数据</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'no-data',
	props: {
		contentHeight: {
			type: Number,
			default: 500
		}
	}
};
</script>

<style lang="scss">
.no-data {
	color: dimgrey;
	text-align: center;
	height: calc(100vh - 170px);
	display: flex;
	justify-content: center;
	align-items: center;

	&-icon {
		font-size: 40px;
	}

	&-text {
		font-size: 13px;
		margin-top: 5px;
	}
}
</style>
