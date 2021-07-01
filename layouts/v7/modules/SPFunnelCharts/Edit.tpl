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

     
    <div class="container-fluid main-container">  
     <div class="row">
        <div class="editContainer" style="padding-left: 2%;padding-right: 2%">
        <br>
        <div class="col-md-offset-1">
        <h3>
            {if $MODEL->getId() eq '' || $IS_DUPLICATE}
                {vtranslate('LBL_CREATE_FUNNEL', $MODULE)}
            {else}
                {vtranslate('LBL_EDIT_FUNNEL', $MODULE)} : «{vtranslate($MODEL->getName(), $MODULE)}»
            {/if}
        </h3>
        </div>>
        <hr>
        <div class="clearfix"></div>
        </div>
        <div id="modnavigator" class="module-nav editViewModNavigator">
        {include file="partials/Menubar.tpl"|vtemplate_path:$MODULE}
        </div>
       <div class="editViewPageDiv viewContent">
        <div class="col-sm-12 col-xs-12 content-area {if $LEFTPANELHIDE eq '1'} full-width {/if}">
        <div id="spWidgetReport" class="reportContents">    
        <form class="form-horizontal recordEditView" method="post" action="index.php">
            <input type="hidden" name="module" value="{$MODULE}" />
            <input type="hidden" name="action" value="Save" >
            <input type="hidden" name="isDuplicate" value="{$IS_DUPLICATE}" />
            <input type="hidden" name="record" value="{$RECORD_ID}" />
            
                <div class="col-md-1"></div>
                <div class="col-md-10">
                <div class="well contentsBackground">
                    <div class="col-md-offset-1">
                          <div class="row padding1per">
                          <div class="fieldLabel  col-md-3"> {vtranslate('LBL_FUNNEL_NAME', $MODULE)}<span class="redColor">*</span> </div>
                          <input class="inputElement col-md-1 "  type="text" style="max-width: 450px;" name="name" value="{$MODEL->get('name')}"/> 
                          </div> 
                          
                          <div class="row padding1per">
            
                                <div class="fieldLabel col-md-3" >{vtranslate('LBL_FUNNEL_REPORTS', $MODULE)}<span class="redColor">*</span> </div> 
                                {assign var=SELECTED_REPORT_IDS value=array()}
                                     <select data-placeholder="{vtranslate('LBL_SELECT_REPORTS', $MODULE)}" id="reportsListSelectElement"  class="select2 col-md-1" multiple="" >
                                         {foreach key=REPORT_SEQUENCE item=DETAIL_REPORT_MODEL from=$SELECTED_REPORTS}
                                             {array_push($SELECTED_REPORT_IDS, $DETAIL_REPORT_MODEL->getId())}
                                         {/foreach}

                                         {foreach item=DETAIL_REPORT_MODEL from=$ALL_REPORTS}
                                             {assign var=CURRENT_REPORT_ID value=$DETAIL_REPORT_MODEL->getId()}
                                             <option value="{$CURRENT_REPORT_ID}" {if in_array($CURRENT_REPORT_ID, $SELECTED_REPORT_IDS)} selected {/if}>
                                             {vtranslate($DETAIL_REPORT_MODEL->getName(), $MODULE)}
                                             </option>
                                         {/foreach}
                                      </select>
     
                           </div>

                        <div class="row padding1per">
                        <div class="fieldLabel col-md-3">{vtranslate('LBL_DESCRIPTION', $MODULE)}</div>
                        <textarea class="col-md-5" type="text" name="description">{$MODEL->get('description')}</textarea>
                        </div>
                        </p> 
                    </div>
                </div>
              <div class="col-md-1"></div>
             <div class="clearfix"></div> 
            <div class="modal-overlay-footer">
            <div class="col-md-12"> 
                        <div class="row clearfix">
                            <div class='textAlignCenter col-lg-12 col-md-12 col-sm-12 '>
                                <button id="saveSpWidgetReport" class="btn btn-success saveButton" type="submit">{vtranslate('LBL_SAVE', $MODULE)}</button>&nbsp;&nbsp; 
                                <a class="cancelLink" href="javascript:history.back()" type="reset">{vtranslate('LBL_CANCEL', $MODULE)}</a>
                            </div>
                        </div>
                </div>
             </div>
            <input type="hidden" name="report_ids" value='' />
            <input type="hidden" name="topReportsIdsList" value='{ZEND_JSON::encode($SELECTED_REPORT_IDS)}' />
            <input type="hidden" id="reportsPlotDependencies" name="reportsPlotDependencies" value='{ZEND_JSON::encode($REPORTS_PLOT_DEPENDENCIES)}' />
            </div>
       
        </form>
            </div>
        </div>
        </div>

         </div>
    </div>        