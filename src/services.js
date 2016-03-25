/**
 * Created by Jayaram Kancherla ( jkanche [at] umd [dot] edu )
 * Date: 3/8/2016
 */

var mServices = angular.module('mServices', []);

mServices.factory('measurementAPI', function($http, $q) {

    var service = {};

    service.getDataSources = function(dataProvider) {

        //var ds_url = dataProvider.url + '/dataSources';

        var deferred = $q.defer();
        var reqs = [];

        angular.forEach(dataProvider, function(dp) {
            var dp_url = dp.url + '/dataSources';
            reqs.push($http({
                    method: 'GET',
                    url: dp_url
                })
            );
        });

        $q.all(reqs).then(function(response) {
            deferred.resolve(response);
        });

/*        $http({
            method: 'GET',
            url: ds_url
        }).then(function(response) {
            deferred.resolve(response);
        });*/

         return deferred.promise;

        //TODO: comment everything from here

/*        switch(dataProvider) {
            case 'hello':
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
                deferred.resolve({'data': response});
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
                deferred.resolve({'data': response});
                break;
            default:
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
                deferred.resolve({'data': response});
                break;
        }

        return deferred.promise;*/
    };

    service.getDataAnnotations = function(dataProvider, dataSource) {

        //var ds_url = dataProvider.url + '/annotations/' + dataSource.name;

        var deferred = $q.defer();
        var reqs = [];

        angular.forEach(dataSource, function(ds) {
            var ds_url = dataProvider.url + '/annotations/' + ds.name;
            reqs.push($http({
                method: 'GET',
                url: ds_url
                })
            );
        });

        $q.all(reqs).then(function(response) {
            //console.log(response);
            deferred.resolve(response);
        });
/*        $http({
            method: 'GET',
            url: ds_url
         }).then(function(response) {
            deferred.resolve(response);
         });*/

         return deferred.promise;

/*        //TODO: comment everthing from here

        var response = {
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
            }, {
                "field": 'tissue type',
                "description": 'abc',
                "label": 'Tissue Type'
            }, {
                "field": 'tissue sub type',
                "description": 'abc',
                "label": 'tissue sub type'
            }]
        };

        deferred.resolve({'data': response});

        return deferred.promise;*/

    };

    service.getMeasurements = function(dataProvider, dataSources, filters, pageSize, offset) {

        //var ds_url = dataProvider.url + '/measurements/' + dataSource.name;

        var reqs = [];
        var filts = {};
        var keys = [];

        //TEST FILTERS
/*        filters = [
            {'field': 'sex', 'filterName': 'equals', 'filterValue': 'male', negate:'false'},
            {'field': 'age', 'filterName': 'range', 'filterValue': '20,30', negate:'false'}];*/

        //TODO: use the url, use the data source param and append it the url!

        var deferred = $q.defer();

        angular.forEach(filters, function(filt) {
            if (filts[filt.dataSource] == null) {
                filts[filt.dataSource] = [];
                keys.push(filt.dataSource);
            }

            filts[filt.dataSource].push({filterField:filt.filterField, filterOperator:filt.filterOperator, filterValue:filt.filterValue})
        });

        angular.forEach(dataSources, function(ds) {
            if(keys.indexOf(ds.name) == -1) {
                filts[ds.name] = [];
            }
        });

        for( var key in filts) {
            var ds_url = dataProvider.url + '/measurements/' + key;
            reqs.push(
                $http({
                    method: 'POST',
                    url: ds_url,
                    data: {
                        pageSize: pageSize,
                        offset: offset,
                        filter : filts[key]
                    }
                })
            );
        }

        console.log(reqs);

        $q.all(reqs).then(function(response) {
            console.log(response);
            deferred.resolve(response);

            //TODO: concatenate all measurements from different data sources
        });

/*        $http({
            method: 'POST',
            url: ds_url,
            data: {
                pageSize: 10,
                filter : filters
            }
         }).then(function(response) {
            deferred.resolve(response);
         }, function(error) {
            //TODO: ERROR CALLING WEBSERVICE
        });*/

         return deferred.promise;

        //TODO: comment everything from here

/*        response = {
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

        deferred.resolve({'data': response});

        return deferred.promise;*/
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
