<template>
  <td
    class="calendar__day"
    :class="{
      'calendar__day--today': isToday,
      'calendar__day--selected': isSelected,
      'calendar__day--disabled': isDisabled
    }"
  >
    <div class="calendar__day__box">
      <button
        class="calendar__day-button"
        @click="$emit('select')"
        :disabled="isDisabled"
      >
        <p class="calendar__day-button-text">
          <slot></slot>
        </p>
      </button>
    </div>
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
@mixin filled() {
  background-color: $point1;
  border-radius: 50%;
  p {
    color: $white;
  }
}

@mixin outline() {
  border-radius: 50%;
  border: 1.5px solid $point1;
}
.calendar__day {
  &__box {
    display: flex;
    justify-content: center;
  }
  &-button {
    $size: 32px;
    width: $size;
    height: $size;
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
    @include outline();
  }
  &--selected {
    .calendar__day-button {
      @include filled();
    }
  }

  &--selected:hover,
  &--today:hover {
    @include outline();
    .calendar__day-button {
      @include filled();
    }
  }
}
</style>
