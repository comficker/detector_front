import Vue from "vue";
import CommentBox from "../components/CommentBox";

Vue.component('CommentBox', CommentBox);

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

Date.prototype.isNow = function () {
  const d = new Date();
  const date = new Date(this.valueOf());
  return date.getDate() === d.getDate() && date.getMonth() === d.getMonth() && date.getFullYear() === d.getFullYear();
}

Date.prototype.str = function () {
  return (
    `${monthNames[this.getMonth()]} ${this.getDate()}, ${this.getFullYear()}`
  )
}

Date.prototype.normalize = function () {
  const d = this.getDate()
  const m = this.getMonth() + 1
  return (
    `${this.getFullYear()}-${m < 10 ? "0" + m : m}-${d < 10 ? "0" + d : d}`
  )
}

Date.prototype.setZero = function () {
  this.setHours(0)
  this.setMinutes(0)
  this.setSeconds(0)
}


Vue.mixin({
  methods: {
    timeSince(dateStr, isCountdown = false) {
      const date = new Date(dateStr);
      const compareDate = new Date();
      let seconds = Math.floor((isCountdown ? date - compareDate : compareDate - date) / 1000);
      let isN = true;
      if (seconds < 0) {
        isN = false;
        seconds = 0 - seconds;
      }
      let interval = seconds / 31536000;
      if (interval > 1) {
        return Math.floor(interval) + " years " + (isN ? "left" : "ago");
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + " months " + (isN ? "left" : "ago");
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + " days " + (isN ? "left" : "ago");
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + " hours " + (isN ? "left" : "ago");
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + " minutes " + (isN ? "left" : "ago");
      }
      return Math.floor(seconds) + " seconds " + (isN ? "left" : "ago");
    },
  }
})
