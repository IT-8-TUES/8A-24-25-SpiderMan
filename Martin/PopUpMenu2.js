document.addEventListener("DOMContentLoaded", () => {
    const popupMenu = document.getElementById("popupMenuShoes");
    const openButton = document.getElementById("secondOpen");
    const closeButton = document.getElementById("secondCloseMenu");

    openButton.addEventListener("click", () => {
        popupMenu.style.display = "block";
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