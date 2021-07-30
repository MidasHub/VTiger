<?php /* Smarty version Smarty-3.1.7, created on 2021-07-29 14:47:35
         compiled from "/var/www/html/vtigercrm/includes/runtime/../../layouts/v7/modules/Settings/VTERoundRobin/ListViewRecordActions.tpl" */ ?>
<?php /*%%SmartyHeaderCode:271388856102bf875d0898-36905455%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '80123b3350bec14a216b19891786c750e8c01e6d' => 
    array (
      0 => '/var/www/html/vtigercrm/includes/runtime/../../layouts/v7/modules/Settings/VTERoundRobin/ListViewRecordActions.tpl',
      1 => 1627568753,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '271388856102bf875d0898-36905455',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'MODULE' => 0,
    'LISTVIEW_ENTRY' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_6102bf875e969',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_6102bf875e969')) {function content_6102bf875e969($_smarty_tpl) {?>
<!--LIST VIEW RECORD ACTIONS--><div style="width:80px ;"><a class="deleteRecordButton" style=" opacity: 0; padding: 0 5px;"><i title="<?php echo vtranslate('LBL_DELETE',$_smarty_tpl->tpl_vars['MODULE']->value);?>
" class="fa fa-trash alignMiddle"></i></a><input <?php if ($_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value->get('rr_status')=='Active'){?> checked value="1" <?php }else{ ?> <?php }?> data-on-color="success"  data-id="<?php echo $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value->get('roundrobinid');?>
" type="checkbox" name="rr_status" id="rr_status"></div><?php }} ?>