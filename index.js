const fs = require('fs');
const path = require('path');

// Fonction pour générer un fichier HTML pour chaque fichier JSON dans un dossier
function generateHtmlFromJsonFiles(directoryPath, destinationPath) {
    if (fs.existsSync(directoryPath)) {
        // Lire les fichiers du dossier
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                console.error('Erreur de lecture du dossier:', err);
                return;
            }

            // Filtrer les fichiers .json
            const jsonFiles = files.filter(file => file.endsWith('.json'));

            if (jsonFiles.length === 0) {
                console.log('Aucun fichier JSON trouvé dans le dossier.');
                return;
            }

            /**
             * @type {[{file: string, jsonData: {color: string | number, parent_category: string | null}}]}
             */
            let categories = [];
            let procedures = [];
            let processedFiles = 0; // Compteur pour suivre les fichiers traités
            let proFiles = 0;

            // Traiter chaque fichier JSON
            jsonFiles.forEach(file => {
                const filePath = path.join(directoryPath, file); // Chemin complet du fichier

                // Lire chaque fichier JSON
                fs.readFile(filePath, 'utf8', (err, data) => {
                    if (err) {
                        console.error('Erreur de lecture du fichier:', err);
                        return;
                    }

                    try {
                        // Analyser le contenu du fichier JSON
                        const jsonData = JSON.parse(data);

                        if (file.startsWith("$")) {
                            // Si c'est une catégorie, on l'ajoute à la liste des catégories
                            categories.push({ file: file.replace("$", ""), jsonData: jsonData });
                        } else {
                            // Si ce n'est pas une catégorie, c'est une procédure
                            procedures.push({ file: file, jsonData: jsonData });

                            // Générer immédiatement le fichier HTML pour cette procédure
                            const htmlContent = generateProcedureHtmlContent(jsonData, file);

                            // Déterminer le nom du fichier HTML pour la procédure
                            const htmlFileName = path.basename(file, '.json') + '.html';
                            const htmlFilePath = path.join(destinationPath, htmlFileName);

                            // Écrire le fichier HTML pour la procédure
                            fs.writeFile(htmlFilePath, htmlContent, 'utf8', (err) => {
                                if (err) {
                                    console.error('Erreur lors de l\'écriture du fichier HTML:', err);
                                } else {
                                    //console.log('Fichier HTML de la procédure créé:', htmlFilePath);
                                }
                            });
                        }

                        // Incrémenter le compteur de fichiers traités
                        processedFiles++;

                        // Une fois tous les fichiers traités, générer le fichier HTML des catégories
                        if (processedFiles === jsonFiles.length) {
                            if (categories.length > 0) {
                                const htmlContent = generateCategoryHtmlContent(categories);

                                // Déterminer le nom du fichier HTML des catégories
                                const htmlFilePath = path.join(destinationPath, "categories.html");

                                // Écrire le fichier HTML des catégories
                                fs.writeFile(htmlFilePath, htmlContent, 'utf8', (err) => {
                                    if (err) {
                                        console.error('Erreur lors de l\'écriture du fichier HTML des catégories:', err);
                                    } else {
                                        //console.log('Fichier HTML des catégories créé:', htmlFilePath);
                                    }
                                });
                                proFiles++;
                            }
                        }
                        if (proFiles > 0) {
                            console.debug(`HTML Procédures crée: ${processedFiles} <-> HTML Catégories crée: ${proFiles}`)
                        }
                    } catch (parseError) {
                        console.error('Erreur lors de l\'analyse du fichier JSON:', parseError);
                    }

                });
            });
        });
    } else {
        console.log('Le dossier spécifié n\'existe pas.');
    }
}

// Fonction pour générer le contenu HTML à partir des données JSON
/**
 * Génère le contenu HTML pour afficher les procédures et leurs informations
 * @param {{args0:[{type:string,name:string,check:string|null}],extensions:[]|null,mutator:string|null,inputsInline:boolean|null,previousStatement:boolean|null,nextStatement:boolean|null,colour:string,tooltip:string|null,helpUrl:string|null,mcreator:{toolbox_id:string,toolbox_init:string[],inputs:string[],fields:string[],dependencies:[{name:string,type:string}]}}} jsonData
 * @param {string} jsonFileName 
 * @returns {string} HTML généré
 */
