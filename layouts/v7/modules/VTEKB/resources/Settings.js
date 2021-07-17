/* ********************************************************************************
 * The content of this file is subject to the Knowledge Base ("License");
 * You may not use this file except in compliance with the License
 * The Initial Developer of the Original Code is VTExperts.com
 * Portions created by VTExperts.com. are Copyright(C) VTExperts.com.
 * All Rights Reserved.
 * ****************************************************************************** */
Vtiger_List_Js("VTEKB_Settings_Js",{
    instance:false,
    getInstance: function(){
        if(VTEKB_Settings_Js.instance == false){
            var instance = new VTEKB_Settings_Js();
            VTEKB_Settings_Js.instance = instance;
            return instance;
        }
        return VTEKB_Settings_Js.instance;
    }
},{
    /* For License page - Begin */
    init : function() {
        this.initiate();
    },
    /*
     * Function to initiate the step 1 instance
     */
    initiate : function(){
        var step=jQuery(".installationContents").find('.step').val();
        this.initiateStep(step);
    },
    /*
     * Function to initiate all the operations for a step
     * @params step value
     */
    initiateStep : function(stepVal) {
        var step = 'step'+stepVal;
        this.activateHeader(step);
    },

    activateHeader : function(step) {
        var headersContainer = jQuery('.crumbs ');
        headersContainer.find('.active').removeClass('active');
        jQuery('#'+step,headersContainer).addClass('active');
    },

    registerActivateLicenseEvent : function() {
        var aDeferred = jQuery.Deferred();
        jQuery(".installationContents").find('[name="btnActivate"]').click(function() {
            var license_key=jQuery('#license_key');
            if(license_key.val()=='') {
                app.helper.showAlertBox({message:"License Key cannot be empty"});
                aDeferred.reject();
                return aDeferred.promise();
            }else{
                app.helper.showProgress();
                var params = {};
                params['module'] = app.getModuleName();
                params['action'] = 'Activate';
                params['mode'] = 'activate';
                params['license'] = license_key.val();

                app.request.post({data:params}).then(
                    function(err,data) {
                        app.helper.hideProgress();
                        if(err == null){
                            var message=data['message'];
                            if(message !='Valid License') {
                                app.helper.hideProgress();
                                app.helper.hideModal();
                                app.helper.showAlertNotification({'message':data['message']});
                            }else{
                                document.location.href="index.php?module=VTEKB&parent=Settings&view=Settings&mode=step3";
                            }
                        }
                    },
                    function(error) {
                        app.helper.hideProgress();
                    }
                );
            }
        });
    },
    registerValidEvent: function () {
        jQuery(".installationContents").find('[name="btnFinish"]').click(function() {
            app.helper.showProgress();
            var data = {};
            data['module'] = 'VTEKB';
            data['action'] = 'Activate';
            data['mode'] = 'valid';
            app.request.post({data:data}).then(
                function (err,data) {
                    if(err == null){
                        app.helper.hideProgress();
                        if (data) {
                            document.location.href = "index.php?module=VTEKB&parent=Settings&view=Settings";
                        }
                    }
                }
            );
        });
    },
    /* For License page - End */

    registerEnableModuleEvent:function() {
        jQuery('.summaryWidgetContainer').find('#enable_module').change(function(e) {
            var progressIndicatorElement = jQuery.progressIndicator({
                'position' : 'html',
                'blockInfo' : {
                    'enabled' : true
                }
            });

            var element=e.currentTarget;
            var value=0;
            var status='false';
            var text="Knowledge Base Disabled";
            if(element.checked) {
                value=1;
                status='true';
                text = "Knowledge Base Enabled";
            }
            var params = {};
            params.action = 'ActionAjax';
            params.module = 'VTEKB';
            params.value = value;
            params.status = status;
            params.mode = 'enableModule';
            app.request.post({'data':params}).then(
                function(err,data){
                    if(err === null) {
                        app.helper.hideProgress();
                        var params = {
                            message: data.result,
                        };
                        app.helper.showSuccessNotification(params);
                    }else{
                        app.helper.hideProgress();
                    }
                }
            );
        });
            
        $("#btnFAQSave").click(function(){
            app.helper.showProgress();
            var params = {};
            params.action = 'ActionAjax';
            params.module = 'VTEKB';
            params.mode = 'saveSettings';
            params.number_display = $("#txtNumberDisplay").val();
            var openByDefault = 0;
            if ($("#chkOpenByDefault").prop("checked")){
                openByDefault = 1;
            }
            params.open_by_default = openByDefault;
            app.request.post({'data':params}).then(
                function(err,data){
                    if(err === null) {
                        app.helper.hideProgress();
                        var params = {
                            message: data.message,
                        };
                        app.helper.showSuccessNotification(params);
                    }else{
                        app.helper.hideProgress();
                    }
                }
            );
        });
    },
    registerEvents: function(){
        this.registerEnableModuleEvent();
        /* For License page - Begin */
        this.registerActivateLicenseEvent();
        this.registerValidEvent();
        /* For License page - End */
    }
});

jQuery(document).ready(function() {
    var instance = new VTEKB_Settings_Js();
    instance.registerEvents();
    Vtiger_Index_Js.getInstance().registerEvents();
    if (typeof($('').bootstrapSwitch) == 'function'){
        $("#chkOpenByDefault").bootstrapSwitch();
    }

    $(".lblTooltip").tooltip({
        html: true,
        position: {
            my: "center right", // the "anchor point" in the tooltip element
            at: "center right" // the position of that anchor point relative to selected element
        }
    });
});