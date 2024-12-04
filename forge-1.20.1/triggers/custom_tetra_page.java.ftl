<#include "procedures.java.ftl">
@Mod.EventBusSubscriber public class ${name}Procedure {
	@SubscribeEvent public static void onPlayerLoggedIn(PlayerEvent.PlayerLoggedInEvent event) {
		<#assign dependenciesCode><#compress>
			<@procedureDependenciesCode dependencies, {
            "event": "event",
            "world": "event.getEntity().level()",
            "x": "event.getEntity().getX()",
            "y": "event.getEntity().getY()",
            "z": "event.getEntity().getZ()",
		    "entity": "event.getEntity()"
			}/>
		</#compress></#assign>
		execute(event<#if dependenciesCode?has_content>,</#if>${dependenciesCode});

         
	}

    