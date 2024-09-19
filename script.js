function changeGreeting() {
    const greetings = [
        'Hallo Welt!',
        'Willkommen!',
        'Guten Tag!',
        'Schön, dass du hier bist!',
        'Grüße von GitHub Pages!'
    ];
    const randomIndex = Math.floor(Math.random() * greetings.length);
    document.getElementById('greeting').innerText = greetings[randomIndex];
}
