<template>
  <div class="cycle-select" :class="{ 'cycle-select--open': isOpen }">
    <a class="cycle-select__title-box" @click="toggle">
      <h1 class="cycle-select__title-box__title">
        {{ messages.title(item.name) }}
      </h1>
      <div class="cycle-select__title-box__description">
        <span
          class="cycle-select__title-box__description__label"
          v-if="bestCycle.id === selectedCycle.id"
        >
          {{ messages.label }}
        </span>
        {{ messages.cycleDescription(selectedCycle.value, selectedCycle.unit) }}
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
        :class="{
          'cycle-select__option-item--on': isSelected(cycle, selectedCycle)
        }"
        v-for="cycle in filteredCycles"
        :key="cycle.id"
        @click="() => select(item, cycle)"
      >
        <img
          class="cycle-select__option-item-image"
          :alt="`${cycle.value}${cycle.unit} 배송 주기`"
          :src="
            isSelected(cycle, selectedCycle) ? cycle.icon.on : cycle.icon.off
          "
          width="48"
        />
        <p class="cycle-select__option-item-message">
          {{ messages.cycleDescription(cycle.value, cycle.unit) }}
        </p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "CycleSelect",
  props: {
    item: Object,
    openItemId: Number,
    standardCycleValue: Number
  },
  created() {
    if (!this.item.cycle) {
      this.$emit("select", this.item, this.bestCycle);
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
  computed: {
    selectedCycle() {
      if (this.item.cycle) {
        return this.cycles.find(cycle => cycle.id === this.item.cycle.id);
      }
      return this.bestCycle;
    },
    filteredCycles() {
      if (this.standardCycleValue) {
        return this.cycles.reduce((filteredCycles, cycle) => {
          const isStandardValue = this.standardCycleValue === cycle.value;
          const isDoubledValue =
            filteredCycles.length &&
            filteredCycles[filteredCycles.length - 1].value * 2 === cycle.value;
          if (isStandardValue || isDoubledValue) {
            filteredCycles.push(cycle);
            return filteredCycles;
          }
          return filteredCycles;
        }, []);
      } else {
        return this.cycles;
      }
    }
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
          value: 4,
          unit: "주",
          icon: {
            on: require("@/assets/images/cycle_1.png"),
            off: require("@/assets/images/cycle_1_disabled.png")
          }
        },
        {
          id: 2,
          value: 8,
          unit: "주",
          icon: {
            on: require("@/assets/images/cycle_2.png"),
            off: require("@/assets/images/cycle_2_disabled.png")
          }
        },
        {
          id: 3,
          value: 12,
          unit: "주",
          icon: {
            on: require("@/assets/images/cycle_3.png"),
            off: require("@/assets/images/cycle_3_disabled.png")
          }
        },
        {
          id: 4,
          value: 16,
          unit: "주",
          icon: {
            on: require("@/assets/images/cycle_3.png"),
            off: require("@/assets/images/cycle_3_disabled.png")
          }
        },
        {
          id: 5,
          value: 24,
          unit: "주",
          icon: {
            on: require("@/assets/images/cycle_3.png"),
            off: require("@/assets/images/cycle_3_disabled.png")
          }
        }
      ],
      bestCycle: {
        id: 2,
        value: 8,
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
      if (!this.isOpen) {
        this.$emit("setOpenItemId", this.item.id);
      }
      this.isOpen = !this.isOpen;
    },
    close() {
      this.isOpen = false;
    },
    isSelected(cycle, selectedCycle) {
      return cycle.id === selectedCycle.id;
    },
    onTransitionEnd() {
      if (!this.isOpen) {
        this.$refs.cycleOption.style.display = "none";
      }
    },
    select(item, cycle) {
      this.$emit("select", item, cycle);
      this.close();
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
    },
    filteredCycles(newVal) {
      if (!newVal.find(cycle => cycle.value === this.selectedCycle.value)) {
        const cycle = newVal.find(
          cycle => cycle.value === this.standardCycleValue
        );
        this.select(this.item, cycle);
      }
    },
    openItemId(newVal) {
      if (newVal && newVal !== this.item.id && this.isOpen) {
        this.close();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.cycle-select {
  $box-height: 60px;
  $open-animation-duration: 500ms;
  margin-bottom: 10px;
  position: relative;
  min-height: 0;
  transition: min-height 400ms;
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
    position: absolute;
    width: 100%;
    opacity: 0;
    max-height: 0;
    visibility: hidden;
    display: none;
    transition: visibility 0s $open-animation-duration,
      opacity $open-animation-duration;
    &--open {
      z-index: 2;
      opacity: 1;
      max-height: 100vh;
      visibility: visible;
      transition: visibility 0s, opacity $open-animation-duration;
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
      background-color: $white;
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
