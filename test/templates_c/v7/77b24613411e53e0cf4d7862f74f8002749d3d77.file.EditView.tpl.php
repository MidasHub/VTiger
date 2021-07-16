<?php /* Smarty version Smarty-3.1.7, created on 2021-07-16 15:08:04
         compiled from "/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/Settings/VTERoundRobin/EditView.tpl" */ ?>
<?php /*%%SmartyHeaderCode:42377289660f1a0d419a7f6-10823496%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '77b24613411e53e0cf4d7862f74f8002749d3d77' => 
    array (
      0 => '/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/Settings/VTERoundRobin/EditView.tpl',
      1 => 1626434955,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '42377289660f1a0d419a7f6-10823496',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'MODULE' => 0,
    'RECORD_DATA' => 0,
    'QUALIFIED_MODULE' => 0,
    'ALL_MODULES' => 0,
    'MODULE_VALUES' => 0,
    'FIELDS_PICKLIST_MODULE' => 0,
    'FIELD_NAME' => 0,
    'FIELD_LABEL' => 0,
    'FIELDS_PICKLIST_MODULE_VALUES' => 0,
    'FIELD_VALUE' => 0,
    'ALL_USERS' => 0,
    'USER_MODEL' => 0,
    'ROUNDROBIN_ASSIGMENTS' => 0,
    'ROUNDROBIN_ASSIGMENT' => 0,
    'CURRENT_USER' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_60f1a0d41d8cd',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_60f1a0d41d8cd')) {function content_60f1a0d41d8cd($_smarty_tpl) {?>
<style>.tooltip-inner {max-width: 350px;/* If max-width does not work, try using width instead */width: 350px;}</style><div class="editViewPageDiv"><div class="col-sm-12 col-xs-12" id="EditView"><form id="editView" action="index.php" method="post" name="EditVTERoundRobin" class="form-horizontal"><input type="hidden" name="module" id="module" value="<?php echo $_smarty_tpl->tpl_vars['MODULE']->value;?>
"><input type="hidden" name="action" value="SaveVTERoundRobin" /><input type="hidden" name="parent" value="Settings" /><input type="hidden" name="record" id="record" value="<?php echo $_smarty_tpl->tpl_vars['RECORD_DATA']->value['record'];?>
"><div class="editViewHeader"><div class="row"><div class="col-lg-12 col-md-12 col-lg-pull-0"><h4><?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value;?>
<?php $_tmp1=ob_get_clean();?><?php echo vtranslate('Round Robin Policy',$_tmp1);?>
</h4></div></div></div><hr style="margin-top: 0px !important;"><div class="editViewBody"><div class="editViewContents"><div class="col-sm-12 col-xs-12"><div class="col-sm-7 col-xs-7 form-horizontal"><div class="form-group"><label for="rr_name" class="setting-field col-sm-5"><span><?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value;?>
<?php $_tmp2=ob_get_clean();?><?php echo vtranslate('LBL_NAME',$_tmp2);?>
</span><span class="redColor">*</span></label><div class="setting-field col-sm-7"><input class="form-control" id="rr_name" name="rr_name" value="<?php echo $_smarty_tpl->tpl_vars['RECORD_DATA']->value['rr_name'];?>
" data-rule-required="true" aria-required="true" aria-invalid="true"></div></div><div class="form-group"><label for="rr_module" class="setting-field col-sm-5"><span><?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value;?>
<?php $_tmp3=ob_get_clean();?><?php echo vtranslate('LBL_MODULE',$_tmp3);?>
</span><span class="redColor">*</span></label><div class="setting-field col-sm-7"><select class="inputElement select2" id="rr_module" name="rr_module" data-rule-required="true"><option value=""><?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value;?>
<?php $_tmp4=ob_get_clean();?><?php echo vtranslate('LBL_SELECT_OPTION',$_tmp4);?>
</option><?php  $_smarty_tpl->tpl_vars['MODULE_VALUES'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['MODULE_VALUES']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['ALL_MODULES']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['MODULE_VALUES']->key => $_smarty_tpl->tpl_vars['MODULE_VALUES']->value){
$_smarty_tpl->tpl_vars['MODULE_VALUES']->_loop = true;
?><option value="<?php echo $_smarty_tpl->tpl_vars['MODULE_VALUES']->value->name;?>
" <?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['RECORD_DATA']->value['rr_module'];?>
<?php $_tmp5=ob_get_clean();?><?php if ($_tmp5==$_smarty_tpl->tpl_vars['MODULE_VALUES']->value->name){?> selected="selected"<?php }?>><?php echo vtranslate($_smarty_tpl->tpl_vars['MODULE_VALUES']->value->label,$_smarty_tpl->tpl_vars['RECORD_DATA']->value['rr_module']);?>
</option><?php } ?></select></div></div><div class="form-group"><label for="rr_status_field" class="setting-field col-sm-5"><span><?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value;?>
<?php $_tmp6=ob_get_clean();?><?php echo vtranslate('LBL_STATUS_FIELD',$_tmp6);?>
</span><span class="redColor">*</span> <i class="cursorPointer fa fa-info-circle" data-toggle="tooltip" title="<?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value;?>
<?php $_tmp7=ob_get_clean();?><?php echo vtranslate('LBL_STATUS_TOOLTIPS',$_tmp7);?>
"></i></label><div class="setting-field col-sm-7"><select class="inputElement select2" id="rr_status_field" name="rr_status_field" data-rule-required="true"><option value=""><?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value;?>
<?php $_tmp8=ob_get_clean();?><?php echo vtranslate('LBL_SELECT_OPTION',$_tmp8);?>
</option><?php  $_smarty_tpl->tpl_vars['FIELD_LABEL'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['FIELD_LABEL']->_loop = false;
 $_smarty_tpl->tpl_vars['FIELD_NAME'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['FIELDS_PICKLIST_MODULE']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['FIELD_LABEL']->key => $_smarty_tpl->tpl_vars['FIELD_LABEL']->value){
$_smarty_tpl->tpl_vars['FIELD_LABEL']->_loop = true;
 $_smarty_tpl->tpl_vars['FIELD_NAME']->value = $_smarty_tpl->tpl_vars['FIELD_LABEL']->key;
?><option value="<?php echo $_smarty_tpl->tpl_vars['FIELD_NAME']->value;?>
" <?php if ($_smarty_tpl->tpl_vars['RECORD_DATA']->value['rr_status_field']==$_smarty_tpl->tpl_vars['FIELD_NAME']->value){?>selected="selected"<?php }?>><?php echo $_smarty_tpl->tpl_vars['FIELD_LABEL']->value;?>
</option><?php } ?></select></div></div><div class="form-group"><label for="rr_unassigned_status" class="setting-field col-sm-5"><span style="margin-left: 30px;"><?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value;?>
<?php $_tmp9=ob_get_clean();?><?php echo vtranslate('LBL_UNASSIGNED_STATUS',$_tmp9);?>
</span><span class="redColor">*</span> <i class="cursorPointer fa fa-info-circle" data-toggle="tooltip" title="<?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value;?>
<?php $_tmp10=ob_get_clean();?><?php echo vtranslate('LBL_UNASSIGNED_TOOLTIPS',$_tmp10);?>
"></i></label><div class="setting-field col-sm-7"><select class="inputElement select2" id="rr_unassigned_status" name="rr_unassigned_status" data-rule-required="true"><option value=""><?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value;?>
<?php $_tmp11=ob_get_clean();?><?php echo vtranslate('LBL_SELECT_OPTION',$_tmp11);?>
</option><?php  $_smarty_tpl->tpl_vars['FIELD_VALUE_LABEL'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['FIELD_VALUE_LABEL']->_loop = false;
 $_smarty_tpl->tpl_vars['FIELD_VALUE'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['FIELDS_PICKLIST_MODULE_VALUES']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['FIELD_VALUE_LABEL']->key => $_smarty_tpl->tpl_vars['FIELD_VALUE_LABEL']->value){
$_smarty_tpl->tpl_vars['FIELD_VALUE_LABEL']->_loop = true;
 $_smarty_tpl->tpl_vars['FIELD_VALUE']->value = $_smarty_tpl->tpl_vars['FIELD_VALUE_LABEL']->key;
?><option value="<?php echo $_smarty_tpl->tpl_vars['FIELD_VALUE']->value;?>
" <?php if ($_smarty_tpl->tpl_vars['RECORD_DATA']->value['rr_unassigned_status']==$_smarty_tpl->tpl_vars['FIELD_VALUE']->value){?>selected="selected"<?php }?>><?php echo $_smarty_tpl->tpl_vars['FIELD_VALUE']->value;?>
</option><?php } ?></select></div></div><div class="form-group"><label for="rr_assigned_status" class="setting-field col-sm-5"><span style="margin-left: 30px;"><?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value;?>
<?php $_tmp12=ob_get_clean();?><?php echo vtranslate('LBL_ASSIGNED_STATUS',$_tmp12);?>
</span><span class="redColor">*</span> <i class="cursorPointer fa fa-info-circle" data-toggle="tooltip" title="<?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value;?>
<?php $_tmp13=ob_get_clean();?><?php echo vtranslate('LBL_ASSIGNED_TOOLTIPS',$_tmp13);?>
"></i></label><div class="setting-field col-sm-7"><select class="inputElement select2" id="rr_assigned_status" name="rr_assigned_status" data-rule-required="true"><option value=""><?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value;?>
<?php $_tmp14=ob_get_clean();?><?php echo vtranslate('LBL_SELECT_OPTION',$_tmp14);?>
</option><?php  $_smarty_tpl->tpl_vars['FIELD_VALUE_LABEL'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['FIELD_VALUE_LABEL']->_loop = false;
 $_smarty_tpl->tpl_vars['FIELD_VALUE'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['FIELDS_PICKLIST_MODULE_VALUES']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['FIELD_VALUE_LABEL']->key => $_smarty_tpl->tpl_vars['FIELD_VALUE_LABEL']->value){
$_smarty_tpl->tpl_vars['FIELD_VALUE_LABEL']->_loop = true;
 $_smarty_tpl->tpl_vars['FIELD_VALUE']->value = $_smarty_tpl->tpl_vars['FIELD_VALUE_LABEL']->key;
?><option value="<?php echo $_smarty_tpl->tpl_vars['FIELD_VALUE']->value;?>
" <?php if ($_smarty_tpl->tpl_vars['RECORD_DATA']->value['rr_assigned_status']==$_smarty_tpl->tpl_vars['FIELD_VALUE']->value){?>selected="selected"<?php }?>><?php echo $_smarty_tpl->tpl_vars['FIELD_VALUE']->value;?>
</option><?php } ?></select></div></div><div class="form-group"><label for="rr_online_users_only" class="setting-field col-sm-5"><span><?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value;?>
<?php $_tmp15=ob_get_clean();?><?php echo vtranslate('LBL_ONLINE_USERS_ONLY',$_tmp15);?>
</span> <i class="cursorPointer fa fa-info-circle" data-toggle="tooltip" title="<?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value;?>
<?php $_tmp16=ob_get_clean();?><?php echo vtranslate('LBL_ONLINE_USERS_ONLY_TOOLTIPS',$_tmp16);?>
"></i></label><div class="setting-field col-sm-7"><input type="checkbox" <?php if ($_smarty_tpl->tpl_vars['RECORD_DATA']->value['rr_online_users_only']==1){?>checked value="on"<?php }?> class="inputElement switch-input" data-on-color="success" id="rr_online_users_only" name="rr_online_users_only"></div></div><div class="form-group"><label for="rr_assigment_type" class="setting-field col-sm-5"><span><?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value;?>
<?php $_tmp17=ob_get_clean();?><?php echo vtranslate('LBL_ASSIGMENT_TYPE',$_tmp17);?>
<span class="redColor">*</span> <i class="cursorPointer fa fa-info-circle" data-toggle="tooltip" title="<?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value;?>
<?php $_tmp18=ob_get_clean();?><?php echo vtranslate('LBL_ASSIGMENT_TYPE_TOOLTIPS',$_tmp18);?>
"></i></span></label><div class="setting-field col-sm-7"><select class="inputElement select2" id="rr_assigment_type" name="rr_assigment_type" data-rule-required="true"><option value="standard" <?php if ($_smarty_tpl->tpl_vars['RECORD_DATA']->value['rr_assigment_type']=='standard'){?>selected="selected"<?php }?>><?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value;?>
<?php $_tmp19=ob_get_clean();?><?php echo vtranslate('standard',$_tmp19);?>
</option><option value="based_on_efficiency" <?php if ($_smarty_tpl->tpl_vars['RECORD_DATA']->value['rr_assigment_type']=='based_on_efficiency'){?>selected="selected"<?php }?>><?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value;?>
<?php $_tmp20=ob_get_clean();?><?php echo vtranslate('based_on_efficiency',$_tmp20);?>
</option></select></div></div><div class="form-group"><label for="rr_assign_preferred_user" class="setting-field col-sm-5"><span><?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value;?>
<?php $_tmp21=ob_get_clean();?><?php echo vtranslate('Assign Preferred User',$_tmp21);?>
</span> <i class="cursorPointer fa fa-info-circle" data-toggle="tooltip" title="<?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value;?>
<?php $_tmp22=ob_get_clean();?><?php echo vtranslate('LBL_ASSIGN_PREFER_USER_TOOLTIPS',$_tmp22);?>
"></i></label><div class="setting-field col-sm-7 rr_assign_preferred_user"><input <?php if ($_smarty_tpl->tpl_vars['RECORD_DATA']->value['rr_module']!='HelpDesk'){?>disabled<?php }?> type="checkbox" <?php if ($_smarty_tpl->tpl_vars['RECORD_DATA']->value['rr_assign_preferred_user']==1&&$_smarty_tpl->tpl_vars['RECORD_DATA']->value['rr_module']=='HelpDesk'){?>checked value="on"<?php }?> class="inputElement switch-input" data-on-color="success" id="rr_assign_preferred_user" name="rr_assign_preferred_user"></div></div><div class="form-group"><label for="rr_members" class="setting-field col-sm-5"><span><?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value;?>
<?php $_tmp23=ob_get_clean();?><?php echo vtranslate('LBL_MEMBERS',$_tmp23);?>
</span><span class="redColor">*</span>  <i class="cursorPointer fa fa-info-circle" data-toggle="tooltip" title="<?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value;?>
<?php $_tmp24=ob_get_clean();?><?php echo vtranslate('LBL_MEMBERS_TOOLTIPS',$_tmp24);?>
"></i></label><div class="setting-field col-sm-7"><select class="inputElement select2" id="rr_members"name="rr_members[]" multiple="multiple" data-rule-required="true"><?php  $_smarty_tpl->tpl_vars['USER_MODEL'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['USER_MODEL']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['ALL_USERS']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['USER_MODEL']->key => $_smarty_tpl->tpl_vars['USER_MODEL']->value){
$_smarty_tpl->tpl_vars['USER_MODEL']->_loop = true;
?><option value="<?php echo $_smarty_tpl->tpl_vars['USER_MODEL']->value->getId();?>
" <?php if (!empty($_smarty_tpl->tpl_vars['RECORD_DATA']->value['record'])&&in_array($_smarty_tpl->tpl_vars['USER_MODEL']->value->getId(),$_smarty_tpl->tpl_vars['RECORD_DATA']->value['rr_members'])){?>selected="" <?php }?>><?php echo $_smarty_tpl->tpl_vars['USER_MODEL']->value->get('first_name');?>
 <?php echo $_smarty_tpl->tpl_vars['USER_MODEL']->value->get('last_name');?>
</option><?php } ?></select></div></div><div class="form-group"><label for="rr_status" class="setting-field col-sm-5"><span><?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value;?>
<?php $_tmp25=ob_get_clean();?><?php echo vtranslate('LBL_STATUS',$_tmp25);?>
</span><span class="redColor">*</span></label><div class="setting-field col-sm-7"><select class="inputElement select2" id="rr_status" name="rr_status" data-rule-required="true"><option value="Active" <?php if ($_smarty_tpl->tpl_vars['RECORD_DATA']->value['rr_status']=='Active'){?>selected="selected"<?php }?>><?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value;?>
<?php $_tmp26=ob_get_clean();?><?php echo vtranslate('LBL_ACTIVE',$_tmp26);?>
</option><option value="Inactive" <?php if ($_smarty_tpl->tpl_vars['RECORD_DATA']->value['rr_status']=='Inactive'){?>selected="selected"<?php }?>><?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value;?>
<?php $_tmp27=ob_get_clean();?><?php echo vtranslate('LBL_INACTIVE',$_tmp27);?>
</option></select></div></div></div><div class="col-sm-5 col-xs-5 sla-policies-info"><div class="label-info"><h5><span class="glyphicon glyphicon-info-sign"></span> Info</h5></div><span>Here's how it works: Let's assume that you need tickets automatically assigned to your support users. First, select Tickets as your module. Next, status field has to be selected. It is used to identify any unassigned tickets. In our example, say we selected Status as "Ticket Status", Unassigned Status Value as "Open" and Assigned Status value as "In-Progress". This means, that if there's a ticket with status "Open" - it will get picked up by the round robin and assigned to one of the members on the policy. In addition, that ticket status will be updated to "In-Progress". Essentially, round robin finds all tickets with status "Open" (unassigned status) and assigns them to members + updates ticket status to "In-Progress" (assigned status). </br></br>In addition, a field "Round Robin Policy" to tickets. This field is not editable and only visible on detail view. It will identify what policy was used to assign the record. </br></br>*NOTE: Records are assigned when the cronjob runs. You have to make sure cronjob is setup and enabled.</span></div></div><?php if ($_smarty_tpl->tpl_vars['RECORD_DATA']->value['record']){?><div class="col-sm-12 col-xs-12 conditionsContainer" style="margin-bottom: 70px;"><hr/><div class="col-sm-12 col-xs-12 form-horizontal" style="margin-left: 25px"><table class="sla-policy-listview-table table listview-table"><thead><tr class="listViewContentHeader"><th nowrap><?php echo vtranslate('Date time',$_smarty_tpl->tpl_vars['MODULE']->value);?>
</th><th nowrap><?php echo vtranslate('User',$_smarty_tpl->tpl_vars['MODULE']->value);?>
</th><th nowrap><?php echo vtranslate('Record',$_smarty_tpl->tpl_vars['MODULE']->value);?>
</th><th><?php $_smarty_tpl->tpl_vars['RECORD_COUNT'] = new Smarty_variable(count($_smarty_tpl->tpl_vars['ROUNDROBIN_ASSIGMENTS']->value), null, 0);?><?php echo $_smarty_tpl->getSubTemplate (vtemplate_path("EditAssigmentPagination.tpl",$_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value), $_smarty_tpl->cache_id, $_smarty_tpl->compile_id, null, null, array('SHOWPAGEJUMP'=>false), 0);?>
</th></tr></thead><tbody><?php  $_smarty_tpl->tpl_vars['ROUNDROBIN_ASSIGMENT'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['ROUNDROBIN_ASSIGMENT']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['ROUNDROBIN_ASSIGMENTS']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['ROUNDROBIN_ASSIGMENT']->key => $_smarty_tpl->tpl_vars['ROUNDROBIN_ASSIGMENT']->value){
$_smarty_tpl->tpl_vars['ROUNDROBIN_ASSIGMENT']->_loop = true;
?><tr><td><?php echo Vtiger_Util_Helper::convertDateTimeIntoUsersDisplayFormat($_smarty_tpl->tpl_vars['ROUNDROBIN_ASSIGMENT']->value['datetime'],$_smarty_tpl->tpl_vars['CURRENT_USER']->value);?>
</td><td><?php echo $_smarty_tpl->tpl_vars['ROUNDROBIN_ASSIGMENT']->value['user']->get('first_name');?>
 <?php echo $_smarty_tpl->tpl_vars['ROUNDROBIN_ASSIGMENT']->value['user']->get('last_name');?>
</td><td colspan="2"><a target="_blank" href="<?php echo $_smarty_tpl->tpl_vars['ROUNDROBIN_ASSIGMENT']->value['record']->getDetailViewUrl();?>
"><?php echo $_smarty_tpl->tpl_vars['ROUNDROBIN_ASSIGMENT']->value['record']->get('label');?>
</a></td></tr><?php } ?></tbody></table></div></div><?php }?></div></div><div class="modal-overlay-footer clearfix"><div class="row clearfix"><div class="textAlignCenter col-lg-12 col-md-12 col-sm-12 "><button type="submit" class="btn btn-success buttonSave">Save</button>&nbsp;&nbsp;<a class="cancelLink" href="javascript:history.back()" type="reset"><?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['QUALIFIED_MODULE']->value;?>
<?php $_tmp28=ob_get_clean();?><?php echo vtranslate('LBL_CANCEL',$_tmp28);?>
</a></div></div></div></form></div></div><script>$(document).ready(function(){$('[data-toggle="tooltip"]').tooltip();});</script><?php }} ?>