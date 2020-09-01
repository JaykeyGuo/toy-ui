<template>
  <label>
    <span>
      <input
        type="checkbox"
        :disabled="disabled"
        :checked="currentValue"
        @change="change"
      />
    </span>
    <slot></slot>
  </label>
</template>

<script>
import Emitter from '@/mixins/emitter';

export default {
  name: 'ToyCheckbox',
  mixins: [Emitter],
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Number, Boolean],
      default: false,
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true,
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false,
    },
  },
  data() {
    return {
      currentValue: this.value,
    };
  },
  // computed: {
  //   currentValue() {
  //     return this.value;
  //   },
  // },
  watch: {
    value(val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateModel();
      } else {
        // eslint-disable-next-line no-throw-literal
        throw 'Value should be trueValue or fasleValue';
      }
    },
  },
  methods: {
    // eslint-disable-next-line consistent-return
    change(event) {
      if (this.disabled) {
        return false;
      }

      const { checked } = event.target;
      this.currentValue = checked;

      const value = checked ? this.trueValue : this.falseValue;
      this.$emit('update', value);
      this.$emit('input', value);
      this.$emit('on-change', value);
      this.dispatch('ToyFormItem', 'on-form-change', value);
    },
    updateModel() {
      this.currentValue = this.value === this.trueValue;
    },
  },
};
</script>

<style>

</style>
