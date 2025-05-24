document.addEventListener("DOMContentLoaded", () => {
    const popupMenu = document.getElementById("popupMenu1");
    const openButton = document.getElementById("firstOpen");
    const closeButton = document.getElementById("firstCloseMenu");

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