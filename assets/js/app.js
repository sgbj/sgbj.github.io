var quotes = [
    'Developer & designer',
    'Software architect',
    'Gamer',
    'App developer',
    'Blogger'
];

document.getElementById('quote').innerText = quotes[Math.floor(Math.random() * quotes.length)];
