/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
mobileapp.controller('VtigerEditController', function ($scope, $api, $mdToast, $filter, $q, $http) {
    var url = jQuery.url();
    $scope.module = url.param('module');
    $scope.record = url.param('record');
    $scope.parentRecord = url.param('parentRecord');
    $scope.parentModule = url.param('parentModule');
    $scope.relationOperation = url.param('relationOperation');
    $scope.buttonid = url.param('buttonid');

    $scope.describeObject = null;
    $scope.fields = null;
    $scope.createable = null;
    $scope.updateable = null;
    $scope.deleteable = null;
    $scope.fieldsData = null;
    $scope.blocksData = null;
    $scope.dateFormat = null;
    $scope.targetField = null;
    $scope.decimals = 2;

    $scope.editdata = [];
	var _processFields = function(field, newrecord, value){
        if(newrecord){
            if (typeof field.default != 'undefined'){
                if (field.type.name == 'date'){
                    field.raw = new Date(Date.parse(field.default));
                }
                if (field.type.name == 'time'){
                    var d = new Date();
                    var strDate = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate();
                    strDate = strDate + " " + field.default;
                    field.raw = new Date(Date.parse(strDate));
                }
                else {
                    field.raw = field.default;
                }
            }
            else if (typeof field.type.defaultValue != 'undefined') field.raw = field.type.defaultValue;
        }
        if(!newrecord && value){
            field.raw = value;
        }
        if($scope.module == 'Calendar' && field.name == 'activitytype'){
            field.raw = 'Task';
        }
        switch(field.type.name) {
            case 'percent':
            case 'decimal':
            case 'currency':
                if(value){
                    field.raw = parseFloat(value).toFixed($scope.decimals)
                }
                break;
            case 'date':
                if(value){
                    field.raw = new Date(Date.parse(value));
                }
                // else{
                //     field.raw = new Date();
                // }
                break;
            case 'time':
                if(value){
                    var d = new Date();
                    var strDate = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate();
                    strDate = strDate + " " + value;
                    field.raw = new Date(Date.parse(strDate));
                }
                // else{
                //     field.raw = new Date();
                // }
                break;
            case 'reference':
                if(value){
                    field.raw = value.value;
                    field.valueLabel = value.label;
                }
                break;
            case 'owner':
                if(value){
                    field.raw = value.value;
                    field.display = value.label;
                }
                break;
            case 'boolean':
                if(value){
                    field.raw = value == '1' ? true : false;
                }
                if(!value && field.raw == 'on'){
                    field.raw = 1  == '1' ? true : false;
                }
                break;
            case 'double':
                if(value){
                    field.raw = parseInt(value);
                }
                break;
        }
        return field;
    };
    var ignorefields = ['notime','starred','tags','modifiedby','reminder_time','imagename','taxclass','isconvertedfromlead','donotcall','from_portal'];

    //Function to prepare create data.
    var prepareCreateData = function(newRecord, record){
        var fields = $scope.fields;
        var processedData = {};
        var blocks = [];
        for(var i=0; i < fields.length; i++) {
            var field = fields[i];
            if(ignorefields.indexOf(field.name) !== -1){
                continue;
            }

            if(field.editable) {
                //salutationtype type is not picklist
                if(field.name == 'salutationtype'){
                    field.type.name = 'picklist';
                }
                if(newRecord){
                    //set default value
                    if(field.default){
                        if (field.type.name == 'date'){
                            field.raw = new Date(Date.parse(field.default));
                        }
                        else {
                            field.raw = field.default;
                        }
                    }
                    //set today date as default date.
                    // if(!field.default && (field.type.name == 'date' || field.type.name == 'time')){
                    //     field.raw = new Date();
                    // }
                }
                else{
                    field.raw = record.record[field.name];
                }
                //Process the field data
                if(newRecord){
                    field = _processFields(field, true);
                }
                else{
                    field = _processFields(field, false, record.record[field.name]);
                }
                processedData[field.name] = field;
            }

        }
        $scope.fieldsData = processedData;
    };

	$api('describe', {module: $scope.module, buttonid: $scope.buttonid, parentRecord : $scope.parentRecord, parentModule : $scope.parentModule}, function (e, r) {
        $scope.describeObject = r.describe;
        $scope.blocksData = r.blocks;
        $scope.fields = $scope.describeObject.fields;
        $scope.createable = $scope.describeObject.createable;
        $scope.updateable = $scope.describeObject.updateable;
        $scope.deleteable = $scope.describeObject.deleteable;
        $scope.picklistDependence = $scope.describeObject.PICKIST_DEPENDENCY_DATASOURCE;
        $scope.decimals = $scope.describeObject.decimals;


        $scope.dateFormat = $scope.describeObject.date_format;
       if($scope.record){
           $scope.loadFields();
       }
       else{
		   if ($scope.userinfo) {
                prepareCreateData(true);
           } else {
               $scope.$root.$on('UserInfo.Changed', function(){
                    prepareCreateData(true);
               });
           }
       }
   });
    $scope.registerEventForPicklistDependencySetup = function () {
        if ($scope.picklistDependence == '') {
            return;
        }
        var container = $('[name="editForm"]');
        var picklistDependencyMapping = JSON.parse($scope.picklistDependence);

        var sourcePicklists = Object.keys(picklistDependencyMapping);
        if (sourcePicklists.length <= 0) {
            return;
        }

        var sourcePickListNames = "";
        for (var i = 0; i < sourcePicklists.length; i++) {
            if (i != sourcePicklists.length - 1)
                sourcePickListNames += '[name="' + sourcePicklists[i] + '"],';
            else
                sourcePickListNames += '[name="' + sourcePicklists[i] + '"]';
        }
        var sourcePickListElements = container.find(sourcePickListNames);
        var currentElement = $($scope.targetField);
        var sourcePicklistname = currentElement.attr('name');

        var configuredDependencyObject = picklistDependencyMapping[sourcePicklistname];
        if (typeof configuredDependencyObject == 'undefined') {
            return;
        }
        var selectedValue = $scope.fieldsData[sourcePicklistname].raw;

        var targetObjectForSelectedSourceValue = configuredDependencyObject[selectedValue];
        var picklistmap = configuredDependencyObject["__DEFAULT__"];

        if (typeof targetObjectForSelectedSourceValue == 'undefined') {
            targetObjectForSelectedSourceValue = picklistmap;
        }
        jQuery.each(picklistmap, function (targetPickListName, targetPickListValues) {
            var targetPickListMap = targetObjectForSelectedSourceValue[targetPickListName];
            if (typeof targetPickListMap == "undefined") {
                targetPickListMap = targetPickListValues;
            }
            var picklistValue = [];
            for (var i = 0; i < targetPickListMap.length; i++) {
                picklistValue.push({
                    label: targetPickListMap[i],
                    value: targetPickListMap[i]
                });
            }
            $scope.fieldsData[targetPickListName].type.picklistValues = picklistValue;
        });
    };

    
    $scope.focusCallback = function ($event) {
        if($event.target === null) {
            return;
        }
        $scope.targetField = $event.target;
    };
    $scope.gobacktoUrl = function () {
        window.history.back();
    };
    
    $scope.loadFields = function () {
        $api('fetchRecord', {module: $scope.module, record: $scope.record, view_mode:'web'}, function (e, r) {
            if(r){
                prepareCreateData(false, r);
				$scope.record = r.record.id;
            }
        });
    };  
    $scope.editdata = {};
    $scope.processEditData = function(fieldsData) {
        for (var index in fieldsData) {
            var field = fieldsData[index];
            var value = field.raw;
            if(!value) value='';
            switch (field.type.name){
                //Should convert date time to utc.
                case 'date' :
                    value = field.raw;
                    if(value != '' && value != null){
                        value = value.getFullYear() + "/" + (value.getMonth()+1) + "/" + value.getDate();
                    }
                    break;
                    
                case 'time' :
                    value = field.raw;
                    if(value != '' && value != null){
                        var strDate = value.getHours() + ":" + value.getMinutes() + ":" + value.getSeconds();
                        value = strDate;
                    }
                    break;
            }
            if(field.editable){
                $scope.editdata[field.name] = value;
            }
        }
    };
    
    $scope.isValid = function(form){
        if(!form.$valid) {
            return false;
        }
        return true;
    };
    
    $scope.saveThisRecord = function (editForm) {
        var formValid = true;
        $('input,textarea,select,md-select').filter('[required]:visible').each(function () {
            if($(this).is('md-select')) {
                var selectElm = $(this).next('select');
                var valueSelect = $(selectElm).val();
                if(valueSelect == '') {
                    var namefield = $(this).attr('aria-label');
                    var toast = $mdToast.simple().content(namefield + ' - Mandatory Fields Missing').position($scope.getToastPosition()).hideDelay(1000);
                    $mdToast.show(toast);
                    formValid = false;
                    return false;
                }
            }else if($(this).val() == ''){
                var namefield = $(this).attr('aria-label');
                var toast = $mdToast.simple().content(namefield + ' - Mandatory Fields Missing').position($scope.getToastPosition()).hideDelay(1000);
                $mdToast.show(toast);
                formValid = false;
                return false;
            }
        });
        if(!formValid){
            return;
        }
        // if(!$scope.isValid(editForm)) {
        //     var toast = $mdToast.simple().content('Mandatory Fields Missing').position($scope.getToastPosition()).hideDelay(1000);
        //     $mdToast.show(toast);
        //     return;
        // }
        $scope.processEditData($scope.fieldsData);
        $scope.parentRecord = url.param('parentRecord');
        $scope.parentModule = url.param('parentModule');
        $scope.relationOperation = url.param('relationOperation');

        if($scope.module == 'Documents'){
            var fd = new FormData();
            var files = $('#file')[0].files[0];
            fd.append('file',files);
            fd.append('module', $scope.module);
            fd.append('record', $scope.record);
            fd.append('values', JSON.stringify($scope.editdata));
            fd.append('parentRecord', $scope.parentRecord);
            fd.append('parentModule', $scope.parentModule);
            fd.append('relationOperation', $scope.relationOperation);
            fd.append('_operation', 'saveRecord');

            $api('saveRecord', fd, function (e, r) {
                if (r) {
                    //split the ws id to get actual record id to fetch.
                    var id = r.record.id.split('x')[1];
                    var toast = $mdToast.simple().content('Record Saved Successfully!').position($scope.getToastPosition()).hideDelay(1000);
                    if($scope.parentRecord != undefined && $scope.parentModule != undefined) {
                        window.location.href = "index.php?module="+$scope.module+"&view=Detail&record="+id+"&parentRecord="+$scope.parentRecord+"&parentModule="+$scope.parentModule+ "&&app="+$scope.selectedApp;
                    }else{
                        window.location.href = "index.php?module="+$scope.module+"&view=Detail&record="+id+"&app="+$scope.selectedApp;
                    }
                } else {
                    var message = 'Some thing went wrong ! \n Save is not Succesfull.';
                    if (e.message) {
                        message = e.message;
                    }
                    var toast = $mdToast.simple().content(message).position($scope.getToastPosition()).hideDelay(1000);
                    $mdToast.show(toast);
                    //window.location.href = "index.php?module="+$scope.module+"&view=List&app="+$scope.selectedApp;
                }
            });
        }else{
            $api('saveRecord', {module: $scope.module, record: $scope.record, values: $scope.editdata,parentRecord: $scope.parentRecord,parentModule: $scope.parentModule,relationOperation: $scope.relationOperation, buttonid: $scope.buttonid}, function (e, r) {
                if (r) {
                    //split the ws id to get actual record id to fetch.
                    var id = r.record.id.split('x')[1];
                    var toast = $mdToast.simple().content('Record Saved Successfully!').position($scope.getToastPosition()).hideDelay(1000);
                    if($scope.parentRecord != undefined && $scope.parentModule != undefined) {
                        window.location.href = "index.php?module="+$scope.module+"&view=Detail&record="+id+"&parentRecord="+$scope.parentRecord+"&parentModule="+$scope.parentModule+ "&&app="+$scope.selectedApp;
                    }else{
                        window.location.href = "index.php?module="+$scope.module+"&view=Detail&record="+id+"&app="+$scope.selectedApp;
                    }
                } else {
                    var message = 'Some thing went wrong ! \n Save is not Succesfull.';
                    if (e.message) {
                        message = e.message;
                    }
                    var toast = $mdToast.simple().content(message).position($scope.getToastPosition()).hideDelay(1000);
                    $mdToast.show(toast);
                    //window.location.href = "index.php?module="+$scope.module+"&view=List&app="+$scope.selectedApp;
                }
            });
        }

    };

    $scope.toastPosition = {
        bottom: true,
        top: false,
        left: false,
        right: true
    };

    $scope.getToastPosition = function () {
        return Object.keys($scope.toastPosition)
                .filter(function (pos) {
                    return $scope.toastPosition[pos];
                }).join('');
    };
    
    //Search reference records
    $scope.getMatchedReferenceFields = function (query, field) {
        var deferred = $q.defer();
        var refModule = field.type.refersTo[0];
        if(query) {
            $api('fetchReferenceRecords', {module: refModule, searchValue: query}, function (error, response) {
                if(response) {
                    var result = [];
                    angular.forEach(response, function (item, key) {
                        item['valueLabel'] = item.label;
                        result.push(item)
                    });
                    return deferred.resolve(result);
                }
            });
        }
        return deferred.promise;
    };
    
    $scope.setReferenceFieldValue = function(item, field){
        if(item){
            field.raw = item.value;
            field.display = item.label;
            field.selectedItem = { 'id' : item.id,  'label' : item.label };
        }
    };
    $scope.fileNameChanged = function(item){
        if(item){
            var fileName =item.files[0].name;
            if($scope.fieldsData.notes_title.raw == '') {
                $('[name="notes_title"]').val(fileName);
                $('[name="notes_title"]').trigger('change');
            }
        }
    };
    angular.element(function () {
        setTimeout(function () {
            $('md-select').each(function () {
                var focus = $(this);
                if(focus.attr('required') == 'required'){
                    var nextSelect = focus.next('select');
                    $(nextSelect).attr('required', 'required');
                }
            })
        },2000);

    });
});
