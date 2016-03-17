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

mControllers.controller('modalInstanceCtrl', function($scope, $uibModalInstance, measurementAPI, $timeout, $compile) {

    //for navigating tabs
    $scope.active = 1;

    //for caching data
    $scope.data = {};

    //current scope of the tab and table
    $scope.current = {};

    // measurement selection object
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

    $scope.disNextButton = true;
    $scope.disPrevButton = true;
    $scope.disAddSelButton = true;

    //can also add tabs dynamically
    $scope.tabs = [
        { title:'Data Provider', content:'table with data providers', info:'', id:'dataProvider', minSelection: 1, templateURL: 'src/templates/_table.html', selectionType: 'single'},
        { title:'Data Sources', content:'table with data sources', info:'', disabled: true, id:'dataSources', minSelection: 1, templateURL: 'src/templates/_table.html', selectionType: 'single' },
        /*{ title:'Annotations', content:'table with data annotations', info:'', disabled: true, id:'dataAnnotations', minSelection: 1, templateURL: 'src/templates/_table.html', selectionType: 'multiple' },*/
        { title:'Measurements', content:'table with data measurements', info:'select measurements', disabled: true, id:'dataMeasurements', minSelection: 1, templateURL: 'src/templates/_table.html', selectionType: 'multiple'},
        { title:'Selected Measurements', content:'table with data measurements', info:'select measurements to plot', disabled: true, id:'dataMeasurementsShow', minSelection: 0, templateURL: 'src/templates/_table.html', selectionType: 'single'}
        //{ title:'Chart Type', content:'table with charts', info:'choose a chart type', disabled: true, id:'chartTypes', minSelection: 1, templateURL: 'src/templates/_charts.html', selectionType: 'single'}
    ];

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
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.loadContent = function(filter) {
        var id = $scope.tabs[$scope.active - 1].id;

        //TODO: use nested tree structure for selections!

        switch(id) {
            case 'dataProvider':
                $scope.data.dataProviders = $scope.data.dataProviders ? $scope.data.dataProviders : measurementAPI.getDataProviders();
                $scope.current = $scope.data.dataProviders.dataProviders;
                break;
            case 'dataSources':
                if($scope.data.dataSources !== undefined && $scope.data.dataSources != null) {
                    //nothing has changed, use existing data
                    $scope.current = $scope.data.dataSources.dataSources;
                }
                else {

                    //$scope.data.dataSources = $scope.data.dataSources ? $scope.data.dataSources : measurementAPI.getDataSources();
                    //$scope.current = $scope.data.dataSources.dataSources;

                    // dataSources is empty, make calls to the ServiceFactory
                    measurementAPI.getDataSources($scope.getSelectedDataProvider())
                        .then(function(response) {
                            $scope.data.dataSources = response;
                            $scope.current = $scope.data.dataSources.dataSources;
                        });
                }

                break;
            case 'dataAnnotations':
                if($scope.data.dataAnnotations !== undefined && $scope.data.dataAnnotations != null) {
                    //nothing has changed, use existing data
                    $scope.current = $scope.data.dataAnnotations.dataAnnotations;
                }
                else {
                    // dataSources is empty, make calls to the ServiceFactory
                    measurementAPI.getDataAnnotations($scope.getSelectedDataSource())
                        .then(function(response) {
                            $scope.data.dataAnnotations = response;
                            $scope.current = $scope.data.dataAnnotations.dataAnnotations;
                        });
                }
                //$scope.data.dataAnnotations = $scope.data.dataAnnotations ? $scope.data.dataAnnotations : measurementAPI.getDataAnnotations();
                //$scope.current = $scope.data.dataAnnotations.dataAnnotations;
                break;
            case 'dataMeasurements':
                if($scope.data.dataAnnotations !== undefined && $scope.data.dataAnnotations != null) {
                    //nothing has changed, use existing data
                    //$scope.current = $scope.data.dataAnnotations.dataAnnotations;
                }
                else {
                    // dataSources is empty, make calls to the ServiceFactory
                    measurementAPI.getDataAnnotations($scope.getSelectedDataSource())
                        .then(function(response) {
                            $scope.data.dataAnnotations = response;
                            //$scope.current = $scope.data.dataAnnotations.dataAnnotations;
                        });
                }

                if($scope.data.dataMeasurements !== undefined && $scope.data.dataMeasurements != null) {
                    //nothing has changed, use existing data
                    $scope.current = $scope.data.dataMeasurements.dataMeasurements;
                    $scope.current.tFilter = [];
                }
                else {
                    // dataSources is empty, make calls to the ServiceFactory
                    measurementAPI.getMeasurements($scope.getSelectedDataSource())
                        .then(function(response) {
                            $scope.data.dataMeasurements = response;
                            $scope.current = $scope.data.dataMeasurements.dataMeasurements;
                        });
                }
                //$scope.data.dataAnnotations = $scope.data.dataAnnotations ? $scope.data.dataAnnotations : measurementAPI.getDataAnnotations();
                //$scope.data.dataMeasurements = $scope.data.dataMeasurements ? $scope.data.dataMeasurements : measurementAPI.getMeasurements();
                //$scope.current = $scope.data.dataMeasurements.dataMeasurements;
                break;
            case 'dataMeasurementsShow':
                $scope.current = $scope.data.selection.measurements;
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
        return $scope.data.dataProviders.dataProviders.selected[0].serverName;
    };

    $scope.getSelectedDataSource = function() {
        return $scope.data.dataSources.dataSources.selected[0].name;
    };

/*    $scope.getSelectedDataAnnotations = function() {
        return $scope.current.selected;
    };

    $scope.getSelectedDataMeasurements = function() {
        return $scope.current.selected;
    };*/

    $scope.$watch(function() {return $scope.current.tFilter}, function(oldVal, newVal) {

        var id = $scope.tabs[$scope.active - 1].id;

        switch(id) {
            case 'dataMeasurements':
                // run only on measurements tab
                console.log($scope);
                if($scope.current.tFilter !== undefined && $scope.current.tFilter.length > 0) {
                    //console.log("added filters, load content again!");
                    $scope.data.dataMeasurements = null;
                    $scope.loadContent($scope.current.filter);
                }
                break;
        }
    }, true);


    $scope.$watch(function() { return $scope.current.selected}, function(oldVal, newVal) {

        // if selection reaches the minimum required for a tab, activate next tab and enable the next button.

        if($scope.current.selected == null) {
            $scope.current.selected = []
        }

        if($scope.current.selected.length >= $scope.tabs[$scope.active - 1].minSelection) {
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

        var id = $scope.tabs[$scope.active - 1].id;

        switch(id) {
            case 'dataProvider':
                $scope.data.dataSources = null;
                $scope.data.dataAnnotations = null;
                $scope.data.dataMeasurements = null;
                break;
            case 'dataSources':
                $scope.data.dataAnnotations = null;
                $scope.data.dataMeasurements = null;
                break;
            case 'dataAnnotations':
                $scope.data.dataMeasurements = null;
                break;
            case 'dataMeasurements':
                $scope.data.chartTypes = null;

                // every measurement gets added to the list

                if($scope.current.selected.length > 0) {
                    var sdP = $scope.data.dataProviders.dataProviders.selected[0].serverName;
                    var sdS = $scope.data.dataSources.dataSources.selected[0].name;
                    var smeas = $scope.data.dataMeasurements.dataMeasurements.selected[$scope.data.dataMeasurements.dataMeasurements.selected.length-1].name;

                    $scope.data.selection.measurements.push({'dataProvider': sdP, 'dataSource':sdS , 'measurement': smeas});
                }

                break;
            default:
                //console.log("Oops error loading tab");
                //console.log(id);
                break;
        }

    }, true);

    $scope.loadContent();
});