// 1- we will get the first sunday of this week and draw the very next 41 days
// inspired by windows 10 calendar

class CalendarController {
  /** @ngInject */
  constructor($http, $scope, moment, $log) {
    this.numberOfDaysShown = 42;
    this.moment = moment;
    this.$log = $log;
    $scope.today = moment();
    $scope.currentMonth = moment().month();
    $scope.currentYear = moment().year();
    $scope.monthYearText = moment().month($scope.currentMonth).year($scope.currentYear).format('MMMM YYYY');
    $scope.firstDayOfMonth = moment().date(1);
    $scope.firstSunday = this.getFirstSunday($scope.firstDayOfMonth);
    $scope.monthDays = this.getMonthDays($scope.firstSunday);
    $log.log($scope.monthDays);
    // $http
    //   .get('app/calendar/calendar.json')
    //   .then(response => {
    //     this.calendar = response.data;
    //   });
  }

  // get first sunday of a month
  getFirstSunday(firstDay) {
    return this.moment(firstDay).isoWeekday(0);
  }

  // get List of days for this month
  getMonthDays(firstSunday) {
    const arrayOfDays = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: []
    };
    let currrentWeek = 0;
    for (let index = 0; index < this.numberOfDaysShown; index++) {
      this.$log.log(currrentWeek);
      if (index / 7 >= currrentWeek + 1) {
        currrentWeek += 1;
      }
      arrayOfDays[currrentWeek].push(this.moment(firstSunday).add(index, 'd'));
    }
    return arrayOfDays;
  }
}

export const calendar = {
  template: require('./calendar.html'),
  controller: CalendarController
};
