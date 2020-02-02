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

angular
  .module('app', [calendarModule])
  .component('app', main)
  .component('reservationHeader', header)
  .component('reservationTitle', title)
  .component('reservationFooter', footer);
