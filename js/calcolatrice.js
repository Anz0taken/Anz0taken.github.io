function selectBanknote(button)
{
    const counterElement = button.querySelector('.number-circle');
    let currentValue = parseInt(counterElement.textContent);
    currentValue += 1;
    counterElement.textContent = currentValue;
}

function resetCounters() {
    const counterElements = document.querySelectorAll('.number-circle');
    counterElements.forEach(element => {
        element.textContent = '0';
    });
}