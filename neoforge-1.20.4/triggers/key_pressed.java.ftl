<#include "procedures.java.ftl">
@Mod.EventBusSubscriber public class ${name}Procedure {
    @OnlyIn(Dist.CLIENT)
    @SubscribeEvent
    public static void onKeyPress(InputEvent.Key event) {
		<#assign dependenciesCode><#compress>
			<@procedureDependenciesCode dependencies, {
			"key": "event.getKey()",
			"event": "event"
			}/>
		</#compress></#assign>
		execute(event<#if dependenciesCode?has_content>,</#if>${dependenciesCode});
	}