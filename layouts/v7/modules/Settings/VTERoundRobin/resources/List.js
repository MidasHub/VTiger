/*+***********************************************************************************
 * The contents of this file are subject to the vtiger CRM Public License Version 1.0
 * ("License"); You may not use this file except in compliance with the License
 * The Original Code is: vtiger CRM Open Source
 * The Initial Developer of the Original Code is vtiger.
 * Portions created by vtiger are Copyright (C) vtiger.
 * All Rights Reserved.
 *************************************************************************************/
Settings_Vtiger_List_Js("Settings_VTERoundRobin_List_Js", {

    triggerCreate : function(url) {
        var selectedModule = jQuery('#moduleFilter').val();
        if(selectedModule.length > 0) {
            url += '&source_module='+selectedModule
        }
        window.location.href = url;
    }
}, {
    registerFilterChangeEvent: function () {
        var thisInstance = this;
        var container = this.getListViewContainer();
        container.on('change', '#moduleFilter', function (e) {
            jQuery('#pageNumber').val("1");
            jQuery('#pageToJump').val('1');
            jQuery('#orderBy').val('');
            jQuery("#sortOrder").val('');
            var params = {
                module: app.getModuleName(),
                parent: app.getParentModuleName(),
                sourceModule: jQuery(e.currentTarget).val()
            }
            thisInstance.loadListViewRecords(params);
        });
    },
    registerEventForChangePolicyStatus: function (listViewContainer) {
        jQuery(listViewContainer).on('switchChange.bootstrapSwitch', "input[name='rr_status']", function (e) {
            var currentElement = jQuery(e.currentTarget);
            var status = 'Inactive';
            if(currentElement[0].checked){
                status = 'Active';
            }
            var params = {
                module : 'VTERoundRobin',
                parent : 'Settings',
                'action' : 'ActionAjax',
                'mode' : 'UpdateStatus',
                'record' : currentElement.data('id'),
                'status' : status
            }

            AppConnector.request(params).then(function(data){
                if(data){
                    app.helper.showSuccessNotification({
                        message : app.vtranslate('Status changed successfully.')
                    });
                }
            });
        });
    },
    registerRowClickEvent : function(){
        var listViewContentDiv = this.getListViewContainer();

        listViewContentDiv.on('click','.listViewEntries',function(e){
            var elem = jQuery(e.currentTarget);
            var targetElem = jQuery(e.target);
            if(targetElem.closest('.bootstrap-switch').length != 0){
                return false;
            }
            if(targetElem.closest('.deleteRecordButton').length != 0){
                return;
            }
            var recordUrl = elem.data('recordurl');
            if(typeof recordUrl == 'undefined') {
                return;
            }
            window.location.href = recordUrl;
        });
    },
    registerSearch : function() {
        var thisInstance = this;
        var container = this.getListViewContainer();
        container.on('keyup', '.searchRoundRobin', function(e) {
            if(e.which == 13) {
                thisInstance.loadListViewRecords({page: 1});
            }
        });
    },

    getDefaultParams : function() {
        var container = this.getListViewContainer();
        var pageNumber = container.find('#pageNumber').val();
        var module = 'VTERoundRobin';
        var parent = 'Settings';
        var params = {
            'module': module,
            'parent': parent,
            'page' : pageNumber,
            'view' : "List",
            'search_value' : jQuery('.searchRoundRobin').val(),
            'search_key' : jQuery('.searchRoundRobin').val()
        }
        return params;
    },
    getListViewContainer: function () {
        if (this.listViewContainer === false) {
            this.listViewContainer = jQuery('#list-content');
        }
        return this.listViewContainer;
    },
    placeListContents : function(contents) {
        var container = this.getListViewContainer();
        container.html(contents);
    },
    loadListViewRecords : function(urlParams) {
        var self = this;
        var aDeferred = jQuery.Deferred();
        var defParams = this.getDefaultParams();
        if(typeof urlParams == "undefined") {
            urlParams = {};
        }
        urlParams = jQuery.extend(defParams, urlParams);
        app.helper.showProgress();
        app.request.pjax({data:urlParams}).then(function(err, res){
            self.placeListContents(res);
            app.helper.hideProgress();
            jQuery("input[name='rr_status']").bootstrapSwitch();
            aDeferred.resolve(res);
        });
        return aDeferred.promise();
    },
    registerDeleteRecordClickEvent: function () {
        var thisInstance = this;
        jQuery('#page').on('click', '.deleteRecordButton', function (e) {
            var elem = jQuery(e.currentTarget);
            var parent = elem;
            var recordId = parent.closest('tr').data('id');
            var message = app.vtranslate('LBL_DELETE_CONFIRMATION');
            app.helper.showConfirmationBox({'message': message}).then(function () {
                app.helper.showProgress();
                var params = {
                    module : 'VTERoundRobin',
                    parent : 'Settings',
                    action : 'ActionAjax',
                    mode : 'DeleteRecord',
                    record : recordId
                }
                AppConnector.request(params).then(function (data) {
                    if(data.success == true){
                        app.helper.hideProgress();
                        thisInstance.loadListViewRecords();
                    }
                });
            });
        });
    },
    hideButton:function(){
        if(app.getModuleName() == 'VTERoundRobin' && app.getParentModuleName() == 'Settings'){
            $('#VTERoundRobin_listView_basicAction_LBL_ADD_RECORD').hide();
        }
    },
    registerShowOnlineUser:function(){
        $('#rr_show_online_users').on('click',function(){
            var params = {
                module : 'VTERoundRobin',
                parent : 'Settings',
                action : 'ActionAjax',
                mode : 'getOnlineUsers'
            };
            app.request.post({'data' : params}).then(function(err,data){
                app.helper.showModal(data,{
                    'cb' : function() {
                    }
                });
            });
        });
    },
    registerEvents: function () {
        var thisInstance = this;
        this.registerRowClickEvent();
        this.registerFilterChangeEvent();
        this.registerDeleteRecordClickEvent();
        this.registerShowOnlineUser();
        var listViewContainer = this.getListViewContainer();
        this.hideButton();

        if (listViewContainer.length > 0) {
            jQuery("input[name='rr_status']").bootstrapSwitch();
            this.registerEventForChangePolicyStatus(listViewContainer);
            this.registerSearch();
        }
    }
});