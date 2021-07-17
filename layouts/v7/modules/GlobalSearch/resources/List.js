/* ********************************************************************************
 * The content of this file is subject to the Global Search ("License");
 * You may not use this file except in compliance with the License
 * The Initial Developer of the Original Code is VTExperts.com
 * Portions created by VTExperts.com. are Copyright(C) VTExperts.com.
 * All Rights Reserved.
 * ****************************************************************************** */
Vtiger_Index_Js("GlobalSearch_List_Js",{
    editInstance:false,
    getInstance: function(){
        if(GlobalSearch_List_Js.editInstance == false){
            var instance = new GlobalSearch_List_Js();
            GlobalSearch_List_Js.editInstance = instance;
            return instance;
        }
        return GlobalSearch_List_Js.editInstance;
    }
},{
    /*
     * Function to register List view Page Navigation
     */
    registerPageNavigationEvents : function(){
        var aDeferred = jQuery.Deferred();
        var thisInstance = this;
        jQuery(document).on('click','.listViewNextPageButton',function(){
            var searchModule=jQuery(this).data('module');
            var pageLimit = jQuery('#pageLimit'+searchModule).val();
            var noOfEntries = jQuery('#noOfEntries'+searchModule).val();
            var orderBy = jQuery('#orderBy'+searchModule).val();
            var sortOrder = jQuery('#sortOrder'+searchModule).val();
            if(noOfEntries == pageLimit){
                var pageNumber = jQuery('#pageNumber'+searchModule).val();
                var nextPageNumber = parseInt(parseFloat(pageNumber)) + 1;
                jQuery('#pageNumber'+searchModule).val(nextPageNumber);
                jQuery('#pageToJump'+searchModule).val(nextPageNumber);
                thisInstance.getListViewRecords(searchModule,orderBy,sortOrder).then(
                    function(data){
                        thisInstance.updatePagination(searchModule);
                        aDeferred.resolve();
                    },

                    function(textStatus, errorThrown){
                        aDeferred.reject(textStatus, errorThrown);
                    }
                );
            }
            return aDeferred.promise();
        });

        jQuery(document).on('click','.listViewPreviousPageButton',function(){
            var aDeferred = jQuery.Deferred();
            var searchModule=jQuery(this).data('module');
            var pageNumber = jQuery('#pageNumber'+searchModule).val();
            var orderBy = jQuery('#orderBy'+searchModule).val();
            var sortOrder = jQuery('#sortOrder'+searchModule).val();
            if(pageNumber > 1){
                var previousPageNumber = parseInt(parseFloat(pageNumber)) - 1;
                jQuery('#pageNumber'+searchModule).val(previousPageNumber);
                jQuery('#pageToJump'+searchModule).val(previousPageNumber);
                thisInstance.getListViewRecords(searchModule,orderBy,sortOrder).then(
                    function(data){
                        thisInstance.updatePagination(searchModule);
                        aDeferred.resolve();
                    },

                    function(textStatus, errorThrown){
                        aDeferred.reject(textStatus, errorThrown);
                    }
                );
            }
        });

        jQuery('.listViewPageJumpDropDown').on('click','li',function(e){
            e.stopImmediatePropagation();
        }).on('keypress','.pageToJump' ,function(e){
            if(e.which == 13){
                var searchModule=jQuery(this).data('module');
                e.stopImmediatePropagation();
                var element = jQuery(e.currentTarget);
                var response = Vtiger_WholeNumberGreaterThanZero_Validator_Js.invokeValidation(element);
                if(typeof response != "undefined"){
                    element.validationEngine('showPrompt',response,'',"topLeft",true);
                } else {
                    element.validationEngine('hideAll');
                    var currentPageElement = jQuery('#pageNumber'+searchModule);
                    var currentPageNumber = currentPageElement.val();
                    var newPageNumber = parseInt(jQuery(e.currentTarget).val());
                    var totalPages = parseInt(jQuery('#totalPageCount'+searchModule).text());
                    var orderBy = jQuery('#orderBy'+searchModule).val();
                    var sortOrder = jQuery('#sortOrder'+searchModule).val();
                    if(newPageNumber > totalPages){
                        var error = app.vtranslate('JS_PAGE_NOT_EXIST');
                        element.validationEngine('showPrompt',error,'',"topLeft",true);
                        return;
                    }
                    if(newPageNumber == currentPageNumber){
                        var message = app.vtranslate('JS_YOU_ARE_IN_PAGE_NUMBER')+" "+newPageNumber;
                        var params = {
                            text: message,
                            type: 'info'
                        };
                        app.helper.showSuccessNotification(params);
                        return;
                    }
                    currentPageElement.val(newPageNumber);
                    thisInstance.getListViewRecords(searchModule,orderBy,sortOrder).then(
                        function(data){
                            thisInstance.updatePagination(searchModule);
                            element.closest('.btn-group ').removeClass('open');
                        },
                        function(textStatus, errorThrown){
                        }
                    );
                }
                return false;
            }
        });
    },
    registerListViewSort: function () {
        var aDeferred = jQuery.Deferred();
        var listViewContainer = $('.right-content');
        var thisInstance = this;
        listViewContainer.on('click', '.listViewContentHeaderValues', function (e) {

            var fieldName = jQuery(e.currentTarget).data('columnname');
            var sortOrderVal = jQuery(e.currentTarget).data('nextsortorderval');
            if (sortOrderVal === 'ASC') {
                jQuery('i', e.currentTarget).addClass('fa-sort-asc');
            } else {
                jQuery('i', e.currentTarget).addClass('fa-sort-desc');
            }

            var searchModule=jQuery(this).data('module');
            var pageLimit = jQuery('#pageLimit'+searchModule).val();
            var noOfEntries = jQuery('#noOfEntries'+searchModule).val();
            var pageNumber = jQuery('#pageNumber'+searchModule).val();
            var nextPageNumber = parseInt(parseFloat(pageNumber));
            jQuery('#pageNumber'+searchModule).val(nextPageNumber);
            jQuery('#pageToJump'+searchModule).val(nextPageNumber);
            thisInstance.getListViewRecords(searchModule,fieldName,sortOrderVal).then(
                function(data){
                    thisInstance.updatePagination(searchModule);
                    aDeferred.resolve();
                },

                function(textStatus, errorThrown){
                    aDeferred.reject(textStatus, errorThrown);
                }
            );
            return aDeferred.promise();
        });
    },
    registerGetCountRecord: function () {
        var aDeferred = jQuery.Deferred();
        var listViewContainer = $('.right-content');
        var thisInstance = this;
        listViewContainer.on('click', '.totalNumberOfSearchResults', function (e) {

            var fieldName = jQuery(e.currentTarget).data('columnname');
            var sortOrderVal = jQuery(e.currentTarget).data('nextsortorderval');
            if (sortOrderVal === 'ASC') {
                jQuery('i', e.currentTarget).addClass('fa-sort-asc');
            } else {
                jQuery('i', e.currentTarget).addClass('fa-sort-desc');
            }

            var searchModule=jQuery(this).data('module');
            var search_params = $('#search_params').val();
            var search_type = $('#search_type').val();
            var searchKey = jQuery('#searchKey'+searchModule).val();
            var currentModuleTable = jQuery('#'+searchModule+'_search_content');
            var params = {
                'module': 'GlobalSearch',
                'search_module' : searchModule,
                'value' : searchKey,
                'search_type' : search_type,
                'search_params' : search_params,
                'action': 'ActionAjax',
                'mode': 'getCountRecord'
            };
            app.request.post({data:params}).then(
                function(err,data) {
                    app.helper.hideProgress();
                    if(data) {
                        var pageNumberElement = jQuery('.pageNumbersText', currentModuleTable);
                        var pageRange = pageNumberElement.text();
                        var newPagingInfo = pageRange.trim() + " " + app.vtranslate('of') + " " + data.data + "  ";
                        pageNumberElement.text(newPagingInfo)
                        jQuery('.totalNumberOfSearchResults', currentModuleTable).hide();
                    }
                }
            );
        });
    },
    getDefaultParams : function(searchModule) {
        var pageNumber = jQuery('#pageNumber'+searchModule).val();
        var searchKey = jQuery('#searchKey'+searchModule).val();
        var module = 'GlobalSearch';
        var search_params = $('#search_params').val();
        var search_type = $('#search_type').val();
        var paramsUrl = app.convertUrlToDataParams(window.location.href);
        var params = {
            'module': module,
            'search_module' : searchModule,
            'page' : pageNumber,
            'value' : searchKey,
            'search_type' : search_type,
            'search_params' : search_params,
            'keyword' : paramsUrl.keyword,
            'ajax' : 1,
            'view' : "SearchResults"
        };
        return params;
    },

    /*
     * Function which will give you all the list view params
     */
    getListViewRecords : function(searchModule,fieldSort,sortOrderVal) {
        var aDeferred = jQuery.Deferred();
        if(typeof urlParams == 'undefined') {
            urlParams = {};
        }

        var thisInstance = this;
        var loadingMessage = jQuery('.listViewLoadingMsg').text();
        app.helper.showProgress(loadingMessage);

        var defaultParams = this.getDefaultParams(searchModule);
        if(fieldSort && sortOrderVal){
            defaultParams['orderby'] = fieldSort;
            defaultParams['sortorder'] = sortOrderVal;
        }
        app.request.post({'data':defaultParams}).then(
            function(err,data) {
                app.helper.hideProgress();
                if(data) {
                    var listViewContentsContainer = jQuery('#searchResult'+searchModule);
                    listViewContentsContainer.html(data);
                    // Highlight search text
                    var searchKey = jQuery('#searchKey').val();
                    if(searchKey != undefined && searchKey != ''){
                        var strArr=searchKey.split(" ");
                        jQuery.each(strArr,function(i,e) {
                            listViewContentsContainer.find(".listViewEntryValue").highlight(e);
                        });
                    }
                    var searchKey = jQuery('#keyWordSearch').val();
                    if(searchKey != undefined && searchKey != ''){
                        var strArr=searchKey.split(" ");
                        jQuery.each(strArr,function(i,e) {
                            listViewContentsContainer.find(".listViewEntryValue").highlight(e);
                        });
                    }
                    $('tr.listViewEntries').hover(function(){$(this).find('.open-new-window-action').show()},function(){$(this).find('.open-new-window-action').hide()});
                    aDeferred.resolve(data);
                }

            },
            function(textStatus, errorThrown){
                aDeferred.reject(textStatus, errorThrown);
            }
        );
        return aDeferred.promise();
    },
    /**
     * Function to update Pagining status
     */
    updatePagination : function(searchModule){
        var previousPageExist = jQuery('#previousPageExist'+searchModule).val();
        var nextPageExist = jQuery('#nextPageExist'+searchModule).val();
        var previousPageButton = jQuery('#listViewPreviousPageButton'+searchModule);
        var nextPageButton = jQuery('#listViewNextPageButton'+searchModule);
        var pageJumpButton = jQuery('#listViewPageJump'+searchModule);
        var listViewEntriesCount = parseInt(jQuery('#noOfEntries'+searchModule).val());
        var pageStartRange = parseInt(jQuery('#pageStartRange'+searchModule).val());
        var pageEndRange = parseInt(jQuery('#pageEndRange'+searchModule).val());
        var pages = jQuery('#totalPageCount'+searchModule).text();
        var pageNumbersTextElem = jQuery('#pageNumbersText'+searchModule);

        if(pages > 1){
            pageJumpButton.removeAttr('disabled');
        }
        if(previousPageExist != ""){
            previousPageButton.removeAttr('disabled');
        } else if(previousPageExist == "") {
            previousPageButton.attr("disabled","disabled");
        }

        if((nextPageExist != "")){
            nextPageButton.removeAttr('disabled');
        } else if((nextPageExist == "")) {
            nextPageButton.attr("disabled","disabled");
        }
        if(listViewEntriesCount != 0){
            var pageNumberText = pageStartRange+" "+app.vtranslate('to')+" "+pageEndRange;
            pageNumbersTextElem.html(pageNumberText);
        } else {
            pageNumbersTextElem.html("<span>&nbsp;</span>");
        }
        var currentModuleTable = jQuery('#'+searchModule+'_search_content');
        jQuery('.totalNumberOfSearchResults', currentModuleTable).show();

    },
    registerEventToShowQuickPreview: function () {
        var thisInstance = this;
        var listViewPageDiv = jQuery(".listViewTopMenuDiv");
        listViewPageDiv.on('click', '.quickView', function (e) {
            e.stopPropagation();
            var element = listViewPageDiv.find(e.currentTarget);
            var app = element.data('app');
            var row = element.closest('.listViewEntries');
            var searchmodule = row.data('searchmodule');
            var recordId = row.data('id');
            thisInstance.showQuickPreviewForId(recordId, searchmodule, app);
        });

    },
    showQuickPreviewForId: function (recordId, searchmodule, appName) {
        var self = this;
        var vtigerInstance = Vtiger_Index_Js.getInstance();
        vtigerInstance.showQuickPreviewForId(recordId, searchmodule, appName);
    },
    registerStarToggle: function () {
        var self = this;
        var listViewContainer = jQuery(".listViewTopMenuDiv");
        listViewContainer.on('click', '.markStar', function (e) {
            e.stopPropagation();
            var element = jQuery(e.currentTarget);
            if (element.hasClass('processing'))
                return;
            element.addClass('processing');

            var record = element.closest('tr.listViewEntries').data('id');
            var searchmodule = element.closest('tr.listViewEntries').data('searchmodule');
            var params = {};
            params.module = searchmodule;
            params.action = 'SaveStar';
            params.record = record;
            if (element.hasClass('active')) {
                params.value = 0;
                element.removeClass('fa-star').addClass('fa-star-o');
            } else {
                params.value = 1;
                element.removeClass('fa-star-o').addClass('fa-star');
            }
            element.toggleClass('active');
            params._timeStampNoChangeMode = true;
            app.request.post({data: params}).then(function (err, data) {
                if (data) {
                    if (params.value == 0) {
                        element.attr("title", app.vtranslate('JS_NOT_STARRED'));
                    } else {
                        element.attr("title", app.vtranslate('JS_STARRED'));
                    }
                }
                element.removeClass('processing');
            })
            if(element.hasClass('active')){
                app.helper.showSuccessNotification({'message':app.vtranslate('JS_FOLLOW_RECORD')});
            } else {
                app.helper.showSuccessNotification({'message':app.vtranslate('JS_UNFOLLOW_RECORD')});
            }
        });
    },
    registerEvents : function() {
        this._super();
        this.registerStarToggle();
        this.registerEventToShowQuickPreview();
        this.registerPageNavigationEvents();
        this.registerListViewSort();
        this.registerGetCountRecord();
    }
});

