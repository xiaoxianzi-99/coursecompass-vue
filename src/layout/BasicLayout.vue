<template>
  <GlobalHeader/>
  <router-view/>
  <GlobalFooter/>
</template>

<script setup>

import GlobalHeader from "@/components/GlobalHeader.vue";
import GlobalFooter from "@/components/GlobalFooter.vue";
</script>

<style scoped>
</style>