<template>
  <div class="home">
    <global-header>
      <template #grid-1>
        <logo />
      </template>
      <template #grid-3>
        <collapsible-cart :count="3" />
      </template>
    </global-header>
    <global-header>
      <template #grid-1>
        <logo />
      </template>
      <template #grid-3>
        <collapsible-cart-icon />
      </template>
    </global-header>
    <global-header>
      <template #grid-2>
        <logo />
      </template>
    </global-header>
  </div>
</template>

<script>
import GlobalHeader from "@/components/header/index.vue";
import Logo from "@/components/header/Logo.vue";
import CollapsibleCart from "@/components/header/CollapsibleCart.vue";
import CollapsibleCartIcon from "@/components/header/CollapsibleCartIcon.vue";

export default {
  name: "Home",
  components: {
    CollapsibleCartIcon,
    GlobalHeader,
    Logo,
    CollapsibleCart
  }
};
</script>
