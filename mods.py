import requests
import os

def downloadmod(mod_id, version, loader):
    url = f"https://api.modrinth.com/v2/project/{mod_id}/version"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        for mod_version in data:
            if version in mod_version["game_versions"] and loader in mod_version["loaders"]:
                file_url = mod_version["files"][0]["url"]
                file_name = mod_version["files"][0]["filename"]
                mods_folder = os.path.join(os.getenv("APPDATA"), ".minecraft", "mods")
                os.makedirs(mods_folder, exist_ok=True)
                file_path = os.path.join(mods_folder, file_name)
                print(f"Téléchargement de {file_name} dans {mods_folder}...")
                file_data = requests.get(file_url)
                with open(file_path, "wb") as file:
                    file.write(file_data.content)
                print("Téléchargement terminé !")
                return
        print("Aucune version compatible trouvée pour {loader}.")
    else:
        print("Erreur lors de la requête API.")
