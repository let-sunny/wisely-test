<template>
  <div class="calendar">
    <h1 class="calendar__title">{{ messages.title }}</h1>
    <div class="calendar__body">
      <table class="calendar__table">
        <caption class="calendar__table-caption">
          <div class="calendar__table-caption__box">
            <button
              class="calendar__table-caption__button calendar__table-caption__button--previous"
              :style="{ backgroundImage: `url(${images.arrow})` }"
              @click="previous"
            ></button>
            <h1 class="calendar__table-caption__title">
              {{ getFormattedMonth(standardDate) }}
            </h1>
            <button
              class="calendar__table-caption__button calendar__table-caption__button--next"
              :style="{ backgroundImage: `url(${images.arrow})` }"
              @click="next"
            ></button>
          </div>
        </caption>
        <thead>
          <tr>
            <th
              class="calendar__table__label"
              v-for="date in daysOfWeek"
              :key="date.getTime()"
            >
              <p class="calendar__table__label-text">{{ geDayName(date) }}</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <week
            v-for="(week, i) in getWeeks(totalCells)"
            :key="i"
            :week="week"
            :get-is-disabled="getIsDisabled"
            :get-is-selected="getIsSelected"
            :get-is-today="getIsToday"
            @select="select"
          />
        </tbody>
      </table>
    </div>
    <div class="calendar__submit">
      <button class="calendar__submit-button" :disabled="!selectedDate">
        {{
          selectedDate
            ? messages.submitButtonName(getFormattedDate(selectedDate))
            : messages.disabledSubmitButtonName
        }}
      </button>
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";
import ko from "date-fns/locale/ko";
import setDay from "date-fns/setDay";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import getDaysInMonth from "date-fns/getDaysInMonth";
import startOfMonth from "date-fns/startOfMonth";
import getDay from "date-fns/getDay";
import setDate from "date-fns/setDate";
import isBefore from "date-fns/isBefore";
import addDays from "date-fns/addDays";
import addMonths from "date-fns/addMonths";
import isSameDay from "date-fns/isSameDay";
import isSameMonth from "date-fns/isSameMonth";

import Week from "@/components/calendar/Week";
export default {
  name: "Calendar",
  components: {
    Week
  },
  created() {},
  computed: {
    totalCells() {
      if (this.standardDate) {
        return [
          ...this.getBlanks(this.standardDate),
          ...this.getDays(this.standardDate)
        ];
      } else {
        return [];
      }
    }
  },
  data() {
    return {
      messages: {
        title: "결제일을 설정해주세요",
        disabledSubmitButtonName: "확인",
        submitButtonName: date => `${date}에 결제하기`
      },
      images: {
        arrow: require("@/assets/images/cycle/calendar_arrow.png")
      },
      standardDate: addDays(new Date(), 1),
      selectedDate: null,
      tomorrow: addDays(new Date(), 1),
      daysOfWeek: eachDayOfInterval({
        start: setDay(new Date(), 0),
        end: setDay(new Date(), 6)
      })
    };
  },
  methods: {
    geDayName(date) {
      return format(date, "E", { locale: ko });
    },
    getDays(date) {
      return new Array(getDaysInMonth(date))
        .fill(undefined)
        .map((_, i) => i + 1);
    },
    getBlanks(date) {
      return new Array(getDay(startOfMonth(date))).fill("");
    },
    getWeeks(days) {
      return days.reduce((weeks, day, index) => {
        const i = Math.floor(index / 7);
        const week = weeks[i] || [];
        week.push(day);
        weeks[i] = week;
        return weeks;
      }, []);
    },
    getDate(day) {
      return setDate(this.standardDate, day);
    },
    getIsDisabled(day) {
      if (day) {
        const date = this.getDate(day);
        return !(
          isBefore(date, addMonths(this.tomorrow, 6)) &&
          isBefore(new Date(), date)
        );
      }
      return true;
    },
    getIsToday(day) {
      if (day) {
        return isSameDay(this.getDate(day), new Date());
      }
      return false;
    },
    getIsSelected(day) {
      if (day) {
        return (
          isSameMonth(this.getDate(day), this.selectedDate) &&
          isSameDay(this.getDate(day), this.selectedDate)
        );
      }
      return false;
    },
    getFormattedDate(date) {
      return format(date, "MMMM do", { locale: ko });
    },
    getFormattedMonth(date) {
      return format(date, "yyyy년 MMMM", { locale: ko });
    },
    select(day) {
      this.selectedDate = this.getDate(day);
    },
    previous() {
      this.standardDate = addMonths(this.standardDate, -1);
    },
    next() {
      this.standardDate = addMonths(this.standardDate, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.calendar {
  background-color: $white;
  padding: 26px 16px 40px;
  &__title {
    @include font(26px, 300);
    color: $text_title;
  }
  &__body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__table {
    table-layout: fixed;
    width: 270px;
    border-spacing: 0;
    vertical-align: middle;
    /deep/ th,
    /deep/ td {
      $size: 38px;
      width: $size;
      height: $size;
      max-width: $size;
      max-height: $size;
      box-sizing: border-box;
      padding: 0;
    }
    &-caption {
      padding: 38px 12px 24px;
      &__box {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      &__title {
        @include font(20px, 400, 1.3);
        color: $text_main;
      }
      &__button {
        $width: 7px;
        $height: 14px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: $width $height;
        &--previous {
          transform: rotate(180deg);
        }
      }
    }
    &__label {
      &-text {
        @include font(14px, 400, 1.4);
        color: $text_main;
        text-align: center;
      }
    }
  }
  &__submit {
    height: 48px;
    padding: 24px 0 0;
    &-button {
      @include button-filled();
    }
  }
}
</style>
