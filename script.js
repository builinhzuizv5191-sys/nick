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
        icon.textContent = item.classList.contains('active') ? '−' : '+';
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
// TIMEZONE DROPDOWN
const timezoneBox = document.getElementById('timezoneBox');
const timezoneDropdown = document.getElementById('timezoneDropdown');
const selectedTimezone = document.getElementById('selectedTimezone');

if (timezoneBox && timezoneDropdown && selectedTimezone) {
    timezoneBox.addEventListener('click', (e) => {
        e.stopPropagation();
        timezoneBox.classList.toggle('active');
    });

    timezoneDropdown.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            selectedTimezone.textContent = button.textContent;
            timezoneBox.classList.remove('active');
        });
    });

    document.addEventListener('click', () => {
        timezoneBox.classList.remove('active');
    });
}

// REAL LIMITED CALENDAR: CURRENT MONTH + NEXT MONTH ONLY
const calendarMonth = document.getElementById("calendarMonth");
const selectedDayText = document.getElementById("selectedDayText");
const calendarGrid = document.getElementById("calendarGrid");
const prevMonthBtn = document.getElementById("prevMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");
const selectedTimezoneText = document.getElementById("selectedTimezone");

let currentMonthOffset = 0; // 0 = current month, 1 = next month

function getTimezone() {
    if (!selectedTimezoneText) return "Asia/Rangoon";
    return selectedTimezoneText.textContent.split(" GMT")[0].trim();
}

function getTodayParts() {
    const timezone = getTimezone();

    const parts = new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        year: "numeric",
        month: "numeric",
        day: "numeric",
        weekday: "short"
    }).formatToParts(new Date());

    const data = {};
    parts.forEach(part => {
        data[part.type] = part.value;
    });

    return {
        year: Number(data.year),
        month: Number(data.month) - 1,
        day: Number(data.day),
        weekday: data.weekday
    };
}

function renderCalendar() {
    if (!calendarMonth || !calendarGrid) return;

    const today = getTodayParts();

    const displayDate = new Date(today.year, today.month + currentMonthOffset, 1);
    const displayYear = displayDate.getFullYear();
    const displayMonth = displayDate.getMonth();

    calendarMonth.textContent = displayDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
    });

    calendarGrid.innerHTML = "";

    const firstDay = new Date(displayYear, displayMonth, 1).getDay();
    const daysInMonth = new Date(displayYear, displayMonth + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement("span");
        empty.className = "empty-day";
        calendarGrid.appendChild(empty);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const btn = document.createElement("button");
        btn.className = "calendar-date";
        btn.textContent = day;

        const isToday =
            currentMonthOffset === 0 &&
            day === today.day;

        if (isToday) {
            btn.classList.add("selected");
            if (selectedDayText) {
                selectedDayText.textContent = `${today.weekday} ${today.day}`;
            }
        }

        btn.addEventListener("click", () => {
            document.querySelectorAll(".calendar-date").forEach(date => {
                date.classList.remove("selected");
            });

            btn.classList.add("selected");

            const clickedDate = new Date(displayYear, displayMonth, day);
            const weekday = clickedDate.toLocaleDateString("en-US", {
                weekday: "short"
            });

            if (selectedDayText) {
                selectedDayText.textContent = `${weekday} ${day}`;
            }
        });

        calendarGrid.appendChild(btn);
    }

    if (prevMonthBtn && nextMonthBtn) {
        prevMonthBtn.disabled = currentMonthOffset === 0;
        nextMonthBtn.disabled = currentMonthOffset === 1;

        prevMonthBtn.classList.toggle("active", currentMonthOffset === 1);
        nextMonthBtn.classList.toggle("active", currentMonthOffset === 0);
    }
}

if (prevMonthBtn && nextMonthBtn) {
    nextMonthBtn.addEventListener("click", () => {
        if (currentMonthOffset < 1) {
            currentMonthOffset = 1;
            renderCalendar();
        }
    });

    prevMonthBtn.addEventListener("click", () => {
        if (currentMonthOffset > 0) {
            currentMonthOffset = 0;
            renderCalendar();
        }
    });
}

renderCalendar();

// re-render calendar after timezone change
document.querySelectorAll(".timezone-dropdown button").forEach(button => {
    button.addEventListener("click", () => {
        setTimeout(renderCalendar, 50);
    });
});
// TIME SLOT SYSTEM
const timeSlotList = document.getElementById("timeSlotList");
const timeModeButtons = document.querySelectorAll(".time-mode");

let currentTimeMode = "12h";

function formatTime(hour, minute, mode) {
    if (mode === "24h") {
        return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
    }

    const suffix = hour >= 12 ? "pm" : "am";
    let displayHour = hour % 12;

    if (displayHour === 0) {
        displayHour = 12;
    }

    return `${displayHour}:${String(minute).padStart(2, "0")}${suffix}`;
}

function renderTimeSlots() {
    if (!timeSlotList) return;

    timeSlotList.innerHTML = "";

    for (let hour = 0; hour <= 21; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {

            if (hour === 21 && minute > 0) continue;

            const button = document.createElement("button");
            button.className = "time-slot";
            button.textContent = formatTime(hour, minute, currentTimeMode);

            timeSlotList.appendChild(button);
        }
    }
}

timeModeButtons.forEach(button => {
    button.addEventListener("click", () => {
        timeModeButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        currentTimeMode = button.textContent.trim();
        renderTimeSlots();
    });
});

renderTimeSlots();
// MESSAGE ME AFTER TIME SELECT
const bookingMessageBox = document.getElementById("bookingMessageBox");
const messageMeBtn = document.getElementById("messageMeBtn");

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("time-slot")) {
        if (bookingMessageBox) {
            bookingMessageBox.classList.remove("show-choices");
            bookingMessageBox.classList.add("show-message");
        }
    }
});

if (messageMeBtn) {
    messageMeBtn.addEventListener("click", () => {
        bookingMessageBox.classList.remove("show-message");
        bookingMessageBox.classList.add("show-choices");
    });
}
