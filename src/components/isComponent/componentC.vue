<template>
  <div>
    组件 C
  </div>
</template>
<script>
export default {
  name: 'componentC',
  mounted() {
    console.log('组件C创建了');
  },
  beforeDestroy() {
    console.log('组件C销毁了');
  },
};
</script>
