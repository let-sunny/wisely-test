<template>
  <div id="app">
    <global-header>
      <template #grid-1 v-if="$route.meta.headerComponent">
        <component v-bind:is="$route.meta.headerComponent.left"></component>
      </template>
      <template #grid-2 v-if="$route.meta.headerComponent">
        <component v-bind:is="$route.meta.headerComponent.middle"></component>
      </template>
      <template #grid-3 v-if="$route.meta.headerComponent">
        <component v-bind:is="$route.meta.headerComponent.right"></component>
      </template>
    </global-header>
    <router-view />
  </div>
</template>

<script>
import GlobalHeader from "@/components/header/index.vue";

export default {
  name: "App",
  components: {
    GlobalHeader
  }
};
</script>

<style lang="scss">
@import "~@/assets/styles/reset.scss";
</style>
