import angular from 'angular';

import {
  calendarModule
} from './app/calendar/index';

import {
  main
} from './app/main';
import {
  header
} from './app/header';
import {
  title
} from './app/title';
import {
  footer
} from './app/footer';

import './index.scss';
require('angular-moment');

angular
  .module('app', ['angularMoment', calendarModule])
  .component('app', main)
  .component('reservationHeader', header)
  .component('reservationTitle', title)
  .component('reservationFooter', footer)
  .run(amMoment => {
    amMoment.changeLocale('en');
  });
