/* Kearly Wedding: browser-local UI. No analytics and no automatic uploads. */
(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const menuButton = $('.menu-toggle');
  const nav = $('#main-nav');
  const mobileQuery = matchMedia('(max-width: 1080px)');
  function setMenu(open, restoreFocus = false) {
    document.body.classList.toggle('menu-open', open);
    menuButton?.setAttribute('aria-expanded', String(open));
    if (menuButton) $('.menu-label', menuButton).textContent = open ? 'Schließen' : 'Menü';
    if (mobileQuery.matches) {
      $('main').inert = open;
      $('.site-footer').inert = open;
    } else {
      $('main').inert = false;
      $('.site-footer').inert = false;
    }
    if (restoreFocus) menuButton?.focus();
  }
  menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
  nav?.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
  mobileQuery.addEventListener('change', () => setMenu(false));
  document.addEventListener('keydown', event => {
    if (!document.body.classList.contains('menu-open')) return;
    if (event.key === 'Escape') { setMenu(false, true); return; }
    if (event.key !== 'Tab') return;
    const focusables = [menuButton, ...$$('a', nav)];
    const first = focusables[0], last = focusables.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });

  const sticky = $('.mobile-sticky');
  const hero = $('.hero, .page-hero, .text-hero');
  if (sticky && hero) {
    new IntersectionObserver(entries => {
      const entry = entries[0];
      sticky.classList.toggle('visible', !entry.isIntersecting && entry.boundingClientRect.top < 0);
    }, { threshold: 0 }).observe(hero);
  }

  const faqSearch = $('#faq-search');
  if (faqSearch) {
    const questions = $$('#faq-items details');
    const normalize = text => text.toLocaleLowerCase('de-DE').normalize('NFD').replace(/\p{Diacritic}/gu, '');
    faqSearch.addEventListener('input', () => {
      const search = normalize(faqSearch.value.trim());
      let count = 0;
      questions.forEach(question => {
        question.hidden = !normalize(question.textContent).includes(search);
        if (!question.hidden) count++;
      });
      $('#faq-count').textContent = `${count} ${count === 1 ? 'Antwort' : 'Antworten'}`;
      $('#faq-empty').hidden = count > 0;
    });
  }

  const candleNames = $('#candle-names');
  const candleDate = $('#candle-date');
  if (candleNames && candleDate) {
    const updatePersonalization = () => {
      const names = candleNames.value.trim();
      const date = candleDate.value;
      const hasValues = Boolean(names || date);
      $('#name-preview-caption').textContent = hasValues ? 'Eure Angaben als Schriftbeispiel' : 'Beispiel für die Personalisierung';
      $('#name-preview').textContent = names || (hasValues ? 'Eure Namen' : 'Anna & Lukas');
      $('#date-preview').textContent = date ? new Intl.DateTimeFormat('de-DE',{day:'numeric',month:'long',year:'numeric'}).format(new Date(date+'T12:00:00')) : (hasValues ? 'Euer Hochzeitsdatum' : '14. Juni 2027');
      const params = new URLSearchParams({bereich:'Hochzeitskerze'});
      const personalization = new URLSearchParams();
      if (names) personalization.set('namen',names);
      if (date) personalization.set('datum',date);
      // URL fragments remain in the browser; names/date must not enter HTTP query logs.
      const hash = personalization.toString();
      $('[data-candle-inquiry]').href = '/wedding/hochzeit-anfragen/?'+params.toString()+(hash?'#'+hash:'');
    };
    candleNames.addEventListener('input',updatePersonalization);
    candleDate.addEventListener('input',updatePersonalization);
  }

  const servicePicker = $('[data-service-picker]');
  if (servicePicker) {
    servicePicker.addEventListener('change', event => {
      const input = event.target;
      if (!(input instanceof HTMLInputElement) || input.name !== 'service-preview') return;
      $('[data-service-title]', servicePicker).textContent = input.value;
      $('[data-service-client]', servicePicker).textContent = input.dataset.client;
      $('[data-service-atelier]', servicePicker).textContent = input.dataset.atelier;
      $('[data-service-note]', servicePicker).textContent = input.dataset.note;
      const link = $('[data-service-link]', servicePicker);
      link.textContent = 'Mit '+input.value+' planen ↗';
      link.href = '/wedding/hochzeit-anfragen/?'+new URLSearchParams({service:input.value});
    });
  }

  const form = $('#wedding-form');
  if (!form) return;
  const config = window.KEARLY_CONFIG || {};
  const panels = $$('.form-panel', form);
  const stepNames = ['Bereiche', 'Stil', 'Farben', 'Hochzeit', 'Personalisierung & Service', 'Budget', 'Kontakt'];
  let step = 0, furthestStep = 0, submitting = false, submitted = false, editingSummary = false;
  let activeSteps = [0,1,2,3,4,5,6];
  const errorBox = $('#form-error');
  const next = $('#form-next'), back = $('#form-back');
  const filesInput = $('#moodboard');
  let validatedFiles = [];
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const data = () => new FormData(form);
  const values = (key, fd = data()) => fd.getAll(key).filter(v => typeof v === 'string' && v.trim()).join(', ');
  const value = (key, fd = data()) => String(fd.get(key) || '').trim();

  // Query parameters only select known choices. They never supply markup or endpoints.
  const query = new URLSearchParams(location.search);
  const choose = (name, val) => {
    const input = $$('input[name="'+name+'"]', form).find(input => input.value.toLowerCase() === String(val).toLowerCase());
    if (input) input.checked = true;
  };
  if (query.has('bereich')) choose('areas', query.get('bereich'));
  if (query.has('service')) choose('service', query.get('service'));
  if (query.has('stil')) choose('style', query.get('stil'));
  for (const [key, param] of [['favor','favor'], ['package','paket']]) {
    const control = form.elements[key];
    if (query.has(param) && [...control.options].some(o => o.value === query.get(param))) control.value = query.get(param);
  }
  if (query.has('favor')) choose('areas', 'Gastgeschenke');
  const personalization = new URLSearchParams(location.hash.slice(1));
  if (personalization.has('namen')) form.elements.personalNotes.value = 'Namen für die Hochzeitskerze: '+personalization.get('namen').slice(0,100);
  if (/^\d{4}-\d{2}-\d{2}$/.test(personalization.get('datum') || '')) form.elements.date.value = personalization.get('datum');
  if (personalization.has('namen') || personalization.has('datum')) history.replaceState(null,'',location.pathname+location.search);

  function updateRoute() {
    const areas = data().getAll('areas');
    const productOnly = areas.length > 0 && areas.every(area => ['Gastgeschenke','Hochzeitskerze'].includes(area));
    const candleOnly = areas.length === 1 && areas[0] === 'Hochzeitskerze';
    const hasStyle = $$('input[name="style"]',form).some(control=>control.checked);
    const hasBudget = Boolean(form.elements.budget.value.trim() || form.elements.budgetUnknown.checked);
    activeSteps = productOnly ? [0,...(hasStyle?[1]:[]),2,3,4,...(hasBudget?[5]:[]),6] : [0,1,2,3,4,5,6];
    panels.forEach((panel,index) => {
      if (index > 6) return;
      $$('input,select,textarea',panel).forEach(control => {
        control.disabled = !activeSteps.includes(index) || (control.name === 'privacy' && !config.legalReady);
      });
    });
    $$('[data-scope]',form).forEach(group => {
      const visible = ({decor:!productOnly,favors:!areas.length||areas.includes('Gastgeschenke'),'candle-only':candleOnly,'personalization-choice':!candleOnly})[group.dataset.scope] ?? true;
      group.hidden = !visible;
      $$('input,select,textarea',group).forEach(control => control.disabled = !visible);
    });
    form.elements.budget.disabled = !activeSteps.includes(5) || form.elements.budgetUnknown.checked;
    $('#route-hint').textContent = productOnly
      ? `Für eure Auswahl sind ${activeSteps.length} Schritte vorgesehen. Bereits ergänzte Wünsche bleiben erhalten.`
      : 'Für ein Dekokonzept gehen wir gemeinsam durch sieben Schritte. Was noch nicht feststeht, könnt ihr offenlassen.';
  }

  function showError(text) {
    errorBox.textContent = text;
    errorBox.hidden = !text;
  }
  function validatePanel(index) {
    showError('');
    for (const control of $$('input,select,textarea', panels[index])) {
      control.removeAttribute('aria-invalid');
      if (control.getAttribute('aria-describedby') === 'form-error') control.removeAttribute('aria-describedby');
      if (control.disabled || control.type === 'file') continue;
      if (!control.checkValidity()) {
        control.setAttribute('aria-invalid', 'true');
        const label = $('label[for="'+control.id+'"]', form)?.textContent.replace(' *', '') || 'dieses Feld';
        let message = control.validity.valueMissing ? 'Bitte ergänzt das Feld „'+label+'“.' : 'Bitte prüft die Angabe für '+label+'.';
        if (control.name === 'name' && control.validity.valueMissing) message = 'Bitte gebt euren Namen an.';
        if (control.name === 'email') message = 'Bitte gebt eine gültige E-Mail-Adresse an.';
        if (control.validity.rangeUnderflow) message = 'Bitte gebt für „'+label+'“ mindestens '+control.min+' an.';
        control.setAttribute('aria-describedby','form-error');
        showError(message);
        control.focus();
        return false;
      }
    }
    if (index === 6 && filesInput.files.length && validatedFiles.length !== filesInput.files.length) {
      showError('Bitte prüft eure Moodboard-Dateien. Es sind bis zu 3 Dateien mit jeweils maximal 10 MB möglich.');
      filesInput.focus();
      return false;
    }
    return true;
  }
  function goTo(index, focus = true) {
    if (submitting || submitted || index < 0 || index > 7) return;
    if (index !== 7 && !activeSteps.includes(index)) index = 0;
    step = index;
    furthestStep = Math.max(furthestStep, step);
    panels.forEach((panel, i) => panel.hidden = i !== step);
    const position = step === 7 ? activeSteps.length : activeSteps.indexOf(step)+1;
    $('#progress-label').textContent = step === 7 ? 'Eure Zusammenfassung' : `Schritt ${position} von ${activeSteps.length} · ${stepNames[step]}`;
    $('#progress-count').textContent = step === 7 ? 'PRÜFEN & SENDEN' : `${String(position).padStart(2,'0')} / ${String(activeSteps.length).padStart(2,'0')}`;
    $('#progress-bar').style.width = `${position / activeSteps.length * 100}%`;
    $('#inquiry-progress').setAttribute('aria-valuemax',String(activeSteps.length));
    $('#inquiry-progress').setAttribute('aria-valuenow',String(position));
    $('#inquiry-progress').setAttribute('aria-valuetext',$('#progress-label').textContent);
    $$('[data-goto]').forEach(button => {
      const n = Number(button.dataset.goto);
      button.closest('li').hidden = !activeSteps.includes(n);
      $('span',button).textContent = String(activeSteps.indexOf(n)+1).padStart(2,'0');
      button.disabled = n > furthestStep;
      if (n === step) button.setAttribute('aria-current','step');
      else button.removeAttribute('aria-current');
    });
    back.hidden = step === 0;
    next.hidden = step === 7;
    next.innerHTML = editingSummary ? 'Änderungen übernehmen <span aria-hidden="true">→</span>' : step === 6 ? 'Zusammenfassung <span aria-hidden="true">→</span>' : 'Weiter <span aria-hidden="true">→</span>';
    showError('');
    if (step === 7) renderSummary();
    if (focus) {
      $('h2', panels[step]).focus({ preventScroll: true });
      $('.form-main').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    }
  }
  next.addEventListener('click', () => {
    if (!validatePanel(step)) return;
    if (editingSummary) {
      for (const index of activeSteps) if (!validatePanel(index)) { goTo(index); validatePanel(index); return; }
      editingSummary = false;
      goTo(7);
    } else goTo(activeSteps[activeSteps.indexOf(step)+1] ?? 7);
  });
  back.addEventListener('click', () => goTo(step === 7 ? activeSteps.at(-1) : activeSteps[activeSteps.indexOf(step)-1]));
  $$('[data-goto]').forEach(button => button.addEventListener('click', () => goTo(Number(button.dataset.goto))));
  form.addEventListener('keydown', event => {
    if (event.key === 'Enter' && event.target.tagName === 'INPUT' && !['checkbox','radio','file'].includes(event.target.type) && step < 7) {
      event.preventDefault(); next.click();
    }
  });
  form.addEventListener('change', event => {
    const control = event.target;
    if (control.name === 'areas') { updateRoute(); goTo(step,false); }
    if (control.name === 'colors') {
      if (control.value === 'Noch unsicher' && control.checked) $$('input[name="colors"]', form).forEach(c => { if (c !== control) c.checked = false; });
      else if (control.checked) $$('input[name="colors"]', form).find(c => c.value === 'Noch unsicher').checked = false;
    }
    if (control.name === 'budgetUnknown') {
      form.elements.budget.disabled = control.checked;
    }
  });
  filesInput.addEventListener('change', () => {
    showError('');
    validatedFiles = [];
    const files = [...filesInput.files];
    const validExtensions = /\.(jpe?g|png|webp|pdf)$/i;
    if (files.length > 3 || files.some(f => f.size > 10*1024*1024 || !validExtensions.test(f.name) || (f.type && !['image/jpeg','image/png','image/webp','application/pdf'].includes(f.type)))) {
      filesInput.value = '';
      $('#file-list').replaceChildren();
      showError('Bitte wählt bis zu 3 Dateien (JPG, PNG, WebP oder PDF) mit jeweils maximal 10 MB.');
      return;
    }
    validatedFiles = files;
    $('#file-list').innerHTML = files.map(file => `<li>${escape(file.name)} · ${(file.size/1024/1024).toLocaleString('de-DE', {maximumFractionDigits:1})} MB</li>`).join('');
  });
  function summaryGroups() {
    const fd = data();
    const date = value('date',fd);
    const formattedDate = /^\d{4}-\d{2}-\d{2}$/.test(date) ? date.split('-').reverse().join('.') : date;
    return [
      ['Bereiche', 0, [['Gewünscht',values('areas',fd)]]],
      ['Stil', 1, [['Stilwelt',value('style',fd)]]],
      ['Farben', 2, [['Farbwelt',values('colors',fd)],['Wunschfarbe',value('otherColor',fd)]]],
      ['Hochzeit', 3, [['Datum',formattedDate],['Location',value('location',fd)],['Ort / PLZ',value('city',fd)],['Gäste',value('guests',fd)],['Tische',value('tables',fd)],['Tischform',value('tableShape',fd)],['Innen / Außen',value('setting',fd)],['Offene Flamme',value('flames',fd)]]],
      ['Personalisierung & Service', 4, [['Service',value('service',fd)],['Paket',value('package',fd)],['Gastgeschenke',value('favor',fd)],['Anzahl',value('favorQuantity',fd)],['Personalisierung',value('personalization',fd)],['Weitere Wünsche',values('extras',fd)],['Details',value('personalNotes',fd)]]],
      ['Budget', 5, [['Budgetwunsch',value('budgetUnknown',fd) || (value('budget',fd) ? value('budget',fd)+(/[€]|Euro/i.test(value('budget',fd))?'':' €') : '')]]],
      ['Kontakt', 6, [['Name',value('name',fd)],['E-Mail',value('email',fd)],['Telefon',value('phone',fd)],['Nachricht',value('message',fd)],['Moodboard',validatedFiles.map(f=>f.name).join(', ')]]],
    ].filter(([,index]) => activeSteps.includes(index));
  }
  function renderSummary() {
    $('#inquiry-summary').innerHTML = summaryGroups().map(([title,index,rows]) => `<section class="summary-group"><header><h3>${title}</h3><button class="summary-edit" type="button" aria-label="${escape(title)} bearbeiten" data-edit="${index}">Bearbeiten</button></header><dl>${rows.filter(([,v])=>v).map(([k,v])=>`<div><dt>${k}</dt><dd>${escape(v)}</dd></div>`).join('') || '<div><dt>Auswahl</dt><dd>Noch offen</dd></div>'}</dl></section>`).join('');
    $$('[data-edit]', $('#inquiry-summary')).forEach(button => button.addEventListener('click', () => { editingSummary = true; goTo(Number(button.dataset.edit)); }));
    const ready = Boolean(config.inquiryEndpoint && config.legalReady);
    $('#send-inquiry').disabled = !ready;
    $('#send-inquiry').hidden = !ready;
    $('#send-notice').textContent = ready ? 'Mit dem Absenden übertragt ihr eure Angaben und ausgewählten Dateien zur Bearbeitung eurer Hochzeitsanfrage. Dies ist keine Buchung.' : 'Speichert eure Zusammenstellung als Text auf eurem Gerät und bringt sie gern zu unserem Gespräch mit. Für eine persönliche Beratung nutzt bitte das separate Beratungsformular.';
  }
  $('#download-inquiry').addEventListener('click', () => {
    const lines = ['KEARLY WEDDING – EURE ZUSAMMENSTELLUNG','Lokal gespeichert. Noch nicht versendet.',''];
    summaryGroups().forEach(([title,,rows]) => { lines.push(title.toUpperCase()); rows.forEach(([key,val]) => { if(val) lines.push(`${key}: ${val}`); }); lines.push(''); });
    lines.push('Ausgewählte Moodboard-Dateien sind nicht in diesem Text enthalten.');
    const url = URL.createObjectURL(new Blob(['\uFEFF'+lines.join('\r\n')],{type:'text/plain;charset=utf-8'}));
    const anchor = document.createElement('a'); anchor.href=url; anchor.download='kearly-hochzeitsanfrage.txt'; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (step !== 7 || submitting || submitted) return;
    if (!config.inquiryEndpoint || !config.legalReady) { showError('Der Versand ist noch nicht eingerichtet. Bitte speichert eure Anfrage zunächst als Text.'); return; }
    for (const i of activeSteps) if(!validatePanel(i)) { goTo(i); validatePanel(i); return; }
    submitting = true;
    const button = $('#send-inquiry');
    button.disabled = true; button.textContent = 'Wird gesendet …'; showError('');
    const abort = new AbortController();
    const timeout = setTimeout(() => abort.abort(), 20000);
    try {
      const payload = data();
      payload.set('source','kearly-weddings');
      payload.set('privacyConsent','true');
      const response = await fetch(config.inquiryEndpoint, {method:'POST',body:payload,signal:abort.signal,headers:{Accept:'application/json'}});
      const result = await response.json().catch(()=>null);
      if (!response.ok || !(result?.success === true || result?.ok === true)) throw Error('Unconfirmed request');
      $('#send-notice').textContent = 'Eure Hochzeitsanfrage wurde erfolgreich übermittelt. Vielen Dank für eure Ideen!';
      $('#send-notice').focus?.();
      button.textContent = 'Anfrage gesendet';
      submitted = true;
      $$('[data-edit]', form).forEach(b=>b.disabled=true);
      $$('[data-goto]').forEach(b=>b.disabled=true);
      back.hidden=true;
    } catch {
      showError('Die Übermittlung konnte nicht bestätigt werden. Eure Angaben sind noch vorhanden. Bitte versucht es erneut oder speichert die Anfrage als Text.');
      button.disabled=false;
      button.innerHTML='Hochzeitsanfrage senden <span aria-hidden="true">↗</span>';
    } finally {
      clearTimeout(timeout); submitting=false;
    }
  });
  updateRoute();
  goTo(0,false);
})();
