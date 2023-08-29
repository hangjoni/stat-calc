<template>
  <div class="home">
    <h3>A/B Test Calculator</h3>
    <Calculator />
  </div>
</template>

<script>
import Calculator from "../components/Calculator.vue";
export default {
  name: "HomeView",
  components: { Calculator },
};
</script>
