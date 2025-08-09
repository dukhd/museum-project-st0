document.addEventListener('DOMContentLoaded', () => {
    const navBurgerButton = document.querySelector('.nav-burger-button');
    const navBurgerMenu = document.querySelector('.nav-burger-menu');
    const navLinks = document.querySelectorAll('.navigation-list.nav-header a');

    if (navBurgerButton && navBurgerMenu) {
        function toggleMenu() {
            navBurgerButton.classList.toggle('open');
            navBurgerMenu.classList.toggle('open');
            document.body.classList.toggle('menu-open'); 
        }

        navBurgerButton.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleMenu();
        });

        navLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                if (navBurgerMenu.classList.contains('open')) {
                    toggleMenu();
                }
            });
        });

        document.addEventListener('click', (event) => {
            if (navBurgerMenu.classList.contains('open') &&
                !navBurgerMenu.contains(event.target) &&
                !navBurgerButton.contains(event.target)) {
                toggleMenu();
            }
        });
    }
});

function formatPrice(num) {
  return Number.isInteger(num) ? num.toString() : num.toFixed(2);
}

// Buy Tockets section
const finalPrice = document.getElementById('final-price')

//tickets type
const ticketTypePermanent = document.getElementById('permanent')
const ticketTypeTemporary = document.getElementById('temporary')
const ticketTypeCombined = document.getElementById('combined')

//prices
const pricePermanentBasic = 20
const pricePermanentSenior = 10 
const priceTemporaryBasic = 25
const priceTemporarySenior = 12.5 
const priceCombinedBasic = 40
const priceCombinedSenior = 20 

//basic
let ticketQuantityBasic = document.getElementById('quantity-b')
const minusBtnBasic = document.getElementById('minus-btn-basic')
const plusBtnBasic = document.getElementById('plus-btn-basic')
//senior
let ticketQuantitySenior = document.getElementById('quantity-s')
const minusBtnSenior = document.getElementById('minus-btn-senior')
const plusBtnSenior = document.getElementById('plus-btn-senior')

// button
const submitBtn = document.getElementById('submit')
let actionBasic = '+'
let actionSenior = '+'


function updateAmount() { //updateAmount start
  let ticketCountBasic = Number(ticketQuantityBasic.value)
  let ticketCountSenior = Number(ticketQuantitySenior.value)
  let selectedTicketType = ''

  let amountBasic = 0
  let amountSenior = 0

  if (ticketTypePermanent.checked) {
    amountBasic = pricePermanentBasic
    amountSenior = pricePermanentSenior
    selectedTicketType = 'permanent'
  } else if (ticketTypeTemporary.checked) {
    amountBasic = priceTemporaryBasic
    amountSenior = priceTemporarySenior
    selectedTicketType = 'temporary'
  } else if (ticketTypeCombined.checked) {
    amountBasic = priceCombinedBasic
    amountSenior = priceCombinedSenior
    selectedTicketType = 'combined'
  }
  const priceAmountBasic = ticketCountBasic * amountBasic
  const priceAmountSenior = ticketCountSenior * amountSenior
  const amount = priceAmountBasic + priceAmountSenior
  finalPrice.querySelector('.span-price').textContent = formatPrice(amount)
  

  // keep info
  localStorage.setItem('ticketCountBasic', ticketCountBasic);
  localStorage.setItem('ticketCountSenior', ticketCountSenior);
  localStorage.setItem('selectedTicketType', selectedTicketType);
  localStorage.setItem('finalPrice', formatPrice(amount));
} // updateAmount finish

// keep info start
function loadSavedState() {
  const savedTicketCountBasic = localStorage.getItem('ticketCountBasic');
  const savedTicketCountSenior = localStorage.getItem('ticketCountSenior');
  const savedTicketType = localStorage.getItem('selectedTicketType');
  const savedFinalPrice = localStorage.getItem('finalPrice');

  if (savedTicketCountBasic !== null) {
    ticketQuantityBasic.value = savedTicketCountBasic;
  }
  if (savedTicketCountSenior !== null) {
    ticketQuantitySenior.value = savedTicketCountSenior;
  }
  if (savedTicketType !== null) {
    document.getElementById(savedTicketType).checked = true;
  }

  if (savedFinalPrice !== null) {
    finalPrice.querySelector('.span-price').textContent = savedFinalPrice;
  }

   updateAmount();
}
// keep info finish

plusBtnBasic.onclick = function() {
  ticketQuantityBasic.value++
  updateAmount()
}

minusBtnBasic.onclick = function() {
  if (ticketQuantityBasic.value > 0) ticketQuantityBasic.value--
  updateAmount()
}
plusBtnSenior.onclick = function() {
  ticketQuantitySenior.value++
  updateAmount()
}

minusBtnSenior.onclick = function() {
  if (ticketQuantitySenior.value > 0) ticketQuantitySenior.value--
  updateAmount()
}

ticketTypePermanent.onchange = updateAmount
ticketTypeTemporary.onchange = updateAmount
ticketTypeCombined.onchange = updateAmount

loadSavedState();
// next section

// open booking tickets window
const bookingWindow = document.getElementById("booking-tickets-window");
const overlay = document.getElementById("overlay");
const selectTicket = document.getElementById("bt-ticket-type");
const closeBtn = document.querySelector(".close_button")

