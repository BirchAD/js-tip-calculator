document.addEventListener("DOMContentLoaded", () => {
  // making the input div's clickable
  const billInputDiv = document.querySelector('.col-1.row-1');
  const peopleInputDiv = document.querySelector('.col-1.row-3');

  billInputDiv.addEventListener('click', () => {
    const billInput = document.getElementById('amount');
    billInput.focus();
  });

  peopleInputDiv.addEventListener('click', () => {
    const peopleInput = document.getElementById('people');
    peopleInput.focus();
  });

  // calculate elements
  const billInput = document.getElementById('amount');
  const tipInputs = document.querySelectorAll('input[name="tip"]');
  const customTipInput = document.getElementById('tipCustom');
  const peopleInput = document.getElementById('people');
  const personTotal = document.getElementById('person-total');
  const totalTotal = document.getElementById('total-total');
  const resetButton = document.querySelector('.reset');

  const calculate = () => {
    const bill = parseFloat(billInput.value);
    const customTip = parseFloat(customTipInput.value);
    const tipPercent = customTip || parseFloat(document.querySelector('input[name="tip"]:checked').value);
    const numberOfPeople = parseFloat(peopleInput.value);
    const errorMessage = document.getElementById('error-message');

    if (!Number.isInteger(numberOfPeople)) {
      errorMessage.textContent = 'Please enter a whole number, not a decimal or 0.';
    } else if (numberOfPeople < 0) {
      errorMessage.textContent = 'Must not be a minus number';
    } else if (bill && tipPercent && numberOfPeople) {
      const tipAmount = bill * (tipPercent / 100);
      const totalAmount = bill + tipAmount;
      const personTip = tipAmount / numberOfPeople;
      const personTotalAmount = totalAmount / numberOfPeople;
      personTotal.textContent = '$' + personTip.toFixed(2);
      totalTotal.textContent = '$' + personTotalAmount.toFixed(2);
      errorMessage.textContent = ''; // clear error message
    }
  }

  billInput.addEventListener('input', calculate);
  customTipInput.addEventListener('input', calculate);
  peopleInput.addEventListener('input', calculate);
  tipInputs.forEach(tipInput => tipInput.addEventListener('change', calculate));

  // reset function on reset button

  billInput.addEventListener('input', updateResetButton);
  customTipInput.addEventListener('input', updateResetButton);
  peopleInput.addEventListener('input', updateResetButton);
  tipInputs.forEach(tipInput => tipInput.addEventListener('change', updateResetButton));
  
  function reset() {
    const errorMessage = document.getElementById('error-message');
    billInput.value = '';
    customTipInput.value = '';
    peopleInput.value = '';
    personTotal.textContent = '$0.00';
    totalTotal.textContent = '$0.00';
    errorMessage.textContent = '';
    for(let i = 0; i < tipInputs.length; i++) {
      tipInputs[i].checked = false;
    }
    resetButton.setAttribute('disabled', '')
  }

  resetButton.addEventListener('click', reset);

  function updateResetButton() {
    if (billInput.value || customTipInput.value || peopleInput.value || isTipInputChecked()) {
      resetButton.removeAttribute('disabled');
    }
  }

  function isTipInputChecked() {
    let isChecked = false;
      for(let i = 0; i < tipInputs.length; i++) {
        if (tipInputs[i].checked === true); {
          isChecked = true;
        }
      }
    return isChecked;
  }
})
