{literal}
    <header md-page-header fixed-top>
        <md-toolbar>
            <div class="md-toolbar-tools actionbar">
                <md-button ng-click="navigationToggle()" class="md-icon-button" aria-label="side-menu-open">
                    <i class="mdi mdi-menu actionbar-icon"></i>
                </md-button>
                <md-button ng-click="gobackHistory()" class="md-icon-button" aria-label="side-menu-open" ng-if="parentRecord">
                    <i class="mdi mdi-arrow-left actionbar-icon"></i>
                </md-button>
                <h2 flex class="toolbar-title">{{pageTitle}}</h2>

                <i class="mdi mdi-magnify" ng-click="showMe();" ng-hide="hide"></i>

                <input ng-show="show" class="keyword-input" style="font-size: 15px; width: 175px; height: 25px; border: 0;outline: none;margin:0 0 5px 5px;border-radius: 3px; padding: 3px 8px;" type="text" ng-model="searchParam" ng-keyup="searchModulesKeyup(searchParam)" placeholder="Search" value="" >

            </div>
        </md-toolbar>
    </header>
{/literal} 