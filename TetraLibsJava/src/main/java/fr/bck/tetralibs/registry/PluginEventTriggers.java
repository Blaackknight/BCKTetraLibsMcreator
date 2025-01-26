package fr.bck.tetralibs.registry;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import fr.bck.tetralibs.Launcher;
import fr.bck.tetralibs.element.types.TetraLibsElement;
import net.mcreator.io.net.WebIO;
import net.mcreator.plugin.PluginUpdateInfo;
import net.mcreator.ui.MCreator;
import net.mcreator.ui.MCreatorApplication;
import net.mcreator.ui.init.L10N;
import net.mcreator.ui.modgui.ModElementGUI;

import javax.swing.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

public class PluginEventTriggers {
    private static final Set<PluginUpdateInfo> pluginUpdates = new HashSet();

    public PluginEventTriggers() {
    }

    private static void checkForPluginUpdates() {
        if (MCreatorApplication.isInternet) {
            pluginUpdates.addAll(Launcher.PLUGIN_INSTANCE.parallelStream().map((plugin) -> {
                try {
                    String updateJSON = WebIO.readURLToString(plugin.getInfo().getUpdateJSONURL());
                    JsonObject updateData = JsonParser.parseString(updateJSON).getAsJsonObject().get(plugin.getID()).getAsJsonObject();
                    String version = updateData.get("latest").getAsString();
                    if (!version.equals(plugin.getPluginVersion())) {
                        return new PluginUpdateInfo(plugin, version, updateData.has("changes") ? updateData.get("changes").getAsJsonArray().asList().stream().map(JsonElement::getAsString).toList() : null);
                    }
                } catch (Exception var4) {
                    var4.printStackTrace();
                }

                return null;
            }).filter(Objects::nonNull).toList());
        }
    }

    public static void dependencyWarning(MCreator mcreator, ModElementGUI modElement) {
        if (!mcreator.getWorkspaceSettings().getDependencies().contains("tetra_libs") && modElement instanceof TetraLibsElement) {
            StringBuilder stringBuilder = new StringBuilder(L10N.t("dialog.tetra_libs.enable_tetra_libs", new Object[0]));
            JOptionPane.showMessageDialog(mcreator, stringBuilder.toString(), L10N.t("dialog.tetra_libs.error_no_dependency", new Object[0]), 0);
        }
    }

    public static void interceptProcedurePanel(MCreator mcreator, ModElementGUI modElement) {

    }

    public static void forceCheckUpdates(MCreator mcreator) {

    }

    public static void modifyMenus(MCreator mcreator) {
        forceCheckUpdates(mcreator);
    }
}
