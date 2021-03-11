<template>
  <div>
    <ul>
      <li v-bind:key="order.id" v-for="order in orders">
        <p v-bind:key="item.id" v-for="(item, quantity) in order[1]">
          {{ quantity }} : {{ item }}
        </p>
        <button
          type="button"
          v-bind:id="order[0]"
          v-on:click="deleteItem($event)"
        >
          Delete
        </button>
        <button type="button" v-bind:id="order[0]" v-on:click="route($event)">
          Modify
        </button>
      </li>
    </ul>
  </div>
</template>


<script>
import database from "./firebase.js";

export default {
  data() {
    return {
      orders: [],
    };
  },

  created: function () {
    this.fetchItems();
  },

  methods: {
    fetchItems: function () {
      database
        .collection("orders")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            this.orders.push([doc.id, doc.data()]);
          });
        });
    },

    deleteItem: function (event) {
      let doc_id = event.target.getAttribute("id");
      database
        .collection("orders")
        .doc(doc_id)
        .delete()
        .then(() => location.reload());
      for (var i = 0; i < this.orders.length; i++) {
        if (doc_id === this.orders[i][0]) {
          this.orders.splice(i, 1);
        }
      }
    },

    route: function (event) {
      this.$router.push({
        name: "modify",
        params: { docid: event.target.getAttribute("id") },
      });
    },
  },
};
</script>



<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

button {
  width: 65px;
  height: 30px;
  background-color: darkred;
  color: white;
  border-radius: 10px;
  border-width: 1px;
}
</style>