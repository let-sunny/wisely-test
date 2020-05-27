<template>
  <div class="number-input">
    <div class="number-input__control">
      <button
        class="number-input__control--minus number-input__control-button"
        @click="$emit('sub')"
      ></button>
    </div>
    <div class="number-input__value">
      <p class="number">{{ value }}</p>
    </div>
    <div class="number-input__control">
      <button
        class="number-input__control--plus number-input__control-button"
        @click="$emit('add')"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NumberInput",
  props: {
    value: Number
  }
};
</script>

<style lang="scss" scoped>
.number-input {
  $size: 28px;
  display: flex;
  flex-direction: row;
  &__value {
    border-top: 1px solid $disabled;
    border-bottom: 1px solid $disabled;
    box-sizing: border-box;
    height: $size;
    min-width: $size;
    display: flex;
    justify-content: center;
    align-items: center;
    .number {
      @include font(12px, 400, 1, -0.04em);
    }
  }
  &__control {
    width: $size;
    height: $size;
    &-button {
      width: 100%;
      height: 100%;
      border: 1px solid $disabled;
      box-sizing: border-box;
      background-size: 6px;
      background-repeat: no-repeat;
      background-position: center;
    }
    $image-path: "~@/assets/images/cart/";
    &--plus {
      border-radius: 0 2px 2px 0;
      background-image: url("#{$image-path}input_control_plus.png");
    }
    &--minus {
      border-radius: 2px 0 0 2px;
      background-image: url("#{$image-path}input_control_minus.png");
    }
  }
}
</style>
