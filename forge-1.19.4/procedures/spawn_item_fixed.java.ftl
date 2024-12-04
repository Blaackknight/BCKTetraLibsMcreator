<#include "mcitems.ftl">
<#assign despawn = field$despawn>

if (world instanceof ServerLevel _level) {
    ItemEntity entityToSpawn = new ItemEntity(_level, (${input$x} + 0.5), ${input$y}, (${input$z} + 0.5), new ItemStack(${mappedMCItemToItem(input$item)}));
    entityToSpawn.setPickUpDelay(${input$pickup_delay});
    <#if despawn?starts_with("FALSE")>
        entityToSpawn.setUnlimitedLifetime();
    </#if>
    _level.addFreshEntity(entityToSpawn);
}