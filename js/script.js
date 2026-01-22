// Imposta qui data/ora cerimonia
const WEDDING_DATE = new Date('2026-09-09T16:00:00');

function pad2(n) {
  return String(n).padStart(2, '0');
}

function pad3(n) {
  return String(n).padStart(3, '0');
}

function createDigitHTML(initialValue = '0') {
  // top/bottom statici + top/bottom animati (flip-top/flip-bottom)
  return `
    <div class="card top">${initialValue}</div>
    <div class="card bottom">${initialValue}</div>
    <div class="card flip-top">${initialValue}</div>
    <div class="card flip-bottom">${initialValue}</div>
  `;
}

function setDigitInstant(digitEl, valueChar) {
  digitEl.querySelector('.card.top').textContent = valueChar;
  digitEl.querySelector('.card.bottom').textContent = valueChar;
  digitEl.querySelector('.card.flip-top').textContent = valueChar;
  digitEl.querySelector('.card.flip-bottom').textContent = valueChar;
  digitEl.dataset.value = valueChar;
}

function flipTo(digitEl, newChar) {
  const oldChar = digitEl.dataset.value ?? '0';
  if (oldChar === newChar) return;

  const top = digitEl.querySelector('.card.top');
  const bottom = digitEl.querySelector('.card.bottom');
  const flipTop = digitEl.querySelector('.card.flip-top');
  const flipBottom = digitEl.querySelector('.card.flip-bottom');

  // prepara facce
  top.textContent = oldChar;
  bottom.textContent = oldChar;
  flipTop.textContent = oldChar;
  flipBottom.textContent = newChar;

  digitEl.classList.add('is-flipping');

  // a metà animazione aggiorna static bottom al nuovo valore (effetto realistico)
  setTimeout(() => {
    bottom.textContent = newChar;
  }, 300);

  setTimeout(() => {
    top.textContent = newChar;
    digitEl.classList.remove('is-flipping');
    digitEl.dataset.value = newChar;
  }, 600);
}

function buildFlipClock() {
  // Container dove montare l'orologio: <div id="countdown-container"></div>
  const host = document.getElementById('countdown-container');
  if (!host) return;

  host.innerHTML = `
    <div class="flip-clock" id="flipClock">
      <div>
        <div class="flip-group" data-unit="days">
          <div class="flip-digit" data-pos="0"></div>
          <div class="flip-digit" data-pos="1"></div>
          <div class="flip-digit" data-pos="2"></div>
        </div>
        <div class="flip-label">Giorni</div>
      </div>

      <div class="flip-sep">:</div>

      <div>
        <div class="flip-group" data-unit="hours">
          <div class="flip-digit" data-pos="0"></div>
          <div class="flip-digit" data-pos="1"></div>
        </div>
        <div class="flip-label">Ore</div>
      </div>

      <div class="flip-sep">:</div>

      <div>
        <div class="flip-group" data-unit="minutes">
          <div class="flip-digit" data-pos="0"></div>
          <div class="flip-digit" data-pos="1"></div>
        </div>
        <div class="flip-label">Min</div>
      </div>

      <div class="flip-sep">:</div>

      <div>
        <div class="flip-group" data-unit="seconds">
          <div class="flip-digit" data-pos="0"></div>
          <div class="flip-digit" data-pos="1"></div>
        </div>
        <div class="flip-label">Sec</div>
      </div>
    </div>
  `;

  // inizializza struttura delle cifre
  host.querySelectorAll('.flip-digit').forEach(d => {
    d.innerHTML = createDigitHTML('0');
    setDigitInstant(d, '0');
  });
}

function computeRemaining() {
  const now = new Date();
  let diff = WEDDING_DATE.getTime() - now.getTime();
  if (diff < 0) diff = 0;

  const totalSeconds = Math.floor(diff / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, ended: diff === 0 };
}

function updateFlipClock() {
  const host = document.getElementById('countdown-container');
  if (!host) return;

  const { days, hours, minutes, seconds, ended } = computeRemaining();

  if (ended) {
    host.innerHTML = `<div style="font-size:2em;font-weight:700;color:var(--dark-gold);">Siamo sposati! ❤️</div>`;
    return;
  }

  const dStr = pad3(days);      // 3 cifre per giorni (es. 262)
  const hStr = pad2(hours);
  const mStr = pad2(minutes);
  const sStr = pad2(seconds);

  const map = {
    days: dStr,
    hours: hStr,
    minutes: mStr,
    seconds: sStr
  };

  Object.entries(map).forEach(([unit, str]) => {
    const group = host.querySelector(`.flip-group[data-unit="${unit}"]`);
    if (!group) return;

    const digits = Array.from(group.querySelectorAll('.flip-digit'))
      .sort((a, b) => Number(a.dataset.pos) - Number(b.dataset.pos));

    for (let i = 0; i < digits.length; i++) {
      const newChar = str[i] ?? '0';
      flipTo(digits[i], newChar);
    }
  });
}

// Avvio
document.addEventListener('DOMContentLoaded', () => {
  buildFlipClock();
  updateFlipClock();
  setInterval(updateFlipClock, 1000);
});
