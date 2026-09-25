/*
 * Report form engine. A page defines window.REPORT_FORM (title, sections, fields, output template)
 * and this script builds the form, fills officer fields from the active character, and turns the
 * answers into the report (copy as HTML, copy title, download as image).
 *
 * Field types: text, number (min, max), select, date (dd/MM/yyyy), time (HH:mm), textarea,
 *              charges (penal code picker that writes article numbers into f.target).
 * Field options: key, label, placeholder, hint, tooltip, values [{label, value}], default,
 *                upper ('en' | 'tr'), span ('all'), prefill ('name' | 'badge' | 'division'), search (true),
 *                ids / ranges / types / target / typeTargets / typeOn / typeOff / classify (charges only),
 *                locked (select, text), today (date: starts with the computer's date).
 * Top-level def.outputFormat: 'bbcode' outputs the template with raw values (no HTML-escaping, no
 *                              newline-to-<br> conversion); anything else (default) outputs HTML.
 * Charges-only options: ids/ranges narrow the list by article number, types narrows it by penal
 *                        code type (e.g. ["I", "M"]); with neither ids nor ranges set, all articles
 *                        matching types are offered. filter(codeEntry) can drop individual articles
 *                        with arbitrary logic on top of ids/ranges/types. classify(option) maps a
 *                        chosen article to a key into typeTargets, overriding the default (the
 *                        article's own type letter) — used to split "I" into separate boxes by
 *                        article range.
 * Template placeholders: {KEY}.
 */
