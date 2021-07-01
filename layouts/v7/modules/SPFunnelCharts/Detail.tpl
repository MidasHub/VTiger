{*<!--
/*+**********************************************************************************
 * Advanced Funnel Charts by SalesPlatform
 * Copyright (C) 2011-2016 SalesPlatform Ltd
 * All Rights Reserved.
 * This extension is licensed to be used within one instance of Vtiger CRM.
 * Source code or binaries may not be redistributed unless expressly permitted by SalesPlatform Ltd.
 * If you have any questions or comments, please email: extensions@salesplatform.ru
 ************************************************************************************/
-->*}
{strip}

<div class="contentsDiv  span10 marginLeftZero spFullenDetailContainer" id="rightPanel" style="min-height:550px;">
    <div class="dashBoardContainer clearfix">
        <div id="tab_1" data-tabid="1" data-tabname="name1" class="tab-pane fade in active">
            <div class="dashBoardTabContents clearfix">
                <div class="gridster">
                    <ul class="spDiagrammContainer">
                        {assign var=WIDGETDOMID value=$WIDGET->get('linkid')}
                        <li id="{$WIDGETDOMID}" class="dashboardWidget salesFunnelDetail" data-url="{$WIDGET->getUrl()}" data-mode="open" data-name="{$WIDGET->getName()}" style="position: inherit;">
                        </li>
                    </ul>
                </div>
            </div>
        </div>      
    </div>
</div>