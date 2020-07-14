import validate from './validator.js';

//下拉选项 = 1,单选按钮 = 2,手机号码 = 3,身份证号码 = 4,数值类型 = 5,字符串 = 6,年龄 = 7
export default {
    getValidRules(activityBindParamDto) {
        let rules = [
            {
                rule: "required"
            }
        ];
        if (activityBindParamDto.validTypeId == "6") {
            if (activityBindParamDto.minValue > 0) {
                rules.push({
                    rule: "minLength:" + activityBindParamDto.minValue
                });
            }
            if (activityBindParamDto.maxValue > 0) {
                rules.push({
                    rule: "maxLength:" + activityBindParamDto.maxValue
                });
            }
        }

        if (activityBindParamDto.validTypeId == "5") {
            if (activityBindParamDto.minValue > 0) {
                rules.push({
                    rule: "minNum:" + activityBindParamDto.minValue
                });
            }
            if (activityBindParamDto.maxValue > 0) {
                rules.push({
                    rule: "maxNum:" + activityBindParamDto.maxValue
                });
            }
        }

        if (activityBindParamDto.validTypeId == "4") {
            rules.push({
                rule: "isIdCard"
            });
        }

        if (activityBindParamDto.validTypeId == "3") {
            rules.push({
                rule: "isMobile"
            });
        }

        return rules;
    },
	validParam(param){
		const rules = this.getValidRules(param);
		let result = validate([
			{
				value: param.vmodel,
				name: param.label,
				rules: rules
			}
		]);
		param.error = !result.success;
		if (!result.success) {
			return result.message;
		} else {
			return "";
		}
	}
}