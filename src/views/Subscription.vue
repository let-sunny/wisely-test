<template>
  <main class="subscription">
    <top-modal ref="topModal">
      <div style="width: 100%; height: 300px; background-color: white;"></div>
    </top-modal>
    <div class="body">
      <h1 class="subscription--title">{{ messages.title }}</h1>
      <div class="subscription--cycle">
        <cycle-select />
        <cycle-select />
        <cycle-select />
      </div>
      <div class="subscription--next">
        <button class="subscription--next-button" @click="show">
          {{ messages.nextButtonName }}
        </button>
      </div>
    </div>
    <div class="footer">
      <dl class="subscription__pay-day">
        <dt class="subscription__pay-day-title">
          {{ messages.nextPayday }}
        </dt>
        <dd
          class="subscription__pay-day-content subscription__pay-day-content--highlight"
        >
          {{ "12월 31일 월요일" }}
        </dd>
        <dt class="subscription__pay-day-title">
          {{ messages.futurePayday }}
        </dt>
        <dd class="subscription__pay-day-content">
          {{ "12월 31일 월요일" }}
        </dd>
      </dl>
    </div>
  </main>
</template>

<script>
import FullView from "@/mixins/full-view";

import CycleSelect from "@/components/subscription/CycleSelect.vue";
import TopModal from "@/components/common/TopModal.vue";

export default {
  name: "Subscription",
  mixins: [FullView],
  components: {
    CycleSelect,
    TopModal
  },
  props: {
    header: Object
  },
  data() {
    return {
      messages: {
        title: "배송 주기를 선택해주세요",
        nextButtonName: "다음",
        nextPayday: "다음 결제 예정일",
        futurePayday: "이후 결제 예정일"
      }
    };
  },
  methods: {
    show() {
      this.$refs.topModal.show();
    }
  }
};
</script>

<style lang="scss" scoped>
.subscription {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  height: 100%;
  &--title {
    @include font(26px, 300);
    color: $text_title;
    padding: 25px 0;
  }
  &--cycle {
    flex: 1;
  }
  &--next {
    z-index: 2;
    height: 52px;
    padding: 40px 0;
    &-button {
      @include button-filled();
    }
  }
  &__pay-day {
    &-title {
      @include font(14px, 300, 1.4);
      float: left;
      color: $text_sub;
    }
    &-content {
      @include font(16px, 400, 1.3);
      text-align: right;
      color: $text_main;
      padding-bottom: 6px;
      &--highlight {
        color: $point1;
      }
    }
  }
  .body {
    display: flex;
    flex-direction: column;
    overflow: scroll;
    padding: 0 16px;
  }
  .footer {
    padding: 22px 26px;
    background: $white;
    box-shadow: 0 -4px 4px rgba($black, 0.15);
  }
}
</style>
