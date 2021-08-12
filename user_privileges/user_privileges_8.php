<?php


//This is the access privilege file
$is_admin=false;

$current_user_roles='H5';

$current_user_parent_role_seq='H1::H3::H4::H5';

$current_user_profiles=array(4,10,12,);

$profileGlobalPermission=array('1'=>1,'2'=>1,);

$profileTabsPermission=array('1'=>0,'2'=>0,'3'=>0,'4'=>0,'6'=>0,'7'=>0,'8'=>0,'9'=>0,'10'=>0,'13'=>0,'14'=>0,'15'=>0,'16'=>0,'18'=>0,'19'=>0,'20'=>0,'21'=>0,'22'=>0,'23'=>0,'24'=>0,'25'=>0,'26'=>0,'27'=>0,'30'=>0,'31'=>0,'32'=>0,'33'=>0,'34'=>0,'35'=>0,'36'=>0,'37'=>0,'38'=>0,'39'=>0,'40'=>0,'41'=>0,'42'=>0,'43'=>0,'44'=>0,'45'=>0,'46'=>0,'47'=>0,'48'=>0,'49'=>0,'50'=>0,'51'=>0,'52'=>0,'53'=>0,'54'=>0,'55'=>0,'56'=>0,'28'=>0,);

$profileActionPermission=array(2=>array(0=>0,1=>0,2=>1,3=>0,4=>0,7=>0,5=>0,6=>0,10=>0,),4=>array(0=>0,1=>0,2=>1,3=>0,4=>0,7=>0,5=>0,6=>0,8=>0,10=>0,),6=>array(0=>1,1=>1,2=>1,3=>0,4=>0,7=>1,5=>1,6=>1,8=>1,10=>0,),7=>array(0=>0,1=>0,2=>1,3=>0,4=>0,7=>0,5=>0,6=>0,8=>0,9=>0,10=>0,),8=>array(0=>1,1=>1,2=>1,3=>0,4=>0,7=>1,6=>0,),9=>array(0=>0,1=>0,2=>1,3=>0,4=>0,7=>0,5=>0,6=>0,),10=>array(0=>1,1=>1,2=>1,4=>0,),13=>array(0=>1,1=>1,2=>1,3=>0,4=>0,7=>1,5=>0,6=>0,8=>0,10=>0,),14=>array(0=>1,1=>1,2=>1,3=>0,4=>0,7=>1,5=>1,6=>1,10=>0,),15=>array(0=>1,1=>1,2=>1,3=>0,4=>0,7=>1,),16=>array(0=>0,1=>0,2=>1,3=>0,4=>0,7=>0,),18=>array(0=>1,1=>1,2=>1,3=>0,4=>0,7=>1,5=>1,6=>1,10=>0,),19=>array(0=>1,1=>1,2=>1,3=>0,4=>0,7=>1,5=>1,6=>1,10=>1,),20=>array(0=>1,1=>1,2=>1,3=>0,4=>0,7=>1,5=>0,6=>0,),21=>array(0=>1,1=>1,2=>1,3=>0,4=>0,7=>1,5=>0,6=>0,),22=>array(0=>1,1=>1,2=>1,3=>0,4=>0,7=>1,5=>0,6=>0,),23=>array(0=>1,1=>1,2=>1,3=>0,4=>0,7=>1,5=>0,6=>0,),25=>array(0=>1,1=>0,2=>0,3=>0,4=>0,7=>0,6=>0,13=>0,),26=>array(0=>1,1=>1,2=>1,3=>0,4=>0,7=>1,),34=>array(0=>1,1=>1,2=>1,3=>0,4=>0,7=>1,11=>0,12=>0,),35=>array(0=>1,1=>1,2=>1,3=>0,4=>0,7=>1,5=>0,6=>0,10=>0,),36=>array(0=>1,1=>1,2=>1,3=>0,4=>0,7=>1,5=>0,6=>0,10=>0,),38=>array(0=>1,1=>1,2=>1,3=>0,4=>0,7=>1,),42=>array(0=>1,1=>1,2=>1,3=>0,4=>0,7=>1,),43=>array(0=>0,1=>0,2=>0,3=>0,4=>0,7=>0,5=>1,6=>1,10=>1,),44=>array(0=>1,1=>1,2=>1,3=>0,4=>0,7=>1,5=>0,6=>0,10=>0,),45=>array(0=>0,1=>0,2=>0,3=>0,4=>0,7=>0,5=>0,6=>0,10=>0,),47=>array(0=>1,1=>1,2=>1,3=>0,4=>0,7=>1,),);

$current_user_groups=array(21,32,);

$subordinate_roles=array();

$parent_roles=array('H1','H3','H4',);

$subordinate_roles_users=array();

$user_info=array('user_name'=>'bu','is_admin'=>'off','user_password'=>'$2y$10$fTb.zWe9iwj.Y5VM390m..6DmvoGlNtb0iSbNzY5HP7DeDp3kymq2','confirm_password'=>'$2y$10$A/Yqr3OwiTDD1hlE30vvlublUN.NOTqwbWzdVoKN0NeqcLcMFzPsW','first_name'=>'','last_name'=>'bu','roleid'=>'H5','email1'=>'bu@a.com','status'=>'Active','activity_view'=>'Today','lead_view'=>'Today','hour_format'=>'12','end_hour'=>'','start_hour'=>'09:00','is_owner'=>'','title'=>'','phone_work'=>'','department'=>'','phone_mobile'=>'','reports_to_id'=>'','phone_other'=>'','email2'=>'','phone_fax'=>'','secondaryemail'=>'','phone_home'=>'','date_format'=>'dd-mm-yyyy','signature'=>'','description'=>'','address_street'=>'','address_city'=>'','address_state'=>'','address_postalcode'=>'','address_country'=>'','accesskey'=>'kAwT2qJ9RzlOZWGT','time_zone'=>'Asia/Novosibirsk','currency_id'=>'1','currency_grouping_pattern'=>'123,456,789','currency_decimal_separator'=>'.','currency_grouping_separator'=>',','currency_symbol_placement'=>'$1.0','imagename'=>'','internal_mailer'=>'0','theme'=>'softed','language'=>'vn_vn','reminder_interval'=>'','phone_crm_extension'=>'','no_of_currency_decimals'=>'2','truncate_trailing_zeros'=>'0','dayoftheweek'=>'Sunday','callduration'=>'5','othereventduration'=>'5','calendarsharedtype'=>'public','default_record_view'=>'Summary','leftpanelhide'=>'0','rowheight'=>'medium','defaulteventstatus'=>'','defaultactivitytype'=>'','hidecompletedevents'=>'0','defaultcalendarview'=>'','defaultlandingpage'=>'Home','userlabel'=>'bu','cf_users_round_robin_status'=>'0','currency_name'=>'Vietnam, Dong','currency_code'=>'VND','currency_symbol'=>'₫','conv_rate'=>'1.00000','record_id'=>'','record_module'=>'','id'=>'8');
?>