class MainController {
  /** @ngInject */
  constructor($http, $scope, $log, serverIp, moment, $mdToast) {
    $scope.currentDay = null;
    this.$log = $log;
    this.$mdToast = $mdToast;
    this.listOfReservations = [];
    this.$http = $http;
    this.serverIp = serverIp;
    this.moment = moment;
    $scope.loading = false;

    $scope.selectedDay = null;
    $scope.reservation = {
      tennantName: null,
      time: null,
      reserved: false
    };

    $scope.$on('dayChanged', (event, day) => {
      $scope.selectedDay = day;
      // this.$http.get(this.serverIp + '/now')
      //   .then(data => {
      //     $log.log(data);
      //     $log.log();
      //   }).catch(erro => {
      //     this.$log.log(erro);
      //   });

      // resetting
      $scope.reservation.reserved = false;
      $scope.reservation.tennantName = null;
      $scope.reservation.time = null;

      // if exist put in model
      this.listOfReservations.forEach(element => {
        if (moment(element.time * 1000).isSame(moment(day), 'day')) {
          $scope.reservation.tennantName = element.tennantName;
          $scope.reservation.time = element.time;
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

    $scope.save = () => {
      $scope.loading = true;
      const tempData = angular.copy($scope.reservation);
      this.$log.log(tempData.time);
      tempData.time = moment($scope.selectedDay).utc().hours(11).minutes(0).unix();
      tempData.reserved = true;
      this.$http.post(this.serverIp + '/reserve/', tempData)
        .then(() => {
          $scope.reservation.reserved = true;
          $scope.loading = false;
        }).catch(erro => {
          this.$log.log(erro);
          $scope.loading = false;
          $mdToast.show(
              $mdToast.simple()
              .textContent(erro.data)
              .hideDelay(3000))
            .then(() => {
              $log.log('Toast dismissed.');
            }).catch(() => {
              $log.log('Toast failed or was forced to close early by another toast.');
            });
        });
    };

    $scope.getFromUnixToStringDateFormat = date => {
      return moment(date * 1000).format('DD/MM/YYYY');
    };
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
