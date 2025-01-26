package fr.bck.tetralibs.element.types;

import net.mcreator.blockly.data.BlocklyLoader;
import net.mcreator.blockly.data.BlocklyXML;
import net.mcreator.blockly.java.BlocklyToJava;
import net.mcreator.element.GeneratableElement;
import net.mcreator.generator.blockly.BlocklyBlockCodeGenerator;
import net.mcreator.generator.blockly.ProceduralBlockCodeGenerator;
import net.mcreator.generator.template.IAdditionalTemplateDataProvider;
import net.mcreator.minecraft.MinecraftImageGenerator;
import net.mcreator.ui.blockly.BlocklyEditorType;
import net.mcreator.workspace.elements.ModElement;

import javax.annotation.Nullable;
import java.awt.image.BufferedImage;
import java.util.Locale;

@SuppressWarnings("unused")
public class SuggestedCommand extends GeneratableElement {

    public static final String XML_BASE =
            "<xml xmlns=\"https://developers.google.com/blockly/xml\"><block type=\"args_start\" deletable=\"false\" x=\"40\" y=\"40\"><next><block type=\"call_procedure\"><field name=\"procedure\"></field></block></next></block></xml>";

    public static final String SUGGESTIONS_XML =
            "<xml xmlns=\"https://developers.google.com/blockly/xml\">" +
                    "<block type=\"suggestion_block\">" +
                    "<field name=\"TEXT\">Nouvelle suggestion</field>" +
                    "</block>" +
                    "</xml>";

    public String commandName;
    public String type;
    public String permissionLevel;

    @BlocklyXML("cmdargs")
    public String argsxml;

    private SuggestedCommand() {
        this(null);
    }

    public SuggestedCommand(ModElement element) {
        super(element);

        this.type = "STANDARD";
        this.permissionLevel = "4";

        // Ajouter la gestion de la nouvelle catégorie "Suggestions"
        BlocklyLoader.addBuiltinCategory("suggestions");
    }

    @Override
    public BufferedImage generateModElementPicture() {
        if ("SUGGESTIONS".equalsIgnoreCase(type)) {
            return MinecraftImageGenerator.Preview.generateCommandPreviewPicture(commandName + " [Suggestions]", argsxml);
        }
        return super.generateModElementPicture();
    }

    @Override
    public @Nullable IAdditionalTemplateDataProvider getAdditionalTemplateData() {
        return additionalData -> {
            BlocklyBlockCodeGenerator blocklyBlockCodeGenerator = new BlocklyBlockCodeGenerator(
                    BlocklyLoader.INSTANCE.getBlockLoader(BlocklyEditorType.COMMAND_ARG).getDefinedBlocks(),
                    getModElement().getGenerator().getGeneratorStats().getBlocklyBlocks(BlocklyEditorType.COMMAND_ARG),
                    this.getModElement().getGenerator()
                            .getTemplateGeneratorFromName(BlocklyEditorType.COMMAND_ARG.registryName()),
                    additionalData).setTemplateExtension(
                    this.getModElement().getGeneratorConfiguration().getGeneratorFlavor().getBaseLanguage().name()
                            .toLowerCase(Locale.ENGLISH));

            // Ajouter un générateur spécifique pour les suggestions
            ProceduralBlockCodeGenerator suggestionBlockCodeGen = new ProceduralBlockCodeGenerator(blocklyBlockCodeGenerator);

            BlocklyToJava blocklyToJava = new BlocklyToJava(
                    this.getModElement().getWorkspace(),
                    this.getModElement(),
                    BlocklyEditorType.COMMAND_ARG,
                    this.argsxml,
                    this.getModElement().getGenerator()
                            .getTemplateGeneratorFromName(BlocklyEditorType.COMMAND_ARG.registryName()),
                    suggestionBlockCodeGen);

            additionalData.put("argscode", blocklyToJava.getGeneratedCode());
            additionalData.put("argsblocks", blocklyToJava.getUsedBlocks());
            additionalData.put("extra_templates_code", blocklyToJava.getExtraTemplatesCode());

            // Ajouter du code spécifique pour la catégorie "Suggestions"
            additionalData.put("suggestions_code", "System.out.println(\"Nouvelle suggestion ajoutée.\");");
        };
    }
}
