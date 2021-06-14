const startDate = new Date("December 31, 2020");
const yearArr = Array(365).fill("");
let buttonDate = { fullDate: new Date() };
buttonDate.fullDate.setHours(00, 00, 00, 00);
let newArr = [];
//JSON.parse(localStorage.getItem("calendar")) ||
let defaultMonth = buttonDate.fullDate.getMonth();

const calendarContainer = document.querySelector(".calendar-container");
const monthContainer = document.querySelector(".month-container");
const monthText = document.querySelector(".render-month-text");
const leftArrowButton = document.querySelector("#left-arrow-btn");
const rightArrowButton = document.querySelector("#right-arrow-btn");

//MONTHS - CONTAINERS

const januaryContainer = document.querySelector(".january-container");
const februaryContainer = document.querySelector(".february-container");
const marchContainer = document.querySelector(".march-container");
const aprilContainer = document.querySelector(".april-container");
const mayContainer = document.querySelector(".may-container");
const juneContainer = document.querySelector(".june-container");
const julyContainer = document.querySelector(".july-container");
const augustContainer = document.querySelector(".august-container");
const septemberContainer = document.querySelector(".september-container");
const octoberContainer = document.querySelector(".october-container");
const novemberContainer = document.querySelector(".november-container");
const decemberContainer = document.querySelector(".december-container");

//DAILY PART
const dayText = document.querySelector(".day-text");
const tasklistContainer = document.querySelector(".tasklist-container");
const addTaskBtn = document.querySelector("#add-task-btn");
const taskTextArea = document.querySelector("#task-text-area");
const holidayText = document.querySelector(".holiday-text");

function fillDates(arr) {
  arr.map((item, idx) => {
    newArr.push({
      fullDate: new Date(startDate.setDate(startDate.getDate() + 1)),
      idx: idx,
      tasklist: [],
    });
  });
  localStorage.setItem("calendar", JSON.stringify(newArr));
}

if (!localStorage.calendar) {
  fillDates(yearArr);
  fetchHolidays(newArr);
  renderCalendar(newArr, defaultMonth);
} else {
  newArr = JSON.parse(localStorage.calendar);
  newArr.map((date) => (date.fullDate = new Date(date.fullDate)));
  renderCalendar(newArr, defaultMonth);
}

function renderCalendar(arr, month) {
  monthContainer.innerHTML = `<p>MON</p>
  <p>TUE</p>
  <p>WED</p>
  <p>THUR</p>
  <p>FRI</p>
  <p>SAT</p>
  <p>SUN</p>`;
  console.log(arr);
  arr.map((date, idx) => {
    if (month === date.fullDate.getMonth()) {
      let dateContainer = document.createElement("div");

      dateContainer.innerHTML = `<strong>${date.fullDate.getDate()}</strong>`;
      dateContainer.classList.add(
        date.fullDate.getMonth(),
        date.fullDate.getDay(),
        "date-container"
      );
      //ADD TASK CLASS
      if (date.tasklist.length) {
        dateContainer.classList.add("task");
      }
      //ADD HOLIDAY CLASS
      if (date.holiday) {
        console.log("Vajicko?");
        dateContainer.classList.add("holiday");
      }
      //console.log(date);
      setDay(date.fullDate.getDay(), dateContainer);
      dateContainer.addEventListener("click", () => showDate(date));
      monthContainer.appendChild(dateContainer);
      //appendMonths(date.getUTCMonth(), dateContainer);
      monthText.innerHTML = new Intl.DateTimeFormat("en-US", {
        month: "long",
      }).format(buttonDate.fullDate);
      showDate(buttonDate);
    }
  });

  newArr.filter((date, idx) => {
    date.fullDate.getTime() === buttonDate.fullDate.getTime()
      ? (buttonDate = date)
      : "";
  });
}

//EVENT LISTENERS
leftArrowButton.addEventListener("click", () => pickMonth("left"));
rightArrowButton.addEventListener("click", () => pickMonth("right"));
addTaskBtn.addEventListener("click", () => addTask(buttonDate));

function pickMonth(side) {
  if (side === "left") {
    if (defaultMonth === 0) return;
    defaultMonth--;
    renderCalendar(newArr, defaultMonth);
    let displayDate = new Date();
    displayDate.setUTCMonth(defaultMonth);
    monthText.innerHTML = new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(displayDate);
  }
  if (side === "right") {
    if (defaultMonth === 11) return;
    defaultMonth++;
    renderCalendar(newArr, defaultMonth);
    let displayDate = new Date();
    displayDate.setUTCMonth(defaultMonth);
    monthText.innerHTML = new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(displayDate);
  }
}

