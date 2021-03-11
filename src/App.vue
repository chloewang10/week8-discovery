<template>
  <div id="app">
    <h1>God's Menu</h1>

    <div class="navbar">
      <nav>
        <ul id="navMain">
          <li id="navMain1"><router-link to="/" exact>Home</router-link></li>
          <li id="navMain2">
            <router-link to="/orders" exact>Orders</router-link>
          </li>
          <li id="navMain3">
            <router-link to="/dashboard" exact>Dashboard</router-link>
          </li>
        </ul>
      </nav>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {};
  },
};
</script>

<style>
h1 {
  color: ghostwhite;
  background-color: darkred;
  text-align: center;
}

#navMain {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
#navMain1 {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
#navMain2 {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
#navMain3 {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
</style>
