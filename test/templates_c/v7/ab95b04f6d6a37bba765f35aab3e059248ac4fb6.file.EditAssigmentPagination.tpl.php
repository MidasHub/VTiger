<?php /* Smarty version Smarty-3.1.7, created on 2021-07-16 15:08:04
         compiled from "/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/Settings/VTERoundRobin/EditAssigmentPagination.tpl" */ ?>
<?php /*%%SmartyHeaderCode:23065978060f1a0d41de772-77925375%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    'ab95b04f6d6a37bba765f35aab3e059248ac4fb6' => 
    array (
      0 => '/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/Settings/VTERoundRobin/EditAssigmentPagination.tpl',
      1 => 1626434955,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '23065978060f1a0d41de772-77925375',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'CLASS_VIEW_ACTION' => 0,
    'RECORD_DATA' => 0,
    'PAGE_NUMBER' => 0,
    'PAGING_MODEL' => 0,
    'SHOWPAGEJUMP' => 0,
    'MODULE' => 0,
    'CLASS_VIEW_BASIC_ACTION' => 0,
    'CLASS_VIEW_PAGING_INPUT' => 0,
    'CLASS_VIEW_PAGING_INPUT_SUBMIT' => 0,
    'RECORD_COUNT' => 0,
    'ROUNDROBIN_ASSIGMENTS_COUNT' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_60f1a0d41ef3a',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_60f1a0d41ef3a')) {function content_60f1a0d41ef3a($_smarty_tpl) {?>
<?php if (!$_smarty_tpl->tpl_vars['CLASS_VIEW_ACTION']->value){?>
    <?php $_smarty_tpl->tpl_vars['CLASS_VIEW_ACTION'] = new Smarty_variable('listViewActions', null, 0);?>
    <?php $_smarty_tpl->tpl_vars['CLASS_VIEW_PAGING_INPUT'] = new Smarty_variable('listViewPagingInput', null, 0);?>
    <?php $_smarty_tpl->tpl_vars['CLASS_VIEW_PAGING_INPUT_SUBMIT'] = new Smarty_variable('listViewPagingInputSubmit', null, 0);?>
    <?php $_smarty_tpl->tpl_vars['CLASS_VIEW_BASIC_ACTION'] = new Smarty_variable('listViewBasicAction', null, 0);?>
<?php }?>
<div class = "<?php echo $_smarty_tpl->tpl_vars['CLASS_VIEW_ACTION']->value;?>
">
    <div class="btn-group pull-right">
        <a href="index.php?module=VTERoundRobin&parent=Settings&view=Edit&record=<?php echo $_smarty_tpl->tpl_vars['RECORD_DATA']->value['record'];?>
&page=<?php echo ($_smarty_tpl->tpl_vars['PAGE_NUMBER']->value-1);?>
" type="button" id="PreviousPageButton" class="btn btn-default" <?php if (!$_smarty_tpl->tpl_vars['PAGING_MODEL']->value->isPrevPageExists()){?> disabled <?php }?>><i class="fa fa-caret-left"></i></a>
        <?php if ($_smarty_tpl->tpl_vars['SHOWPAGEJUMP']->value){?>
            <button type="button" id="PageJump" data-toggle="dropdown" class="btn btn-default">
                <i class="fa fa-ellipsis-h icon" title="<?php echo vtranslate('LBL_LISTVIEW_PAGE_JUMP',$_smarty_tpl->tpl_vars['MODULE']->value);?>
"></i>
            </button>
            <ul class="<?php echo $_smarty_tpl->tpl_vars['CLASS_VIEW_BASIC_ACTION']->value;?>
 dropdown-menu" id="PageJumpDropDown">
                <li>
                    <div class="listview-pagenum">
                        <span ><?php echo vtranslate('LBL_PAGE',$_smarty_tpl->tpl_vars['MODULE']->value);?>
</span>&nbsp;
                        <strong><span><?php echo $_smarty_tpl->tpl_vars['PAGE_NUMBER']->value;?>
</span></strong>&nbsp;
                        <span ><?php echo vtranslate('LBL_OF',$_smarty_tpl->tpl_vars['MODULE']->value);?>
</span>&nbsp;
                        <strong><span id="totalPageCount">2</span></strong>
                    </div>
                    <div class="listview-pagejump">
                        <input type="text" id="pageToJump" placeholder="<?php echo vtranslate('LBL_LISTVIEW_JUMP_TO',$_smarty_tpl->tpl_vars['MODULE']->value);?>
" class="<?php echo $_smarty_tpl->tpl_vars['CLASS_VIEW_PAGING_INPUT']->value;?>
 text-center"/>&nbsp;
                        <button type="button" id="pageToJumpSubmit" class="btn btn-success <?php echo $_smarty_tpl->tpl_vars['CLASS_VIEW_PAGING_INPUT_SUBMIT']->value;?>
 text-center"><?php echo 'GO';?>
</button>
                    </div>
                </li>
            </ul>
        <?php }?>
        <a href="index.php?module=VTERoundRobin&parent=Settings&view=Edit&record=<?php echo $_smarty_tpl->tpl_vars['RECORD_DATA']->value['record'];?>
&page=<?php echo ($_smarty_tpl->tpl_vars['PAGE_NUMBER']->value+1);?>
" type="button" id="NextPageButton" class="btn btn-default" <?php if (!$_smarty_tpl->tpl_vars['PAGING_MODEL']->value->isNextPageExists()){?>disabled<?php }?>><i class="fa fa-caret-right"></i></a>
    </div>
    <span class="pageNumbers  pull-right" style="position:relative;top:7px;">
        <span class="pageNumbersText">
            <?php if ($_smarty_tpl->tpl_vars['RECORD_COUNT']->value){?><?php echo $_smarty_tpl->tpl_vars['PAGING_MODEL']->value->getRecordStartRange();?>
 <?php echo vtranslate('LBL_to',$_smarty_tpl->tpl_vars['MODULE']->value);?>
 <?php echo $_smarty_tpl->tpl_vars['PAGING_MODEL']->value->getRecordEndRange();?>
<?php }else{ ?>
            <?php }?>
        </span>
        &nbsp;<span class="totalNumberOfRecords cursorPointer<?php if (!$_smarty_tpl->tpl_vars['RECORD_COUNT']->value){?> hide<?php }?>" title="<?php echo vtranslate('LBL_SHOW_TOTAL_NUMBER_OF_RECORDS',$_smarty_tpl->tpl_vars['MODULE']->value);?>
"><?php echo vtranslate('LBL_OF',$_smarty_tpl->tpl_vars['MODULE']->value);?>
 <a href="javascript:void(0)" class="showTotalCountIcon" data-value="<?php echo $_smarty_tpl->tpl_vars['ROUNDROBIN_ASSIGMENTS_COUNT']->value;?>
"><i class="fa fa-question"></i></a></span>&nbsp;&nbsp;
    </span>
</div><?php }} ?>