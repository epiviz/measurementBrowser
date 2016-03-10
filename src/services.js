/**
 * Created by Jayaram Kancherla ( jkanche [at] umd [dot] edu )
 * Date: 3/8/2016
 */

var mServices = angular.module('mServices', []);

mServices.factory('measurementAPI', function($http) {

    var service = {};

    service.getDataProviders = function() {

        // TODO: make actual web service calls

        /*    $http.get('')
         .then(function(response) {
         $scope.mdataProviders = {}
         });*/

        return {
            "dataProviders": [{
                "serverType": 'MySQL',
                "serverName": 'EpivizUMD',
                "url": 'http://epiviz.cbcb.umd.edu',
                "version": '1'
            }, {
                "serverType": 'MySQL',
                "serverName": 'MetavizUMD',
                "url": 'http://metaviz.cbcb.umd.edu',
                "version": '1'
            }]
        }
    };

    service.getDataSources = function(dataProvider) {
        // TODO: make actual web service calls

        /*    $http.get('')
         .then(function(response) {
         $scope.mdataSources = {}
         });*/

        switch(dataProvider) {
            case 'EpivizUMD':
                return {
                    "dataSources": [{
                        "name": 'Affymetrix',
                        "description": 'xyz',
                        "version": '1'
                    }, {
                        "name": 'Gene Expression Barcode',
                        "description": 'xyz',
                        "version": '1'
                    }, {
                        "name": 'hyper_blocks',
                        "description": 'xyz',
                        "version": '1'
                    }]
                };
                break;
            case 'MetavizUMD':
                return {
                    "dataSources": [{
                        "name": 'meta',
                        "description": 'xyz',
                        "version": '3'
                    }, {
                        "name": 'meta',
                        "description": 'xyz',
                        "version": '5'
                    }, {
                        "name": 'meta',
                        "description": 'xyz',
                        "version": '2'
                    }]
                };
                break;
            default:
                return {
                    "error" : 'data provider does not exist'
                };
                break;
        }
    };

    service.getDataAnnotations = function() {

        // TODO: make actual web service calls

        /*    $http.get('')
         .then(function(response) {
         $scope.mdataAnnotations = {}
         });*/

        return {
            "dataSource": 'Affymetrix',
            "dataAnnotations": [{
                "field": 'Name',
                "description": 'abc',
                "label": 'measurement id'
/*                "stats": {
                    "rowCount": 10
                },
                "filter": [{
                }]*/
            }, {
                "field": 'label',
                "description": 'abc',
                "label": 'Measurement name'
/*                "stats": {
                    "rowCount": 10
                },
                "filter": [{
                }]*/
            }, {
                "field": 'tissue type',
                "description": 'abc',
                "label": 'Tissue Type'
/*                "stats": {
                    "rowCount": 10
                },
                "filter": [{
                }]*/
            }, {
                "field": 'tissue sub type',
                "description": 'abc',
                "label": 'tissue sub type'
/*                "stats": {
                    "rowCount": 10
                },
                "filter": [{
                }]*/
            }]
        }
    };

    service.getMeasurements = function() {

        // TODO: make actual web service calls

        /*    $http.get('')
         .then(function(response) {
         $scope.mdataMeasurements = {}
         });*/

        return {
            "dataMeasurements": [{
                'name': 'Expression colon cancer',
                'label': 'Expression colon cancer',
                'tissueType': 'colon',
                'tissueSubType' : 'normal'
            }, {
                'name': 'Expression colon normal',
                'label': 'Expression colon normal',
                'tissueType': 'colon',
                'tissueSubType' : 'normal'
            }, {
                'name': 'Methylation colon cancer',
                'label': 'Methylation colon cancer',
                'tissueType': 'colon',
                'tissueSubType' : 'normal'
            }, {
                'name': 'Methylation colon normal',
                'label': 'Methylation colon normal',
                'tissueType': 'colon',
                'tissueSubType' : 'normal'
            }]
        }
    };

    service.getChartTypes = function() {

        // TODO: make actual web service calls

        /*    $http.get('')
         .then(function(response) {
         $scope.mdataMeasurements = {}
         });*/

        return {
            "chartTypes": [{
                'name': 'Scatter Plot',
                'label': 'Scatter Plot'
            }, {
                'name': 'HeatMap',
                'label': 'HeatMap'
            }, {
                'name': 'Line Plot',
                'label': 'Line Plot'
            }, {
                'name': 'Bar Plot',
                'label': 'Bar Plot'
            }]
        }
    };

    return service;
});
