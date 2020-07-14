<template>
	<view>
		<view v-if="param.validTypeId > 2 && param.validTypeId < 8" class="view-input">
			<view class="input-label">
				<text>{{ param.label }}</text>
			</view>
			<view class="input-view">
				<input
					v-if="param.validTypeId == 6"
					v-model="param.vmodel"
					:placeholder="param.placeholder"
					:placeholder-class="param.error ? 'error-input-placeholder' : 'input-placeholder'"
					type="text"
					:disabled="disabled"
				/>
				<input
					v-if="param.validTypeId == 5 || param.validTypeId == 7"
					v-model="param.vmodel"
					:placeholder="param.placeholder"
					:placeholder-class="param.error ? 'error-input-placeholder' : 'input-placeholder'"
					type="digit"
					:disabled="disabled"
				/>
				<input
					v-if="param.validTypeId == 3 || param.validTypeId == 4"
					v-model="param.vmodel"
					:placeholder="param.placeholder"
					:placeholder-class="param.error ? 'error-input-placeholder' : 'input-placeholder'"
					type="idcard"
					:disabled="disabled"
				/>
			</view>
			<view class="input-end" v-if="param.endTypeId == '1'" @click="onEndClick">
				<view class="input-end-text">{{ param.endValue }}</view>
			</view>
			<view class="input-end" v-if="param.endTypeId == '2'" @click="onEndClick">
				<view class="input-end-text">
					<button>{{ param.endValue }}</button>
				</view>
			</view>
			<view class="input-end" v-if="param.endTypeId == '3'" @click="onEndClick"><view :class="'iconfont' + param.endValue"></view></view>
			<view class="input-end" v-if="param.endTypeId == '4'" @click="onEndClick">
				<button class="code-button">{{ param.isCountdownStart ? param.second + 'S 后重新发送' : param.endValue }}</button>
			</view>
		</view>
		<view v-if="param.validTypeId == 2" class="view-input view-radio">
			<view class="input-label">{{ param.label }}</view>
			<view class="radio-view">
				<radio-group class="radio-group" name="sex" @change="onRadioChange">
					<label v-for="paramSelectDto in param.paramSelectDtos" :key="paramSelectDto.value" class="tui-radio">
						<radio :value="paramSelectDto.value" color="#5677fc">{{ paramSelectDto.displayText }}</radio>
					</label>
				</radio-group>
			</view>
		</view>
		<view v-if="param.validTypeId == 1">
			<custom-picker-field
				show-toolbar
				:columns="param.paramSelectDtos"
				:loading="loading"
				:value-key="textKey"
				@cancel="onCancel"
				@confirm="onConfirm"
				class="picker-sex"
				:label="param.label"
				:placeholder="param.placeholder"
				:picker-type="1"
				v-model="param.vmodel"
			/>
		</view>
		<view v-if="param.validTypeId == 8" class="view-input">
			<view class="input-label">{{ param.label }}</view>
			<view class="picker-view" @click="onTimeClick">
				<view v-if="!param.vmodel" class="display-text">{{ param.placeholder }}</view>
				<view v-else :class="{ 'select-text': param.vmodel, 'display-text': true }">{{ param.vmodel }}</view>
				<view><view class="iconfont icon-arrow picker-icon"></view></view>
			</view>
			<tui-datetime
				ref="dateTime"
				:type="type"
				:startYear="startYear"
				:endYear="endYear"
				:cancelColor="cancelColor"
				:color="color"
				:setDateTime="setDateTime"
				:unitTop="unitTop"
				:radius="radius"
				@confirm="timeChange"
			></tui-datetime>
		</view>
		<view v-if="param.validTypeId == 9" class="view-input view-radio-alone">
			<!-- <view class="picker-label">{{ param.label }}</view> -->
			<view class="radio-alone-view">
				<radio-group class="radio-group-alone" name="sex" @change="onRadioChange">
					<label v-for="paramSelectDto in param.paramSelectDtos" :key="paramSelectDto.value" class="tui-radio-alone">
						<radio :value="paramSelectDto.value" color="#5677fc">{{ paramSelectDto.displayText }}</radio>
					</label>
				</radio-group>
			</view>
		</view>
	</view>
</template>

<script>
//下拉选项 = 1,单选按钮 = 2,手机号码 = 3,身份证号码 = 4,数值类型 = 5,字符串 = 6,年龄 = 7,日期 = 8,单独占行单选 = 9
export default {
	name: 'picker-field',
	props: {
		value: {
			type: [String, Number]
		},
		textKey: {
			type: String,
			default: 'value'
		},
		valueKey: {
			type: String,
			default: 'id'
		},
		loading: {
			type: Boolean,
			default: false
		},
		param: {
			type: Object,
			default() {
				return {};
			}
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			showPopup: false,
			type: 2,
			startYear: 1980,
			endYear: 2030,
			cancelColor: '#888',
			color: '#5677fc',
			setDateTime: '',
			result: '',
			unitTop: false,
			radius: false
		};
	},
	computed: {
		currentText() {
			if (this.param.vmodel && this.param.paramSelectDtos) {
				const currentItem = this.param.paramSelectDtos.filter(c => c[this.valueKey] == this.param.vmodel)[0];
				if (currentItem) {
					return currentItem[this.textKey];
				}
			}
			return '';
		}
	},
	// watch: {
	// 	vmodel(val) {
	// 		this.$emit('input', val);
	// 	}
	// },
	methods: {
		onFocus() {
			document.activeElement.blur();
		},
		onClick() {},
		onCancel() {},
		onConfirm(value) {
			// this.vmodel = value[this.valueKey];
			this.param.vmodel = value[this.valueKey];
			this.showPopup = false;
		},
		onEndClick() {
			this.$emit('end', {});
		},
		onRadioChange(res) {
			// this.$emit('input', res.detail.value);
			this.param.vmodel = res.detail.value;
		},
		onTimeClick() {
			this.cancelColor = '#888';
			this.color = '#5677fc';
			this.setDateTime = '';
			this.startYear = 1980;
			this.endYear = 2030;
			this.unitTop = false;
			this.radius = false;
			this.$refs.dateTime.show();
		},
		timeChange: function(e) {
			// this.vmodel = e.result;
			this.param.vmodel = e.result;
		}
	}
};
</script>

<style lang="scss">
.view-radio {
	.radio-view {
		.radio-group {
			display: flex;
		}
		.tui-radio {
			margin-right: 10px;
		}
	}
}

.view-radio-alone {
	display: block;
	.radio-alone-view {
		.radio-group-alone {
			.tui-radio-alone {
				padding: 3px 0px 3px 0px;
			}
		}
	}
}

.radio-border {
	border-bottom: 1px solid #ebedf0;
	width: 100%;
	margin-left: 16px;
}

.error-input-placeholder {
	color: #ff0000;
}

.input-end {
	color: #19a0f0;
}
</style>

<style scoped>
/deep/ .uni-radio-input {
	transform: scale(0.8);
}
/deep/ .uni-radio-wrapper {
	padding: 4px 0px 4px 0px;
}
</style>
