<template>
  <div class="generic-dashboard">
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
</template>

<script>
export default {
  props: [
    "isStock",
    "fromCurrencyName",
    "toCurrencyName",
    "bidPrice",
    "askPrice",
    "exchangeRate",
  ],
};
</script>