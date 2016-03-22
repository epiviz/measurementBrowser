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
        '<div ng-if="dataReceived == true">' +
        '<form class="form-inline">' +
        '<div class="form-group">' +
        '<div class="input-group">' +
        '<div class="input-group-addon"><span class="glyphicon glyphicon-search"></span></div>' +
        '<input type="search" class="form-control" placeholder="Search table" ng-model="searchTable">' +
        '</div>' +
        '</div>' +
        '<div class="form-group" ng-show="showFilterMenu">' +
        '<div class="btn-group" uib-dropdown is-open="status.isopen">' +
        '<button id="single-button" type="button" class="btn btn-primary" uib-dropdown-toggle>Add Filter <span class="caret"></span></button>' +
        '<ul uib-dropdown-menu role="menu" aria-labelledby="single-button">' +
        '<li role="menuitem" ng-repeat="item in dataAnnotations"><a href="#" ng-click="$parent.showFilterFields(item)">{{item.field}}</a></li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '<div class="form-group" ng-show="showFilterAvail">' +
        '<label>No filters available</label>' +
        '</div>' +
        '<div class="form-group" ng-show="showFilterInput">' +
        '<select class="form-control" ng-model="sel.filtOperator" ng-options="filter.name for filter in selectedFilter"></select>' +
        '<input type="text" class="form-control" placeholder="keyword" ng-model="sel.filtValue">' +
        '<button class="btn btn-primary" type="button" ng-click="applyFilter(sel)">Apply Filter</button>' +
        '</div>' +
        '</form>' +
        '<ul class="list-inline">' +
        '<li class="bg-info" ng-repeat="fil in tFilter"> {{fil.filtField}} {{fil.filtOperator.name}} {{fil.filtValue}} ' +
        '<button type="button" class="close" aria-label="Close" ng-click="removeFilter($index)"><span aria-hidden="true">&times;</span></button>' +
        '</li>' +
        '</ul>' +
        '<div class="table-responsive">' +
        '<table class="table table-hover">' +
        '<thead>' +
        '<tr>' +
        '<th ng-repeat="head in headers">' +
        '<a href="#" ng-click="$parent.sortField = head; $parent.sortReverse = !sortReverse">{{head}}' +
        '<span ng-show="$parent.sortField == head && !$parent.sortReverse" class="glyphicon glyphicon-chevron-down"></span>' +
        '<span ng-show="$parent.sortField == head && $parent.sortReverse" class="glyphicon glyphicon-chevron-up"></span>' +
        '</a>' +
        '</th>' +
        '</thead>' +
        '<tbody>' +
        '<tr ng-repeat="row in data | orderBy:sortField:sortReverse | filter:searchTable track by $index" ng-class="{info: isRowSelected(row)}" ng-click="setRowSelected(row);">' +
        '<td ng-repeat="cell in row">{{cell}}</td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '</div>' +
        '<div ng-if="dataReceived == false"> No data received!! </div>' +
        '</div>',
        scope: {
            data: '=data',
            tFilter: '=tfilter',
            selectionType: '@selectiontype',
            selectedRows: '=selectedrows',
            dataAnnotations: '=annotations',
            selection: '=selection'
        },
        controller: function($scope) {

            $scope.showFilterFields = function(item) {

                if(item.filter != null ) {
                    $scope.showFilterInput = true;
                    $scope.selectedFilter = item.filter;
                    $scope.sel.filtField = item.field;
                    $scope.showFilterAvail = false;
                }
                else {
                    $scope.showFilterAvail = true;
                    $scope.showFilterInput = false;
                }
            };
        },
        link: function(scope, elem, attrs) {

            //TODO: implement infinite scroll (load data)
            // emit to parent -> parent loads more data!

            scope.sortField = "";
            scope.sortReverse = false;
            scope.searchTable = "";
            scope.showFilterMenu = false;
            scope.showFilterInput = false;
            scope.dataReceived = false;
            //scope.data.tFilter = [];
            //scope.filter = [];
            scope.sel = {
                filtField: "",
                filtOperator: "",
                filtValue: ''
            };

            scope.applyFilter = function(sel) {

                if(scope.tFilter == null) {
                    scope.tFilter = [];
                }

                scope.tFilter.push(sel);

                scope.sel = {
                    filtField: "",
                    filtOperator: "",
                    filtValue: ''
                };

                scope.showFilterInput = false;
            };

            scope.removeFilter = function(index) {
                scope.tFilter.splice(index, 1);
                //scope.filter.splice(index, 1);
            };

            scope.setRowSelected = function(row) {

                if(scope.selectionType === "multiple") {

                    if(!scope.isRowSelected(row)) {
                        scope.selection.push(row);
                    }
                    else {
                        scope.selection.splice(scope.selection.indexOf(row), 1);
                    }
                }
                else {
                    scope.selection = [];
                    scope.selection.push(row);
                }
            };

            scope.isRowSelected = function(row) {

                if(scope.selection == undefined) {
                    return -1;
                }
                return scope.selection.indexOf(row) != -1;
            };

            scope.$watch('data', function() {

                if(scope.data !== undefined && scope.data.length > 0) {
                    scope.dataReceived = true;
                    scope.headers = Object.keys(scope.data[0]);
                    scope.headers.splice(scope.headers.indexOf('$$hashKey'), 1);
                }
                else {
                    scope.dataReceived = false;
                }
            }, true);

            scope.$watch('dataAnnotations', function() {

                if(scope.dataAnnotations != null) {
                    scope.showFilterMenu = true;
                }
                else {
                    scope.showFilterMenu = false;
                }
            }, true);
        }
    }
});