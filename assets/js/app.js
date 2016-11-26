var quotes = [
    'Developer & designer',
    'Gamer',
    'App developer',
    'Blogger',
    'Web developer'
];

document.getElementById('quote').innerText = quotes[Math.floor(Math.random() * quotes.length)];
