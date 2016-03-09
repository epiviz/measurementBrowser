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
                "url": 'http://epiviz.cbcb.umd.edu',
                "version": '1'
            }]
        }
    };

    service.getDataSources = function() {
        // TODO: make actual web service calls

        /*    $http.get('')
         .then(function(response) {
         $scope.mdataSources = {}
         });*/

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

    return service;
});
