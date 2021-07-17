{*<!--
/*************************************************************************************
** The contents of this file are subject to the vtiger CRM Public License Version 1.1
* ("License"); You may not use this file except in compliance with the License
* The Original Code is: vtiger CRM Open Source
* The Initial Developer of the Original Code is vtiger.
* Portions created by vtiger are Copyright (C) vtiger.
* All Rights Reserved.
*
**************************************************************************************/
-->*}
{include file="../Header.tpl" scripts=$_scripts}
<input type="hidden" class="module" value="{$MODULE}">

<section layout="row" flex class="content-section" ng-controller="{$_controller}">
    {include file="../Vtiger/Toolbar.tpl"}
    {include file="../Vtiger/SideMenu.tpl"}
    {literal}
        <md-button ng-click="listViewCreateEvent()" ng-if="isInventoryModule != true && !filterView" class="md-fab md-primary float-button md-fab-bottom-right" aria-label="addnew">
            <i class="mdi mdi-plus"></i>
        </md-button>
        <md-button ng-if="parentRecord && !selectRelated && isSelected" ng-click="selectRelatedRecord()" class="md-fab md-primary float-button md-fab-bottom-left" aria-label="addnew">
            <i class="mdi mdi-plus">R</i>
        </md-button>
        <div flex class="list-content">
            <div ng-if="!parentRecord" class="list-filters" layout="row" flex>
                <div ng-if="!filterView" flex="100" class="change-filter">
                    <md-button class="filter-btn" ng-click="changeFilterView();" aria-label="notifications">
                        <i class="mdi mdi-filter-outline"></i>
                    </md-button>
                    <md-input-container class="current-filter">
                        <md-select ng-model="selectedFilter" aria-label="filter" ng-change="changeFilter(selectedFilter)">
                            <md-optgroup label="Mine" aria-label="Mine">
                                <md-option ng-repeat="filter in filters.Mine track by filter.id" ng-value="filter.id" aria-label="{{filter.name}}">{{filter.name}}</md-option>
                            </md-optgroup>
                            <md-optgroup label="Shared" aria-label="Shared">
                                <md-option ng-repeat="filter in filters.Shared track by filter.id" ng-value="filter.id" aria-label="{{filter.name}}">{{filter.name}}</md-option>
                            </md-optgroup>
                            <md-optgroup ng-if="filterDataId" label="Custom Search" aria-label="Custom Search">
                                <md-option value="customFilter" aria-label="Click to Search & Configure">Click to Search & Configure</md-option>
                                <md-option value="applyCustomFilter" aria-label="Custom Filter Applied">Custom Filter Applied</md-option>
                            </md-optgroup>
                        </md-select>
                    </md-input-container>
                </div>
                <div ng-if="filterView" flex="100" class="change-filter">
                    <md-button class="filter-back" ng-click="goBackList();" aria-label="notifications">
                        <i class="mdi mdi-arrow-left actionbar-icon"></i>
                    </md-button>
                    <md-button class="filter-generate" ng-click="generateFilter();" aria-label="notifications">
                        <i class="mdi mdi-filter-outline"></i>
                    </md-button>
                    <md-button class="filter-save" ng-click="saveFilter();" aria-label="notifications">
                        <i class="mdi mdi-check actionbar-icon"></i>
                    </md-button>
                </div>
                <!--div flex="50" class="sort-filter" ng-if="records.length">
                    <md-button class="filter-btn" aria-label="notifications">
                        <i class="mdi mdi-sort"></i>
                    </md-button>
                    <md-input-container class="current-sort-field">
                        <md-select ng-model="orderBy" aria-label="sortfield" placeholder="Sort" ng-change="changeSort(orderBy)">
                            <md-option ng-repeat="nameField in nameFields track by $index" ng-value="nameField.name" aria-label="nameField.name">{{nameField.label}}</md-option>
                            <md-option ng-repeat="header in headers track by $index" ng-value="header.name" aria-label="nameField.name">{{header.label}}</md-option>
                        </md-select>
                    </md-input-container>
                </div>-->
            </div>
            <div layout="column" layout-fill layout-align="top center" ng-if="records.length || filterView">
                <md-list ng-if="!selectRelated && !filterView" class="records-list">
                    <md-list-item class="md-3-line" data-record-id="{{record.id}}" aria-label="row+{{record.id}}" ng-model="showActions" md-swipe-right="showActions=false;$event.stopPropagation();" md-swipe-left="showActions=true;$event.stopPropagation();" ng-click="gotoDetailView(record.id)" ng-repeat="record in records">
                        <div class="md-list-item-text">
                            <h3>
                                <span ng-repeat="label in headers" style="width: 70%; float: left;">
                                    <span style="line-height: 20px" ng-repeat="name in nameFields" ng-if="label.name === name">{{record[label.name] + " "}}</span>
                                </span>
                                <span class="modifiedtimeField">
                                    {{record['modifiedtimeField']}}
                                </span>
                            </h3>

                            <div ng-repeat="header in headers" ng-if="headerIndex(nameFields,header.name)== -1">
                                <p class="header-fields"  ng-if="header.fieldType != 'reference' && header.fieldType != 'picklist' && header.name != 'assigned_user_id' && header.fieldType != 'currency' && header.fieldType != 'multipicklist'">
                                    {{record[header.name]}}
                                </p>
                                <p class="header-fields"  ng-if="header.fieldType == 'currency'">
                                    {{header.currency}} {{record[header.name]}}
                                </p>
                                <p class="header-fields"  ng-if="header.fieldType == 'reference'">
                                    <i style="font-size: 13px" class="vicon-{{record['reference_module'][header.name] | lowercase}}"></i>
                                    <a href="{{record['reference'][header.name]}}" style="text-decoration: none">{{record[header.name]}}</a>
                                </p>
                                <p class="header-fields"  ng-if="header.fieldType == 'picklist'">
                                    <span ng-if="record['color'][header.name]" style="background-color: {{record['color'][header.name]}}; color: #ffffff; border-radius: 8px; padding: 2px 4px">{{record[header.name]}}</span>
                                    <span ng-if="!record['color'][header.name]">{{record[header.name]}}</span>
                                </p>
                                <p class="header-fields"  ng-if="header.fieldType == 'multipicklist'">
                                    <span ng-repeat="(key,val) in record[header.name]">
                                        <span ng-if="val == '#ffffff' || val == '' || val=='#fff' || val=='#FFFFFF'">{{key}}</span>
                                        <span ng-if="val != '#ffffff' && val != '' && val!='#fff' && val!='#FFFFFF'" style="background-color: {{val}}; color: #ffffff; border-radius: 8px; padding: 2px 4px">{{key}}</span>
                                    </span>
                                </p>
                                <p class="header-fields" ng-if="header.name == 'assigned_user_id' && header.forFilter != true" style="font-weight: bold">
                                    <i style="font-size: 17px; margin: 0;" class="mdi mdi-account-outline"></i>{{record[header.name]}}
                                </p>
                            </div>

                        </div>
                        <md-divider ></md-divider>
                    </md-list-item>
                    <md-list-item class="md-1-line load-more-link" >
                        <div ng-click="loadMoreRecords()" ng-show="moreRecordsExists">
                            Load more
                        </div>
                    </md-list-item>
                </md-list>
                <md-list ng-if="selectRelated && !filterView" class="records-list">
                    <md-list-item class="md-3-line" data-record-id="{{record.id}}" aria-label="row+{{record.id}}" ng-model="showActions" md-swipe-right="showActions=false;$event.stopPropagation();" md-swipe-left="showActions=true;$event.stopPropagation();" ng-click="setRelated(record.id)" ng-repeat="record in records">
                        <div class="md-list-item-text">
                            <h3>
                                <span ng-repeat="label in headers">
                                    <span  ng-repeat="name in nameFields" ng-if="label.name === name">{{record[label.name] + " "}}</span>
                                </span>
                            </h3>
                            <p class="header-fields" ng-repeat="header in headers" ng-if="headerIndex(nameFields,header.name)== -1 && header.forFilter != true">
                                {{record[header.name]}}
                            </p>
                        </div>
                        <md-divider ></md-divider>
                    </md-list-item>
                    <md-list-item class="md-1-line load-more-link"  ng-if="!filterView">
                        <div ng-click="loadMoreRecords()" ng-show="moreRecordsExists">
                            Load more
                        </div>
                    </md-list-item>
                </md-list>
                {/literal}
                {include file="../Vtiger/ListFilter.tpl"}
                {literal}
            </div>
            <div class="no-records-message" ng-if="!records.length">
                <div class="no-records">No Records Found</div>
            </div>
            <div flex></div>
        </div>
    </section>
{/literal}
{include file="../Footer.tpl"}
