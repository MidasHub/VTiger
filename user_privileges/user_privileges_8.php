<?php


//This is the access privilege file
$is_admin=false;

$current_user_roles='H6';

$current_user_parent_role_seq='H1::H2::H3::H6';

$current_user_profiles=array(7,);

$profileGlobalPermission=array('1'=>1,'2'=>1,);

$profileTabsPermission=array('1'=>0,'2'=>0,'4'=>0,'6'=>0,'7'=>0,'8'=>1,'9'=>0,'10'=>1,'13'=>1,'14'=>1,'15'=>1,'16'=>0,'18'=>1,'19'=>1,'20'=>1,'21'=>1,'22'=>1,'23'=>1,'24'=>1,'25'=>1,'26'=>1,'27'=>1,'31'=>1,'34'=>1,'35'=>1,'36'=>1,'38'=>1,'40'=>1,'41'=>1,'42'=>1,'43'=>1,'44'=>1,'45'=>1,'46'=>1,'47'=>1,'48'=>0,'50'=>0,'51'=>0,'52'=>0,'53'=>1,'57'=>0,'58'=>0,'59'=>0,'60'=>0,'61'=>0,'62'=>0,'63'=>0,'64'=>0,'65'=>0,'66'=>0,'67'=>0,'68'=>1,'69'=>0,'70'=>0,'71'=>0,'72'=>0,'74'=>0,'75'=>0,'76'=>0,'77'=>0,'78'=>0,'79'=>0,'80'=>0,'81'=>0,'82'=>0,'83'=>0,'28'=>1,'3'=>0,);

$profileActionPermission=array(2=>array(0=>0,1=>0,2=>0,4=>0,7=>0,5=>0,6=>0,10=>0,),4=>array(0=>0,1=>0,2=>0,4=>0,7=>0,5=>0,6=>0,8=>0,10=>0,),6=>array(0=>0,1=>0,2=>0,4=>0,7=>0,5=>0,6=>0,8=>0,10=>0,),7=>array(0=>0,1=>0,2=>0,4=>0,7=>0,5=>0,6=>0,8=>0,9=>0,10=>0,),8=>array(0=>1,1=>1,2=>1,4=>1,7=>1,6=>0,),9=>array(0=>0,1=>0,2=>0,4=>0,7=>0,5=>0,6=>0,),13=>array(0=>1,1=>1,2=>1,4=>1,7=>1,5=>0,6=>0,8=>0,10=>0,),14=>array(0=>1,1=>1,2=>1,4=>1,7=>1,5=>0,6=>0,10=>0,),16=>array(0=>0,1=>0,2=>0,4=>0,7=>0,5=>0,6=>0,),18=>array(0=>1,1=>1,2=>1,4=>1,7=>1,5=>0,6=>0,10=>0,),19=>array(0=>1,1=>1,2=>1,4=>1,7=>1,5=>0,6=>0,10=>0,),20=>array(0=>1,1=>1,2=>1,4=>1,7=>1,5=>0,6=>0,),21=>array(0=>1,1=>1,2=>1,4=>1,7=>1,5=>0,6=>0,),22=>array(0=>1,1=>1,2=>1,4=>1,7=>1,5=>0,6=>0,),23=>array(0=>1,1=>1,2=>1,4=>1,7=>1,5=>0,6=>0,),25=>array(0=>1,1=>0,2=>0,4=>0,7=>0,6=>1,13=>1,),34=>array(0=>1,1=>1,2=>1,4=>1,7=>1,5=>0,6=>0,8=>0,11=>0,12=>0,),35=>array(0=>1,1=>1,2=>1,4=>1,7=>1,5=>0,6=>0,10=>0,),36=>array(0=>1,1=>1,2=>1,4=>1,7=>1,5=>0,6=>0,10=>0,),43=>array(0=>1,1=>1,2=>1,4=>1,7=>1,5=>0,6=>0,10=>0,),44=>array(0=>1,1=>1,2=>1,4=>1,7=>1,5=>0,6=>0,10=>0,),45=>array(0=>1,1=>1,2=>1,4=>1,7=>1,5=>0,6=>0,10=>0,),51=>array(0=>1,1=>0,2=>0,4=>0,7=>0,6=>0,),53=>array(0=>1,1=>1,2=>1,4=>1,7=>1,5=>0,6=>0,8=>0,10=>0,),66=>array(0=>0,1=>0,2=>0,4=>0,7=>0,5=>0,6=>0,8=>0,10=>0,),68=>array(0=>1,1=>1,2=>1,4=>1,7=>1,5=>0,6=>0,8=>0,10=>0,),72=>array(0=>0,1=>0,2=>0,3=>0,4=>0,7=>0,5=>0,6=>0,8=>0,),74=>array(0=>0,1=>0,2=>0,3=>0,4=>0,7=>0,5=>0,6=>0,8=>0,),83=>array(0=>0,1=>0,2=>0,3=>0,4=>0,7=>0,),);

$current_user_groups=array(3,4,);

$subordinate_roles=array();

$parent_roles=array('H1','H2','H3',);

$subordinate_roles_users=array();

$user_info=array('user_name'=>'thuyvan','is_admin'=>'off','user_password'=>'$2y$10$DKA/pCg0JIMNNsB2Ni/Npef44t1.q0rR06aUtU7zSTQLdqq8tk8Hu','confirm_password'=>'$2y$10$gDxif6d6jtSexRBwsGp0WORFnDt2Hv0KE0O5H.t4lCAG3TgJyQvKG','first_name'=>'CAO THỊ','last_name'=>'THUỲ V&Acirc;N','roleid'=>'H6','email1'=>'thuyvan25121998@gmail.com','status'=>'Active','activity_view'=>'Today','lead_view'=>'Today','hour_format'=>'12','end_hour'=>'','start_hour'=>'09:00','is_owner'=>'','title'=>'','phone_work'=>'','department'=>'','phone_mobile'=>'','reports_to_id'=>'','phone_other'=>'','email2'=>'','phone_fax'=>'','secondaryemail'=>'','phone_home'=>'','date_format'=>'yyyy-mm-dd','signature'=>'','description'=>'','address_street'=>'','address_city'=>'','address_state'=>'','address_postalcode'=>'','address_country'=>'','accesskey'=>'eI012VP1emSGEnl5','time_zone'=>'UTC','currency_id'=>'1','currency_grouping_pattern'=>'123,456,789','currency_decimal_separator'=>'.','currency_grouping_separator'=>',','currency_symbol_placement'=>'$1.0','imagename'=>'','internal_mailer'=>'0','theme'=>'softed','language'=>'vi_vn','reminder_interval'=>'','phone_crm_extension'=>'','no_of_currency_decimals'=>'2','truncate_trailing_zeros'=>'0','dayoftheweek'=>'Sunday','callduration'=>'5','othereventduration'=>'5','calendarsharedtype'=>'public','default_record_view'=>'Summary','leftpanelhide'=>'0','rowheight'=>'medium','defaulteventstatus'=>'','defaultactivitytype'=>'','hidecompletedevents'=>'0','defaultcalendarview'=>'','defaultlandingpage'=>'Home','userlabel'=>'CAO THỊ THUỲ V&Acirc;N','cf_users_round_robin_status'=>'','currency_name'=>'Vietnam, Dong','currency_code'=>'VND','currency_symbol'=>'₫','conv_rate'=>'1.00000','record_id'=>'','record_module'=>'','id'=>'8');
?>