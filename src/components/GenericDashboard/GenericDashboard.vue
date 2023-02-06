<template>
  <div class="container">
    <div class="generic-dashboard">
      <div v-if="isStock" class="generic-dashboard__container">
        <div class="row">
          <div class="col-md-6">
            <div
              class="generic-dashboard__current-num"
              :class="close > open ? '--green' : '--red'"
            >
              {{ close }}
              <p class="generic-dashboard__description">{{ stockSymbol }}</p>
            </div>
          </div>
          <div class="col-md-6">
            <ul class="generic-dashboard__variance">
              <li>Open:{{ open }}</li>
              <li>Close:{{ close }}</li>
              <li>High:{{ high }}</li>
              <li>Low:{{ low }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div v-if="!isStock" class="generic-dashboard__container">
        <h4>Realtime Currency Exchange Rate</h4>
        <div class="row">
          <div class="col-md-5">
            <p class="generic-dashboard__description">
              From: ({{ fromCurrencyName }}) ==> To: ({{ toCurrencyName }})
            </p>
          </div>
          <div class="col-md-7">
            <ul class="generic-dashboard__variance">
              <li>Exchange Rate:{{ exchangeRate }}</li>
              <li>Bid Price:{{ bidPrice }}</li>
              <li>Ask Price:{{ askPrice }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "open",
    "close",
    "high",
    "low",
    "stockSymbol",
    "isStock",
    "fromCurrencyName",
    "toCurrencyName",
    "bidPrice",
    "askPrice",
    "exchangeRate",
  ],
};
</script>