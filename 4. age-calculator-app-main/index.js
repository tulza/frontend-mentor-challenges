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
    dateInput[i].style.outline = "1px solid hsl(0, 0%, 86%)";
  }
};

const get_time = () => {
  try {
    clearError();
    let hasError = false;
    const dayValue = parseInt(day.value);
    const monthValue = parseInt(month.value);
    const yearValue = parseInt(year.value);

    log_all_input();
    console.log(dayValue);

    for (let i = 0; i < dateInput.length; i++) {
      dateValue = dateInput[i].value;
      console.log(dateValue);
      if (isNaN(parseInt(dateValue))) {
        hasError = true;
        dateInput[i].style.outline = "1px solid hsl(0, 100%, 67%)";
        ErrorDisplay[i].innerHTML = "This field is required";
      }
    }

    if (hasError) {
      throw new Error("wa");
    }
    const currTime = new Date();
    const birthDate = new Date(`${yearValue}.${monthValue}.${dayValue}`);

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
