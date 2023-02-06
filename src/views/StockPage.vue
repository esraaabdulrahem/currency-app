<template>
  <div class="tab-content">
    <div class="tab-pane active" id="stockprices">
      <form class="generic-form-field" @submit.prevent="getStockPrice(symbol)">
        <input
          class="generic-form-field__input"
          type="text"
          v-model="symbol"
          placeholder="Please enter stock symbol"
        />
        <button class="generic-form-field__btn" type="submit">add stock</button>
      </form>
      <stock-dashboard
        v-for="(stock, index) in stocklist"
        :key="index"
        :isStock="true"
        :open="stock.open"
        :close="stock.close"
        :high="stock.high"
        :low="stock.low"
        :stockSymbol="stock.stockSymbol"
      ></stock-dashboard>
    </div>
  </div>
</template>

<script>
import StockDashboard from "@/components/GenericDashboard/StockDashboard.vue";
import { GetStockInfo } from "../components/GenericDashboard/services.js";

export default {
  components: { StockDashboard },
  name: "StockCurrencyDashboard",
  data() {
    return {
      symbol: "",
      key: "NZ71MBHG40D7BDZX", // static for now
      stocklist: [],
    };
  },
  methods: {
    stockApiToModel(response) {
      //the api has no close so I used the pervious close instead
      return {
        open: response.data["Global Quote"]["02. open"],
        close: response.data["Global Quote"]["08. previous close"],
        high: response.data["Global Quote"]["03. high"],
        low: response.data["Global Quote"]["04. low"],
        stockSymbol: response.data["Global Quote"]["01. symbol"],
      };
    },
    getStockPrice(symbol) {
      GetStockInfo(symbol, this.key).then((response) => {
        if (
          response.status == 200 &&
          Object.keys(response.data["Global Quote"]).length > 0
        ) {
          this.stocklist.push(this.stockApiToModel(response));
        } else {
          // we can handle error msg or toaster
        }
      });
    },
  },
  mounted() {
    this.getStockPrice("usd");
  },
};
</script>

