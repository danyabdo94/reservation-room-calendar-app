import angular from 'angular';
import 'angular-mocks';
import {title} from './title';

describe('title component', () => {
  beforeEach(() => {
    angular
      .module('reservationTitle', ['app/title.html'])
      .component('reservationTitle', title);
    angular.mock.module('reservationTitle');
  });

  it('should render \'Allo, \'Allo!', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<fountain-title></fountain-title>')($rootScope);
    $rootScope.$digest();
    const title = element.find('h1');
    expect(title.html().trim()).toEqual('\'Allo, \'Allo!');
  }));
});
