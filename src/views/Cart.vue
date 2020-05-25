<template>
  <main class="cart">
    <div v-show="!count" class="cart__guide-empty" ref="guideEmpty">
      <p class="cart__guide-empty__message" v-html="messages.empty"></p>
    </div>
    <div v-show="count" class="cart__selected-item-list">
      <div
        class="cart__selected-item"
        v-for="item in selectedList"
        :key="item.id"
        :ref="`selectedItem-${item.id}`"
      >
        <item :item="item">
          <div class="cart__selected-item__control">
            <div class="cart__selected-item__control-button">
              <button class="remove-button" @click="() => remove(item)">
                <img alt="remove item" :src="images.remove" width="12" />
              </button>
            </div>
            <div class="cart__selected-item__control-input">
              <number-input
                :value="item.count"
                @add="() => addCount(item)"
                @sub="() => subCount(item)"
              />
            </div>
          </div>
        </item>
        <div class="product-divider"></div>
      </div>

      <dl class="cart__price">
        <dt class="cart__price-title cart__price-shipping">
          {{ messages.shippingPrice }}
        </dt>
        <dd class="cart__price-content cart__price-shipping">
          {{ messages.free }}
        </dd>
        <dt class="cart__price-title cart__price-total">
          {{ messages.totalPrice }}
        </dt>
        <dd class="cart__price-content cart__price-total">
          {{ $options.filters.currency(totalPrice) }}
        </dd>
      </dl>

      <div class="cart__order">
        <button class="cart__order-button">
          {{ messages.orderButtonName }}
        </button>
      </div>

      <div class="cart__shipping-guide">
        <p
          class="cart__shipping-guide__message"
          v-html="messages.shippingGuide"
        ></p>
      </div>
    </div>

    <div class="cart__product-list">
      <h1
        class="cart__product-list__title"
        v-if="count && count !== productList.length"
      >
        {{ messages.productListTile }}
      </h1>
      <div
        class="cart__product-list__item"
        v-for="item in productList"
        :key="item.id"
        ref="productListItem"
      >
        <item-box @click="() => item.onSelect(item)" :ref="`item-${item.id}`">
          <item :item="item" :show-label="true"></item>
        </item-box>
      </div>
    </div>
    <bottom-modal ref="razorSetOptionModal">
      <razor-select @select="select" :razor="razor" />
    </bottom-modal>
  </main>
</template>

<script>
import Item from "@/components/product/Item.vue";
import ItemBox from "@/components/product/ItemBox.vue";
import RazorSelect from "@/components/product/RazorSelect.vue";
import NumberInput from "@/components/common/NumberInput.vue";
import BottomModal from "@/components/common/BottomModal.vue";

