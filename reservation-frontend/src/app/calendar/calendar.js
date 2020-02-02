class CalendarController {
  /** @ngInject */
  // constructor($http) {
  //   $http
  //     .get('app/calendar/calendar.json')
  //     .then(response => {
  //       this.calendar = response.data;
  //     });
  // }
}

export const calendar = {
  template: require('./calendar.html'),
  controller: CalendarController
};
