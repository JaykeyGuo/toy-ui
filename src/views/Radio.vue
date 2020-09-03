<template>
  <div>
    <h3>单项</h3>
    <toy-radio v-model="picked" label="first">单选1</toy-radio>
    <toy-radio v-model="picked" label="second">单选2</toy-radio>
    <br>
    <span>Picked: {{ picked }}</span>
    <br><br>

    <h3>多选一</h3>
    <toy-radio-group v-model="pickOne">
      <toy-radio label="option1">选项1</toy-radio>
      <toy-radio label="option2">选项2</toy-radio>
      <toy-radio label="option3">选项3</toy-radio>
      <toy-radio label="option4">选项4</toy-radio>
      <toy-radio label="option5">选项5</toy-radio>
    </toy-radio-group>
    <br>
    数据：{{ pickOne }}
  </div>
</template>

<script>
import toyRadioGroup from '@/components/radio/radioGroup.vue';
import toyRadio from '@/components/radio/radio.vue';

export default {
  name: 'Radio',
  components: {
    'toy-radio-group': toyRadioGroup,
    'toy-radio': toyRadio,
  },
  data() {
    return {
      picked: '',
      pickOne: 'option1',
    };
  },
};
</script>
