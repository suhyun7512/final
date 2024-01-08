document.addEventListener("DOMContentLoaded", function() {  
    const introduction = document.querySelector(".introduction");
    const carousel = document.querySelector(".introduction-carousel");
    const firstCardWidth = carousel.querySelector(".introduction-card").offsetWidth;
    const arrowBtns = document.querySelectorAll(".introduction i");
    const carouselChildrens = [...carousel.children];

    let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    carouselChildrens.slice(0, cardPerView).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");

    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
        });
    });

    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    }

    const dragging = (e) => {
        if(!isDragging) return;
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    }

    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    }

    const infiniteScroll = () => {
        if(carousel.scrollLeft === 0) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
            carousel.classList.remove("no-transition");
        }
        else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }

        clearTimeout(timeoutId);
        if(!introduction.matches(":hover")) autoPlay();
    }

    const autoPlay = () => {
        if(window.innerWidth < 800 || !isAutoPlay) return; 

    }
    autoPlay();

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);
    introduction.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    introduction.addEventListener("mouseleave", autoPlay);
});






document.addEventListener("DOMContentLoaded", function() {  
    const introduction1 = document.querySelector(".introduction1");
    const carousel1 = document.querySelector(".introduction1-carousel");
    const firstCardWidth1 = carousel1.querySelector(".introduction1-card").offsetWidth;
    const arrowBtns1 = document.querySelectorAll(".introduction1 i");
    const carouselChildrens1 = [...carousel1.children];

    let isDragging1 = false, isAutoPlay1 = true, startX1, startScrollLeft1, timeoutId1;

    let cardPerView1 = Math.round(carousel1.offsetWidth / firstCardWidth1);

    carouselChildrens1.slice(-cardPerView1).reverse().forEach(card => {
        carousel1.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    carouselChildrens1.slice(0, cardPerView1).forEach(card => {
        carousel1.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    carousel1.classList.add("no-transition");
    carousel1.scrollLeft = carousel1.offsetWidth;
    carousel1.classList.remove("no-transition");

    arrowBtns1.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel1.scrollLeft += btn.id == "left1" ? -firstCardWidth1 : firstCardWidth1;
        });
    });

    const dragStart1 = (e) => {
        isDragging1 = true;
        carousel1.classList.add("dragging1");
        startX1 = e.pageX;
        startScrollLeft1 = carousel1.scrollLeft;
    }

    const dragging1 = (e) => {
        if(!isDragging1) return;
        carousel1.scrollLeft = startScrollLeft1 - (e.pageX - startX1);
    }

    const dragStop1 = () => {
        isDragging1 = false;
        carousel1.classList.remove("dragging1");
    }

    const infiniteScroll1 = () => {
        if(carousel1.scrollLeft === 0) {
            carousel1.classList.add("no-transition");
            carousel1.scrollLeft = carousel1.scrollWidth - (2 * carousel1.offsetWidth);
            carousel1.classList.remove("no-transition");
        }
        else if(Math.ceil(carousel1.scrollLeft) === carousel1.scrollWidth - carousel1.offsetWidth) {
            carousel1.classList.add("no-transition");
            carousel1.scrollLeft = carousel1.offsetWidth;
            carousel1.classList.remove("no-transition");
        }

        clearTimeout(timeoutId1);
        if(!introduction1.matches(":hover")) autoPlay1();
    }

    const autoPlay1 = () => {
        if(window.innerWidth < 800 || !isAutoPlay1) return; 
        // Your autoPlay logic here
    }
    autoPlay1();

    carousel1.addEventListener("mousedown", dragStart1);
    carousel1.addEventListener("mousemove", dragging1);
    document.addEventListener("mouseup", dragStop1);
    carousel1.addEventListener("scroll", infiniteScroll1);
    introduction1.addEventListener("mouseenter", () => clearTimeout(timeoutId1));
    introduction1.addEventListener("mouseleave", autoPlay1);
});



