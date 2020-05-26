<template>
  <div id="app">
    <global-header ref="header">
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
    <div id="page" ref="page">
      <router-view />
    </div>
  </div>
</template>

<script>
import GlobalHeader from "@/components/header/index.vue";

export default {
  name: "App",
  components: {
    GlobalHeader
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.page.style.paddingTop = `${this.$refs.header.$el.querySelector('.header').clientHeight}px`;
    });
  }
};
</script>

<style lang="scss">
@import "~@/assets/styles/reset.scss";

#page {
  box-sizing: border-box;
}
</style>
