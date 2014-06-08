#Angular Pagination

## About

**Angular Pagination** is a module for the [AngularJS](http://angularjs.org/) framework.

## Usage
Simple example:
```js
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
    });
```
```html
<div ng-controller="AppController">
    <ul class="pagination">
        <li ng-repeat="page in pagination.pages track by $index" ng-class="{active: pagination.isCurrent(page)}" ng-click="pagination.setCurrent(page)">
            <a href ng-bind="page"></a>
        </li>
    </ul>
</div>
```
See [demo](http://nervgh.github.io/pages/angular-pagination/examples/base) of full functionality


## Demos
1. [Example of full functionality](http://nervgh.github.io/pages/angular-pagination/examples/base)
2. [Example of directive 1](http://nervgh.github.io/pages/angular-pagination/examples/directive-1)
3. [Example of directive 2](http://nervgh.github.io/pages/angular-pagination/examples/directive-2)
