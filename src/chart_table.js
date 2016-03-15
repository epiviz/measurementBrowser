/**
 * Created by Jayaram Kancherla ( jkanche [at] umd [dot] edu )
 * Date: 3/8/2016
 */

var cTable = angular.module('chartTable', []);

cTable.directive('charttable', function() {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        template: '<div>' +
        '<table class="table table-hover">' +
        '<thead>' +
        '<tr>' +
        '<th>Chart Type</th>' +
        '</thead>' +
        '<tbody>' +
        '<tr ng-class="{info: chart === \'scatter_plot\'}" ng-click="setRowSelected(\'scatter_plot\');">' +
        '<td >Scatter Plot</td>' +
        '</tr>' +
        '<tr ng-show="chart === \'scatter_plot\'">' +
        '<td>' +
        '<form class="form-inline">' +
        '<div class="form-group">' +
        '<label>X-Axis</label>' +
        '<select class="form-control" ng-model="data.selected.xAxis" ng-options="m.measurement for m in data.selection.measurements"></select>' +
        '<label>Y-Axis</label>' +
        '<select class="form-control" ng-model="data.selected.yAxis" ng-options="m.measurement for m in data.selection.measurements"></select>' +
        '<label>X-Axis Color</label>' +
        '<input type="color" ng-model="data.selected.xColor">' +
        '<label>Y-Axis Color</label>' +
        '<input type="color" ng-model="data.selected.yColor">' +
        '</div>' +
        '</form>' +
        '</td>' +
        '</tr>' +
        '<tr ng-class="{info: chart === \'bar_plot\'}" ng-click="setRowSelected(\'bar_plot\');">' +
        '<td >Bar Plot</td>' +
        '</tr>' +
        '<tr ng-show="chart === \'bar_plot\'">' +
        '<td>' +
        '<form class="form-inline">' +
        '<div class="form-group">' +
        '<label>X-Axis</label>' +
        '<select class="form-control" ng-model="data.selected.xAxis" ng-options="m.measurement for m in data.selection.measurements"></select>' +
        '<label>Y-Axis</label>' +
        '<select class="form-control" ng-model="data.selected.yAxis" ng-options="m.measurement for m in data.selection.measurements"></select>' +
        '<label>X-Axis Color</label>' +
        '<input type="color" ng-model="data.selected.xColor">' +
        '<label>Y-Axis Color</label>' +
        '<input type="color" ng-model="data.selected.yColor">' +
        '</div>' +
        '</form>' +
        '</td>' +
        '</tr>' +
        '<tr ng-class="{info: chart === \'heat_map\'}" ng-click="setRowSelected(\'heat_map\');">' +
        '<td >Heat Map</td>' +
        '</tr>' +
        '<tr ng-show="chart === \'heat_map\'">' +
        '<td>Heat</td>' +
        '</tr>' +
        '<tr ng-class="{info: chart === \'line_plot\'}" ng-click="setRowSelected(\'line_plot\');">' +
        '<td >Line Plot</td>' +
        '</tr>' +
        '<tr ng-show="chart === \'line_plot\'">' +
        '<td>' +
        '<form class="form-inline">' +
        '<div class="form-group">' +
        '<label>X-Axis</label>' +
        '<select class="form-control" ng-model="data.selected.xAxis" ng-options="m.measurement for m in data.selection.measurements"></select>' +
        '<label>Y-Axis</label>' +
        '<select class="form-control" ng-model="data.selected.yAxis" ng-options="m.measurement for m in data.selection.measurements"></select>' +
        '<label>X-Axis Color</label>' +
        '<input type="color" ng-model="data.selected.xColor">' +
        '<label>Y-Axis Color</label>' +
        '<input type="color" ng-model="data.selected.yColor">' +
        '</div>' +
        '</form>' +
        '</td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '</div>',
        scope: {
            data: '=',
            selectionType: '@selectiontype',
            measurements: '='
        },
        controller: function($scope) {

            $scope.chart = "";

            $scope.data.selected = {
                chart: "",
                xAxis: "",
                yAxis: "",
                xAxisColor: "",
                yAxisColor: ""
            };

            $scope.setRowSelected = function(chart) {

                if ($scope.chart === chart) {
                    $scope.chart = "";
                }
                else {
                    $scope.chart = chart;
                }

                $scope.data.selected.chart = $scope.chart;
            };
        },
        link: function(scope, elem, attrs) {
        }
    }
});