<template>
  <div>
    组件 A
  </div>
</template>
<script>
export default {
  name: 'componentA',
  mounted() {
    console.log('组件A创建了');
  },
  beforeDestroy() {
    console.log('组件A销毁了');
  },
};
</script>
