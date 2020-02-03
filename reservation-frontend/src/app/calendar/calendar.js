// 1- we will get the first sunday of this week and draw the very next 41 days
// inspired by windows 10 calendar

class CalendarController {
  /** @ngInject */
  constructor($http, $scope, moment, $log) {
    $scope.arrayOfSevenElements = [0, 1, 2, 3, 4, 5, 6];
    this.numberOfDaysShown = 42;
    this.moment = moment;
    this.$log = $log;
    this.$scope = $scope;
    this.reservations = [];
    $scope.today = moment();
    $scope.currentMonth = moment().month();
    $scope.currentYear = moment().year();
    $scope.monthYearText = moment().month($scope.currentMonth).year($scope.currentYear).format('MMMM YYYY');
    $scope.firstDayOfMonth = moment().date(1);
    $scope.firstSunday = this.getFirstSunday($scope.firstDayOfMonth);
    $scope.monthDays = this.getMonthDays($scope.firstSunday);

    $scope.dayClicked = day => {
      $scope.$emit('dayChanged', day);
    };
    $scope.inReservationList = day => this.inReservationList(day);

    $scope.$on('reservationsList', (event, data) => {
      this.reservations = data;
    });

    $scope.next = () => {
      $scope.firstDayOfMonth.add(1, 'month');
      $scope.firstSunday = this.getFirstSunday($scope.firstDayOfMonth);
      $scope.monthDays = this.getMonthDays($scope.firstSunday);
      $scope.currentMonth = moment($scope.firstDayOfMonth).month();
      $scope.currentYear = moment($scope.firstDayOfMonth).year();
      $scope.monthYearText = moment().month($scope.currentMonth).year($scope.currentYear).format('MMMM YYYY');
    };
    $scope.prev = () => {
      $scope.firstDayOfMonth.subtract(1, 'month');
      $scope.currentMonth = moment($scope.firstDayOfMonth).month();
      $scope.currentYear = moment($scope.firstDayOfMonth).year();
      $scope.firstSunday = this.getFirstSunday($scope.firstDayOfMonth);
      $scope.monthDays = this.getMonthDays($scope.firstSunday);
    };
    $scope.$watch(() => $scope.currentMonth, newValue => {
      $log.log(newValue);
      if (newValue) {
        this.$scope.$emit('monthChanged', newValue, this.$scope.currentYear);
      }
    });
    // NG Class for not in month and is reserved styles
    $scope.isSameDay = day => {
      const objectReturned = {
        'not-in-month': day.month() !== $scope.currentMonth,
        circle: this.inReservationList(day)
      };
      return objectReturned;
    };
  }

  inReservationList(day) {
    let foundObject = null;
    this.reservations.forEach(element => {
      if (this.moment(element.time * 1000).isSame(this.moment(day), 'day')) {
        foundObject = element;
      }
    });
    return foundObject;
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
