/*
 angular-pagination v0.2.2
 https://github.com/nervgh/angular-pagination
*/


angular


    .module('angularPagination', [])


    .value('paginationOptions', {
        itemsPerPage: 10,
        itemsCount: 100,
        maxNumbers: 5,
        startPage: 1,
        currentPage: 1
    })


    .factory('Pagination', ['paginationOptions', function(paginationOptions) {
        /**
         * Creates new pagination object
         * @param {Object} options
         * @constructor
         */
        function Pagination(options) {
            var defaults = angular.copy(paginationOptions);
            angular.extend(this, defaults, options);
            this.endPage = null;
            this.pages = [];
            this._lastPage = null;
            this.setCurrent(this.currentPage);
        }

        /**
         * Sets current page
         * @param {Number} page
         */
        Pagination.prototype.setCurrent = function(page) {
            this.endPage = Math.ceil(this.itemsCount / this.itemsPerPage);
            this.currentPage = this._fixPage(Math.floor(page));
            this._change(this.currentPage);
            this._updatePages();
        };
        /**
         * Returns "true" if page is current
         * @param {Number} page
         * @returns {Boolean}
         */
        Pagination.prototype.isCurrent = function(page) {
            return this.currentPage === page;
        };
        /**
         * Returns "true" if page inside of range
         * @param {Number} page
         * @returns {boolean}
         */
        Pagination.prototype.inRange = function(page) {
            return this.startPage <= page && this.endPage >= page;
        };
        /**
         * Returns "true" if page is first
         * @param {Number} page
         * @returns {Boolean}
         */
        Pagination.prototype.isFirst = function(page) {
            return this.startPage === page;
        };
        /**
         * Returns "true" if page is last
         * @param {Number} page
         * @returns {Boolean}
         */
        Pagination.prototype.isLast = function(page) {
            return this.endPage === page;
        };
        /**
         * Callback. Called when page changed
         * @param {Number} page
         */
        Pagination.prototype.onChange = function(page) {
        };
        /**
         * Fixes number of page if it outside range
         * @param {Number} page
         * @returns {number}
         * @private
         */
        Pagination.prototype._fixPage = function(page) {
            page = Math.min(page, this.endPage);
            page = Math.max(page, this.startPage);
            return page;
        };
        /**
         * Calls "onChange" if number of page was changed
         * @param {Number} page
         * @private
         */
        Pagination.prototype._change = function(page) {
            if (this._lastPage !== page) {
                this._lastPage = page;
                this.onChange(page);
            }
        };
        /**
         * Updates array of pages
         * @private
         */
        Pagination.prototype._updatePages = function() {
            var delta = Math.floor(this.maxNumbers / 2);
            var start = Math.max(this.currentPage - delta, this.startPage);
            var end = Math.min(start + this.maxNumbers - 1, this.endPage);

            start = this.endPage === end ? end - (this.maxNumbers - 1) : start;
            start = Math.max(start, this.startPage);
            this.pages.length = 0;

            for(var i = start; i <= end; i++) {
                this.pages.push(i);
            }
        };
        /**
         * Creates and returns a pagination object
         * @param {Object} options
         * @returns {Pagination}
         */
        Pagination.create = function(options) {
            return new Pagination(options);
        };

        return Pagination;
    }]);
