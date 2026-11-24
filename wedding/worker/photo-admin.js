document.querySelectorAll('form[data-slot]').forEach(form => {
  const status = form.querySelector('[role="status"]');
  const endpoint = '/bildverwaltung/?bild=' + encodeURIComponent(form.dataset.slot);
  const save = async (method, options) => {
    const buttons = form.querySelectorAll('button');
    buttons.forEach(button => { button.disabled = true; });
    status.textContent = 'Wird gespeichert …';
    try {
      const response = await fetch(endpoint, {method, ...options});
      status.textContent = await response.text();
      if (response.ok) location.reload();
    } catch {
      status.textContent = 'Speichern fehlgeschlagen. Bitte erneut versuchen.';
    } finally {
      buttons.forEach(button => { button.disabled = false; });
    }
  };
  form.addEventListener('submit', event => {
    event.preventDefault();
    const photo = form.querySelector('input[type="file"]').files[0];
    if (photo.size > 6 * 1024 * 1024) {
      status.textContent = 'Das Bild darf höchstens 6 MB groß sein.';
      return;
    }
    save('PUT', {body:photo, headers:{'X-Photo-Alt':encodeURIComponent(form.elements.alt.value)}});
  });
  form.querySelector('[data-remove]')?.addEventListener('click', () => {
    if (confirm('Dieses Foto vom Bildplatz entfernen?')) save('DELETE');
  });
});
