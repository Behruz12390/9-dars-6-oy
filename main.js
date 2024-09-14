const currencies = 'https://currency-converter-pro1.p.rapidapi.com/currencies';

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '7cf076838amshe2ff3e8c79ddf0dp1f5e15jsn527a183ba112',
        'x-rapidapi-host': 'currency-converter-pro1.p.rapidapi.com'
    }
};

const form = document.querySelector('form');
const input = document.querySelector('input');
const from = document.querySelector('#from');
const to = document.querySelector('#to');
const error = document.querySelector('#error');
const result = document.querySelector('#result');

const getdata = async (url, options) => {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
};

const formatNums = (num) => {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const drawCurrencies = async () => {
    const currency = await getdata(currencies, options);
    Object.entries(currency.result).forEach(([key, value]) => {
        from.innerHTML += `<option value="${key}">${value}</option>`;
        to.innerHTML += `<option value="${key}">${value}</option>`;
    });
};

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    error.style.display = 'none';

    if (!input.value) {
        error.style.display = 'block';
        return; 
    }

    const converted = await getdata(
        `https://currency-converter-pro1.p.rapidapi.com/convert?from=${from.value}&to=${to.value}&amount=${input.value}`,
        options
    );

    console.log(converted);

    result.innerHTML = `
        ${formatNums(input.value)} ${converted.request.from} = ${Math.round(converted.result)} ${to.value}
    `;
});

drawCurrencies();
