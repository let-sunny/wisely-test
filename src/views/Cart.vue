<template>
  <div class="cart-container">
    <global-header>
      <template #grid-2>
        <logo />
      </template>
    </global-header>
    <main class="cart">
      <div v-if="!count" class="cart__guide--empty">
        <p class="cart__guide--empty__message" v-html="messages.empty"></p>
      </div>
      <div v-else class="cart__guide--filled">
        <div class="cart__selected-product-list">
          <item :item="items[0]">
            <div class="cart__selected-product-list__control">
              <div class="cart__selected-product-list__control-button">
                <button class="remove-button">
                  <img alt="remove item" :src="images.remove" width="12" />
                </button>
              </div>
              <div class="cart__selected-product-list__control-input">
                <number-input />
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
          <dd class="cart__price-content cart__price-total">8900원</dd>
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
        <h1 class="cart__product-list__title">
          {{ messages.productListTile }}
        </h1>
        <div
          class="cart__product-list__item"
          v-for="item in items"
          :key="item.id"
        >
          <item-box>
            <item :item="item"></item>
          </item-box>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import GlobalHeader from "@/components/header/index.vue";
import Logo from "@/components/header/Logo.vue";
import Item from "@/components/product/Item.vue";
import ItemBox from "@/components/product/ItemBox.vue";
import NumberInput from "@/components/common/NumberInput.vue";

export default {
  name: "Cart",
  components: {
    GlobalHeader,
    Logo,
    Item,
    ItemBox,
    NumberInput
  },
  data() {
    return {
      count: 4,
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
      },
      items: [
        {
          id: 1,
          name: "면도기 세트",
          options: [
            {
              name: "미드나잇 네이비"
            },
            {
              name: "사파이어 블루"
            },
            {
              name: "슬레이트 그레이"
            }
          ],
          description: "면도기 핸들+면도날 2개입",
          price: "8900",
          isFreeShipping: true,
          thumbnail: require("@/assets/images/item_razor_set.png")
        },
        {
          id: 2,
          name: "리필 면도날",
          options: [],
          description: "면도날 4개입",
          price: "9600",
          isFreeShipping: false,
          thumbnail: require("@/assets/images/item_blade.png")
        },
        {
          id: 3,
          name: "쉐이빙 젤",
          options: [],
          description: "스탠다드 150ml",
          price: "4500",
          isFreeShipping: false,
          thumbnail: require("@/assets/images/item_shaving_gel.png")
        },
        {
          id: 4,
          name: "리페어 애프터쉐이브",
          options: [],
          description: "스탠다드 60ml",
          price: "3900",
          isFreeShipping: false,
          thumbnail: require("@/assets/images/item_aftershave.png")
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.cart {
  padding: 0 16px 36px;
  &__guide {
    &--empty__message {
      text-align: center;
      color: $text_main;
      @include font(18px, 300, 1.3);
      padding: 58px 0;
    }
    &--filled {
      padding: 15px 0;
    }
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
  &__selected-product-list {
    padding: 0 10px;
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
