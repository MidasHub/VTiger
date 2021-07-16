/* ********************************************************************************
 * The content of this file is subject to the Related Record Update ("License");
 * You may not use this file except in compliance with the License
 * The Initial Developer of the Original Code is VTExperts.com
 * Portions created by VTExperts.com. are Copyright(C) VTExperts.com.
 * All Rights Reserved.
 * ****************************************************************************** */
Vtiger_Index_Js("VTEMobile_Settings_Js",{
    instance:false,
    getInstance: function(){
        if(VTEMobile_Settings_Js.instance == false){
            var instance = new VTEMobile_Settings_Js();
            VTEMobile_Settings_Js.instance = instance;
            return instance;
        }
        return VTEMobile_Settings_Js.instance;
    }
},{
    /* For License page - Begin */
    init : function() {
        this.initiate();
    },
    /*`
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
                    function(err, data) {
                        app.helper.hideProgress();
                        if(data) {
                            var message=data.message;
                            if(message !='Valid License') {
                                jQuery('#error_message').html(message);
                                jQuery('#error_message').show();
                            }else{
                                document.location.href="index.php?module=VTEMobile&parent=Settings&view=Settings&mode=step3";
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
            var params = {};
            params['module'] = app.getModuleName();
            params['action'] = 'Activate';
            params['mode'] = 'valid';

            app.request.post({'data':params}).then(
                function (err, data) {
                    app.helper.hideProgress();
                    if(err === null) {
                        document.location.href = "index.php?module=VTEMobile&parent=Settings&view=Settings";
                    }
                },
                function (error) {
                    app.helper.hideProgress();
                }
            );
        });
    },

    makeColumnListSortable : function(element) {
        var select2Element = element.closest('div.row').find('.select2-container');
        var chozenChoiceElement = select2Element.find('ul.select2-choices');
        chozenChoiceElement.sortable({
            'containment': chozenChoiceElement,
            start: function() { },
            update: function() {}
        });
    },

    /* For License page - End */

    registerUploadImage: function (container) {
        var thisInstance = this;
        jQuery('input[type=file]', container).on('change', function (event) {
            event.preventDefault();
            var element = $(this);
            var val = $(this).val().toLowerCase();
            var regex = new RegExp("(.*?)\.(jpg|png|gif|jpeg)$");
            if (!(regex.test(val))) {
                $(this).val('');
                var params = {};
                params['text']=app.vtranslate('IMG_TYPE_FORMAT_WRONG_MSG');
                Vtiger_Helper_Js.showMessage(params);
                return;
            }
            var tdElement = $(this).closest('div.upload_image');
            var progress = tdElement.find('.progress');
            var bar = tdElement.find('.progress-bar');
            var percent = tdElement.find('.percent');
            var list_img = tdElement.find('.list_image');
            progress.show();

            container.ajaxSubmit({
                'url': 'index.php?module=VTEMobile&parent=Settings&action=ActionSave&mode=saveImage&input_name='+element.attr('name'),
                'type': 'POST',
                beforeSend: function () {
                    var percentVal = '0%';
                    bar.width(percentVal);
                    percent.html(percentVal);
                },
                uploadProgress: function (event, position, total, percentComplete) {
                    var percentVal = percentComplete + '%';
                    bar.width(percentVal);
                    percent.html(percentVal);
                },
                complete: function (xhr) {
                    var response = $.parseJSON(xhr.responseText);
                    element.val('');
                    list_img.html(response.result);
                    thisInstance.registerRemoveImage(container);
                    setTimeout(function () {
                        progress.hide();
                    }, 5000);
                }
            });
        });
    },

    registerRemoveImage: function (container) {
        jQuery('input.remove', container).on('click', function (event) {
            event.preventDefault();
            var element = $(event.currentTarget);
            var img_box = element.closest('.img_uploaded');
            app.helper.showProgress();
            var params = {};
            params['module'] = app.getModuleName();
            params['action'] = 'ActionSave';
            params['mode'] = 'removeImage';
            params['input_name'] = element.data('input-name');

            app.request.post({'data':params}).then(
                function (err, data) {
                    app.helper.hideProgress();
                    if(err === null) {

                        console.log(img_box);
                        img_box.remove();
                    }
                },
                function (error) {
                    app.helper.hideProgress();
                }
            );

        });
    },

    registerEvents: function(){
        // this._super();
        /* For License page - Begin */
        this.registerActivateLicenseEvent();
        this.registerValidEvent();
        /* For License page - End */
        var LoginScreenForm = $('#LoginScreenForm');
        this.registerUploadImage(LoginScreenForm);
        this.registerRemoveImage(LoginScreenForm);
    }
});
jQuery(document).ready(function() {
    var instance = new VTEMobile_Settings_Js();
    instance.registerEvents();
});