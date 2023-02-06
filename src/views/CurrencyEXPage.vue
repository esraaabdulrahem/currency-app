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
      <currency-dashboard
        v-for="(item, index) in currencyExchangeLists"
        :key="index"
        :isStock="false"
        :fromCurrencyName="item.fromCurrencyName"
        :toCurrencyName="item.toCurrencyName"
        :bidPrice="item.bidPrice"
        :askPrice="item.askPrice"
        :exchangeRate="item.exchangeRate"
      ></currency-dashboard>
    </div>
  </div>
</template>
  
<script>
import CurrencyDashboard from "@/components/GenericDashboard/CurrencyDashboard.vue";
import { GetCurrencyToExchange } from "../components/GenericDashboard/services.js";

export default {
  components: { CurrencyDashboard },
  name: "StockCurrencyDashboard",
  data() {
    return {
      from: "",
      to: "",
      key: "NZ71MBHG40D7BDZX", // static for now
      currencyExchangeLists: [],
    };
  },
  methods: {
    FXApiToModel(response) {
      //the api has no close so I used the pervious close instead
      return {
        toCurrencyName:
          response.data["Realtime Currency Exchange Rate"][
            "4. To_Currency Name"
          ],
        fromCurrencyName:
          response.data["Realtime Currency Exchange Rate"][
            "2. From_Currency Name"
          ],
        bidPrice:
          response.data["Realtime Currency Exchange Rate"]["8. Bid Price"],
        askPrice:
          response.data["Realtime Currency Exchange Rate"]["9. Ask Price"],
        exchangeRate:
          response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"],
      };
    },

    currencyExchange(from, to) {
      GetCurrencyToExchange(from, to, this.key).then((response) => {
        if (
          response.status == 200 &&
          Object.keys(response.data["Realtime Currency Exchange Rate"]).length >
            0
        ) {
          this.currencyExchangeLists.push(this.FXApiToModel(response));
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

