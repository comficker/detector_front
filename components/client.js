import Vue from "vue";
import CalendarChart from "../components/CalendarChart";
import VueTippy, {TippyComponent} from "vue-tippy";

Vue.use(VueTippy);
Vue.component('CalendarChart', CalendarChart);
Vue.component("tippy", TippyComponent);
