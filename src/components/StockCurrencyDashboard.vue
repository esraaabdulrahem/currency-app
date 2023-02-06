<template>
  <div class="container">
    <div class="generic-tabs">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a
            class="nav-link active"
            aria-current="page"
            href="#stockprices"
            data-bs-toggle="tab"
            >Stock Prices</a
          >
        </li>

        <li class="nav-item">
          <a class="nav-link" href="#currencyX" data-bs-toggle="tab">
            Foreign Currency Exchange
          </a>
        </li>
      </ul>
      <div class="tab-content">
        <div class="tab-pane active" id="stockprices">
          <form
            class="generic-form-field"
            @submit.prevent="getStockPrice(symbol)"
          >
            <input
              class="generic-form-field__input"
              type="text"
              v-model="symbol"
              placeholder="Please enter stock symbol"
            />
            <button class="generic-form-field__btn" type="submit">
              add stock
            </button>
          </form>
          <GenericDashboard
            v-for="(stock, index) in stocklist"
            :key="index"
            :isStock="true"
            :open="stock.open"
            :close="stock.close"
            :high="stock.high"
            :low="stock.low"
            :stockSymbol="stock.stockSymbol"
          ></GenericDashboard>
        </div>
        <div class="tab-pane" id="currencyX">
          <form
            class="generic-form-field"
            @submit.prevent="currencyExchange(from, to)"
          >
            <label class="generic-form-field__label" for="currency"
              >from:</label
            >
            <input
              id="currency"
              class="generic-form-field__input"
              type="text"
              v-model="from"
              placeholder="Please enter currency to convert"
            />
            <label for="convertedCurrency" class="generic-form-field__label"
              >to:</label
            >
            <input
              id="convertedCurrency"
              class="generic-form-field__input"
              type="text"
              v-model="to"
              placeholder="Please enter currency conversion"
            />
            <button class="generic-form-field__btn" type="submit">
              convert currency
            </button>
          </form>
          <GenericDashboard
            v-for="(item, index) in currencyExchangeLists"
            :key="index"
            :isStock="false"
            :fromCurrencyName="item.fromCurrencyName"
            :toCurrencyName="item.toCurrencyName"
            :bidPrice="item.bidPrice"
            :askPrice="item.askPrice"
            :exchangeRate="item.exchangeRate"
          ></GenericDashboard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GenericDashboard from "../components/GenericDashboard/GenericDashboard.vue";
import {
  GetStockInfo,
  GetCurrencyToExchange,
} from "./GenericDashboard/services.js";

export default {
  components: { GenericDashboard },
  name: "StockCurrencyDashboard",
  data() {
    return {
      from: "",
      to: "",
      symbol: "",
      fromCurrencyName: "",
      toCurrencyName: "",
      bidPrice: "",
      askPrice: "",
      exchangeRate: "",
      key: "NZ71MBHG40D7BDZX", // static for now
      stocklist: [],
      currencyExchangeLists: [],
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
    FXApiToModel() {},

    currencyExchange(from, to) {
      GetCurrencyToExchange(from, to, this.key).then((response) => {
        if (response.status == 200) {
          this.toCurrencyName =
            response.data["Realtime Currency Exchange Rate"][
              "4. To_Currency Name"
            ];
          this.fromCurrencyName =
            response.data["Realtime Currency Exchange Rate"][
              "2. From_Currency Name"
            ];
          this.bidPrice =
            response.data["Realtime Currency Exchange Rate"]["8. Bid Price"];
          this.askPrice =
            response.data["Realtime Currency Exchange Rate"]["9. Ask Price"];
          this.exchangeRate =
            response.data["Realtime Currency Exchange Rate"][
              "5. Exchange Rate"
            ];
          this.currencyExchangeLists.push({
            fromCurrencyName: this.fromCurrencyName,
            toCurrencyName: this.toCurrencyName,
            bidPrice: this.bidPrice,
            askPrice: this.askPrice,
            exchangeRate: this.exchangeRate,
          });
        } else {
          // we can handle error msg or toaster
        }
      });
    },
  },
  mounted() {
    this.getStockPrice("usd");
    this.currencyExchange("usd", "egp");
  },
};
</script>

