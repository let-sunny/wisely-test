import Vue from "vue";

Vue.filter("currency", (value, unit = "원") => {
  if (!value) return "0";
  const str = value.toString();
  return `${str.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")}${unit}`;
});
