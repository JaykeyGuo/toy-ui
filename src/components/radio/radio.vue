<template>
  <label>
    <span>
      <input
        v-if="group"
        type="radio"
        :disabled="disabled"
        :value="label"
        v-model="model"
        @change="change"
      />
      <input
        v-else
        type="radio"
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
import { findComponentUpward } from '@/utils/assist';

export default {
  name: 'toyRadio',
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
    label: {
      type: [String, Number, Boolean],
    },
  },
  data() {
    return {
      currentValue: this.value,

      model: '',
      group: false,
      parent: null,
    };
  },
  watch: {
    value() {
      this.updateModel();
    },
  },
  mounted() {
    this.parent = findComponentUpward(this, 'toyRadioGroup');
    if (this.parent) this.group = true;

    if (this.group) {
      this.parent.updateModel(this.label);
    } else {
      this.updateModel();
    }
  },
  methods: {
    // eslint-disable-next-line consistent-return
    change(event) {
      if (this.disabled) {
        return false;
      }

      const { checked } = event.target;
      this.currentValue = this.label;

      const value = checked ? this.currentValue : '';
      this.$emit('input', value);

      if (this.group) {
        this.parent.change(this.model);
      } else {
        this.$emit('on-change', value);
        this.dispatch('toyFormItem', 'on-form-change', value);
      }
    },
    updateModel() {
      this.currentValue = this.value === this.label ? this.label : '';
    },
  },
};
</script>

<style>

</style>
