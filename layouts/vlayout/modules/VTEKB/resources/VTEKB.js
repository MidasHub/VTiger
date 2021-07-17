/* ********************************************************************************
 * The content of this file is subject to the VTEKB ("License");
 * You may not use this file except in compliance with the License
 * The Initial Developer of the Original Code is VTExperts.com
 * Portions created by VTExperts.com. are Copyright(C) VTExperts.com.
 * All Rights Reserved.
 * ****************************************************************************** */

jQuery.Class("VTEKB_Js",{
    instance:false,
    getInstance: function(){
        if(VTEKB_Js.instance == false){
            var instance = new VTEKB_Js();
            VTEKB_Js.instance = instance;
            return instance;
        }
        return VTEKB_Js.instance;
    }
},{
    recordId: null,
    moduleEditName: null,
    controlElementTd: null,
    dataEdit: null,
    VTEKBCallBacks: [],
    registerVTEKBEvent: function(){
        var thisInstance=this;
        var moduleName = app.getModuleName();
		
        if (moduleName == 'Faq'){
            if (app.getViewName() == 'Edit'){
				if (typeof CkEditor === 'undefined') {
					loadScript('libraries/jquery/ckeditor/ckeditor.js', function () {
						loadScript('libraries/jquery/ckeditor/adapters/jquery.js', function () {
							loadScript('layouts/vlayout/modules/Vtiger/resources/CkEditor.js', function () {
								var answerRT = jQuery('[name="cf_answer_rt"]');
								if (answerRT.length > 0) {
									var ckEditorInstance = new Vtiger_CkEditor_Js();
									ckEditorInstance.loadCkEditor(answerRT, {});
								}
							});
						});
					});
				}
            } else if (app.getViewName() == 'Detail'){
                var answerRT = jQuery("#Faq_detailView_fieldValue_cf_answer_rt span.value");
                var fullcontent = answerRT.html();
                if(typeof fullcontent != 'undefined'){
                    fullcontent = fullcontent.replace(/>/g, '&gt;').replace(/</g, '&lt;');
                    var html =  $("<div />").html(fullcontent).text();
                    $(answerRT).html(html);
                }
                
                $("body").delegate('[name="cf_answer_rt"]', 'click', function(){
                    var answerRT = jQuery('[name="cf_answer_rt"]');
                    if (answerRT.length > 0) {
                        if (!answerRT.attr('id')){
                            answerRT.attr("id", "Faq_detailView_fieldName_cf_answer_rt");
                        }
                        var ckEditorInstance = new Vtiger_CkEditor_Js();
                        ckEditorInstance.loadCkEditor(answerRT, {});
                    }
                });
            }
        }
		
		// Add icon to header
		thisInstance.addIconToHeader();
		
		$("body").on("click", ".vte-back", function(){
			thisInstance.showListOverlay();
		});
		
		$("body").on("click", ".openDetail", function(){
			var id = $(this).data("id");
			thisInstance.showDetailOverlay(id);
		});
		
		// Show more button
		$("body").delegate(".show_more_list", "click", function(){
			currentVTEKBInstance = $(this);
			var progressIndicatorElement = jQuery.progressIndicator({
				'position' : 'html',
				'blockInfo' : {
					'enabled' : true
				}
			});
			var params = {};
			params.action = 'ActionAjax';
			params.module = 'VTEKB';
			params.mode = 'showMoreOnList';
			params.p = $(this).attr('data-page');
			params.category = $(this).attr('data-category');
			AppConnector.request(params).then(
				function(data) {
					progressIndicatorElement.progressIndicator({'mode' : 'hide'});
					currentVTEKBInstance.attr("data-page", data.page);
					var copyCurrentVTEKBInstance = currentVTEKBInstance.clone();
					var total = data.records.length;
					var parents = currentVTEKBInstance.closest("ul")
					for(var i = 0; i < total; i++){
						var record = data.records[i];
						var idFaq = record.id;
						if (parents.find("li[data-id='" + idFaq + "']").length == 0){
							var html = "<li class='openDetail' data-id='" + idFaq + "'><a href='javascript: void(0);'><i class='fa fa-file-text-o'></i>&nbsp;&nbsp;" + record.question + "</a></li>";
							parents.append(html);
						}
					}
					currentVTEKBInstance.remove();
					if (data.show_more == 1){
						parents.append(copyCurrentVTEKBInstance);
					}
				},
				function(error) {
					progressIndicatorElement.progressIndicator({'mode' : 'hide'});
				}
			);
		});
    },
	
	addIconToHeader: function(){
        var thisInstance=this;
		if ($("#headerLinksBig").find("span.vtekb").length == 0){
			$("#headerLinksBig").prepend("<span class='span vtekb'><a href='javascript: void(0);' class='icon-question-sign icon-white' title='" + app.vtranslate('VTEKB') + "'></a></span>");
		}
		$("body").on("click", "span.vtekb a", function(){
			thisInstance.showListOverlay();
		});
	},
	
	showListOverlay: function(){
		// app.hideModalWindow();
		var progressIndicatorElement = jQuery.progressIndicator({
			'position' : 'html',
			'blockInfo' : {
				'enabled' : true
			}
		});

		var params = {
			'module' : 'VTEKB',
			'view' : 'OverLay',
			'mode' : 'showList',
			'source_module': app.getModuleName()
		}
		AppConnector.request(params).then(
			function(data){
				progressIndicatorElement.progressIndicator({'mode' : 'hide'});
				app.showModalWindow(data, function(){
				});
			},
			function(error) {
				app.helper.showErrorNotification({"message":err});
			}
		);
	},
	
	showDetailOverlay: function(id){
        var thisInstance=this;
		var params = {
			'module' : 'VTEKB',
			'view' : 'OverLay',
			'mode' : 'showDetail',
			'source_module': app.getModuleName(),
			'faqId': id
		}
		var progressIndicatorElement = jQuery.progressIndicator({
			'position' : 'html',
			'blockInfo' : {
				'enabled' : true
			}
		});
		AppConnector.request(params).then(
			function(data){
				progressIndicatorElement.progressIndicator({'mode' : 'hide'});
				app.hideModalWindow();
				app.showModalWindow(data, function(){
					app.showScrollBar($(".vtekb-content"),  {'height': '535px'});
				});
			},
			function(error) {
				app.helper.showErrorNotification({"message":err});
			}
		);
	},
	
    registerEvents: function() {
        this.registerVTEKBEvent();
    }
});

/**
 * @Link http://stackoverflow.com/questions/950087/how-to-include-a-javascript-file-in-another-javascript-file#answer-950146
 */
function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

jQuery(document).ready(function(){
    buildEventForNewUIType();
    
    var moduleName = app.getModuleName();
    var viewName = app.getViewName()
    
    // Only load when loadHeaderScript=1 BEGIN #241208
    if (typeof VTECheckLoadHeaderScript == 'function') {
        if (!VTECheckLoadHeaderScript('VTEKB')) {
            return;
        }
    }
    // Only load when loadHeaderScript=1 END #241208

    var VTEKB = new VTEKB_Js();
    VTEKB.registerVTEKBEvent();
});

function buildEventForNewUIType(){
    $('body').on("change", "[data-vteusergroup], [data-vtemodule]", function(){
        var parent = $(this).closest('form');
        var id = $(this).data("name");
        var newValue = '';
        var currentValue = $(this).val();
        var total = currentValue.length;
        for(var i = 0; i < total; i++){
            if (newValue){
                newValue += ';';
            }
            newValue += currentValue[i].toString();
        }
        parent.find("[name='" + id + "']").val(newValue);
    });
}