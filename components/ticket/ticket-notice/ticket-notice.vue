<template>
	<div>
		<tui-bottom-popup :show="value" @close="onClose"><div class="popup-div">这是公告详情</div></tui-bottom-popup>
	</div>
</template>

<script>
export default {
	name: 'notice',
	props: {
		value: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			showPopup: false
		};
	},
	watch: {
		value(val) {
			this.showPopup = val;
		}
	},
	methods:{
		onClose(){
			this.showPopup = false;
			this.$emit("close",{})
		}
	}
};
</script>

<style lang="scss">
.popup-div {
	padding: 100px 0px 100px 0px;
}
</style>
