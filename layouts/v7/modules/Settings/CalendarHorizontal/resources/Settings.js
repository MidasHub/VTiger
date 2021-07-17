/* * *******************************************************************************
 * The content of this file is subject to the VTE Calendar Horizontal ("License");
 * You may not use this file except in compliance with the License
 * The Initial Developer of the Original Code is VTExperts.com
 * Portions created by VTExperts.com. are Copyright(C)VTExperts.com.
 * All Rights Reserved.
 * ****************************************************************************** */
//jQuery.Class('Settings_CalendarHorizontal_Js', {
Settings_Vtiger_Index_Js('Settings_CalendarHorizontal_Settings_Js', {

}, {
    ckEditorInstance: false,

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
                errorMsg = "License Key cannot be empty";
                license_key.validationEngine('showPrompt', errorMsg , 'error','bottomLeft',true);
                aDeferred.reject();
                return aDeferred.promise();
            }else{
                app.helper.showProgress();
                var params = {};
                params['module'] = app.getModuleName();
                params['action'] = 'Activate';
                params['mode'] = 'activate';
                params['parent'] = 'Settings';
                params['license'] = license_key.val();

                app.request.post({'data' : params}).then(
                    function(err,data){
                        if(err === null) {
                            app.helper.hideProgress();
                            if(data) {
                                var message=data.message;
                                if(message !='Valid License') {
                                    jQuery('#error_message').html(message);
                                    jQuery('#error_message').show();
                                }else{
                                    document.location.href="index.php?module=CalendarHorizontal&parent=Settings&view=Settings&mode=step3";
                                }
                            }
                        }else{
                            app.helper.hideProgress();;
                        }
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
            params['parent'] = 'Settings';

            app.request.post({'data' : params}).then(
                function(err,data){
                    if(err === null) {
                        app.helper.hideProgress();
                        if (data) {
                            document.location.href = "index.php?module=CalendarHorizontal&parent=Settings&view=Settings";
                        }
                    }else{
                        app.helper.hideProgress();
                    }
                }
            );
        });
    },
    /* For License page - End */

    /**
     * Function to get ckEditorInstance
     */
    getckEditorInstance: function () {
        if (this.ckEditorInstance == false) {
            this.ckEditorInstance = new Vtiger_CkEditor_Js();
        }
        return this.ckEditorInstance;
    },

    registerLoadCKEditorEvents: function () {
        var textAreaElementEvents = jQuery('#events_custom_title');
        var textAreaElementCalendar = jQuery('#calendar_custom_title');
        var ckEditorInstance = this.getckEditorInstance();
        ckEditorInstance.loadCkEditor(textAreaElementEvents);
        ckEditorInstance.loadCkEditor(textAreaElementCalendar);
        this.registerFillCustomTitleEvent();
    },

    registerFillCustomTitleEvent: function () {
        $('[name=events_fields]').on('change', function (e) {
            var textarea = CKEDITOR.instances.events_custom_title;
            var value = jQuery(e.currentTarget).val();
            if (textarea != 'undefined') {
                textarea.insertHtml(value);
            } else if (jQuery('textarea[name="events_custom_title"]')) {
                var textArea = jQuery('textarea[name="events_custom_title"]');
                textArea.insertAtCaret(value);
            }
        });
        $('[name=calendar_fields]').on('change', function (e) {
            var textarea = CKEDITOR.instances.calendar_custom_title;
            var value = jQuery(e.currentTarget).val();
            if (textarea != 'undefined') {
                textarea.insertHtml(value);
            } else if (jQuery('textarea[name="calendar_custom_title"]')) {
                var textArea = jQuery('textarea[name="calendar_custom_title"]');
                textArea.insertAtCaret(value);
            }
        });
    },

    registerEvents : function() {
        this._super();
        this.registerActivateLicenseEvent();
        this.registerValidEvent();
        if($('#calendar-horizontal-settings-edit-container').length) {
            this.registerLoadCKEditorEvents();
        }
    }
});

//http://stackoverflow.com/questions/946534/insert-text-into-textarea-with-jquery
jQuery.fn.extend({
    insertAtCaret: function(myValue) {
        return this.each(function(i) {
            if (document.selection) {
                //For browsers like Internet Explorer
                this.focus();
                var sel = document.selection.createRange();
                sel.text = myValue;
                this.focus();
            } else if (this.selectionStart || this.selectionStart == '0') {
                //For browsers like Firefox and Webkit based
                var startPos = this.selectionStart;
                var endPos = this.selectionEnd;
                var scrollTop = this.scrollTop;
                this.value = this.value.substring(0, startPos)+myValue+this.value.substring(endPos,this.value.length);
                this.focus();
                this.selectionStart = startPos + myValue.length;
                this.selectionEnd = startPos + myValue.length;
                this.scrollTop = scrollTop;
            } else {
                this.value += myValue;
                this.focus();
            }
        });
    }
});