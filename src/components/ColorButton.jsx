import PropTypes from 'prop-types'; 
// Tableau des classes de couleur disponibles
const COLOR_CLASSES = ['green', 'yellow', 'red']; //Mapper les couleurs dans une index pour me faciliter la vie.

const ColorButton = ({ id, colorIndex, onColorChange }) => {
  // Fonction pour gérer le clic et changer la couleur
  const handleClick = () => {
    const nextColorIndex = (colorIndex + 1) % COLOR_CLASSES.length;
    onColorChange(id, nextColorIndex);
  };

  return (
    <button
      id={id}
      className={`color-button ${COLOR_CLASSES[colorIndex]}`} // Donne la classe de couleur correspondante
      onClick={handleClick}
    >
    </button>
  );
};

// Définition des PropTypes pour valider les props reçues
ColorButton.propTypes = {
  id: PropTypes.string.isRequired,          // 'id' doit être une string et est requis(rendu si tout les props sont fournis)
  colorIndex: PropTypes.number.isRequired,  // 'colorIndex' doit être un nombre et est requis
  onColorChange: PropTypes.func.isRequired, // 'onColorChange' doit être une fonction et est requis
};

export default ColorButton;
