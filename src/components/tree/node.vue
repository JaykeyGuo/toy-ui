<template>
  <ul class="tree-ui">
    <li class="tree-li">
      <span class="tree-expend" @click="handleExpand">
        <span v-if="data.children && data.children.length && !data.expand">+</span>
        <span v-if="data.children && data.children.length && data.expand">-</span>
      </span>
      <toy-checkbox
        v-if="showCheckbox"
        :value="data.checked"
        @input="handleCheck"
      ></toy-checkbox>
      <span>{{ data.title }}</span>
      <template v-if="data.expand">
        <tree-node
          v-for="(item, index) in data.children"
          :key="index"
          :data="item"
          :show-checkbox="showCheckbox"
        ></tree-node>
      </template>
    </li>
  </ul>
</template>

<script>
import { findComponentUpward } from '@/utils/assist';
import toyCheckbox from '@/components/checkbox/checkbox.vue';

export default {
  name: 'TreeNode',
  components: { toyCheckbox },
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
    showCheckbox: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tree: findComponentUpward(this, 'ToyTree'),
    };
  },
  watch: {
    'data.children': {
      handler(data) {
        if (data) {
          const checkedAll = !data.some((item) => !item.checked);
          this.$set(this.data, 'checked', checkedAll);
        }
      },
      deep: true,
    },
  },
  methods: {
    handleExpand() {
      this.$set(this.data, 'expand', !this.data.expand);

      if (this.tree) {
        this.tree.emitEvent('on-toggle-expand', this.data);
      }
    },
    handleCheck(checked) {
      this.updateTreeDown(this.data, checked);

      if (this.tree) {
        this.tree.emitEvent('on-check-change', this.data);
      }
    },
    updateTreeDown(data, checked) {
      this.$set(data, 'checked', checked);

      if (data.children && data.children.length) {
        data.children.forEach((item) => {
          this.updateTreeDown(item, checked);
        });
      }
    },
  },
};
</script>

<style>
.tree-ui, .tree-li {
  list-style: none;
  padding-left: 10px;
}
.tree-expand {
  cursor: pointer;
}
</style>