export default {
  name: "Cart",
  components: {
    Item,
    ItemBox,
    NumberInput,
    BottomModal,
    RazorSelect
  },
  mounted() {
    this.selectedList.forEach(item => this.animatedIn(item, 0));
  },
  computed: {
    productList() {
      return this.$store.state.cart.productList.map(product => ({
        ...product,
        onSelect: product.hasOptionModal
          ? item => {
              this.razor = { ...item };
              this.$refs.razorSetOptionModal.show();
            }
          : item => this.select(item)
      }));
    },
    selectedList() {
      return this.$store.state.cart.selectedList;
    },
    count() {
      return this.$store.getters["cart/count"];
    },
    totalPrice() {
      return this.$store.getters["cart/totalPrice"];
    }
  },
  data() {
    return {
      razor: {},
      animationDuration: 800,
      images: {
        remove: require("@/assets/images/item_remove_btn.png")
      },
      messages: {
        empty: "장바구니가 비어있습니다<br />상품을 추가해주세요",
        productListTile: "함께하면 더 현명한 습관",
        shippingGuide:
          "1.5만원 이상 무료 배송<br />평일 16시 이전 주문 시 당일 출고",
        orderButtonName: "주문하기",
        shippingPrice: "배송비",
        totalPrice: "최종 결제 금액",
        free: "무료"
      }
    };
  },
  methods: {
    async select(item, selectedOptionId) {
      try {
        await this.$store.dispatch("cart/addItem", { ...item, selectedOptionId });
        if (this.$refs.razorSetOptionModal.isShow) {
          this.$refs.razorSetOptionModal.close();
        }
        this.animatedIn(item);
      } catch (e) {
        console.log(e);
      }
    },
    async remove(item) {
      try {
        this.animatedOut(item);
        await this.$store.dispatch("cart/removeItem", item);
      } catch (e) {
        this.animatedIn(item, 0);
        console.log(e);
      }
    },
    async addCount(item) {
      try {
        await this.$store.dispatch("cart/addCount", item);
      } catch (e) {
        console.log(e);
      }
    },
    async subCount(item) {
      try {
        await this.$store.dispatch("cart/subCount", item);
      } catch (e) {
        console.log(e);
      }
    },
    animatedIn(item, duration = this.animationDuration) {
      const [itemRef] = this.$refs[`item-${item.id}`];
      itemRef.$el.style.minWidth = `${itemRef.$el.clientWidth}px`;
      itemRef.$el.style.position = "absolute";
      itemRef.$el.style.opacity = "1";
      itemRef.$el.parentNode.style.paddingBottom = "0";
      this.$el.append(itemRef.$el);
      setTimeout(() => {
        const [selectedItemRef] = this.$refs[`selectedItem-${item.id}`];
        const endY = selectedItemRef.offsetTop + selectedItemRef.clientHeight;
        itemRef.$el.style.transform = `translateY(-${this.$el.clientHeight -
          endY}px)`;
        itemRef.$el.style.opacity = "0";
        itemRef.$el.style.pointerEvents = "none";
        itemRef.$el.style.transition = `transform ${duration}ms, opacity ${duration +
          100}ms`;
      });

      setTimeout(() => {
        const [selectedItemRef] = this.$refs[`selectedItem-${item.id}`];
        selectedItemRef.style.opacity = "1";
        itemRef.$el.style.visibility = "hidden";
      }, duration);
    },
    animatedOut(item) {
      const [itemRef] = this.$refs[`item-${item.id}`];
      itemRef.$el.style.transition = "";

      const productListEl = this.$refs.productListItem;
      const emptyGuideEl = this.$refs.guideEmpty;
      const originEl = productListEl[item.orderNo];
      originEl.appendChild(itemRef.$el);
      originEl.style.paddingBottom = "12px";
      originEl.style.height = `${itemRef.$el.clientHeight}px`;

      const [selectedItemRef] = this.$refs[`selectedItem-${item.id}`];
      const startY =
        this.selectedList.length > 1
          ? originEl.offsetTop -
            selectedItemRef.offsetTop -
            itemRef.$el.clientHeight
          : emptyGuideEl.clientHeight +
            (item.orderNo + 1) * itemRef.$el.clientHeight;
      itemRef.$el.style.transform = `translateY(-${startY}px)`;
      setTimeout(() => {
        itemRef.$el.style.transform = `translateY(0)`;
        itemRef.$el.style.visibility = "visible";
        itemRef.$el.style.opacity = "1";
        itemRef.$el.style.transition = `transform ${
          this.animationDuration
        }ms, opacity ${this.animationDuration - 100}ms`;
      });
      setTimeout(() => {
        originEl.style.height = "auto";
        itemRef.$el.style.position = "initial";
        itemRef.$el.style.pointerEvents = "auto";
      }, this.animationDuration);
    }
  }
};
</script>

<style lang="scss" scoped>
.cart {
  padding: 0 16px 36px;
  &__guide-empty {
    &__message {
      text-align: center;
      color: $text_main;
      @include font(18px, 300, 1.3);
      padding: 58px 0;
    }
  }
  &__selected-item-list {
    padding: 15px 0;
  }
  &__product-list {
    &__title {
      @include font(18px, 400, 1.3);
      color: $point2;
      padding: 46px 0 18px;
      text-align: center;
    }
    &__item {
      padding-bottom: 12px;
    }
  }
  &__selected-item {
    padding: 0 10px;
    opacity: 0;
    .product-divider {
      height: 1px;
      background-color: $light_light_grey;
      margin: 15px 0;
    }
    &__control {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: space-between;
      &-button {
        width: 28px;
        height: 24px;
        position: relative;
        top: 1px;
        left: 19px;
        .remove-button {
          width: 100%;
          height: 100%;
        }
      }
      &-input {
        position: relative;
        left: 12px;
        bottom: 12px;
      }
    }
  }
  &__order {
    width: 100%;
    height: 48px;
    &-button {
      @include button-filled();
    }
  }
  &__shipping-guide {
    &__message {
      @include font(14px, 400, 1.4);
      color: $text_sub;
      text-align: center;
      padding-top: 16px;
    }
  }
  &__price {
    @include font(16px, 400, 1.3);
    padding: 12px 10px;
    &-shipping {
      color: $text_sub;
      padding-bottom: 8px;
    }
    &-total {
      color: $text_main;
      padding-bottom: 8px;
    }
    &-title {
      float: left;
    }
    &-content {
      text-align: right;
    }
  }
}
</style>
