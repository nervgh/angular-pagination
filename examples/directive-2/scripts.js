

angular


    .module('app', ['angularPagination'])


    .controller('AppController', function($scope) {
        $scope.onPageChange = function(page) {
            console.info('page=', page);
        };
    })


    .directive('ngPagination', ['Pagination', function(Pagination) {
        return {
            templateUrl: 'tpl-4.html',
            link: function(scope, element, attributes) {
                var cb = scope.$eval(attributes.ngPagination) || angular.noop;
                var pagination = scope.pagination = Pagination.create({
                    itemsPerPage: 10,
                    itemsCount: 100,
                    maxNumbers: 5,
                    onChange: cb
                });
                pagination.setCurrent(1);
            }
        };
    }]);