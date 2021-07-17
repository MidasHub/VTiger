/* ********************************************************************************
 * The content of this file is subject to the VTEKB ("License");
 * You may not use this file except in compliance with the License
 * The Initial Developer of the Original Code is VTExperts.com
 * Portions created by VTExperts.com. are Copyright(C) VTExperts.com.
 * All Rights Reserved.
 * ****************************************************************************** */

var instanceVTEKBHelper = null;

Vtiger_Helper_Js('VTEKB_Helper_JS', {
    instance:false,
    getInstance: function(){
        if(VTEKB_Helper_JS.instance == false){
            var instance = new VTEKB_Helper_JS();
            VTEKB_Helper_JS.instance = instance;
            return instance;
        }
        return VTEKB_Helper_JS.instance;
    }
}, {

    loadPageOverlay : function(data, params) {
        $('body').css('overflow-y', 'hidden');
        var overlayPage = jQuery('#overlayPage');
        var aDeferred = new jQuery.Deferred();
        if(typeof params == "undefined") {
            params = {};
        }

        var defaultParams = this.defaultModalParams();
        params = jQuery.extend(defaultParams,params);
        var max_height = (jQuery(window).height()) - ($('.global-nav').height());

        $('#overlayPage').one('shown.bs.modal',function(){
            if(!params.hasOwnProperty('ignoreScroll') && params['ignoreScroll'] != true) {
                var scrollParams = {
                    height: '',
                    railVisible:true,
                    alwaysVisible:true,
                    postition:"outside"
                };
                app.helper.showVerticalScroll(overlayPage.find('.modal-body'), scrollParams);
            }
            aDeferred.resolve(overlayPage.find('.data'));
        });

        $('#overlayPage').one('hidden.bs.modal',function(){
            // Added to hide custom arrow added for taskmanagement
            overlayPage.find('.arrow').removeClass("show");
            overlayPage.find('.data').html('');
            $('#overlayPage');
            $('body').css('overflow-y', 'auto');
        });

        jQuery(window).one('resize',function(){
            var max_height = (jQuery(window).height()) - ($('.global-nav').height()) - 60;
            $('#overlayPage').
            css('max-height',max_height).find('.data').css('max-height',max_height);
        });

        overlayPage.find('.data').html(data);
        $('#overlayPage').
        css('max-height',max_height).find('.modal-body').css('max-height',max_height);
        overlayPage.modal(params);
        return aDeferred.promise();
    },
});

