/* eslint-disable no-unused-labels */
<template>
  <table>
    <thead>
      <tr>
        <th v-for="(col, colIndex) in columns" :key="Math.floor(Math.random() * colIndex * 10000)">
          {{ col.title }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in data" :key="Math.floor(Math.random() * rowIndex * 10000)">
        <td v-for="(col, colIndex) in columns" :key="Math.floor(Math.random() * colIndex * 10000)">
          <template v-if="'render' in col">
            <Render :row="row" :column="col" :index="rowIndex" :render="col.render"></Render>
          </template>
          <template v-else-if="'slot' in col">
            <!-- <slot :row="row" :column="col" :index="rowIndex" :name="col.slot"></slot> -->
            <slot-scope :row="row" :column="col" :index="rowIndex" :name="col.slot"></slot-scope>
          </template>
          <template v-else>
            {{ row[col.key] }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Render from './render';
import SlotScope from './slot';

export default {
  name: 'toyTableSlot',
  components: {
    Render,
    SlotScope,
  },
  provide() {
    // eslint-disable-next-line no-unused-expressions
    tableRoot: this;
  },
  props: {
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
table{
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  empty-cells: show;
  border: 1px solid #e9e9e9;
}
table th{
  background: #f7f7f7;
  color: #5c6b77;
  font-weight: 600;
  white-space: nowrap;
}
table td, table th{
  padding: 8px 16px;
  border: 1px solid #e9e9e9;
  text-align: left;
}
</style>
