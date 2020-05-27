<template>
  <div class="global-header">
    <header class="header" :style="{ height: `${height}px` }">
      <div class="header__grid">
        <slot name="grid-1"></slot>
      </div>
      <div class="header__grid">
        <slot name="grid-2"></slot>
      </div>
      <div class="header__grid">
        <slot name="grid-3"></slot>
      </div>
    </header>
    <top-modal ref="topModal" :headerHeight="height">
      <collapsible-cart-content />
    </top-modal>
  </div>
</template>

<script>
import TopModal from "@/components/common/TopModal.vue";
import CollapsibleCartContent from "@/components/collpasible-cart/Content.vue";

export default {
  name: "GlobalHeader",
  components: {
    TopModal,
    CollapsibleCartContent
  },
  data() {
    return {
      height: 60
    };
  }
};
</script>

<style lang="scss" scoped>
.global-header {
  .header {
    position: absolute;
    width: 100%;
    background-color: $white;
    z-index: 10;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-bottom: 1px solid $light_grey;
    &__grid {
      $padding: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:first-child {
        justify-content: flex-start;
        padding-left: $padding;
      }
      &:last-child {
        justify-content: flex-end;
        padding-right: $padding;
      }
    }
  }
}
</style>
