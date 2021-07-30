/* ********************************************************************************
 * The content of this file is subject to the Related Record Update ("License");
 * You may not use this file except in compliance with the License
 * The Initial Developer of the Original Code is VTExperts.com
 * Portions created by VTExperts.com. are Copyright(C) VTExperts.com.
 * All Rights Reserved.
 * ****************************************************************************** */
Vtiger_Index_Js("VTERoundRobin_Js",{
    instance:false,
    getInstance: function(){
        if(VTERoundRobin_Js.instance == false){
            var instance = new VTERoundRobin_Js();
            VTERoundRobin_Js.instance = instance;
            return instance;
        }
        return VTERoundRobin_Js.instance;
    }
},{
    registerEventAddRoundRobinChangeStatusButton:function(){
        var top_navbar_container = $('nav.navbar.navbar-fixed-top');
        var params = {};
        params.action = 'ActionAjax';
        params.module = 'VTERoundRobin';
        params.mode = 'getCurrentUserRoundRobinStatus';
        app.request.post({'data' : params}).then(
            function(err,data){
                if(data != 'not_valid'){
                    if(err === null) {
                        var button = '<button  type="button" id="btn_change_roundrobin_status" title="Click to change the status." ';
                        var user_icon = '<i style="font-size: 13px;" class="vicon-cases icon-module" data-info="\e60e"></i>';
                        var style_online = "border-radius: 2px;background-image: none !important;box-shadow: none !important;line-height: 18px;cursor: pointer;font-weight: 400;padding: 6px 16px !important;color: #21ba5c;border: thin solid #21ba5c !important;background-color: #fff";
                        var style_offline = "border-radius: 2px;background-image: none !important;box-shadow: none !important;line-height: 18px;cursor: pointer;font-weight: 400;padding: 6px 16px !important;color: #ef6a6a;border: thin solid #ef6a6a !important;background-color: #fff";

                        if(data == 1){
                            button = button+' style="'+style_online+'" data-status="'+data+'">';
                            button = button+user_icon;
                            button = button+' ONLINE';
                        }else{
                            button = button+' style="'+style_offline+'" data-status="'+data+'">';
                            button = button+user_icon;
                            button = button+' OFFLINE';
                        }
                        button = button+'</button>';
                        var status = '<input id="roundrobin_status" value="'+data+'" type="hidden"/>';
                        top_navbar_container.find('div.global-nav div.search-links-container').after('<div class="col-md-1 col-lg-1 app-navigator-container" id="change_roundrobin_status_container" style="padding: 5px;">'+status+button+'</div>');
                        $('#btn_change_roundrobin_status').hover(function(){
                            var currStatus = $('#roundrobin_status').val();
                            if(currStatus == 1){
                                $(this).css({'background-color': '#21ba5c','color':'#fff'});
                            }else{
                                $(this).css({'background-color': '#ef6a6a','color':'#fff'});
                            }
                        }, function(){
                            var currStatus = $('#roundrobin_status').val();
                            if(currStatus == 1){
                                $(this).css({'background-color': '#fff','color':'#21ba5c'});
                            }else{
                                $(this).css({'background-color': '#fff','color':'#ef6a6a'});
                            }
                        });
                        $('#btn_change_roundrobin_status').on('click',function(){
                            var ele = $(this);
                            var currStatus = $('#roundrobin_status').val();
                            var changeTo = currStatus == 1 ? 0 : 1;
                            var params = {};
                            params.action = 'ActionAjax';
                            params.module = 'VTERoundRobin';
                            params.mode = 'changeCurrentUserRoundRobinStatus';
                            params.changeTo = changeTo;
                            app.request.post({'data' : params}).then(function(err,data){
                                $('#roundrobin_status').val(data);
                                var user_icon = '<i style="font-size: 13px;" class="vicon-cases icon-module" data-info="\e60e"></i>';
                                var message = '';
                                if(data == 1){
                                    ele.html(user_icon+' ONLINE');
                                    ele.css('color','#21ba5c');
                                    ele.css({'color':'#21ba5c','border-color':'#21ba5c'});
                                    message = 'Your are now ONLINE.';
                                }else{
                                    ele.html(user_icon+' OFFLINE');
                                    ele.css({'color':'#ef6a6a','border-color':'#ef6a6a'});
                                    message = 'Your are now OFFLINE.';
                                }
                                app.helper.showSuccessNotification({'message':message});
                                ele.attr('data-status',data);
                            });
                        });
                    }else{
                    }
                }
            }
        );

    },
    registerEvents: function(){
        this.registerEventAddRoundRobinChangeStatusButton();
    }
});
jQuery(document).ready(function() {
    // Only load when loadHeaderScript=1 BEGIN #241208
    if (typeof VTECheckLoadHeaderScript == 'function') {
        if (!VTECheckLoadHeaderScript('VTERoundRobin')) {
            return;
        }
    }
    // Only load when loadHeaderScript=1 END #241208
    var instance = new VTERoundRobin_Js();
    instance.registerEvents();
});