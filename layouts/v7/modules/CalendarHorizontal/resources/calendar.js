/* * *******************************************************************************
 * The content of this file is subject to the VTE Calendar Horizontal ("License");
 * You may not use this file except in compliance with the License
 * The Initial Developer of the Original Code is VTExperts.com
 * Portions created by VTExperts.com. are Copyright(C)VTExperts.com.
 * All Rights Reserved.
 * ****************************************************************************** */

var CalendarHorizontal = {
    Periods: [
        {
            Name: '1 days',
            Label: 'Day',
            StartPeroid: moment().startOf('day'),
            TimeDuration: 30,
            TimeframePeriod: (60 * 1),
            TimeframeOverall: (60 * 24 * 1),
            TimeframeHeaders: ['ddd, Do MMM', 'HH:mm']
        },
        {
            Name: '1 week',
            Label: 'Week',
            StartPeroid: 0,
            TimeDuration: 30,
            TimeframePeriod: (60 * 8),
            TimeframeOverall: (60 * 24 * 7),
            TimeframeHeaders: ['ddd, Do MMM', 'HH:mm']
        },
        {
            Name: '1 month',
            Label: 'Month',
            StartPeroid: 0,
            TimeDuration: 30,
            TimeframePeriod: (60 * 24),
            TimeframeOverall: (60 * 24 * 28),
            TimeframeHeaders: ['ddd, Do MMM', 'HH:mm']
        },
        {
            Name: 'Custom',
            Label: 'Custom',
            StartPeroid: 0,
            TimeDuration: 30,
            TimeframePeriod: (60 * 24),
            TimeframeOverall: (60 * 24 * 28),
            TimeframeHeaders: ['ddd, Do MMM', 'HH:mm'],
            DateRangeValue: '',
            DateRange: ''
        }
    ],

    Items: null,

    Sections: null,

    Init: function() {
        var today = moment().startOf('day');
        var hour_format = $('#calendar_horizontal_hour_format').val();
        if(hour_format==''){
            hour_format = 24;
        }
        var user_start_hour = $('#calendar_horizontal_start_hour').val();
        var user_start_hour_tmp = user_start_hour.split(':');
        user_start_hour = parseInt(user_start_hour_tmp[0]);
        var user_end_hour = $('#calendar_horizontal_end_hour').val();
        var user_end_hour_tmp = user_end_hour.split(':');
        user_end_hour = parseInt(user_end_hour_tmp[0]);
        user_end_hour = user_end_hour + 1;
        if(user_end_hour <= user_start_hour){
            user_end_hour = 24;
        }
        var time_duration = $('#calendar_horizontal_time_duration').val();
        if(time_duration == ''){
            time_duration = 30;
        }
        var default_view_type = $('#calendar_horizontal_default_view_type').val();
        //update Periods
        CalendarHorizontal.Periods[0].StartPeroid = user_start_hour;
        CalendarHorizontal.Periods[0].TimeframeOverall = (CalendarHorizontal.Periods[0].TimeframePeriod * (user_end_hour - user_start_hour) * 1);
        CalendarHorizontal.Periods[0].TimeDuration = time_duration;
        CalendarHorizontal.Periods[1].TimeDuration = time_duration;
        CalendarHorizontal.Periods[2].TimeDuration = time_duration;
        if(hour_format==12) {
            CalendarHorizontal.Periods[0].TimeframeHeaders = ['Do MMM', 'hh:mma'];
            CalendarHorizontal.Periods[1].TimeframeHeaders = ['Do MMM', 'hh:mma'];
            CalendarHorizontal.Periods[2].TimeframeHeaders = ['Do MMM', 'hh:mma'];
        }

        TimeScheduler.Options.GetSections = CalendarHorizontal.GetSections;
        TimeScheduler.Options.GetSchedule = CalendarHorizontal.GetSchedule;
        TimeScheduler.Options.Periods = CalendarHorizontal.Periods;

        if(default_view_type != '1 days' && default_view_type != '1 week' && default_view_type != '1 month') {
            TimeScheduler.Options.SelectedPeriod = '1 days';
            TimeScheduler.Options.Start = moment().startOf('day').add('minutes', user_start_hour*60);
        }else{
            TimeScheduler.Options.SelectedPeriod = default_view_type;
            if(default_view_type == '1 days'){
                TimeScheduler.Options.Start = moment().startOf('day').add('minutes', user_start_hour*60);
            }else if(default_view_type == '1 week'){
                TimeScheduler.Options.Start = moment().startOf('week');
            }else if(default_view_type == '1 month'){
                TimeScheduler.Options.Start = moment().startOf('month');
            }
        }
        TimeScheduler.Options.Element = $('.calendar');

        TimeScheduler.Options.AllowDragging = true;
        TimeScheduler.Options.AllowResizing = true;
        TimeScheduler.Options.showPopover = true;

        TimeScheduler.Options.Events.ItemDropped = CalendarHorizontal.Item_Dragged;
        TimeScheduler.Options.Events.ItemResized = CalendarHorizontal.Item_Resized;
        TimeScheduler.Options.Events.ItemClicked = CalendarHorizontal.Item_Clicked;
        TimeScheduler.Options.Events.Cell_Clicked = CalendarHorizontal.Cell_Clicked;

        TimeScheduler.Options.Events.ItemMovement = CalendarHorizontal.Item_Movement;
        TimeScheduler.Options.Events.ItemMovementStart = CalendarHorizontal.Item_MovementStart;
        TimeScheduler.Options.Events.ItemMovementEnd = CalendarHorizontal.Item_MovementEnd;

        TimeScheduler.Options.Text.NextButton = ' ';
        TimeScheduler.Options.Text.PrevButton = ' ';
        TimeScheduler.Options.Text.NextDayButton = ' ';
        TimeScheduler.Options.Text.PrevDayButton = ' ';

        TimeScheduler.Options.MaxHeight = 100;

        TimeScheduler.Init(true);
    },

    GetSections: function(callback) {
        var aDeferred = jQuery.Deferred();

        var activeFeeds = jQuery('input[data-calendar-feed]:checked');
        var activeUsersFeedRequest = [];
        activeFeeds.each(function () {
            var feedCheckbox = jQuery(this);
            activeUsersFeedRequest.push(feedCheckbox.data('calendarUserid'));
        });

        var requestParams = {
            'module': 'CalendarHorizontal',
            'action': 'HorizontalAjax',
            'mode': 'getUsers',
            'currentView' : $('#CalendarViewContent input#currentView').val(),
            'active_users' : activeUsersFeedRequest
        };

        app.helper.showProgress();
        app.request.post({'data': requestParams}).then(function (e, res) {
            app.helper.hideProgress();
            if (!e) {
                var sections = res;
                var len = sections.length;
                if(len > 0){
                    for(var i=0; i<len; i++){
                        sections[i].id = sections[i].id;
                        sections[i].name = sections[i].full_name;
                    }
                    CalendarHorizontal.Sections=sections;
                }else{
                    CalendarHorizontal.Sections=[];
                }
                callback(CalendarHorizontal.Sections);
                aDeferred.resolve(res);
            } else {
                aDeferred.reject(e);
            }
        });

        return aDeferred.promise();
    },

    GetSchedule: function(callback, start, end) {
        var aDeferred = jQuery.Deferred();
        var period = TimeScheduler.GetSelectedPeriod();
        if(typeof start==='undefined') {
            start = TimeScheduler.Options.Start;
        }
        if(typeof end==='undefined') {
            end = TimeScheduler.GetEndOfPeriod(TimeScheduler.Options.Start, period);
        }


        var activeFeeds = jQuery('input[data-calendar-feed]:checked');
        var activeFeedsRequestParams = {};
        activeFeeds.each(function () {
            var feedCheckbox = jQuery(this);
            var feedRequestParams = CalendarHorizontal.getFeedRequestParams(start, end, feedCheckbox);
            activeFeedsRequestParams[feedCheckbox.data('calendarSourcekey')] = feedRequestParams;
        });

        var requestParams = {
            'module': 'CalendarHorizontal',
            'action': 'HorizontalAjax',
            'mode': 'getActivities',
            'modeType': 'batch',
            'feedsRequest': activeFeedsRequestParams
        };

        app.helper.showProgress();
        app.request.post({'data': requestParams}).then(function (e, res) {
            app.helper.hideProgress();
            if (!e) {
                var items = res;
                var len = items.length;
                if(len > 0){
                    for(var i=0; i<len; i++){
                        items[i].start = moment(items[i].start);
                        items[i].end = moment(items[i].end);
                    }
                    CalendarHorizontal.Items=items;
                }else{
                    CalendarHorizontal.Items=[];
                }
                callback(CalendarHorizontal.Items);
                aDeferred.resolve(res);
            } else {
                aDeferred.reject(e);
            }
        });

        return aDeferred.promise();
    },

    getFeedRequestParams: function (start, end, feedCheckbox) {
        var dateFormat = 'YYYY-MM-DD';
        var startDate = start.format(dateFormat);
        var endDate = end.format(dateFormat);
        return {
            'start': startDate,
            'end': endDate,
            'type': feedCheckbox.data('calendarFeed'),
            'fieldname': feedCheckbox.data('calendarFieldname'),
            'color': feedCheckbox.data('calendarFeedColor'),
            'textColor': feedCheckbox.data('calendarFeedTextcolor'),
            'conditions': feedCheckbox.data('calendarFeedConditions'),
            'userid': feedCheckbox.data('calendarUserid'),
            'group': feedCheckbox.data('calendarGroup')
        };
    },

    Item_Clicked: function(item) {
        var itemId = item.id;
        var itemIdArr = itemId.split('_');
        CalendarHorizontal.editCalendarEvent(itemIdArr[1], item.module);
    },

    editCalendarEvent: function(record, moduleName) {
        if(typeof moduleName == 'undefined') {
            var moduleName = 'Events';
        }
        var isAllowed = jQuery('#is_record_creation_allowed').val();
        if (isAllowed && (moduleName == 'Events' || moduleName == 'Calendar')) {
            var quickCreateNode = jQuery('#quickCreateModules').find('[data-name="' + moduleName + '"]');
            if (quickCreateNode.length <= 0) {
                app.helper.showAlertNotification({
                    'message': app.vtranslate('JS_NO_CREATE_OR_NOT_QUICK_CREATE_ENABLED')
                });
            } else {
                var quickCreateUrl = quickCreateNode.data('url');
                var quickCreateEditUrl = quickCreateUrl + '&mode=edit&record=' + record;
                quickCreateNode.data('url', quickCreateEditUrl);
                quickCreateNode.trigger('click');
                quickCreateNode.data('url', quickCreateUrl);

                if (moduleName === 'Events' || moduleName === 'Calendar') {
                    app.event.one('post.QuickCreateForm.show', function (e, form) {
                        CalendarHorizontal.registerEditEventModalEvents(form.closest('.modal'));
                    });
                }
            }
        } else if(isAllowed && moduleName != 'Events' && moduleName != 'Calendar'){
            CalendarHorizontal.showDetailOverlay(record, moduleName);
        }
    },

    showDetailOverlay: function (record, moduleName) {
        if(typeof record != "undefined" && moduleName != 'undefined'){
            //Display Mode to show details in overlay
            var params = {};
            params['module'] = moduleName;
            params['view'] = 'Detail';
            params['mode'] = 'showDetailViewByMode';
            params['requestMode'] = 'full';
            params['displayMode'] = 'overlay';
            params['record'] = record;
            app.helper.showProgress();
            app.request.get({data: params}).then(function(err, response) {
                app.helper.hideProgress();
                var overlayParams = {'backdrop' : 'static', 'keyboard' : false};
                app.helper.loadPageContentOverlay(response, overlayParams).then(function(container) {
                    var detailjs = Vtiger_Detail_Js.getInstanceByModuleName(moduleName);
                    detailjs.showScroll(jQuery('.overlayDetail .modal-body'));
                    detailjs.setModuleName(moduleName);
                    detailjs.setOverlayDetailMode(true);
                    detailjs.setContentHolder(container.find('.overlayDetail'));
                    detailjs.setDetailViewContainer(container.find('.overlayDetail'));
                    detailjs.registerOverlayEditEvent();
                    detailjs.registerBasicEvents();
                    detailjs.registerClickEvent();
                    detailjs.registerHeaderAjaxEditEvents(container.find('.overlayDetailHeader'));
                    container.find('form#detailView').on('submit', function(e) {
                        e.preventDefault();
                    });
                });
            });
        }
    },

    deleteCalendarEvent: function (eventId, sourceModule, extraParams) {
        app.helper.showConfirmationBox({
            message: app.vtranslate('LBL_DELETE_CONFIRMATION')
        }).then(function () {
            var thisInstance = CalendarHorizontal;
            if (typeof extraParams === 'undefined') {
                extraParams = {};
            }
            var params = {
                "module": "Calendar",
                "action": "DeleteAjax",
                "record": eventId,
                "sourceModule": sourceModule
            };
            jQuery.extend(params, extraParams);

            app.helper.showProgress();
            app.request.post({'data': params}).then(function (e, res) {
                app.helper.hideProgress();
                if (!e) {
                    TimeScheduler.Init();
                    app.helper.showSuccessNotification({
                        'message': app.vtranslate('JS_RECORD_DELETED')
                    });
                } else {
                    app.helper.showErrorNotification({
                        'message': app.vtranslate('JS_NO_DELETE_PERMISSION')
                    });
                }
            });
        });
    },

    markAsHeld: function (recordId) {
        app.helper.showConfirmationBox({
            message: app.vtranslate('JS_CONFIRM_MARK_AS_HELD')
        }).then(function () {
            var requestParams = {
                module: "Calendar",
                action: "SaveFollowupAjax",
                mode: "markAsHeldCompleted",
                record: recordId
            };

            app.request.post({'data': requestParams}).then(function (e, res) {
                if (e) {
                    app.helper.showErrorNotification({
                        'message': app.vtranslate('JS_PERMISSION_DENIED')
                    });
                } else if (res && res['valid'] === true && res['markedascompleted'] === true) {
                    TimeScheduler.Init();
                } else {
                    app.helper.showAlertNotification({
                        'message': app.vtranslate('JS_FUTURE_EVENT_CANNOT_BE_MARKED_AS_HELD')
                    });
                }
            });
        });
    },

    holdFollowUp: function (eventId) {
        var thisInstance = CalendarHorizontal;
        var requestParams = {
            'module': 'Calendar',
            'view': 'QuickCreateFollowupAjax',
            'record': eventId
        };
        app.helper.showProgress();
        app.request.get({'data': requestParams}).then(function (err, resp) {
            app.helper.hideProgress();
            if (!err && resp) {
                app.helper.showModal(resp, {
                    'cb': function (modalContainer) {
                        thisInstance.registerCreateFollowUpEvent(modalContainer);
                    }
                });
            }
        });
    },

    registerCreateFollowUpEvent: function (modalContainer) {
        var thisInstance = CalendarHorizontal;
        var params = {
            submitHandler: function (form) {
                form = jQuery(form);
                form.find('[type="submit"]').attr('disabled', 'disabled');
                var formData = form.serializeFormData();
                app.helper.showProgress();
                app.request.post({'data': formData}).then(function (err, res) {
                    app.helper.hideProgress();
                    app.helper.hideModal();
                    if (!err && res['created']) {
                        TimeScheduler.Init();
                    } else {
                        app.helper.showErrorNotification({
                            'message': app.vtranslate('JS_NO_EDIT_PERMISSION')
                        });
                    }
                });
            }
        };
        modalContainer.find('form#followupQuickCreate').vtValidate(params);
    },

    registerEditEventModalEvents: function (modalContainer) {
        var params = {
            submitHandler: function (form) {
                jQuery("button[name='saveButton']").attr("disabled", "disabled");
                if (this.numberOfInvalids() > 0) {
                    jQuery("button[name='saveButton']").removeAttr("disabled");
                    return false;
                }
                var e = jQuery.Event(Vtiger_Edit_Js.recordPresaveEvent);
                app.event.trigger(e);
                if (e.isDefaultPrevented()) {
                    return false;
                }
                CalendarHorizontal._updateEvent(form);
            }
        };
        modalContainer.find('form').vtValidate(params);
    },

    _updateEvent: function (form, extraParams) {
        var formData = jQuery(form).serializeFormData();
        extraParams = extraParams || {};
        jQuery.extend(formData, extraParams);
        app.helper.showProgress();
        app.request.post({data: formData}).then(function (err, data) {
            if (!err) {
                app.helper.showSuccessNotification({"message": ''});
                TimeScheduler.Init();
            } else {
                app.helper.showErrorNotification({"message": err});
            }
            app.event.trigger("post.QuickCreateForm.save", data, jQuery(form).serializeFormData());
            app.helper.hideModal();
            app.helper.hideProgress();
        });
    },

    Cell_Clicked: function(periodSelected, cell_number, section) {
        var calendarInstance = new Calendar_Calendar_Js();
        var date_start = TimeScheduler.Options.Start;
        var startDateTime = moment(date_start).add('hours', cell_number * (periodSelected.TimeframePeriod / 60));
        startDateTime = TimeScheduler.roundTimeWithDuration(startDateTime);
        var moduleName = 'Events';
        var isAllowed = jQuery('#is_record_creation_allowed').val();
        if (isAllowed) {
            var quickCreateNode = jQuery('#quickCreateModules').find('[data-name="' + moduleName + '"]');
            if (quickCreateNode.length <= 0) {
                app.helper.showAlertNotification({
                    'message': app.vtranslate('JS_NO_CREATE_OR_NOT_QUICK_CREATE_ENABLED')
                });
            } else {
                quickCreateNode.trigger('click');
            }

            app.event.one('post.QuickCreateForm.show', function (e, form) {
                calendarInstance.performingDayClickOperation = false;
                var modalContainer = form.closest('.modal');
                //auto fill data time
                if (typeof startDateTime !== 'undefined' && startDateTime) {
                    if($('#calendar_horizontal_time_duration').length > 0) {
                        modalContainer.find('input[name="defaultOtherEventDuration"]').val($('#calendar_horizontal_time_duration').val());
                        modalContainer.find('input[name="defaultCallDuration"]').val($('#calendar_horizontal_time_duration').val());
                    }
                    calendarInstance.setStartDateTime(modalContainer, startDateTime);
                }
                //auto fill assigned to
                if(section.id){
                    if(modalContainer.find('select[name=assigned_user_id] option[value='+section.id+']').length > 0) {
                        modalContainer.find('select[name=assigned_user_id]').val(section.id).trigger('change');
                    }
                }

                //handle create event
                if (moduleName === 'Events') {
                    CalendarHorizontal.validateAndSaveEvent(form.closest('.modal'));
                }
            });
        }
    },

    validateAndSaveEvent: function (modalContainer) {
        var calendarInstance = new Calendar_Calendar_Js();
        var params = {
            submitHandler: function (form) {
                jQuery("button[name='saveButton']").attr("disabled", "disabled");
                if (this.numberOfInvalids() > 0) {
                    return false;
                }
                var e = jQuery.Event(Vtiger_Edit_Js.recordPresaveEvent);
                app.event.trigger(e);
                if (e.isDefaultPrevented()) {
                    return false;
                }
                var formData = jQuery(form).serialize();
                app.helper.showProgress();
                app.request.post({data: formData}).then(function (err, data) {
                    if (!err) {
                        app.helper.showSuccessNotification({"message": ''});
                        TimeScheduler.Init();
                    } else {
                        app.helper.showErrorNotification({"message": err});
                    }
                    app.helper.hideModal();
                    app.helper.hideProgress();
                });
            }
        };
        modalContainer.find('form').vtValidate(params);
    },

    Item_Dragged: function(item, sectionID, start, end) {
        var foundItem;
        for (var i = 0; i < CalendarHorizontal.Items.length; i++) {
            foundItem = CalendarHorizontal.Items[i];

            if (foundItem.id === item.id) {
                foundItem.sectionID = sectionID;
                foundItem.start = start;
                foundItem.end = end;

                CalendarHorizontal.Items[i] = foundItem;
            }
        }

        CalendarHorizontal.updateActivity(item, start.format('YYYY-MM-DD HH:mm'), end.format('YYYY-MM-DD HH:mm'), sectionID);
    },

    Item_Resized: function(item, start, end) {
        var foundItem;
        for (var i = 0; i < CalendarHorizontal.Items.length; i++) {
            foundItem = CalendarHorizontal.Items[i];

            if (foundItem.id === item.id) {
                foundItem.start = start;
                foundItem.end = end;

                CalendarHorizontal.Items[i] = foundItem;
            }
        }

        CalendarHorizontal.updateActivity(item, start.format('YYYY-MM-DD HH:mm'), end.format('YYYY-MM-DD HH:mm'));
    },

    Item_Movement: function(item, start, end, cloneElement) {
        /*var html;

         html = '<div>';
         html += '   <div>';
         html += '       Start: ' + start.format('Do MMM YYYY HH:mm');
         html += '   </div>';
         html += '   <div>';
         html += '       End: ' + end.format('Do MMM YYYY HH:mm');
         html += '   </div>';
         html += '</div>';

         $('.realtime-info').empty().append(html);*/
        var element = $(this);
        var time_container = element.find('.fc-horizontal-time .event-start-end');
        var time_format = $('#time_format').val();

        start = TimeScheduler.roundTimeWithDuration(start);
        end = TimeScheduler.roundTimeWithDuration(end);
        if(time_format==12){
            var start_time_string = start.format('hh:mm A');
            var end_time_string = end.format('hh:mm A');
        }else{
            var start_time_string = start.format('HH:mm');
            var end_time_string = end.format('HH:mm');
        }

        time_container.html(start_time_string + ' - ' + end_time_string);
    },

    Item_MovementStart: function() {
        //$('.realtime-info').show();
    },

    Item_MovementEnd: function() {
        //$('.realtime-info').hide();
    },

    updateActivity: function (item, start, end, sectionId) {
        var itemId = item.id;
        var itemIdArr = itemId.split('_');
        if(typeof sectionId == 'undefined'){
            sectionId = itemIdArr[0];
        }
        var params = {};
        params['module'] = 'CalendarHorizontal';
        params['action'] = 'HorizontalAjax';
        params['mode'] = 'UpdateActivity';
        params['record'] = itemIdArr[1];
        params['user_id'] = sectionId;
        params['datetime_start'] = start;
        params['due_datetime'] = end;
        params['target_module'] = item.module;
        params['fieldname'] = item.fieldname;
        var aDeferred = jQuery.Deferred();
        app.helper.showProgress();
        app.request.post({'data': params}).then(function (e, res) {
            app.helper.hideProgress();
            if (!e) {
                TimeScheduler.Init();
                aDeferred.resolve(res);
            } else {
                aDeferred.reject(e);
            }
        });

        return aDeferred.promise();
    },

    registerHorizontalCalendar: function () {
        if((app.module() === 'Calendar' && app.view() === 'Calendar') || (app.module() === 'Calendar' && app.view() === 'SharedCalendar')){
            if($('#CalendarViewContent .fc-left .fc-button-group').length > 0){
                if($('#CalendarViewContent .fc-left .fc-button-group .fc-horizontal-button').length == 0) {
                    var horizontalBtn = '<button type="button" class="fc-horizontal-button fc-button fc-state-default">'+app.vtranslate('Job Scheduler')+'</button>';
                    $('#CalendarViewContent .fc-left .fc-button-group').append(horizontalBtn);
                    CalendarHorizontal.registerShowHorizontalCalendar();
                }
            }
        }
    },

    processDefaultView: function () {
        if((app.module() === 'Calendar' && app.view() === 'Calendar') || (app.module() === 'Calendar' && app.view() === 'SharedCalendar')) {
            var aDeferred = jQuery.Deferred();

            var requestParams = {
                'module': 'CalendarHorizontal',
                'action': 'HorizontalAjax',
                'mode': 'getDefaultView'
            };

            app.request.post({'data': requestParams}).then(function (e, res) {
                if (!e) {
                    if (res == 1) {
                        $('#CalendarViewContent .fc-button-group .fc-horizontal-button').trigger('click');
                    }
                    aDeferred.resolve(res);
                } else {
                    aDeferred.reject(e);
                }
            });

            return aDeferred.promise();
        }
    },

    registerShowHorizontalCalendar: function(){
        $('#CalendarViewContent .fc-button-group .fc-horizontal-button').unbind('click').on('click', function () {
            $('#CalendarViewContent .fc-left .fc-button-group button').removeClass('fc-state-active');
            $('#CalendarViewContent .fc-left .fc-button-group .fc-horizontal-button').addClass('fc-state-active');
            CalendarHorizontal.showHorizontalCalendar();
        });
    },

    registerFeedAddEvent: function (instanceFromView) {
        $('#module-filters .add-calendar-feed').off('click');
        instanceFromView.registerFeedAddEvent();
    },

    registerFeedDeleteEvent: function (instanceFromView) {
        jQuery('#calendarview-feeds').off('click','.deleteCalendarFeed');
        instanceFromView.registerFeedDeleteEvent();
    },

    registerFeedsColorEditEvent: function (instanceFromView) {
        jQuery('#calendarview-feeds').off('click', '.editCalendarFeedColor');
        instanceFromView.registerFeedsColorEditEvent();
    },

    registerOverrideFeedsEvent: function () {
        CalendarHorizontal.registerFeedChangeEvent();
        if(app.view() === 'SharedCalendar'){
            var instanceFromView = new Calendar_SharedCalendar_Horizontal_Js();
        }else{
            var instanceFromView = new Calendar_Horizontal_Js();
        }
        CalendarHorizontal.registerFeedAddEvent(instanceFromView);
        CalendarHorizontal.registerFeedDeleteEvent(instanceFromView);
        CalendarHorizontal.registerFeedsColorEditEvent(instanceFromView);
    },

    showHorizontalCalendar: function(){
        var aDeferred = jQuery.Deferred();

        var requestParams = {
            'module': 'CalendarHorizontal',
            'view': 'Horizontal',
        };

        app.helper.showProgress();
        app.request.post({'data': requestParams}).then(function (e, res) {
            app.helper.hideProgress();
            if (!e) {
                var vtCalendarInstance =  Calendar_Calendar_Js.getInstance();
                var container = vtCalendarInstance.getCalendarViewContainer();
                container.fullCalendar('destroy');
                container.prepend(res);
                if(app.getViewName()==='SharedCalendar'){
                    container.find('.fc-vtAgendaList-button').hide();
                }else{
                    container.find('.fc-vtAgendaList-button').show();
                }

                container.find('.fc-month-button').unbind('click').on('click', function(){
                    container.find('.fc-horizontal-view').remove();
                    vtCalendarInstance.initializeCalendar();
                    vtCalendarInstance.renderEvents();
                    container.fullCalendar('changeView', 'month');
                    CalendarHorizontal.registerHorizontalCalendar();
                    $('#calendarview-feeds').unbind('change', 'input[type="checkbox"].toggleCalendarFeed');
                    vtCalendarInstance.registerFeedChangeEvent();
                    var widgetContainer = $('#module-filters');
                    $('#module-filters .add-calendar-feed').off('click');
                    vtCalendarInstance.registerFeedAddEvent(widgetContainer);
                    jQuery('#calendarview-feeds').off('click', '.editCalendarFeedColor');
                    vtCalendarInstance.registerFeedsColorEditEvent();
                    jQuery('#calendarview-feeds').off('click','.deleteCalendarFeed');
                    vtCalendarInstance.registerFeedDeleteEvent();
                });

                container.find('.fc-agendaWeek-button').unbind('click').on('click', function(){
                    container.find('.fc-horizontal-view').remove();
                    vtCalendarInstance.initializeCalendar();
                    vtCalendarInstance.renderEvents();
                    container.fullCalendar('changeView', 'agendaWeek');
                    CalendarHorizontal.registerHorizontalCalendar();
                    $('#calendarview-feeds').unbind('change', 'input[type="checkbox"].toggleCalendarFeed');
                    vtCalendarInstance.registerFeedChangeEvent();
                    var widgetContainer = $('#module-filters');
                    $('#module-filters .add-calendar-feed').off('click');
                    vtCalendarInstance.registerFeedAddEvent(widgetContainer);
                    jQuery('#calendarview-feeds').off('click', '.editCalendarFeedColor');
                    vtCalendarInstance.registerFeedsColorEditEvent();
                    jQuery('#calendarview-feeds').off('click','.deleteCalendarFeed');
                    vtCalendarInstance.registerFeedDeleteEvent();
                });

                container.find('.fc-agendaDay-button').unbind('click').on('click', function(){
                    container.find('.fc-horizontal-view').remove();
                    vtCalendarInstance.initializeCalendar();
                    vtCalendarInstance.renderEvents();
                    container.fullCalendar('changeView', 'agendaDay');
                    CalendarHorizontal.registerHorizontalCalendar();
                    $('#calendarview-feeds').unbind('change', 'input[type="checkbox"].toggleCalendarFeed');
                    vtCalendarInstance.registerFeedChangeEvent();
                    var widgetContainer = $('#module-filters');
                    $('#module-filters .add-calendar-feed').off('click');
                    vtCalendarInstance.registerFeedAddEvent(widgetContainer);
                    jQuery('#calendarview-feeds').off('click', '.editCalendarFeedColor');
                    vtCalendarInstance.registerFeedsColorEditEvent();
                    jQuery('#calendarview-feeds').off('click','.deleteCalendarFeed');
                    vtCalendarInstance.registerFeedDeleteEvent();
                });

                container.find('.fc-vtAgendaList-button').unbind('click').on('click', function(){
                    container.find('.fc-horizontal-view').remove();
                    vtCalendarInstance.initializeCalendar();
                    vtCalendarInstance.renderEvents();
                    container.fullCalendar('changeView', 'vtAgendaList');
                    CalendarHorizontal.registerHorizontalCalendar();
                    $('#calendarview-feeds').unbind('change', 'input[type="checkbox"].toggleCalendarFeed');
                    vtCalendarInstance.registerFeedChangeEvent();
                    var widgetContainer = $('#module-filters');
                    $('#module-filters .add-calendar-feed').off('click');
                    vtCalendarInstance.registerFeedAddEvent(widgetContainer);
                    jQuery('#calendarview-feeds').off('click', '.editCalendarFeedColor');
                    vtCalendarInstance.registerFeedsColorEditEvent();
                    jQuery('#calendarview-feeds').off('click','.deleteCalendarFeed');
                    vtCalendarInstance.registerFeedDeleteEvent();
                });

                //user profile
                CalendarHorizontal.registerCalendarSettingsEvent();

                //render calendar
                CalendarHorizontal.Init();

                CalendarHorizontal.registerOverrideFeedsEvent();

                aDeferred.resolve(res);
            } else {
                aDeferred.reject(e);
            }
        });

        return aDeferred.promise();
    },

    registerFeedChangeEvent: function () {
        if($('#calendarview-feeds input[type="checkbox"].toggleCalendarFeed').length > 0 && $('.fc-button-group .fc-state-active').hasClass('fc-horizontal-button')) {
            $('#calendarview-feeds').unbind('change').on('change','input[type="checkbox"].toggleCalendarFeed', function () {
                CalendarHorizontal.Init();
            });
        }
    },

    registerCalendarSettingsEvent: function () {
        if($('.calendar-horizontal-user-profiles').length>0){
            $('.calendar-horizontal-user-profiles').unbind('click').on('click', function(){
                var params = {
                    'module': 'CalendarHorizontal',
                    'view': 'CalendarSettings'
                };
                app.helper.showProgress();
                app.request.post({'data': params}).then(function (e, data) {
                    app.helper.hideProgress();
                    if (!e) {
                        app.helper.showModal(data, {
                            'cb': function (modalContainer) {
                                modalContainer.find('button[name="saveButton"]').on('click', function () {
                                    var saveBtn = $(this);
                                    saveBtn.attr("disabled", "disabled");
                                    var form = modalContainer.find('form');
                                    var start_hour = form.find('select.calendar_horizontal_settings_start_hour').val();
                                    start_hour = parseInt(start_hour);
                                    var end_hour = form.find('select.calendar_horizontal_settings_end_hour').val();
                                    end_hour = parseInt(end_hour);
                                    if(end_hour <= start_hour) {
                                        app.helper.showErrorNotification({"message": app.vtranslate('End Hour must is greater than Start Hour')});
                                        saveBtn.removeAttr('disabled');
                                        return;
                                    }
                                    var formData = form.serialize();
                                    app.helper.showProgress();
                                    app.request.post({data: formData}).then(function (err, data) {
                                        if (!err) {
                                            app.helper.showSuccessNotification({"message": ''});
                                            $('.fc-horizontal-view').remove();
                                            CalendarHorizontal.showHorizontalCalendar();
                                        } else {
                                            app.helper.showErrorNotification({"message": err});
                                        }
                                        app.helper.hideModal();
                                        app.helper.hideProgress();
                                    });
                                });
                            }
                        });
                    } else {
                        console.log("network error : ", e);
                    }
                });
            });
        }
    },

};
$( document ).ready(function() {
    // Only load when loadHeaderScript=1 BEGIN #241208
    /*if (typeof VTECheckLoadHeaderScript == 'function') {
     if (!VTECheckLoadHeaderScript('CalendarHorizontal')) {
     return;
     }
     }*/
    // Only load when loadHeaderScript=1 END #241208

    if(app.module() != 'Calendar' && app.view() != 'Calendar' && app.view() != 'SharedCalendar' ) {
        return;
    }
    
    if( typeof Calendar_Calendar_Js != 'undefined') {
        Calendar_Calendar_Js('Calendar_Horizontal_Js', {

            calendarViewContainer: false

        }, {
            deleteFeed: function (feedIndicator) {
                var thisInstance = this;
                var feedCheckbox = feedIndicator.find('input[type="checkbox"].toggleCalendarFeed');
                var params = thisInstance.getFeedDeleteParameters(feedCheckbox);

                app.helper.showProgress();
                app.request.post({'data': params}).then(function (e) {
                    if (!e) {
                        feedIndicator.remove();
                        app.helper.showSuccessNotification({
                            message: app.vtranslate('JS_CALENDAR_VIEW_DELETED_SUCCESSFULLY')
                        });
                        CalendarHorizontal.Init();
                    } else {
                        console.log("error : ", e);
                    }
                    app.helper.hideProgress();
                });
            },

            registerFeedAddEvent: function (widgetContainer) {
                var thisInstance = this;
                if(typeof widgetContainer == 'undefined'){
                    var widgetContainer = $('#module-filters');
                }
                widgetContainer.find('.add-calendar-feed').on('click', function () {
                    thisInstance.showAddCalendarFeedEditor();
                });
            },

            saveFeedSettings: function (modalContainer, feedIndicator) {
                var thisInstance = this;
                var modulesList = modalContainer.find('select[name="modulesList"]');
                var moduleName = modulesList.val();
                var fieldName = modalContainer.find('select[name="fieldsList"]').val();
                var selectedColor = modalContainer.find('input.selectedColor').val();
                var conditions = '';
                if (moduleName === 'Events') {
                    conditions = modalContainer.find('[name="conditions"]').val();
                    if (conditions !== '') {
                        conditions = JSON.stringify(conditions);
                    }
                }

                var editorMode = modalContainer.find('.editorMode').val();
                if (editorMode === 'create') {
                    var translatedFieldName = modalContainer.find('.selectedType').data('typename');
                    if (modalContainer.find('[name="rangeFields"]').is(':checked')) {
                        var sourceValue = modalContainer.find('[name="sourceFieldsList"]').val();
                        var targetValue = modalContainer.find('[name="targetFieldsList"]').val();
                        fieldName = sourceValue + ',' + targetValue;
                        translatedFieldName = modalContainer.find('[name="sourceFieldsList"] option:selected').text() + ',' + modalContainer.find('[name="targetFieldsList"] option:selected').text();
                    }
                }

                var params = {
                    module: 'Calendar',
                    action: 'CalendarUserActions',
                    mode: 'addCalendarView',
                    viewmodule: moduleName,
                    viewfieldname: fieldName,
                    viewColor: selectedColor,
                    viewConditions: conditions
                };

                app.helper.showProgress();
                app.request.post({'data': params}).then(function (e, data) {
                    if (!e) {
                        var contrast = app.helper.getColorContrast(selectedColor);
                        var textColor = (contrast === 'dark') ? 'white' : 'black';
                        var message = app.vtranslate('JS_CALENDAR_VIEW_COLOR_UPDATED_SUCCESSFULLY');
                        var parsedConditions = thisInstance._getParsedConditions(conditions);
                        var feedIndicatorTitle = moduleName + '-' + translatedFieldName;
                        var calendarSourceKey = moduleName + '_' + fieldName;

                        if (parsedConditions.hasOwnProperty('value')) {
                            calendarSourceKey += '_' + parsedConditions.value;
                            feedIndicatorTitle = moduleName + '(' + app.vtranslate(parsedConditions.value) + ') -' + translatedFieldName;
                        }

                        if (editorMode === 'create') {
                            var translatedModuleName = modulesList.find('option:selected').text();
                            var feedIndicatorTemplate = jQuery('#calendarview-feeds').find('ul.dummy > li.feed-indicator-template');
                            feedIndicatorTemplate.removeClass('.feed-indicator-template');
                            var newFeedIndicator = feedIndicatorTemplate.clone(true, true);
                            newFeedIndicator.find('span:first').text(feedIndicatorTitle);
                            var newFeedCheckbox = newFeedIndicator.find('.toggleCalendarFeed');
                            newFeedCheckbox.attr('data-calendar-sourcekey', calendarSourceKey).
                            attr('data-calendar-feed', moduleName).
                            attr('data-calendar-fieldlabel', translatedFieldName).
                            attr('data-calendar-fieldname', fieldName).
                            attr('title', translatedModuleName).
                            attr('checked', 'checked');
                            if (data['type']) {
                                newFeedCheckbox.attr('data-calendar-type', data['type']);
                            }
                            feedIndicator = newFeedIndicator;
                            jQuery('#calendarview-feeds').find('ul:first').append(feedIndicator);
                            message = app.vtranslate('JS_CALENDAR_VIEW_ADDED_SUCCESSFULLY');
                        } else {
                            feedIndicator = jQuery('#calendarview-feeds')
                                .find('[data-calendar-sourcekey="' + calendarSourceKey + '"]')
                                .closest('.calendar-feed-indicator');
                        }

                        feedIndicator.css({'background-color': selectedColor, 'color': textColor});
                        var feedCheckbox = feedIndicator.find('.toggleCalendarFeed');
                        feedCheckbox.data('calendarFeedColor', selectedColor).
                        data('calendarFeedTextcolor', textColor).
                        data('calendarFeedConditions', conditions);
                        CalendarHorizontal.Init();

                        app.helper.hideProgress();
                        app.helper.hideModal();
                        app.helper.showSuccessNotification({'message': message});
                    } else {
                        console.log("error occured while saving : ", params, e);
                    }
                });
            },
        });
    }

    if( typeof Calendar_SharedCalendar_Js != 'undefined'){
        Calendar_SharedCalendar_Js('Calendar_SharedCalendar_Horizontal_Js', {

            calendarViewContainer : false

        }, {

            deleteFeed: function (feedIndicator) {
                var thisInstance = this;
                var feedCheckbox = feedIndicator.find('input[type="checkbox"].toggleCalendarFeed');
                var params = thisInstance.getFeedDeleteParameters(feedCheckbox);

                app.helper.showProgress();
                app.request.post({'data': params}).then(function (e) {
                    if (!e) {
                        feedIndicator.remove();
                        app.helper.showSuccessNotification({
                            message: app.vtranslate('JS_CALENDAR_VIEW_DELETED_SUCCESSFULLY')
                        });
                        CalendarHorizontal.Init();
                    } else {
                        console.log("error : ", e);
                    }
                    app.helper.hideProgress();
                });
            },

            registerFeedAddEvent: function (widgetContainer) {
                var thisInstance = this;
                if(typeof widgetContainer == 'undefined'){
                    var widgetContainer = $('#module-filters');
                }
                widgetContainer.find('.add-calendar-feed').on('click', function () {
                    thisInstance.showAddCalendarFeedEditor();
                });
            },

            saveFeedSettings : function(modalContainer) {
                var thisInstance = this;
                var selectedType = modalContainer.find('.selectedType');
                var selectedUserId = selectedType.val();
                var selectedUserName = selectedType.data('typename');
                var calendarGroup = selectedType.data('calendarGroup');
                var selectedColor = modalContainer.find('.selectedColor').val();
                var editorMode = modalContainer.find('.editorMode').val();

                var params = {
                    module: 'Calendar',
                    action: 'CalendarUserActions',
                    mode : 'addUserCalendar',
                    selectedUser : selectedUserId,
                    selectedColor : selectedColor
                };

                app.helper.showProgress();
                app.request.post({'data':params}).then(function(e) {
                    if(!e) {
                        var calendarFeedList = jQuery('#calendarview-feeds > ul.feedslist');
                        var message = app.vtranslate('JS_CALENDAR_VIEW_COLOR_UPDATED_SUCCESSFULLY');
                        if(editorMode === 'create') {
                            var feedIndicatorTemplate = jQuery('#calendarview-feeds').find('ul.dummy > li.feed-indicator-template');
                            feedIndicatorTemplate.removeClass('.feed-indicator-template');
                            var newFeedIndicator = feedIndicatorTemplate.clone(true,true);
                            newFeedIndicator.find('span:first').text(selectedUserName);
                            var newFeedCheckbox = newFeedIndicator.find('.toggleCalendarFeed');
                            newFeedCheckbox.attr('data-calendar-sourcekey','Events_'+selectedUserId).
                            attr('data-calendar-feed','Events').
                            attr('data-calendar-fieldlabel',selectedUserName).
                            attr('data-calendar-userid',selectedUserId).
                            attr('data-calendar-group',calendarGroup).
                            attr('checked','checked');
                            calendarFeedList.append(newFeedIndicator);
                            message = app.vtranslate('JS_CALENDAR_VIEW_ADDED_SUCCESSFULLY');
                        }

                        var contrast = app.helper.getColorContrast(selectedColor);
                        var textColor = (contrast === 'dark') ? 'white' : 'black';
                        var feedCheckbox = calendarFeedList.find('input[data-calendar-userid="'+selectedUserId+'"]');
                        feedCheckbox.data('calendarFeedColor',selectedColor).
                        data('calendarFeedTextcolor',textColor);
                        var feedIndicator = feedCheckbox.closest('.calendar-feed-indicator');
                        feedIndicator.css({'background-color':selectedColor,'color':textColor});
                        CalendarHorizontal.Init();

                        app.helper.hideProgress();
                        app.helper.hideModal();
                        app.helper.showSuccessNotification({'message':message});
                    } else {
                        console.log("error : ",e);
                    }
                });

            },
        });
    }


    CalendarHorizontal.registerHorizontalCalendar();
    CalendarHorizontal.processDefaultView();
});


