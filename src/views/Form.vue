<template>
  <div>
    <h3>一个有数据验证功能的表单组件 Toy-Form</h3>
    <toy-form ref="form" :model="formValidate" :rules="ruleValidate">
      <toy-form-item label="用户名" prop="name">
        <toy-input v-model="formValidate.name"></toy-input>
      </toy-form-item>
      <toy-form-item label="邮箱" prop="mail">
        <toy-input v-model="formValidate.mail"></toy-input>
      </toy-form-item>
    </toy-form>
    <button @click="handleSubmit">提交</button>
    <button @click="handleReset">重置</button>
  </div>
</template>

<script>
/* eslint-disable no-alert */
import toyForm from '@/components/form/form.vue';
import toyFormItem from '@/components/form/formItem.vue';
import toyInput from '@/components/input/input.vue';

export default {
  name: 'Form',
  components: {
    'toy-form': toyForm,
    'toy-form-item': toyFormItem,
    'toy-input': toyInput,
  },
  data() {
    return {
      formValidate: {
        name: '',
        mail: '',
      },
      ruleValidate: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
        ],
        mail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          window.alert('success');
        }
      }).catch((error) => {
        console.warn(error);
        window.alert(`failed${error}`);
      });
    },
    handleReset() {
      this.$refs.form.resetFields();
    },
  },
};
</script>

<style>

</style>
