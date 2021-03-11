<template>
  <div>
    <p>Menu:</p>
    <ul>
      <li v-bind:key="menu" v-for="menu in itemsSelected">
        <p>{{ menu[0] }} x {{ menu[1] }}</p>
      </li>
    </ul>

    <button type="button" v-on:click="findTotal(), sendOrder()">
      Calculate Total
    </button>
    <p>Subtotal: ${{ subtotal }}</p>
    <p>Grand Total: ${{ grandtotal }}</p>
  </div>
</template>

<script>
import database from "./firebase.js";

export default {
  props: ["itemsSelected"],

  data() {
    return {
      totalamt: 0,
      nameList: [
        "Prawn omelette",
        "Dry Beef Hor Fun",
        "Sambal KangKung",
        "Pork Fried Rice",
        "Mapo Tofu",
        "Cereal Prawn",
      ],
      orderList: {},
    };
  },

  methods: {
    findTotal: function () {
      this.totalamt = 0;
      for (var i = 0; i < this.itemsSelected.length; i++) {
        this.totalamt += this.itemsSelected[i][2] * this.itemsSelected[i][1];
      }

      return this.totalamt.toFixed(2);
    },

    sendOrder: function () {
      this.orderList = {};

      for (var i = 0; i < this.itemsSelected.length; i++) {
        this.orderList[this.itemsSelected[i][0]] = this.itemsSelected[i][1];
      }

      for (var j = 0; j < this.nameList.length; j++) {
        if (this.nameList[j] in this.orderList) {
          continue;
        } else {
          this.orderList[this.nameList[j]] = 0;
        }
      }

      database
        .collection("orders")
        .add(this.orderList)
        .then(() => location.reload());
    },
  },

  computed: {
    subtotal: function () {
      return this.totalamt.toFixed(2);
    },
    grandtotal: function () {
      return (this.totalamt * 1.07).toFixed(2);
    },
  },
};
</script>

<style scoped>
button {
  font-family: "Avenir", Arial, Helvetica, sans-serif;
  text-align: center;
  background-color: darkred;
  border-radius: 5px;
  text-align: center;
  color: white;
  font-weight: bold;
}
</style>