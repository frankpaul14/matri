// script.js (countdown rimosso)

/*
  Se in futuro vuoi aggiungere altre funzioni JS (menu, scroll, ecc.),
  mettile dentro init().
*/
function init() {
  // TODO: altro codice del sito, se serve.
}

// Avvio sicuro quando il DOM è pronto [web:268]
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
