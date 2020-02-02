import angular from 'angular';

import {
  calendar
} from './calendar';

export const calendarModule = 'calendar';

angular
  .module(calendarModule, [])
  .component('reservationCalendar', calendar);
