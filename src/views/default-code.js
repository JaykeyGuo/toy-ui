const code = `<template>
  <div class="test">
    <input v-model="message">
    {{ message }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: ''
    }
  }
}
</script>
<style>
.test {
  color: red;
}
</style>`;

export default code;
