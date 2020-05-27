<template>
  <div class="item">
    <div
      class="image"
      :style="{ backgroundImage: `url(${item.thumbnail})` }"
    ></div>
    <div class="item-info">
      <h6 class="item-info__name">{{ item.name }} - <span class="item-info__count">{{item.count}}개</span></h6>
      <p class="item-info__description" v-html="item.description"></p>
      <p class="item-info__option">
        {{ item.subscription }}
      </p>
    </div>
    <div class="item-info__price">
      <p class="price">{{ $options.filters.currency(item.price * item.count) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {};
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
  padding: 15px 26px 18px 29px;
  width: 100%;
  border-bottom: 1px solid $border_light_grey;
  .image {
    $image-size: 75px;
    width: $image-size;
    height: $image-size;
    background-size: $image-size;
  }
  .item-info {
    flex: 1;
    padding: 0 0 3px 16px;
    align-self: flex-end;
    &__name {
      @include font(16px);
    }
    &__count {
      color: $point1;
    }
    &__description {
      @include font(12px);
      color: $text_sub;
      padding: 6px 0 11px;
    }
    &__option {
      @include font(14px, null, null, -0.04em);
      color: $point1;
    }
    &__price {
      position: absolute;
      right: 26px;
      bottom: 22px;
      .price {
        @include font(14px, 400, 1.4);
      }
    }
  }
}
</style>
