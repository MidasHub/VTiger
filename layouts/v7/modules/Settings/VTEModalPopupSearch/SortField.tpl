{if $FIELDS}
    <select name="sortfield" style="width: 150px;" class="select2 span5" id="popup_list_sortfield" name="popupsortfield">
        <option value="" >None</option>
        {foreach from=$FIELDS key=FIELD_VALUE item=FIELD_LABEL}
            <option {if $FIELD_SORT eq $FIELD_VALUE}selected {/if} value="{$FIELD_VALUE}">{$FIELD_LABEL}</option>
        {/foreach}
    </select>
    <select name="sorttype" id="popup_list_sort" class="select2 span5">
        <option value="ASC" {if $SORT_BY eq 'ASC'}selected {/if}>ASC</option>
        <option value="DESC" {if $SORT_BY eq 'DESC'}selected {/if}>DESC</option>
    </select>
{/if}

{literal}
    <script type="text/javascript">
        jQuery(document).ready(function(){
            jQuery('#popup_list_sortfield,#popup_list_sort').select2();
        });
    </script>
{/literal}