submitBtn.addEventListener("click", e => {
  e.preventDefault();
  bookingWindow.classList.add("active");
  overlay.classList.add("active");
  document.body.classList.add("no-scroll");

  const chosen = document.querySelector('input[name="radio"]:checked').value;
  selectTicket.value = chosen;

  let ticketCountBasic = Number(ticketQuantityBasic.value);
  let ticketCountSenior = Number(ticketQuantitySenior.value);

  let amountBasic = 0;
  let amountSenior = 0;

  if (ticketTypePermanent.checked) {
    amountBasic = pricePermanentBasic;
    amountSenior = pricePermanentSenior;
  } else if (ticketTypeTemporary.checked) {
    amountBasic = priceTemporaryBasic;
    amountSenior = priceTemporarySenior;
  } else if (ticketTypeCombined.checked) {
    amountBasic = priceCombinedBasic;
    amountSenior = priceCombinedSenior;
  }

  const priceAmountBasic = ticketCountBasic * amountBasic;
  const priceAmountSenior = ticketCountSenior * amountSenior;
  const totalAmount = priceAmountBasic + priceAmountSenior;


  document.getElementById("bt-unit-basic").textContent = ticketCountBasic;
  document.getElementById("bt-unit-senior").textContent = ticketCountSenior;
  document.getElementById("bt-quantity-b").value = ticketCountBasic;
  document.getElementById("bt-quantity-s").value = ticketCountSenior;

  document.querySelectorAll(".bt-unit-price-b").forEach(el => {
    el.textContent = `(${amountBasic} €)`;
  });

  document.querySelectorAll(".bt-unit-price-s").forEach(el => {
    el.textContent = `(${formatPrice(amountSenior)} €)`;
  });

  document.getElementById("bt-counted-price-b").textContent = `${priceAmountBasic} €`;
  document.getElementById("bt-counted-price-s").textContent = `${formatPrice(priceAmountSenior)} €`;

  document.getElementById("bt-total-output").textContent = `${formatPrice(totalAmount)} €`;
});

closeBtn.addEventListener("click", () => {
  bookingWindow.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
});

overlay.addEventListener("click", () => {
  bookingWindow.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
});

//  update Breakdown in the window start
function updateBreakdown() {

  const ticketType = document.getElementById("bt-ticket-type").value;

  let amountBasic = 0;
  let amountSenior = 0;

  if (ticketType === "1") {
    amountBasic = pricePermanentBasic;
    amountSenior = pricePermanentSenior;
  } else if (ticketType === "2") {
    amountBasic = priceTemporaryBasic;
    amountSenior = priceTemporarySenior;
  } else if (ticketType === "3") {
    amountBasic = priceCombinedBasic;
    amountSenior = priceCombinedSenior;
  }

  const ticketCountBasic = Number(document.getElementById("bt-quantity-b").value);
  const ticketCountSenior = Number(document.getElementById("bt-quantity-s").value);

  const priceAmountBasic = ticketCountBasic * amountBasic;
  const priceAmountSenior = ticketCountSenior * amountSenior;
  const totalAmount = priceAmountBasic + priceAmountSenior;

  document.getElementById("bt-unit-basic").textContent = ticketCountBasic;
  document.getElementById("bt-unit-senior").textContent = ticketCountSenior;

  document.querySelectorAll(".bt-unit-price-b").forEach(el => {
    el.textContent = `(${amountBasic} €)`;
  });

  document.querySelectorAll(".bt-unit-price-s").forEach(el => {
    el.textContent = `(${formatPrice(amountSenior)} €)`;
  });

  document.getElementById("bt-counted-price-b").textContent = `${priceAmountBasic} €`;
  document.getElementById("bt-counted-price-s").textContent = `${formatPrice(priceAmountSenior)} €`;

  document.getElementById("bt-total-output").textContent = `${formatPrice(totalAmount)} €`;


}

document.getElementById("bt-plus-btn-basic").addEventListener("click", () => {
  let input = document.getElementById("bt-quantity-b");
  input.value = Number(input.value) + 1;
  updateBreakdown();
});

document.getElementById("bt-minus-btn-basic").addEventListener("click", () => {
  let input = document.getElementById("bt-quantity-b");
  if (Number(input.value) > 0) {
    input.value = Number(input.value) - 1;
    updateBreakdown();
  }
});

document.getElementById("bt-plus-btn-senior").addEventListener("click", () => {
  let input = document.getElementById("bt-quantity-s");
  input.value = Number(input.value) + 1;
  updateBreakdown();
});

document.getElementById("bt-minus-btn-senior").addEventListener("click", () => {
  let input = document.getElementById("bt-quantity-s");
  if (Number(input.value) > 0) {
    input.value = Number(input.value) - 1;
    updateBreakdown();
  }
});

document.getElementById("bt-ticket-type").addEventListener("change", updateBreakdown);

//  update Breakdown in the window end




// choose only today date function and output start
const dateInput = document.getElementById("bt-date");
const dateOutput = document.getElementById("date-output");

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const monthDay = date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  return `${weekday}, ${monthDay}`;
}
dateInput.addEventListener("input", () => {
  dateOutput.value = formatDate(dateInput.value);
});

const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, "0");
const day = String(now.getDate()).padStart(2, "0");
const today = `${year}-${month}-${day}`;

dateInput.min = today;
dateInput.value = today;
dateOutput.value = formatDate(today);
// choose only today date function and output end

// time output start
const timeInput = document.getElementById("bt-time");
const timeOutput = document.getElementById("time-output");

function formatTime(timeStr) {
  const [hours, minutes] = timeStr.split(":");
  return `${hours} : ${minutes}`;
}

timeInput.addEventListener("input", () => {
  timeOutput.value = formatTime(timeInput.value);
});

// time output start
// selected type of ticket output start
const ticketTypeInput = document.getElementById("bt-ticket-type");
const ticketTypeOutput = document.getElementById("bt-ticket-type-output");

ticketTypeInput.addEventListener("input", () => {
  const selectedOption = ticketTypeInput.options[ticketTypeInput.selectedIndex]; 
  ticketTypeOutput.value = selectedOption.text;
});

// selected type of ticket output end