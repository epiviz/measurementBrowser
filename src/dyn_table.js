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
        '<tr ng-repeat="row in data" ng-click="setRowSelected(row)">' +
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

            $scope.data.selected = [];

            $scope.setRowSelected = function(row) {

                //TODO: also add a class to highlight selected rows

                if($scope.selectionType === "multiple") {
                    //$scope.selectedTableRows.push(row);
                    //TODO: check if row already exists
                    $scope.data.selected.push(row);
                }
                else {
                    //$scope.selectedTableRows = [];
                    //$scope.selectedTableRows.push(row);
                    $scope.data.selected = [];
                    $scope.data.selected.push(row);
                }

            };
        },
        link: function(scope, elem, attrs) {
        }
    }
});