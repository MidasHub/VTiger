/* ********************************************************************************
 * The content of this file is subject to the Dynamic Blocks ("License");
 * You may not use this file except in compliance with the License
 * The Initial Developer of the Original Code is VTExperts.com
 * Portions created by VTExperts.com. are Copyright(C) VTExperts.com.
 * All Rights Reserved.
 * ****************************************************************************** */

Vtiger_Index_Js("Settings_VTEMobile_Settings_Js",{},{
    paramsSelect2 : {
        closeOnSelect : false
    },
     /**
      * Function which will update block sequence
      */
     registerSortableMenuBar:function(){
         var thisInstance  = this;
         var elementRelated = $('#modulestoshow');
         var instance = new VTEMobile_Settings_Js();
         instance.makeColumnListSortable(elementRelated);
         var parentModule = '';
         if(elementRelated.length > 0){
             thisInstance.arrangeSelectChoicesInOrder(parentModule,$(document).find('div#module_menu'),elementRelated);
         }
     },
     registerChangeParentModule:function () {
         var thisInstance  = this;
         $('#parentmodule').change(function () {
             var parentModule = $(this).val();
             var elementRelated = $('#relatedmodule');
             elementRelated.html($('#relatedmodule-'+parentModule).html());
             elementRelated.val($('#relatedmodule-'+parentModule).val());
             elementRelated.attr('multiple',true).select2();
             var instance = new VTEMobile_Settings_Js();
             instance.makeColumnListSortable(elementRelated);
             thisInstance.arrangeSelectChoicesInOrder(parentModule,$(document).find('div#module_related'),elementRelated);
         })
     },
    registerChangeParentModuleForFields:function () {
        var thisInstance  = this;
        $('#parentmodule-fields').change(function () {
            var parentModule = $(this).val();
            var elementRelated = $('#fieldsmodule');
            elementRelated.html($('#fieldsmodule-'+parentModule).html());
            elementRelated.val($('#fieldsmodule-'+parentModule).val());
            elementRelated.attr('multiple',true).select2(thisInstance.paramsSelect2);
            var instance = new VTEMobile_Settings_Js();
            instance.makeColumnListSortable(elementRelated);
            thisInstance.arrangeSelectChoicesInOrder(parentModule,$(document).find('div#fields_modules'),elementRelated);
        });
    },
    registerChangeParentModuleForHeaderFields:function () {
         var thisInstance  = this;
        $('#parentmodule-header-fields').change(function () {
            var parentModule = $(this).val();
            var elementRelated = $('#fieldsmodule-header');
            elementRelated.html($('#fieldsmodule-header-'+parentModule).html());
            elementRelated.val($('#fieldsmodule-header-'+parentModule).val());
            elementRelated.attr('multiple',true).select2(thisInstance.paramsSelect2);
            var instance = new VTEMobile_Settings_Js();
            instance.makeColumnListSortable(elementRelated);
            thisInstance.arrangeSelectChoicesInOrder(parentModule,$(document).find('div#div_header_fields'),elementRelated);
        });
    },
    registerChangeParentModuleForAddressFields:function () {
        var thisInstance = this;
        $('#parentmodule-addressfields').change(function () {
            var parentModule = $(this).val();
            var elementRelated = $('#addressfieldsmodule');
            elementRelated.html($('#addressfieldsmodule-'+parentModule).html());
            elementRelated.val($('#addressfieldsmodule-'+parentModule).val());
            elementRelated.attr('multiple',true).select2(thisInstance.paramsSelect2);
        })
    },
     registerSaveSettings:function () {
         var thisInstance = this;
         $('#save-settings').click(function (e) {
             var selectedModule = [];
             var selectedModuleElements = jQuery('select[id="modulestoshow"]').select2('data');
             for(i=0; i<selectedModuleElements.length; i++) {
                 selectedModule.push(selectedModuleElements[i].id);
             }
             var modules = JSON.stringify(selectedModule);
             var params={
                 action: 'ActionSave',
                 module: 'VTEMobile',
                 mode: 'saveSettings',
                 modulesshow: modules
             };
             app.helper.showProgress();
             e.preventDefault();
             app.request.post({data: params}).then(
                 function (error, data) {
                     app.helper.hideProgress();
                     var params = {
                         message: 'Save settings success'
                     };
                     app.helper.showSuccessNotification(params);
                 }
             );
         });
         $('#save-settings-related').click(function (e) {
             var parentmodule = $('#parentmodule').val();
             var selectedModule = [];
             var selectedModuleElements = jQuery('select[id="relatedmodule"]').select2('data');
             for(i=0; i<selectedModuleElements.length; i++) {
                 selectedModule.push(selectedModuleElements[i].id);
             }
             var relatedmodules = JSON.stringify(selectedModule);
             var params={
                 action: 'ActionSave',
                 module: 'VTEMobile',
                 mode: 'saveSettingsRelated',
                 parentmodule: parentmodule,
                 relatedmodules: relatedmodules
             };
             app.helper.showProgress();
             e.preventDefault();
             app.request.post({data: params}).then(
                 function (error, data) {
                     var parentModule = $('#parentmodule').val();
                     var elementRelated = $('#relatedmodule');
                     $('#relatedmodule-'+parentModule).val(elementRelated.val());
                     $('#relatedmodule-'+parentModule).find('option').each(function () {
                         if($.inArray($(this).attr('value'), $('#relatedmodule-'+parentModule).val()) >=0 ){
                             $(this).attr('selected',true);
                         }else{
                             $(this).attr('selected',false);
                         }
                     });
                     $('#relatedmodule-'+parentModule).select2(thisInstance.paramsSelect2);
                     app.helper.hideProgress();
                     var params = {
                         message: 'Save settings success'
                     };
                     app.helper.showSuccessNotification(params);
                 }
             );
         });
         $('#save-settings-fields').click(function (e) {
             var parentmodule = $('#parentmodule-fields').val();
             var selectedValues = [];
             var selectValueElements = jQuery('select[id="fieldsmodule"]').select2('data');
             for(i=0; i<selectValueElements.length; i++) {
                 selectedValues.push(selectValueElements[i].id);
             }
             var fieldsmodule = JSON.stringify(selectedValues);
             var params={
                 action: 'ActionSave',
                 module: 'VTEMobile',
                 mode: 'saveSettingsFields',
                 parentmodule: parentmodule,
                 fieldsSettings: fieldsmodule
             };
             app.helper.showProgress();
             e.preventDefault();
             app.request.post({data: params}).then(
                 function (error, data) {
                     var parentModule = $('#parentmodule-fields').val();
                     var elementRelated = $('#fieldsmodule');
                     $('#fieldsmodule-'+parentModule).val(elementRelated.val());
                     $('#fieldsmodule-'+parentModule).find('option').each(function () {
                         if($.inArray($(this).attr('value'), $('#fieldsmodule-'+parentModule).val()) >=0 ){
                             $(this).attr('selected',true);
                         }else{
                             $(this).attr('selected',false);
                         }
                     });
                     $('#fieldsmodule-'+parentModule).select2(thisInstance.paramsSelect2);
                     app.helper.hideProgress();
                     var params = {
                         message: 'Save settings success'
                     };
                     app.helper.showSuccessNotification(params);
                 }
             );
         });
         $('#save-settings-headerfields').click(function (e) {
             var parentmodule = $('#parentmodule-header-fields').val();
             var selectedValues = [];
             var selectValueElements = jQuery('select[id="fieldsmodule-header"]').select2('data');
             for(i=0; i<selectValueElements.length; i++) {
                 selectedValues.push(selectValueElements[i].id);
             }
             var fieldsmodule = JSON.stringify(selectedValues);
             var params={
                 action: 'ActionSave',
                 module: 'VTEMobile',
                 mode: 'saveSettingHeaderFields',
                 parentmodule: parentmodule,
                 fieldsSettings: fieldsmodule
             };
             app.helper.showProgress();
             e.preventDefault();
             app.request.post({data: params}).then(
                 function (error, data) {
                     var parentModule = $('#parentmodule-header-fields').val();
                     var elementRelated = $('#fieldsmodule-header');
                     $('#fieldsmodule-header-'+parentModule).val(elementRelated.val());
                     $('#fieldsmodule-header-'+parentModule).find('option').each(function () {
                         if($.inArray($(this).attr('value'), $('#fieldsmodule-header-'+parentModule).val()) >=0 ){
                             $(this).attr('selected',true);
                         }else{
                             $(this).attr('selected',false);
                         }
                     });
                     $('#fieldsmodule-header-'+parentModule).select2(thisInstance.paramsSelect2);
                     app.helper.hideProgress();
                     var params = {
                         message: 'Save settings success'
                     };
                     app.helper.showSuccessNotification(params);
                 }
             );
         });
         $('#save-settings-addressfields').click(function (e) {
             var parentmodule = $('#parentmodule-addressfields').val();
             var fieldsmodule = JSON.stringify($('#addressfieldsmodule').val());
             var params={
                 action: 'ActionSave',
                 module: 'VTEMobile',
                 mode: 'saveSettingsAddressFields',
                 parentmodule: parentmodule,
                 fieldsSettings: fieldsmodule
             };
             app.helper.showProgress();
             e.preventDefault();
             app.request.post({data: params}).then(
                 function (error, data) {
                     var parentModule = $('#parentmodule-addressfields').val();
                     var elementRelated = $('#addressfieldsmodule');
                     $('#addressfieldsmodule-'+parentModule).val(elementRelated.val());
                     $('#addressfieldsmodule-'+parentModule).find('option').each(function () {
                         if($.inArray($(this).attr('value'), $('#addressfieldsmodule-'+parentModule).val()) >=0 ){
                             $(this).attr('selected',true);
                         }else{
                             $(this).attr('selected',false);
                         }
                     });
                     $('#addressfieldsmodule-'+parentModule).select2(thisInstance.paramsSelect2);
                     app.helper.hideProgress();
                     var params = {
                         message: 'Save settings success'
                     };
                     app.helper.showSuccessNotification(params);
                 }
             );
         });

         $('#google_authenticator').change(function (e) {
             app.helper.showProgress();
             var elm=$(e.currentTarget);
             var val=0;
             var message = app.vtranslate('JS_DISABLE_GOOGLE_AUTHENTICATION');
             if(elm.is(':checked')) {
                 val = 1;
                 message = app.vtranslate('JS_ENABLED_GOOGLE_AUTHENTICATION');
                 var messageCheck = app.vtranslate('CONFIGURE_GOOGLE_AUTHENTICATION');
                 var paramscheck ={
                     action: 'Activate',
                     module: 'VTEMobile',
                     mode: 'checkEnableGoogleAuthenticator',
                 };
                 app.request.post({data: paramscheck}).then(
                     function (error, data) {
                         if(data.success){
                             var params={
                                 action: 'ActionSave',
                                 module: 'VTEMobile',
                                 mode: 'enableGoogleAuth',
                                 value: val
                             };

                             app.request.post({data: params}).then(
                                 function (error, data) {
                                     app.helper.hideProgress();
                                     var params = {
                                         message: message
                                     };
                                     app.helper.showSuccessNotification(params);
                                 }
                             );
                         }else{
                             app.helper.hideProgress();
                             app.helper.showErrorNotification({message:messageCheck});
                             $('#google_authenticator').prop('checked', false);

                         }
                     }
                 );
             }else{
                 var params={
                     action: 'ActionSave',
                     module: 'VTEMobile',
                     mode: 'enableGoogleAuth',
                     value: val
                 };

                 app.request.post({data: params}).then(
                     function (error, data) {
                         app.helper.hideProgress();

                         var params = {
                             message: message
                         };
                         app.helper.showSuccessNotification(params);
                     }
                 );
             }

         });

         $('#save-settings-defaultmodule').click(function (e) {
             var defaultmodule = $('#default_module').val();
             var params={
                 action: 'ActionSave',
                 module: 'VTEMobile',
                 mode: 'saveDefaultModule',
                 defaultmodule: defaultmodule
             };
             app.helper.showProgress();
             e.preventDefault();
             app.request.post({data: params}).then(
                 function (error, data) {
                     app.helper.hideProgress();
                     var params = {
                         message: 'Save settings success'
                     };
                     app.helper.showSuccessNotification(params);
                 }
             );
         });


     },
    arrangeSelectChoicesInOrder : function(module,contentsContainer, element) {
        var chosenElement = element.closest('div.row').find('.select2-container');
        var choicesContainer = chosenElement.find('ul.select2-choices');
        var choicesList = choicesContainer.find('li.select2-search-choice');
        var columnListSelectElement = element;
        var selectedOptions = columnListSelectElement.find('option:selected');
        var selectedOrder = JSON.parse(jQuery('input[name="columnslist"]', contentsContainer).val());
        if(module){
            if(!selectedOrder){
                return;
            }else if(!selectedOrder[module]){
                return ;
            }
            selectedOrder = selectedOrder[module];
        }
        for(var index=selectedOrder.length ; index > 0 ; index--) {
            var selectedValue = selectedOrder[index-1];
            var value = selectedValue.replace("'", "&#39;");
            var option = selectedOptions.filter('[value="'+value+'"]');
            choicesList.each(function(choiceListIndex,element){
                var liElement = jQuery(element);
                if(liElement.find('div').html() == option.html()){
                    choicesContainer.prepend(liElement);
                    return false;
                }
            });
        }
    },
     registerEvents : function() {
         this._super();
         this.registerSaveSettings();
         this.registerChangeParentModule();
         this.registerChangeParentModuleForFields();
         this.registerChangeParentModuleForAddressFields();
         this.registerChangeParentModuleForHeaderFields();
         this.registerSortableMenuBar();
         $('#parentmodule').trigger('change');
         $('#parentmodule-fields').trigger('change');
         $('#addressfieldsmodule').trigger('change');
         $('#parentmodule-addressfields').trigger('change');
         $('#parentmodule-header-fields').trigger('change');
     }
});
