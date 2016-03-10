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


    //can also add tabs dynamically
    $scope.tabs = [
        { title:'Data Provider', content:'table with data providers', info:'', id:'dataProvider', minSelection: 1, templateURL: 'src/templates/_table.html', selectionType: 'single'},
        { title:'Data Sources', content:'table with data sources', info:'', disabled: true, id:'dataSources', minSelection: 1, templateURL: 'src/templates/_table.html', selectionType: 'single' },
        { title:'Annotations', content:'table with data annotations', info:'choose columns to show for measurement', disabled: true, id:'dataAnnotations', minSelection: 1, templateURL: 'src/templates/_table.html', selectionType: 'multiple' },
        { title:'Measurements', content:'table with data measurements', info:'select measurements to plot', disabled: true, id:'dataMeasurements', minSelection: 1, templateURL: 'src/templates/_table.html', selectionType: 'multiple'},
        { title:'Chart Type', content:'table with charts', info:'choose a chart type', disabled: true, id:'chartTypes', minSelection: 1, templateURL: 'src/templates/_table.html', selectionType: 'single'}
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

        console.log($scope);
    };

    $scope.prevTab = function () {

        if($scope.active > 1 ) {
            $scope.active = $scope.active-1;
            $scope.loadContent();
        }

        if($scope.active == 1) {
            $scope.disPrevButton = true;
        }

        console.log($scope);
    };

    $scope.AddSelected = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.loadContent = function() {
        var id = $scope.tabs[$scope.active - 1].id;

        //TODO: use nested tree structure for selections!

        switch(id) {
            case 'dataProvider':
                $scope.data.dataProvider = $scope.data.dataProvider ? $scope.data.dataProvider : measurementAPI.getDataProviders();
                $scope.current = $scope.data.dataProvider.dataProviders;
                break;
            case 'dataSources':
                $scope.data.dataSources = $scope.data.dataSources ? $scope.data.dataSources : measurementAPI.getDataSources($scope.getSelectedDataProvider());
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

    $scope.getSelectedDataProvider = function() {
        return $scope.current.selected[0].serverName;
    };

    $scope.getSelectedDataSources = function() {
        return $scope.current.selected;
    };

    $scope.getSelectedDataAnnotations = function() {
        return $scope.current.selected;
    };

    $scope.getSelectedDataMeasurements = function() {
        return $scope.current.selected;
    };



    $scope.$watch(function() { return $scope.current.selected}, function(oldVal, newVal) {

        // if selection reaches the minimum required for a tab, activate next tab and enable the next button.

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

        var id = $scope.tabs[$scope.active - 1].id;

        switch(id) {
            case 'dataProvider':
                $scope.data.dataSources = null;
                break;
            case 'dataSources':
                $scope.data.dataAnnotations = null;
                break;
            case 'dataAnnotations':
                $scope.data.dataMeasurements = null;
                break;
            case 'dataMeasurements':
                $scope.data.chartTypes = null;
                break;
            case 'chartTypes':
                break;
            default:
                console.log("Oops error loading tab");
                console.log(id);
        }

    }, true);



    $scope.loadContent();
});