function generateProcedureHtmlContent(jsonData, jsonFileName) {
    let htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>

        .box-border {
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        h3 {
            color: #333;
            font-size: 24px;
            text-align: center;
            margin-bottom: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        th, td {
            padding: 10px;
            text-align: center;
            border: 1px solid #ddd;
        }

        th {
            background-color: #f4f4f4;
            font-weight: bold;
            color: #333;
        }

        td {
            color: #555;
        }

        .procedure-table tr:nth-child(even) {
            background-color: #f9f9f9;
        }

        .procedure-table tr:hover {
            background-color: #f1f1f1;
        }

        .procedure-table tr:first-child th:first-child {
            border-top-left-radius: 10px;
        }

        .procedure-table tr:first-child th:last-child {
            border-top-right-radius: 10px;
        }

        .procedure-table tr:last-child td:first-child {
            border-bottom-left-radius: 10px;
        }

        .procedure-table tr:last-child td:last-child {
            border-bottom-right-radius: 10px;
        }

        /* Style for the arguments table */
        .argument-table {
            margin-top: 20px;
        }

        .argument-table th {
            background-color: #e1f1e1;
        }

        .argument-table td {
            color: #333;
        }

        .blockly-container p {
            color: black;
        }

        .blockly-container h4 {
            color: black;
            text-align: center;
        }

        /* For long text in MCreator, you can also use a tooltip or show full text on hover */
        .mcreator-tooltip {
            display: block;
            width: 100%;
            background-color: #ddd;
            padding: 5px;
            border-radius: 4px;
            position: absolute;
            z-index: 100;
            top: 0;
            left: 0;
        }

        .mcreator-column {
            width: 200px; /* Adjust width for MCreator column */
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    </style>
</head>
<body>
    <div class="box-border">
        <!-- French Language Section -->
        <div class="blockly-container">
            <div class="lang-content" data-lang="fr">
                Plus de details <button onclick="toggleDetails(this)">+</button>
                <!-- Procedure Details Table -->
                <div style="display: none">
                    <table class="procedure-table">
                        <thead>
                            <tr>
                                <th>Clé</th>
                                <th>Entrée en Ligne</th>
                                <th>Déclaration précédente</th>
                                <th>Déclaration suivante</th>
                                <th>Couleur</th>
                                ${jsonData.extensions ? `<th>Extension</th>` : ''}
                                ${jsonData.mutator ? `<th>Mutateur</th>` : ''}
                                <th class="mcreator-column">MCreator</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>${jsonData.args0 ? jsonData.args0[0]?.name : 'Non défini'}</td>
                                <td>${jsonData.inputsInline !== null ? jsonData.inputsInline : 'Non défini'}</td>
                                <td>${jsonData.previousStatement !== undefined ? jsonData.previousStatement : 'Non défini'}</td>
                                <td>${jsonData.nextStatement !== undefined ? jsonData.nextStatement : 'Non défini'}</td>
                                <td style="color: ${jsonData.colour};">${jsonData.colour || ''}</td>
                                ${jsonData.extensions ? `<td>${jsonData.extensions.join(', ')}</td>` : 'Aucune'}
                                ${jsonData.mutator ? `<td>${jsonData.mutator}</td>` : 'Aucun'}
                                <td class="mcreator-column">${jsonData.mcreator ? renderMCreator(jsonData.mcreator, true) : 'Non défini'}</td>
                            </tr>
                        </tbody>
                    </table>

                    <!-- Arguments Table -->
                    <h4>Arguments</h4>
                    <table class="argument-table">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Nom</th>
                                <th>Check</th>
                            </tr>
                        </thead>
                        <tbody>`;

    // Afficher les éléments de jsonData.args0
    if (jsonData.args0 && Array.isArray(jsonData.args0)) {
        jsonData.args0.forEach(arg => {
            htmlContent += `
                <tr>
                    <td>${arg.type || 'Non défini'}</td>
                    <td>${arg.name || 'Non défini'}</td>
                    <td>${arg.check || 'Non défini'}</td>
                </tr>`;
        });
    }

    htmlContent += `
            </tbody>
        </table>
    </div>
</div>

    <!-- English Language Section -->
    <div class="lang-content" data-lang="en">
        Plus de details <button onclick="toggleDetails(this)">+</button>
        <!-- Procedure Details Table -->
        <div style="display: none">
            <table class="procedure-table">
                <thead>
                    <tr>
                        <th>Raw Name</th>
                        <th>Inline Input</th>
                        <th>Previous Statement</th>
                        <th>Next Statement</th>
                        <th>Color</th>
                        ${jsonData.extensions ? `<th>Extension</th>` : ''}
                        ${jsonData.mutator ? `<th>Mutator</th>` : ''}
                        <th class="mcreator-column">MCreator</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${jsonData.args0 ? jsonData.args0[0]?.name : 'Not defined'}</td>
                        <td>${jsonData.inputsInline !== null ? jsonData.inputsInline : 'Not defined'}</td>
                        <td>${jsonData.previousStatement !== undefined ? jsonData.previousStatement : 'Not defined'}</td>
                        <td>${jsonData.nextStatement !== undefined ? jsonData.nextStatement : 'Not defined'}</td>
                        <td style="color: ${jsonData.colour};">${jsonData.colour || ''}</td>
                        ${jsonData.extensions ? `<td>${jsonData.extensions.join(', ')}</td>` : 'None'}
                        ${jsonData.mutator ? `<td>${jsonData.mutator}</td>` : 'None'}
                        <td class="mcreator-column">${jsonData.mcreator ? renderMCreator(jsonData.mcreator) : 'Not defined'}</td>
                    </tr>
                </tbody>
            </table>

            <!-- Arguments Table -->
            <h4>Arguments</h4>
            <table class="argument-table">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Check</th>
                    </tr>
                </thead>
                <tbody>`;

    // Afficher les éléments de jsonData.args0 pour la langue anglaise
    if (jsonData.args0 && Array.isArray(jsonData.args0)) {
        jsonData.args0.forEach(arg => {
            htmlContent += `
                <tr>
                    <td>${arg.type || 'Not defined'}</td>
                    <td>${arg.name || 'Not defined'}</td>
                    <td>${arg.check || 'Not defined'}</td>
                </tr>`;
        });
    }

    htmlContent += `
                </tbody>
            </table>
        </div>
    </div>
</div>
</body>
</html>`;

    return htmlContent;
}

/**
 * Génère le contenu HTML pour afficher toutes les catégories et leurs sous-catégories.
 * @param {[{file: string, jsonData: {color: string | number, parent_category: string | null}}]} categories La liste des catégories à afficher.
 * @returns {string} Le code HTML généré pour afficher les catégories et leurs sous-catégories.
 */
function generateCategoryHtmlContent(categories) {
    // Charger les noms des catégories pour différentes langues
    const lang = loadCategoryNames("fr_FR");
    const lang_en = loadCategoryNames(); // anglais ou autre langue par défaut

    let htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Catégories</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 20px;
        }

        .box-border {
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
        }

        th,
        td {
            padding: 6px;
            text-align: center;
            border: 1px solid #ddd;
        }

        th {
            background-color: #f4f4f4;
            font-weight: bold;
            color: #333;
        }

        td {
            color: #555;
        }

        .main-category-row {
            background-color: #e1f1e1; /* Light green */
            font-weight: bold;
            color: #2b8a3e;
        }

        .subcategory-table {
            background-color: #f9f9f9;
            margin-top: 30px; /* Added margin to create space between tables */
        }

        .subcategory-table th {
            background-color: #e1f1e1;
        }

        .subcategory-table td {
            color: #333;
        }

        .subcategory-name {
            color: #e39378; /* Slight orange for subcategories */
        }

        .subcategory-color {
            background-color: #fc035e; /* A deep red color for visibility */
            border-radius: 5px;
            color: #fff;
            padding: 5px;
        }

        /* Optional: Hover effect for subcategory rows */
        .subcategory-table tr:hover {
            background-color: #f1f1f1;
        }
    </style>
</head>
<body>
    <div class="box-border">
        <div class="category-container">
            <!-- French Language Section -->
            <div class="lang-content" data-lang="fr">
                `;

    // Identifier les catégories principales (sans parent_category)
    const mainCategories = [];
    const mainCategoriesVerified = [];

    categories.forEach((e) => {
        mainCategories.push({ file: e.file, jsonData: e.jsonData });
    });

    const subCategories = [];

    mainCategories.forEach((c) => {
        if (c.jsonData.parent_category !== undefined) {
            subCategories.push(c);
        } else {
            mainCategoriesVerified.push(c);
        }
    });

    // Boucler sur chaque catégorie principale
    mainCategoriesVerified.forEach((c) => {
        const name = c.file.replace(".json", "");
        const raw_name = lang[`blockly.category.${name}`] || `Inconnu`;

        // Remplacer les guillemets doubles par des guillemets simples
        const cleanedName = raw_name.replace(/''/g, "'");

        htmlContent += `
            <div class="category-container">
                <table>
                    <thead>
                        <tr>
                            <th>Nom Brut</th>
                            <th>Nom D'affichage</th>
                            <th>Couleur</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="main-category-row">
                            <td>${name}</td>
                            <td>
                                ${cleanedName}<br />Sous-Catégories <b>➽</b>
                                <button onclick="toggleDetails(this)">+</button>
                            </td>
                            <td><span style="color: ${c.jsonData.color || '#111'};">${c.jsonData.color || 'Non définie'}</span></td>
                        </tr>
                        <tr style="display: none">
                            <td colspan="3">
                                <!-- Sub-Categories Table -->
                                <table class="subcategory-table">
                                    <thead>
                                        <tr>
                                            <th>Sous-Catégorie</th>
                                            <th>Couleur</th>
                                        </tr>
                                    </thead>
                                    <tbody>`;

        let inn = 0;
        subCategories.forEach((s) => {
            if (s.jsonData.parent_category === name) {
                const s_name = s.file.replace(".json", "");
                let s_raw_name = lang[`blockly.category.${s_name}`] || `Inconnu`;

                // Remplacer les guillemets doubles par des guillemets simples
                s_raw_name = s_raw_name.replace(/''/g, "'");

                htmlContent += `
                        <tr>
                            <td class="subcategory-name">${s_raw_name} <i>(${s_name})</i></td>
                            <td class="subcategory-color">${s.jsonData.color || 'Non définie'}</td>
                        </tr>`;
            }
            inn++;
        });

        htmlContent += `</tbody></table></td></tr></tbody></table></div>`;
    });

    htmlContent += `
        </div> <!-- End lang-content for French -->
        
        <!-- English Language Section -->
        <div class="lang-content" data-lang="en">
            `;

    // Boucler sur chaque catégorie principale pour la version en anglais
    mainCategoriesVerified.forEach((c) => {
        const name = c.file.replace(".json", "");
        const raw_name = lang_en[`blockly.category.${name}`] || `Unknown`;

        // Remplacer les guillemets doubles par des guillemets simples
        const cleanedName = raw_name.replace(/''/g, "'");

        htmlContent += `
            <div class="category-container">
                <table>
                    <thead>
                        <tr>
                            <th>Raw Name</th>
                            <th>Display Name</th>
                            <th>Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="main-category-row">
                            <td>${name}</td>
                            <td>
                                ${cleanedName}<br />Sub-Categories <b>➽</b>
                                <button onclick="toggleDetails(this)">+</button>
                            </td>
                            <td><span style="color: ${c.jsonData.color || '#111'};">${c.jsonData.color || 'Not defined'}</span></td>
                        </tr>
                        <tr style="display: none">
                            <td colspan="3">
                                <!-- Sub-Categories Table -->
                                <table class="subcategory-table">
                                    <thead>
                                        <tr>
                                            <th>Sub-Category</th>
                                            <th>Color</th>
                                        </tr>
                                    </thead>
                                    <tbody>`;

        let inn = 0;
        subCategories.forEach((s) => {
            if (s.jsonData.parent_category === name) {
                const s_name = s.file.replace(".json", "");
                let s_raw_name = lang_en[`blockly.category.${s_name}`] || `Unknown`;

                // Remplacer les guillemets doubles par des guillemets simples
                s_raw_name = s_raw_name.replace(/''/g, "'");

                htmlContent += `
                        <tr>
                            <td class="subcategory-name">${s_raw_name} <i>(${s_name})</i></td>
                            <td class="subcategory-color">${s.jsonData.color || 'Not defined'}</td>
                        </tr>`;
            }
            inn++;
        });

        htmlContent += `</tbody></table></td></tr></tbody></table></div>`;
    });

    htmlContent += `
        </div> <!-- End lang-content for English -->
    </div>
</body>
</html>`;

    return htmlContent;
}

// Fonction pour afficher MCreator
/**
 * 
 * @param {{toolbox_id:string,toolbox_init:string[],inputs:string[],fields:string[],dependencies:[{name:string,type:string}]}} mcreator 
 * @param {false|boolean} lang 
 * @returns 
 */
function renderMCreator(mcreator, lang = false) {
    if (!mcreator) return '';
    let mcreatorHtml = ``
    let init = ``;
    let inputs = ``;
    let fields = ``;
    if (lang) {
        //console.log(`id: ${mcreator.toolbox_id} -> inputs: ${mcreator.inputs.length}`)
        init = "Aucun";
        inputs = "Aucun";
        fields = "Aucun";

        if (mcreator.toolbox_init && mcreator.toolbox_init.length >= 1) {
            /**
             * @type {string[]}
             */
            let ii = []
            mcreator.toolbox_init.forEach((e) => {
                let ee = e
                ee = e.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
                ii.push(`${ee}`);
                //console.log(ee)
            })
            init = ii.join("<br><br>");
            //console.log(init)
        }
        if (mcreator.inputs && mcreator.inputs.length >= 1) inputs = mcreator.inputs.join(', ');
        if (mcreator.fields && mcreator.fields.length >= 1) fields = mcreator.fields.join(', ');
        mcreatorHtml = `
        <h5>Toolbox ID: <code>${mcreator.toolbox_id || 'Non défini'}</code></h5>
        <h5>Toolbox Init:</h5>
        <pre>${init}</pre>
        <h5>Inputs:</h5>
        <pre>${inputs}</pre>
        <h5>Fields:</h5>
        <pre>${fields}</pre>
        <h5>Dépendances:</h5>
        <ul>`;

        if (mcreator.dependencies && Array.isArray(mcreator.dependencies)) {
            mcreator.dependencies.forEach(dep => {
                mcreatorHtml += `<li>Nom: ${dep.name || 'Non défini'}, Type: ${dep.type || 'Non défini'}</li>`;
            });
        } else {
            mcreatorHtml += `Aucune dépendance trouvé`;
        }
    } else {
        init = "None";
        inputs = "None";
        fields = "None";
        if (mcreator.toolbox_init && mcreator.toolbox_init.length >= 1) {
            /**
             * @type {string[]}
             */
            let ii = []
            mcreator.toolbox_init.forEach((e) => {
                let ee = e
                ee = e.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
                ii.push(`<pre>${ee}</pre>`);
                //console.log(ee)
            })
            init = ii.join("<br><br>");;
        }
        if (mcreator.inputs && mcreator.inputs.length >= 1) inputs = mcreator.inputs.join(', ');
        if (mcreator.fields && mcreator.fields.length >= 1) fields = mcreator.fields.join(', ');
        mcreatorHtml = `
        <h5>Toolbox ID: <code>${mcreator.toolbox_id || 'Not defined'}</code></h5>
        <h5>Toolbox Init:</h5>
        <pre>${init}</pre>
        <h5>Inputs:</h5>
        <pre>${inputs}</pre>
        <h5>Fields:</h5>
        <pre>${fields}</pre>
        <h5>Dépendances:</h5>
        <ul>`;

        if (mcreator.dependencies && Array.isArray(mcreator.dependencies)) {
            mcreator.dependencies.forEach(dep => {
                mcreatorHtml += `<li>Nom: ${dep.name || 'Not defined'}, Type: ${dep.type || 'Not defined'}</li>`;
            });
        } else {
            mcreatorHtml += `No dependencies found`;
        }
    }

    mcreatorHtml += `</ul>`;

    return mcreatorHtml;
}
// Fonction pour lire le fichier de propriétés et en extraire les données
function loadCategoryNames(lang = "") {
    const categoryNames = {};

    try {
        let ff = lang
        if (lang.length > 0) ff = `_${lang}`
        const data = fs.readFileSync(`./lang/texts${ff}.properties`, 'utf8');
        const lines = data.split('\n');

        // Lire chaque ligne du fichier properties
        lines.forEach(line => {
            // Ignorer les lignes vides ou les commentaires
            if (line.trim() && !line.startsWith('#')) {
                const [key, value] = line.split('=');
                if (key && value) {
                    categoryNames[key.trim()] = value.trim();
                }
            }
        });

        return categoryNames;
    } catch (err) {
        console.error('Erreur de lecture du fichier de propriétés:', err);
        return {};
    }
}

// Exemple d'utilisation avec un chemin de dossier local
const directoryPath = './procedures/'; // Remplacez par le chemin du dossier
const destinationPath = './plugin_pages/'; // Remplacez par le chemin du dossier
//generateHtmlFromJsonFiles(directoryPath, destinationPath);

// Chemins des fichiers
const sourceFilePath = './lang/texts.properties'; // Fichier source
const frenchFilePath = './lang/texts_fr_FR.properties'; // Fichier français
const outputFilePath = './lang/updated_texts_fr_FR.properties'; // Fichier de sortie

// Charger le contenu des fichiers
const sourceContent = fs.readFileSync(sourceFilePath, 'utf-8');
const frenchContent = fs.readFileSync(frenchFilePath, 'utf-8');

// Fonction pour extraire le dernier %<nombre> d'une ligne
function getLastPercentagePlaceholder(line) {
  const matches = line.match(/%\d+/g); // Trouver tous les %<nombre>
  return matches ? matches[matches.length - 1] : null; // Retourner le dernier ou null
}

// Analyser le fichier source pour associer chaque clé à son dernier %<nombre>
const sourceLines = sourceContent.trim().split("\n");
const sourcePlaceholders = sourceLines.reduce((acc, line) => {
  if (line.includes("=")) {
    const [key, value] = line.split("=", 2); // Extraire clé et valeur
    const lastPlaceholder = getLastPercentagePlaceholder(value);
    if (lastPlaceholder) {
      acc[key.trim()] = lastPlaceholder; // Associer la clé à son dernier %
    }
  }
  return acc;
}, {});

// Modifier le fichier français en ajoutant le %<nombre> si disponible
const frenchLines = frenchContent.trim().split("\n");
const updatedLines = frenchLines.map(line => {
  if (line.includes("=")) {
    const [key, value] = line.split("=", 2); // Extraire clé et valeur
    const lastPlaceholder = sourcePlaceholders[key.trim()]; // Récupérer le %<nombre> associé
    if (lastPlaceholder) {
      return `${key}=${value.trim()} ${lastPlaceholder}`; // Ajouter le %<nombre>
    }
  }
  return line; // Garder la ligne inchangée si pas de %<nombre>
});

// Écrire dans un nouveau fichier
fs.writeFileSync(outputFilePath, updatedLines.join("\n"), 'utf-8');
console.log(`Fichier mis à jour écrit dans : ${outputFilePath}`);