function appendMonths(month, date) {
  switch (month) {
    case 0:
      januaryContainer.appendChild(date);
      break;
    case 1:
      februaryContainer.appendChild(date);
      break;
    case 2:
      marchContainer.appendChild(date);
      break;
    case 3:
      aprilContainer.appendChild(date);
      break;
    case 4:
      mayContainer.appendChild(date);
      break;
    case 5:
      juneContainer.appendChild(date);
      break;
    case 6:
      julyContainer.appendChild(date);
      break;
    case 7:
      augustContainer.appendChild(date);
      break;
    case 8:
      septemberContainer.appendChild(date);
      break;
    case 9:
      octoberContainer.appendChild(date);
      break;
    case 10:
      novemberContainer.appendChild(date);
      break;
    case 11:
      decemberContainer.appendChild(date);
      break;
    default:
      break;
  }
}

function setDay(day, div) {
  switch (day) {
    case 1:
      div.style.gridColumn = "mon / span 1";
      div.style.gridRow = "auto";
      break;
    case 2:
      div.style.gridColumn = "tue / span 1";
      div.style.gridRow = "auto";
      break;
    case 3:
      div.style.gridColumn = "wed / span 1";
      div.style.gridRow = "auto";
      break;
    case 4:
      div.style.gridColumn = "thur / span 1";
      div.style.gridRow = "auto";
      break;
    case 5:
      div.style.gridColumn = "fri / span 1";
      div.style.gridRow = "auto";
      break;
    case 6:
      div.style.gridColumn = "sat / span 1";
      div.style.gridRow = "auto";
      break;
    case 0:
      div.style.gridColumn = "sun / span 1";
      div.style.gridRow = "auto";
      break;
    default:
      break;
  }
}

function showDate(date) {
  const { fullDate, idx, tasklist } = date;
  dayText.innerHTML = fullDate.toLocaleDateString("us-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  if (date.holidayName) {
    holidayText.innerHTML = date.holidayName;
  }
  buttonDate = date;
  renderTasklist(date);
}

function addTask(date) {
  date.tasklist.push(taskTextArea.value);
  taskTextArea.value = "";
  renderTasklist(date);
  renderCalendar(newArr, defaultMonth);
}

function renderTasklist(date) {
  tasklistContainer.innerHTML = " ";
  if (date.tasklist) {
    date.tasklist.map((task) => {
      const taskItem = document.createElement("li");
      taskItem.innerHTML = task;
      tasklistContainer.appendChild(taskItem);
    });
  }
}

function fetchHolidays(arr) {
  const publicHolidays = [
    {
      fullDate: new Date(2021, 0, 1, 00, 0, 00, 00),
      name: "Deň obnovy samostatného Českého štátu, Nový rok - štátny sviatok",
    },
    {
      fullDate: new Date(2021, 3, 5, 00, 0, 00, 00),
      name: "Veľkonočný pondelok - deň pracovného pokoja",
    },
    {
      fullDate: new Date(2021, 4, 1, 00, 0, 00, 00),
      name: "Sviatok práce - deň pracovného pokoja",
    },
    {
      fullDate: new Date(2021, 4, 8, 00, 0, 00, 00),
      name: "Deň oslobodenia od fašizmu - 1945 - štátny sviatok",
    },
    {
      fullDate: new Date(2021, 6, 5, 00, 0, 00, 00),
      name: "Deň slovanských vierozvestov Cyrila a Metoda - štátny sviatok",
    },
    {
      fullDate: new Date(2021, 6, 6, 00, 0, 00, 00),
      name: "Deň upálenia majstra Jana Husa - 1415 - štátny sviatok",
    },
    {
      fullDate: new Date(2021, 8, 28, 00, 0, 00, 00),
      name: "Deň Českej štátnosti - štátny sviatok",
    },
    {
      fullDate: new Date(2021, 9, 28, 00, 0, 00, 00),
      name: "Deň vzniku samostatného Československého štátu - 1918 - štátny sviatok",
    },
    {
      fullDate: new Date(2021, 10, 17, 00, 0, 00, 00),
      name: "Deň boja za slobodu a demokraciu - 1989 - štátny sviatok",
    },
    {
      fullDate: new Date(2021, 11, 24, 00, 0, 00, 00),
      name: "Štedrý deň - deň pracovného pokoja",
    },
    {
      fullDate: new Date(2021, 11, 25, 00, 0, 00, 00),
      name: "1.sviatok Vianočný - deň pracovného pokoja",
    },
    {
      fullDate: new Date(2021, 11, 26, 00, 0, 00, 00),
      name: "2.sviatok Vianočný - deň pracovného pokoja",
    },
  ];

  for (const holiday of publicHolidays) {
    arr.map((date, idx) => {
      if (date.fullDate.getTime() === holiday.fullDate.getTime()) {
        Object.assign(date, { holiday: true, holidayName: holiday.name });
      }
    });
  }
  localStorage.setItem("calendar", JSON.stringify(newArr));
}

// = { ...date, holiday: true };
