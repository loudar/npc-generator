import {ValueType} from "../ValueType.mjs";

export class Property {
    static new(name, value) {
        return {
            name: name.toLowerCase(),
            type: "Property",
            valueType: ValueType.string,
            setValueType: function(valueType) {
                this.valueType = valueType;
                return this;
            },
            value: value,
            setValue: function(value, valueType = this.valueType) {
                if (valueType !== this.valueType) {
                    this.setValueType(valueType);
                }
                switch (this.valueType) {
                    case ValueType.string:
                        if (value.constructor !== String) {
                            value = value.toString();
                        }
                        break;
                    case ValueType.number:
                        if (value.constructor !== Number) {
                            value = Number(value);
                        }
                        break;
                    case ValueType.boolean:
                        if (value.constructor !== Boolean) {
                            value = Boolean(value);
                        }
                        break;
                    case ValueType.array:
                        if (value.constructor !== Array) {
                            value = [value];
                        }
                        break;
                    case ValueType.object:
                        if (value.constructor !== Object) {
                            value = {value};
                        }
                        break;
                    default:
                        throw new Error(`Unknown value type: ${value.constructor}`);
                }
                this.value = value;
                return this;
            }
        }
    }
}