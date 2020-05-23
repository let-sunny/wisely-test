<template>
  <a class="box">
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: "ItemBox"
};
</script>

<style scoped lang="scss">
.box {
  display: block;
  background: $text_white;
  box-shadow: 0 0 12px rgba($black, 0.08);
  border-radius: 4px;
}
</style>
