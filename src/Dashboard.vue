<template>
  <div id="main">
    <div id="barchart">
      <barChart></barChart>
    </div>
    <div id="psichart">
      <psi></psi>
    </div>
  </div>
</template>

<script>
import barChart from "./components/charts/BarChart.vue";
import psi from "./components/charts/PSILine.vue";

export default {
  components: {
    barChart,
    psi,
  },
};
</script>>


<style scoped>
</style>