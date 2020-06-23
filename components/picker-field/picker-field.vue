<template>
	<view class="view-input">
		<text class="input-label">{{ label }}</text>
		<!-- <input v-if="isCell" :title="label" is-link :value="currentText ? currentText : placeholder" @click="onClick" />
		<input v-else :label="label" :value="currentText" :placeholder="placeholder" right-icon="arrow" readonly @focus="onFocus" @click="onClick" /> -->
		<!-- <tui-bottom-popup ref="pickerPopup" position="bottom"> -->
		<!-- <picker
				show-toolbar
				:columns="columns"
				:loading="loading"
				:value-key="textKey"
				@cancel="onCancel"
				@confirm="onConfirm"
				@change="pickerChange"
				:value="index"
				:range="columns"
			>
				<view class="tui-input">{{ columns[index] }}</view>
			</picker> -->
		<picker @change="pickerChange" :value="selectValue" :range="columns" range-key="displayText">
			<view class="picker-view">
				<view v-if="selectValue == undefined" class="display-text">{{ placeholder }}</view>
				<view v-else :class="{ 'select-text': selectValue != undefined, 'display-text': true }">{{ columns[selectValue].displayText }}</view>
				<view><view class="iconfont icon-arrow picker-icon"></view></view>
			</view>
		</picker>
		<!-- </tui-bottom-popup> -->
	</view>
</template>

<script>
export default {
	name: 'picker-field',
	props: {
		label: {
			type: String
		},
		placeholder: {
			type: String,
			default: ''
		},
		value: {
			type: [String, Number]
		},
		textKey: {
			type: String,
			default: 'displayText'
		},
		valueKey: {
			type: String,
			default: 'value'
		},
		loading: {
			type: Boolean,
			default: false
		},
		columns: {
			type: Array,
			default() {
				return [];
			}
		},
		isCell: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			selectValue: undefined
		};
	},
	watch: {
		value: {
			handler(newVal) {
				if (newVal) {
					let i;
					for(i=0; i< this.columns.length; i++){
						if(this.columns[i].value == newVal){
							break;
						}
					}
					this.selectValue = i;
				}
			},
			immediate: true
		}
	},
	computed: {
		currentText() {
			if (this.value) {
				const currentItem = this.columns.filter(c => c[this.valueKey] == this.value)[0];
				if (currentItem) {
					return currentItem[this.textKey];
				}
			}
			return '';
		}
	},
	methods: {
		onFocus() {
		},
		onClick() {
			this.$refs.pickerPopup.open();
		},
		onCancel() {
			this.$refs.pickerPopup.close();
		},
		onConfirm(value) {
			this.$emit('input', value[this.valueKey]);
			this.$refs.pickerPopup.close();
		},
		pickerChange(event) {
			this.selectValue = event.detail.value;
			this.$emit('input', this.columns[event.detail.value].value);
		}
	}
};
</script>

<style lang="scss">
.picker-view {
	display: flex;
	align-items: center;
	color: #969799;
	.display-text {
		width: calc(100vw - 162px);
	}
	.select-text {
		color: #333;
	}
	.picker-icon {
		font-size: 22px;
	}
}
</style>
