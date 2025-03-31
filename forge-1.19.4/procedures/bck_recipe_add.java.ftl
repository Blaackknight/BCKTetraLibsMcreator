<#include "mcitems.ftl">
{
    NonNullList<Ingredient> inputs = NonNullList.withSize(${input_list$entry?size}, Ingredient.EMPTY);
    <#list input_list$entry as entry>
        inputs.set(${entry?index}, Ingredient.of(${mappedMCItemToItemStackCode(entry)}));
    </#list>
    ItemStack _stack = ${mappedMCItemToItemStackCode(input$output)};
    _stack.setCount(${input$output_count});
    BCKRecipeManager.addRecipe(new BCKRecipe(new ResourceLocation(${JavaModName}.MODID, ${input$id}), inputs, _stack));
}