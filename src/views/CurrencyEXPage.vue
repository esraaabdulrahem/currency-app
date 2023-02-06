<template>
  <div class="tab-content">
    <div class="tab-pane active" id="currencyX">
      <form
        class="generic-form-field"
        @submit.prevent="currencyExchange(from, to)"
      >
        <label class="generic-form-field__label" for="currency">from:</label>
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
</template>
  
<script>
import GenericDashboard from "../components/GenericDashboard/GenericDashboard.vue";
import { GetCurrencyToExchange } from "../components/GenericDashboard/services.js";

export default {
  components: { GenericDashboard },
  name: "StockCurrencyDashboard",
  data() {
    return {
      from: "",
      to: "",
      fromCurrencyName: "",
      toCurrencyName: "",
      bidPrice: "",
      askPrice: "",
      exchangeRate: "",
      key: "NZ71MBHG40D7BDZX", // static for now
      currencyExchangeLists: [],
    };
  },
  methods: {
    FXApiToModel() {
		
	},

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
    this.currencyExchange("usd", "egp");
  },
};
</script>

