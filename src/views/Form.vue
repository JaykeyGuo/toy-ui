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
      <!-- <toy-form-item label="单选" prop="isAwesome">
        <toy-checkbox v-model="formValidate.isAwesome">
          单选
        </toy-checkbox>
      </toy-form-item> -->
      <toy-form-item label="多选" prop="multiple">
        <toy-checkbox-group v-model="formValidate.multiple">
          <toy-checkbox label="option1">选项1</toy-checkbox>
          <toy-checkbox label="option2">选项2</toy-checkbox>
          <toy-checkbox label="option3">选项3</toy-checkbox>
          <toy-checkbox label="option4">选项4</toy-checkbox>
          <toy-checkbox label="option5">选项5</toy-checkbox>
        </toy-checkbox-group>
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
import toyCheckbox from '@/components/checkbox/checkbox.vue';
import toyCheckboxGroup from '@/components/checkbox/checkboxGroup.vue';

export default {
  name: 'Form',
  components: {
    'toy-form': toyForm,
    'toy-form-item': toyFormItem,
    'toy-input': toyInput,
    'toy-checkbox': toyCheckbox,
    'toy-checkbox-group': toyCheckboxGroup,
  },
  data() {
    return {
      formValidate: {
        name: '',
        mail: '',
        // isAwesome: false,
        multiple: [],
      },
      ruleValidate: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
        ],
        mail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' },
        ],
        // isAwesome: [
        //   { required: true, message: '你不优秀吗？', trigger: 'change' },
        // ],
        multiple: [
          {
            type: 'array', required: true, message: '你不优秀吗？', trigger: 'change',
          },
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
