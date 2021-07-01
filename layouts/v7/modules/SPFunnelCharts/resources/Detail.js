/*+**********************************************************************************
 * Advanced Funnel Charts by SalesPlatform
 * Copyright (C) 2011-2016 SalesPlatform Ltd
 * All Rights Reserved.
 * This extension is licensed to be used within one instance of Vtiger CRM.
 * Source code or binaries may not be redistributed unless expressly permitted by SalesPlatform Ltd.
 * If you have any questions or comments, please email: extensions@salesplatform.ru
 ************************************************************************************/

Vtiger_DashBoard_Js("SPFunnelCharts_Detail_Js", {}, {

    registerEvents: function () {
        this.registerGridster();
        this.loadWidgets();
        this.registerRefresh();
        this.showWidgetIcons();
        this.hideWidgetIcons();
    },

    showWidgetIcons: function () {
        this.getContainer().on('mouseover', 'li', function (e) {
            var element = $(e.currentTarget);
            var widgetIcons = element.find('.widgeticons');
            widgetIcons.fadeIn('slow', function () {
                widgetIcons.css('visibility', 'visible');
            });
        });
    },
    
    registerRefresh : function() {
		var thisInstance = this;
		this.getContainer().on('click', '[name="drefresh"]', function(e) {
			var element = $(e.currentTarget);
			var parent = element.closest('li');
			var widgetInstnace = thisInstance.getWidgetInstance(parent);
			widgetInstnace.refreshWidget();
			return;
		});
	},
        
    getContainer : function() {
            return jQuery(".gridster").find('ul')
        },

    hideWidgetIcons: function () {
        this.getContainer().on('mouseout', 'li', function (e) {
            var element = $(e.currentTarget);
            var widgetIcons = element.find('.widgeticons');
            widgetIcons.css('visibility', 'hidden');
        });
    }
});