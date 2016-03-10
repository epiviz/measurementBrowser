/**
 * Created by Jayaram Kancherla ( jkanche [at] umd [dot] edu )
 * Date: 3/8/2016
 */

var mTable = angular.module('dynamicTable', []);

mTable.directive('dyntable', function() {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        template: '<table class="table table-hover">' +
        '<thead>' +
        '<tr>' +
        '<th ng-repeat="head in headers">{{head}}</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        '<tr ng-repeat="row in data" ng-class="{info: isRowSelected(row)}" ng-click="setRowSelected(row)">' +
        '<td ng-repeat="cell in row">{{cell}}</td>' +
        '</tr>' +
        '</tbody>' +
        '</table>',
        scope: {
            data: '=',
            selectionType: '@selectiontype',
            selectedRows: '=selectedrows'
        },
        controller: function($scope) {

            // TODO: check if all browsers support keys
            $scope.headers = Object.keys($scope.data[0]);

            $scope.setRowSelected = function(row) {

                if($scope.data.selected == null) {
                    $scope.data.selected = [];
                }

                if($scope.selectionType === "multiple") {

                    if(!$scope.isRowSelected(row)) {
                        $scope.data.selected.push(row);
                    }
                    else {
                        $scope.data.selected.splice($scope.data.selected.indexOf(row), 1);
                    }
                }
                else {
                    $scope.data.selected = [];
                    $scope.data.selected.push(row);
                }

                console.log($scope);
            };
        },
        link: function(scope, elem, attrs) {

            scope.isRowSelected = function(row) {

                if(scope.data.selected == null) {
                    scope.data.selected = [];
                }

                if(scope.data.selected.indexOf(row) == -1) {
                    return false;
                }
                return true;
            };

            scope.$watch('data', function() {
                scope.headers = Object.keys(scope.data[0]);
            }, true);
        }
    }
});