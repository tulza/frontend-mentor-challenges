const dateInput = document.getElementsByClassName("date-input");
const calcDate = document.getElementsByClassName("calc-date");
const ErrorDisplay = document.getElementsByClassName("Error-display");
const dateLabel = document.getElementsByClassName("date-label");

const day = dateInput[0];
const month = dateInput[1];
const year = dateInput[2];

const log_all_input = () => {
  const dayValue = parseInt(day.value);
  const monthValue = parseInt(month.value);
  const yearValue = parseInt(year.value);

  console.log(dayValue, monthValue, yearValue);
};
const clearError = () => {
  for (let i = 0; i < ErrorDisplay.length; i++) {
    ErrorDisplay[i].innerHTML = "";
    dateLabel[i].style.color = "hsl(0, 1%, 44%)";
    dateInput[i].style.outline = "1px solid hsl(0, 0%, 86%)";
  }
};

const get_time = () => {
  try {
    clearError();
    const currTime = new Date();
    let hasError = false;
    const dayValue = parseInt(day.value);
    const monthValue = parseInt(month.value);
    const yearValue = parseInt(year.value);

    // log_all_input();

    for (let i = 0; i < dateInput.length; i++) {
      dateValue = dateInput[i].value;
      localError = false;
      if (isNaN(parseInt(dateValue))) {
        hasError = true;
        localError = true;
        ErrorDisplay[i].innerHTML = "This field is required";
      }
      if (i == 0 && (1 > dateValue || dateValue > 31)) {
        hasError = true;
        localError = true;
        ErrorDisplay[i].innerHTML = "Must be a valid day";
      }
      if (i == 1 && (1 > dateValue || dateValue > 12)) {
        hasError = true;
        localError = true;
        ErrorDisplay[i].innerHTML = "Must be a valid month";
      }
      if (i == 2 && new Date().getFullYear() < dateValue) {
        hasError = true;
        localError = true;
        ErrorDisplay[i].innerHTML = "Must be in the past";
      }

      if (localError) {
        dateLabel[i].style.color = "hsl(0, 100%, 67%)";
        dateInput[i].style.outline = "1px solid hsl(0, 100%, 67%)";
      }
    }

    if (hasError) {
      throw new Error("Input Error");
    }
    // check for invalid date
    else if (new Date(yearValue, monthValue, 0).getDate() < dayValue) {
      for (let i = 0; i < dateInput.length; i++) {
        dateInput[i].style.outline = "1px solid hsl(0, 100%, 67%)";
      }
      ErrorDisplay[0].innerHTML = "Must a valid date";
      throw new Error("Invalid date");
    }

    const birthDate = new Date(`${yearValue}.${monthValue}.${dayValue}`);

    ageYear = currTime.getFullYear() - birthDate.getFullYear();
    ageMonth = currTime.getMonth() - birthDate.getMonth();
    ageDay = currTime.getDate() - birthDate.getDate();

    if (ageMonth < 0 || (ageMonth === 0 && ageDay < 0)) {
      ageYear--;
      ageMonth = 12 + ageMonth;
    }

    if (ageDay < 0) {
      ageMonth--;
      ageDay += new Date(
        currTime.getFullYear(),
        currTime.getMonth(),
        0
      ).getDate();
    }
    updateDateNum(calcDate, ageDay, ageMonth, ageYear, false);
  } catch (err) {
    updateDateNum(calcDate, "--", "--", "--", true);
    console.log(err);
  }
};

const updateDateNum = (
  calcDate,
  newDay = "--",
  newMonth = "--",
  newYear = "--",
  isError = false
) => {
  newDate = [newYear, newMonth, newDay];
  //speed of the counter
  let interval = 500;
  //step of counter = num/ stepMultiplier
  let stepDivider = 95;
  // error set all value to --
  if (isError) {
    Array.from(calcDate).forEach((elem) => {
      let startValue = parseInt(elem.textContent);
      let endValue = 0;

      if (!isNaN(startValue) && startValue > 0) {
        const duration = Math.floor(interval / startValue);
        const step = Math.ceil(startValue / stepDivider);
        let counter = setInterval(() => {
          elem.textContent = parseInt(elem.textContent) - step;
          //stop when number is <=0
          if (parseInt(elem.textContent) <= endValue) {
            elem.textContent = "--";
            clearInterval(counter);
          }
        }, duration);
      } else {
        elem.textContent = "--";
      }
    });
  } else {
    for (let i = 0; i < calcDate.length; i++) {
      const curr = calcDate[i];
      let startValue = parseInt(curr.textContent);
      let endValue = newDate[i];
      // if starting is bigger num go down
      if (startValue > endValue) {
        difference = startValue - endValue;
        const step = Math.ceil(difference / stepDivider);
        const duration = Math.floor(interval / difference);
        let counter = setInterval(() => {
          curr.textContent = parseInt(curr.textContent) - step;
          //stop when number is ;e endValue
          if (parseInt(curr.textContent) <= endValue) {
            curr.textContent = endValue;
            clearInterval(counter);
          }
        }, duration);
      }
      // if starting is smaller num go up
      else {
        if (isNaN(startValue)) {
          startValue = 0;
          curr.textContent = 0;
        }
        difference = endValue - startValue;
        const step = Math.ceil(difference / stepDivider);
        const duration = Math.floor(interval / difference);

        let counter = setInterval(() => {
          curr.textContent = parseInt(curr.textContent) + step;
          //stop when number is ge endValue
          if (parseInt(curr.textContent) >= endValue) {
            curr.textContent = endValue;
            clearInterval(counter);
          }
        }, duration);
      }
    }
  }
};
