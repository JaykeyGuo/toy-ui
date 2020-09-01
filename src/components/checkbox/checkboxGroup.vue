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
  name: 'toyCheckboxGroup',
  mixins: [Emitter],
  props: {
    value: {
      type: Array,
      default() {
        return [];
      },
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
      this.updateModel(true);
    },
  },
  mounted() {
    this.updateModel(true);
  },
  methods: {
    updateModel(update) {
      this.childrenList = findComponentsDownward(this, 'toyCheckbox');
      if (this.childrenList) {
        const { value } = this;
        this.childrenList.forEach((child) => {
          child.model = value;

          if (update) {
            child.currentValue = value.indexOf(child.label) >= 0;
            child.group = true;
          }
        });
      }
    },
    change(data) {
      console.log(data);
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
