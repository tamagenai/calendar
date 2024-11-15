document.addEventListener('DOMContentLoaded', function() {
    const calendar = document.getElementById('calendar').getElementsByTagName('tbody')[0];
    const monthYear = document.getElementById('monthYear');
    const prevMonth = document.getElementById('prevMonth');
    const nextMonth = document.getElementById('nextMonth');
    const eventForm = document.getElementById('eventForm');
    const events = {};

    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();

    function generateCalendar(year, month) {
        calendar.innerHTML = '';
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        monthYear.textContent = `${year}年 ${month + 1}月`;
        let row = document.createElement('tr');
        for (let i = 0; i < firstDay; i++) {
            row.appendChild(document.createElement('td'));
        }
        for (let date = 1; date <= lastDate; date++) {
            if (row.children.length === 7) {
                calendar.appendChild(row);
                row = document.createElement('tr');
            }
            const cell = document.createElement('td');
            cell.textContent = date;
            const eventKey = `${year}-${month + 1}-${date}`;
            if (events[eventKey]) {
                const eventDiv = document.createElement('div');
                eventDiv.textContent = events[eventKey];
                cell.appendChild(eventDiv);
            }
            row.appendChild(cell);
        }
        calendar.appendChild(row);
    }

    function addEvent(event) {
        event.preventDefault();
        const date = new Date(eventForm.eventDate.value);
        const time = eventForm.eventTime.value;
        const description = eventForm.eventDescription.value;
        const eventKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        events[eventKey] = `${time} - ${description}`;
        generateCalendar(currentYear, currentMonth);
    }

    eventForm.addEventListener('submit', addEvent);
    prevMonth.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar(currentYear, currentMonth);
    });
    nextMonth.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar(currentYear, currentMonth);
    });

    generateCalendar(currentYear, currentMonth);
});
