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

    log_all_input();

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
    console.log(dayValue, "wa", new Date(yearValue, monthValue, 0).getDate());

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

    console.log(birthDate);
    if (birthDate.getTime() > currTime.getTime()) {
      console.log("this is in the future");
    } else {
      ageYear = currTime.getFullYear() - birthDate.getFullYear();
      ageMonth = currTime.getMonth() - birthDate.getMonth();
      ageDay = currTime.getDay() - birthDate.getDay();

      if (ageMonth < 0 || (ageMonth === 0 && ageDay < 0)) {
        ageYear--;
        ageMonth = 12 + ageMonth;
      }

      if (ageDay < 0) {
        ageDay += new Date(
          currTime.getFullYear(),
          currTime.getMonth(),
          0
        ).getDate();
      }

      calcDate[0].innerHTML = ageYear;
      calcDate[1].innerHTML = ageMonth;
      calcDate[2].innerHTML = ageDay;
    }
  } catch (err) {
    calcDate[0].innerHTML = "--";
    calcDate[1].innerHTML = "--";
    calcDate[2].innerHTML = "--";
    console.log(err);
  }
};
