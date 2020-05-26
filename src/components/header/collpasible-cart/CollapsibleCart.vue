<template>
  <div class="collapsible-cart">
    <a class="collapsible-cart__toggle" @click="toggleModal">
      <collapsible-cart-icon :count="count" />
      <p class="collapsible-cart__amount">
        ₩{{ $options.filters.currency(totalPrice, "") }}
      </p>
      <div class="collapsible-cart__arrow">
        <img alt="wisely cart arrow" :src="images.cartArrow" width="16" />
      </div>
    </a>
  </div>
</template>

<script>
import CollapsibleCartIcon from "@/components/header/collpasible-cart/CollapsibleCartIcon.vue";

export default {
  name: "CollapsibleCart",
  components: {
    CollapsibleCartIcon
  },
  computed: {
    count() {
      return this.$store.getters["cart/count"];
    },
    totalPrice() {
      return this.$store.getters["cart/totalPrice"];
    }
  },
  data() {
    return {
      images: {
        cartArrow: require("@/assets/images/cart_arrow.png")
      }
    };
  },
  methods: {
    toggleModal() {
      this.$parent.$refs.topModal.toggle();
    }
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
    @include font(12px, 300, 1, -0.025em);
    padding-left: 6px;
  }
  &__arrow {
    padding-left: 6px;
  }
}
</style>
