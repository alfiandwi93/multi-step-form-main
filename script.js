document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("wizard-form");
  const cards = form.querySelectorAll(".card");

  form.addEventListener("click", function(event) {
    if (event.target.classList.contains("btn")) {
      const currentCard = document.querySelector('[data-name].card.active');
      const currentDataName = currentCard.getAttribute("data-name");

      if (event.target.textContent === "Next Step") {
        // Mengecek apakah ada input yang masih kosong di kartu saat ini
        const inputFields = currentCard.querySelectorAll("input[required]");
        let isFormValid = true;

        let isInputEmpty = false;

        inputFields.forEach(inputField => {
          if (inputField.value.trim() === "") {
            isInputEmpty = true;

          }
        });

        if (isInputEmpty) {
          alert("Mohon isi semua input terlebih dahulu.");
          return;
        }

        if (isFormValid) {
          // Hapus kelas "active" dari kartu saat ini
          currentCard.classList.remove("active");

          // Temukan kartu berikutnya dengan atribut "data-name"
          const nextDataName = parseInt(currentDataName) + 1;
          const nextCard = form.querySelector(`[data-name="${nextDataName}"]`);

          const allSquares = document.querySelectorAll(".square");
          allSquares.forEach(square => {
            square.classList.remove("active");
          });

          const squaresWithCurrentDataName = document.querySelectorAll(`.square[data-name='${parseInt(currentDataName) + 1}']`);
          squaresWithCurrentDataName.forEach(square => {
            square.classList.add("active");
          });

          if (nextCard) {
            // Tambahkan kelas "active" pada kartu berikutnya
            nextCard.classList.add("active");
          }
          event.preventDefault(); // Mencegah perilaku default (refresh halaman)
        }
      } else if (event.target.textContent === "Go Back") {
        // Tombol "Go Back" diklik
        event.preventDefault();

        // Hapus kelas "active" dari kartu saat ini
        currentCard.classList.remove("active");
        console.log(currentCard);

        // Temukan kartu sebelumnya dengan atribut "data-name"
        const prevDataName = parseInt(currentDataName) - 1;
        const prevCard = form.querySelector(`[data-name="${prevDataName}"]`);
        const allSquares = document.querySelectorAll(".square");
        allSquares.forEach(square => {
          square.classList.remove("active");
        });

        const squaresWithCurrentDataName = document.querySelectorAll(`.square[data-name='${parseInt(currentDataName) - 1}']`);
        squaresWithCurrentDataName.forEach(square => {
          square.classList.add("active");
        });

        if (prevCard) {
          // Tambahkan kelas "active" pada kartu sebelumnya
          prevCard.classList.add("active");
        }
        event.preventDefault(); // Mencegah perilaku default (refresh halaman)
      }
    }
  });
});

var optionCards = document.querySelectorAll('[data-name="2"] .card.option');
var optionCardsvalue = document.querySelectorAll('[data-name="2"] .card.option.active');
var cardValue = "Arcade";
// Menambahkan event listener untuk setiap elemen dengan kelas "option"
optionCards.forEach(function(optionCard) {
  optionCard.addEventListener("click", function() {
    optionCards.forEach(function(card) {
      card.classList.remove("active");
    });
    optionCard.classList.add("active");
    cardValue = optionCard.getAttribute('data-value');
  });
});


var selectedCheckboxValues = [];

function addactive(element) {
  // Mengecek apakah elemen sudah memiliki class "active"
  var hasActiveClass = element.classList.contains("active");
  var checkboxValue = element.querySelector('.form-check-input').value;

  if (hasActiveClass) {
    // Jika sudah memiliki class "active", hapus class tersebut
    element.classList.remove("active");
    var checkboxElement = element.querySelector('.form-check-input');
    checkboxElement.checked = false;

    var checkboxValue = element.querySelector('.form-check-input').value;
    var index = selectedCheckboxValues.indexOf(checkboxValue);
    selectedCheckboxValues = selectedCheckboxValues.filter(item => item.option !== checkboxValue);
  } else {
    // Jika belum memiliki class "active", tambahkan class tersebut
    element.classList.add("active");
    var checkboxElement = element.querySelector('.form-check-input');
    checkboxElement.checked = true;

    var option = checkboxElement.value;
    var price = parseFloat(checkboxElement.dataset.price);
    var cartItem = {
      option,
      price
    };
    selectedCheckboxValues.push(cartItem);
  }
}


const toggleSwitch = document.getElementById('toggleSwitch');
const pricePro = document.getElementById('price-pro');
const priceAdvance = document.getElementById('price-advance');
const priceArcade = document.getElementById('price-arcade');
const activemonth = document.getElementById('month');
const activeyear = document.getElementById('year');
var time = "Month";

