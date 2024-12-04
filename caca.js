function generateDetailsIds() {
    const classNames = getClassNames(); // Obtenir les noms des classes avec votre fonction
    const lang = getLanguage(); // Détecter la langue active

    const classContainers = document.querySelectorAll('.class-container');
    const categoryContainers = document.querySelectorAll('.category-container');

    classContainers.forEach((container, classIndex) => {
        const classInfo = classNames[classIndex];
        if (!classInfo || !classInfo.name) {
            console.error(`Class name not found for container at index ${classIndex}`);
            return;
        }

        const className = classInfo.name; // Nom de la classe
        console.log(`Processing class: ${className}`); // Log de débogage

        // Récupérer le contenu de la langue active
        const langContent = Array.from(container.querySelectorAll('.lang-content')).find((content) => {
            const contentLang = content.getAttribute('data-lang');
            return contentLang === lang || contentLang === 'en';
        });

        if (!langContent) {
            console.error(`No language content found for class: ${className}`);
            return;
        }

        // Récupérer toutes les lignes dans le tableau
        const rows = Array.from(langContent.querySelectorAll('tbody > tr'));
        rows.forEach((row, index) => {
            const button = row.querySelector('button');

            // Vérifiez si la ligne actuelle contient un bouton
            if (button) {
                const methodNameCell = row.querySelector('td');
                const methodName = methodNameCell?.textContent?.trim();

                // Vérifiez si la cellule contient un nom de méthode valide
                if (!methodName || methodName.includes('Variante') || methodName.length === 0) {
                    console.warn(`Invalid or missing method name for class: ${className}`, methodNameCell);
                    return;
                }

                // Cherchez la ligne suivante (détails)
                const detailsRow = rows[index + 1];
                if (!detailsRow || detailsRow.style.display !== 'none') {
                    console.warn(`No corresponding details row found for method: ${methodName} in class ${className}`);
                    return;
                }

                // Générer un ID unique basé sur la classe et la méthode
                const id = `${lang}-${className}-${methodName}-details`;
                detailsRow.id = id;
                button.setAttribute('data-details-id', id);

                console.log(`Generated Class ID: ${id}`); // Log pour vérifier
            } else {
                //console.warn(`No button found in method row for class: ${className}`, row.outerHTML);
            }
        });
    });
    categoryContainers.forEach((container, categoryIndex) => {
        const categoryInfo = classNames[categoryIndex];
        if (!categoryInfo || !categoryInfo.name) {
            console.error(`Class name not found for container at index ${categoryIndex}`);
            return;
        }

        const categoryName = categoryInfo.name; // Nom de la categorye
        console.log(`Processing category: ${categoryName}`); // Log de débogage

        // Récupérer le contenu de la langue active
        const langContent = Array.from(container.querySelectorAll('.lang-content')).find((content) => {
            const contentLang = content.getAttribute('data-lang');
            return contentLang === lang || contentLang === 'en';
        });

        if (!langContent) {
            console.error(`No language content found for category: ${categoryName}`);
            return;
        }

        // Récupérer toutes les lignes dans le tableau
        const rows = Array.from(langContent.querySelectorAll('tbody > tr'));
        rows.forEach((row, index) => {
            const button = row.querySelector('button');

            // Vérifiez si la ligne actuelle contient un bouton
            if (button) {
                const methodNameCell = row.querySelector('td');
                const methodName = methodNameCell?.textContent?.trim();

                // Vérifiez si la cellule contient un nom de méthode valide
                if (!methodName || methodName.includes('Variante') || methodName.length === 0) {
                    console.warn(`Invalid or missing method name for category: ${categoryName}`, methodNameCell);
                    return;
                }

                // Cherchez la ligne suivante (détails)
                const detailsRow = rows[index + 1];
                if (!detailsRow || detailsRow.style.display !== 'none') {
                    console.warn(`No corresponding details row found for method: ${methodName} in category ${categoryName}`);
                    return;
                }

                // Générer un ID unique basé sur la categorye et la méthode
                const id = `${lang}-${categoryName}-${methodName}-details`;
                detailsRow.id = id;
                button.setAttribute('data-details-id', id);

                console.log(`Generated Category ID: ${id}`); // Log pour vérifier
            } else {
                console.warn(`No button found in method row for category: ${categoryName}`, row.outerHTML);
            }
        });
    });
}