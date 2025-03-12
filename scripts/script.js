document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menuToggle");
    const menuOverlay = document.getElementById("menuOverlay");
    const closeMenu = document.getElementById("closeMenu");
    const menuItems = document.querySelectorAll(".menu-items li");

    menuToggle.addEventListener("click", () => {
        menuOverlay.classList.add("active");
        menuItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = "1";
                item.style.transform = "translateX(0)";
            }, 100 * index);
        });
    });

    closeMenu.addEventListener("click", () => {
        menuOverlay.classList.remove("active");
        menuItems.forEach((item) => {
            item.style.opacity = "0";
            item.style.transform = "translateX(-50px)";
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const hrElement = document.querySelector(".animated-hr");
    
    setTimeout(() => {
        hrElement.classList.add("active");
    }, 200); 
});

document.addEventListener("DOMContentLoaded",function(){
    const accordions = document.querySelectorAll(".accordian-header");

    accordions.forEach((header) => {
        header.addEventListener("click", function () {
            const content = this.nextElementSibling;
            const icon = this.querySelector(".icon");

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                icon.classList.remove("fa-minus");
                icon.classList.add("fa-plus");
            } else {
                document.querySelectorAll(".accordian-content").forEach((item) => {
                    item.style.maxHeight = null;
                });

                document.querySelectorAll(".icon").forEach((icon) => {
                    icon.classList.remove("fa-minus");
                    icon.classList.add("fa-plus");
                });

                content.style.maxHeight = content.scrollHeight + "px";
                icon.classList.remove("fa-plus");
                icon.classList.add("fa-minus");
            }
        });
    });  
})

document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider");
    const slideButton = document.querySelector(".slide-button");
    const sliderContainer = document.querySelector(".slider-container");

    if (!slider || !slideButton || !sliderContainer) {
        console.error("Error: Missing elements!");
        return;
    }

    let currentIndex = 0;
    let direction = 1;

    sliderContainer.addEventListener("mousemove", (e) => {
        const rect = sliderContainer.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        x = Math.max(25, Math.min(x, rect.width - 25));
        y = Math.max(25, Math.min(y, rect.height - 25));

        slideButton.style.left = `${x}px`;
        slideButton.style.top = `${y}px`;
    });

    slideButton.addEventListener("click", () => {
        const slides = document.querySelectorAll(".slide");
        if (slides.length === 0) {
            console.error("Error: No slides found!");
            return;
        }

        const slideWidth = slides[0].offsetWidth + 20; 
        const maxIndex = slides.length - 1;

        
        currentIndex += direction;

        if (currentIndex >= maxIndex) {
            direction = -1;
        } else if (currentIndex <= 0) {
            direction = 1;
        }

        slider.style.transform = `translateX(${-currentIndex * slideWidth}px)`;

        slideButton.querySelector("i").style.transform = direction === 1 ? "rotate(0deg)" : "rotate(180deg)";
    });
});





function expandHeader() {
    const hambergerIcon = document.getElementById("hamberger-icon");
    hambergerIcon.classList.toggle("hamberger-icon-expand");
  
    const headerSectionExpand = document.getElementById("header-section-expand");
    headerSectionExpand.classList.toggle("visible");
  
    const header = document.getElementsByTagName('header');
    console.log(header);
    header[0].classList.toggle('color-black');
}