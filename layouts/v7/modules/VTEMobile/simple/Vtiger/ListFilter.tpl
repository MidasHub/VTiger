{literal}
    <md-list ng-if="filterView" class="records-list filter-list">
        <md-list-item class="md-3-line" ng-repeat="header in headers" ng-if="header.fieldType =='picklist' || (header.fieldType == 'owner' && header.forFilter)">
            <div class="md-list-item-text" style="padding: 0;">
                <md-input-container style="padding: 0" ng-hide="(header.name == 'activitytype' || header.name == 'eventstatus') && module =='Calendar'">
                    <div class="input-group-addon">
                        <label style="width: 100%;float: left;padding: 10px 0;" ng-if="header.name == 'taskstatus'">Task Status</label>
                        <label style="width: 100%;float: left;padding: 10px 0;" ng-if="header.name == 'eventstatus'">Event Status</label>
                        <label style="width: 100%;float: left;padding: 10px 0;" ng-if="header.name != 'taskstatus' && header.name != 'eventstatus'">{{header.label}}</label>
                        <md-select style="margin: 0;width: 100%;float: left;" name="{{header.name}}" ng-if="header.fieldType =='picklist'" ng-model="filterData[header.name]">
                            <md-option ng-value="">Select an Option</md-option>
                            <md-option ng-value="opt.value" ng-repeat="opt in header.picklistValue">{{opt.label}}</md-option>
                        </md-select>
                        <md-select style="margin: 0;width: 100%;float: left;" name="{{header.name}}" ng-if="header.fieldType == 'owner' && header.forFilter == true" ng-model="filterData[header.name]" aria-label="{{header.label}}">
                            <md-option ng-value="">Select an Option</md-option>
                            <md-optgroup label="Users" aria-label="Users">
                                <md-option ng-value="user" ng-repeat="(user_id, user) in header.picklistValue.users">{{user}}</md-option>
                            </md-optgroup>
                            <md-optgroup label="Groups" aria-label="Groups">
                                <md-option ng-value="group" ng-repeat="(group_id, group) in header.picklistValue.groups">{{group}}</md-option>
                            </md-optgroup>
                        </md-select>
                    </div>
                </md-input-container>
            </div>
            <md-divider ></md-divider>
        </md-list-item>
        <md-list-item class="md-3-line">
            <div class="md-list-item-text filter-date-name" style="padding: 20px 0 0 0;text-align: center">
                <md-button data-name="createdtime" ng-class="{'active' : filterData['date-name'] == 'createdtime'}" ng-click="changeDateFilterName('createdtime');" type="button" style="padding: 0 6px" aria-label="notifications">
                    Create Time
                </md-button>
                <md-button data-name="modifiedtime" ng-class="{'active' : filterData['date-name'] == 'modifiedtime'}" ng-click="changeDateFilterName('modifiedtime');" type="button" style="padding: 0 6px;margin-left: -4px" aria-label="notifications">
                    Modified Time
                </md-button>
            </div>
            <md-divider ></md-divider>
        </md-list-item>
        <md-list-item class="md-3-line">
            <div class="md-list-item-text filter-date-value" style="padding: 0;text-align: center">
                <md-button data-value="today" ng-class="{'active' : filterData['date-value'] == 'today'}" ng-click="changeDateFilterValue('today');" type="button" style="width: 30%;margin-left: -6px">
                    Today
                </md-button>
                <md-button data-value="1" ng-class="{'active' : filterData['date-value'] == '1'}" ng-click="changeDateFilterValue('1');" type="button" style="width: 30%;margin-left: -6px">
                    24 hours
                </md-button>
                <md-button data-value="3" ng-class="{'active' : filterData['date-value'] == '3'}" ng-click="changeDateFilterValue('3');" type="button" style="width: 30%;margin-left: -6px">
                    3 days
                </md-button>
                <md-button data-value="7" ng-class="{'active' : filterData['date-value'] == '7'}" ng-click="changeDateFilterValue('7');" type="button" style="width: 30%;margin-left: -6px">
                    7 days
                </md-button>
                <md-button data-value="30" ng-class="{'active' : filterData['date-value'] == '30'}" ng-click="changeDateFilterValue('30');" type="button" style="width: 30%;margin-left: -6px">
                    30 days
                </md-button>
                <md-button data-value="All" ng-class="{'active' : filterData['date-value'] == 'All'}" ng-click="changeDateFilterValue('All');" type="button" style="width: 30%;margin-left: -6px">
                    All
                </md-button>
            </div>
            <md-divider ></md-divider>
        </md-list-item>
        <md-list-item style="margin-top: 20px;" class="md-3-line" >
            <div class="md-list-item-text" style="padding: 0;text-align: center;">
                <md-button ng-click="saveFilter();" class="md-raised" type="button" style="width: 30%;font-weight: bold">
                    Search
                </md-button>
            </div>
            <md-divider ></md-divider>
        </md-list-item>
    </md-list>
{/literal}