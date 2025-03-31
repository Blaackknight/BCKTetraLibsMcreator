<#include "procedures.java.ftl">
@Mod.EventBusSubscriber public class ${name}Procedure {
	@SubscribeEvent public static void onLevelUp(LevelUpEvent event) {
		<#assign dependenciesCode><#compress>
			<@procedureDependenciesCode dependencies, {
            "event": "event",
            "entity": "event.getEntity()",
            "type": "event.getType()",
            "old_level": "event.getOldLevel().",
            "new_level": "event.getNewLevel()"
			}/>
		</#compress></#assign>
		if (event != null && event.getEntity() instanceof LevelingEntity) {
			execute(event<#if dependenciesCode?has_content>,</#if>${dependenciesCode});
		}
	}

    