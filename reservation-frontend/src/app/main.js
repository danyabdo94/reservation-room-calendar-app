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
      const fromDate = moment([year, month, 1, 0]).utc().hours(10).minutes(59).unix();
      const toDate = moment([year, month, 1, 0]).endOf('month').unix();

      this.$http.get(this.serverIp + '/reserve/' + fromDate + '/' + toDate)
        .then(data => {
          // eslint-disable-next-line no-return-assign
          // data.data.reserved.map(element => element.time = moment(element.time).hours(11).minutes(0).unix());
          this.listOfReservations = data.data.reserved;
          $scope.$broadcast('reservationsList', [...this.listOfReservations]);
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
          const tempData = angular.copy($scope.reservation);
          this.listOfReservations.push(tempData);
          $scope.loading = false;
          $mdToast.show(
              $mdToast.simple()
              .textContent('Saved successfully')
              .hideDelay(3000))
            .then(() => {
              $log.log('Toast dismissed.');
            }).catch(() => {
              $log.log('Toast failed or was forced to close early by another toast.');
            });
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

    $scope.cancel = () => {
      $scope.loading = true;
      const tempData = angular.copy($scope.reservation);
      this.$log.log(tempData.time);
      tempData.time = moment($scope.selectedDay).utc().hours(11).minutes(0).unix();
      tempData.reserved = false;
      this.$http.post(this.serverIp + '/reserve/', tempData)
        .then(() => {
          $scope.reservation.reserved = false;
          this.listOfReservations.filter(element => element.time !== $scope.reservation.time);
          $mdToast.show(
              $mdToast.simple()
              .textContent('Erased successfully')
              .hideDelay(3000))
            .then(() => {
              $log.log('Toast dismissed.');
            }).catch(() => {
              $log.log('Toast failed or was forced to close early by another toast.');
            });
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
