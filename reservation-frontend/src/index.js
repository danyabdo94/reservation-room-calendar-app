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

import ngMaterial from 'angular-material';
import ngMessages from 'angular-messages';
// import HttpService from "./app/services/ReservationService";

angular
  .module('app', ['angularMoment', ngMaterial, ngMessages, calendarModule])
  // .service('HttpService', HttpService)
  .constant('serverIp', 'http://localhost:4100')
  .component('app', main)
  .component('reservationHeader', header)
  .component('reservationTitle', title)
  .component('reservationFooter', footer)
  .run(amMoment => {
    amMoment.changeLocale('en');
  });
