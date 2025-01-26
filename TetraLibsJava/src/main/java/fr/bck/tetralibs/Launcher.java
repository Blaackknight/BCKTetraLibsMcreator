package fr.bck.tetralibs;

import java.util.HashSet;
import java.util.Set;
import javax.swing.SwingUtilities;

import net.mcreator.plugin.JavaPlugin;
import net.mcreator.plugin.Plugin;
import net.mcreator.plugin.events.PreGeneratorsLoadingEvent;
import net.mcreator.plugin.events.ui.ModElementGUIEvent;
import net.mcreator.plugin.events.workspace.MCreatorLoadedEvent;
import fr.bck.tetralibs.registry.PluginActions;
import fr.bck.tetralibs.registry.PluginElementTypes;
import fr.bck.tetralibs.registry.PluginEventTriggers;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class Launcher extends JavaPlugin {
    public static final Logger LOG = LogManager.getLogger("TetraLibs Plugin");
    public static PluginActions ACTION_REGISTRY;
    public static Set<Plugin> PLUGIN_INSTANCE = new HashSet();
    public Launcher(Plugin plugin) {
        super(plugin);
        PLUGIN_INSTANCE.add(plugin);
        this.addListener(PreGeneratorsLoadingEvent.class, (event) -> PluginElementTypes.load());
        this.addListener(ModElementGUIEvent.BeforeLoading.class, (event) -> SwingUtilities.invokeLater(() -> {
            PluginEventTriggers.dependencyWarning(event.getMCreator(), event.getModElementGUI());
            PluginEventTriggers.interceptProcedurePanel(event.getMCreator(), event.getModElementGUI());
        }));
        this.addListener(MCreatorLoadedEvent.class, (event) -> {
            ACTION_REGISTRY = new PluginActions(event.getMCreator());
            SwingUtilities.invokeLater(() -> PluginEventTriggers.modifyMenus(event.getMCreator()));
        });
        LOG.info("Plugin was loaded");
    }
}

