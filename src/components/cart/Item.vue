<template>
  <div class="item">
    <div
      class="image"
      :style="{ backgroundImage: `url(${item.thumbnail})` }"
    ></div>
    <div class="item-info">
      <h6 class="item-info__name">{{ item.name }}</h6>
      <p class="item-info__description" v-html="item.description"></p>
      <p class="item-info__option">
        {{ $options.filters.currency(item.price) }}
        <span v-if="showLabel && item.isFreeShipping" class="item-info__option-label">
          무료배송
        </span>
      </p>
    </div>
    <div class="item-additional">
      <slot>
        <div class="item-additional__icon">
          <div class="circle">
            <img :src="images.plus" width="16" />
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: {
    item: {
      type: Object
    },
    showLabel: Boolean
  },
  data() {
    return {
      images: {
        plus: require("@/assets/images/cart/cart_plus_btn.png")
      }
    };
  }
};
</script>

<style scoped lang="scss">
.item {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px 12px 22px;
  width: 100%;
  .image {
    $image-size: 84px;
    width: $image-size;
    height: $image-size;
    background-size: $image-size;
  }
  .item-info {
    flex: 1;
    padding-left: 16px;
    height: 100%;
    &__name {
      @include font(16px);
    }
    &__description {
      @include font(12px);
      color: $text_sub;
      padding: 8px 0 13px;
    }
    &__option {
      @include font(14px, null, null, -0.04em);
      color: $point2;
      &-label {
        @include font(10px, null, null, -0.08em);
        border: 1px solid $point1;
        box-sizing: border-box;
        border-radius: 2px;
        padding: 1px 5px 2px;
        margin-left: 4px;
      }
    }
  }
  .item-additional {
    position: absolute;
    right: 16px;
    height: 100%;
    &__icon {
      height: 100%;
      display: flex;
      align-items: center;
      .circle {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background-color: $point1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
