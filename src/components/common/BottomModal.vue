<template>
  <div
    class="bottom-modal"
    :class="{ 'bottom-modal--show': isShow }"
    @touchmove.prevent
    @wheel.prevent
  >
    <div class="dimmed" @click="close"></div>
    <div class="content" :style="{bottom: !isShow ? `-${contentHeight}px` : 0}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BottomModal",
  mounted() {
    const [content] = this.$slots.default;
    this.contentHeight = content.elm.clientHeight;
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
    }
  }
};
</script>

<style lang="scss" scoped>
.bottom-modal {
  $animation_duration: 0.4s;
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
    transition: bottom $animation_duration;
  }

  &--show {
    visibility: visible;
    transition: visibility 0s;
    .dimmed {
      opacity: 0.6;
      transition: opacity $animation_duration;
    }
    .content {
      transition: bottom $animation_duration;
    }
  }
}
</style>
