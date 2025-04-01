import { showToast } from "vant";
import _ from "lodash";

export function copyToClipboard(text) {
    if (!text) return;

    navigator.clipboard.writeText(text);
    showToast("Copied to clipboard");
}

export function handlePwdInput() {
    document.querySelectorAll(".pwd-input-group").forEach((item) => {
        handleTogglePassword(item);
    });
}

export function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
}

export function isValidUrl(string) {
    try {
        new URL(string); // Attempt to create a URL object
        return true;
    } catch (_) {
        return false; // If an error is thrown, it's not a valid URL
    }
}

export function formatJsonToPrint(json, showKeys = false) {
    return Object.entries(json)
        .map(([key, value]) => {
            // Si la valeur est un objet ou un tableau, la convertir en chaîne JSON
            if (typeof value === "object" && value !== null) {
                value = JSON.stringify(value, null, 2);
            }
            return `<p><b>${showKeys ? key + ":" : "●"}</b> ${value}</p>`;
        })
        .join("\n"); // Retour à la ligne entre les paires clé/valeur
}

export function paginate(items, itemsPerPage = 10) {
    var paginatedItems = [];

    try {
        const totalItems = Object.keys(items).length;

        for (let i = 0; i < totalItems; i += itemsPerPage) {
            paginatedItems.push(
                Object.values(items).slice(i, i + itemsPerPage)
            );
        }
    } catch (e) {
        console.log(e);
    }

    return paginatedItems;
}

export function getSeverity(status, type = "vant") {
    switch (status) {
        case "pending":
            return "warning";
        case "approved":
            return "success";
        case "completed":
            return "success";
        case "rejected":
            return "danger";
        case "processing":
            return "primary";
        case "canceled":
            return "danger";
        case "unread":
            return "danger";
        case "readed":
            return "success";
        default:
            return "null";
    }
}

export function findFirstParentWithClass(element, className) {
    let currentElement = element;

    while (currentElement.parentElement) {
        currentElement = currentElement.parentElement;
        if (currentElement.classList.contains(className)) {
            return currentElement; // Return the first parent with the specified class
        }
    }

    return null; // Return null if no parent with the class is found
}

export function findParentWithOverflowY(element) {
    let currentElement = element;

    while (currentElement.parentElement) {
        currentElement = currentElement.parentElement;

        // Récupère les styles calculés de l'élément
        const style = window.getComputedStyle(currentElement);

        // Vérifie si overflow-y est défini à "auto"
        if (style.overflowY === "auto" || style.overflowY === "scroll") {
            return currentElement;
        }
    }

    // Retourne null si aucun parent avec overflow-y: auto n'est trouvé
    return null;
}

export function scrollToPosition(targetY, duration, element = null) {
    const currentElement = element || window;
    const isWindow = currentElement === window;

    const start = isWindow ? window.scrollY : currentElement.scrollTop; // Position actuelle
    const change = targetY - start; // Différence entre la position cible et la position actuelle
    const startTime = performance.now(); // Temps de début

    function animateScroll(timestamp) {
        const elapsed = timestamp - startTime; // Temps écoulé
        const progress = Math.min(elapsed / duration, 1); // Pourcentage du chemin parcouru

        // Easing function (easeInOutQuad)
        const easing =
            progress < 0.5
                ? 2 * progress * progress
                : -1 + (4 - 2 * progress) * progress;

        const newPosition = start + change * easing; // Nouvelle position calculée

        if (isWindow) {
            window.scrollTo(0, newPosition); // Défilement pour `window`
        } else {
            currentElement.scrollTop = newPosition; // Défilement pour un élément spécifique
        }

        if (progress < 1) {
            window.requestAnimationFrame(animateScroll); // Continuer l'animation
        }
    }

    window.requestAnimationFrame(animateScroll); // Démarrer l'animation
}
