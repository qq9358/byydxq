<template>
	<view class="view-input" >
		<text class="picker-label">{{ label }}</text>
		<picker v-if="pickerType == 1" @change="pickerChange" :value="selectValue" :range="columns" range-key="displayText">
			<view class="picker-view">
				<view v-if="selectValue == undefined" class="display-text">{{ placeholder }}</view>
				<view v-else :class="{ 'select-text': selectValue != undefined, 'display-text': true }">{{ columns[selectValue].displayText }}</view>
				<view><view class="iconfont icon-arrow picker-icon"></view></view>
			</view>
		</picker>
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
		},
		pickerType: {
			type: Number,
			default: 1
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
			if(this.pickerType == 2){
				this.$refs.dateTime.show();
			}
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
</style>