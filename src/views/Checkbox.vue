<template>
  <div>
    <h3>单项</h3>
    <toy-checkbox v-model="single">单选</toy-checkbox>
    <br>
    数据：{{ single }}
    <br><br>

    <h3>多选</h3>
    <toy-checkbox-group>
      <toy-checkbox label="option1">选项1</toy-checkbox>
      <toy-checkbox label="option2">选项2</toy-checkbox>
      <toy-checkbox label="option3">选项3</toy-checkbox>
      <toy-checkbox label="option4">选项4</toy-checkbox>
      <toy-checkbox label="option5">选项5</toy-checkbox>
    </toy-checkbox-group>
    <br>
    数据：{{ multiple }}
  </div>
</template>

<script>
import toyCheckBoxGroup from '@/components/checkbox/checkboxGroup.vue';
import toyCheckBox from '@/components/checkbox/checkbox.vue';

export default {
  name: 'Checkbox',
  components: {
    'toy-checkbox-group': toyCheckBoxGroup,
    'toy-checkbox': toyCheckBox,
  },
  data() {
    return {
      single: false,
      multiple: ['option1'],
    };
  },
};
</script>
