/*+**********************************************************************************
 * Key Performance Indicators by SalesPlatform
 * Copyright (C) 2011-2016 SalesPlatform Ltd
 * All Rights Reserved.
 * This extension is licensed to be used within one instance of Vtiger CRM.
 * Source code or binaries may not be redistributed unless expressly permitted by SalesPlatform Ltd.
 * If you have any questions or comments, please email: extensions@salesplatform.ru
 ************************************************************************************/

Vtiger_Widget_Js('Vtiger_SPIndicators_Widget_Js', {},{
    
    postLoadWidget: function() {
        this._super();
        this.registerPopup();
    },
    
    postRefreshWidget : function() {
	this._super();
        this.registerPopup();
	},
    
    registerPopup : function() {
        var container = this.getContainer();
        $(".slimScrollDiv", container).css('overflow', 'visible');
        
        
        container.on("mousemove", function(event) {
            $('#funnel_popup').offset({ 
                top: event.clientY - $('#funnel_popup').height() - 25, 
                left: event.clientX - $('#funnel_popup').width()/2
            });
        });
        
        $('.spIndicatorRow', container).on('mouseover', function() {
            if($("input", $(this)).val() != '') {
                $('#funnel_popup').remove();
                var popupElement = $('<div id="funnel_popup">' + $("input", $(this)).val() + '</div>');
                popupElement.css({ 
                    position: 'absolute', 
                    'z-index': '1000',      //no transparency hack
                    float: 'right',
                    width: '100%',
                    'min-width' : '100px',
                    'max-width' : '250px',
                    background: '#fff',
                    border: '2px solid #c0c0c0',
                    margin: '0 44% 0 0',
                    padding: '2px 4px'
                });
                $(this).append(popupElement); 
            }
        });
        
        $('.spIndicatorRow', container).on('mouseout', function() {
            $('#funnel_popup').remove();
        });
    }
});