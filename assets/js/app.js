var quotes = [
    'Software developer',
    'Coder',
    'Programmer',
    'Developer & designer',
    'Gamer',
    'App developer',
    'Blogger',
    'Web developer',
    'Tinkerer'
];

document.getElementById('quote').innerText = quotes[Math.floor(Math.random() * quotes.length)];
