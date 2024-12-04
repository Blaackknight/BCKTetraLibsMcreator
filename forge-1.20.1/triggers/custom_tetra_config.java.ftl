<#include "procedures.java.ftl">

@Mod.EventBusSubscriber(bus = Mod.EventBusSubscriber.Bus.MOD)
public class ${name}Procedure {
    private static fr.bck.tetralibs.Config tetra_config = new fr.bck.tetralibs.Config();

    @SubscribeEvent
	public static void init(FMLCommonSetupEvent event) {
        execute(tetra_config);
    }