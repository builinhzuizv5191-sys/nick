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
