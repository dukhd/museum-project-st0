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

  const amount = (ticketCountBasic * amountBasic) + (ticketCountSenior * amountSenior)
  finalPrice.querySelector('.span-price').textContent = amount.toFixed(2)

  // keep info
  localStorage.setItem('ticketCountBasic', ticketCountBasic);
  localStorage.setItem('ticketCountSenior', ticketCountSenior);
  localStorage.setItem('selectedTicketType', selectedTicketType);
  localStorage.setItem('finalPrice', totalAmount.toFixed(2));
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