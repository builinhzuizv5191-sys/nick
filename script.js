document.addEventListener("DOMContentLoaded", () => {

    /* COUNTER ANIMATION */
    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        let count = 0;

        const updateCount = () => {
            const difference = target - count;

            let speed;

            if (target <= 200) {
                speed = 20;
            } else if (target <= 10000) {
                speed = 14;
            } else {
                speed = 10;
            }

            const increment = difference / speed;

            if (difference > 1) {
                count += increment;
                counter.innerText = Math.floor(count).toLocaleString();
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };

        updateCount();
    });


    /* FAQ ACCORDION */
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        const icon = item.querySelector(".faq-icon");

        if (!question) return;

        question.addEventListener("click", () => {

            const isActive = item.classList.contains("active");

            faqItems.forEach(i => {
                i.classList.remove("active");

                const otherIcon = i.querySelector(".faq-icon");
                if (otherIcon) {
                    otherIcon.textContent = "+";
                }
            });

            if (!isActive) {
                item.classList.add("active");

                if (icon) {
                    icon.textContent = "×";
                }
            }
        });
    });


    /* CONTACT SCREEN */
    const mainSite = document.getElementById("main-site");
    const contactScreen = document.getElementById("contactScreen");
    const backBtn = document.getElementById("backBtn");
    const openContactButtons = document.querySelectorAll(".open-contact");

    function openContactScreen() {
        if (!mainSite || !contactScreen) return;

        mainSite.style.display = "none";
        contactScreen.classList.add("active");
        window.scrollTo(0, 0);
    }

    function closeContactScreen() {
        if (!mainSite || !contactScreen) return;

        contactScreen.classList.remove("active");
        mainSite.style.display = "block";
        window.scrollTo(0, 0);
    }

    openContactButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();

            const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove("active");
            }

            openContactScreen();
        });
    });

    if (backBtn) {
        backBtn.addEventListener("click", () => {
            closeContactScreen();
        });
    }


    /* MOBILE MENU */
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileCloseBtn = document.getElementById("mobileCloseBtn");
    const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");

    if (mobileMenuBtn && mobileMenuOverlay) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileMenuOverlay.classList.add("active");
        });
    }

    if (mobileCloseBtn && mobileMenuOverlay) {
        mobileCloseBtn.addEventListener("click", () => {
            mobileMenuOverlay.classList.remove("active");
        });
    }

    document.querySelectorAll(".mobile-menu-links a").forEach(link => {
        link.addEventListener("click", () => {
            if (mobileMenuOverlay) {
                mobileMenuOverlay.classList.remove("active");
            }
        });
    });

});
