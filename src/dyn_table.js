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
        template: '<div>' +
        '<form class="form-inline">' +
        '<div class="form-group pull-right">' +
        '<div class="input-group">' +
        '<div class="input-group-addon"><span class="glyphicon glyphicon-search"></span></div>' +
        '<input type="text" class="form-control" placeholder="Search table" ng-model="searchTable">' +
        '</div>' +
        '</div>' +
        '</form>' +
        '<table class="table table-hover">' +
        '<thead>' +
        '<tr>' +
        '<th ng-repeat="head in headers">' +
        '<a href="#" ng-click="$parent.sortField = head; $parent.sortReverse = !sortReverse">{{head}}' +
        '<span ng-show="$parent.sortField == head && !$parent.sortReverse" class="glyphicon glyphicon-chevron-down"></span>' +
        '<span ng-show="$parent.sortField == head && $parent.sortReverse" class="glyphicon glyphicon-chevron-up"></span>' +
        '</a>' +
        '</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        '<tr ng-repeat="row in data | orderBy:sortField:sortReverse | filter: searchTable" ng-class="{info: isRowSelected(row)}" ng-click="setRowSelected(row);">' +
        '<td ng-repeat="cell in row">{{cell}}</td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '</div>',
        scope: {
            data: '=',
            selectionType: '@selectiontype',
            selectedRows: '=selectedrows'
        },
        controller: function($scope) {

            $scope.sortField = "";
            $scope.sortReverse = false;
            $scope.searchTable = "";

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

/*            $scope.setSort = function(field) {
                $scope.sortField = field;
                console.log(field);
                console.log($scope);
            };*/
        },
        link: function(scope, elem, attrs) {

            scope.isRowSelected = function(row) {

                if(scope.data.selected == null) {
                    scope.data.selected = [];
                }

                return scope.data.selected.indexOf(row) != -1;

            };

            scope.$watch('data', function() {
                scope.headers = Object.keys(scope.data[0]);
                scope.headers.splice(scope.headers.indexOf('$$hashKey'), 1);
            }, true);
        }
    }
});