

angular


    .module('app', ['angularPagination'])


    .controller('AppController', function($scope, Pagination) {
        var pagination = $scope.pagination = Pagination.create({
            itemsPerPage: 10,
            itemsCount: 100,
            maxNumbers: 5
        });

        pagination.onChange = function(page) {
            console.info('page=', page);
        };
    })


    .directive('ngPagination', function() {
        return {
            templateUrl: 'tpl-4.html',
            link: function(scope, element, attributes) {
                var p = scope.$eval(attributes.ngPagination);

                function watcher() {
                    return [p.startPage, p.maxNumbers, p.itemsCount, p.itemsPerPage].toString();
                }
                function handler() {
                    p.setCurrent(p.currentPage);
                }

                scope.$watch(watcher, handler);
            }
        };
    });