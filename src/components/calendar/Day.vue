<template>
  <td
    class="calendar__day"
    :class="{
      'calendar__day--today': isToday,
      'calendar__day--selected': isSelected
    }"
  >
    <button
      class="calendar__day-button"
      @click="$emit('select')"
      :disabled="isDisabled"
    >
      <p class="calendar__day-button-text">
        <slot></slot>
      </p>
    </button>
  </td>
</template>

<script>
export default {
  name: "Day",
  props: {
    isDisabled: Boolean,
    isSelected: Boolean,
    isToday: Boolean
  }
};
</script>

<style lang="scss" scoped>
.calendar__day {
  &-button {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    &:disabled {
      cursor: default;
      .calendar__day-button-text {
        color: $disabled-day;
      }
    }
    &-text {
      @include font(14px, 400, 1.4);
      color: $text_main;
      text-align: center;
    }
  }
  &--today {
    border-radius: 50%;
    border: 1.5px solid $point1;
  }
  &--selected {
    .calendar__day-button {
      $size: calc(100% - 4px);
      width: $size;
      height: $size;
      position: relative;
      background-color: $point1;
      border-radius: 50%;
      &-text {
        color: $white;
      }
    }
  }
}
</style>
