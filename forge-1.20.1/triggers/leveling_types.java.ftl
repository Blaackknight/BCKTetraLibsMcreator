<#include "procedures.java.ftl">
@Mod.EventBusSubscriber public class ${name}Procedure {
	@SubscribeEvent public static void onAttachCapabilities(AttachCapabilitiesEvent<Entity> event) {
		<#assign dependenciesCode><#compress>
			<@procedureDependenciesCode dependencies, {
            "event": "event",
            "entity": "event.getObject()"
			}/>
		</#compress></#assign>
		execute(event<#if dependenciesCode?has_content>,</#if>${dependenciesCode});
	}

    