<?php /* Smarty version Smarty-3.1.7, created on 2021-07-16 23:50:28
         compiled from "/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/MaskedInput/MaskedInputs.tpl" */ ?>
<?php /*%%SmartyHeaderCode:155847961260f21b44240247-99640670%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '2b769bbaac284bc8b471bd52ed1e25f4cc8c36ff' => 
    array (
      0 => '/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/MaskedInput/MaskedInputs.tpl',
      1 => 1626475548,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '155847961260f21b44240247-99640670',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'CURRENT_USER_MODEL' => 0,
    'MASKEDINPUTS' => 0,
    'ID' => 0,
    'WIDTHTYPE' => 0,
    'MASKEDINPUT' => 0,
    'MASKEDINPUTS_COUNT' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_60f21b4424be9',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_60f21b4424be9')) {function content_60f21b4424be9($_smarty_tpl) {?>
<?php $_smarty_tpl->tpl_vars['WIDTHTYPE'] = new Smarty_variable($_smarty_tpl->tpl_vars['CURRENT_USER_MODEL']->value->get('rowheight'), null, 0);?><?php $_smarty_tpl->tpl_vars['MASKEDINPUTS_COUNT'] = new Smarty_variable(count($_smarty_tpl->tpl_vars['MASKEDINPUTS']->value), null, 0);?><table class="table table-bordered listViewEntriesTable"><thead><tr><th colspan="5"><?php echo vtranslate('MaskedInputs','MaskedInput');?>
</th></tr></thead><tbody><tr class="listViewHeaders"><td nowrap class="medium" style="font-weight: bold;"><?php echo vtranslate('MaskedInput','MaskedInput');?>
</td><td nowrap colspan="2" class="medium" style="font-weight: bold;"><?php echo vtranslate('LBL_ALERT','MaskedInput');?>
</td></tr></tbody><?php  $_smarty_tpl->tpl_vars['MASKEDINPUT'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['MASKEDINPUT']->_loop = false;
 $_smarty_tpl->tpl_vars['ID'] = new Smarty_Variable;
 $_from = $_smarty_tpl->tpl_vars['MASKEDINPUTS']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
 $_smarty_tpl->tpl_vars['smarty']->value['foreach']['maskedinput_view']['index']=-1;
foreach ($_from as $_smarty_tpl->tpl_vars['MASKEDINPUT']->key => $_smarty_tpl->tpl_vars['MASKEDINPUT']->value){
$_smarty_tpl->tpl_vars['MASKEDINPUT']->_loop = true;
 $_smarty_tpl->tpl_vars['ID']->value = $_smarty_tpl->tpl_vars['MASKEDINPUT']->key;
 $_smarty_tpl->tpl_vars['smarty']->value['foreach']['maskedinput_view']['index']++;
?><tr class="listViewEntries" data-id='<?php echo $_smarty_tpl->tpl_vars['ID']->value;?>
' data-type="MaskedInput" id="MaskedInput_listView_row_<?php echo $_smarty_tpl->getVariable('smarty')->value['foreach']['maskedinput_view']['index']+1;?>
"><td class="listViewEntryValue <?php echo $_smarty_tpl->tpl_vars['WIDTHTYPE']->value;?>
" nowrap><?php echo $_smarty_tpl->tpl_vars['MASKEDINPUT']->value['masked_input'];?>
</td><td class="listViewEntryValue <?php echo $_smarty_tpl->tpl_vars['WIDTHTYPE']->value;?>
" nowrap><span style="overflow: hidden;"><?php echo $_smarty_tpl->tpl_vars['MASKEDINPUT']->value['alert_text'];?>
</span></td><td nowrap class="<?php echo $_smarty_tpl->tpl_vars['WIDTHTYPE']->value;?>
"><div class="actions pull-right"><span class="actionImages"><a href='javascript: void(0);' class="editRecordButton" data-url="index.php?module=MaskedInput&view=EditAjax&mode=getCustomInputForm&record=<?php echo $_smarty_tpl->tpl_vars['ID']->value;?>
"><i title="<?php echo vtranslate('LBL_EDIT');?>
" class="glyphicon glyphicon-pencil alignMiddle"></i></a>&nbsp;<a class="deleteRecordButton"><i title="<?php echo vtranslate('LBL_DELETE');?>
" class="glyphicon glyphicon-trash alignMiddle"></i></a></span></div></td></tr><?php } ?></table><!--added this div for Temporarily --><?php if ($_smarty_tpl->tpl_vars['MASKEDINPUTS_COUNT']->value=='0'){?><table class="table table-bordered listViewEntriesTable"><tbody><tr><td><?php echo vtranslate('LBL_NO');?>
 <?php echo vtranslate('LBL_FIELD','MaskedInput');?>
 <?php echo vtranslate('LBL_FOUND');?>
.</td></tr></tbody></table><?php }?><br/>
<?php }} ?>