/**
 * Created by Jayaram Kancherla ( jkanche [at] umd [dot] edu )
 * Date: 3/8/2016
 */

var mControllers = angular.module('mControllers', ['mServices', 'ui.bootstrap', 'dynamicTable', 'chartTable']);

mControllers.controller('modalCtrl', function($scope, $uibModal, $log) {
    $scope.toggleModal = function() {
        var modalInstance = $uibModal.open({
            templateUrl: 'src/templates/_modalTemplate.html',
            controller: 'modalInstanceCtrl',
            size: 'lg'
        });
    }
});

mControllers.controller('modalInstanceCtrl', function($scope, $uibModalInstance, measurementAPI, $timeout, $http) {

    //for navigating tabs
    $scope.active = 1;

    //for caching data
    $scope.data = {
        dataSources : {},
        dataProviders: {},
        dataMeasurements: {}
    };

    //all selections
    $scope.selection = {
        dataSources : [],
        dataProviders: [],
        dataMeasurements: []
    };

    //current scope of the tab and table
    $scope.current = {};

    //for filtering on measurements
    $scope.data.mFilter = [];

    // Final measurement selection object
    $scope.data.selection = {
        /**
         *  measurement object
         *  {
         *     dataProvider: ''
         *     dataSource: ''
         *     measurement: ''
         *  }
         *
         *  chart object
         *  {
         *      chart: '' (sctater, line, heatmap etc)
         *      xAxis: '' (measurement name)
         *      yAxis: '' (measurement name)
         *      xAxisColor: ''
         *      yAxisColor: ''
         *  }
         **/
        measurements: [],
        chart: {}
    };

    $scope.data.dataProviders = {
        dataProviders: []
    };

    $scope.disNextButton = true;
    $scope.disPrevButton = true;
    $scope.disAddSelButton = true;

    //can also add tabs dynamically
    $scope.tabs = [
        { title:'Data Provider', content:'table with data providers', info:'', id:'dataProviders', minSelection: 1, templateURL: 'src/templates/_dataProviders.html', selectionType: 'single'},
        { title:'Data Sources', content:'table with data sources', info:'', disabled: true, id:'dataSources', minSelection: 1, templateURL: 'src/templates/_dataSources.html', selectionType: 'multiple' },
        /*{ title:'Annotations', content:'table with data annotations', info:'', disabled: true, id:'dataAnnotations', minSelection: 1, templateURL: 'src/templates/_table.html', selectionType: 'multiple' },*/
        { title:'Measurements', content:'table with data measurements', info:'select measurements', disabled: true, id:'dataMeasurements', minSelection: 1, templateURL: 'src/templates/_dataMeasurements.html', selectionType: 'multiple'},
        { title:'Selected Measurements', content:'table with data measurements', info:'select measurements to plot', disabled: true, id:'dataMeasurementsShow', minSelection: 0, templateURL: 'src/templates/_table.html', selectionType: 'single'}
        //{ title:'Chart Type', content:'table with charts', info:'choose a chart type', disabled: true, id:'chartTypes', minSelection: 1, templateURL: 'src/templates/_charts.html', selectionType: 'single'}
    ];

    $scope.addDataProvider = function(url) {
        $http.get(url + '/dataProviders').then(function(resp) {
            $scope.data.dataProviders.dataProviders.push({'url': url, 'status': 'AVAILABLE'});
        }, function(error) {
            $scope.data.dataProviders.dataProviders.push({'url': url, 'status': 'FAIL'});
        });
    };

    $scope.loadDataProviders = function() {

        //TODO: check for epivizr instance and status!
        $scope.addDataProvider('http://localhost:5000');
        $scope.addDataProvider('http://localhost:5100');

    };

    $scope.nextTab = function () {

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

    $scope.selectTab = function() {
        if($scope.active == $scope.tabs.length) {
            $scope.disAddSelButton = false;
            $scope.disNextButton = true;
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
        //TODO: before closing modal, get current list of data providers and save it
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
        //TODO: before closing modal, get current list of data providers and save it
    };

    $scope.loadContent = function(filter) {
        var id = $scope.tabs[$scope.active - 1].id;

        //TODO: write callbacks when no data is received from the server/service is not available!

        switch(id) {
            case 'dataSources':
                if($scope.data.dataSources.dataSources !== undefined && $scope.data.dataSources.dataSources.length > 0) {
                    //nothing has changed, use existing data
                    //$scope.current = $scope.data.dataSources.dataSources;
                }
                else {

                    //$scope.data.dataSources = $scope.data.dataSources ? $scope.data.dataSources : measurementAPI.getDataSources();
                    //$scope.current = $scope.data.dataSources.dataSources;

                    // dataSources is empty, make calls to the ServiceFactory
                    measurementAPI.getDataSources($scope.getSelectedDataProvider())
                        .then(function(response) {

                            console.log(response);
                            $scope.data.dataSources = response.data;
                            $scope.current = $scope.data.dataSources.dataSources;
                        }, function(error) {
                            //something wrong with webservices

                            console.log(error);
                        });
                }

                break;
            case 'dataAnnotations':
                if($scope.data.dataAnnotations.dataAnnotations !== undefined && $scope.data.dataAnnotations.dataAnnotations.length > 0) {
                    //nothing has changed, use existing data
                    //$scope.current = $scope.data.dataAnnotations.dataAnnotations;
                }
                else {
                    // dataSources is empty, make calls to the ServiceFactory
                    measurementAPI.getDataAnnotations($scope.getSelectedDataProvider(),$scope.getSelectedDataSource())
                        .then(function(response) {
                            $scope.data.dataAnnotations = response.data;
                            $scope.current = $scope.data.dataAnnotations.dataAnnotations;
                        });
                }
                //$scope.data.dataAnnotations = $scope.data.dataAnnotations ? $scope.data.dataAnnotations : measurementAPI.getDataAnnotations();
                //$scope.current = $scope.data.dataAnnotations.dataAnnotations;
                break;
            case 'dataMeasurements':

                if($scope.data.dataAnnotations.dataAnnotations !== undefined && $scope.data.dataAnnotations.dataAnnotations.length > 0) {
                    //nothing has changed, use existing data
                    //$scope.current = $scope.data.dataAnnotations.dataAnnotations;
                }
                else {
                    // dataSources is empty, make calls to the ServiceFactory
                    measurementAPI.getDataAnnotations($scope.getSelectedDataProvider(), $scope.getSelectedDataSource())
                        .then(function(response) {
                            $scope.data.dataAnnotations = response.data;
                            //$scope.current = $scope.data.dataAnnotations.dataAnnotations;
                        });
                }

                if($scope.data.dataMeasurements.dataMeasurements !== undefined && $scope.data.dataMeasurements.dataMeasurements.length > 0) {
                    //nothing has changed, use existing data
                    //$scope.current = $scope.data.dataMeasurements.dataMeasurements;
                }
                else {
                    // dataSources is empty, make calls to the ServiceFactory
                    measurementAPI.getMeasurements($scope.getSelectedDataProvider(), $scope.getSelectedDataSource(), $scope.data.mFilter)
                        .then(function(response) {
                            $scope.data.dataMeasurements = response.data;
                            $scope.current = $scope.data.dataMeasurements.dataMeasurements;
                        });
                }
                //$scope.data.dataAnnotations = $scope.data.dataAnnotations ? $scope.data.dataAnnotations : measurementAPI.getDataAnnotations();
                //$scope.data.dataMeasurements = $scope.data.dataMeasurements ? $scope.data.dataMeasurements : measurementAPI.getMeasurements();
                //$scope.current = $scope.data.dataMeasurements.dataMeasurements;

                console.log($scope);
                break;
            case 'dataMeasurementsShow':
                //$scope.current = $scope.data.selection.measurements;
                break;
            case 'chartTypes':
                //$scope.data.chartTypes = $scope.data.chartTypes ? $scope.data.chartTypes : measurementAPI.getChartTypes();
                //$scope.current = $scope.data.chartTypes.chartTypes;
                break;
            default:
                console.log("Oops error loading tab");
                console.log(id);
        }

        //$scope.tabs[$scope.active].content = $compile('<dyntable data="current" selectiontype="multiple"></dyntable>')($scope);
        //angular.element(document.getElementById('tabContent')).append($compile('<dyntable data="current" selectiontype="multiple"></dyntable>')($scope));
    };

    $scope.getSelectedDataProvider = function() {

        console.log($scope.data.dataProviders.dataProviders.selected);
        return $scope.selection.dataProviders[0];
    };

    $scope.getSelectedDataSource = function() {
        return $scope.selection.dataSources[0];
    };

    $scope.$watch(function() {return $scope.data.mFilter}, function(oldVal, newVal) {

        var id = $scope.tabs[$scope.active - 1].id;

        switch(id) {
            case 'dataMeasurements':
                // run only on measurements tab
                if($scope.data.mFilter !== undefined && $scope.data.mFilter.length > 0) {
                    //console.log("added filters, load content again!");
                    $scope.data.dataMeasurements = null;
                    $scope.loadContent($scope.current.filter);
                }
                break;
        }
    }, true);


    $scope.$watch(function() { return $scope.selection}, function(oldVal, newVal) {

        var id = $scope.tabs[$scope.active - 1].id;

        var tabSelection;

        console.log($scope);

        switch(id) {
            case 'dataProviders':
                tabSelection = $scope.selection.dataProviders;
                $scope.data.dataSources = {};
                $scope.data.dataAnnotations = {};
                $scope.data.dataMeasurements = {};
                $scope.data.mFilter = [];
                break;
            case 'dataSources':
                tabSelection = $scope.selection.dataSources;
                $scope.data.dataAnnotations = {};
                $scope.data.dataMeasurements = {};
                $scope.data.mFilter = [];
                break;
            case 'dataMeasurements':
                tabSelection = $scope.selection.dataMeasurements;
                $scope.data.chartTypes = {};
                // every measurement selection gets added to the list
                //$scope.addMeasurement();
                break;
        }

        // if selection reaches the minimum required for a tab, activate next tab and enable the next button
        if(tabSelection.length >= $scope.tabs[$scope.active - 1].minSelection) {
            $scope.disNextButton = false;

            if($scope.active != $scope.tabs.length) {
                $scope.tabs[$scope.active].disabled = false;
            }

            if($scope.active > 1) {
                $scope.disPrevButton = false;
            }

            if($scope.active <= $scope.tabs.length) {
                $scope.disNextButton = false;
            }
        }
    }, true);

    $scope.loadDataProviders();
});
