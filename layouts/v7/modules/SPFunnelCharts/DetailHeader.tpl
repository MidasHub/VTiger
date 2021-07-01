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
{include file="modules/Vtiger/partials/Topbar.tpl"}

    <div class="container-fluid app-nav">
        <div class="row">
            {include file="partials/SidebarHeader.tpl"|vtemplate_path:$MODULE}
            {include file="ModuleHeader.tpl"|vtemplate_path:$MODULE}
        </div>
    </div>
        </nav>    
        
<div class="container-fluid">
 
    <div id="modnavigator" class="module-nav editViewModNavigator">
        {include file="partials/Menubar.tpl"|vtemplate_path:$MODULE}
        </div>
    <div class="editViewPageDiv viewContent"> 
    <div class="reportHeader row">
        <div class="textAlignCenter">
            <h3>{$MODEL->getName()}</h3>
        </div>
    </div>
    <div class="row">
        <div class="btn-toolbar pull-right padding-right15">
            {if $MODEL->isEditable() eq true}
                <div class="btn-group">
                    <button onclick="window.location.href=&quot;{$MODEL->getEditViewUrl()}&quot;" type="button" class="cursorPointer btn btn-default">
                        <strong>{vtranslate('LBL_EDIT', $MODULE)}</strong>&nbsp;
                        <i class="icon-pencil"></i>
                    </button>
                </div>
            {/if}
            <div class="btn-group">
                <button onclick="window.location.href=&quot;{$MODEL->getDuplicateRecordUrl()}&quot;" type="button" class="cursorPointer btn btn-default">
                    <strong>{vtranslate('LBL_DUPLICATE', $MODULE)}</strong>
                </button>
            </div>
        </div>
   </div>
   </div>
</div>
            