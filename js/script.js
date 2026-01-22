// Password check
function checkPassword() {
    const pass = document.getElementById('pass-input').value;
    if (pass === 'frachi2026') { // Cambia password
        document.getElementById('password-overlay').style.display = 'none';
        sessionStorage.setItem('accessed', 'true');
    } else {
        alert('Password errata');
    }
}
if (sessionStorage.getItem('accessed')) {
    document.getElementById('password-overlay').style.display = 'none';
}

// COUNTDOWN ROBUSTO - Esegue IMMEDIATAMENTE
function initCountdown() {
    const weddingDate = new Date('2026-09-09T16:00:00').getTime();
    const countdownEl = document.getElementById('countdown');
    
    function updateTimer() {
        const now = new Date().getTime();
        const distance = weddingDate - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            
            countdownEl.innerHTML = `
                <div>${days} <span>giorni</span></div>
                <div>${hours} <span>ore</span></div>
                <div>${minutes} <span>min</span></div>
            `;
        } else {
            countdownEl.innerHTML = 'SPOSATI! ❤️';
        }
    }
    
    updateTimer(); // SUBITO
    setInterval(updateTimer, 60000); // Ogni minuto
}

document.addEventListener('DOMContentLoaded', initCountdown);

