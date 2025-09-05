// Automatically pick the right WebSocket URL
const socket = new WebSocket(
  window.location.protocol === "https:"
    ? `wss://${window.location.host}`
    : `ws://${window.location.host}`
);

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (data.type === 'waiting') {
        document.getElementById('status').innerText = data.message;
    }

    if (data.type === 'result') {
        document.getElementById('result').innerText = `Game Result: ${data.message}`;
        document.getElementById('status').innerText = 'Make your choice:';
    }
};

document.querySelectorAll('.choices').forEach(button => {
    button.addEventListener('click', () => {
        const choice = button.dataset.choice;
        socket.send(JSON.stringify({ type: 'choice', choice }));
        document.getElementById('status').innerText = `You chose ${choice.charAt(0).toUpperCase() + choice.slice(1)}. Waiting for opponent...`;
    });
});


// Dark Mode Toggle Functionality
class DarkModeToggle {
    constructor() {
        this.toggle = document.getElementById('theme-toggle');
        this.icon = document.getElementById('theme-icon');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }

    init() {
        this.setTheme(this.currentTheme);
        this.toggle.addEventListener('click', () => this.toggleTheme());
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        
        if (theme === 'dark') {
            this.icon.className = 'fa-solid fa-sun';
        } else {
            this.icon.className = 'fa-solid fa-moon';
        }
        
        localStorage.setItem('theme', theme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        this.toggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.toggle.style.transform = '';
        }, 150);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new DarkModeToggle();
});