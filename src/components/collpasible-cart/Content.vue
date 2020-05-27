<template>
  <div class="collapsible-cart__content">
    <div class="collapsible-cart__content__item" @touchmove.stop @wheel.stop>
      <item
        :item="item"
        v-for="item in selectedList"
        :key="item.id"
        :ref="`selectedItem-${item.id}`"
      />
    </div>
    <div
      class="collapsible-cart__content__info"
      @touchmove.prevent
      @wheel.prevent
    >
      <dl class="collapsible-cart__content__price">
        <dt class="collapsible-cart__content__price-title">
          {{ messages.shippingPrice }}
        </dt>
        <dd class="collapsible-cart__content__price-content">
          {{ messages.free }}
        </dd>
        <dt class="collapsible-cart__content__price-title">
          {{ messages.price }}
        </dt>
        <dd class="collapsible-cart__content__price-content">
          {{ $options.filters.currency(totalPrice) }}
        </dd>
        <dt
          class="collapsible-cart__content__price-title collapsible-cart__content__price-total"
        >
          {{ messages.totalPrice }}
        </dt>
        <dd
          class="collapsible-cart__content__price-content collapsible-cart__content__price-total"
        >
          {{ $options.filters.currency(totalPrice) }}
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import Item from "@/components/collpasible-cart/Item.vue";

export default {
  name: "CollapsibleCartContent",
  components: {
    Item
  },
  computed: {
    selectedList() {
      return this.$store.state.cart.selectedList.map(item => ({
        ...item,
        subscription:
          item.hasSubscription && item.cycle
            ? `${item.cycle.value}${item.cycle.unit} 마다`
            : "이번만 구매"
      }));
    },
    totalPrice() {
      return this.$store.getters["cart/totalPrice"];
    }
  },
  data() {
    return {
      messages: {
        shippingPrice: "배송비",
        price: "상품금액",
        totalPrice: "총 결제 예정 금액",
        free: "무료"
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.collapsible-cart__content {
  background-color: $white;
  &__item {
    max-height: 218px;
    overflow: scroll;
  }
  &__price {
    @include font(14px, 300, 1.4);
    color: $text_main;
    padding: 26px;
    &-title {
      float: left;
    }
    &-content {
      text-align: right;
      padding-top: 6px;
    }
    &-total {
      @include font(16px, 400, 1);
      color: $text_main;
      padding-top: 18px;
    }
  }
}
</style>
