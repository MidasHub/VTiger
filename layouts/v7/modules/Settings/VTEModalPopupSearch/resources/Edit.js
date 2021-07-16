/* ********************************************************************************
 * The content of this file is subject to the Custom Header/Bills ("License");
 * You may not use this file except in compliance with the License
 * The Initial Developer of the Original Code is VTExperts.com
 * Portions created by VTExperts.com. are Copyright(C) VTExperts.com.
 * All Rights Reserved.
 * ****************************************************************************** */
Settings_Vtiger_Edit_Js("Settings_VTEModalPopupSearch_Edit_Js", {
},{
    advanceFilterInstance: false,
    filterContainer : false,
    //Hold the conditions for a particular field type
    fieldTypeConditionMapping : false,
    //Hold the condition and their label translations
    conditonOperatorLabelMapping : false,

    dateConditionInfo : false,

    fieldModelInstance : false,
    //Holds fields type and conditions for which it needs validation
    validationSupportedFieldConditionMap : {
        'email' : ['e','n']
    },
    //Hols field type for which there is validations always needed
    allConditionValidationNeededFieldList : ['double', 'integer', 'currency'],
    //used to eliminate mutiple times validation registrations
    validationForControlsRegistered : false,
    registerEventSelectModule:function(){
        var self = this;
        $('#custom_module').on('change',function(){
            $('#block_sort').find('span:first-child').text('None');
            $("#popup_list_sortfield").html('<option value="">None</option>');
            vtUtils.hideValidationMessage($(this));
            var element = $(this);
            var moduleSelected = element.val();
            var params = {
                module : 'VTEModalPopupSearch',
                view : 'RelatedFields',
                record : $('#record').val(),
                moduleSelected : moduleSelected
            };
            AppConnector.request(params).then(
                function (data) {
                    //picklistField
                    var picklistField = $('#field_name');
                    self.addValueForPickLists(picklistField,data);
                },
                function(error){

                }
            );
        });
    },

    registerFieldSelectChange:function(){
        var self = this;
        $('#field_name').on('change',function(e){
            var element = $(this);
            var field_name = element.select2('data').text;
            var theSelection = element.val();
            var column_name = theSelection.split(":")[1];
            var params = {
                module : 'VTEModalPopupSearch',
                action : 'ActionAjax',
                mode : 'getModuleNameByField',
                moduleSelected : $('#custom_module').val(),
                column_name : column_name,
                //record: app.getRecordId(),
            };
            AppConnector.request(params).then(function (data) {
                    //picklistField
                    var count = 0;
                    var slModule = '';
                    var modules = data.result.referencelist;
                    var referenceModulesList=jQuery('[name="slreferenceModulesList"]');
                    referenceModulesList.html('');
                    referenceModulesList.append('<option value="">Select an Option</option>');
                    jQuery.each(modules, function (key, info) {
                        count++;
                        if(count==1) {
                            slModule =key;
                            referenceModulesList.append('<option value="' + key + '" selected>' + info + '</option>');
                        }else {
                            referenceModulesList.append('<option value="' + key + '">' + info + '</option>');
                        }
                    });
                    referenceModulesList.trigger("liszt:updated");
                    referenceModulesList.trigger('change');
                    self.registerreferenceModulesListChange();
                    self.registerEventForShowModuleFilterCondition(slModule);
                    self.registerEventForShowSort(slModule);
                    if(count>1){
                        $('.referenceModulesList').removeClass("hide").addClass('show');
                    }else {
                        $('.referenceModulesList').removeClass("show").addClass('hide');
                    }
                },
                function(error){

                }
            );
        });
    },
    registerEventLoadFilterConditon:function(){
        var self = this;
        var moduleName = $('#custom_module').val();
        var element = $('#field_name');
        var field_name = element.select2('data').text;
        var theSelection = element.val();
        var column_name = theSelection.split(":")[1];
        if(moduleName.length>0) {
            var params = {
                module: 'VTEModalPopupSearch',
                action: 'ActionAjax',
                mode: 'getModuleNameByField',
                moduleSelected: $('#custom_module').val(),
                column_name: column_name,
                record: $('#record').val(),
            };
            app.request.get({data: params}).then(function (error, data) {
                if(error === null) {
                    if(data) {
                        var count = 0;

                        var referenceModulesList=jQuery('[name="slreferenceModulesList"]');
                        referenceModulesList.html('');
                        referenceModulesList.append('<option value="">Select an Option</option>');
                        jQuery.each(data.referencelist, function (key, info) {
                            count++;
                            if(key==data.module_field) {
                                referenceModulesList.append('<option value="' + key + '" selected>' + info + '</option>');
                            }else {
                                referenceModulesList.append('<option value="' + key + '">' + info + '</option>');
                            }
                        });
                        referenceModulesList.val(data.module_field).trigger("liszt:updated");
                        referenceModulesList.trigger('change');
                        self.registerreferenceModulesListChange();
                        self.registerEventForShowModuleFilterCondition(data.module_field);
                        self.registerEventForShowSort(data.module_field);
                        if(count>1){
                            $('.referenceModulesList').removeClass("hide").addClass('show');
                        }else {
                            $('.referenceModulesList').removeClass("show").addClass('hide');
                        }
                    }
                }else{
                    // to do
                }
            });
        }
    },
    registerreferenceModulesListChange:function(){
        var self = this;
        $('#slreferenceModulesList').on('change',function(e){
            var element = $(this);
            var module = element.select2('data').text;
            self.registerEventForShowModuleFilterCondition(element.val());
            self.registerEventForShowSort(element.val());
        });
    },
    registerEventForShowModuleFilterCondition: function (moduleSelected) {
        var thisInstance = this;
        var params = {
            'module': 'VTEModalPopupSearch',
            'parent': 'Settings',
            'view': 'ModuleChangeAjax',
            'record': $('#record').val(),
            'module_name': moduleSelected
        }
        app.helper.showProgress();
        app.request.get({data: params}).then(function (error, data) {
            if(error === null) {
                app.helper.hideProgress();
                jQuery('#EditView .vte-advancefilter').html(data);
                var container = jQuery('#EditView .filterContainer');
                thisInstance.advanceFilterInstance = Vtiger_AdvanceFilter_Js.getInstance(container);
                app.changeSelectElementView(container);
                vtUtils.applyFieldElementsView(container);
            }else{
                // to do
            }
        });
    },
    registerEventForShowSort: function (moduleSelected) {
        var thisInstance = this;
        var params = {
            'module': 'VTEModalPopupSearch',
            'parent': 'Settings',
            'view': 'ModuleChangeSortAjax',
            'record': $('#record').val(),
            'module_name': moduleSelected
        }
        app.request.get({data: params}).then(function (error, data) {
            if(error === null) {
                jQuery('#block_sort').html(data);
            }else{
                // to do
            }
        });
    },
    addValueForPickLists:function(picklistField,data){
        picklistField.siblings('div').find('.select2-chosen').html('Select an Option');
        var result = data.result;
        picklistField.html(result);
    },

    calculateValues : function(){
        var thisInstance = this;
        var advfilterlist = thisInstance.advanceFilterInstance.getValues();
        jQuery('#advfilterlist').val(JSON.stringify(advfilterlist));
        var moduleName = $('#custom_module').val()
        var fieldName = $('#field_name').val()
        if(moduleName==""){
            var h=app.vtranslate("This field is required.");
            vtUtils.showValidationMessage($('#custom_module'),h);
            return false;
        }
        vtUtils.hideValidationMessage($('#custom_module'));
        return true;
    },
    registerFormSubmitEvent : function(form) {
        var thisInstance = this;
        thisInstance.advanceFilterInstance = Vtiger_AdvanceFilter_Js.getInstance(jQuery('.filterContainer'));
        form.on('submit',function (e) {

            var result = thisInstance.calculateValues();
            if (!result) {
                e.preventDefault();
            }
            form.vtValidate();
        });
    },

    registerEvents: function(){
        this.registerEventSelectModule();
        this.registerFieldSelectChange();
        this.registerEventLoadFilterConditon();
        var form = $('#EditView');
        $("#active").val("Active").trigger("change");
        this.registerFormSubmitEvent(form);
    }
});
jQuery(document).ready(function() {
    Vtiger_Index_Js.getInstance().registerEvents();
});
function waitUntil(waitFor,toDo){
    if(waitFor()) {
        toDo();
    } else {
        setTimeout(function() {
            waitUntil(waitFor, toDo);
        }, 300);
    }
}