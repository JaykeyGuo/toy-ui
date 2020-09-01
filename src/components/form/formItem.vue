<template>
  <div>
    <label v-if="label" :class="{ 'toy-form-item-label-required': isRequired }">{{ label }}</label>
    <div>
      <slot></slot>
      <div v-if="validateState === 'error'" class="toy-form-item-message">
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import Emitter from '@/mixins/emitter';
import AsyncValidator from 'async-validator';

export default {
  name: 'toyFormItem',
  mixins: [Emitter],
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: '',
    },
    prop: {
      type: String,
    },
  },
  data() {
    return {
      isRequired: false,
      // initialValue: '',
      validateState: '',
      validateMessage: '',
    };
  },
  computed: {
    fieldValue() {
      return this.form.model[this.prop];
    },
  },
  mounted() {
    /*
      在这里调用的主要原因是：
      Vue的父子组件渲染的顺序是
      父(beforeMounted) => 父(mounted) => 子(beforeMounted) => 子(mounted)

      Vue中的组件渲染顺序是由内而外的，类似冒泡的顺序
      所以这里在子组件加载完成的时候吧子组件的实例给到父组件
    */
    if (this.prop) {
      this.dispatch('toyForm', 'on-form-item-add', this);
      this.initialValue = this.fieldValue;
      this.setRules();
    }
  },
  beforeDestroy() {
    this.dispatch('toyForm', 'on-form-item-remove', this);
  },
  methods: {
    setRules() {
      const rules = this.getRules();
      if (rules.length) {
        // eslint-disable-next-line array-callback-return
        rules.every((rule) => {
          this.isRequired = rule.required;
        });
      }

      this.$on('on-form-blur', this.onFieldBlur);
      this.$on('on-form-change', this.onFieldChange);
    },
    getRules() {
      let formRules = this.form.rules;
      formRules = formRules ? formRules[this.prop] : [];
      return [].concat(formRules || []);
    },
    getFilteredRule(trigger) {
      const rules = this.getRules();
      return rules.filter((rule) => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
    },
    // eslint-disable-next-line consistent-return
    validate(trigger, callback = () => {}) {
      // 这里使用nextTick优化对DOM的操作，这里可以更好的展示错误信息
      this.$nextTick(() => {
        const rules = this.getFilteredRule(trigger);

        if (!rules || rules.length === 0) {
          return true;
        }

        this.validateState = 'validating';

        const descriptor = {};
        descriptor[this.prop] = rules;

        const validator = new AsyncValidator(descriptor);
        const model = {};

        model[this.prop] = this.fieldValue;
        validator.validate(model, { firstFields: true }, (errors) => {
          this.validateState = !errors ? 'success' : 'error';
          this.validateMessage = errors ? errors[0].message : '';

          callback(this.validateMessage);
        });
        return false;
      });
    },
    onFieldBlur() {
      this.validate('blur');
    },
    onFieldChange() {
      this.validate('change');
    },
    resetFields() {
      this.validateState = '';
      this.validateMessage = '';
      this.form.model[this.prop] = this.initialValue;
    },
  },
};
</script>

<style lang="scss" scoped>
.toy-form-item-label-required:before {
  content: '*';
  color: red;
}
.toy-form-item-message {
  color: red;
}
</style>
