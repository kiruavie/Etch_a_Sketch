const maxInteractions = 10;

function promptForGridSize() {
  const gridSize = prompt(
    "Entrez le nombre de carrés par côté (maximum : 100):"
  );

  if (gridSize !== null && gridSize !== "") {
    const parsedGridSize = parseInt(gridSize);

    if (!isNaN(parsedGridSize) && parsedGridSize > 0 && parsedGridSize <= 100) {
      generateGrid(parsedGridSize);
    } else {
      alert("Veuillez entrer un nombre valide entre 1 et 100.");
    }
  }
}

function generateGrid(gridSize) {
  // Supprimer l'ancienne grille
  const gridContainer = document.getElementById("gridContainer");
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }

  // Générer la nouvelle grille
  for (let i = 0; i < gridSize * gridSize; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridItem.addEventListener("mouseenter", handleMouseEnter);
    gridContainer.appendChild(gridItem);
  }

  // Mettre à jour le style pour la nouvelle grille
  gridContainer.style.width = "calc(" + gridSize + " * (100% / 16))";
}

function handleMouseEnter(event) {
  const gridItem = event.target;

  // Randomiser la couleur RVB
  const randomColor = getRandomColor();

  // Assombrissement progressif
  const currentColor = getComputedStyle(gridItem).backgroundColor;
  const newColor = darkenColor(randomColor, currentColor);

  gridItem.style.backgroundColor = newColor;
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function darkenColor(color, currentColor) {
  const rgbColor = hexToRgb(color);
  const rgbCurrentColor = hexToRgb(currentColor);

  const newColor = {
    r: Math.floor(rgbColor.r * 0.9 + rgbCurrentColor.r * 0.1),
    g: Math.floor(rgbColor.g * 0.9 + rgbCurrentColor.g * 0.1),
    b: Math.floor(rgbColor.b * 0.9 + rgbCurrentColor.b * 0.1),
  };

  return `rgb(${newColor.r}, ${newColor.g}, ${newColor.b})`;
}

function hexToRgb(hex) {
  // Retourne un objet { r, g, b } à partir d'une couleur hexadécimale
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}
