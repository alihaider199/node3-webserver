const form = document.querySelector("form");
const input = document.querySelector("input");
let msgOne = document.querySelector(".msg-1");
let msgTwo = document.querySelector(".msg-2");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchAddress = encodeURIComponent(input.value);
  msgOne.textContent = "Loading....";
  msgTwo.textContent = "";

  fetch("http://localhost:3000/weather?address=" + searchAddress)
    .then((response) => response.json())
    .then((data) => {
      if (data.Error) {
        msgTwo.textContent = data.Error;
        msgOne.textContent = "";
      } else {
        msgTwo.textContent = "Location: " + data.location + " " + data.Data;
        msgOne.textContent = "";
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  input.value = ""; // Clear the input field after each search
});
