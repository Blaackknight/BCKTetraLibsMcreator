<#include "mcitems.ftl">
    BCKRecipeManager.findMatchingRecipe(new ItemStack[]{<#list input_list$entry as entry>
        ${mappedMCItemToItemStackCode(entry)}<#if entry?has_next>, </#if>
    </#list>})