<template>
  <div id="nav" class="flex center navigation-area-container">
    <div @click.self="homeRedirectionThread" class="flex row wrap center navigation-box">
      <p @click="homeRedirectionThread()" class="sfpro700 p-white">⚡tradertool.io</p>
      <div class="flex row wrap navigation-links-row">
        <router-link to="/lots-calculator">Lots calculator</router-link>
      </div>
    </div>
  </div>
  <router-view />
  <div id="footer" class="flex space-between wrap footer-area-container">
    <p class="sfpro500 p-white" @click="redirectSocialMedia">
      Fully created
      <span class="p-white15">with desire to use</span>
      by @sofly9700
      <span class="p-white15">(click to redirect)</span>
    </p>
    <p class="sfpro500 p-white15">
      USDT TRC-20:
      <span class="p-white" @click="clickToCopy('TKZvtZs7Tp1iUot5NGshVeuDpJ3VN8G9fu')">TKZvtZs7Tp1iUot5NGshVeuDpJ3VN8G9fu</span>
    </p>
  </div>
</template>

<script lang="ts">
import { clickToCopy } from "@/utils/click-to-copy";
import gsap from "gsap";
export default {
  mounted() {
    window.addEventListener("wheel", this.mousewheelGsapEvent);
  },
  methods: {
    clickToCopy,
    redirectSocialMedia() {
      window.open("https://t.me/sofly9700", "_blank");
    },
    homeRedirectionThread() {
      this.$router.push("/");
    },
    mousewheelGsapEvent(event: WheelEvent) {
      const nav = document.querySelector("#nav .navigation-box") as HTMLElement;
      const currentPadding = nav.style.padding || getComputedStyle(nav).padding;
      let value = 0.62;

      if (event.deltaY > 0) {
        value = Math.min(parseFloat(currentPadding) + 0.4, 1.2);
      } else {
        value = Math.max(parseFloat(currentPadding) - 0.4, 0.62);
      }

      gsap.to(nav, {
        duration: 0.5,
        padding: `0.62rem ${value}rem`,
        ease: "power2.inOut",
      });
    },
  },
};
</script>
