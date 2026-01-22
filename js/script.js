const WEDDING_DATE = new Date('2026-09-09T16:00:00');

function pad2(n) {
  return String(n).padStart(2, '0');
}

function computeRemaining() {
  const now = Date.now();
  let diff = WEDDING_DATE.getTime() - now;
  if (diff < 0) diff = 0;

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, ended: diff === 0 };
}

function mountCountdown() {
  const host = document.getElementById('countdown-container');
  if (!host) return false;

  host.innerHTML = `
    <div class="cd-unit" data-unit="days">
      <div class="cd-card">
        <div class="cd-half cd-top"><span class="cd-num">00</span></div>
        <div class="cd-half cd-bottom"><span class="cd-num">00</span></div>
      </div>
      <div class="cd-label">Days</div>
    </div>

    <div class="cd-sep">:</div>

    <div class="cd-unit" data-unit="hours">
      <div class="cd-card">
        <div class="cd-half cd-top"><span class="cd-num">00</span></div>
        <div class="cd-half cd-bottom"><span class="cd-num">00</span></div>
      </div>
      <div class="cd-label">Hours</div>
    </div>

    <div class="cd-sep">:</div>

    <div class="cd-unit" data-unit="minutes">
      <div class="cd-card">
        <div class="cd-half cd-top"><span class="cd-num">00</span></div>
        <div class="cd-half cd-bottom"><span class="cd-num">00</span></div>
      </div>
      <div class="cd-label">Minutes</div>
    </div>

    <div class="cd-sep">:</div>

    <div class="cd-unit" data-unit="seconds">
      <div class="cd-card">
        <div class="cd-half cd-top"><span class="cd-num">00</span></div>
        <div class="cd-half cd-bottom"><span class="cd-num">00</span></div>
      </div>
      <div class="cd-label">Seconds</div>
    </div>
  `;

  return true;
}

function setUnit(unit, value) {
  const el = document.querySelector(`.cd-unit[data-unit="${unit}"]`);
  if (!el) return;

  const top = el.querySelector('.cd-top .cd-num');
  const bottom = el.querySelector('.cd-bottom .cd-num');

  top.textContent = value;
  bottom.textContent = value;
}

function updateCountdown() {
  const { days, hours, minutes, seconds, ended } = computeRemaining();
  if (ended) {
    const host = document.getElementById('countdown-container');
    if (host) host.innerHTML = `<div style="font-family: 'Courier New', monospace; font-size: 1.4em; color: #222;">Siamo sposati! ❤️</div>`;
    return;
  }

  // Days: minimo 2 cifre, ma se supera 99 mostriamo 3+ cifre senza tagliare.
  const daysStr = String(days).padStart(2, '0');
  setUnit('days', daysStr);
  setUnit('hours', pad2(hours));
  setUnit('minutes', pad2(minutes));
  setUnit('seconds', pad2(seconds));

  // tick preciso al secondo
  const msToNextSecond = 1000 - (Date.now() % 1000);
  setTimeout(updateCountdown, msToNextSecond);
}

function start() {
  if (!mountCountdown()) return;
  updateCountdown();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}
