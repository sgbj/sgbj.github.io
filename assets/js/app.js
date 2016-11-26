var quotes = [
    'Developer & designer',
    'Software architect',
    'Gamer',
    'App developer'
];

document.getElementById('quote').innerText = quotes[Math.floor(Math.random() * quotes.length)];