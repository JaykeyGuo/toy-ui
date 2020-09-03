<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
/* eslint-disable no-param-reassign */
import { findComponentsDownward } from '@/utils/assist';
import Emitter from '@/mixins/emitter';

export default {
  name: 'toyRadioGroup',
  mixins: [Emitter],
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      currentValue: this.value,
      childrenList: [],
    };
  },
  watch: {
    value() {
      this.updateModel(this.value);
    },
  },
  mounted() {
    this.updateModel(this.value);
  },
  methods: {
    updateModel(picked) {
      this.childrenList = findComponentsDownward(this, 'toyRadio');
      if (this.childrenList) {
        const { value } = this;
        this.childrenList.forEach((child) => {
          child.model = value;

          if (picked) {
            child.currentValue = picked;
            child.group = true;
          }
        });
      }
    },
    change(data) {
      this.currentValue = data;
      this.$emit('input', data);
      this.$emit('on-change', data);
      this.dispatch('toyFormItem', 'on-form-change', data);
    },
  },
};
</script>

<style>

</style>
