import { useState, useEffect } from "react";
import ColorButton from "./ColorButton";

// Constantes pour la taille de la grid et le nom de la clé de stockage locale
const grid_size = 3;
const local_storage_key = "gridPatern";

const GridPaternCreator = () => {
  // État pour les couleurs présentement affichées (en vert au début)
  const [gridColors, setGridColors] = useState( //var d'état->fonction de mise à jour de l'état->initialisation de l'état
    //C'Est un hook de react qui gère l'état local dans un component en fonction. Donc ca permet de les changements de facon réactive.
    Array(grid_size * grid_size).fill(0) //
  );

  // État pour les paterns sauvegardés
  const [savedPaterns, setSavedPaterns] = useState([]);

  // Charge les motifs sauvegardés depuis le localStorage au montage du composant
  useEffect(() => {
    //C'est un hook qui permet d'exécuter du code en réaction. Séparer la logique du rendu du side effect de sauvergarder le rendu déja créé.
    const storedPaterns = JSON.parse(localStorage.getItem(local_storage_key));
    if (storedPaterns && Array.isArray(storedPaterns)) {
      setSavedPaterns(storedPaterns);
    }
  }, []); //Tableau de dépendances vide (aucune variable) qui dit à react d'exécuter la fonciton une seule fois. (au montage initial du composante)

  // Sauvegarde le patern dans le localStorage quand Saved
  if (savedPaterns.length > 0) {
    localStorage.setItem(local_storage_key, JSON.stringify(savedPaterns));
  }

  // Fonction qui gère les changements de couleur des boutons
  const handleColorChange = (id, newColorIndex) => {
    //Le parametre id du bouton.
    const index = parseInt(id.replace("button-", ""), 10); // Extrait l'index à partir de l'ID (enleve le string) On remplace button- par rien 'button-2' devient '2' et ensuite on le change en nombre entier (int de 0 à 10) donc 2.
    const updatedColors = [...gridColors]; //Version superficielle modifiable du tableau
    updatedColors[index] = newColorIndex;
    setGridColors(updatedColors);
    console.log(id);
  };

// Fonction pour sauvegarder le patern créé
const saveCurrentPatern = () => {
  // Vérifie si le motif est déjà sauvegardé
  const isDuplicate = savedPaterns.some(// Regarde si au moins un element de l'array passe une test implementé. Regarde si un patern
    (patern) =>
      patern.length === gridColors.length &&
      patern.every((color, idx) => color === gridColors[idx])
  );
  if (!isDuplicate) {
    const newPaterns = [gridColors, ...savedPaterns];
    if (newPaterns.length > 1) {
      newPaterns.pop(); // Supprime le dernier élément Method pop enleve le dernier element d'une liste.
    }
    setSavedPaterns(newPaterns);
  } else {
    alert("Ce motif est déjà sauvegardé.");
  }
};

  // Fonction pour effacer tous les paterns sauvegardés
  const clearPaterns = () => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir effacer tous les motifs sauvegardés ?"
      )
    ) {
      setSavedPaterns([]);
      localStorage.removeItem(local_storage_key);
    }
  };

  // Fonction pour réinitialiser les couleurs de la grille
  const resetColors = () => {
    const initialColors = Array(grid_size * grid_size).fill(0); // Réinitialise toutes les couleurs à 0 (vert)
    setGridColors(initialColors);
  };

  return (
    <div className="create_grid-paterns">
      {" "}
      <div className="ctrl_create-patern">
        {/* Conteneur de la grille de boutons */}
        <div className="grid-container">
          {gridColors.map((colorIndex, index) => (
            <ColorButton
              key={index}
              id={`button-${index}`} //le id est donné par le numéro de l'index et redistribué partout.
              colorIndex={colorIndex}
              onColorChange={handleColorChange} //  GridPaternCreator passe handleColorChange à son enfant ColorButton via une prop nommée onColorChange.
            />
          ))}
        </div>

        {/* Boutons pour sauvegarder, effacer et réinitialiser les motifs */}
        <div className="controls_create-patern">
          <button onClick={saveCurrentPatern}>Sauver</button>
          <button onClick={resetColors}>Reset</button>
        </div>
      </div>
      {/* Affichage des motifs sauvegardés */}
      <div className="saved_patterns">
        <div className="btn_delete-saved">
          <button onClick={clearPaterns}>Effacer les motifs sauvegardés</button>
        </div>
        <div className="saved_paterns-list">
          {savedPaterns && savedPaterns.length > 0 ? (
            savedPaterns.map((patern, index) => (
              <div
                key={index}
                className={`grid_patern grid_patern${index + 1}`}
              >
                {patern.map(
                  (color, btnIndex) => (
                    console.log([patern, color]),
                    (
                      <div
                        key={btnIndex}
                        className={`pattern-button ${
                          ["green", "yellow", "red"][color]
                        }`}
                      ></div>
                    )
                  )
                )}
              </div>
            ))
          ) : (
            <p>Aucun motif sauvegardé.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GridPaternCreator;
