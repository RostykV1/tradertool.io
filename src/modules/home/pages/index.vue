<template>
  <div class="module-home-index-page flex column center">
    <div class="text-informations-box flex column center">
      <div class="main-text-box flex column">
        <p class="sfpro700 p-white title">
          Simple
          <span ref="text-type">free</span>
          trading tool, all-in-one
        </p>
        <p class="sfpro500 p-white subtitle">
          Easy tool to make your trading easier, we giving you
          <span>comfortable lots calculator, real-time prices, instructions to several prop-companies.</span>
        </p>
      </div>
      <div class="sub-text-box flex wrap center">
        <p class="sfpro500 p-white title">Our services:</p>
        <div class="tabs-box flex wrap">
          <div class="tab-item center">
            <router-link class="sfpro500 p-white" to="/lots-calculator">Lots calculator</router-link>
          </div>
        </div>
      </div>
    </div>
    <p class="sfpro400 p-white30 sub-info-text">Click on page to start your journey with us.</p>
  </div>
</template>

<script lang="ts">
import { textTyper } from "@/utils/text-typer";
import { gsap } from "gsap";

export default {
  data() {
    return {
      intervalEvent: null as NodeJS.Timeout,
    };
  },
  mounted() {
    this.pageReveal();
  },
  beforeUnmount() {
    clearInterval(this.intervalEvent);
  },
  methods: {
    pageReveal() {
      const elements = document.querySelectorAll(".text-informations-box > *, .sub-info-text");
      gsap.from(elements, {
        duration: 1,
        opacity: 0,
        y: 50,
        ease: "power2.inOut",
        stagger: 0.2,
      });

      const textType = this.$refs["text-type"] as HTMLElement;
      if (textType) textTyper(textType);
    },
  },
};
</script>

<style src="../css/home.scss" />
