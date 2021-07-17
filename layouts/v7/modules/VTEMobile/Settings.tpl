{*/* ********************************************************************************
* The content of this file is subject to the Dynamic Blocks ("License");
* You may not use this file except in compliance with the License
* The Initial Developer of the Original Code is VTExperts.com
* Portions created by VTExperts.com. are Copyright(C) VTExperts.com.
* All Rights Reserved.
* ****************************************************************************** */*}
<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
    <div class="widget_header clearfix">
        <h3>{vtranslate($QUALIFIED_MODULE, $QUALIFIED_MODULE)}</h3>
    </div>
    <hr>
    <div class="clearfix">&nbsp;
        <span>Mobile Url: </span>
        <a class="link-mobile" target="_blank"
           href="{$MOBILE_URL}" style="color: blue;">{$MOBILE_URL}</a>
    </div>
    <div class="related-tabs summaryWidgetContainer row">
        <ul class="nav nav-tabs">
            <li class="tab-item active moduleTab_menu">
                <a href="#module_menu" data-toggle="tab" class="textOverflowEllipsis moduleTab">
                    <strong>{vtranslate('LBL_MENU_BAR',$QUALIFIED_MODULE)}</strong>
                </a>
            </li>
            <li class="tab-item moduleTab_related">
                <a href="#module_related" data-toggle="tab" class="textOverflowEllipsis moduleTab">
                    <strong>{vtranslate('LBL_RELATED',$QUALIFIED_MODULE)}</strong>
                </a>
            </li>
            <li class="tab-item moduleTab_related">
                <a href="#fields_modules" data-toggle="tab" class="textOverflowEllipsis moduleTab">
                    <strong>{vtranslate('LBL_MODULES_FIELDS',$QUALIFIED_MODULE)}</strong>
                </a>
            </li>
            <li class="tab-item moduleTab_related">
                <a href="#address_fields" data-toggle="tab" class="textOverflowEllipsis moduleTab">
                    <strong>{vtranslate('LBL_ADDRESS_FIELDS',$QUALIFIED_MODULE)}</strong>
                </a>
            </li>
            <li class="tab-item moduleTab_related">
                <a href="#div_google_authenticator" data-toggle="tab" class="textOverflowEllipsis moduleTab">
                    <strong>{vtranslate('LBL_2FA_GOOGLE_AUTHENTICATOR',$QUALIFIED_MODULE)}</strong>
                </a>
            </li>
            <li class="tab-item moduleTab_related">
                <a href="#div_default_module" data-toggle="tab" class="textOverflowEllipsis moduleTab">
                    <strong>{vtranslate('LBL_DEFAULT_MODULE',$QUALIFIED_MODULE)}</strong>
                </a>
            </li>
            <li class="tab-item moduleTab_related">
                <a href="#div_header_fields" data-toggle="tab" class="textOverflowEllipsis moduleTab">
                    <strong>{vtranslate('LBL_HEADER_FIELDS',$QUALIFIED_MODULE)}</strong>
                </a>
            </li>
            <li class="tab-item moduleTab_related">
                <a href="#div_login_screen" data-toggle="tab" class="textOverflowEllipsis moduleTab">
                    <strong>{vtranslate('LBL_LOGIN_SCREEN',$QUALIFIED_MODULE)}</strong>
                </a>
            </li>
            <li class="pull-right">
                <a class="hide" target="_blank"
                   href="https://www.vtexperts.com/vtiger-item-details-customizer-advanced-upgrading-vtiger-7/">{vtranslate('LBL_UPGRADING_FROM_VTIGER6',$QUALIFIED_MODULE)}</a>
            </li>
        </ul>
        <div class="tab-content col-lg-12 col-md-12">
            <div class="tab-pane moduleTab  active" id="module_menu">
                <input type="hidden" name="columnslist" value='{$MODULE_SELECTED_VALUE}'>
                <div class="row" style="margin-top: 20px;">
                    <span class="col-lg-10">
                       <select multiple class="select2 col-md-12" id="modulestoshow">
                           <option {if $MODULE_SELECTED eq 'all'} selected {/if} {if in_array("Calendar",$MODULE_SELECTED)} selected {/if} value="Calendar">Tasks</option>
                           <option {if $MODULE_SELECTED eq 'all'} selected {/if} {if in_array("Events",$MODULE_SELECTED)} selected {/if} value="Events">{vtranslate("Events","Events")}</option>
                           {foreach from=$MODULESHOW key=KEY item=VALUE }
                               <option {if $MODULE_SELECTED eq 'all' && in_array({$VALUE['name']},$SHOW_MODULE)} selected {/if} {if in_array({$VALUE['name']},$MODULE_SELECTED)} selected {/if}
                                       value="{$VALUE['name']}">{$VALUE['label']}</option>
                           {/foreach}
                       </select>
                    </span>
                    <span class="col-lg-2">
                        <div><button class="btn btn-primary" id="save-settings">{vtranslate('LBL_SAVE',$QUALIFIED_MODULE)}</button> </div>
                    </span>
                </div>
                <div class="form-group">
                    <div class=" vt-default-callout vt-info-callout tagInfoblock">
                        <h5 class="vt-callout-header"><span class="fa fa-info-circle"></span>&nbsp; Info </h5>
                        <div>Selected modules will appear in the mobile navigation menu.</div>
                    </div>
                </div>
            </div>
            <div class="tab-pane moduleTab " id="module_related">
                <input type="hidden" name="columnslist" value='{$RELATED_MODULES_VALUES}'>
                <div class="row" style="margin-top: 20px;">
                    <span class="col-lg-10">
                       <select class="select2 col-md-12" id="parentmodule">
                            <option value="" selected="selected">{vtranslate('Select an Option', $MODULE)}</option>
                           {foreach from=$MODULESHOW key=KEY item=VALUE }
                               <option value={$VALUE['name']}>{$VALUE['label']}</option>
                           {/foreach}
                       </select>
                    </span>
                    <span class="col-lg-2">
                        <div><button class="btn btn-primary" id="save-settings-related">{vtranslate('LBL_SAVE',$QUALIFIED_MODULE)}</button> </div>
                    </span>
                </div>
                <div class="row" style="margin-top: 20px;">
                    <span class="col-lg-10">
                       <select multiple class="select2 col-md-12" id="relatedmodule">
                       </select>
                    </span>
                </div>

                <div class="hide">
                    {foreach from=$ALL_RELATED_MODULES key=KEY item=PARENT_MODULE }
                        <select multiple="multiple" class="select2 col-md-12" id="relatedmodule-{$KEY}">
                            {foreach from=$PARENT_MODULE key=INDEX item=VALUE }
                                    <option {if $RELATED_MODULE_SETTINGS eq 'all'}
                                        {if $VALUE->get('relatedModuleName') && !in_array($VALUE->get('relatedModuleName'),$HIDE_MODULE_RELATED) && $VALUE->get('relatedModuleName') != $KEY}
                                            selected
                                        {/if}
                                        {else}
                                        {if $RELATED_MODULE_SETTINGS->$KEY}
                                            {if in_array($VALUE->get('relatedModuleName'),$RELATED_MODULE_SETTINGS->$KEY)}
                                                selected
                                            {/if}
                                            {else}
                                            selected
                                        {/if}
                                    {/if} value="{$VALUE->get('relatedModuleName')}">{vtranslate($VALUE->get('label'),$VALUE->get('modulename'))}</option>
                            {/foreach}
                        </select>
                    {/foreach}
                </div>
                <div class="form-group">
                    <div class=" vt-default-callout vt-info-callout tagInfoblock">
                        <h5 class="vt-callout-header"><span class="fa fa-info-circle"></span>&nbsp; Info </h5>
                        <div>Select primary module and specify which related modules should appear in the mobile.</div>
                    </div>
                </div>
            </div>
            <div class="tab-pane moduleTab " id="fields_modules">
                <input type="hidden" name="columnslist" value='{$FIELDS_MODULES_VALUES}'>
                <div class="row" style="margin-top: 20px;">
                    <span class="col-lg-10">
                       <select class="select2 col-md-12" id="parentmodule-fields">
                           <option value="" selected="selected">{vtranslate('Select an Option', $MODULE)}</option>
                           {foreach from=$MODULESHOW key=KEY item=VALUE }
                               <option value={$VALUE['name']}>{$VALUE['label']}</option>
                           {/foreach}
                       </select>
                    </span>
                    <span class="col-lg-2">
                        <div><button class="btn btn-primary" id="save-settings-fields">{vtranslate('LBL_SAVE',$QUALIFIED_MODULE)}</button> </div>
                    </span>
                </div>
                <div class="row" style="margin-top: 20px;">
                    <span class="col-lg-10">
                       <select multiple class="select2 col-md-12" id="fieldsmodule">
                       </select>
                    </span>
                </div>

                <div class="hide">
                    {foreach from=$FIELDS_MODULES key=KEY item=MODULE}
                        <select multiple="multiple" class="select2 col-md-12" id="fieldsmodule-{$KEY}">
                            {foreach from=$MODULE key=INDEX item=VALUE }
                                <option {if $FIELDS_MODULES_SETTINGS eq 'all' && $VALUE->get('name') neq 'modifiedby'}
                                    selected
                                {else}
                                    {if $FIELDS_MODULES_SETTINGS->$KEY}
                                        {if in_array($VALUE->get('name'),$FIELDS_MODULES_SETTINGS->$KEY)}
                                            selected
                                        {/if}
                                    {elseif $VALUE->get('name') neq 'modifiedby'}
                                        selected
                                    {/if}
                                {/if} value="{$VALUE->get('name')}">{vtranslate($VALUE->get('label'),$KEY)}</option>
                            {/foreach}
                        </select>
                    {/foreach}
                </div>
                <div class="form-group">
                    <div class=" vt-default-callout vt-info-callout tagInfoblock">
                        <h5 class="vt-callout-header"><span class="fa fa-info-circle"></span>&nbsp; Info </h5>
                        <div>Configure fields to be shown for each module.</div>
                    </div>
                </div>
            </div>
            <div class="tab-pane moduleTab " id="address_fields">
                <div class="row" style="margin-top: 20px;">
                    <span class="col-lg-10">
                       <select class="select2 col-md-12" id="parentmodule-addressfields">
                           <option value="" selected="selected">{vtranslate('Select an Option', $MODULE)}</option>
                           {foreach from=$MODULESHOW key=KEY item=VALUE }
                               <option value={$VALUE['name']}>{$VALUE['label']}</option>
                           {/foreach}
                       </select>
                    </span>
                    <span class="col-lg-2">
                        <div><button class="btn btn-primary" id="save-settings-addressfields">{vtranslate('LBL_SAVE',$QUALIFIED_MODULE)}</button> </div>
                    </span>
                </div>
                <div class="row" style="margin-top: 20px;">
                    <span class="col-lg-10">
                       <select multiple class="select2 col-md-12" id="addressfieldsmodule">
                       </select>
                    </span>
                </div>
                <div class="hide">
                    {foreach from=$FIELDS_MODULES key=KEY item=MODULE}
                        <select multiple="multiple" class="select2 col-md-12" id="addressfieldsmodule-{$KEY}">
                            {foreach from=$MODULE key=INDEX item=VALUE }
                                <option
                                    {if $ADDRESS_FIELDS_MODULES_SETTINGS->$KEY}
                                        {if in_array($VALUE->get('name'),$ADDRESS_FIELDS_MODULES_SETTINGS->$KEY)}
                                            selected
                                        {/if}
                                    {/if}
                                 value="{$VALUE->get('name')}">{vtranslate($VALUE->get('label'),$KEY)}</option>
                            {/foreach}
                        </select>
                    {/foreach}
                </div>
                <div class="form-group">
                    <div class=" vt-default-callout vt-info-callout tagInfoblock">
                        <h5 class="vt-callout-header"><span class="fa fa-info-circle"></span>&nbsp; Info </h5>
                        <div>Select the field which stores full address of the record.</div>
                        <br>
                        <div>
                            The field must have a full address e.g "123 Main Street, Chicago IL 60614".
                        </div>
                        <br>
                        <div>
                            You might need to create a new custom field + a workflow to concat(address1, city, state zip).
                        </div>
                        <br>
                        <div>
                            Once added, a google maps icon will show up on mobile, which will open the map when clicked.
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane moduleTab " id="div_google_authenticator">
                <div class="row" style="margin-top: 20px;">
                    <span class="col-lg-2">{vtranslate('LBL_ENABLE_2FA_GOOGLE_AUTHENTICATOR',$QUALIFIED_MODULE)}</span>
                    <span class="col-lg-6">
                        <input type="checkbox" name="google_authenticator" {if $GOOGLE_AUTHENTICATOR eq '1'}checked="checked"{/if} id="google_authenticator"/>
                    </span>
                </div>
                <div class="form-group">
                    <div class=" vt-default-callout vt-info-callout tagInfoblock">
                        <h5 class="vt-callout-header"><span class="fa fa-info-circle"></span>&nbsp; Info </h5>
                        <div>This requires Enhanced User Security Extension to be installed & configured first.</div>
                    </div>
                </div>
            </div>
            <div class="tab-pane moduleTab " id="div_default_module">
                <div class="row" style="margin-top: 20px;">
                    <span class="col-lg-10">
                       <select class="select2 col-md-12" id="default_module">
                           <option value="" selected="selected">{vtranslate('Select an Option', $MODULE)}</option>
                           {foreach from=$MODULESHOW key=KEY item=VALUE }
                               <option value={$VALUE['name']} {if $VALUE['name'] == $DEFAULT_MODULE}selected{/if}>{$VALUE['label']}</option>
                           {/foreach}
                       </select>
                    </span>
                    <span class="col-lg-2">
                        <div><button class="btn btn-primary" id="save-settings-defaultmodule">{vtranslate('LBL_SAVE',$QUALIFIED_MODULE)}</button> </div>
                    </span>
                </div>
                <div class="form-group">
                    <div class=" vt-default-callout vt-info-callout tagInfoblock">
                        <h5 class="vt-callout-header"><span class="fa fa-info-circle"></span>&nbsp; Info </h5>
                        <div>Specify default landing page for the mobile.</div>
                    </div>
                </div>
            </div>
            <div class="tab-pane moduleTab " id="div_header_fields">
                <input type="hidden" name="columnslist" value='{$HEADER_FIELDS_VALUES}'>
                <div class="row" style="margin-top: 20px;">
                    <span class="col-lg-10">
                       <select class="select2 col-md-12" id="parentmodule-header-fields">
                           <option value="" selected="selected">{vtranslate('Select an Option', $MODULE)}</option>
                           {foreach from=$MODULESHOW key=KEY item=VALUE }
                               <option value={$VALUE['name']} {if $VALUE['name'] == $DEFAULT_MODULE}selected{/if}>{$VALUE['label']}</option>
                           {/foreach}
                       </select>
                    </span>
                    <span class="col-lg-2">
                        <div><button class="btn btn-primary" id="save-settings-headerfields">{vtranslate('LBL_SAVE',$QUALIFIED_MODULE)}</button> </div>
                    </span>
                </div>
                <div class="row" style="margin-top: 20px;">
                    <span class="col-lg-10">
                       <select multiple class="select2 col-md-12" id="fieldsmodule-header">
                       </select>
                    </span>
                </div>

                <div class="hide">
                    {foreach from=$FIELDS_MODULES key=KEY item=MODULE}
                        <select multiple="multiple" class="select2 col-md-12" id="fieldsmodule-header-{$KEY}">
                            {foreach from=$MODULE key=INDEX item=VALUE }
                                <option
                                {if $HEADER_FIELDS_MODULES_SETTINGS eq 'all' && $VALUE->get('name') neq 'modifiedby' }
                                    selected
                                {else}
                                    {if $HEADER_FIELDS_MODULES_SETTINGS->$KEY }
                                        {if in_array($VALUE->get('name'),$HEADER_FIELDS_MODULES_SETTINGS->$KEY)}
                                            selected
                                        {/if}
                                    {elseif $VALUE->get('name') neq 'modifiedby' && $VALUE->get('headerfield') == '1'}
                                        selected
                                    {/if}
                                {/if} value="{$VALUE->get('name')}">{vtranslate($VALUE->get('label'),$KEY)}</option>
                            {/foreach}
                        </select>
                    {/foreach}
                </div>
                <div class="form-group">
                    <div class=" vt-default-callout vt-info-callout tagInfoblock">
                        <h5 class="vt-callout-header"><span class="fa fa-info-circle"></span>&nbsp; Info </h5>
                        <div>Configured fields will show up in the header of the record.</div>
                    </div>
                </div>
            </div>
            <div class="tab-pane moduleTab " id="div_login_screen">
                <form id="LoginScreenForm" class="form-horizontal" action="index.php" method="POST" enctype="multipart/form-data">
                    <div class="upload_image" style="margin-top: 20px;">
                        <div class="row">
                            <div class="col-lg-1"></div>
                            <div class="col-lg-3 fileUploadBtn btn btn-primary">
                                <span><i class="fa fa-upload"></i> {vtranslate('LBL_UPLOAD',$QUALIFIED_MODULE)} {vtranslate('LBL_LOGO',$QUALIFIED_MODULE)}</span>
                                <input type="file" name="logo_image" id="logo_image" accept="image/*"/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-1"></div>
                            <div class=" col-lg-3 progress" style="display: none;">
                                <div class="progress-bar bg"></div >
                                <div class="percent"></div >
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-1"></div>
                            <div class="list_image col-lg-3">
                                {if $LOGO_IMAGE}
                                    <span class="img_uploaded">
                                        <img src="{$LOGO_IMAGE}">
                                        <input type="button" data-input-name="logo_image" class="remove" value="&nbsp;X&nbsp;" title="{vtranslate('LBL_REMOVE')}">
                                    </span>
                                {/if}
                            </div>
                        </div>
                    </div>
                    <div class="upload_image" style="margin-top: 20px;">
                        <div class="row">
                            <div class="col-lg-1"></div>
                            <div class="col-lg-3 fileUploadBtn btn btn-primary">
                                <span><i class="fa fa-upload"></i> {vtranslate('LBL_UPLOAD',$QUALIFIED_MODULE)} {vtranslate('LBL_BACKGROUND',$QUALIFIED_MODULE)}</span>
                                <input type="file" name="background_image" id="background_image" accept="image/*"/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-1"></div>
                            <div class=" col-lg-3 progress" style="display: none;">
                                <div class="progress-bar bg"></div >
                                <div class="percent"></div >
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-1"></div>
                            <div class="list_image col-lg-3">
                                {if $BACKGROUND_IMAGE}
                                    <span class="img_uploaded">
                                        <img src="{$BACKGROUND_IMAGE}">
                                        <input type="button" data-input-name="background_image" class="remove" value="&nbsp;X&nbsp;" title="{vtranslate('LBL_REMOVE')}">
                                    </span>
                                {/if}
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class=" vt-default-callout vt-info-callout tagInfoblock">
                            <h5 class="vt-callout-header"><span class="fa fa-info-circle"></span>&nbsp; {vtranslate('LBL_INFO',$QUALIFIED_MODULE)} </h5>
                            <div>{vtranslate('LBL_LOGIN_SCREEN_INFO',$QUALIFIED_MODULE)}</div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>