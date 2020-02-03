class MainController {
  /** @ngInject */
  constructor($http, $scope, $log, serverIp, moment) {
    $scope.currentDay = null;
    this.$log = $log;
    this.$http = $http;
    this.serverIp = serverIp;
    this.moment = moment;

    $scope.$on('dayChanged', (event, day) => {
      this.$log.log(event, day);
      // this.$http.get(this.serverIp + '/reserve/1577790000/1609153200')
      //   .then(data => {
      //     this.$log.log(data.data);
      //   }).catch(erro => {
      //     this.$log.log(erro);
      //   });
    });

    $scope.$on('monthChanged', (event, month, year) => {
      this.$log.log(event, month, year);
      const fromDate = moment([year, month, 1, 0]).unix();
      const toDate = moment([year, month, 1, 0]).endOf('month').unix();

      this.$http.get(this.serverIp + '/reserve/' + fromDate + '/' + toDate)
        .then(data => {
          this.$log.log(data.data);
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
