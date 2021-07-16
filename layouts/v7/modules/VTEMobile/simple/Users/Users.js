/*************************************************************************************
 ** The contents of this file are subject to the vtiger CRM Public License Version 1.1
 * ("License"); You may not use this file except in compliance with the License
 * The Original Code is: vtiger CRM Open Source
 * The Initial Developer of the Original Code is vtiger.
 * Portions created by vtiger are Copyright (C) vtiger.
 * All Rights Reserved.
 *
 *************************************************************************************/
mobileapp.controller('UsersLoginController', function($scope, $api, $mdToast) {

	$scope.auth = {};

	$scope.login = function(){
		$api('login', $scope.auth, function(e, r){
			if (e) {
				// Login failed
                var message = 'Invalid credentials';
                var toast = $mdToast.simple().content(message).position($scope.getToastPosition()).hideDelay(1000).theme('error-toast');
                $mdToast.show(toast);
			} else {
				window.location.reload();
			}
		});
	};
	$scope.googleAuth = {};
	$scope.checkGoogleAuthentication = function(){
		$api('checkGoogleAuthentication', $scope.googleAuth, function(e, r){
			console.log(r);

			if (r) {
				$(".modal-backdrop").hide();
				$(".modal").hide();
				var defaultOptions = {
					'icon': 'fa fa-check-circle',
					'title': ''
				};
				options = jQuery.extend(defaultOptions, {'message': r.message});
				$.notify(r.message, "success");
				setTimeout(function () {
					window.location.reload();
				}, 3000);
			}else{
				$('.codeinvalid').show();
			}


		});
	};
    $scope.getToastPosition = function () {
        return Object.keys($scope.toastPosition)
            .filter(function (pos) {
                return $scope.toastPosition[pos];
            }).join('');
    };
    $scope.toastPosition = {
        bottom: true,
        top: false,
        left: false,
        right: false
    };
});