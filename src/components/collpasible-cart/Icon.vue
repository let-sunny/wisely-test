<template>
  <div class="collapsible-cart__icon">
    <p v-if="count" class="collapsible-cart__icon-count">{{ count }}</p>
    <img
      v-if="count"
      class="collapsible-cart__icon-image--on"
      alt="cart on"
      :src="images.cartOn"
      height="48"
    />
    <img
      v-else
      class="collapsible-cart__icon-image--off"
      alt="cart off"
      :src="images.cartOff"
      height="48"
    />
  </div>
</template>

<script>
export default {
  name: "CollapsibleCartIcon",
  props: {
    count: Number
  },
  data() {
    return {
      images: {
        cartOn: require("@/assets/images/cart_on.png"),
        cartOff: require("@/assets/images/cart_off.png")
      }
    };
  }
};
</script>

<style scoped lang="scss">
.collapsible-cart__icon {
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  &-count {
    position: absolute;
    top: 10px;
    right: 16px;
    @include font(12px, 400, 1, -0.04em);
    color: $point3;
  }
}
</style>
