// Elemente aus dem DOM
const item = document.getElementById("item");
const zone1 = document.getElementById("zone1");
const zone2 = document.getElementById("zone2");
const moveBtn = document.getElementById("moveBtn");
const resetBtn = document.getElementById("resetBtn");

// Array der Dropzones für wiederkehrende Operationen
const zones = [zone1, zone2];

let dragged = false;
let isAnimating = false; // Flag für laufende Animationen

// ===== Gemeinsame Funktionen =====

// Entfernt die "over"-Klasse von allen Dropzones
const clearOverZones = () => zones.forEach(zone => zone.classList.remove("over"));

// Berechnet die Differenz zwischen Item- und Zielposition
const calculateDelta = (itemRect, targetRect) => {
  return {
    deltaX: targetRect.left + targetRect.width / 2 - (itemRect.left + itemRect.width / 2),
    deltaY: targetRect.top + targetRect.height / 2 - (itemRect.top + itemRect.height / 2)
  };
};

// Setzt die Stile des Items zurück
const resetItemStyle = () => {
  item.style.position = "relative";
  item.style.left = "";
  item.style.top = "";
  item.style.zIndex = "1";
  item.style.transform = "scale(1)";
  item.style.width = "";
  item.style.transition = "";
};

// Fügt einen kurzen Skalierungseffekt hinzu
const scaleEffect = () => {
  item.style.transition = "transform 150ms ease-out";
  item.style.transform = "scale(1.02)";
  setTimeout(() => {
    item.style.transform = "scale(1)";
  }, 150);
};

// ===== Maus-Drag =====
item.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", "item");
  // Element unsichtbar machen, um Duplikate zu vermeiden
  setTimeout(() => {
    item.style.visibility = "hidden";
  }, 0);
  dragged = true;
});

item.addEventListener("dragend", () => {
  item.style.visibility = "visible";
  item.style.transform = "scale(1)";
  dragged = false;
});

item.addEventListener("transitionend", () => {
  item.style.transition = "";
});

// Dropzones für Drag-Events
zones.forEach(zone => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();
    zone.classList.add("over");
  });
  zone.addEventListener("dragleave", () => {
    zone.classList.remove("over");
  });
  zone.addEventListener("drop", (e) => {
    e.preventDefault();
    zone.appendChild(item);
    item.style.visibility = "visible";
    zone.classList.remove("over");
    scaleEffect();
  });
});

document.body.addEventListener("drop", (e) => {
  if (!e.target.classList.contains("dropzone") && dragged) {
    zone1.appendChild(item);
    item.style.visibility = "visible";
  }
});

// ===== Touch-Drag =====
let offsetX, offsetY;

item.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  offsetX = touch.clientX - item.getBoundingClientRect().left;
  offsetY = touch.clientY - item.getBoundingClientRect().top;
  item.style.position = "fixed";
  item.style.zIndex = "1000";
  item.style.transform = "scale(1.05)";
  item.style.width = item.offsetWidth + "px";
});

item.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  item.style.left = (touch.clientX - offsetX) + "px";
  item.style.top = (touch.clientY - offsetY) + "px";

  zones.forEach(zone => {
    const rect = zone.getBoundingClientRect();
    if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
        touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
      zone.classList.add("over");
    } else {
      zone.classList.remove("over");
    }
  });
});

item.addEventListener("touchend", (e) => {
  clearOverZones();
  const touch = e.changedTouches[0];
  const dropZone = zones.find(zone => {
    const rect = zone.getBoundingClientRect();
    return touch.clientX >= rect.left && touch.clientX <= rect.right &&
           touch.clientY >= rect.top && touch.clientY <= rect.bottom;
  });

  item.style.transition = "all 0.3s ease";

  if (dropZone) {
    const rect = dropZone.getBoundingClientRect();
    item.style.left = rect.left + rect.width / 2 - item.offsetWidth / 2 + "px";
    item.style.top = rect.top + rect.height / 2 - item.offsetHeight / 2 + "px";

    item.addEventListener("transitionend", () => {
      dropZone.appendChild(item);
      resetItemStyle();
      scaleEffect();
    }, { once: true });
  } else {
    const rect = zone1.getBoundingClientRect();
    item.style.left = rect.left + rect.width / 2 - item.offsetWidth / 2 + "px";
    item.style.top = rect.top + rect.height / 2 - item.offsetHeight / 2 + "px";

    item.addEventListener("transitionend", () => {
      zone1.appendChild(item);
      resetItemStyle();
    }, { once: true });
  }
});

// ===== Animiertes Verschieben (Button) =====
moveBtn.addEventListener("click", () => {
  if (isAnimating) return;
  isAnimating = true;
  moveBtn.disabled = true;

  const sourceZone = item.parentElement;
  const targetZone = sourceZone === zone1 ? zone2 : zone1;
  const itemRect = item.getBoundingClientRect();
  const targetRect = targetZone.getBoundingClientRect();
  const { deltaX, deltaY } = calculateDelta(itemRect, targetRect);

  // Erzeugen eines Ghost-Elements für die Animation
  const ghost = item.cloneNode(true);
  ghost.style.position = "fixed";
  ghost.style.left = itemRect.left + "px";
  ghost.style.top = itemRect.top + "px";
  ghost.style.margin = "0";
  ghost.style.zIndex = "1000";
  ghost.style.pointerEvents = "none";
  ghost.style.width = itemRect.width + "px";

  document.body.appendChild(ghost);
  sourceZone.removeChild(item);

  requestAnimationFrame(() => {
    ghost.style.transition = "transform 0.6s ease";
    ghost.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  });

  ghost.addEventListener("transitionend", () => {
    targetZone.appendChild(item);
    document.body.removeChild(ghost);
    scaleEffect();
    moveBtn.disabled = false;
    isAnimating = false;
  }, { once: true });
});

// Reset-Funktion: Bringt das Item in die erste Zone zurück
resetBtn.addEventListener("click", () => {
  zone1.appendChild(item);
});
