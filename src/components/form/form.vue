<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'toyForm',
  provide() {
    return {
      form: this,
    };
  },
  props: {
    model: {
      type: Object,
    },
    rules: {
      type: Object,
    },
  },
  data() {
    return {
      fields: [],
    };
  },
  created() {
    this.$on('on-form-item-add', (field) => {
      if (field) this.fields.push(field);
    });
    this.$on('on-form-item-remove', (field) => {
      if (field.prop) this.fields.splice(this.fields.indexOf(field), 1);
    });
  },
  methods: {
    resetFields() {
      this.fields.forEach((field) => {
        field.resetFields();
      });
    },
    validate(callback) {
      return new Promise((resolve, reject) => {
        let valid = true;
        let count = 0;
        this.fields.forEach((field) => {
          field.validate('', (errors) => {
            if (errors) {
              valid = false;
              reject(errors);
            }
            // eslint-disable-next-line no-plusplus
            if (++count === this.fields.length) {
              resolve(valid);
              if (typeof callback === 'function') {
                callback(valid);
              }
            }
          });
        });
      });
    },
  },
};
</script>