jQuery.fn.highlight = function(pattern) {
    var regex = typeof(pattern) === "string" ? new RegExp(pattern, "i") : pattern; // assume very LOOSELY pattern is regexp if not string
    function innerHighlight(node, pattern) {
        var skip = 0;
        if (node.nodeType === 3) { // 3 - Text node
            var pos = node.data.search(regex);
            if (pos >= 0 && node.data.length > 0) { // .* matching "" causes infinite loop
                var match = node.data.match(regex); // get the match(es), but we would only handle the 1st one, hence /g is not recommended
                var spanNode = document.createElement('span');
                spanNode.className = 'highlight'; // set css
                var middleBit = node.splitText(pos); // split to 2 nodes, node contains the pre-pos text, middleBit has the post-pos
                var endBit = middleBit.splitText(match[0].length); // similarly split middleBit to 2 nodes
                var middleClone = middleBit.cloneNode(true);
                spanNode.appendChild(middleClone);
                // parentNode ie. node, now has 3 nodes by 2 splitText()s, replace the middle with the highlighted spanNode:
                middleBit.parentNode.replaceChild(spanNode, middleBit);
                skip = 1; // skip this middleBit, but still need to check endBit
            }
        } else if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) { // 1 - Element node
            for (var i = 0; i < node.childNodes.length; i++) { // highlight all children
                i += innerHighlight(node.childNodes[i], pattern); // skip highlighted ones
            }
        }
        return skip;
    }

    return this.each(function() {
        innerHighlight(this, pattern);
    });
};

