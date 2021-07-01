{*<!--
/*+**********************************************************************************
 * Key Performance Indicators by SalesPlatform
 * Copyright (C) 2011-2016 SalesPlatform Ltd
 * All Rights Reserved.
 * This extension is licensed to be used within one instance of Vtiger CRM.
 * Source code or binaries may not be redistributed unless expressly permitted by SalesPlatform Ltd.
 * If you have any questions or comments, please email: extensions@salesplatform.ru
 ************************************************************************************/
-->*}
{strip}
    {include file="modules/Vtiger/partials/Topbar.tpl"}

    <div class="container-fluid app-nav">
        <div class="row">
            {include file="partials/SidebarHeader.tpl"|vtemplate_path:$MODULE}
            {include file="ModuleHeader.tpl"|vtemplate_path:$MODULE}
        </div>
    </div>
        </nav>    
     <div id='overlayPageContent' class='fade modal overlayPageContent content-area overlay-container-60' tabindex='-1' role='dialog' aria-hidden='true'>
        <div class="data">
        </div>
        <div class="modal-dialog">
        </div>
    </div>
    <div class="container-fluid main-container">
    <div class="row">
        <div id="modnavigator" class="module-nav detailViewModNavigator clearfix">
            <div class="hidden-xs hidden-sm mod-switcher-container">
                {include file="partials/Menubar.tpl"|vtemplate_path:$MODULE}
            </div>
        </div>
        <div class="detailViewContainer viewContent clearfix">
            <div class="col-sm-12 col-xs-12 content-area">
                <div class="container-fluid">
    <div class="row-fluid reportHeader">
        <div class="textAlignCenter">
            <h3>{$MODEL->getName()}</h3>
        </div>
    </div>
    <div class="row-fluid">
        <div class="btn-toolbar pull-right">
            {if $MODEL->isEditable() eq true}
                <div class="btn-group">
                    <button onclick='window.location.href="{$MODEL->getEditViewUrl()}"' type="button" class="cursorPointer btn">
                        <strong>{vtranslate('LBL_EDIT', $MODULE)}</strong>&nbsp;
                        <i class="icon-pencil"></i>
                    </button>
                </div>
            {/if}
            <div class="btn-group">
                <button onclick='window.location.href="{$MODEL->getDuplicateRecordUrl()}"' type="button" class="cursorPointer btn">
                    <strong>{vtranslate('LBL_DUPLICATE', $MODULE)}</strong>
                </button>
            </div>
        </div>
   </div>
</div>
                
            
                <div class="detailview-content container-fluid">
                    <input id="recordId" type="hidden" value="{$RECORD->getId()}" />
                    {include file="ModuleRelatedTabs.tpl"|vtemplate_path:$MODULE}
                    <div class="details row" style="margin-top:10px;">    
        


{/strip}