/*
 * Report form engine. A page defines window.REPORT_FORM (title, sections, fields, output template)
 * and this script builds the form, fills officer fields from the active character, and turns the
 * answers into the report (copy as HTML, copy title, download as image).
 *
 * Field types: text, number (min, max), select, date (dd/MM/yyyy), time (HH:mm), textarea, checkbox
 *              (single checkbox; get() returns f.onValue when checked, f.offValue otherwise — no
 *              separate label row, no required-star, no hint row),
 *              charges (penal code picker that writes article numbers into f.target).
 * Field options: key, label, placeholder, hint, tooltip, values [{label, value}], default,
 *                upper ('en' | 'tr'), span ('all'), prefill ('name' | 'badge' | 'division'), search (true),
 *                ids / ranges / types / target / typeTargets / typeOn / typeOff / classify (charges only),
 *                locked (select, text), today (date: starts with the computer's date), onValue / offValue
 *                (checkbox only), hideLabel (skips the label row entirely — e.g. when the section title
 *                already says it, as with a single big textarea).
 * default on a text/textarea field sets its starting value (e.g. "—" for an optional field); the
 * user can still edit or clear it, and it counts as filled for the required-field check. default on a
 * checkbox (truthy) starts it checked.
 * Top-level def.outputFormat: 'bbcode' outputs the template with raw values (no HTML-escaping, no
 *                              newline-to-<br> conversion); anything else (default) outputs HTML.
 * Charges-only options: ids/ranges narrow the list by article number, types narrows it by penal
 *                        code type (e.g. ["I", "M"]); with neither ids nor ranges set, all articles
 *                        matching types are offered. filter(codeEntry) can drop individual articles
 *                        with arbitrary logic on top of ids/ranges/types. classify(option) maps a
 *                        chosen article to a key into typeTargets, overriding the default (the
 *                        article's own type letter) — used to split "I" into separate boxes by
 *                        article range.
 * Repeatable groups: a def.sections entry with group:true (key, label, title, min, max, target,
 *                     blockTemplate, joinWith, addLabel, cols, layout, fields) renders `min` instances
 *                     plus an add button (up to `max`); only instances past `min` can be removed, and
 *                     only the last one (so numbering never has gaps). Its `fields` use {suffix, ...}
 *                     instead of {key, ...} — each instance n gets its own control keyed
 *                     `${key}_${n}_${suffix}`, and literal "{{N}}" inside a field's label is replaced
 *                     with n (e.g. label: "{{N}}) Kanıt Başlığı"). layout (default 'panels') picks the
 *                     look: 'panels' gives each instance its own titled top-level panel ("İlgili Kişi
 *                     (1)", "(2)", ...); 'cards' puts every instance in its own bordered card nested
 *                     inside one outer panel (section.title), with a small remove button in the card's
 *                     corner instead of a title; 'inline' puts every instance's fields directly in one
 *                     shared panel's grid (section.title) with the add button as the grid's last row
 *                     (e.g. a 6th/7th Kanıt pair). (panelPerInstance: false is an older alias for
 *                     layout: 'inline'.) blockTemplate is a single instance's chunk of the output,
 *                     written with literal "{{N}}" where the instance number goes (e.g.
 *                     "{KISI_{{N}}_ADI_SOYADI}"); at generate time every instance's filled blockTemplate
 *                     is joined with joinWith (default "\n\n") and substituted into the main template at
 *                     {target}.
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
  var CLIPBOARD = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>';
  var XMARK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';

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
  var conditionals = [];   // fields with f.showWhen: {wrap, key, equals}
  var groups = [];      // repeatable field groups (def.sections entries with group:true)
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
    function changed() {
      // A real pick (never set by our own code, e.g. prefill or a default) — stop treating it
      // as still-defaulted so prefill() won't override it on a later character switch.
      trigger.dataset.userChanged = '1';
      if (f.onChange) f.onChange(sel >= 0 ? f.values[sel].value : ''); scheduleAuto();
    }
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
    var add = el('button', { type: 'button', class: 'btn' }, PLUS + (f.addLabel || 'İhlal Ekle'));
    root.appendChild(rowsEl); root.appendChild(add);
    var rows = [];

    function sync() {
      // f.countDuplicates (e.g. Tutuklama Raporu) keeps a per-article tally and writes
      // "003 (x2), 101" instead of silently collapsing repeats to a bare unique list.
      var order = [];
      var counts = {};
      rows.forEach(function (r) {
        var n = r.select.get().replace(/[^0-9]/g, '');
        if (!n) return;
        if (!(n in counts)) { counts[n] = 0; order.push(n); }
        counts[n]++;
      });
      var target = controls[f.target];
      if (target) {
        // f.sortNumeric (e.g. Tutuklama Raporu) writes the article list lowest-to-highest
        // instead of in the order the officer picked them.
        var ordered = f.sortNumeric ? order.slice().sort(function (a, b) { return parseInt(a, 10) - parseInt(b, 10); }) : order;
        var text = f.countDuplicates
          ? ordered.map(function (n) { return counts[n] > 1 ? n + ' (x' + counts[n] + ')' : n; }).join(', ')
          : ordered.join(', ');
        target.set(text);
        if (target.input) delete target.input.dataset.autofill;
      }
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
  /* Builds one field's DOM + control. Does not register it into `controls` or append it anywhere;
   * callers (a plain section, or a repeatable group instance) do that themselves. */
  function buildField(f) {
    var id = 'f-' + f.key, labelId = id + '-label';

    if (f.type === 'checkbox') {
      var cbWrap = el('div', { class: 'field checkbox-field' + (f.span === 'all' ? ' span-all' : '') });
      var cb = el('input', { type: 'checkbox', id: id, class: 'checkbox-input' });
      if (f.default) cb.checked = true;
      var cbLabel = el('label', { for: id, class: 'checkbox-label' });
      cbLabel.appendChild(cb);
      cbLabel.appendChild(document.createTextNode(f.label));
      cbWrap.appendChild(cbLabel);
      cb.addEventListener('change', scheduleAuto);
      return {
        wrap: cbWrap,
        ctrl: {
          get: function () { return cb.checked ? f.onValue : f.offValue; },
          set: function (v) { cb.checked = v === f.onValue; },
          focusEl: cb,
        },
      };
    }

    if (f.type === 'toggle') {
      var tgWrap = el('div', { class: 'field toggle-field' + (f.span === 'all' ? ' span-all' : '') });
      if (!f.hideLabel) {
        var tgLabelRow = el('div', { class: 'label-row' });
        tgLabelRow.appendChild(el('label', {}, esc(f.label)));
        tgWrap.appendChild(tgLabelRow);
      }
      var onLabel = f.onLabel || 'Evet', offLabel = f.offLabel || 'Hayır';
      var isOn = f.default === true || f.default === onLabel;
      var tgBtn = el('button', { type: 'button', id: id, class: 'toggle-switch', role: 'switch' });
      var tgKnob = el('span', { class: 'toggle-knob' });
      var tgText = el('span', { class: 'toggle-text' });
      tgBtn.appendChild(tgKnob);
      tgBtn.appendChild(tgText);
      function renderToggle() {
        tgBtn.classList.toggle('on', isOn);
        tgBtn.setAttribute('aria-checked', String(isOn));
        tgKnob.innerHTML = isOn ? CHECK : XMARK;
        tgText.textContent = isOn ? onLabel : offLabel;
      }
      renderToggle();
      tgBtn.addEventListener('click', function () {
        isOn = !isOn;
        renderToggle();
        updateConditionals();
        scheduleAuto();
      });
      tgWrap.appendChild(tgBtn);
      if (f.hint) tgWrap.appendChild(el('p', { class: 'hint' }, esc(f.hint)));
      if (f.showWhen) conditionals.push({ wrap: tgWrap, conds: Array.isArray(f.showWhen) ? f.showWhen : [f.showWhen] });
      return {
        wrap: tgWrap,
        ctrl: {
          get: function () { return isOn ? onLabel : offLabel; },
          set: function (v) { isOn = v === onLabel || v === true; renderToggle(); },
          focusEl: tgBtn,
        },
      };
    }

    if (f.type === 'copylist') {
      // Reference text, not a real input: not registered under any key, never validated, never
      // saved in a draft, never written to the report. Each line gets its own quiet copy-to-
      // clipboard button (no status toast — the click itself is the only feedback, via the icon
      // briefly turning into a checkmark).
      var clWrap = el('div', { class: 'field copylist span-all' });
      if (f.intro) clWrap.appendChild(el('p', { class: 'copylist-intro' }, esc(f.intro)));
      var clList = el('ul', { class: 'copylist-items' });
      (f.items || []).forEach(function (text) {
        var li = el('li', { class: 'copylist-item' });
        li.appendChild(el('span', {}, esc(text)));
        var copyBtn = el('button', { type: 'button', class: 'btn icon-btn copylist-copy', 'aria-label': 'Kopyala', title: 'Kopyala' }, CLIPBOARD);
        copyBtn.addEventListener('click', function () {
          copy(text).then(function () {
            copyBtn.innerHTML = CHECK;
            setTimeout(function () { copyBtn.innerHTML = CLIPBOARD; }, 900);
          });
        });
        li.appendChild(copyBtn);
        clList.appendChild(li);
      });
      clWrap.appendChild(clList);
      return { wrap: clWrap, ctrl: { get: function () { return ''; }, set: function () {}, focusEl: null, noOutput: true } };
    }

    var wrap = el('div', { class: 'field' + (f.span === 'all' ? ' span-all' : '') });
    if (!f.hideLabel) {
      var labelRow = el('div', { class: 'label-row' });
      labelRow.appendChild(el('label', { id: labelId, for: f.type === 'select' || f.type === 'charges' ? null : id }, esc(f.label) + (f.locked || !def.required ? '' : '<span class="req" aria-hidden="true">*</span>')));
      if (f.tooltip) labelRow.appendChild(el('span', { class: 'help', tabindex: '0', 'aria-label': f.tooltip }, HELP + '<span class="tip" role="tooltip">' + esc(f.tooltip) + '</span>'));
      wrap.appendChild(labelRow);
    }

    var ctrl;
    if (f.type === 'charges') {
      ctrl = buildCharges(f, labelId);
      wrap.appendChild(ctrl.node);
    } else if (f.type === 'select') {
      if (f.fillTarget) {
        // Picking an option here starts (or refreshes) another field's text with this option's
        // value — e.g. a "Kanıt Türü" picker filling the editable "Kanıt Başlığı" box next to it.
        // Only overwrites what's empty or was itself last filled this same way (dataset.autofill,
        // same convention as the officer-prefill mechanism), so an edit the user typed by hand is
        // never clobbered by picking a different type afterward.
        f.onChange = function (value) {
          var target = controls[f.fillTarget];
          if (!target || !target.input) return;
          if (target.input.value && !target.input.dataset.autofill) return;
          target.set(value);
          if (value) target.input.dataset.autofill = '1'; else delete target.input.dataset.autofill;
        };
      }
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
        if (f.default != null && (f.type === 'text' || f.type === 'textarea' || !f.type)) {
          // Starting value for a free-typed field (e.g. "—" for an optional second officer);
          // counts as filled for the required-field check, but the user can still overwrite it.
          input.value = f.default;
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
        if (f.lookupTarget && typeof f.lookup === 'function') {
          // On leaving the field (not on every keystroke), look up its value (e.g. a name against
          // a roster) and fill another field with the result — same "don't clobber a hand-typed
          // value" convention as fillTarget/prefill (dataset.autofill).
          input.addEventListener('blur', function () {
            var target = controls[f.lookupTarget];
            if (!target || !target.input) return;
            if (target.input.value && !target.input.dataset.autofill) return;
            var result = f.lookup(input.value);
            target.set(result || '');
            if (result) target.input.dataset.autofill = '1'; else delete target.input.dataset.autofill;
          });
        }
    }
    if (f.hint) wrap.appendChild(el('p', { class: 'hint' }, esc(f.hint)));
    // f.showWhen may be a single {key, equals} or an array of them (all must match — AND).
    if (f.showWhen) conditionals.push({ wrap: wrap, conds: Array.isArray(f.showWhen) ? f.showWhen : [f.showWhen] });
    return { wrap: wrap, ctrl: ctrl };
  }
  function updateConditionals() {
    conditionals.forEach(function (c) {
      var show = c.conds.every(function (cond) {
        var ctrl = controls[cond.key];
        return ctrl && ctrl.get() === cond.equals;
      });
      c.wrap.hidden = !show;
    });
  }

  /* ---------- Panel with an external title ----------
   * Builds "<div class=section-block><h2 class=section-title>...</h2><section class=panel
   * form-panel>...</section></div>" — the title sits above the bordered box rather than as its
   * first line, with the section-block's own margin giving consistent breathing room between
   * one boxed section and the next. Appended to opts.container (default: form), before opts.before
   * if given (opts.before must already be a child of opts.container, or omitted to just append). */
  function titledPanel(titleText, opts) {
    opts = opts || {};
    var block = el('div', { class: 'section-block' });
    block.appendChild(el('h2', { class: 'section-title', id: opts.id || null }, esc(titleText)));
    var panel = el('section', { class: 'panel form-panel', 'aria-labelledby': opts.id || null });
    block.appendChild(panel);
    var container = opts.container || form;
    if (opts.before) container.insertBefore(block, opts.before); else container.appendChild(block);
    return panel;
  }

  /* ---------- Repeatable field group ----------
   * section.fields use {suffix, ...} instead of {key, ...}; each instance n gets its own control
   * keyed section.key + '_' + n + '_' + suffix, and any literal "{{N}}" in a field's label is
   * replaced with n. section.blockTemplate is a per-instance BBCode/HTML chunk using
   * {KEY_{{N}}_SUFFIX}-style placeholders (literal "{{N}}"), joined with section.joinWith and
   * written into the main template at {section.target} when the report is generated.
   * section.layout picks how instances are shown (default 'panels'; section.panelPerInstance ===
   * false is the older way to ask for 'inline', kept for back-compat):
   *  - 'panels': each instance is its own titled top-level panel — "İlgili Kişi (1)", "(2)", ... —
   *    with a "+ label Ekle" button after the last one.
   *  - 'cards': one outer panel titled section.title/label holds a nested, individually-bordered
   *    card per instance (no per-card title — cards are told apart by their own box, like the
   *    person cards in a "Involved People" box), with a small remove button in each card's corner,
   *    and the add button below the last card (e.g. İlgili Kişi).
   *  - 'inline': a single panel (section.title) holds every instance's fields directly in one grid,
   *    with the add button as the grid's last (span-all) row (e.g. Kanıtlar, adding a 6th/7th pair).
   * In every layout, only the last instance past section.min can be removed, so numbering never gaps. */
  function buildGroupSection(section) {
    var layout = section.layout || (section.panelPerInstance === false ? 'inline' : 'panels');
    var count = section.min;
    var addBtn = el('button', { type: 'button', class: 'btn' }, PLUS + (section.addLabel || (section.label + ' Ekle')));

    function fieldDefsFor(n) {
      return section.fields.map(function (f) {
        var copy = {};
        for (var k in f) copy[k] = f[k];
        copy.key = section.key + '_' + n + '_' + f.suffix;
        if (typeof copy.label === 'string') copy.label = copy.label.replace(/\{\{N\}\}/g, n);
        // fillTarget on a group field names a sibling field's *suffix*; resolve it to that
        // instance's real key (e.g. "BASLIK" -> "KANIT_3_BASLIK") before buildField ever sees it.
        if (copy.fillTarget) copy.fillTarget = section.key + '_' + n + '_' + copy.fillTarget;
        // section.showWhen (e.g. a group only shown once a toggle is on) also has to apply to
        // each instance field itself, not just the group's outer panel — validate() only skips a
        // field whose own wrap is hidden, and a hidden ancestor doesn't set that.
        if (section.showWhen && !copy.showWhen) copy.showWhen = section.showWhen;
        return copy;
      });
    }
    function dropInstanceControls(n) {
      section.fields.forEach(function (f) { delete controls[section.key + '_' + n + '_' + f.suffix]; });
    }

    var groupRoot;
    if (layout === 'cards') {
      var outerPanel = titledPanel(section.title || section.label);
      groupRoot = outerPanel.parentNode;
      var cardsWrap = el('div', { class: 'group-cards' });
      outerPanel.appendChild(cardsWrap);
      var cardsAddWrap = el('div', { class: 'form-actions group-add' });
      cardsAddWrap.appendChild(addBtn);
      outerPanel.appendChild(cardsAddWrap);
      var cards = [];   // { node, removeBtn }

      function refreshRemovableCards() {
        cards.forEach(function (c, idx) {
          var n = idx + 1;
          if (c.removeBtn) c.removeBtn.style.display = (n === count && n > section.min) ? '' : 'none';
        });
        cardsAddWrap.style.display = count >= section.max ? 'none' : '';
      }
      function buildCard(n) {
        var card = el('div', { class: 'group-card' });
        var removeBtn = null;
        if (n > section.min) {
          removeBtn = el('button', { type: 'button', class: 'btn icon-btn corner-remove-btn', 'aria-label': 'Kaldır', title: 'Kaldır' }, TRASH);
          removeBtn.addEventListener('click', function () {
            dropInstanceControls(n);
            card.remove();
            cards.pop();
            count--;
            refreshRemovableCards();
            scheduleAuto();
          });
          card.appendChild(removeBtn);
        }
        var grid = el('div', { class: 'field-grid' + (section.cols === 3 ? ' cols-3' : '') });
        fieldDefsFor(n).forEach(function (f) {
          var built = buildField(f);
          built.ctrl.field = f;
          built.ctrl.wrap = built.wrap;
          controls[f.key] = built.ctrl;
          grid.appendChild(built.wrap);
        });
        card.appendChild(grid);
        return { node: card, removeBtn: removeBtn };
      }

      for (var k = 1; k <= section.min; k++) {
        var c = buildCard(k);
        cards.push(c);
        cardsWrap.appendChild(c.node);
      }
      refreshRemovableCards();
      addBtn.addEventListener('click', function () {
        count++;
        var c2 = buildCard(count);
        cards.push(c2);
        cardsWrap.appendChild(c2.node);
        refreshRemovableCards();
        scheduleAuto();
      });
    } else if (layout === 'panels') {
      var container = el('div', { class: 'group-section' });
      groupRoot = container;
      form.appendChild(container);
      var addWrap = el('div', { class: 'form-actions group-add' });
      addWrap.appendChild(addBtn);
      container.appendChild(addWrap);
      var panels = [];   // { node, removeBtn }

      function refreshRemovable() {
        panels.forEach(function (p, idx) {
          var n = idx + 1;
          if (p.removeBtn) p.removeBtn.style.display = (n === count && n > section.min) ? '' : 'none';
        });
        addWrap.style.display = count >= section.max ? 'none' : '';
      }
      function buildInstance(n) {
        var block, panel = titledPanel(section.label + ' (' + n + ')', {
          container: container, before: addWrap,
        });
        block = panel.parentNode;
        var removeBtn = null;
        if (n > section.min) {
          removeBtn = el('button', { type: 'button', class: 'btn icon-btn corner-remove-btn', 'aria-label': 'Kaldır', title: 'Kaldır' }, TRASH);
          removeBtn.addEventListener('click', function () {
            dropInstanceControls(n);
            block.remove();
            panels.pop();
            count--;
            refreshRemovable();
            scheduleAuto();
          });
          panel.appendChild(removeBtn);
        }
        var grid = el('div', { class: 'field-grid' + (section.cols === 3 ? ' cols-3' : '') });
        fieldDefsFor(n).forEach(function (f) {
          var built = buildField(f);
          built.ctrl.field = f;
          built.ctrl.wrap = built.wrap;
          controls[f.key] = built.ctrl;
          grid.appendChild(built.wrap);
        });
        panel.appendChild(grid);
        return { node: block, removeBtn: removeBtn };
      }

      for (var i = 1; i <= section.min; i++) panels.push(buildInstance(i));
      refreshRemovable();
      addBtn.addEventListener('click', function () {
        count++;
        panels.push(buildInstance(count));
        refreshRemovable();
        scheduleAuto();
      });
    } else {
      var panel2 = titledPanel(section.title || section.label);
      groupRoot = panel2.parentNode;
      var grid2 = el('div', { class: 'field-grid' + (section.cols === 3 ? ' cols-3' : '') });
      panel2.appendChild(grid2);
      // section.sharedFields: plain (non-repeating) fields shown once, above the repeatable rows,
      // in the same bordered box — e.g. a toggle that gates the group's own visibility, which
      // couldn't gate itself if it only existed inside a conditionally-hidden row.
      (section.sharedFields || []).forEach(function (f) {
        var built = buildField(f);
        built.ctrl.field = f;
        built.ctrl.wrap = built.wrap;
        if (f.key) controls[f.key] = built.ctrl;
        grid2.appendChild(built.wrap);
      });
      var addRowWrap = el('div', { class: 'field span-all group-add-inline' });
      addRowWrap.appendChild(addBtn);
      grid2.appendChild(addRowWrap);
      if (section.showWhen) conditionals.push({ wrap: addRowWrap, conds: Array.isArray(section.showWhen) ? section.showWhen : [section.showWhen] });
      var entries = [];   // { node, removeBtn }

      function refreshRemovable2() {
        entries.forEach(function (e, idx) {
          var n = idx + 1;
          if (e.removeBtn) e.removeBtn.style.display = (n === count && n > section.min) ? '' : 'none';
        });
        addRowWrap.style.display = count >= section.max ? 'none' : '';
      }
      function buildInstance2(n) {
        // One "row" wrapping this instance's own fields (in their own nested grid), so hovering
        // anywhere over the pair — not just the remove button itself — reveals the remove button.
        var item = el('div', { class: 'field span-all group-inline-item' });
        if (section.showWhen) conditionals.push({ wrap: item, conds: Array.isArray(section.showWhen) ? section.showWhen : [section.showWhen] });
        var itemGrid = el('div', { class: 'field-grid' + (section.cols === 3 ? ' cols-3' : '') });
        item.appendChild(itemGrid);
        fieldDefsFor(n).forEach(function (f) {
          var built = buildField(f);
          built.ctrl.field = f;
          built.ctrl.wrap = built.wrap;
          controls[f.key] = built.ctrl;
          itemGrid.appendChild(built.wrap);
        });
        var removeBtn = null;
        if (n > section.min) {
          removeBtn = el('button', { type: 'button', class: 'btn icon-btn group-inline-remove-btn', 'aria-label': 'Kaldır', title: 'Kaldır' }, TRASH);
          removeBtn.addEventListener('click', function () {
            dropInstanceControls(n);
            item.remove();
            entries.pop();
            count--;
            refreshRemovable2();
            scheduleAuto();
          });
          item.appendChild(removeBtn);
        }
        grid2.insertBefore(item, addRowWrap);
        return { node: item, removeBtn: removeBtn };
      }

      for (var j = 1; j <= section.min; j++) entries.push(buildInstance2(j));
      refreshRemovable2();
      addBtn.addEventListener('click', function () {
        count++;
        entries.push(buildInstance2(count));
        refreshRemovable2();
        scheduleAuto();
      });
    }

    groups.push({ def: section, getCount: function () { return count; }, addOne: function () { addBtn.click(); } });
  }

  def.sections.forEach(function (section, si) {
    if (section.group) { buildGroupSection(section); return; }
    var panel = titledPanel(section.title, { id: 'sec-' + si });
    // section.dualColumn: two independent stacked columns (f.side: "left"/"right", default "left")
    // instead of the usual checkerboard auto-flow grid — each side keeps its own fields together
    // regardless of how many of them are conditionally hidden at a given moment.
    if (section.dualColumn) {
      var dualWrap = el('div', { class: 'dual-column-wrap' });
      var leftGrid = el('div', { class: 'field-grid dual-column' });
      var rightGrid = el('div', { class: 'field-grid dual-column' });
      dualWrap.appendChild(leftGrid);
      dualWrap.appendChild(rightGrid);
      section.fields.forEach(function (f) {
        var built = buildField(f);
        built.ctrl.field = f;
        built.ctrl.wrap = built.wrap;
        if (f.key) controls[f.key] = built.ctrl;
        (f.side === 'right' ? rightGrid : leftGrid).appendChild(built.wrap);
      });
      panel.appendChild(dualWrap);
      return;
    }
    var grid = el('div', { class: 'field-grid' + (section.cols === 3 ? ' cols-3' : '') });
    section.fields.forEach(function (f) {
      var built = buildField(f);
      built.ctrl.field = f;
      built.ctrl.wrap = built.wrap;
      if (f.key) controls[f.key] = built.ctrl;   // a copylist field has no key — nothing to register
      grid.appendChild(built.wrap);
    });
    panel.appendChild(grid);
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
      } else if (ctrl.focusEl) {
        // Select: skip once the user has actually picked something themselves (dataset.userChanged,
        // set by buildSelect's changed()); otherwise apply the prefill value, falling back to the
        // field's own static default (e.g. Görevlendirme's "Adam") when nothing is saved for it.
        if (ctrl.focusEl.dataset.userChanged) return;
        ctrl.set(value || (ctrl.field.default != null ? ctrl.field.default : ''));
      } else {
        ctrl.set(value);
      }
    });
  }
  /* ---------- Text written automatically from other fields (def.autoText) ----------
   * Kept up to date until the user edits the target box by hand; clearing it turns it back on.
   * def.autoText.alwaysLive skips that hand-edit freeze entirely — the box is always fully
   * recomputed from the other fields' current values, whether it's empty or not (e.g. a summary
   * the officer is never meant to hand-write over, only ever read). */
  var autoTimer = null;
  function scheduleAuto() {
    clearTimeout(autoTimer);
    autoTimer = setTimeout(runAuto, 0);
    scheduleDraftSave();
  }
  function runAuto() {
    updateAuto();
    updateAutoAppend();
  }
  function updateAuto() {
    if (!def.autoText) return;
    var target = controls[def.autoText.target];
    if (!target || !target.input) return;
    var input = target.input;
    if (!def.autoText.alwaysLive && input.value && !input.dataset.autotext) return;   // edited by hand
    var raw = {};
    Object.keys(controls).forEach(function (k) { raw[k] = controls[k].get(); });
    var text = def.autoText.build(raw) || '';
    input.value = text;
    if (text) input.dataset.autotext = '1'; else delete input.dataset.autotext;
  }
  /* ---------- Text kept in sync inside another (free-typed) field (def.autoAppend) ----------
   * Unlike autoText, this doesn't own the whole box — it tracks just its own block (marked with a
   * leading zero-width space) and keeps THAT block's content current, wherever it currently sits.
   * First time, with nothing to find yet, it's inserted at the end. After that:
   *  - If the exact block we last wrote is still found somewhere in the field (the user may have
   *    moved it up/down, or typed elsewhere, but left it otherwise alone), it's replaced in place
   *    with the freshly recomputed one — so relocating it is respected, not fought.
   *  - If it's no longer found at all (the user edited into it or deleted it), that's treated as the
   *    user taking over that content by hand: left alone from then on, exactly like autoText already
   *    does for a hand-edited target field, and it never "helpfully" reappears at the bottom.
   * The marker rides along inside the field's own value, so this survives a page reload from a saved
   * draft with no extra bookkeeping, and it's stripped from the final report output (see values()). */
  var AUTOAPPEND_MARKER = '​';
  var autoAppendLast = {};   // target key -> exact "marker + text" block we last wrote there
  function updateAutoAppend() {
    if (!def.autoAppend) return;
    var cfg = def.autoAppend;
    var target = controls[cfg.target];
    if (!target || !target.input) return;
    var input = target.input;
    var raw = {};
    Object.keys(controls).forEach(function (k) { raw[k] = controls[k].get(); });
    var text = cfg.build(raw) || '';
    var sep = cfg.separator != null ? cfg.separator : '\n\n';
    var current = input.value;
    var newBlock = text ? AUTOAPPEND_MARKER + text : '';
    var lastBlock = autoAppendLast[cfg.target];
    var newValue = current, idx = -1;

    if (lastBlock) {
      idx = current.indexOf(lastBlock);
      if (idx >= 0) {
        newValue = current.slice(0, idx) + newBlock + current.slice(idx + lastBlock.length);
      }
      // else: block is gone/altered — the user has taken it over; leave `current` as-is.
    } else if (newBlock) {
      // Nothing written yet: insert fresh at the end.
      newValue = current.replace(/\s+$/, '') + sep + newBlock;
    }

    // Whatever put the marker where it is (moved by the user, or just inserted above), make sure a
    // blank-line separator sits between it and any text before it — e.g. the user typing their own
    // narrative directly in front of an already-present block, with no separator of their own yet.
    var mIdx = newValue.indexOf(AUTOAPPEND_MARKER);
    if (mIdx > 0) {
      var before = newValue.slice(0, mIdx).replace(/\s+$/, '');
      newValue = before ? before + sep + newValue.slice(mIdx) : newValue.slice(mIdx);
    }

    if (newValue !== current) {
      var focused = document.activeElement === input;
      var pos = focused ? input.selectionStart : null;
      target.set(newValue);
      if (focused) { try { pos = Math.min(pos, newValue.length); input.setSelectionRange(pos, pos); } catch (e) {} }
    }
    autoAppendLast[cfg.target] = newBlock;
  }
  form.addEventListener('input', function (e) {
    var target = def.autoText && controls[def.autoText.target];
    if (target && e.target === target.input) {
      if (def.autoText.alwaysLive) { scheduleAuto(); return; }
      if (target.input.value) delete target.input.dataset.autotext; else scheduleAuto();
      return;
    }
    scheduleAuto();
  });
  // Fallback for native date/time/number inputs: some embedded browsers (e.g. FiveM's CEF-based
  // NUI) don't reliably fire 'input' while a segment (hour/minute) changes, only 'change' once the
  // control loses focus or the value is otherwise committed.
  form.addEventListener('change', function (e) {
    if (e.target && (e.target.type === 'time' || e.target.type === 'date' || e.target.type === 'number')) scheduleAuto();
  });
  document.addEventListener('lspd:characters-change', scheduleAuto);

  /* ---------- Draft auto-save (localStorage, per page; def.draftMaxAgeMs overrides the default
   * 6-hour expiry, e.g. 3600000 for 1 hour) ----------
   * Recovers from an accidentally closed/reloaded tab. Saved on every change (debounced) and
   * restored once on load, after the officer-prefill pass so a saved draft wins over it; a
   * repeatable group is grown first (via its own "Ekle" button) to fit however many instances
   * were saved. Uses localStorage, never a cookie: it is never attached to any HTTP request (a
   * cookie is sent on every request to the site; localStorage never leaves the browser at all),
   * it is strictly scoped to this exact origin the same way the character-prefs cookies already
   * are, and it is still cleared automatically once stale. */
  var DRAFT_MAX_AGE_MS = def.draftMaxAgeMs || 6 * 60 * 60 * 1000;
  var draftKey = 'lspd_draft_' + location.pathname;
  var draftTimer = null;
  function scheduleDraftSave() {
    clearTimeout(draftTimer);
    draftTimer = setTimeout(saveDraft, 400);
  }
  function saveDraft() {
    var values = {};
    Object.keys(controls).forEach(function (key) {
      var c = controls[key];
      if (c.noOutput) return;   // e.g. the charges picker's own row state
      values[key] = c.get();
    });
    try { localStorage.setItem(draftKey, JSON.stringify({ ts: Date.now(), values: values })); } catch (e) {}
  }
  function loadDraft() {
    var raw;
    try { raw = localStorage.getItem(draftKey); } catch (e) { return; }
    if (!raw) return;
    var data;
    try { data = JSON.parse(raw); } catch (e) { return; }
    if (!data || !data.values) return;
    if (!data.ts || Date.now() - data.ts > DRAFT_MAX_AGE_MS) {
      try { localStorage.removeItem(draftKey); } catch (e) {}
      return;
    }
    groups.forEach(function (g) {
      var prefix = g.def.key + '_', wanted = 0;
      Object.keys(data.values).forEach(function (k) {
        if (k.indexOf(prefix) !== 0) return;
        var n = parseInt(k.slice(prefix.length), 10);
        if (n > wanted) wanted = n;
      });
      while (g.getCount() < wanted && g.getCount() < g.def.max) g.addOne();
    });
    Object.keys(data.values).forEach(function (key) {
      if (controls[key]) controls[key].set(data.values[key]);
    });
  }

  prefill();
  loadDraft();
  updateConditionals();
  // Prime autoAppendLast from what a restored draft already computed to (same inputs -> same text),
  // so the first real run recognizes the block already sitting in the field instead of appending a
  // second copy below it. Only when the field's restored value actually contains the marker already —
  // otherwise (a fresh, empty field) there is nothing to recognize, and priming would wrongly make
  // the very first run think its block was already written and then deleted.
  if (def.autoAppend) {
    var appendTarget = controls[def.autoAppend.target];
    if (appendTarget && appendTarget.input && appendTarget.input.value.indexOf(AUTOAPPEND_MARKER) >= 0) {
      var primeRaw = {};
      Object.keys(controls).forEach(function (k) { primeRaw[k] = controls[k].get(); });
      var primeText = def.autoAppend.build(primeRaw) || '';
      autoAppendLast[def.autoAppend.target] = primeText ? AUTOAPPEND_MARKER + primeText : '';
    }
  }
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
      // ​: the invisible autoAppend marker (see updateAutoAppend) never belongs in the output.
      var v = formatValue(controls[key].field, controls[key].get()).replace(/​/g, '');
      // Empty boxes are written as "—" (def.emptyValue) in the report and its title.
      out[key] = String(v).trim() ? v : (def.emptyValue != null ? def.emptyValue : '');
    });
    return out;
  }
  function fill(template, vals, html, rawKeys) {
    return template.replace(/\{([A-Z0-9_]+)\}/g, function (m, key) {
      if (!(key in vals)) return m;
      // A group's target (e.g. KANIT_LISTESI) already holds fully-escaped HTML built by
      // filling each instance's blockTemplate below — re-escaping it here would turn its
      // "<li>" tags into visible text, so rawKeys marks it to pass through untouched.
      if (html && rawKeys && rawKeys[key]) return vals[key];
      return html ? esc(vals[key]).replace(/\r?\n/g, '<br>') : vals[key];
    });
  }

  var formView = document.getElementById('form-view');
  var resultView = document.getElementById('result-view');
  var titleInput = document.getElementById('result-title');
  var statusEl = document.getElementById('result-status');
  var output = '', statusTimer, lastVals = null;

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
      if (c.field.locked || c.noOutput || (c.wrap && c.wrap.hidden)) return;   // filled from another field / not a real input / conditionally hidden
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

  // Warns before leaving the page with a generated report that hasn't been copied yet, so an
  // accidental tab close/back-navigation doesn't silently lose it (the draft above only survives
  // a *reload*, not the tab actually closing for good).
  var reportPendingCopy = false;
  window.addEventListener('beforeunload', function (e) {
    if (!reportPendingCopy) return;
    e.preventDefault();
    e.returnValue = '';
  });

  var resetBtn = document.getElementById('reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      if (!confirm('Formu sıfırlamak istediğinize emin misiniz? Girilen tüm veriler silinecek.')) return;
      try { localStorage.removeItem(draftKey); } catch (e) {}
      reportPendingCopy = false;
      location.reload();
    });
  }

  document.getElementById('generate-btn').addEventListener('click', function () {
    if (def.required && !validate()) return;
    if (!checkRanges()) return;
    var vals = values();
    var htmlMode = def.outputFormat !== 'bbcode';
    var rawKeys = {};
    groups.forEach(function (g) {
      var n = g.getCount(), blocks = [];
      for (var i = 1; i <= n; i++) blocks.push(fill(g.def.blockTemplate.replace(/\{\{N\}\}/g, i), vals, htmlMode));
      vals[g.def.target] = blocks.join(g.def.joinWith != null ? g.def.joinWith : '\n\n');
      rawKeys[g.def.target] = true;
    });
    if (typeof def.beforeFill === 'function') def.beforeFill(vals);
    output = fill(def.template, vals, htmlMode, rawKeys);
    lastVals = vals;
    if (titleInput) titleInput.value = fill(def.titleTemplate || '', vals, false);
    var code = document.getElementById('result-code');
    if (code) code.value = output;
    var secOut = def.secondaryOutput;
    var secSection = document.getElementById('secondary-output-section');
    if (secOut && secSection) {
      var show = controls[secOut.showField] && controls[secOut.showField].get() === secOut.showValue;
      secSection.hidden = !show;
      if (show) {
        var secVals = {};
        for (var sk in vals) secVals[sk] = vals[sk];
        var secLink = typeof def.sendUrl === 'function' ? def.sendUrl(vals) : '';
        secVals.ARREST_REPORT_LINK = secLink;
        var secCode = document.getElementById('result-code-2');
        if (secCode) secCode.value = typeof secOut.build === 'function' ? secOut.build(secVals, secLink) : fill(secOut.template, secVals, false);
      }
    }
    formView.hidden = true;
    resultView.hidden = false;
    reportPendingCopy = true;
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
    copy(output).then(function () { showStatus('Rapor kopyalandı.'); reportPendingCopy = false; });
  });
  var copyCode2Btn = document.getElementById('copy-code-2-btn');
  if (copyCode2Btn) {
    copyCode2Btn.addEventListener('click', function () {
      var secCode = document.getElementById('result-code-2');
      copy(secCode ? secCode.value : '').then(function () { showStatus('Inmate Check kopyalandı.'); });
    });
  }
  var sendBtn = document.getElementById('send-btn');
  if (sendBtn) {
    sendBtn.addEventListener('click', function () {
      var url = typeof def.sendUrl === 'function' ? def.sendUrl(lastVals || {}) : (def.sendUrl || 'https://chaseyuu.github.io');
      window.open(url, '_blank', 'noopener');
    });
  }

})();
