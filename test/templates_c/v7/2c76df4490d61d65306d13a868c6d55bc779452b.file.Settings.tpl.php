<?php /* Smarty version Smarty-3.1.7, created on 2021-07-16 23:50:37
         compiled from "/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/VTEProgressbar/Settings.tpl" */ ?>
<?php /*%%SmartyHeaderCode:114619611660f21b4d78b063-95614743%%*/if(!defined('SMARTY_DIR')) exit('no direct access allowed');
$_valid = $_smarty_tpl->decodeProperties(array (
  'file_dependency' => 
  array (
    '2c76df4490d61d65306d13a868c6d55bc779452b' => 
    array (
      0 => '/var/www/html/VTiger/includes/runtime/../../layouts/v7/modules/VTEProgressbar/Settings.tpl',
      1 => 1626418882,
      2 => 'file',
    ),
  ),
  'nocache_hash' => '114619611660f21b4d78b063-95614743',
  'function' => 
  array (
  ),
  'variables' => 
  array (
    'MODULE_MODEL' => 0,
    'MODULE' => 0,
    'LISTVIEW_ENTRIES' => 0,
    'LISTVIEW_ENTRY' => 0,
  ),
  'has_nocache_code' => false,
  'version' => 'Smarty-3.1.7',
  'unifunc' => 'content_60f21b4d798c3',
),false); /*/%%SmartyHeaderCode%%*/?>
<?php if ($_valid && !is_callable('content_60f21b4d798c3')) {function content_60f21b4d798c3($_smarty_tpl) {?>
<div class="container-fluid WidgetsManage">
    <div class="widget_header row">
        <div class="col-sm-6"><h4><label><?php echo vtranslate('Progress Bar','VTEProgressbar');?>
</label>
        </div>
    </div>
    <hr>
    <div class="clearfix"></div>
    <div class = "row">
        <div class='col-md-5'>
            <div class="foldersContainer pull-left">
                <button type="button" class="btn addButton btn-default module-buttons"
                        onclick='window.location.href = "<?php echo $_smarty_tpl->tpl_vars['MODULE_MODEL']->value->getCreateViewUrl();?>
"'>
                    <div class="fa fa-plus" ></div>
                    &nbsp;&nbsp;<?php echo vtranslate('New Progress Bar',$_smarty_tpl->tpl_vars['MODULE']->value);?>

                </button>
            </div>
        </div>
        <div class="col-md-4">
        </div>
        <div class="col-md-3">

        </div>
    </div>
    <div class="list-content row">
        <div class="col-sm-12 col-xs-12 ">
            <div id="table-content" class="table-container" style="padding-top:0px !important;">
                <table id="listview-table" class="table listview-table">
                    <thead>
                    <tr class="listViewContentHeader">
                        <th></th>
                        <th nowrap>Module</th>
                        <th nowrap>Field</th>
                        <th nowrap>Read Only</th>
                        <th nowrap>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <?php  $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY'] = new Smarty_Variable; $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->_loop = false;
 $_from = $_smarty_tpl->tpl_vars['LISTVIEW_ENTRIES']->value; if (!is_array($_from) && !is_object($_from)) { settype($_from, 'array');}
foreach ($_from as $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->key => $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value){
$_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->_loop = true;
?>
                    <tr class="listViewEntries" data-url = <?php ob_start();?><?php echo $_smarty_tpl->tpl_vars['MODULE_MODEL']->value->getCreateViewUrl($_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value['id']);?>
<?php $_tmp1=ob_get_clean();?><?php echo $_tmp1;?>
>
                        <td>
                            <input style="opacity: 0;" <?php if ($_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value['active']=='1'){?> checked value="on" <?php }else{ ?> value="off"<?php }?> data-on-color="success"  data-module="<?php echo $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value['module'];?>
" data-id="<?php echo $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value['id'];?>
" type="checkbox" name="progressbar_status" id="progressbar_status">
                        </td>
                        <td>
                            <span class="vicon-<?php echo strtolower($_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value['module']);?>
 module-icon"></span><span style="vertical-align: 5px;">&nbsp;<?php echo vtranslate($_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value['module'],$_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value['module']);?>
</span>
                        </td>
                        <td>
                            <div class="header-div">
                                <div style="padding-top: 4px;">
                                        <span class="l-value"
                                             style="vertical-align: left; padding-left: 11px;"><?php echo $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value['field_label'];?>
</span>
                                </div>
                            </div>
                        </td>
                        <td>
                            <?php if ($_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value['readonly']=='1'){?> Yes <?php }else{ ?> No<?php }?>
                        </td>
                        <td>
                            <a href="<?php echo $_smarty_tpl->tpl_vars['MODULE_MODEL']->value->getCreateViewUrl($_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value['id']);?>
"><i class="fa fa-pencil"></i> Edit</a>
                            <a href="javascript:void(0)" data-id="<?php echo $_smarty_tpl->tpl_vars['LISTVIEW_ENTRY']->value['id'];?>
" id="vtprogressbar_delete" style="margin-left: 10px;"><i class="fa fa-trash"></i> Delete</a>
                        </td>
                    </tr>
                    <?php } ?>
                    </tbody>
                </table>
            </div>
            <div id="scroller_wrapper" class="bottom-fixed-scroll">
                <div id="scroller" class="scroller-div"></div>
            </div>
        </div>
    </div>
</div><?php }} ?>