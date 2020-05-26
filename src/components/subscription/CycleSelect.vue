<template>
  <div class="cycle-select" :class="{ 'cycle-select--open': isOpen }">
    <a class="cycle-select__title-box" @click="toggle">
      <h1 class="cycle-select__title-box__title">
        {{ messages.title(productName) }}
      </h1>
      <div class="cycle-select__title-box__description">
        <span class="cycle-select__title-box__description__label">
          {{ messages.label }}
        </span>
        {{ messages.cycleDescription(bestCycle.name, bestCycle.unit) }}
        <img
          class="cycle-select__title-box__description__arrow"
          :class="{
            'cycle-select__title-box__description__arrow--open': isOpen
          }"
          alt="cycle arrow"
          :src="images.titleArrow"
          width="12"
        />
      </div>
    </a>
    <div class="cycle-select__option" ref="cycleOption">
      <a
        class="cycle-select__option-item"
        :class="{ 'cycle-select__option-item--on': cycle.id === 1 }"
        v-for="cycle in cycles"
        :key="cycle.id"
      >
        <img
          class="cycle-select__option-item-image"
          :alt="`${cycle.name}${cycle.unit} 배송 주기`"
          :src="cycle.icon.on"
          width="48"
        />
        <p class="cycle-select__option-item-message">
          {{ messages.cycleDescription(cycle.name, cycle.unit) }}
        </p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "CycleSelect",
  props: {
    productName: {
      type: String,
      default: ""
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.cycleOption.addEventListener(
        "transitionend",
        this.onTransitionEnd
      );
    });
  },
  beforeDestroy() {
    this.$refs.cycleOption.removeEventListener(
      "transitionend",
      this.onTransitionEnd
    );
  },
  data() {
    return {
      isOpen: false,
      messages: {
        title: name => `${name} 주기`,
        cycleDescription: (name, unit) => `${name}${unit}에 한 번`,
        label: "BEST"
      },
      images: {
        titleArrow: require("@/assets/images/cycle_arrow.png")
      },
      cycles: [
        {
          id: 1,
          name: 4,
          unit: "주",
          icon: {
            on: require("@/assets/images/cycle_1.png"),
            off: require("@/assets/images/cycle_1_disabled.png")
          }
        },
        {
          id: 2,
          name: 8,
          unit: "주",
          icon: {
            on: require("@/assets/images/cycle_2.png"),
            off: require("@/assets/images/cycle_2_disabled.png")
          }
        },
        {
          id: 3,
          name: 12,
          unit: "주",
          icon: {
            on: require("@/assets/images/cycle_3.png"),
            off: require("@/assets/images/cycle_3_disabled.png")
          }
        },
        {
          id: 4,
          name: 16,
          unit: "주",
          icon: {
            on: require("@/assets/images/cycle_3.png"),
            off: require("@/assets/images/cycle_3_disabled.png")
          }
        }
      ],
      bestCycle: {
        id: 2,
        name: 8,
        unit: "주",
        icon: {
          on: require("@/assets/images/cycle_2.png"),
          off: require("@/assets/images/cycle_2_disabled.png")
        }
      }
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    onTransitionEnd() {
      if (!this.isOpen) {
        this.$refs.cycleOption.style.display = "none";
      }
    }
  },
  watch: {
    isOpen(newVal) {
      setTimeout(() => {
        if (newVal) {
          this.$refs.cycleOption.style.display = "block";
          this.$refs.cycleOption.classList.add("cycle-select__option--open");
          this.$el.style.minHeight = `${this.$refs.cycleOption.clientHeight +
            this.$el.clientHeight}px`;
        } else {
          this.$refs.cycleOption.classList.remove("cycle-select__option--open");
          this.$el.style.minHeight = "0";
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.cycle-select {
  $box-height: 60px;
  margin-bottom: 10px;
  position: relative;
  min-height: 0;
  transition: min-height 600ms;
  &__title-box {
    height: $box-height;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 0 39px 0 18px;
    background-color: $very_light_grey;
    &__title {
      @include font(14px, 400, 1.4, -0.04em);
      color: $text_grey;
    }
    &__description {
      @include font(16px, 400, 1.3);
      color: $point2;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      position: relative;
      &__label {
        @include font(12px, 400, 1, -0.025em);
        color: $text_white;
        background-color: $point2;
        border-radius: 2px;
        padding: 3px 9px;
        margin-right: 10px;
        text-align: center;
      }
      &__arrow {
        position: absolute;
        right: -21px;
        bottom: 6px;
      }
      &__arrow--open {
        transform: rotate(180deg);
      }
    }
  }
  &__option {
    z-index: -1;
    position: absolute;
    width: 100%;
    opacity: 0;
    max-height: 0;
    visibility: hidden;
    display: none;
    transition: visibility 0s 800ms, opacity 800ms;
    &--open {
      z-index: 2;
      opacity: 1;
      max-height: 100vh;
      visibility: visible;
      transition: visibility 0s, opacity 800ms;
    }
    &-item {
      height: $box-height;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border-radius: 4px;
      box-sizing: border-box;
      padding: 0 39px 0 18px;
      border: 1px solid $light_light_grey;
      margin: 10px 0;
      &--on {
        border-color: $point1;
      }
      &-message {
        @include font(16px, 400, 1.3);
        color: $point2;
      }
    }
  }
}
</style>
