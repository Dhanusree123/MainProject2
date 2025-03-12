
    document.addEventListener("DOMContentLoaded", function () {
        const menuButton = document.querySelector(".menu-button");
        const menuIcon = menuButton.querySelector("i");
        const menu = document.querySelector(".menu");

        menuButton.addEventListener("click", function () {
            menu.classList.toggle("open");
            menuButton.classList.toggle("open");

            if (menu.classList.contains("open")) {
                menuIcon.classList.replace("fa-bars", "fa-x");
            } else {
                menuIcon.classList.replace("fa-x", "fa-bars");
            }
        });
    });
