

angular


    .module('angularPagination', [])


    .value('paginationOptions', {
        itemsPerPage: 10,
        itemsCount: 100,
        maxNumbers: 5,
        startPage: 1
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
            this.currentPage = null;
            this.endPage = null;
            this.pages = [];
            this._lastPage = null;
        }

        /**
         * Sets current page
         * @param {Number} page
         */
        Pagination.prototype.setCurrent = function(page) {
            this.endPage = this._getMaxPage();
            this.currentPage = this._fixPage(Math.floor(page));
            this._change(this.currentPage);
            this._updatePages();
        };
        /**
         * Offsets current page by "shift" pages
         * @param {Number} shift
         */
        Pagination.prototype.shiftCurrent = function(shift) {
            this.setCurrent(this.currentPage + shift);
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
         * Returns "true" if shift is invalid
         * @param {Number} shift
         * @returns {boolean}
         */
        Pagination.prototype.isInvalidShift = function(shift) {
            var index = this.currentPage + shift;
            return this.startPage > index || this.endPage < index;
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
         * Returns max page number
         * @returns {Number}
         * @private
         */
        Pagination.prototype._getMaxPage = function() {
            return Math.ceil(this.itemsCount / this.itemsPerPage);
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
