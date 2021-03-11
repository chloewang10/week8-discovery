<template>
  <div id="itemsList">
    <ul>
      <li v-bind:key="item.id" v-for="item in items">
        <p id="itemName">{{ item.name }}</p>
        <br />
        <img v-bind:src="item.imageURL" />
        <br />
        <p id="price">${{ item.price }}</p>

        <qc v-on:counter="onCounter" v-bind:item="item"></qc>
      </li>
    </ul>
    <basket v-bind:itemsSelected="itemsSelected" id="shoppingBasket"></basket>
  </div>
</template>

<script>
import QuantityCounter from "./QuantityCounter.vue";
import Basket from "./Basket.vue";
import database from "./firebase.js";

export default {
  components: {
    qc: QuantityCounter,
    basket: Basket,
  },

  data() {
    return {
      itemsSelected: [],
      items: [],
    };
  },

  created: function () {
    this.fetchItems();
  },

  methods: {
    onCounter: function (item, count) {
      if (this.itemsSelected.length === 0 && count > 0) {
        //If there is nothing in items selected, push the ORDER in
        this.itemsSelected.push([item.name, count, item.price]);
      } else {
        // Loop through everything to check what is not in the basket
        for (let i = 0; i < this.itemsSelected.length; i++) {
          const curr_item = this.itemsSelected[i];
          const item_name = curr_item[0];

          // if item_name is the same as item.name and the count is more than 0,
          //update this.itemsSelected
          if (item_name === item.name && count > 0) {
            this.itemsSelected.splice(i, 1);

            this.itemsSelected.push([item.name, count, item.price]);

            return;
          }

          // Next, item_name is the same as item.name and the count is 0,
          //remove it from itemsSelected.
          else if (item_name === item.name && count === 0) {
            this.itemsSelected.splice(i, 1);

            return;
          }
        }
        this.itemsSelected.push([item.name, count, item.price]);
      }
    },

    fetchItems: function () {
      database
        .collection("menu")
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {
            console.log(doc.data());
            this.items.push(doc.data());
          });
        });
    },
  },
};
</script>

<style scoped>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
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
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}
</style>