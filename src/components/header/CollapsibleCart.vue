<template>
  <div class="collapsible-cart">
    <a class="collapsible-cart__toggle">
      <collapsible-cart-icon :count="count" />
      <p class="collapsible-cart__amount">₩13,500</p>
      <div class="collapsible-cart__arrow">
        <img alt="wisely cart arrow" :src="images.cartArrow" width="16" />
      </div>
    </a>
  </div>
</template>

<script>
import CollapsibleCartIcon from "@/components/header/CollapsibleCartIcon.vue";

export default {
  name: "CollapsibleCart",
  props: {
    count: Number
  },
  components: {
    CollapsibleCartIcon
  },
  data() {
    return {
      images: {
        cartArrow: require("@/assets/images/cart_arrow.png")
      }
    };
  }
};
</script>

<style scoped lang="scss">
.collapsible-cart {
  &__toggle {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &__amount {
    @include font(12px, 300, 1, -0.0025em);
    padding-left: 6px;
  }
  &__arrow {
    padding-left: 6px;
  }
}
</style>
