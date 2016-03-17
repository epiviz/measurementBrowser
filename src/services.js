/**
 * Created by Jayaram Kancherla ( jkanche [at] umd [dot] edu )
 * Date: 3/8/2016
 */

var mServices = angular.module('mServices', []);

mServices.factory('measurementAPI', function($http, $q) {

    var service = {};

    service.getDataProviders = function() {

        //TODO : Use UI to let user add data Providers.

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


        //TODO: use the url

        var deferred = $q.defer();

        /*         $http({
            method: 'GET',
            url: ''
         }).success(function(response) {
            deferred.resolve(response);
         });

         return deferred.promise;*/

        //TODO: uncomment everthing from here

        switch(dataProvider) {
            case 'EpivizUMD':
                response = {
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
                deferred.resolve(response);
                break;
            case 'MetavizUMD':
                response =  {
                    "dataSources": [{
                        "name": 'meta1',
                        "description": 'xyz',
                        "version": '3'
                    }, {
                        "name": 'meta2',
                        "description": 'xyz',
                        "version": '5'
                    }, {
                        "name": 'meta3',
                        "description": 'xyz',
                        "version": '2'
                    }]
                };
                deferred.resolve(response);
                break;
            default:
                return {
                    "error" : 'data provider does not exist'
                };
                break;
        }

        return deferred.promise;
    };

    service.getDataAnnotations = function(dataSource) {

        //TODO: use the url, use the data source param and append it the url!

        var deferred = $q.defer();

        /*         $http({
            method: 'GET',
            url: ''
         }).success(function(response) {
            deferred.resolve(response);
         });

         return deferred.promise;*/

        //TODO: uncomment everthing from here

        response = {
            "dataSource": 'Affymetrix',
            "dataAnnotations": [{
                "field": 'Name',
                "description": 'abc',
                "label": 'measurement id',
                "stats": {
                    "rowCount": 10
                },
                "filter": [{
                    "name": 'contains'
                }]
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
        };

        deferred.resolve(response);

        return deferred.promise;

    };

    service.getMeasurements = function(dataSource) {

        //TODO: use the url, use the data source param and append it the url!

        var deferred = $q.defer();

        /*         $http({
            method: 'GET',
            url: ''
         }).success(function(response) {
            deferred.resolve(response);
         });

         return deferred.promise;*/

        //TODO: uncomment everthing from here

        response = {
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
        };

        deferred.resolve(response);

        return deferred.promise;
    };

    service.getChartTypes = function() {

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