Vtiger_List_Js("VTEKB_Js",{
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
                var answerRT = jQuery('[name="cf_answer_rt"]');
                if (answerRT.length > 0) {
                    var ckEditorInstance = new Vtiger_CkEditor_Js();
                    ckEditorInstance.loadCkEditor(answerRT, {});
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
                    answerRT.val('');
                    if (answerRT.length > 0) {
                        if (!answerRT.attr('id')){
                            answerRT.attr("id", "cf_answer_rt");
                        }
                        var ckEditorInstance = new Vtiger_CkEditor_Js();
                        ckEditorInstance.loadCkEditor(answerRT, {});
                        answerRT.val($("<div />").html(fullcontent).text());
                        CKEDITOR.instances.cf_answer_rt.on('change', function () {
                            //CKEDITOR.instances.cf_answer_rt.updateElement();
                            var content = CKEDITOR.instances.cf_answer_rt.getData();
                            content = content.split("<body")[1].split(">").slice(1).join(">").split("</body>")[0];

                            answerRT.val(content);
                        });
                    }
                });
            }
        } 
		if (true || moduleName == 'VTEKB'){
			thisInstance.registerEventsForVTEKB();
        }
		
		// Add icon to header
		thisInstance.addIconToHeader();

        $("body").on("click", ".btnGoback", function(){
        	var sourceModule = $("#hfVTEKBSourceModule").val();
            thisInstance.showListOverlay(sourceModule);
        });
		
		$("body").on("click", ".openDetail", function(){
			var id = $(this).data("id");
			thisInstance.showDetailOverlay(id);
		});

		$("body").on("click", ".vtekb-home", function () {
            thisInstance.showListOverlay('all');
        });
    },
	
	registerEventsForVTEKB: function(){
		var thisInstance = this;
		$( "#vtekb_search" ).autocomplete({
			source: function(request, response) {
				$.ajax({
					url: "index.php?module=VTEKB&action=ActionAjax&mode=search",
					dataType: "json",
					data: {
						term : request.term,
						p: $("#hfPage").val(),
						source_module: $("#hfSourceModuleVTEKB").val(),
					},
					success: response
				});
			},
			classes: {
				"ui-autocomplete": "ui-autocomplete vtekb-autocomplete"
			},
			response: function( event, ui ) {
                $(".vtekb-autocomplete").css({"maxWidth": $("#vtekb_search").outerWidth()});
				var data = ui.content[1].data;
				var msg_empty = ui.content[1].msg_empty;
				var show_more = ui.content[1].show_more;
				ui.content.splice(0, ui.content.length);
				if (data.length == 0){
					ui.content.push({label: msg_empty, value: -2});
				} else {
					$.each(data,function(i,n){
						var label = '<a><i class="fa fa-file-text-o"></i>&nbsp;&nbsp;' + n.question + '<span>(' + n.category + ')</span></a>';
						label += '<p class="search-description">' + n.content + '</p>';
						ui.content.push({label:label, value:n.id});
					});
					if (show_more == 1){
						ui.content.push({label: app.vtranslate('LBL_SHOW_MORE'), value: -1});
					}
				}
			},
			create: function () {
				$(this).data('ui-autocomplete')._renderItem = function (ul, item) {
					if (!ul.hasClass("vtekb-autocomplete")){
						ul.addClass("vtekb-autocomplete");
					}
                    $(".vtekb-autocomplete").css({" maxWidth": $("#vtekb_search").outerWidth()});
					if (item.value == '-2'){
						return $('<li>')
							.append('<a class="no_result">' + item.label + '</a>')
							.appendTo(ul);
					} else if (item.value == '-1'){
						return $('<li>')
							.append('<a class="show_more">' + item.label + '</a>')
							.appendTo(ul);
					} else {
						return $('<li>')
							.append(item.label)
							// .append('<a><i class="fa fa-file-text-o"></i>&nbsp;&nbsp;' + item.label + '</a>')
							.appendTo(ul);
					}
				};
			},
			select: function( event, ui ) {
				var faqId = ui.item.value;
				if (faqId == -2){
					return false;
				} else if (faqId == -1){
					var currentPage = $("#hfPage").val();
					currentPage = parseInt(currentPage);
					currentPage += 1;
					$("#hfPage").val(currentPage);
					
					$( "#vtekb_search" ).trigger('keydown');
				} else {
					thisInstance.showDetailOverlay(faqId);
				}
				return false;
			},
			focus: function( event, ui ) {
			}
		});
		
		$( "#vtekb_search" ).keypress(function(){
			$("#hfPage").val("0");
		});
		
		$( "#vtekb_search" ).focus(function(){
			$(".vtekb-autocomplete").show();
		});
		
		$( ".search-box .input-group" ).click(function(){
			$( "#vtekb_search" ).trigger('keydown');
		});
		
		$("body").delegate(".show_more_list", "click", function(){
			currentVTEKBInstance = $(this);
			app.helper.showProgress();
			var params = {};
			params.action = 'ActionAjax';
			params.module = 'VTEKB';
			params.mode = 'showMoreOnList';
			params.p = $(this).attr('data-page');
			params.category = $(this).attr('data-category');
			app.request.post({'data':params}).then(
				function(err,data){
					if(err === null) {
						app.helper.hideProgress();
						currentVTEKBInstance.attr("data-page", data.page);
						var copyCurrentVTEKBInstance = currentVTEKBInstance.clone();
						var total = data.records.length;
						var parents = currentVTEKBInstance.closest("ul")
						for(var i = 0; i < total; i++){
							var record = data.records[i];
							var idFaq = record.id;
							if (parents.find("li[data-id='" + idFaq + "']").length == 0){
								var html = "<li class='openDetail' data-id='" + idFaq + "'><a href='javascript: void(0);' target='_blank'><i class='fa fa-file-text-o'></i>&nbsp;&nbsp;" + record.question + "</a></li>";
								parents.append(html);
							}
						}
						currentVTEKBInstance.remove();
						if (data.show_more == 1){
							parents.append(copyCurrentVTEKBInstance);
						}
					}else{
						app.helper.hideProgress();
					}
				}
			);
		});
	},
	
	addIconToHeader: function(){
        var thisInstance=this;
		if ($("#navbar .navbar-nav").find("li.vtekb").length == 0){
			$("#navbar .navbar-nav").prepend("<li class='vtekb'><div><a href='javascript: void(0);' class='fa fa-question-circle' title='" + app.vtranslate('Knowledge Base') + "'></a></div></li>");
		}
		$("li.vtekb a").on("click", function(){
			thisInstance.showListOverlay();
		});
	},

	showListOverlay: function(source_module){
        var thisInstance=this;
        app.helper.hidePageOverlay();
        if (!source_module){
            source_module = app.getModuleName();
		}
        var params = {
            'module' : 'VTEKB',
            'view' : 'OverLay',
            'mode' : 'showList',
            'source_module': source_module
        }
        app.helper.showProgress();
        app.request.post({"data":params}).then(function(err,data){
            if(err === null){
                instanceVTEKBHelper.loadPageOverlay(data,{'ignoreScroll' : false,'backdrop': 'static'}).then(function(){
                    app.helper.hideProgress();
                    $('#overlayPage').find('.data').css('height','100vh');
                    $('#overlayPage').find('.data').css('background','#fff;');

                    var offset = jQuery('.vtekb').offset();
                    $('#overlayPage').find(".arrow").css("left", offset.left + 13);
                    $('#overlayPage').find(".arrow").addClass("show");

                    vtUtils.showSelect2ElementView($('#overlayPage .data-header').find('select[name="assigned_user_id"]'),{placeholder:"User : All"});
                    vtUtils.showSelect2ElementView($('#overlayPage .data-header').find('select[name="taskstatus"]'),{placeholder:"Status : All"});
                    thisInstance.registerEventsForVTEKB();
                    app.helper.showVerticalScroll($('.vtekb-body'), {setHeight: '500px'});
                });
            }else{
                app.helper.showErrorNotification({"message":err});
            }
        });
	},
	
	showDetailOverlay: function(id){
        var thisInstance=this;
        var sourceModule = $("#hfVTEKBSourceModule").val();
		var params = {
			'module' : 'VTEKB',
			'view' : 'OverLay',
			'mode' : 'showDetail',
			'source_module': sourceModule,
			'faqId': id
		}
		app.helper.showProgress();
		app.request.post({"data":params}).then(function(err,data){
			if(err === null){
				app.helper.hidePageOverlay();
                instanceVTEKBHelper.loadPageOverlay(data,{'ignoreScroll' : false,'backdrop': 'static'}).then(function(){
					app.helper.hideProgress();
					$('#overlayPage').find('.data').css('height','100vh');
					$('#overlayPage').find('.data').css('background','#fff;');

					var offset = jQuery('.vtekb').offset();
					$('#overlayPage').find(".arrow").css("left", offset.left + 13);
					$('#overlayPage').find(".arrow").addClass("show");

					vtUtils.showSelect2ElementView($('#overlayPage .data-header').find('select[name="assigned_user_id"]'),{placeholder:"User : All"});
					vtUtils.showSelect2ElementView($('#overlayPage .data-header').find('select[name="taskstatus"]'),{placeholder:"Status : All"});
					thisInstance.registerEventsForVTEKB();
					app.helper.showVerticalScroll($('.vtekb-body-detail-content'), {setHeight: '478px'});
				});
			}else{
				app.helper.showErrorNotification({"message":err});
			}
		});
	},
	
    registerEvents: function() {
        this.registerVTEKBEvent();
    }
});
function openVTEKBPopup(){
    var VTEKB = new VTEKB_Js();
    VTEKB.showListOverlay();
} 
jQuery(document).ready(function(){
    instanceVTEKBHelper = VTEKB_Helper_JS.getInstance();
    buildEventForNewUIType();
    var vteKBLink = jQuery('[href*="javascript:openVTEKBPopup"]');
    vteKBLink.attr('href','javascript:openVTEKBPopup()');
    var moduleName = app.getModuleName();
    var viewName = app.getViewName()
    if (moduleName == 'VTEKB'){        
        // Remove Uninstall, Add Goto Faq
        var parentElement = $("#VTEKB_listview_advancedAction_Uninstall").parent();
        var gotoFAQ = $("#VTEKB_listview_advancedAction_Uninstall").clone();
        gotoFAQ.attr("id", "VTEKB_listview_advancedAction_GotoFaq");
        $("#VTEKB_listview_advancedAction_Uninstall").hide();
        var faqLink = gotoFAQ.find('a');
        faqLink.attr("href", "index.php?module=Faq&view=List&isFromVTEKB=1");
        var faqLinkLabel = app.vtranslate('LBL_GOTO_FAQ_LIST');
        faqLink.html(faqLinkLabel);
        parentElement.append(gotoFAQ);
    } else if (moduleName == 'Faq'){
        // $("#Faq_detailView_fieldValue_cf_answer_rt").find(".editAction").hide();
        if (viewName == 'List'){
            var VTEKB_params = app.convertUrlToDataParams(location.href);
            if (VTEKB_params.isFromVTEKB == 1){
                var allLinks = $("a[href^='index.php?module=Faq&view=List']");
                var total = allLinks.length;
                for(var i = 0; i < total; i++){
                    var currentHref = $(allLinks[i]).attr('href');
                    if (currentHref.indexOf('isFromVTEKB=1') == -1){
                        $(allLinks[i]).attr('href', currentHref + '&isFromVTEKB=1');
                    }
                }
            }
            var extensionLink = $(".module-extensions .listViewFilter").find("a[href^='index.php?module=VTEKB&view=List']");
            if (extensionLink.length > 0){
                var params = {};
                params.action = 'ActionAjax';
                params.module = 'VTEKB';
                params.mode = 'getModuleLabelForAjax';
                app.request.post({'data':params}).then(
                    function(err,data){
                        if(err === null) {
                            if (VTEKB_params.isFromVTEKB == undefined || VTEKB_params.isFromVTEKB != '1'){
                                if (data.open_by_default == 1){
                                    location.href = 'index.php?module=VTEKB&view=List';
                                }
                            }
                            var linkLabel = data.label;
                            extensionLink.html(linkLabel);
                        }else{
                            app.helper.hideProgress();
                        }
                    }
                );
            }
        }
    }
    
    // Only load when loadHeaderScript=1 BEGIN #241208
    if (typeof VTECheckLoadHeaderScript == 'function') {
        if (!VTECheckLoadHeaderScript('VTEKB')) {
            return;
        }
    }
    // Only load when loadHeaderScript=1 END #241208

    var VTEKB = new VTEKB_Js();
    VTEKB.registerVTEKBEvent();

    // vtekbRefreshUIAutocomplete();
});

function buildEventForNewUIType(){
    $('body').on("change", "[data-vteusergroup], [data-vtemodule]", function(){
        var parent = $(this).closest('form');
        var id = $(this).data("name");
        var newValue = '';
        var currentValue = $(this).val();
        if (!currentValue){
            currentValue = [];
		}
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

function vtekbRefreshUIAutocomplete() {
    $(".vtekb-autocomplete").css({"maxWidth": $("#vtekb_search").outerWidth()});
    setTimeout(function (args) {
        vtekbRefreshUIAutocomplete();
	}, 500);
}
