package fr.bck.tetralibs.registry;

import fr.bck.tetralibs.element.types.LevelingEntity;
import fr.bck.tetralibs.element.types.SuggestedCommand;
import fr.bck.tetralibs.ui.modgui.LevelingEntityGUI;
import fr.bck.tetralibs.ui.modgui.SuggestedCommandGUI;
import net.mcreator.element.ModElementType;
import net.mcreator.element.ModElementTypeLoader;
import net.mcreator.generator.GeneratorFlavor;
import net.mcreator.generator.GeneratorFlavor.BaseLanguage;

public class PluginElementTypes {
    public static ModElementType<?> LEVELINGENTITY;
    public static ModElementType<?> SUGGESTEDCOMMAND;

    public PluginElementTypes() {

    }

    public static void load() {
        LEVELINGENTITY = ModElementTypeLoader.register(new ModElementType("leveling_entity", '$', LevelingEntityGUI::new, LevelingEntity.class)).coveredOn(GeneratorFlavor.baseLanguage(BaseLanguage.JAVA));
        SUGGESTEDCOMMAND = ModElementTypeLoader.register(new ModElementType("suggested_command", '*', SuggestedCommandGUI::new, SuggestedCommand.class)).coveredOn(GeneratorFlavor.baseLanguage(BaseLanguage.JAVA));
    }
}