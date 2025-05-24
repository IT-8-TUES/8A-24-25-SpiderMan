document.addEventListener("DOMContentLoaded", () => {
    const popupMenu = document.getElementById("popupMenu2");
    const openButton = document.getElementById("secondOpen");
    const closeButton = document.getElementById("secondCloseMenu");

    openButton.addEventListener("click", () => {
        popupMenu.style.display = "flex";
    });

    closeButton.addEventListener("click", () => {
        popupMenu.style.display = "none";
    });

    document.addEventListener("click", (event) => {
        if (!popupMenu.contains(event.target) && event.target !== openButton) {
            popupMenu.style.display = "none";
        }
    });
});