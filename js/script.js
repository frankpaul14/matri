async function copyText(text) {
  // Clipboard API moderna
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text); // ritorna una Promise [web:567]
    return;
  }

  // fallback
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
}

document.addEventListener('click', async (e) => {
  const btn = e.target.closest('.copy-iban-btn');
  if (!btn) return;

  const target = document.querySelector(btn.dataset.copy);
  const text = (target?.textContent || '').trim();
  if (!text) return;

  try {
    await copyText(text);
    btn.classList.add('is-copied');

    // opzionale: cambia icona in “check” finché è dorato
    const icon = btn.querySelector('.material-symbols-outlined');
    const oldIcon = icon?.textContent;
    if (icon) icon.textContent = 'check';

    setTimeout(() => {
      btn.classList.remove('is-copied');
      if (icon && oldIcon) icon.textContent = oldIcon;
    }, 1200);
  } catch (err) {
    // writeText può fallire se non è consentito (es. NotAllowedError) [web:567]
    alert('Copia non consentita dal browser.');
  }
});
