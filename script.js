document.addEventListener('DOMContentLoaded', () => {
    const monthYearElement = document.getElementById('monthYear');
    const calendarBody = document.querySelector('#calendar tbody');
    const prevMonthButton = document.getElementById('prevMonth');
    const nextMonthButton = document.getElementById('nextMonth');

    let currentYear = 2024;
    let currentMonth = new Date().getMonth();

    const holidays = {
        '1-1': '元日',
        '2-11': '建国記念の日',
        '4-29': '昭和の日',
        '5-3': '憲法記念日',
        '5-4': 'みどりの日',
        '5-5': 'こどもの日',
        '10-14': 'スポーツの日',
        '11-3': '文化の日',
        '11-23': '勤労感謝の日',
        '12-23': '天皇誕生日'
    };

    function updateCalendar(year, month) {
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        monthYearElement.textContent = `${year}年 ${month + 1}月`;

        calendarBody.innerHTML = '';
        let row = document.createElement('tr');
        for (let i = 0; i < firstDay; i++) {
            row.appendChild(document.createElement('td'));
        }

        for (let day = 1; day <= daysInMonth; day++) {
            if (row.children.length === 7) {
                calendarBody.appendChild(row);
                row = document.createElement('tr');
            }
            const cell = document.createElement('td');
            cell.textContent = day;

            const holidayKey = `${month + 1}-${day}`;
            if (holidays[holidayKey]) {
                cell.style.color = 'red';
                cell.title = holidays[holidayKey];
            }

            cell.addEventListener('click', () => {
                const utterance = new SpeechSynthesisUtterance(day.toString());
                utterance.lang = 'zh-CN';
                speechSynthesis.speak(utterance);
            });
            row.appendChild(cell);
        }

        if (row.children.length > 0) {
            calendarBody.appendChild(row);
        }
    }

    prevMonthButton.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar(currentYear, currentMonth);
    });

    nextMonthButton.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar(currentYear, currentMonth);
    });

    // 年月をクリックしたときに音声を再生するイベントリスナーを追加
    monthYearElement.addEventListener('click', () => {
        const utterance = new SpeechSynthesisUtterance(monthYearElement.textContent);
        utterance.lang = 'zh-CN';
        speechSynthesis.speak(utterance);
    });

    // 曜日をクリックしたときに音声を再生するイベントリスナーを追加
    document.querySelectorAll('#calendar th').forEach(th => {
        th.addEventListener('click', () => {
            const utterance = new SpeechSynthesisUtterance(th.textContent);
            utterance.lang = 'zh-CN';
            speechSynthesis.speak(utterance);
        });
    });

    updateCalendar(currentYear, currentMonth);
});
