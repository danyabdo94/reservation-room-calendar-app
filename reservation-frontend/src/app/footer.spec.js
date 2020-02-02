import angular from 'angular';
import 'angular-mocks';
import {footer} from './footer';

describe('footer component', () => {
  beforeEach(() => {
    angular
      .module('reservationFooter', ['app/footer.html'])
      .component('reservationFooter', footer);
    angular.mock.module('reservationFooter');
  });

  it('should render \'FountainJS team\'', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<fountain-footer></fountain-footer>')($rootScope);
    $rootScope.$digest();
    const footer = element.find('a');
    expect(footer.html().trim()).toEqual('FountainJS team');
  }));
});