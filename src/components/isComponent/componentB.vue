<template>
  <div>
    组件 B
  </div>
</template>
<script>
export default {
  name: 'componentB',
  mounted() {
    console.log('组件B创建了');
  },
  beforeDestroy() {
    console.log('组件B销毁了');
  },
};
</script>
