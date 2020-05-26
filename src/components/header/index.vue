<template>
  <header class="global-header">
    <div class="global-header__grid">
      <slot name="grid-1"></slot>
    </div>
    <div class="global-header__grid">
      <slot name="grid-2"></slot>
    </div>
    <div class="global-header__grid">
      <slot name="grid-3"></slot>
    </div>
  </header>
</template>

<script>
export default {
  name: "GlobalHeader"
};
</script>

<style lang="scss" scoped>
.global-header {
  position: fixed;
  width: 100%;
  background-color: $white;
  z-index: 10;
  display: grid;
  padding: 0 16px;
  grid-template-columns: repeat(3, 1fr);
  height: 60px;
  border-bottom: 1px solid $light_grey;
  &__grid {
    display: flex;
    align-items: center;
    justify-content: center;
    &:first-child {
      justify-content: flex-start;
    }
    &:last-child {
      justify-content: flex-end;
    }
  }
}
</style>
