<template>
  <div
    class="top-modal"
    :class="{ 'top-modal--show': isShow }"
    @touchmove.prevent
    @wheel.prevent
  >
    <div class="dimmed" @click="close"></div>
    <div
      class="content"
      :style="{
        top: !isShow
          ? `-${getContentHeight() + headerHeight}px`
          : `${headerHeight}px`
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopModal",
  props: {
    headerHeight: Number
  },
  data() {
    return {
      isShow: false,
      contentHeight: 0
    };
  },
  methods: {
    show() {
      this.isShow = true;
    },
    close() {
      this.isShow = false;
    },
    toggle() {
      this.isShow = !this.isShow;
    },
    getContentHeight() {
      const [content] = this.$slots.default;
      return content.elm?.clientHeight;
    }
  },
  watch: {
    $route() {
      this.close();
    }
  }
};
</script>

<style lang="scss" scoped>
.top-modal {
  $animation_duration: 0.4s;
  z-index: 5;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  visibility: hidden;
  transition: visibility 0s $animation_duration;

  .dimmed {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: $black;
    opacity: 0;
    transition: opacity $animation_duration;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    transition: top $animation_duration;
    box-shadow: 0 4px 4px rgba($black, 0.4);
  }

  &--show {
    visibility: visible;
    transition: visibility 0s;
    .dimmed {
      opacity: 0.6;
      transition: opacity $animation_duration;
    }
    .content {
      transition: top $animation_duration;
    }
  }
}
</style>