jQuery(document).ready(function () {
    var instance = new GlobalSearch_List_Js();
    instance.registerEvents();
    jQuery(document).on("click", ".listViewEntries .listViewEntryValue.show-record-detail", function(e) {
        var elem = jQuery(e.currentTarget);
        var tr = elem.closest('.listViewEntries');
        var recordUrl = tr.data('recordurl');
        var crmid = tr.data('record');
        var params = {
            module: 'GlobalSearch',
            action: 'ActionAjax',
            mode: 'recordToLog',
            record: crmid
        };
        app.request.post({'data' : params}).then(function(err, data){
            if(err == null){
                if(typeof recordUrl == 'undefined') {
                    return;
                }
                window.location.href = recordUrl;
            }
        });
    });
    //var columns = $(".listViewEntries .listViewEntryValue.show-record-detail");
    //columns.each(function(k,item){
    //    var link = $(item).find('a');
    //    var href = link.attr('href');
    //    if(href != undefined && href != null && href != '' && href != '#' && href.indexOf('?') != -1){
    //        link.contextmenu(function(){
    //            window.open(href,'_blank');
    //        });
    //    }
    //});
    // Highlight search text
    var searchKey = jQuery('#searchKey').val();
    searchKey = searchKey.replace(',',' ');
    searchKey = searchKey.replace(';',' ');
    var strArr=searchKey.split(" ");
    jQuery.each(strArr,function(i,e) {
        if(e != '') {
            jQuery(".listViewEntryValue").highlight(e);
        }
    });
    var searchKey = jQuery('#keyWordSearch').val();
    var strArr=searchKey.split(",");
    jQuery.each(strArr,function(i,e) {
        if(e != '') {
            jQuery(".listViewEntryValue").highlight(e);
        }
    });
    $('tr.listViewEntries').hover(function(){$(this).find('.open-new-window-action').show()},function(){$(this).find('.open-new-window-action').hide()});
    $('.app-footer').css({
        'display' : 'unset'
    });
    var heightFooter = $('.app-footer').offset().top -70;
    $('.modules-menu').css('height',heightFooter );
});