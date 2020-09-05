<template>
  <div>
    <button @click="handleChange('A')">显示 A 组件</button>
    <button @click="handleChange('B')">显示 B 组件</button>
    <button @click="handleChange('C')">显示 C 组件</button>

    <!-- keep-alive exclude 和 include 需要配合 组件的 name 属性一起使用 -->
    <keep-alive exclude="componentA" include="componentB" :max="2">
      <component :is="component"></component>
    </keep-alive>

    <div>
      <toy-button>普通按钮</toy-button>
      <br>
      <toy-button to="https://github.com">链接按钮</toy-button>
      <br>
      <toy-button to="https://github.com" target="_blank">新窗口打开链接按钮</toy-button>
    </div>
  </div>
</template>
<script>
import componentA from '@/components/isComponent/componentA.vue';
import componentB from '@/components/isComponent/componentB.vue';
import componentC from '@/components/isComponent/componentC.vue';

import toyButton from '@/components/isComponent/button.vue';

export default {
  components: { toyButton },
  data() {
    return {
      component: componentA,
    };
  },
  methods: {
    handleChange(component) {
      if (component === 'A') {
        this.component = componentA;
      } else if (component === 'B') {
        this.component = componentB;
      } else if (component === 'C') {
        this.component = componentC;
      }
    },
  },
};
</script>
