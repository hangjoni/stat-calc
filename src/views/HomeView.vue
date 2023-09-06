<template>
  <div class="home">
    <h3>A/B Test Calculator</h3>
    <Calculator2 />
  </div>
</template>

<script>
import Calculator2 from "../components/Calculator2.vue";
export default {
  name: "HomeView",
  components: { Calculator2 },
};
</script>
