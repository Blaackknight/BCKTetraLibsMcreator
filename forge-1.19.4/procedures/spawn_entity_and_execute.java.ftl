<#include "mcelements.ftl">
<#assign entity = generator.map(field$entity, "entities", 1)!"null">
<#assign state = statement$state!"null">
<#if entity != "null">
if (world instanceof ServerLevel _level) {
    Entity entityToSpawn = ${entity}.spawn(_level, ${toBlockPos(input$x,input$y,input$z)}, MobSpawnType.${field$mob_spawn_type});
    <#if state != "null">
        ${state}
    </#if>
    if (entityToSpawn != null) {
		entityToSpawn.setYRot(world.getRandom().nextFloat() * 360F);
	}
}
</#if>