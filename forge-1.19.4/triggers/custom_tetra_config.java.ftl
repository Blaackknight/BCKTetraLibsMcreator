<#include "procedures.java.ftl">

@Mod.EventBusSubscriber
public class ${name}Procedure {
    private static Config tetra_config = (Config) ConfigManager.loadConfig(true);

    @SubscribeEvent
	public static void onWorldLoad(net.minecraftforge.event.level.LevelEvent.Load event) {
        execute(tetra_config);
    }