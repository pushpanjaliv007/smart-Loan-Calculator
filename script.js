document.addEventListener("DOMContentLoaded", () => {
  //! Select the Elements

  const calculateBtn = document.getElementById("calculateBtn");
  const amountInput = document.getElementById("amount");
  const interestInput = document.getElementById("interest");
  const yearsInput = document.getElementById("years");

  const monthlyPayment = document.getElementById("monthly");

  const totalPayment = document.getElementById("total");

  const totalInterestPayment = document.getElementById("totalInterest");

  //Function to calc to the loan
  function calculateLoan() {
    const principal = parseFloat(amountInput.value);
    const interest = parseFloat(interestInput.value) / 100 / 12;
    const TotalNoofpayments = parseFloat(yearsInput.value) * 12;
    if (isNaN(principal) || isNaN(interest) || isNaN(TotalNoofpayments)) {
      alert("Please enter your numbers");
      return;
    }
    //Calculate the monthly payment
    const x = Math.pow(1 + interest, TotalNoofpayments);

    //formula for loan Calculation
    //EMI = P * r * (1+r)^n / [(1+r)^n - 1]
    // here p is principal, x is (1+r)^n,r is interest
    const monthly = (principal * x * interest) / (x - 1);
    if (isFinite(monthly)) {
      const total = monthly * TotalNoofpayments;

      const totalInterest = total - principal;
      //display the results

      animateValue(monthlyPayment, 0, monthly, 1000);
      animateValue(totalPayment, 0, total, 1000);
      animateValue(totalInterestPayment, 0, totalInterest, 1000);
    }
  }

  //animation
  function animateValue(element, start, end, duration) {
    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = start + (end - start) * progress;
      element.textContent = current.toFixed(2);
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }
  //bind the event to calc btn
  calculateBtn.addEventListener("click", calculateLoan);
});