toggleSwitch.addEventListener('change', function() {
  if (toggleSwitch.checked) {
    pricePro.innerHTML = '$150/yr <h6>2 month <i>free</i></h6>';
    priceAdvance.innerHTML = '$120/yr <h6>2 month <i>free</i></h6>';
    priceArcade.innerHTML = '$90/yr <h6>2 month <i>free</i></h6>';
    activemonth.classList.remove("active");
    activeyear.classList.add("active");
    time = "Year"
  } else {
    pricePro.textContent = '$15/mo';
    priceAdvance.textContent = '$12/mo';
    priceArcade.textContent = '$9/mo';
    activemonth.classList.add("active");
    activeyear.classList.remove("active");
    time = "Month"
  }

});

function loadContent() {
  var contentContainer = document.getElementById("content-container");

  // Determine the file to load based on the time variable
  var fileName = (time === "Month") ? "monthly.html" : "yearly.html";

  // Fetch the HTML file
  fetch(fileName)
    .then(response => response.text())
    .then(html => {
      // Inject the HTML content into the container
      contentContainer.innerHTML = html;
    })
    .catch(error => console.error('Error fetching content:', error));
  console.log(time);
}

function cleararray() {
  selectedCheckboxValues = [];
}

var finalOutput = document.getElementById('finalOutput');
var optionArray = document.getElementById('optionArray');
var allTotal = document.getElementById('allTotal');
var arcadePrice;
var advancePrice;
var proPrice;