(function () {
  var def = window.REPORT_FORM;
  var CHECK = '<svg class="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';
  var CHEVRON = '<svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
  var SEARCH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>';
  var TRASH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>';
  var PLUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14"/><path d="M12 5v14"/></svg>';
  var LOCK = '<svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';
  var HELP = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>';

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    for (var k in attrs || {}) if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  }

  var controls = {};   // key -> { get(), set(v), field }
  var form = document.getElementById('report-form');

  /* ---------- Custom select (same look as the settings page, optional search box) ---------- */
  function norm(t) {
    return String(t).toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ı/g, 'i');
  }
  function buildSelect(f, labelId) {
    var root = el('div', { class: 'select plain' + (f.locked ? ' locked' : '') });
    // Selection is kept by position so two options may share a value (e.g. Lincoln / Other Units = O).
    var sel = -1;
    var trigger = el('button', { type: 'button', class: 'select-trigger', 'aria-haspopup': 'listbox', 'aria-expanded': 'false', 'aria-labelledby': labelId });
    var panel = el('div', { class: 'select-list' });
    var search = f.search ? el('input', { class: 'select-search', type: 'text', placeholder: f.searchPlaceholder || 'Aramak için yazın', autocomplete: 'off', 'aria-label': 'Ara' }) : null;
    var list = el('ul', { role: 'listbox', 'aria-labelledby': labelId });
    var empty = el('p', { class: 'select-empty', hidden: '' }, esc(f.emptyText || 'Sonuç bulunamadı.'));
    f.values.forEach(function (opt, i) {
      var li = el('li', { role: 'option', 'data-value': opt.value, 'data-index': i, 'data-search': opt.label + ' ' + opt.value }, CHECK + '<span class="opt"></span>');
      if (opt.html) li.lastChild.innerHTML = opt.html; else li.lastChild.textContent = opt.label;
      li.addEventListener('mousedown', function (e) { e.preventDefault(); });
      li.addEventListener('click', function () { sel = i; render(); changed(); close(); trigger.focus(); });
      list.appendChild(li);
    });
    if (search) panel.appendChild(el('div', { class: 'select-search-wrap' }, SEARCH)).appendChild(search);
    panel.appendChild(list); panel.appendChild(empty);
    root.appendChild(trigger); root.appendChild(panel);

    function indexOf(v) {
      for (var i = 0; i < f.values.length; i++) if (f.values[i].value === v) return i;
      return -1;
    }
    function render() {
      var opt = sel >= 0 ? f.values[sel] : null;
      trigger.innerHTML = (opt ? '<span class="opt"></span>' : '<span class="placeholder"></span>') + (f.locked ? LOCK : CHEVRON);
      if (opt && opt.html) trigger.firstChild.innerHTML = opt.html;
      else trigger.firstChild.textContent = opt ? opt.label : (f.placeholder || '');
      list.querySelectorAll('li').forEach(function (li) { li.setAttribute('aria-selected', String(Number(li.getAttribute('data-index')) === sel)); });
    }
    function set(v) { sel = indexOf(v); render(); }
    function pick(li) { sel = Number(li.getAttribute('data-index')); render(); changed(); }
    function changed() { if (f.onChange) f.onChange(sel >= 0 ? f.values[sel].value : ''); scheduleAuto(); }
    function visible() { return Array.prototype.filter.call(list.querySelectorAll('li'), function (li) { return !li.hidden; }); }
    var active = -1;
    function highlight(i) {
      var items = visible();
      list.querySelectorAll('li.active').forEach(function (li) { li.classList.remove('active'); });
      if (!items.length) { active = -1; return; }
      active = (i + items.length) % items.length;
      items[active].classList.add('active');
      items[active].scrollIntoView({ block: 'nearest' });
    }
    function filter() {
      var q = norm(search.value.trim());
      list.querySelectorAll('li').forEach(function (li) {
        li.hidden = !!q && norm(li.getAttribute('data-search')).indexOf(q) < 0;
      });
      empty.hidden = visible().length > 0;
      highlight(0);
    }
    function open() {
      document.querySelectorAll('.select.open').forEach(function (o) { o.classList.remove('open'); });
      root.classList.add('open'); trigger.setAttribute('aria-expanded', 'true');
      if (search) { search.value = ''; filter(); search.focus(); }
      var items = visible(), cur = 0;
      items.forEach(function (li, i) { if (Number(li.getAttribute('data-index')) === sel) cur = i; });
      highlight(cur);
    }
    function close() { root.classList.remove('open'); trigger.setAttribute('aria-expanded', 'false'); }
    function onKey(e) {
      var isOpen = root.classList.contains('open');
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!isOpen) open(); else highlight(active + (e.key === 'ArrowDown' ? 1 : -1));
      } else if (e.key === 'Enter' && isOpen) {
        e.preventDefault();
        var items = visible();
        if (items[active]) { pick(items[active]); close(); trigger.focus(); }
      } else if (e.key === ' ' && isOpen && e.target === trigger) {
        e.preventDefault();
        var it = visible()[active]; if (it) { pick(it); close(); }
      } else if (e.key === 'Escape') { close(); trigger.focus(); }
    }
    if (f.locked) {
      trigger.disabled = true;
      if (f.lockedTitle) root.title = f.lockedTitle;
    } else {
      trigger.addEventListener('click', function () { root.classList.contains('open') ? close() : open(); });
      trigger.addEventListener('keydown', onKey);
    }
    if (search) {
      search.addEventListener('input', filter);
      search.addEventListener('keydown', onKey);
    }
    // Close when focus leaves the whole control (moving into the search box keeps it open).
    root.addEventListener('focusout', function (e) { if (!root.contains(e.relatedTarget)) close(); });
    set(f.default || '');
    return { node: root, get: function () { return sel >= 0 ? f.values[sel].value : ''; }, set: set, focusEl: trigger };
  }

  /* ---------- Charge picker (same menu as the arrest calculator) ----------
   * Fills f.target with the chosen article numbers only: "401, 410". */
  function chargeOptions(f) {
    var code = window.PENAL_CODE || [];
    var hasIdFilter = (f.ids && f.ids.length) || (f.ranges && f.ranges.length);
    return code.filter(function (c) {
      var n = parseInt(c.id, 10);
      var idMatch = !hasIdFilter ||
        (f.ids || []).indexOf(c.id.replace(/[^0-9]/g, '')) >= 0 ||
        (f.ranges || []).some(function (r) { return n >= r[0] && n <= r[1]; });
      var typeMatch = !f.types || f.types.indexOf(c.type) >= 0;
      var customMatch = !f.filter || f.filter(c);
      return idMatch && typeMatch && customMatch;
    }).map(function (c) {
      return {
        value: c.id,
        type: c.type,
        label: c.id + ' ' + c.charge,
        html: '<span class="code-badge type-' + esc(c.type) + '">' + esc(c.id) + '</span><span class="opt-text">' + esc(c.charge) + '</span>',
      };
    });
  }
  function buildCharges(f, labelId) {
    var options = chargeOptions(f);
    var root = el('div', { class: 'charges' });
    var rowsEl = el('div', { class: 'charge-rows' });
    var add = el('button', { type: 'button', class: 'btn' }, PLUS + 'İhlal Ekle');
    root.appendChild(rowsEl); root.appendChild(add);
    var rows = [];

    function sync() {
      var seen = [];
      rows.forEach(function (r) {
        var n = r.select.get().replace(/[^0-9]/g, '');
        if (n && seen.indexOf(n) < 0) seen.push(n);
      });
      var target = controls[f.target];
      if (target) { target.set(seen.join(', ')); if (target.input) delete target.input.dataset.autofill; }
      // Tick the offence type boxes (e.g. Infraction / Misdemeanor / Felony) from the chosen charges.
      // f.classify(option) may override the plain option.type -> key mapping (e.g. to split
      // Infraction into Trafik / Trafik Dışı by article number for the İhlal Raporu).
      var types = {};
      rows.forEach(function (r) {
        var id = r.select.get();
        var opt = options.filter(function (o) { return o.value === id; })[0];
        if (!opt) return;
        var key = f.classify ? f.classify(opt) : opt.type;
        if (key) types[key] = true;
      });
      Object.keys(f.typeTargets || {}).forEach(function (type) {
        var t = controls[f.typeTargets[type]];
        if (t) t.set(types[type] ? f.typeOn : f.typeOff);
      });
      scheduleAuto();
    }
    function addRow(focus) {
      var row = el('div', { class: 'charge-row' });
      var select = buildSelect({
        values: options, search: true, placeholder: 'Seçim Yapın',
        searchPlaceholder: 'Ad veya madde numarasıyla ara...', emptyText: 'Kanun bulunamadı.',
        onChange: sync,
      }, labelId);
      var remove = el('button', { type: 'button', class: 'btn icon-btn', 'aria-label': 'İhlali Kaldır', title: 'İhlali Kaldır' }, TRASH);
      row.appendChild(select.node); row.appendChild(remove);
      rowsEl.appendChild(row);
      var entry = { node: row, select: select };
      rows.push(entry);
      remove.addEventListener('click', function () {
        if (rows.length === 1) { select.set(''); }
        else { rows.splice(rows.indexOf(entry), 1); row.remove(); }
        sync();
      });
      if (focus) select.focusEl.click();
    }
    add.addEventListener('click', function () { addRow(true); });
    addRow(false);
    return { node: root, get: function () { return rows.map(function (r) { return r.select.get(); }).filter(Boolean).join(','); }, set: function () {}, focusEl: rows[0].select.focusEl, noOutput: true };
  }

  /* ---------- Build the form ---------- */
  def.sections.forEach(function (section, si) {
    var panel = el('section', { class: 'panel form-panel', 'aria-labelledby': 'sec-' + si });
    panel.appendChild(el('h2', { id: 'sec-' + si }, esc(section.title)));
    var grid = el('div', { class: 'field-grid' + (section.cols === 3 ? ' cols-3' : '') });
    section.fields.forEach(function (f) {
      var id = 'f-' + f.key, labelId = id + '-label';
      var wrap = el('div', { class: 'field' + (f.span === 'all' ? ' span-all' : '') });
      var labelRow = el('div', { class: 'label-row' });
      labelRow.appendChild(el('label', { id: labelId, for: f.type === 'select' || f.type === 'charges' ? null : id }, esc(f.label) + (f.locked || !def.required ? '' : '<span class="req" aria-hidden="true">*</span>')));
      if (f.tooltip) labelRow.appendChild(el('span', { class: 'help', tabindex: '0', 'aria-label': f.tooltip }, HELP + '<span class="tip" role="tooltip">' + esc(f.tooltip) + '</span>'));
      wrap.appendChild(labelRow);

      var ctrl;
      if (f.type === 'charges') {
        ctrl = buildCharges(f, labelId);
        wrap.appendChild(ctrl.node);
      } else if (f.type === 'select') {
        ctrl = buildSelect(f, labelId);
        wrap.appendChild(ctrl.node);
      } else {
        var input = f.type === 'textarea'
          ? el('textarea', {
              class: 'input plain', id: id, rows: f.rows || 6, placeholder: f.placeholder || null,
              autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', 'data-lpignore': 'true', 'data-1p-ignore': 'true',
            })
          : el('input', {
              class: 'input plain', id: id, placeholder: f.placeholder || null,
              // "search" (not "text") for free-typed fields: Chrome/Firefox never offer their
              // saved name/address personal-info autofill on <input type="search"> — this is what
              // actually stops Google's stored (OOC) address/name data from being suggested at all,
              // even on click. autocomplete="off" alone is not enough (Chrome mostly ignores it for
              // name/address-shaped fields).
              type: f.type === 'date' ? 'date' : f.type === 'time' ? 'time' : f.type === 'number' ? 'number' : 'search',
              min: f.min != null ? f.min : null, max: f.max != null ? f.max : null,
              inputmode: f.type === 'number' ? 'numeric' : null,
              autocomplete: 'off', autocapitalize: 'off', 'data-lpignore': 'true', 'data-1p-ignore': 'true', 'data-form-type': 'other',
            });
        // Readonly until the user actually focuses the field: browsers do not autofill readonly
        // inputs, so this blocks the page-load autofill pass that would otherwise overwrite a
        // "name"/"address"-labelled field with the browser's saved real (OOC) profile data.
        if ((f.type === 'text' || f.type === 'textarea' || !f.type) && !f.locked) {
          input.setAttribute('readonly', 'readonly');
          input.addEventListener('focus', function () { input.removeAttribute('readonly'); }, { once: true });
        }
        if (f.type !== 'textarea' && f.type !== 'date' && f.type !== 'time' && f.type !== 'number') {
          // type="search" natively clears itself on Escape in Chrome/Safari; block that so it
          // behaves like a normal text field for the user.
          input.addEventListener('keydown', function (e) { if (e.key === 'Escape') e.preventDefault(); });
        }
        if (f.upper) {
          input.addEventListener('input', function () {
            var pos = input.selectionStart;
            input.value = input.value.toLocaleUpperCase(f.upper === 'tr' ? 'tr-TR' : 'en-US');
            try { input.setSelectionRange(pos, pos); } catch (e) {}
          });
        }
        if (f.type === 'date' && f.today) {
          // Today's date from the computer's clock (local time, not UTC).
          var now = new Date();
          input.value = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
        }
        input.addEventListener('input', function () { delete input.dataset.autofill; });
        if (f.locked) {
          // Filled automatically (e.g. from the charge picker); not editable by hand.
          input.readOnly = true;
          input.tabIndex = -1;
          var lockWrap = el('div', { class: 'locked-input', title: f.lockedTitle || null });
          lockWrap.appendChild(input);
          lockWrap.insertAdjacentHTML('beforeend', LOCK);
          wrap.appendChild(lockWrap);
        } else {
          wrap.appendChild(input);
        }
        ctrl = { get: function () { return input.value; }, set: function (v) { input.value = v || ''; }, focusEl: input, input: input };
      }
      if (f.hint) wrap.appendChild(el('p', { class: 'hint' }, esc(f.hint)));
      ctrl.field = f;
      ctrl.wrap = wrap;
      controls[f.key] = ctrl;
      grid.appendChild(wrap);
    });
    panel.appendChild(grid);
    form.appendChild(panel);
  });

  /* ---------- Officer fields from the active character ---------- */
  function prefill() {
    if (!window.LSPDPrefs) return;
    var c = LSPDPrefs.getActiveCharacter() || {};
    Object.keys(controls).forEach(function (key) {
      var ctrl = controls[key], src = ctrl.field.prefill;
      if (!src) return;
      var value = c[src] || '';
      if (ctrl.field.upper) value = value.toLocaleUpperCase('en-US');
      if (ctrl.input) {
        // Only replace what is empty or was filled in automatically.
        if (ctrl.input.value && !ctrl.input.dataset.autofill) return;
        ctrl.set(value);
        if (value) ctrl.input.dataset.autofill = '1'; else delete ctrl.input.dataset.autofill;
      } else {
        ctrl.set(value);
      }
    });
  }
  /* ---------- Text written automatically from other fields (def.autoText) ----------
   * Kept up to date until the user edits the target box by hand; clearing it turns it back on. */
  var autoTimer = null;
  function scheduleAuto() {
    if (!def.autoText) return;
    clearTimeout(autoTimer);
    autoTimer = setTimeout(updateAuto, 0);
  }
  function updateAuto() {
    var target = controls[def.autoText.target];
    if (!target || !target.input) return;
    var input = target.input;
    if (input.value && !input.dataset.autotext) return;   // edited by hand
    var raw = {};
    Object.keys(controls).forEach(function (k) { raw[k] = controls[k].get(); });
    var text = def.autoText.build(raw) || '';
    input.value = text;
    if (text) input.dataset.autotext = '1'; else delete input.dataset.autotext;
  }
  form.addEventListener('input', function (e) {
    var target = def.autoText && controls[def.autoText.target];
    if (target && e.target === target.input) {
      if (target.input.value) delete target.input.dataset.autotext; else scheduleAuto();
      return;
    }
    scheduleAuto();
  });
  document.addEventListener('lspd:characters-change', scheduleAuto);

  prefill();
  scheduleAuto();
  document.addEventListener('lspd:characters-change', prefill);

  /* ---------- Output ---------- */
  function formatValue(f, v) {
    if (!v) return '';
    if (f.type === 'date') {
      var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
      return m ? m[3] + '/' + m[2] + '/' + m[1] : v;
    }
    if (f.upper) v = v.toLocaleUpperCase(f.upper === 'tr' ? 'tr-TR' : 'en-US');
    return v;
  }
  function values() {
    var out = {};
    Object.keys(controls).forEach(function (key) {
      if (controls[key].noOutput) return;
      var v = formatValue(controls[key].field, controls[key].get());
      // Empty boxes are written as "—" (def.emptyValue) in the report and its title.
      out[key] = String(v).trim() ? v : (def.emptyValue != null ? def.emptyValue : '');
    });
    return out;
  }
  function fill(template, vals, html) {
    return template.replace(/\{([A-Z0-9_]+)\}/g, function (m, key) {
      if (!(key in vals)) return m;
      return html ? esc(vals[key]).replace(/\r?\n/g, '<br>') : vals[key];
    });
  }

  var formView = document.getElementById('form-view');
  var resultView = document.getElementById('result-view');
  var titleInput = document.getElementById('result-title');
  var statusEl = document.getElementById('result-status');
  var output = '', statusTimer;

  function showStatus(text) {
    statusEl.textContent = text;
    statusEl.classList.add('show');
    clearTimeout(statusTimer);
    statusTimer = setTimeout(function () { statusEl.classList.remove('show'); }, 2500);
  }
  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    var ta = el('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
    return Promise.resolve();
  }

  /* Every field is required. */
  function validate() {
    var first = null;
    Object.keys(controls).forEach(function (key) {
      var c = controls[key];
      if (c.field.locked) return;   // filled from another field, which shows the error
      var empty = !String(c.get() || '').trim();
      c.wrap.classList.toggle('invalid', empty);
      var msg = c.wrap.querySelector('.error-msg');
      if (empty && !msg) c.wrap.appendChild(el('p', { class: 'error-msg' }, c.field.type === 'charges' ? 'En az bir kanun seçmelisiniz.' : 'Bu alan zorunludur.'));
      if (!empty && msg) msg.remove();
      if (empty && !first) first = c;
    });
    if (first) {
      first.wrap.scrollIntoView({ block: 'center', behavior: 'smooth' });
      if (first.focusEl && !first.focusEl.disabled) first.focusEl.focus({ preventScroll: true });
    }
    return !first;
  }
  // Clear a field's error as soon as it gets a value.
  form.addEventListener('input', function () { if (form.querySelector('.invalid')) recheck(); });
  form.addEventListener('click', function () { if (form.querySelector('.invalid')) setTimeout(recheck, 0); });
  document.addEventListener('keyup', function () { if (form.querySelector('.invalid')) recheck(); });
  function recheck() {
    Object.keys(controls).forEach(function (key) {
      var c = controls[key];
      if (c.wrap.classList.contains('invalid') && String(c.get() || '').trim()) {
        c.wrap.classList.remove('invalid');
        var m = c.wrap.querySelector('.error-msg'); if (m) m.remove();
      }
    });
  }

  /* Number boxes with min / max (e.g. 1–30 days). */
  function checkRanges() {
    var first = null;
    Object.keys(controls).forEach(function (key) {
      var c = controls[key], f = c.field;
      if (f.type !== 'number' || (f.min == null && f.max == null)) return;
      var v = String(c.get() || '').trim(), n = Number(v);
      var bad = v !== '' && (!/^\d+$/.test(v) || (f.min != null && n < f.min) || (f.max != null && n > f.max));
      c.wrap.classList.toggle('invalid', bad);
      var msg = c.wrap.querySelector('.error-msg');
      if (bad && !msg) c.wrap.appendChild(el('p', { class: 'error-msg' }, esc(f.min + ' ile ' + f.max + ' arasında bir değer girin.')));
      if (!bad && msg) msg.remove();
      if (bad && !first) first = c;
    });
    if (first) { first.wrap.scrollIntoView({ block: 'center', behavior: 'smooth' }); first.focusEl.focus({ preventScroll: true }); }
    return !first;
  }
  form.addEventListener('input', function (e) {
    var c = Object.keys(controls).map(function (k) { return controls[k]; }).filter(function (c) { return c.input === e.target; })[0];
    if (c && c.field.type === 'number' && c.wrap.classList.contains('invalid')) checkRanges();
  });

  document.getElementById('generate-btn').addEventListener('click', function () {
    if (def.required && !validate()) return;
    if (!checkRanges()) return;
    var vals = values();
    output = fill(def.template, vals, def.outputFormat !== 'bbcode');
    if (titleInput) titleInput.value = fill(def.titleTemplate || '', vals, false);
    var code = document.getElementById('result-code');
    if (code) code.value = output;
    formView.hidden = true;
    resultView.hidden = false;
    window.scrollTo(0, 0);
  });
  document.getElementById('edit-btn').addEventListener('click', function () {
    resultView.hidden = true;
    formView.hidden = false;
    window.scrollTo(0, 0);
  });
  var copyTitleBtn = document.getElementById('copy-title-btn');
  if (copyTitleBtn) {
    // Not every report shows a title (e.g. İhlal Raporu has no title output).
    copyTitleBtn.addEventListener('click', function () {
      copy(titleInput.value).then(function () { showStatus('Başlık kopyalandı.'); });
    });
  }
  document.getElementById('copy-btn').addEventListener('click', function () {
    copy(output).then(function () { showStatus('Rapor kopyalandı.'); });
  });

})();
