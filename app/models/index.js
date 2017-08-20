import angular from 'angular'
import angularRoute from 'angular-route'

var app = angular.module('app', [angularRoute]);

require('../controllers/')(app);
