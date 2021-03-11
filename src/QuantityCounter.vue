<template>
  <div>
    <button type="button" v-on:click="decrease()">-</button>
    {{ counter }}
    <button type="button" v-on:click="increase()">+</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0,
    };
  },

  methods: {
    decrease: function () {
      if (this.counter == 0) {
        this.counter = 0;
      } else {
        this.counter -= 1;
      }

      this.$emit("counter", this.item, this.counter);
    },

    increase: function () {
      if (this.counter == 10) {
        alert("You cannot buy more than 10 items");
      } else {
        this.counter += 1;
      }

      this.$emit("counter", this.item, this.counter);
    },
  },

  props: ["item"],
};
</script>

<style scoped>
button {
  font-family: "Avenir", Arial, Helvetica, sans-serif;
  text-align: center;
  font-size: 25px;
  background-color: darkred;
  border-radius: 5px;
  padding: 12px;
  font-weight: bold;
  width: 60px;
  height: 60px;
  text-align: center;
}
div {
  font-size: 30px;
}
</style>

