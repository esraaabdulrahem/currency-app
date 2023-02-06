<template>
  <div id="app">
    <h2 class="generic-title">Welcome to Stock Ticker</h2>
    <div class="container">
      <div class="generic-tabs">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <router-link
              active-class="active"
              class="nav-link"
              aria-current="page"
              to="/stock"
              >Stock Prices
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              active-class="active"
              class="nav-link"
              to="/currencyEX"
            >
              Foreign Currency Exchange
            </router-link>
          </li>
        </ul>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

