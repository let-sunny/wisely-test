<template>
  <div class="razor-select">
    <h1 class="razor-select__title">{{ messages.title }}</h1>
    <div class="razor-select__option">
      <div
        class="razor-select__option-info"
        :class="{
          'razor-select__option-info--selected': selectedOption === item.id
        }"
        v-for="item in items"
        :key="item.id"
      >
        <img
          class="thumbnail"
          :alt="item.name"
          :src="item.thumbnail"
          height="67"
        />
        <p class="name" :class="`name--${item.color}`">{{ item.name }}</p>
      </div>
    </div>

    <div class="razor-select__radio">
      <div
        class="razor-select__radio-input"
        :class="`razor-select__radio-input--${item.color}`"
        v-for="item in items"
        :key="item.color"
      >
        <input
          type="radio"
          :id="item.color"
          name="color"
          :value="item.id"
          v-model="selectedOption"
        />
        <label :for="item.color">
          <span></span>
        </label>
      </div>
    </div>
    <div class="razor-select__selection">
      <button class="razor-select__selection-button">
        {{ messages.select }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "RazorOption",
  data() {
    return {
      selectedOption: 1,
      messages: {
        title: "면도기 색상을 선택해주세요",
        select: "선택하기"
      },
      items: [
        {
          id: 1,
          name: "미드나잇 네이비",
          color: "navy",
          thumbnail: require("@/assets/images/razor_navy.png")
        },
        {
          id: 2,
          name: "사파이어 블루",
          color: "blue",
          thumbnail: require("@/assets/images/razor_blue.png")
        },
        {
          id: 3,
          name: "슬레이트 그레이",
          color: "grey",
          thumbnail: require("@/assets/images/razor_grey.png")
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@mixin radio($color) {
  input[type="radio"] {
    display: inline-block;
    position: absolute;
    opacity: 0;
    $radio_size: 24px;
    + label {
      display: flex;
      align-items: center;
      cursor: pointer;
      span {
        display: block;
        box-sizing: border-box;
        width: $radio_size;
        height: $radio_size;
        min-width: $radio_size;
        min-height: $radio_size;
        cursor: pointer;
        border-radius: 50%;
        padding: 8px;
        background-color: $color;
      }
    }
    &:checked + label span {
      background-color: $color;
      position: relative;
      &:after {
        content: "";
        display: block;
        $size: 32px;
        box-sizing: border-box;
        width: $size;
        height: $size;
        border-radius: 50%;
        border: 1px solid $color;
        position: absolute;
        left: calc(#{$radio_size} * -0.25 + 2px);
        top: calc(#{$radio_size} * -0.25 + 2px);
      }
    }
  }
}
.razor-select {
  background-color: $white;
  width: 100%;
  height: 476px;
  padding: 24px 0 20px;
  display: flex;
  flex-direction: column;
  &__title {
    @include font(26px, 300);
    color: $text_main;
    padding: 0 16px;
  }
  &__option {
    width: 100%;
    flex: 1;
    position: relative;
    &-info {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      .thumbnail {
        display: block;
        padding-top: 107px;
        opacity: 0;
        transition: opacity 1.5s;
      }
      .name {
        @include font(14px, 400, 1.4);
        width: 100%;
        text-align: center;
        padding-bottom: 18px;
        opacity: 0;
        &--navy {
          color: $black;
        }
        &--blue {
          color: $dark-blue;
        }
        &--grey {
          color: $dark-grey;
        }
      }

      &--selected {
        .name,
        .thumbnail {
          opacity: 1;
        }
      }
    }
  }
  &__selection {
    height: 48px;
    padding: 0 16px;
    &-button {
      @include button-filled();
    }
  }

  &__radio {
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    left: 0;
    bottom: 120px;
    &-input {
      padding: 0 10px;
      &--grey {
        @include radio($disabled);
      }
      &--navy {
        @include radio($text_title);
      }
      &--blue {
        @include radio($blue);
      }
    }
  }
}
</style>
