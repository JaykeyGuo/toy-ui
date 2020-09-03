<template>
  <div>
    <h3>动态渲染 .vue 文件的组件—— Display</h3>

    <toy-display :code="code"></toy-display>
  </div>
</template>

<script>
import toyDisplay from '@/components/display/display.vue';
import defaultCode from './default-code';

export default {
  name: 'Display',
  components: {
    'toy-display': toyDisplay,
  },
  data() {
    return {
      code: defaultCode,
    };
  },
};
</script>

<style>

</style>