function finalData() {
  if (time === "Year") {

    arcadePrice = 90;
    advancePrice = 120;
    proPrice = 150;

    if (cardValue === "Arcade") {
      finalOutput.innerHTML = `
    <div class="row">
        <div class="col-6">
            <span>${cardValue} (${time}ly)</span><br>
            <a href="">Change</a>
        </div>
        <div class="col-6 d-flex align-items-center justify-content-end result">
            $${arcadePrice}/yr
        </div>
    </div>
`;

      var sumtotal = selectedCheckboxValues.reduce((accumulator, item) => accumulator + item.price, 0);
      allTotal.innerHTML += `<div class="card bg-transparent p-4">
                          <div class="row">
                            <div class="col-8 col-md-6 d-flex align-items-center">
                              <p>Total (per ${time})</p>
                            </div>
                            <div class="col-4 col-md-6 d-flex justify-content-end final-total">
                              $${sumtotal+arcadePrice}/yr
                            </div>
                          </div>
                        </div>`;

      selectedCheckboxValues.forEach(function(option) {
        optionArray.innerHTML += `<div class="row">
                        <div class="col-6">
                          <p>${option.option}</p>
                        </div>
                        <div class="col-6 d-flex justify-content-end subtotal">
                         +$${option.price}/yr
                        </div>
                      </div>`;
      });
    } else if (cardValue === "Advance") {
      finalOutput.innerHTML = `
    <div class="row">
        <div class="col-6">
            <span>${cardValue} (${time}ly)</span><br>
            <a href="">Change</a>
        </div>
        <div class="col-6 d-flex align-items-center justify-content-end result">
            $${advancePrice}/yr
        </div>
    </div>
`;

      var sumtotal = selectedCheckboxValues.reduce((accumulator, item) => accumulator + item.price, 0);
      allTotal.innerHTML += `<div class="card bg-transparent p-4">
                          <div class="row">
                            <div class="col-8 d-flex align-items-center">
                              <p>Total (per ${time})</p>
                            </div>
                            <div class="col-4 d-flex justify-content-end final-total">
                              $${sumtotal+advancePrice}/yr
                            </div>
                          </div>
                        </div>`;

      selectedCheckboxValues.forEach(function(option) {
        optionArray.innerHTML += `<div class="row">
                        <div class="col-6">
                          <p>${option.option}</p>
                        </div>
                        <div class="col-6 d-flex justify-content-end subtotal">
                         +$${option.price}/yr
                        </div>
                      </div>`;
      });
    } else if (cardValue === "Pro") {
      finalOutput.innerHTML = `
    <div class="row">
        <div class="col-6">
            <span>${cardValue} (${time}ly)</span><br>
            <a href="">Change</a>
        </div>
        <div class="col-6 d-flex align-items-center justify-content-end result">
            $${proPrice}/yr
        </div>
    </div>
`;

      var sumtotal = selectedCheckboxValues.reduce((accumulator, item) => accumulator + item.price, 0);
      allTotal.innerHTML += `<div class="card bg-transparent p-4">
                          <div class="row">
                            <div class="col-8 d-flex align-items-center">
                              <p>Total (per ${time})</p>
                            </div>
                            <div class="col-4 d-flex justify-content-end final-total">
                              $${sumtotal+proPrice}/yr
                            </div>
                          </div>
                        </div>`;

      selectedCheckboxValues.forEach(function(option) {
        optionArray.innerHTML += `<div class="row">
                        <div class="col-6">
                          <p>${option.option}</p>
                        </div>
                        <div class="col-6 d-flex justify-content-end subtotal">
                         +$${option.price}/yr
                        </div>
                      </div>`;
      });
    } else {
      console.log("variabel kosong");
    }


    let total = 0;
    const elementDetails = {};

    // Tampilkan total harga
    console.log('Total Harga:', total);

    // Tampilkan detail harga untuk setiap elemen
    console.log('Detail Harga:');
    console.log(elementDetails);




  } else {


    arcadePrice = 9;
    advancePrice = 12;
    proPrice = 15;

    if (cardValue === "Arcade") {
      finalOutput.innerHTML = `
    <div class="row">
        <div class="col-6">
            <span>${cardValue} (${time}ly)</span><br>
            <a href="">Change</a>
        </div>
        <div class="col-6 d-flex align-items-center justify-content-end result">
            $${arcadePrice}/mo
        </div>
    </div>
`;

      var sumtotal = selectedCheckboxValues.reduce((accumulator, item) => accumulator + item.price, 0);
      allTotal.innerHTML += `<div class="card bg-transparent p-4">
                          <div class="row">
                            <div class="col-8 d-flex align-items-center">
                              <p>Total (per ${time})</p>
                            </div>
                            <div class="col-4 d-flex justify-content-end final-total">
                              $${sumtotal+arcadePrice}/mo
                            </div>
                          </div>
                        </div>`;

      selectedCheckboxValues.forEach(function(option) {
        optionArray.innerHTML += `<div class="row">
                        <div class="col-6">
                          <p>${option.option}</p>
                        </div>
                        <div class="col-6 d-flex justify-content-end subtotal">
                         +$${option.price}/mo
                        </div>
                      </div>`;
      });
    } else if (cardValue === "Advance") {
      finalOutput.innerHTML = `
    <div class="row">
        <div class="col-6">
            <span>${cardValue} (${time}ly)</span><br>
            <a href="">Change</a>
        </div>
        <div class="col-6 d-flex align-items-center justify-content-end result">
            $${advancePrice}/mo
        </div>
    </div>
`;

      var sumtotal = selectedCheckboxValues.reduce((accumulator, item) => accumulator + item.price, 0);
      allTotal.innerHTML += `<div class="card bg-transparent p-4">
                          <div class="row">
                            <div class="col-8 d-flex align-items-center">
                              <p>Total (per ${time})</p>
                            </div>
                            <div class="col-4 d-flex justify-content-end final-total">
                              $${sumtotal+advancePrice}/mo
                            </div>
                          </div>
                        </div>`;

      selectedCheckboxValues.forEach(function(option) {
        optionArray.innerHTML += `<div class="row">
                        <div class="col-6">
                          <p>${option.option}</p>
                        </div>
                        <div class="col-6 d-flex justify-content-end subtotal">
                         +$${option.price}/mo
                        </div>
                      </div>`;
      });
    } else if (cardValue === "Pro") {
      finalOutput.innerHTML = `
    <div class="row">
        <div class="col-6">
            <span>${cardValue} (${time}ly)</span><br>
            <a href="">Change</a>
        </div>
        <div class="col-6 d-flex align-items-center justify-content-end result">
            $${proPrice}/mo
        </div>
    </div>
`;

      var sumtotal = selectedCheckboxValues.reduce((accumulator, item) => accumulator + item.price, 0);
      allTotal.innerHTML += `<div class="card bg-transparent p-4">
                          <div class="row">
                            <div class="col-8 d-flex align-items-center justify-content-start">
                              <p>Total (per ${time})</p>
                            </div>
                            <div class="col-4 d-flex justify-content-end final-total">
                              $${sumtotal+proPrice}/mo
                            </div>
                          </div>
                        </div>`;

      selectedCheckboxValues.forEach(function(option) {
        optionArray.innerHTML += `<div class="row">
                        <div class="col-6">
                          <p>${option.option}</p>
                        </div>
                        <div class="col-6 d-flex justify-content-end subtotal">
                         +$${option.price}/mo
                        </div>
                      </div>`;
      });
    } else {
      console.log("variabel kosong");
    }

  }

  console.log(selectedCheckboxValues);
  console.log(cardValue);
  console.log(time);
}

function clearlist() {
  optionArray.innerHTML = ` `;
  allTotal.innerHTML = ` `;
}

function updateFinalResult() {
  var thanks = document.getElementById("final-result");
  thanks.innerHTML = `<div class="w-100">
  <div class="d-flex justify-content-center my-4">
    <img src="assets/images/icon-thank-you.svg">
  </div>
  <div class="px-3">
    <h1 class="text-center my-2">Thank you!</h1>
    <p class="text-center my-2">Thanks for confirming your subscription! We hope you have fun 
    using our platform. If you ever need support, please feel free 
    to email us at support@loremgaming.com.</p>
  </div>
</div>`;
}

