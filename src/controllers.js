/**
 * Created by Jayaram Kancherla ( jkanche [at] umd [dot] edu )
 * Date: 3/8/2016
 */

var mControllers = angular.module('mControllers', ['mServices', 'ui.bootstrap', 'dynamicTable']);

mControllers.controller('modalCtrl', function($scope, $uibModal, $log) {
    $scope.toggleModal = function() {
        var modalInstance = $uibModal.open({
            templateUrl: 'src/templates/_modalTemplate.html',
            controller: 'modalInstanceCtrl',
            size: 'lg'
        });
    }
});

mControllers.controller('modalInstanceCtrl', function($scope, $uibModalInstance, measurementAPI, $timeout, $compile) {

    $scope.active = 1;
    $scope.data = {};
    $scope.current = {};
    //$scope.current.selected = [];

    $scope.disNextButton = true;
    $scope.disPrevButton = true;
    $scope.disAddSelButton = true;

    $scope.tabs = [
        { title:'Data Provider', content:'table with data providers', id:'dataProvider', minSelection: 1, templateURL: 'src/templates/_table.html'},
        { title:'Data Sources', content:'table with data sources', disabled: true, id:'dataSources', minSelection: 2, templateURL: 'src/templates/_table.html' },
        { title:'Annotations', content:'table with data annotations', disabled: true, id:'dataAnnotations', minSelection: 1, templateURL: 'src/templates/_table.html' },
        { title:'Measurements', content:'table with data measurements', disabled: true, id:'dataMeasurements', minSelection: 1, templateURL: 'src/templates/_table.html'},
        { title:'Chart Type', content:'table with charts', disabled: true, id:'chartTypes', minSelection: 1, templateURL: 'src/templates/_table.html'}
    ];

    $scope.nextTab = function () {
        //TODO: check if user can navigate to next tab

        if($scope.active < $scope.tabs.length) {

            $scope.tabs[$scope.active].disabled = false;
            $scope.active = $scope.active+1;
            $scope.loadContent();
        }

        $scope.disNextButton = true;
        $scope.disPrevButton = false;

        if($scope.active == $scope.tabs.length) {
            $scope.disNextButton = true;
            $scope.disAddSelButton = false;
        }
    };

    $scope.prevTab = function () {

        if($scope.active > 1 ) {
            $scope.active = $scope.active-1;
            $scope.loadContent();
        }

        if($scope.active == 1) {
            $scope.disPrevButton = true;
        }

    };

    $scope.AddSelected = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.loadContent = function() {
        var id = $scope.tabs[$scope.active - 1].id;

        switch(id) {
            case 'dataProvider':
                $scope.data.dataProvider = $scope.data.dataProvider ? $scope.data.dataProvider : measurementAPI.getDataProviders();
                $scope.current = $scope.data.dataProvider.dataProviders;
                break;
            case 'dataSources':
                $scope.data.dataSources = $scope.data.dataSources ? $scope.data.dataSources : measurementAPI.getDataSources();
                $scope.current = $scope.data.dataSources.dataSources;
                break;
            case 'dataAnnotations':
                $scope.data.dataAnnotations = $scope.data.dataAnnotations ? $scope.data.dataAnnotations : measurementAPI.getDataAnnotations();
                $scope.current = $scope.data.dataAnnotations.dataAnnotations;
                break;
            case 'dataMeasurements':
                $scope.data.dataMeasurements = $scope.data.dataMeasurements ? $scope.data.dataMeasurements : measurementAPI.getMeasurements();
                $scope.current = $scope.data.dataMeasurements.dataMeasurements;
                break;
            case 'chartTypes':
                $scope.data.chartTypes = $scope.data.chartTypes ? $scope.data.chartTypes : measurementAPI.getChartTypes();
                $scope.current = $scope.data.chartTypes.chartTypes;
                break;
            default:
                console.log("Oops error loading tab");
                console.log(id);
        }

        //$scope.tabs[$scope.active].content = $compile('<dyntable data="current" selectiontype="multiple"></dyntable>')($scope);
        //angular.element(document.getElementById('tabContent')).append($compile('<dyntable data="current" selectiontype="multiple"></dyntable>')($scope));
    };

    $scope.$watch(function() { return $scope.current.selected}, function(oldVal, newVal) {

        // if selection reaches the minimum required on this tab, activate next tab and enable the next button.

        if($scope.current.selected == null) {
            $scope.current.selected = []
        }

        if($scope.current.selected.length >= $scope.tabs[$scope.active - 1].minSelection ) {
            $scope.disNextButton = false;
            $scope.tabs[$scope.active].disabled = false;

            if($scope.active > 1) {
                $scope.disPrevButton = false;
            }

            if($scope.active <= 4) {
                $scope.disNextButton = false;
            }
        }

    }, true);

    $scope.loadContent();
});