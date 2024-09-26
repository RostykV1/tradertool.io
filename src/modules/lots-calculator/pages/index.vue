<template>
  <div class="module-lots-calculator-index-page center">
    <div class="page-inner-container flex column center">
      <div class="inner-container-box flex column center">
        <div class="inputs-boxes flex column center">
          <p ref="titleelement" class="sfpro700 p-white title">Lots calculator</p>
          <div class="value-input-row flex wrap center">
            <p class="sfpro500 p-white input-title">Currency:</p>
            <div class="tabs flex wrap center">
              <div v-for="value in currencies" :key="value" class="tab center" :class="{ active: value === accountCurrency }" @click="accountCurrency = value">
                <p class="sfpro400 p-white75" v-text="value"></p>
              </div>
            </div>
          </div>
          <div class="value-input-row flex wrap center">
            <p class="sfpro500 p-white input-title">Account size:</p>
            <div class="tabs flex wrap center">
              <div v-for="value in pageConfig.accountBalances" :key="value" class="tab center" :class="{ active: value === accountBalance }" @click="accountBalance = value">
                <p class="sfpro400 p-white75" v-text="transformToCurrency(value, false, accountCurrency)"></p>
              </div>
              <input v-model="accountBalance" class="sfpro400 p-white" placeholder="Account size" type="number" />
            </div>
          </div>
          <div class="value-input-row flex wrap center">
            <p class="sfpro500 p-white input-title">Risk percent:</p>
            <div class="tabs flex wrap center">
              <div v-for="value in pageConfig.risksPercentages" :key="value" class="tab center" :class="{ active: value === riskPercentage }" @click="riskPercentage = value">
                <p class="sfpro400 p-white75">{{ value }}%</p>
              </div>
              <input v-model="riskPercentage" class="sfpro400 p-white" placeholder="Account size" type="number" />
            </div>
          </div>
          <div class="value-input-row flex wrap center">
            <p class="sfpro500 p-white input-title">pipValues:</p>
            <div class="tabs flex wrap center">
              <div v-for="(value, index) in pageConfig.pipValues" :key="value" class="tab center" :class="{ active: value === valuePerPip }" @click="valuePerPip = value">
                <p class="sfpro400 p-white75">{{ pageConfig.pipValues[index] }}</p>
              </div>
            </div>
          </div>
          <div class="value-input-row flex wrap center">
            <p class="sfpro500 p-white input-title">Stop loss (pips):</p>
            <div class="tabs flex wrap center">
              <input v-model="stopLossPips" class="sfpro400 p-white" placeholder="Pips" type="number" />
            </div>
          </div>
        </div>
        <div class="results-row flex wrap center">
          <div class="result-box flex column">
            <div class="row">
              <p class="sfpro500 p-white35">
                Risk amount:
                <span class="p-white">{{ transformToCurrency(riskAmount, false, accountCurrency) }}</span>
              </p>
            </div>
            <div class="row">
              <p class="sfpro500 p-white35">
                Position size:
                <span class="p-white">{{ lotsAmount.toFixed(2) }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <p class="sfpro400 p-white25">Click on white value to copy it</p>
    </div>
  </div>
</template>

<script lang="ts">
import { clickToCopy } from "@/utils/click-to-copy";
import { spaceOrganizer, transformToCurrency } from "@/utils/numberTransformers";
import { Currencies, currencies, CurrencyPairs, currencyPairs } from "@/utils/shared";
import { textTyper } from "@/utils/text-typer";
import * as pageConfig from "../config.json";

export default {
  data() {
    return {
      pageConfig,
      currencies,
      currencyPairs,

      accountCurrency: "USD" as Currencies,
      currencyPair: "" as CurrencyPairs,

      accountBalance: 10000 as number,
      riskPercentage: 1 as number,
      stopLossPips: 5 as number,
      valuePerPip: 1 as number,
    };
  },
  computed: {
    lotsAmount() {
      const accountBalance = this.accountBalance;
      const riskPercentage = this.riskPercentage / 100;
      const stopLossPips = this.stopLossPips;

      const lotSize = (accountBalance * riskPercentage) / (stopLossPips * this.valuePerPip);

      return lotSize;
    },
    riskAmount() {
      const riskAmount = this.accountBalance * (this.riskPercentage / 100);

      return Math.min(riskAmount, this.accountBalance);
    },
  },
  watch: {
    riskPercentage() {
      this.riskPercentage = Math.min(100, Math.max(0, this.riskPercentage));
    },
    accountBalance() {
      this.accountBalance = Math.min(5000000, Math.max(0, this.accountBalance));
    },
  },
  mounted() {
    this.revealPage();
  },
  methods: {
    clickToCopy,
    spaceOrganizer,
    transformToCurrency,
    revealPage() {
      const el = this.$refs.titleelement as HTMLElement;
      textTyper(el);
    },
  },
};
</script>

<style src="../css/lots-calculator.scss" />
