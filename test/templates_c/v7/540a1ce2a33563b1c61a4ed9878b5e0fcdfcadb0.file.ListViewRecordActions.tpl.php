<?php /* Smarty version Smarty-3.1.7, created on 2021-07-16 15:02:37
         compiled from "/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/Settings/VTERoundRobin/ListViewRecordActions.tpl" */ ?>
<?php /*%%SmartyHeaderCode:71053093860f19f8d4bab40-19007747%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '540a1ce2a33563b1c61a4ed9878b5e0fcdfcadb0' => 
    array (
      0 => '/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/Settings/VTERoundRobin/ListViewRecordActions.tpl',
      1 => 1626434955,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '71053093860f19f8d4bab40-19007747',
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
  'unifunc' => 'content_60f19f8d4bde2',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_60f19f8d4bde2')) {function content_60f19f8d4bde2($_smarty_tpl) {?>
<!--LIST VIEW RECORD ACTIONS--><div style="width:80px ;"><a class="deleteRecordButton" style=" opacity: 0; padding: 0 5px;"><i title="<?php echo vtranslate('LBL_DELETE',$_smarty_tpl->tpl_vars['MODULE']->value);?>
" class="fa fa-trash alignMiddle"></i></a><input <?php if ($_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value->get('rr_status')=='Active'){?> checked value="1" <?php }else{ ?> <?php }?> data-on-color="success"  data-id="<?php echo $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value->get('roundrobinid');?>
" type="checkbox" name="rr_status" id="rr_status"></div><?php }} ?>