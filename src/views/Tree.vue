<template>
  <div>
    <h3>Tree 树形组件</h3>

    <toy-tree
      :data="data"
      show-checkbox
      @on-toggle-expand="handleToggleExpand"
      @on-check-change="handleCheckChange"
    ></toy-tree>
  </div>
</template>

<script>
import ToyTree from '@/components/tree/tree.vue';

export default {
  name: 'Tree',
  components: { ToyTree },
  data() {
    return {
      data: [
        {
          title: 'parent 1',
          expand: true,
          children: [
            {
              title: 'parent 1-1',
              expand: true,
              children: [
                {
                  title: 'leaf 1-1-1',
                },
                {
                  title: 'leaf 1-1-2',
                },
              ],
            },
            {
              title: 'parent 1-2',
              children: [
                {
                  title: 'leaf 1-2-1',
                },
                {
                  title: 'leaf 1-2-1',
                },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleToggleExpand(data) {
      console.log(data);
    },
    handleCheckChange(data) {
      console.log(data);
    },
  },
};
</script>

<style>

</style>
