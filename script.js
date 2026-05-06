const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
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
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {

        // close others
        faqItems.forEach(i => {
            if (i !== item) {
                i.classList.remove('active');
                i.querySelector('.faq-icon').textContent = '+';
            }
        });

        // toggle current
        item.classList.toggle('active');

        const icon = item.querySelector('.faq-icon');
        icon.textContent = item.classList.contains('active') ? '×' : '+';
    });
});
// CONTACT SCREEN
const mainSite = document.getElementById('main-site');
const contactScreen = document.getElementById('contactScreen');
const openContactButtons = document.querySelectorAll('.open-contact');

openContactButtons.forEach(button => {
    button.addEventListener('click', () => {
        mainSite.style.display = 'none';
        contactScreen.classList.add('active');
        history.pushState({ page: 'contact' }, '', '#contact');
        window.scrollTo(0, 0);
    });
});

window.addEventListener('popstate', () => {
    mainSite.style.display = 'block';
    contactScreen.classList.remove('active');
});
const backBtn = document.getElementById('backBtn');

backBtn.addEventListener('click', () => {
    mainSite.style.display = 'block';
    contactScreen.classList.remove('active');
    history.back();
});
