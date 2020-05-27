<template>
  <main class="subscription">
    <div class="body">
      <h1 class="subscription__title">{{ messages.title }}</h1>
      <div class="subscription__cycle">
        <cycle-select
          v-for="item in selectedList"
          :key="item.id"
          :item="item"
          :open-item-id="openItemId"
          :standard-cycle-value="
            item.id !== standardItem.id ? standardCycleValue : null
          "
          @select="select"
          @setOpenItemId="setOpenItemId"
        />
      </div>
      <div class="subscription__next">
        <button class="subscription__next-button" @click="openCalendar">
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
          {{ getFormattedDate(tomorrow) }}
        </dd>
        <dt class="subscription__pay-day-title">
          {{ messages.futurePayday }}
        </dt>
        <dd class="subscription__pay-day-content">
          {{ getFormattedDate(futurePayDate) }}
        </dd>
      </dl>
    </div>
    <bottom-modal ref="calendar">
      <calendar />
    </bottom-modal>
  </main>
</template>

<script>
import { format } from "date-fns";
import ko from "date-fns/locale/ko";
import addDays from "date-fns/addDays";
import addWeeks from "date-fns/addWeeks";
import FullView from "@/mixins/full-view";

import CycleSelect from "@/components/subscription/CycleSelect.vue";
import BottomModal from "@/components/common/BottomModal.vue";
import Calendar from "@/components/calendar/index.vue";

export default {
  name: "Subscription",
  mixins: [FullView],
  components: {
    CycleSelect,
    BottomModal,
    Calendar
  },
  computed: {
    selectedList() {
      return this.$store.state.cart.selectedList.filter(
        item => item.hasSubscription
      );
    },
    standardItem() {
      return this.$store.state.cart.selectedList.find(
        item => item.isSubscriptionStandard
      );
    },
    standardCycleValue() {
      return this.standardItem?.cycle?.value;
    },
    futurePayDate() {
      return addWeeks(this.tomorrow, this.standardItem?.cycle?.value || 0);
    }
  },
  data() {
    return {
      messages: {
        title: "배송 주기를 선택해주세요",
        nextButtonName: "다음",
        nextPayday: "다음 결제 예정일",
        futurePayday: "이후 결제 예정일"
      },
      openItemId: null,
      tomorrow: addDays(new Date(), 1)
    };
  },
  methods: {
    async select(item, cycle) {
      try {
        await this.$store.dispatch("cart/selectSubscriptionCycle", {
          item,
          cycle
        });
      } catch (e) {
        console.log(e);
      }
    },
    setOpenItemId(id) {
      this.openItemId = id;
    },
    getFormattedDate(date) {
      return format(date, "MMMM do EEEE", { locale: ko });
    },
    openCalendar() {
      this.$refs.calendar.show();
    }
  }
};
</script>

<style lang="scss" scoped>
.subscription {
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  height: 100%;
  &__title {
    @include font(26px, 300);
    color: $text_title;
    padding: 25px 0;
  }
  &__cycle {
    flex: 1;
  }
  &__next {
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
    z-index: 2;
    padding: 22px 26px;
    background: $white;
    box-shadow: 0 -4px 4px rgba($black, 0.15);
  }
}
</style>
