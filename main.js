let startDate = new Date(2020, 11, 31);
const yearArr = Array(365).fill("");
let buttonDate = { fullDate: new Date() };
buttonDate.fullDate.setHours(00, 00, 00, 00);
let newArr = [];
let divArr = [];
//JSON.parse(localStorage.getItem("calendar")) ||
let defaultMonth = buttonDate.fullDate.getMonth();
let defaultYear = startDate.getFullYear() + 1;

const calendarContainer = document.querySelector(".calendar-container");
const monthContainer = document.querySelector(".month-container");
const monthText = document.querySelector(".render-month-text");
const leftArrowButton = document.querySelector("#left-arrow-btn");
const rightArrowButton = document.querySelector("#right-arrow-btn");
const yearText = document.querySelector(".render-year-text");

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
const sidebarContainer = document.querySelector("sidebar-container");
const holidaypreviewContainer = document.querySelector(
  ".holidaypreview-container"
);
const taskpreviewContainer = document.querySelector(".taskpreview-container");

function fillDates(arr) {
  newArr = [];
  arr.map((item, idx) => {
    newArr.push({
      fullDate: new Date(startDate.setDate(startDate.getDate() + 1)),
      idx: idx,
      tasklist: [],
    });
  });
  localStorage.setItem(defaultYear, JSON.stringify(newArr));
}
function getData() {
  if (!localStorage[defaultYear]) {
    fillDates(yearArr);
    fetchHolidays(newArr);
    renderCalendar(newArr, defaultMonth, defaultYear);
  } else {
    newArr = JSON.parse(localStorage[defaultYear]);
    newArr.map((date) => (date.fullDate = new Date(date.fullDate)));
    renderCalendar(newArr, defaultMonth, defaultYear);
  }
}
getData();

