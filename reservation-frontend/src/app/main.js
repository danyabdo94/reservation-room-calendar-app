class MainController {
  /** @ngInject */
  constructor($http, $scope, $log, serverIp, moment) {
    $scope.currentDay = null;
    this.$log = $log;
    this.listOfReservations = [];
    this.$http = $http;
    this.serverIp = serverIp;
    this.moment = moment;
    $scope.selectedDay = null;
    $scope.reservation = {
      tennantName: null,
      time: null,
      reserved: false
    };

    $scope.$on('dayChanged', (event, day) => {
      $scope.selectedDay = day;

      // resetting
      $scope.reservation.reserved = false;
      $scope.reservation.tennantName = null;
      $scope.reservation.time = null;

      // if exist put in model
      this.listOfReservations.forEach(element => {
        if (moment(element.time * 1000).isSame(moment(day), 'day')) {
          $scope.reservation = element;
          $scope.reservation.reserved = true;
        }
      });

      // if not make a new model with just time ready to be saved
      if (!$scope.reservation.reserved) {
        $scope.reservation.time = moment(day).utc().hours(11).minutes(0).unix();
      }
    });

    $scope.$on('monthChanged', (event, month, year) => {
      this.$log.log(event, month, year);
      const fromDate = moment([year, month, 1, 0]).unix();
      const toDate = moment([year, month, 1, 0]).endOf('month').unix();

      this.$http.get(this.serverIp + '/reserve/' + fromDate + '/' + toDate)
        .then(data => {
          this.listOfReservations = data.data.reserved;
        }).catch(erro => {
          this.$log.log(erro);
        });
    });
  }

  // $http
  //   .get('app/calendar/calendar.json')
  //   .then(response => {
  //     this.calendar = response.data;
  //   });
}

export const main = {
  template: require('./main.html'),
  controller: MainController
};
