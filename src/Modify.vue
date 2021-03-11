<template>
  <div>
    <ul>
      <li v-for="(quantity, name) in datapacket" :key="name">
        <p>{{ name }} : {{ quantity }}<br /></p>
        <input
          type="number"
          placeholder="0"
          min="0"
          max="10"
          id="name"
          v-model="datacopy[name]"
        />
      </li>
    </ul>
    <button type="button" v-on:click="updateOrder()">Update Order</button>
  </div>
</template>


<script>
import database from "./firebase.js";
export default {
  data() {
    return {
      datapacket: new Object(),
      docid: 0,
      nameList: [
        "Prawn omelette",
        "Dry Beef Hor Fun",
        "Sambal KangKung",
        "Pork Fried Rice",
        "Mapo Tofu",
        "Cereal Prawn",
      ],
      datacopy: Object.assign({}, this.datapacket),
      inputValue: new Object(),
    };
  },

  methods: {
    fetchItems: function () {
      this.docid = this.$route.params.docid;
      database
        .collection("orders")
        .doc(this.docid)
        .get()
        .then((snapshot) => {
          this.datapacket = snapshot.data();
        });
    },

    updateOrder: function () {
      this.docid = this.$route.params.docid;
      database
        .collection("orders")
        .doc(this.docid)
        .update(this.datacopy)
        .then(() => {
          this.$router.push({ path: "orders" });
        });
    },
  },

  created: function () {
    this.fetchItems();
  },
};
</script>


<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

button {
  width: 100px;
  height: 30px;
  background-color: darkred;
  color: white;
  border-radius: 10px;
  border-width: 1px;
}
</style>