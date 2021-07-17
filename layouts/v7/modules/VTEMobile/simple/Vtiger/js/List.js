/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

mobileapp.controller('VtigerListController', function ($scope, $api, $mdDialog,$mdToast) {
    var url = jQuery.url();
    var module = jQuery('.module').val();
    $scope.module = url.param('module');
    $scope.isInventoryModule = false;
    if(module !='') {
        $scope.module = module;
        if($.inArray(module, ['Quotes','Invoice','SalesOrder','PurchaseOrder']) > 0){
            $scope.isInventoryModule = true;
        }

    }
    $scope.parentRecord = url.param('parentRecord');
    $scope.parentModule = url.param('parentModule');
    $scope.relationOperation = url.param('relationOperation');

    $scope.selectRelated = url.param('selectRelated');
    $scope.selectedFilter = null;
    $scope.filters = [];
    $scope.listrecords = [];
    $scope.records = [];
    $scope.page = 1;
    $scope.headers = [];
    $scope.nameFields = [];
    $scope.orderBy = null;
    $scope.sortOrder = ""; //desc
    $scope.moreRecordsExists = false;
    $scope.nextRecords = [];
    $scope.showActions = false;
	$scope.moduleLabel = $scope.module;

	$scope.filterView = false;
    $scope.filterData = {};
    $scope.filterDataId = '';
    $scope.storedFilterData = {};
    $scope.oldFilterData = {};
    // To fetch Module Filters
    $api('fetchModuleFilters', {module: $scope.module}, function (e, r) {
        $scope.filters = r.filters;
		$scope.moduleLabel = r.moduleLabel;

        $scope.loadRecords();
        if(r.dataCustomFilter && r.idCustomFilter){
            $scope.filterDataId = r.idCustomFilter;
            $scope.storedFilterData = JSON.parse(r.dataCustomFilter);
        }
    });

    // To fetch data from service with the given params
    $scope.loadRecords = function () {
        $scope.pageTitle = $scope.moduleLabel;
        $scope.page = 1;
        $api('listModuleRecords', {module: $scope.module, filterid: $scope.selectedFilter, page: $scope.page, orderBy: $scope.orderBy, sortOrder: $scope.sortOrder, parentRecord: $scope.parentRecord, parentModule: $scope.parentModule, searchValue: $scope.searchParam, selectRelated: $scope.selectRelated, filterData: $scope.filterData}, function (e, r) {
            $scope.records = r.records;
            $scope.selectedFilter = r.selectedFilter;
            $scope.headers = r.headers;
            $scope.nameFields = r.nameFields;
            $scope.page = parseInt(r.page);
            $scope.orderBy = r.orderBy;
            $scope.sortOrder = r.sortOrder;
            $scope.moreRecordsExists = r.moreRecords;
            $scope.isSelected = r.isSelected;
            if($scope.filterView == true){
                $scope.filterView = false;
            }
        });
    };


    $scope.loadMoreRecords = function () {
        $scope.page++;
        $api('listModuleRecords', {module: $scope.module, filterid: $scope.selectedFilter, page: $scope.page, orderBy: $scope.orderBy, sortOrder: $scope.sortOrder, parentRecord: $scope.parentRecord, parentModule: $scope.parentModule, searchValue: $scope.searchParam, selectRelated: $scope.selectRelated, filterData: $scope.filterData}, function (e, r) {
            $scope.selectedFilter = r.selectedFilter;
            $scope.headers = r.headers;
            $scope.nameFields = r.nameFields;
            $scope.orderBy = r.orderBy;
            $scope.sortOrder = r.sortOrder;
            $scope.nextRecords = r.records;
            $scope.moreRecordsExists = r.moreRecords;
            if (r.records) {
                for (var i = 0; i < r.records.length; i++) {
                    $scope.records.push($scope.nextRecords[i]);
                }
            }
        });
    };

    $scope.searchModules = function () {
        $scope.page = 1;
        $api('listModuleRecords', {module: $scope.module, filterid: $scope.selectedFilter, page: $scope.page, orderBy: $scope.orderBy, sortOrder: $scope.sortOrder, parentRecord: $scope.parentRecord, parentModule: $scope.parentModule, searchValue: $scope.searchParam, selectRelated: $scope.selectRelated, filterData: $scope.filterData}, function (e, r) {
            $scope.records = r.records;
            $scope.selectedFilter = r.selectedFilter;
            $scope.headers = r.headers;
            $scope.nameFields = r.nameFields;
            $scope.page = parseInt(r.page);
            $scope.orderBy = r.orderBy;
            $scope.sortOrder = r.sortOrder;
            $scope.moreRecordsExists = r.moreRecords;
            $scope.isSelected = r.isSelected;
        });
    };
    $scope.searchModulesKeyup = function (searchValue) {
        var lengthSearch = searchValue.length;
        if(lengthSearch >=3 || lengthSearch == 0){
            $scope.page = 1;
            $api('listModuleRecords', {module: $scope.module, filterid: $scope.selectedFilter, page: $scope.page, orderBy: $scope.orderBy, sortOrder: $scope.sortOrder, parentRecord: $scope.parentRecord, parentModule: $scope.parentModule, searchValue: $scope.searchParam, selectRelated: $scope.selectRelated, filterData: $scope.filterData}, function (e, r) {
                $scope.records = r.records;
                $scope.selectedFilter = r.selectedFilter;
                $scope.headers = r.headers;
                $scope.nameFields = r.nameFields;
                $scope.page = parseInt(r.page);
                $scope.orderBy = r.orderBy;
                $scope.sortOrder = r.sortOrder;
                $scope.moreRecordsExists = r.moreRecords;
                $scope.isSelected = r.isSelected;
                if($scope.filterView == true){
                    $scope.filterView = false;
                }
            });
        }
    };

    $scope.selectRelatedRecord = function () {
        $scope.parentRecord = url.param('parentRecord');
        $scope.parentModule = url.param('parentModule');
        window.location.href = "index.php?module=" + $scope.module + "&view=List&parentRecord="+$scope.parentRecord+"&parentModule="+$scope.parentModule+"&relationOperation=true&app=" + $scope.selectedApp + "&selectRelated=true";
    };

    $scope.setRelated = function (id) {
        $api('setRelatedRecord', {module: $scope.module, record: id, parentRecord:$scope.parentRecord, parentModule:$scope.parentModule }, function (e, r) {
            if(r){
                var toast = $mdToast.simple().content('Record linked!').position($scope.getToastPosition()).hideDelay(1000);
                $mdToast.show(toast);
                window.location.href = "index.php?module=" + $scope.module + "&view=List&parentRecord="+$scope.parentRecord+"&parentModule="+$scope.parentModule+"&relationOperation=true&app=" + $scope.selectedApp;
            }
        });
    };

    $scope.toastPosition = {
        bottom: false,
        top: true,
        left: false,
        right: true
    };

    $scope.getToastPosition = function () {
        return Object.keys($scope.toastPosition)
            .filter(function (pos) {
                return $scope.toastPosition[pos];
            }).join('');
    };

    $scope.listViewCreateEvent = function(){
        $scope.parentRecord = url.param('parentRecord');
        $scope.parentModule = url.param('parentModule');
        if($scope.parentRecord != undefined && $scope.parentModule != undefined ) {
            window.location.href = "index.php?module=" + $scope.module + "&view=Edit&parentRecord="+$scope.parentRecord+"&parentModule="+$scope.parentModule+"&relationOperation=true&app=" + $scope.selectedApp;
        }else{
            window.location.href = "index.php?module=" + $scope.module + "&view=Edit&app=" + $scope.selectedApp;
        }
    };

    // Method to Reorder records in Asc / Desc
    $scope.sortRecords = function () {
        $scope.sortOrder = ($scope.sortOrder === 'asc') ? 'desc' : 'asc';
        $scope.loadRecords();
    };
    // Method to Reorder records in Asc / Desc
    $scope.gobackHistory = function () {
        if($scope.parentRecord != undefined && $scope.parentModule != undefined ) {
            window.location.href = "index.php?module=" + $scope.parentModule + "&view=Detail&record=" + $scope.parentRecord + "&app=" + $scope.selectedApp;
        }
        if ($scope.parentRecord != undefined && $scope.parentModule != undefined && $scope.relationOperation=='true'){
            window.location.href = "index.php?module=" + $scope.module + "&view=List&parentRecord="+$scope.parentRecord+"&parentModule="+$scope.parentModule+ "&app=" + $scope.selectedApp;
        }
    };

    // 
    $scope.gotoDetailView = function (rid) {
        if($scope.parentRecord != undefined && $scope.parentModule != undefined ) {
            window.location.href = "index.php?module=" + $scope.module + "&view=Detail&record=" + rid + "&parentRecord="+$scope.parentRecord+"&parentModule="+$scope.parentModule+"&app=" + $scope.selectedApp;
        }
        else {
            window.location.href = "index.php?module=" + $scope.module + "&view=Detail&record=" + rid + "&app=" + $scope.selectedApp;
        }
    };

    $scope.hideRecordActions = function () {
       $scope.showActions = false;
    };

    $scope.listViewEditEvent = function(id){
        window.location.href = "index.php?module=" + $scope.module + "&view=Edit&record="+id+"&app=" + $scope.selectedApp;
    };
    
    $scope.showConfirmDelete = function(ev, id) {
        var confirm = $mdDialog.confirm()
              .title('Would you like to delete?')
              .ok('OK')
              .cancel('Cancel')
              .targetEvent(ev);
        $mdDialog.show(confirm).then(function() {
            $api('deleteRecords', {record:id}, function(e,r) {
//                console.log(ev.currentTarget)
            });
        });
    };
    
    // Method to watch Selected Filter and load records
    $scope.$watch('selectedFilter', function (newValue, oldValue) {
        if (newValue !== oldValue && newValue != null && newValue != 'applyCustomFilter') {
            $scope.selectedFilter = newValue;
            $scope.loadRecords();
        }else if(newValue == 'applyCustomFilter'){
            $scope.selectedFilter = newValue;
        }
    });
    $scope.changeFilter =function (newValue) {
        if(newValue != 'customFilter' && newValue != 'applyCustomFilter'){
            $scope.filterData = '';
            $scope.selectedFilter = newValue;
            $scope.loadRecords();
        }else if (newValue == 'customFilter'){
            $scope.filterData = angular.copy($scope.storedFilterData);
            $scope.filterView = true;
        }else if(newValue == 'applyCustomFilter'){
            $scope.filterData = angular.copy($scope.storedFilterData);
            $scope.loadRecords();
        }
    };
    // Method to watch the order by field
    $scope.$watch('orderBy', function (newValue, oldValue) {
        if (newValue !== oldValue && newValue != null) {
            $scope.orderBy = newValue;
            $scope.sortOrder = "DESC";
            $scope.loadRecords();
        }
    });

    /** Function that gives index inside Namefields array for a given header (field) ****************/
    /** Alternatively it can check the given header field is a Name Field or not (Return -1 if not) */
    $scope.headerIndex = function (arr, text) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === text)
                return i;
        }
        return -1;
    };

    $scope.showMe = function(){
        $scope.show=true;
        $scope.hide=true;
    };
    $scope.changeDateFilterName = function(name){
        if($scope.filterData['date-name']){
            $('.filter-date-name').find('.md-button[data-name="'+$scope.filterData['date-name']+'"]').removeClass('active');
        }
        if($scope.filterData['date-name'] != name){
            $('.filter-date-name').find('.md-button[data-name="'+name+'"]').addClass('active');
            $scope.filterData['date-name'] = name;
        }else{
            $scope.filterData['date-name'] = '';
        }
    };
    $scope.changeDateFilterValue = function(value){
        if($scope.filterData['date-value']){
            $('.filter-date-value').find('.md-button[data-value="'+$scope.filterData['date-value']+'"]').removeClass('active');
        }
        if($scope.filterData['date-value'] != value){
            $('.filter-date-value').find('.md-button[data-value="'+value+'"]').addClass('active');
            $scope.filterData['date-value'] = value;
        }else{
            $scope.filterData['date-value'] = '';
        }

    };
    $scope.changeFilterView = function () {
        if(Object.keys($scope.oldFilterData).length == 0){
            $scope.filterData = angular.copy($scope.storedFilterData);
        }else{
            $scope.filterData = angular.copy($scope.oldFilterData);
        }
        $scope.filterView = true;
    };
    $scope.goBackList = function () {
        $scope.filterView = false;
    };
    $scope.saveFilter = function () {
        //call api here
        $api('saveFilter', {filterData: $scope.filterData, id: $scope.filterDataId, module: $scope.module}, function (e, r) {
            if(r.id){
                $scope.filterDataId = r.id;
            }
            $scope.storedFilterData = angular.copy($scope.filterData);
            $scope.oldFilterData = angular.copy($scope.filterData);
            // $scope.filterData = r.filterData;
            $scope.loadRecords();
        });
    };
    $scope.generateFilter = function () {
        $scope.oldFilterData = angular.copy($scope.filterData);
        $scope.loadRecords();
    };
});