function renderCalendar(arr, month, year) {
  monthContainer.innerHTML = `<p>MON</p>
  <p>TUE</p>
  <p>WED</p>
  <p>THUR</p>
  <p>FRI</p>
  <p>SAT</p>
  <p>SUN</p>`;
  holidaypreviewContainer.innerHTML = ``;
  taskpreviewContainer.innerHTML = ``;
  arr.map((date, idx) => {
    if (
      month === date.fullDate.getMonth() &&
      year === date.fullDate.getFullYear()
    ) {
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
        dateContainer.classList.add("holiday");
      }

      monthPreview(date);

      setDay(date.fullDate.getDay(), dateContainer);
      dateContainer.addEventListener("click", () => showDate(date));
      monthContainer.appendChild(dateContainer);
      //appendMonths(date.getUTCMonth(), dateContainer);
      monthText.innerHTML = new Intl.DateTimeFormat("en-US", {
        month: "long",
      }).format(buttonDate.fullDate);
      yearText.innerHTML = `-${defaultYear}`;
      showDate(buttonDate, dateContainer);
    }
  });
  if (holidaypreviewContainer.childElementCount === 0) {
    console.log(holidaypreviewContainer.childElementCount);
    holidaypreviewContainer.innerHTML = `<strong>No holidays this month, sorry.</strong>`;
  }
  if (taskpreviewContainer.childElementCount === 0) {
    taskpreviewContainer.innerHTML = `<strong>No tasks this month, nice, enjoy your free time.</strong>`;
  }
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
    if (defaultMonth === 0) {
      startDate = new Date(defaultYear - 2, 11, 31);
      defaultYear--;
      defaultMonth = 11;
      getData();
      let displayDate = new Date();
      displayDate.setUTCMonth(defaultMonth);
      monthText.innerHTML = new Intl.DateTimeFormat("en-US", {
        month: "long",
      }).format(displayDate);
      return;
    }
    defaultMonth--;
    renderCalendar(newArr, defaultMonth, defaultYear);
    let displayDate = new Date();
    displayDate.setUTCMonth(defaultMonth);
    monthText.innerHTML = new Intl.DateTimeFormat("en-US", {
      month: "long",
    }).format(displayDate);
  }
  if (side === "right") {
    if (defaultMonth === 11) {
      startDate = new Date(defaultYear, 11, 31);
      defaultYear++;
      defaultMonth = 0;
      getData();
      let displayDate = new Date();
      displayDate.setUTCMonth(defaultMonth);
      monthText.innerHTML = new Intl.DateTimeFormat("en-US", {
        month: "long",
      }).format(displayDate);
      return;
    } else {
      defaultMonth++;
      renderCalendar(newArr, defaultMonth, defaultYear);
      let displayDate = new Date();
      displayDate.setUTCMonth(defaultMonth);
      monthText.innerHTML = new Intl.DateTimeFormat("en-US", {
        month: "long",
      }).format(displayDate);
    }
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

function monthPreview(date) {
  if (date.holiday) {
    let displayContainer = document.createElement("div");
    displayContainer.innerHTML = `<p>${date.fullDate.toLocaleDateString(
      "en-US",
      { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    )}</p>
    <strong>${date.holidayName}</strong>`;
    displayContainer.classList.add("holiday-preview-text");
    holidaypreviewContainer.appendChild(displayContainer);
  }
  if (date.tasklist) {
    date.tasklist.forEach((task) => {
      let displayContainer = document.createElement("div");
      displayContainer.innerHTML = `<p>${date.fullDate.toLocaleDateString(
        "en-US",
        { weekday: "long", year: "numeric", month: "long", day: "numeric" }
      )}</p>
      <strong>${task}</strong>`;
      displayContainer.classList.add("task-preview-text");
      taskpreviewContainer.appendChild(displayContainer);
    });
  }
}

function showDate(date, container) {
  divArr.push(container);
  const { fullDate, idx, tasklist } = date;
  dayText.innerHTML = fullDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  //openPopup(date);
  holidayText.innerHTML = date.holidayName || "";
  buttonDate = date;
  renderTasklist(date);
}

function addTask(date) {
  date.tasklist.push(taskTextArea.value);
  taskTextArea.value = "";
  renderTasklist(date);
  renderCalendar(newArr, defaultMonth, defaultYear);
  localStorage.setItem(defaultYear, JSON.stringify(newArr));
}

/*function openPopup(date) {
  let window = document.createElement("div");
  window.style =
    "position:fixed;top:0;left:0;width:15vw;height:30vh;background:white;transform:translate(calc(50vw - 50%), calc(50vh - 50%))";
  window.innerHTML = "NAZDARZ";
  document.querySelector(".display-container").appendChild(window);
  setTimeout(() => {
    // hide after three seconds
    window.remove();
  }, 3000);
}
*/

function renderTasklist(date) {
  tasklistContainer.innerHTML = " ";
  if (date.tasklist) {
    date.tasklist.map((task, idx) => {
      const taskItem = document.createElement("li");
      const deleteBtbn = document.createElement("button");
      const completeBtn = document.createElement("button");
      deleteBtbn.addEventListener("click", () => deleteTask(date, idx));
      completeBtn.addEventListener("click", () => completeTask(date));
      deleteBtbn.innerHTML = `<i class="fas fa-trash-alt task-delete">`;
      completeBtn.innerHTML = `</i><i class="fas fa-check-square task-complete">`;
      taskItem.innerHTML = `${task}`;
      taskItem.appendChild(deleteBtbn);
      taskItem.appendChild(completeBtn);
      tasklistContainer.appendChild(taskItem);
    });
  }
}

function deleteTask(date, idx) {
  date.tasklist.splice(idx, 1);
  renderTasklist(date);
  renderCalendar(newArr, defaultMonth, defaultYear);
}

function completeTask(date) {
  console.log(date);
}

function fetchHolidays(arr) {
  const publicHolidays = [
    {
      fullDate: new Date(defaultYear, 0, 1, 00, 0, 00, 00),
      name: "Deň obnovy samostatného Českého štátu, Nový rok - štátny sviatok",
    },
    {
      fullDate: new Date(defaultYear, 3, 5, 00, 0, 00, 00),
      name: "Veľkonočný pondelok - deň pracovného pokoja",
    },
    {
      fullDate: new Date(defaultYear, 4, 1, 00, 0, 00, 00),
      name: "Sviatok práce - deň pracovného pokoja",
    },
    {
      fullDate: new Date(defaultYear, 4, 8, 00, 0, 00, 00),
      name: "Deň oslobodenia od fašizmu - 1945 - štátny sviatok",
    },
    {
      fullDate: new Date(defaultYear, 6, 5, 00, 0, 00, 00),
      name: "Deň slovanských vierozvestov Cyrila a Metoda - štátny sviatok",
    },
    {
      fullDate: new Date(defaultYear, 6, 6, 00, 0, 00, 00),
      name: "Deň upálenia majstra Jana Husa - 1415 - štátny sviatok",
    },
    {
      fullDate: new Date(defaultYear, 8, 28, 00, 0, 00, 00),
      name: "Deň Českej štátnosti - štátny sviatok",
    },
    {
      fullDate: new Date(defaultYear, 9, 28, 00, 0, 00, 00),
      name: "Deň vzniku samostatného Československého štátu - 1918 - štátny sviatok",
    },
    {
      fullDate: new Date(defaultYear, 10, 17, 00, 0, 00, 00),
      name: "Deň boja za slobodu a demokraciu - 1989 - štátny sviatok",
    },
    {
      fullDate: new Date(defaultYear, 11, 24, 00, 0, 00, 00),
      name: "Štedrý deň - deň pracovného pokoja",
    },
    {
      fullDate: new Date(defaultYear, 11, 25, 00, 0, 00, 00),
      name: "1.sviatok Vianočný - deň pracovného pokoja",
    },
    {
      fullDate: new Date(defaultYear, 11, 26, 00, 0, 00, 00),
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
  localStorage.setItem(defaultYear, JSON.stringify(newArr));
}

// = { ...date, holiday: true };
