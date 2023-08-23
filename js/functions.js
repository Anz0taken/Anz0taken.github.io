function calculateTotal() {
    const banknoteValues = [100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05];
    let total = 0;

    const counterElements = document.querySelectorAll('.number-circle');
    counterElements.forEach((element, index) => {
        const currentValue = parseInt(element.textContent);
        const banknoteValue = banknoteValues[index];
        total = addDecimals(total, multiplyDecimals(banknoteValue, currentValue));
    });

    console.log(total);
}

function multiplyDecimals(a, b) {
    return a * b;
}

function addDecimals(a, b) {
    const precision = Math.max(getDecimalPlaces(a), getDecimalPlaces(b));
    const multiplier = Math.pow(10, precision);

    const sum = (a * multiplier + b * multiplier) / multiplier;
    return roundToDecimals(sum, precision);
}

function getDecimalPlaces(num) {
    const match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) {
        return 0;
    }
    return Math.max(
        0,
        (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0)
    );
}

function roundToDecimals(num, decimals) {
    const multiplier = Math.pow(10, decimals);
    return Math.round(num * multiplier) / multiplier;
}

function numeroCasuale(Min,Max)
{
    var Numero;
    Numero=Math.floor(Math.random()*(Max-Min+1)+Min);
    return Numero;
}

function calcolaPezziBanconote(importo, pezziBanconote)
{
    resto = importo;
    var i = 0;

    for(var banconota of banconoteDisponibili)
    {   
        if(numeroCasuale(1,5)%5 <= 3)
        {
            while(resto > banconota)
            {
                pezziBanconote[i]++;
                resto -= banconota;
            }
    
            if(numeroCasuale(1,5)%5 == 0)
            {
                pezziBanconote[i]++;
                resto -= banconota;    
            }
    
            if(resto < 0)
                break;
        }

        i++;
    }

    while(resto > 0)
        pezziBanconote[pezziBanconote.length - 1]++,
        resto -= 500;

    return pezziBanconote;
}

function resetArray(array)
{
    for(var i = 0; i < array.length; i++)
        array[i] = 0;
}

function createBanknotes(banknoteArray) {
    const container = document.body;
    var bacnonoteMostrate = 1;

    for (let i = 0; i < banknoteArray.length; i++) {
        const count = banknoteArray[i];
        const imageSrc = banknoteImages[i];

        for (let j = 0; j < count; j++)
        {
            const banknote = document.createElement('img');
            banknote.src = imageSrc;
            banknote.className = 'banknote';
            banknote.style.top = `${bacnonoteMostrate*20 + 23}px`; // Adjust vertical spacing
            banknote.style.right = (-bacnonoteMostrate + 5)+'%'; // Start from the right side

            container.appendChild(banknote);

            // Trigger transition after a short delay
            setTimeout(() => {
                banknote.classList.toggle('animato');
            }, 100 * bacnonoteMostrate++);
        }
    }
}

function clearBanknotes() {
    const banknoteElements = document.querySelectorAll('.banknote');
    banknoteElements.forEach(element => {
        element.remove();
    });
}

function formatCurrency(amount) {
    return amount.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function calculateTotal() {
    const banknoteValues = [100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05];
    let total = 0;

    const counterElements = document.querySelectorAll('.number-circle');
    counterElements.forEach((element, index) => {
        const currentValue = parseInt(element.textContent);
        const banknoteValue = banknoteValues[index];
        total = addDecimals(total, multiplyDecimals(banknoteValue, currentValue));
    });

    total = Math.round(total*100);

    if(resto + total == 0)
        document.getElementById("messaggio_modal").innerHTML = "Il resto è esatto!";
    else
        document.getElementById("messaggio_modal").innerHTML = "Oh no, hai sbagliato di "+(resto + total)/100+" euro!";

    openModal();
}

function generaCaso()
{
    targetAmount = numeroCasuale(1, 1000)*10 + numeroCasuale(0, 1)*5;
    costWrite.innerHTML = targetAmount/100 + "€";
    
    resetArray(pezziBanconote);
    calcolaPezziBanconote(targetAmount, pezziBanconote);
    createBanknotes(pezziBanconote);
}

function openModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    modalOverlay.style.display = 'flex';
}

function closeModal() {
    resetCounters();
    clearBanknotes();
    generaCaso();
    const modalOverlay = document.getElementById('modalOverlay');
    modalOverlay.style.display = 'none';
}