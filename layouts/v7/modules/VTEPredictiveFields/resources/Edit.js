/* ********************************************************************************
 * The content of this file is subject to the Predictive Fields/Bills ("License");
 * You may not use this file except in compliance with the License
 * The Initial Developer of the Original Code is VTExperts.com
 * Portions created by VTExperts.com. are Copyright(C) VTExperts.com.
 * All Rights Reserved.
 * ****************************************************************************** */
Vtiger.Class("VTEPredictiveFields_Edit_Js",{
    instance:false,
    getInstance: function(){
        if(VTEPredictiveFields_Edit_Js.instance == false){
            var instance = new VTEPredictiveFields_Edit_Js();
            VTEPredictiveFields_Edit_Js.instance = instance;
            return instance;
        }
        return VTEPredictiveFields_Edit_Js.instance;
    }
},{
    registerEventSelectModule:function(){
        var self = this;
        $('#custom_module').on('change',function(){
            var element = $(this)
            var moduleSelected = element.val();
            var params = {
                module : 'VTEPredictiveFields',
                view : 'RelatedFields',
                moduleSelected : moduleSelected
            };
            AppConnector.request(params).then(
                function (data) {
                    $('#list_fields_modal').html(data.result);
                }
            );
        });
    },
    registerEventSaveSelectedFields : function () {
        var modal = $("#ModalFields");
        modal.find(".btn-save-fields").on('click', function () {
            var array_enabled_modules = new Array();
            var array_un_selected_fields = new Array();
            $('input[name="list_fields"]').each(function () {
                if($(this).is(':checked')){
                    array_enabled_modules.push($(this).val());
                }else{
                    array_un_selected_fields.push($(this).val());
                }
            });
            if(array_enabled_modules.length > 0){
                $('[name="selected_fields"]').val(JSON.stringify(array_enabled_modules));
                $('[name="un_selected_fields"]').val(JSON.stringify(array_un_selected_fields));
            }
            modal.modal('toggle');
            $("#added_field").val(1);
            $("form[name='EditVTEPredictiveFields']").submit();
        })
    },
    analyzeDataForPredictions:function(){
        var selected_module = $('#custom_module').val();
        var last_x_days = $('#last_x_days').val();
        var predictive_id = $('#record').val();
        var params = {
            module : 'VTEPredictiveFields',
            'action' : 'ActionAjax',
            'mode' : 'analyzeDataForPredictions',
            'selected_module' : selected_module,
            'predictive_id':predictive_id,
            'last_x_days' : last_x_days
        }
        app.helper.showProgress();
        AppConnector.request(params).then(function(data){
            if(data){
                app.helper.hideProgress();
                app.helper.showSuccessNotification({
                    message : app.vtranslate('Analyzed successfully.')
                });
                window.location.reload();
            }
        });
    },
    registerEventAnalyzeAllButtonClick : function () {
        var self = this;
        $(".analyzeAllButton").on('click', function () {
            var params = {};
            params.action = 'ActionAjax';
            params.module = 'VTEPredictiveFields';
            params.mode = 'getCountOfModTracker';
            app.helper.showAlertNotification({message:'Analyzing database...'});
            app.request.post({'data' : params}).then(
                function(err,data){
                    if(err === null) {
                        if(data.count < 100000){
                            self.analyzeDataForPredictions();
                        }else{
                            app.helper.showConfirmationBox({message:"You are about to analyze "+data.count+" historical updates. This process can take up to 5-10 minutes. Your vtiger session will be occupied by this process. You will likely will not be able to navigate vtiger while this is running. This will only affect your user, everyone else will still be able to use vtiger as usual. If the process does not complete properly or you don't see any values in predictions column, you should then analyze each field individually using [o] button."}).then(function(){
                                self.analyzeDataForPredictions();
                            });
                        }
                    }else{
                    }
                }
            );
        })
    },
    registerEventAnalyzeThisButtonClick : function () {
        $(".analyzeThis").on('click', function () {
            var selected_module = $('#custom_module').val();
            var last_x_days = $('#last_x_days').val();
            var predictive_id = $('#record').val();
            var this_name = $(this).data('fieldname');
            var params = {
                module : 'VTEPredictiveFields',
                'action' : 'ActionAjax',
                'mode' : 'analyzeDataForPredictions',
                'selected_module' : selected_module,
                'predictive_id':predictive_id,
                'last_x_days' : last_x_days,
                'this_name' : this_name
            }
            app.helper.showProgress();
            AppConnector.request(params).then(function(data){
                if(data){
                    app.helper.hideProgress();
                    app.helper.showSuccessNotification({
                        message : app.vtranslate('Analyzed successfully.')
                    });
                    window.location.reload();
                }
            });
        })
    },
    registerShowTooltip:function(){
        var thisInstance = this;
        jQuery(document).on("hover", ".vtepredictive-tooltip", function() {
            var html =  $(this).data('tooltip');
            thisInstance.showVtePredictiveTooltip(jQuery(this),html);
        });
    },
    showVtePredictiveTooltip : function(obj,html){
        //var target_on_quick_form = jQuery("#QuickCreate").find(obj);
        var template = '<div class="popover" role="tooltip" style="background: #003366">' +
            '<style>' +
            '.popover.bottom > .arrow:after{border-bottom-color:red;2px solid #ddd}' +
            '.popover-content{font-size: 11px}' +
            '.popover-title{background: red;text-align:center;color:#f4f12e;font-weight: bold;}' +
            '.popover-content ul{padding: 5px 5px 0 10px}' +
            '.popover-content li{list-style-type: none}' +
            '.popover{border: 2px solid #ddd;z-index:99999999;color: #fff;box-shadow: 0 0 6px #000; -moz-box-shadow: 0 0 6px #000;-webkit-box-shadow: 0 0 6px #000; -o-box-shadow: 0 0 6px #000;padding: 4px 10px 4px 10px;border-radius: 6px; -moz-border-radius: 6px; -webkit-border-radius: 6px; -o-border-radius: 6px;}' +
            '</style><div class="arrow">' +
            '</div>' +
            '<div class="popover-content"></div></div>';
        obj.popover({
            content: html,
            animation : true,
            placement: 'auto top',
            html: true,
            template:template,
            container: 'body',
            trigger: 'focus'
        });
        $('.popover').remove();
        jQuery(obj).popover('show');
        jQuery('.popover').on('mouseleave',function () {
            jQuery(obj).popover('hide');
        });
    },
    registerDeletePredictions:function(){
        $('a#predictive_field_delete').on('click',function(e){
            var currentElement = jQuery(e.currentTarget);
            app.helper.showConfirmationBox({
                message: 'Do you want delete this record ?'
            }).then(function () {
                var params = {
                    module : 'VTEPredictiveFields',
                    'action' : 'ActionAjax',
                    'mode' : 'deletePredictions',
                    'record' : currentElement.data('id')
                }
                AppConnector.request(params).then(function(data){
                    if(data){
                        window.location.reload();
                    }
                });
            });
        });
    },
    registerSwitchBootstrap:function(){
        var self = this;
        $('input.switch').bootstrapSwitch();
        $('input.switch').on('switchChange.bootstrapSwitch',function(event, state){
            var name = $(this).attr('name');
            var value = state == true ? 1 : 0;
            var id = $(this).data('id');
            var fieldname = $(this).data('fieldname');
            var parent_id = $(this).data('parent-id');
            self.updatePrediction(name,parent_id,fieldname,value);
        });
    },
    updatePrediction:function(name,parent_id,fieldname,value){
        var params = {};
        params.action = 'ActionAjax';
        params.module = 'VTEPredictiveFields';
        params.mode = 'updatePrediction';
        params.name = name;
        params.parent_id = parent_id;
        params.fieldname = fieldname;
        params.value = value;
        app.request.post({'data' : params}).then(
            function(err,data){
                if(err === null) {
                    console.log('Record has been updated.');
                }else{
                }
            }
        );
    },
    registerVTEPredictiveFieldButtonSaveEvent:function(){
        var self = this;
        $('.VTEPredictiveFieldButtonSave').on('click',function(){
            var record = $('#record').val();
            var params = {};
            params.action = 'ActionAjax';
            params.module = 'VTEPredictiveFields';
            params.mode = 'checkIsAnalyzeAnyFields';
            params.record = record;
            app.request.post({'data' : params}).then(
                function(err,data){
                    if(err === null) {
                        if(data.check == false){
                            app.helper.showConfirmationBox({message:"You did not analyze any of the fields. In order for this to work, fields have to be analyzed. Would you like to do that now?"}).then(
                                function(){
                                    var selected_module = $('#custom_module').val();
                                    var last_x_days = $('#last_x_days').val();
                                    var predictive_id = $('#record').val();
                                    var params = {
                                        module : 'VTEPredictiveFields',
                                        'action' : 'ActionAjax',
                                        'mode' : 'analyzeDataForPredictions',
                                        'selected_module' : selected_module,
                                        'predictive_id':predictive_id,
                                        'last_x_days' : last_x_days
                                    }
                                    app.helper.showProgress();
                                    AppConnector.request(params).then(function(data){
                                        if(data){
                                            app.helper.hideProgress();
                                            app.helper.showSuccessNotification({
                                                message : app.vtranslate('Analyzed successfully.')
                                            });
                                            self.savePredictiveFields();
                                        }
                                    });
                                },
                                function(){
                                    self.savePredictiveFields();
                                }
                            );
                        }else{
                            self.savePredictiveFields();
                        }
                    }else{
                    }
                }
            );
        })
    },
    savePredictiveFields:function(){
        var dont_show_if_older_than  = $('input[name="dont_show_if_older_than"]');
        var arr = new Array();
        dont_show_if_older_than.each(function(k,item){
            var value = $(this).val();
            var fieldname = $(this).data('fieldname');
            var parent_id = $(this).data('parent-id');
            arr.push({value:value,fieldname:fieldname,parent_id:parent_id});
        });
        var params = {};
        params.action = 'ActionAjax';
        params.module = 'VTEPredictiveFields';
        params.mode = 'update_dont_show_if_older_than';
        params.arr = arr;
        app.request.post({'data' : params}).then(
            function(err,data){
                if(err === null) {
                    $("form[name='EditVTEPredictiveFields']").submit();
                }else{
                }
            }
        );
    },
    registerEvents: function(){
        this.registerEventSelectModule();
        this.registerEventSaveSelectedFields();
        this.registerEventAnalyzeAllButtonClick();
        this.registerEventAnalyzeThisButtonClick();
        this.registerShowTooltip();
        this.registerDeletePredictions();
        this.registerSwitchBootstrap();
        this.registerVTEPredictiveFieldButtonSaveEvent();
    }
});
jQuery(document).ready(function() {
    var instance = new VTEPredictiveFields_Edit_Js();
    instance.registerEvents();
});
$(function () {
    $('[data-toggle="popover"]').popover()
})