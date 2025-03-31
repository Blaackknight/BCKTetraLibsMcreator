<#include "procedures.java.ftl">
@Mod.EventBusSubscriber public class ${name}Procedure {
	@SubscribeEvent public static void onExperienceGained(ExperienceGainEvent event) {
		<#assign dependenciesCode><#compress>
			<@procedureDependenciesCode dependencies, {
            "event": "event",
            "entity": "event.getEntity()",
            "type": "event.getType()",
            "amount": "event.getXpGained().",
            "new_xp": "event.getCurrentXP()"
			}/>
		</#compress></#assign>
		if (event != null && event.getEntity() instanceof LevelingEntity) {
			execute(event<#if dependenciesCode?has_content>,</#if>${dependenciesCode});
		}
         
	}

    