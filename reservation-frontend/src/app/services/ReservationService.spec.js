import angular from 'angular';
import 'angular-mocks';
import ReservationService from './ReservationService';

describe('ReservationService service', () => {
  beforeEach(() => {
    angular
      .module('Service', [])
      .service('Service', ReservationService);
    angular.mock.module('Service');
  });

  it('should', angular.mock.inject(Service => {
    expect(Service.getData()).toEqual(3);
  }));
});
