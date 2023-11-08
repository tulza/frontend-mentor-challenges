adviceNumber = document.getElementById("advice-no");
adviceQuote = document.getElementById("advice-quote");
adviceApi = "https://api.adviceslip.com/advice";

console.log("Hello :) -Tulza");

const get_new_quote = (adviceJson) => {
  console.log(adviceJson);

  adviceNumber.innerHTML = adviceJson.slip.id;
  adviceQuote.innerHTML = adviceJson.slip.advice;
};

const call_advice_api = () => {
  fetch(adviceApi)
    .then((response) => response.json())
    .then((data) => get_new_quote(data))
    .catch((err) => console.error(err));
};

call_advice_api();
