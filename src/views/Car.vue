<template>
  <div class="car">
    <span>车牌号</span>
    <car-input
      class="text-xx"
      v-model="carNo"
      energyBtnImg="@/assets/image/energyCar.jpg"
      :showDisplay="true"
    />
    <hr>
    {{ carNo }}
  </div>
</template>

<script>
import CarInput from '@/components/carKeyboard';

export default {
  name: 'Car',
  components: {
    CarInput,
  },
  data() {
    return {
      carNo: '皖GGHT',
    };
  },
};
</script>

<style>
.car {
  width: 100vw;
  display: flex;
}
.text-xx {
  width: 40vw;
  margin: 4vw;
  border: none;
}
</style>
