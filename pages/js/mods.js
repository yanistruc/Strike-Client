async function searchMods() {
    const query = document.getElementById("searchQuery").value;
    const url = `https://api.modrinth.com/v2/search?query=${query}&limit=10&facets=[[%22versions:1.21.1%22],[%22project_type:mod%22]]`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log('Réponse de l\'API:', data);
        const resultsContainer = document.getElementById("results");
        resultsContainer.innerHTML = '';

        if (data.hits && data.hits.length === 0) {
            resultsContainer.innerHTML = '<p>Aucun mod trouvé.</p>';
        } else if (data.hits) {
            data.hits.forEach(mod => {
                const modElement = document.createElement("div");
                modElement.classList.add("mod");
                modElement.classList.add("container");
                modElement.innerHTML = `
                    <img src="${mod.icon_url || 'https://via.placeholder.com/100'}" alt="Mod Icon" />
                    <div class="mod-title">${mod.title}</div>
                    <p>${mod.description}</p>
                    <button class="button" onclick="downloadMod('${mod.slug}')">Télécharger</button>
                `;
                resultsContainer.appendChild(modElement);
            });
        } else {
            resultsContainer.innerHTML = '<p>Aucun mod trouvé.</p>';
        }
    } catch (error) {
        console.error('Erreur lors de la recherche des mods:', error);
        alert('Erreur lors de la recherche des mods.');
    }
}

async function downloadMod(modSlug) {
    try {
        const response = await fetch(`https://api.modrinth.com/v2/project/${modSlug}`);
        const modData = await response.json();

        if (modData && modData.id) {
            console.log(`ID du mod sélectionné : ${modData.id}`);
            var version = document.getElementById("version").value;
            sendAction("dlmod", modData.id, version);
        } else {
            alert('Détails du mod non trouvés.');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des détails du mod:', error);
        alert('Erreur lors de la récupération des détails du mod.');
    }
}