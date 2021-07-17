{*<!--
/* ********************************************************************************
* The content of this file is subject to the Global Search ("License");
* You may not use this file except in compliance with the License
* The Initial Developer of the Original Code is VTExperts.com
* Portions created by VTExperts.com. are Copyright(C) VTExperts.com.
* All Rights Reserved.
* ****************************************************************************** */
-->*}
<div class="container-fluid">
    <div class="widget_header row-fluid">
        <h3>{vtranslate('GlobalSearch', 'GlobalSearch')}</h3>
    </div>
    <hr>
    <div class="clearfix"></div>
    <div class="summaryWidgetContainer" id="global_search_settings">
        <ul class="nav nav-tabs massEditTabs">
            <li class="active">
                <a href="#fields" data-toggle="tab">
                    <strong>
                        {vtranslate('LBL_FIELDS', 'GlobalSearch')}
                    </strong>
                </a>
            </li>
            <li>
                <a href="#arrangeModules" data-toggle="tab">
                    <strong>
                        {vtranslate('LBL_ARRANGE_MODULES', 'GlobalSearch')}
                    </strong>
                </a>
            </li>
            <li>
                <a href="#QuickSearch" data-toggle="tab">
                    <strong>
                        {vtranslate('Quick Search', 'GlobalSearch')}
                    </strong>
                </a>
            </li>
        </ul>
        <div class="tab-content massEditContent">
            <div class="tab-pane active" id="fields">
                <div class="row-fluid">
                    <div class="select-search" style="margin-left:100px;margin-top:15px;">
                        <select class="select2" id="search_module" name="search_module" style="width: 300px;">
                            <option value="">{vtranslate('LBL_SELECT_MODULE', 'GlobalSearch')}</option>
                            {foreach from=$ALL_MODULE item=MODULE}
                                <option value="{$MODULE}">{vtranslate($MODULE, $MODULE)}</option>
                            {/foreach}
                        </select>
                    </div>
                </div>
                <br/>
                <div id="selectedFields">

                </div>
            </div>
            <div class="tab-pane" id="arrangeModules" style="">
                <div style="margin-left:100px;margin-top:15px;">
                    <div class="row">
                        <div class="col-md-4">
                            <ul class="searchModulesList" style="list-style: outside none none;">
                                {foreach from=$SEARCH_MODULES key=MODULE item=SEQUENCE}
                                    <li class="searchModule contentsBackground" style="width: 200px; padding: 5px; border: 1px solid #dddddd;"
                                        data-module="{$MODULE}" data-sequence="{$SEQUENCE}">
                                        <a><img src="{vimage_path('drag.png')}"
                                                title="{vtranslate('LBL_DRAG',$MODULE)}"/></a>&nbsp;&nbsp;
                                        <span class="moduleLabel">{vtranslate($MODULE, $MODULE)}</span>
                                    </li>
                                {/foreach}
                            </ul>
                        </div>
                        <div class="col-md-5" style="padding: 5% 0;">
                            <i class="icon-info-sign  glyphicon glyphicon-info-sign alignMiddle"></i>
                                    {vtranslate('LBL_DRAG_DROP_ORDER', 'GlobalSearch')}
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane" id="QuickSearch">
                <div class="row-fluid">
                    <div class="select-search" style="margin-left:100px;margin-top:15px;">
                        <div class="row">
                            <div class="col-lg-2 col-md-2"><label>Search Method:&nbsp;&nbsp;</label></div>
                            <div class="col-lg-10 col-md-10">
                                <select class="select2" id="search_method" name="search_method" style="width: 300px;">
                                    <option value="contains" {if $SEARCH_METHOD == 'contains'}selected{/if}>{vtranslate('Contains', 'GlobalSearch')}</option>
                                    <option value="starts_with" {if $SEARCH_METHOD == 'starts_with'}selected{/if}>{vtranslate('Starts with', 'GlobalSearch')}</option>
                                </select>
                            </div>
                        </div>
                        <div style="margin-top: 10px;" class="row">
                            <div class="col-lg-2 col-md-2">
                                <label>Limit per module:&nbsp;&nbsp;</label>
                            </div>
                            <div class="col-lg-10 col-md-10">
                                <input style="width: 300px;" class="inputElement" type="text" value="{$LIMIT_PER_MODULE}" name="limit_per_module" id="limit_per_module"/>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div>
                    <button type="button" id="save_search_method" class="btn btn-success">Save</button>
                </div>
            </div>
        </div>
    </div>
</div>