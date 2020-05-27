<template>
  <tr>
    <day
      v-for="(day, i) in week"
      :key="i"
      @select="() => $emit('select', day)"
      :is-disabled="getIsDisabled(day)"
      :is-selected="getIsSelected(day)"
      :is-today="getIsToday(day)"
    >
      {{ day }}
    </day>
  </tr>
</template>

<script>
import Day from "@/components/calendar/Day";
export default {
  name: "Week",
  components: {
    Day
  },
  props: {
    week: Array,
    getIsDisabled: Function,
    getIsSelected: Function,
    getIsToday: Function
  }
};
</script>

<style lang="scss" scoped></style>
