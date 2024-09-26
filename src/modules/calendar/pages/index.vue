<template>
  <div class="module-lots-calculator-index-page center">
    <div class="page-inner-container flex column center">
      <div class="inner-container-box flex column center">
        <div class="inputs-boxes flex column center">
          <p class="sfpro700 p-white title" ref="titleelement">Lots calculator</p>

          <div class="value-input-row flex wrap center">
            <p class="sfpro500 p-white input-title">Account currency:</p>
            <div class="tabs flex wrap center">
              <div class="tab center" :class="{ active: value === accountCurrency }" @click="accountCurrency = value" v-for="value in currencies" :key="value">
                <p class="sfpro400 p-white75" v-text="value"></p>
              </div>
            </div>
          </div>
          <div class="value-input-row flex wrap center">
            <p class="sfpro500 p-white input-title">Account size:</p>
            <div class="tabs flex wrap center">
              <div class="tab center" :class="{ active: value === accountBalance }" @click="accountBalance = value" v-for="value in pageConfig.accountBalances" :key="value">
                <p class="sfpro400 p-white75" v-text="transformToCurrency(value, false, accountCurrency)"></p>
              </div>
              <input class="sfpro400 p-white" placeholder="Account size" v-model="accountBalance" type="number" />
            </div>
          </div>
          <div class="value-input-row flex wrap center">
            <p class="sfpro500 p-white input-title">Risk percent:</p>
            <div class="tabs flex wrap center">
              <div class="tab center" :class="{ active: value === riskPercentage }" @click="riskPercentage = value" v-for="value in pageConfig.risksPercentages" :key="value">
                <p class="sfpro400 p-white75">{{ value }}%</p>
              </div>
              <input class="sfpro400 p-white" placeholder="Account size" v-model="riskPercentage" type="number" />
            </div>
          </div>
          <div class="value-input-row flex wrap center">
            <p class="sfpro500 p-white input-title">Price format:</p>
            <div class="tabs flex wrap center">
              <div class="tab center" :class="{ active: value === pipValue }" @click="pipValue = value" v-for="(value, index) in pageConfig.pipValues" :key="value">
                <p class="sfpro400 p-white75">{{ pageConfig.priceFormats[index] }}</p>
              </div>
              <!-- <input class="sfpro400 p-white" placeholder="Pip value" v-model="pipValue" type="number" /> -->
            </div>
          </div>
          <div class="value-input-row flex wrap center">
            <p class="sfpro500 p-white input-title">Stop loss (pips):</p>
            <div class="tabs flex wrap center">
              <input class="sfpro400 p-white" placeholder="Pips" v-model="stopLossPips" type="number" />
            </div>
          </div>
        </div>
        <div class="results-row flex wrap center">
          <div class="result-box flex column">
            <!-- <p class="sfpro500 p-white75 box-title">Lots:</p> -->
            <div class="row clickable" @click="clickToCopy(lotSize.standard)">
              <p class="sfpro500 p-white35">
                Standard:
                <span class="p-white">{{ spaceOrganizer(lotSize.standard) }}</span>
              </p>
            </div>
            <div class="row clickable" @click="clickToCopy(lotSize.mini)">
              <p class="sfpro500 p-white35">
                Mini:
                <span class="p-white">{{ spaceOrganizer(lotSize.mini) }}</span>
              </p>
            </div>
            <div class="row clickable" @click="clickToCopy(lotSize.units)">
              <p class="sfpro500 p-white35">
                Units:
                <span class="p-white">{{ spaceOrganizer(lotSize.units) }}</span>
              </p>
            </div>
          </div>
          <div class="result-box flex column">
            <div class="row">
              <p class="sfpro500 p-white35">
                Risk amount:
                <span class="p-white">{{ transformToCurrency(riskAmount) }}</span>
              </p>
            </div>
            <div class="row">
              <p class="sfpro500 p-white35">
                Position size:
                <span class="p-white">{{ transformToCurrency(lotSize.units) }}</span>
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
      stopLossPips: 10 as number,
      pipValue: 0 as number,
    };
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
  computed: {
    lotSize() {
      const units = (this.accountBalance * this.riskPercentage) / (this.stopLossPips * this.pipValue);
      return {
        units: Number(Math.max(1, Math.min(this.accountBalance * this.accountBalance, units)).toFixed(0)),
        mini: Number(Math.max(0.01, Math.min(100000, units / 10000)).toFixed(2)),
        standard: Number(Math.max(0.01, Math.min(10000, units / 100000)).toFixed(2)),
      };
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
};
</script>

<style src="../css/lots-calculator.scss" />
