/* ================= base helpers ================= */
const $ = id => document.getElementById(id);
const esc = t => String(t == null ? '' : t).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const noon = d => { d = d ? new Date(d) : new Date(); d.setHours(12, 0, 0, 0); return d; };
const iso = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const fromIso = s => { const p = String(s).split('-'); return new Date(+p[0], +p[1] - 1, +p[2], 12); };
const addDays = (d, n) => new Date(d.getTime() + n * 86400000);
const today = () => iso(noon());
const diffDays = s => Math.round((fromIso(s) - noon()) / 86400000);
const DOW = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const DOWL = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const MON = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const short = s => { if (!s) return '—'; const d = fromIso(s); return d.getDate() + '/' + (d.getMonth() + 1); };
const dmy = s => { if (!s) return '—'; const d = fromIso(s); return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear(); };
const longD = s => { const d = fromIso(s); return DOWL[d.getDay()] + ' ' + d.getDate() + '/' + (d.getMonth() + 1); };
const fullD = s => { const d = fromIso(s); return DOWL[d.getDay()] + ' ' + d.getDate() + ' de ' + MON[d.getMonth()] + ' de ' + d.getFullYear(); };
const initials = n => String(n || '?').trim().split(/\s+/).slice(0, 2).map(w => w.charAt(0).toUpperCase()).join('');
const first = n => String(n || '').split(' ')[0];
const gs = n => 'Gs. ' + String(Math.round(+n || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const hm = ts => { const d = new Date(ts); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); };
const nowHM = () => hm(Date.now());
function age(s) { if (!s) return ''; const b = fromIso(s), n = noon(); const m = (n.getFullYear() - b.getFullYear()) * 12 + n.getMonth() - b.getMonth(); return m < 12 ? m + ' meses' : Math.floor(m / 12) + (Math.floor(m / 12) === 1 ? ' año' : ' años'); }
function ago(ms) { const m = Math.round((Date.now() - ms) / 60000); if (m < 1) return 'recién'; if (m < 60) return 'hace ' + m + ' min'; const h = Math.round(m / 60); if (h < 24) return 'hace ' + h + ' h'; return 'hace ' + Math.round(h / 24) + ' d'; }
function waNum(p) { const d = String(p || '').replace(/\D/g, ''); if (!d) return ''; if (d.indexOf('595') === 0) return d; if (d.charAt(0) === '0') return '595' + d.slice(1); return '595' + d; }
const waLink = (phone, msg, ejemplo) => 'https://wa.me/' + (ejemplo ? '' : waNum(phone)) + '?text=' + encodeURIComponent(msg);
let tT; function toast(m) { const t = $('toast'); t.textContent = m; t.hidden = false; clearTimeout(tT); tT = setTimeout(() => { t.hidden = true; }, 4200); }
const ej = o => o && o.ejemplo ? ' <span class="tag-ej">ejemplo</span>' : '';
const ICON = {
  cal: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3"></rect><path d="M3 10h18M8 3v4M16 3v4"></path></svg>',
  warn: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex:none"><path d="M12 3l9 16H3z"></path><path d="M12 10v4M12 17h.01"></path></svg>',
  l: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"></path></svg>',
  r: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"></path></svg>'
};

/* ================= theme ================= */
const SUN = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></svg>';
const MOON = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"></path></svg>';
function curTheme() { const t = document.documentElement.dataset.theme; if (t === 'light' || t === 'dark') return t; return window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }
function paintThemeBtn() { const dark = curTheme() === 'dark', b = $('theme'); b.innerHTML = (dark ? SUN : MOON) + '<span>' + (dark ? 'Modo claro' : 'Modo oscuro') + '</span>'; b.setAttribute('aria-label', dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'); }
try { const s = localStorage.getItem('mv-theme'); if (s === 'light' || s === 'dark') document.documentElement.dataset.theme = s; } catch (e) {}
paintThemeBtn();
$('theme').addEventListener('click', () => { const n = curTheme() === 'dark' ? 'light' : 'dark'; document.documentElement.dataset.theme = n; try { localStorage.setItem('mv-theme', n); } catch (e) {} paintThemeBtn(); });
$('menu-btn').addEventListener('click', () => { const o = !$('side').classList.contains('open'); $('side').classList.toggle('open', o); $('menu-btn').setAttribute('aria-expanded', o); });

/* ================= holidays & opening hours ================= */
const FERIADOS_BASE = {
  '2026-01-01': 'Año Nuevo', '2026-03-02': 'Día de los Héroes (trasladado del 1/3)', '2026-04-02': 'Jueves Santo', '2026-04-03': 'Viernes Santo',
  '2026-05-01': 'Día de los Trabajadores', '2026-05-14': 'Independencia Nacional', '2026-05-15': 'Independencia y Día de la Madre', '2026-06-12': 'Paz del Chaco',
  '2026-06-22': 'Jura de la Constitución (trasladado del 20/6)', '2026-06-30': 'Feriado extraordinario (Mundial)', '2026-08-15': 'Fundación de Asunción',
  '2026-09-28': 'Batalla de Boquerón (trasladado del 29/9)', '2026-12-08': 'Virgen de Caacupé', '2026-12-25': 'Navidad',
  '2027-01-01': 'Año Nuevo', '2027-03-01': 'Día de los Héroes', '2027-03-25': 'Jueves Santo', '2027-03-26': 'Viernes Santo', '2027-05-01': 'Día de los Trabajadores',
  '2027-05-14': 'Independencia Nacional', '2027-05-15': 'Independencia y Día de la Madre', '2027-06-12': 'Paz del Chaco', '2027-06-20': 'Jura de la Constitución',
  '2027-08-15': 'Fundación de Asunción', '2027-09-29': 'Batalla de Boquerón', '2027-12-08': 'Virgen de Caacupé', '2027-12-25': 'Navidad'
};
let FX = []; // custom closures from db
function feriado(s) { const c = FX.filter(f => f.fecha === s)[0]; if (c) return c.nombre; return FERIADOS_BASE[s] || ''; }
function closedReason(s, service) {
  const d = fromIso(s), w = d.getDay(), f = feriado(s);
  if (f) return 'Feriado: ' + f;
  if (w === 0) return 'Domingo: cerrado';
  if (service === 'Guardería' && (w === 1 || w === 6)) return 'La guardería funciona de martes a viernes';
  return '';
}
function slots(s) {
  if (!s) return [];
  const w = fromIso(s).getDay(); if (w === 0) return [];
  const end = w === 6 ? 15 : 17, out = [];
  for (let h = 8; h < end; h++) { out.push(String(h).padStart(2, '0') + ':00'); out.push(String(h).padStart(2, '0') + ':30'); }
  return out;
}

/* ================= state ================= */
let db = null;
const D = { pacientes: [], reservas: [], estadias: [], internaciones: [], urgencias: [], presupuestos: [], facturas: [], caja: [], cajadias: [], productos: [], compras: [], feriados: [] };
const ready = {};
const COLS = Object.keys(D);
const UI = { agOffset: 0, agMode: 'semana', agMonth: null, patQ: '', remF: 'Todos', tab: 'resumen', cajaDia: null, repMonth: null, stockQ: '', hosp: 'activos', patSp: 'Todos', patView: 'lista', patC: {} };
const LSget = (k, d) => { try { const x = localStorage.getItem(k); return x ? JSON.parse(x) : d; } catch (e) { return d; } };
const LSset = (k, x) => { try { localStorage.setItem(k, JSON.stringify(x)); } catch (e) {} };
UI.patView = LSget('mv-patview', 'lista'); UI.patC = LSget('mv-patc', {});
let CZ = LSget('mv-cz', {}), NGC = LSget('mv-ngc', {});
const pat = id => D.pacientes.filter(p => p.id === id)[0];
const prod = id => D.productos.filter(p => p.id === id)[0];
function add(col, data) { return db.collection(col).add(data); }
function upd(col, id, data) { return db.doc(col + '/' + id).update(data); }
function del(col, id) { return db.doc(col + '/' + id).delete(); }
const fail = () => toast('No se pudo guardar. Revisá la conexión y probá de nuevo.');

/* ================= nav ================= */
const NAV = [
  ['Clínica', [
    ['inicio', 'Inicio', '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>'],
    ['agenda', 'Agenda y turnos', '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>'],
    ['pacientes', 'Propietarios y pacientes', '<circle cx="7" cy="8" r="2"/><circle cx="17" cy="8" r="2"/><circle cx="4.5" cy="13" r="1.8"/><circle cx="19.5" cy="13" r="1.8"/><path d="M12 13c-3 0-5 3-5 5.5 0 1.4 1.3 2 2.5 1.6 1-.3 1.6-.6 2.5-.6s1.5.3 2.5.6c1.2.4 2.5-.2 2.5-1.6C17 16 15 13 12 13z"/>'],
    ['internacion', 'Internación', '<path d="M3 18V7M3 13h18v5M7 13V9h6a4 4 0 0 1 4 4"/>'],
    ['urgencias', 'Urgencias', '<path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9"/>'],
    ['hotel', 'Hotel y guardería', '<path d="M3 11l9-7 9 7M5 9.5V20h14V9.5M9 20v-5a3 3 0 0 1 6 0v5"/>'],
    ['estetica', 'Baño y peluquería', '<path d="M4 12h16v2a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6zM7 12V6a2 2 0 0 1 4 0"/>'],
    ['recordatorios', 'Recordatorios', '<path d="M6 9a6 6 0 0 1 12 0c0 6 2 7 2 7H4s2-1 2-7M10 20a2 2 0 0 0 4 0"/>']
  ]],
  ['Administración', [
    ['presupuestos', 'Presupuestos', '<path d="M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6"/>'],
    ['facturacion', 'Facturación', '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6"/>'],
    ['caja', 'Caja diaria', '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M3 11h18M8 4h8v3H8z"/>'],
    ['stock', 'Stock y compras', '<path d="M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10"/>'],
    ['tesoreria', 'Tesorería', '<rect x="3" y="6" width="18" height="13" rx="2"/><circle cx="12" cy="12.5" r="2.5"/><path d="M7 9.5v6M17 9.5v6"/>'],
    ['reportes', 'Reportes', '<path d="M5 20V12M10 20V6M15 20v-9M20 20V9"/>'],
    ['config', 'Ajustes', '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-2.7-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3.6 15H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.1-2.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 9.7 4.6V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 2.7 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 .3 1.8"/>']
  ]]
];
const CHEV = '<svg class="chev" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"></path></svg>';
$('nav').innerHTML = NAV.map((g, gi) => '<button type="button" class="ngh" data-ng="' + gi + '" aria-expanded="' + !NGC[gi] + '" aria-controls="ng-' + gi + '"><span>' + g[0] + '</span>' + CHEV + '</button><div class="ng" id="ng-' + gi + '"' + (NGC[gi] ? ' hidden' : '') + '>' + g[1].map(n => '<a href="#' + n[0] + '" data-nav="' + n[0] + '" title="' + n[1] + '"><span class="l"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + n[2] + '</svg><span class="tx">' + n[1] + '</span></span><span class="cnt" id="n-' + n[0] + '" hidden>0</span></a>').join('') + '</div>').join('');
$('side').querySelector('.brand').insertAdjacentHTML('afterend', '<button type="button" class="mini" id="mini" aria-pressed="false"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"></path></svg><span>Contraer menú</span></button>');
function setMini(on) { document.querySelector('.app').classList.toggle('is-mini', on); const b = $('mini'); b.setAttribute('aria-pressed', on); b.setAttribute('aria-label', on ? 'Expandir menú' : 'Contraer menú'); b.title = on ? 'Expandir menú' : ''; b.querySelector('span').textContent = on ? 'Expandir menú' : 'Contraer menú'; LSset('mv-mini', on); }
setMini(LSget('mv-mini', false));
$('mini').addEventListener('click', () => setMini(!document.querySelector('.app').classList.contains('is-mini')));
$('nav').addEventListener('click', e => { const h = e.target.closest('[data-ng]'); if (!h) return; const gi = h.dataset.ng, open = h.getAttribute('aria-expanded') !== 'true'; h.setAttribute('aria-expanded', open); $('ng-' + gi).hidden = !open; if (open) delete NGC[gi]; else NGC[gi] = 1; LSset('mv-ngc', NGC); });
function setNav(name) { document.querySelectorAll('[data-nav]').forEach(a => a.setAttribute('aria-current', a.dataset.nav === name ? 'page' : 'false')); }
function badge(id, n) { const e = $('n-' + id); if (e) { e.textContent = n; e.hidden = !n; } }

/* ================= date picker ================= */
const DP = { id: null, mode: 'libre', service: '', y: 0, m: 0 };
function dateField(id, label, val, mode, full, opt) {
  return '<div class="fld' + (full ? ' full' : '') + '"><span class="lbl" id="l-' + id + '">' + label + '</span><button type="button" class="dpbtn" data-dp="' + id + '" data-mode="' + (mode || 'libre') + '" aria-labelledby="l-' + id + ' t-' + id + '"' + (opt ? ' data-opt="1"' : '') + '>' + ICON.cal + '<span id="t-' + id + '">' + dpText(val) + '</span>' + dpFx(val) + '</button><input type="hidden" id="' + id + '" value="' + esc(val || '') + '"></div>';
}
const dpText = v => v ? esc(DOWL[fromIso(v).getDay()] + ' ' + dmy(v)) : '<span class="ph">Elegir fecha</span>';
const dpFx = v => v && feriado(v) ? '<span class="fx">Feriado</span>' : '';
function openDP(btn) {
  const id = btn.dataset.dp, v = $(id).value, from = id === 'f-hasta' && $('f-desde') ? $('f-desde').value : '', base = v ? fromIso(v) : from ? fromIso(from) : noon();
  DP.id = id; DP.mode = btn.dataset.mode; DP.opt = !!btn.dataset.opt; DP.service = $('f-svc') ? $('f-svc').value : ''; DP.y = base.getFullYear(); DP.m = base.getMonth(); DP.btn = btn;
  renderDP(); const p = $('dp'); p.hidden = false;
  if (window.innerWidth > 820) {
    const r = btn.getBoundingClientRect(), h = p.offsetHeight;
    let top = r.bottom + 6; if (top + h > window.innerHeight - 8) top = Math.max(8, r.top - h - 6);
    p.style.top = top + 'px'; p.style.left = Math.min(Math.max(8, r.left), window.innerWidth - p.offsetWidth - 8) + 'px';
  }
  const f = p.querySelector('.dp-d.sel') || p.querySelector('.dp-d.today') || p.querySelector('.dp-d:not(:disabled)'); if (f) f.focus();
}
function closeDP() { $('dp').hidden = true; if (DP.btn) DP.btn.focus(); DP.btn = null; }
function renderDP() {
  const y = DP.y, m = DP.m, sel = $(DP.id).value, t = today(), turno = DP.mode === 'turno';
  const y0 = turno ? noon().getFullYear() : 1995, y1 = noon().getFullYear() + 2;
  let years = ''; for (let i = y1; i >= y0; i--) years += '<option value="' + i + '"' + (i === y ? ' selected' : '') + '>' + i + '</option>';
  const months = MON.map((n, i) => '<option value="' + i + '"' + (i === m ? ' selected' : '') + '>' + n.charAt(0).toUpperCase() + n.slice(1) + '</option>').join('');
  const firstD = new Date(y, m, 1, 12), lead = (firstD.getDay() + 6) % 7, days = new Date(y, m + 1, 0).getDate();
  let cells = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'].map(w => '<span class="wd">' + w + '</span>').join('');
  for (let i = 0; i < lead; i++) cells += '<span></span>';
  const ferList = [];
  for (let d = 1; d <= days; d++) {
    const s = iso(new Date(y, m, d, 12)), w = new Date(y, m, d, 12).getDay(), f = feriado(s);
    if (f) ferList.push('<span><b>' + d + '/' + (m + 1) + '</b> · ' + esc(f) + '</span>');
    const reason = turno ? (s < t ? 'Fecha pasada' : closedReason(s, DP.service)) : '';
    const cls = ['dp-d', s === t ? 'today' : '', s === sel ? 'sel' : '', f ? 'fer' : '', w === 0 ? 'sun' : ''].join(' ');
    cells += '<button type="button" class="' + cls + '" data-day="' + s + '"' + (reason ? ' disabled' : '') + ' aria-label="' + esc(fullD(s) + (f ? ', feriado: ' + f : '') + (reason && !f ? ', ' + reason : '')) + '" title="' + esc(f || reason) + '">' + d + '</button>';
  }
  $('dp').innerHTML = '<div class="dp-h"><button type="button" class="dp-nav" data-dpm="-1" aria-label="Mes anterior">' + ICON.l + '</button><select id="dp-m" aria-label="Mes">' + months + '</select><select id="dp-y" aria-label="Año">' + years + '</select><button type="button" class="dp-nav" data-dpm="1" aria-label="Mes siguiente">' + ICON.r + '</button></div>' +
    '<div class="dp-g">' + cells + '</div>' +
    '<div class="dp-f">' + (ferList.length ? ferList.join('') : '<span>Sin feriados este mes.</span>') + (turno ? '<span>Lun a vie 08:00–17:00 · sáb 08:00–15:00 · domingos y feriados cerrado' + (DP.service === 'Guardería' ? ' · guardería de martes a viernes' : '') + '</span>' : '') + '</div>' +
    '<div class="dp-acts"><button type="button" class="btn line sm" data-dpt="1"' + (turno && closedReason(t, DP.service) ? ' disabled' : '') + '>Hoy</button>' + (DP.opt ? '<button type="button" class="btn ghost sm" data-dpclear="1">Sin fecha</button>' : '') + '<button type="button" class="btn ghost sm" data-dpclose="1" style="color:var(--muted)">Cerrar</button></div>';
}
function pickDay(s) {
  $(DP.id).value = s;
  const b = document.querySelector('[data-dp="' + DP.id + '"]');
  if (b) { $('t-' + DP.id).innerHTML = dpText(s); const fx = b.querySelector('.fx'); if (fx) fx.remove(); b.insertAdjacentHTML('beforeend', dpFx(s)); }
  closeDP(); $(DP.id).dispatchEvent(new Event('change', { bubbles: true }));
}
$('dp').addEventListener('click', e => {
  const d = e.target.closest('[data-day]'); if (d && !d.disabled) return pickDay(d.dataset.day);
  const n = e.target.closest('[data-dpm]'); if (n) { DP.m += +n.dataset.dpm; if (DP.m < 0) { DP.m = 11; DP.y--; } if (DP.m > 11) { DP.m = 0; DP.y++; } renderDP(); return; }
  if (e.target.closest('[data-dpt]')) return pickDay(today());
  if (e.target.closest('[data-dpclear]')) return pickDay('');
  if (e.target.closest('[data-dpclose]')) return closeDP();
});
$('dp').addEventListener('change', e => { if (e.target.id === 'dp-m') DP.m = +e.target.value; if (e.target.id === 'dp-y') DP.y = +e.target.value; renderDP(); });
$('dp').addEventListener('keydown', e => {
  const b = e.target.closest('[data-day]'); if (!b) return;
  const k = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key]; if (!k) return;
  e.preventDefault(); const s = iso(addDays(fromIso(b.dataset.day), k)), d = fromIso(s);
  if (d.getMonth() !== DP.m) { DP.y = d.getFullYear(); DP.m = d.getMonth(); renderDP(); }
  const nb = $('dp').querySelector('[data-day="' + s + '"]'); if (nb) nb.focus();
});
document.addEventListener('mousedown', e => { if (!$('dp').hidden && !e.target.closest('#dp') && !e.target.closest('[data-dp]')) { $('dp').hidden = true; DP.btn = null; } });

/* ================= reminders ================= */
function remindersFor(p) {
  const out = [], tn = first((p.tutor || {}).nombre);
  (p.vacunas || []).forEach((v, i) => { if (v.proxima) out.push({ key: 'vac-' + i + '-' + v.proxima, tipo: 'Vacuna', titulo: 'Vacuna ' + v.nombre, fecha: v.proxima, p, msg: 'Hola ' + tn + '! Te escribimos de MoledaVet para recordarte que a ' + p.nombre + ' le toca la vacuna ' + v.nombre + ' el ' + longD(v.proxima) + '. ¿Le agendamos un turno?' }); });
  (p.antiparasitarios || []).forEach((v, i) => { if (v.proxima) out.push({ key: 'ant-' + i + '-' + v.proxima, tipo: 'Antiparasitario', titulo: v.producto, fecha: v.proxima, p, msg: 'Hola ' + tn + '! Te recordamos desde MoledaVet que a ' + p.nombre + ' le toca su dosis de ' + v.producto + ' el ' + longD(v.proxima) + '. ¡Podés pasar a retirarla o te la aplicamos acá!' }); });
  const e = p.estetica || {};
  if (e.ultimoBano && e.cadaSemanas) { const f = iso(addDays(fromIso(e.ultimoBano), e.cadaSemanas * 7)); out.push({ key: 'bano-' + f, tipo: 'Baño', titulo: 'Baño y peluquería', fecha: f, p, msg: 'Hola ' + tn + '! Ya van ' + e.cadaSemanas + ' semanas del último baño de ' + p.nombre + ' en MoledaVet. ¿Le reservamos un turno de baño y peluquería?' }); }
  return out;
}
const allReminders = () => D.pacientes.reduce((o, p) => o.concat(remindersFor(p)), []).sort((a, b) => a.fecha < b.fecha ? -1 : 1);
const sentAt = r => (r.p.recordados || {})[r.key];
const dueSoon = () => allReminders().filter(r => diffDays(r.fecha) <= 7 && !sentAt(r));
function remRow(r) {
  const d = diffDays(r.fecha), cls = d < 0 ? 'vencido' : d <= 7 ? 'semana' : '';
  const lbl = d < 0 ? 'hace ' + (-d) + ' d' : d === 0 ? 'hoy' : d === 1 ? 'mañana' : 'en ' + d + ' d';
  const s = sentAt(r), f = feriado(r.fecha);
  return '<div class="rem ' + cls + '"><div class="when">' + short(r.fecha) + '<br>' + lbl + '</div><div style="min-width:0"><div class="t"><a href="#paciente-' + r.p.id + '">' + esc(r.p.nombre) + '</a> · ' + esc(r.titulo) + '</div><div class="note">' + esc(r.tipo) + ' · ' + esc(r.p.tutor.nombre) + ' · ' + esc(r.p.tutor.telefono) + ej(r.p) + (f ? ' · <strong style="color:var(--bad)">cae feriado (' + esc(f) + ')</strong>' : '') + '</div>' + (s ? '<div class="sent">Recordatorio enviado ' + ago(s) + '</div>' : '') + '</div>' +
    '<div class="acts"><a class="btn ' + (s ? 'line' : 'wa') + ' sm" data-act="remind" data-key="' + esc(r.key) + '" data-pid="' + r.p.id + '" href="' + waLink(r.p.tutor.telefono, r.msg, r.p.ejemplo) + '" target="_blank" rel="noopener">' + (s ? 'Enviar de nuevo' : 'Enviar recordatorio') + '</a></div></div>';
}

/* ================= shared rows ================= */
function confMsg(r) { return 'Hola ' + first(r.tutor) + '! Te confirmamos ' + String(r.service).toLowerCase() + ' para ' + r.pet + ' el ' + longD(r.date) + (r.time ? ' a las ' + r.time + ' hs' : '') + ' en MoledaVet. ¡Los esperamos!'; }
function resItem(r) {
  const p = r.pacienteId ? pat(r.pacienteId) : null;
  let acts = '';
  if (r.status === 'Pendiente') acts = '<a class="btn wa sm" data-act="res-confirm" data-id="' + r.id + '" href="' + waLink(r.phone, confMsg(r), r.ejemplo) + '" target="_blank" rel="noopener">Confirmar por WhatsApp</a><button class="btn ghost sm" type="button" data-act="res-cancel" data-id="' + r.id + '">Cancelar</button>';
  else if (r.status === 'Confirmado' && r.date <= today()) acts = '<button class="btn line sm" type="button" data-act="res-done" data-id="' + r.id + '">Marcar atendido</button>';
  return '<div class="item"><div class="who"><span class="av" aria-hidden="true">' + esc(initials(r.pet)) + '</span><div style="min-width:0"><div class="t">' + (p ? '<a href="#paciente-' + p.id + '">' + esc(r.pet) + '</a>' : esc(r.pet)) + ' · ' + esc(r.service) + '</div><div class="s">' + esc(longD(r.date)) + (r.time ? ' · ' + esc(r.time) : '') + (r.extra ? ' · ' + esc(r.extra) : '') + ' · ' + esc(r.tutor) + ' · ' + esc(r.phone) + ej(r) + '</div></div></div>' +
    '<span class="pill p-' + esc(r.status) + '">' + esc(r.status) + ' · ' + esc(r.origin || 'Web') + '</span>' + (acts ? '<div class="acts">' + acts + '</div>' : '') + '</div>';
}
const patOpts = (selId, emptyLbl) => [['', emptyLbl || 'Elegir paciente']].concat(D.pacientes.slice().sort((a, b) => a.nombre < b.nombre ? -1 : 1).map(p => [p.id, p.nombre + ' · ' + p.tutor.nombre]));

/* ================= hotel & guardería ================= */
const CANILES = ['Canil 1', 'Canil 2', 'Canil 3', 'Canil 4', 'Canil 5', 'Canil 6', 'Canil 7', 'Canil 8'];
const CUPO_G = 15;
const estActive = e => e.estado !== 'Cancelada' && e.estado !== 'Finalizada';
const nights = e => Math.max(1, Math.round((fromIso(e.hasta) - fromIso(e.desde)) / 86400000));
function gDays(desde, hasta) { const out = []; if (!desde || !hasta || hasta < desde) return out; for (let d = fromIso(desde); iso(d) <= hasta; d = addDays(d, 1)) { const s = iso(d); if (!closedReason(s, 'Guardería')) out.push(s); } return out; }
const priceOf = (id, def) => { const p = prod(id); return p ? +p.precio : def; };
const estUnits = e => e.tipo === 'Hotel' ? nights(e) : gDays(e.desde, e.hasta).length;
const estTotal = e => estUnits(e) * (e.tipo === 'Hotel' ? priceOf('sv-hotel', 90000) : priceOf('sv-guarderia', 60000));
const inHotel = (e, s) => e.tipo === 'Hotel' && estActive(e) && e.desde <= s && s < e.hasta;
const inGuard = (e, s) => e.tipo === 'Guardería' && estActive(e) && e.desde <= s && s <= e.hasta && !closedReason(s, 'Guardería');
function canilesLibres(desde, hasta) { const busy = {}; D.estadias.forEach(e => { if (e.tipo === 'Hotel' && estActive(e) && e.desde < hasta && desde < e.hasta) busy[e.canil] = 1; }); return CANILES.filter(c => !busy[c]); }
const guardCount = s => D.estadias.filter(e => inGuard(e, s)).length;
function reqs(p) { if (!p) return null; const t = today(); return { vac: (p.vacunas || []).length > 0 && (p.vacunas || []).every(v => !v.proxima || v.proxima >= t), ant: (p.antiparasitarios || []).some(a => a.proxima && a.proxima >= t) }; }
function reqPills(p) { const r = reqs(p); if (!r) return '<span class="pill p-warn">Sin ficha: pedir carnet de vacunas</span>'; return '<span class="pill ' + (r.vac ? 'p-ok">Vacunas al día' : 'p-bad">Vacunas vencidas') + '</span><span class="pill ' + (r.ant ? 'p-ok">Antiparasitario al día' : 'p-bad">Antiparasitario vencido') + '</span>'; }
const estRange = e => short(e.desde) + ' → ' + short(e.hasta) + ' · ' + estUnits(e) + (e.tipo === 'Hotel' ? (nights(e) === 1 ? ' noche' : ' noches') : (estUnits(e) === 1 ? ' día' : ' días'));
function estMsg(e) {
  if (e.tipo === 'Hotel') return 'Hola ' + first(e.tutor) + '! Te confirmamos la reserva de hotel canino para ' + e.pet + ' del ' + longD(e.desde) + ' al ' + longD(e.hasta) + ' (' + nights(e) + (nights(e) === 1 ? ' noche' : ' noches') + ') en MoledaVet. Recordá traer su alimento y el carnet de vacunas. ¡Lo esperamos!';
  return 'Hola ' + first(e.tutor) + '! Te confirmamos el plan de guardería (' + String(e.plan || 'Día').toLowerCase() + ') para ' + e.pet + ' del ' + longD(e.desde) + ' al ' + longD(e.hasta) + ' en MoledaVet. La guardería funciona de martes a viernes de 08:00 a 17:00. ¡Lo esperamos!';
}
function estItem(e) {
  const p = e.pacienteId ? pat(e.pacienteId) : null, t = today();
  let acts = '';
  if (e.estado === 'Pendiente') acts = '<a class="btn wa sm" data-act="est-conf" data-id="' + e.id + '" href="' + waLink(e.phone, estMsg(e), e.ejemplo) + '" target="_blank" rel="noopener">Confirmar por WhatsApp</a><button class="btn ghost sm" type="button" data-act="est-cancel" data-id="' + e.id + '">Cancelar</button>';
  else if (e.estado === 'Reservada') acts = (e.desde <= t ? '<button class="btn primary sm" type="button" data-act="est-in" data-id="' + e.id + '">Registrar ingreso</button>' : '') + '<a class="btn line sm" href="' + waLink(e.phone, 'Hola ' + first(e.tutor) + '! Te escribimos de MoledaVet por la estadía de ' + e.pet + '.', e.ejemplo) + '" target="_blank" rel="noopener">WhatsApp</a><button class="btn ghost sm" type="button" data-act="est-cancel" data-id="' + e.id + '">Cancelar</button>';
  else if (e.estado === 'En curso') acts = '<button class="btn primary sm" type="button" data-act="est-out" data-id="' + e.id + '">Registrar salida</button><a class="btn wa sm" href="' + waLink(e.phone, 'Hola ' + first(e.tutor) + '! Te escribimos de MoledaVet con novedades de ' + e.pet + ': ', e.ejemplo) + '" target="_blank" rel="noopener">Avisar al propietario</a>';
  else if (e.estado === 'Finalizada' && !e.facturada) acts = '<button class="btn primary sm" type="button" data-act="est-fac" data-id="' + e.id + '">Facturar estadía</button>';
  return '<div class="item"><div class="who"><span class="av" aria-hidden="true">' + esc(initials(e.pet)) + '</span><div style="min-width:0"><div class="t">' + (p ? '<a href="#paciente-' + p.id + '">' + esc(e.pet) + '</a>' : esc(e.pet)) + ' · ' + (e.tipo === 'Hotel' ? 'Hotel · ' + esc(e.canil) : 'Guardería · plan ' + esc(String(e.plan || 'Día').toLowerCase())) + '</div>' +
    '<div class="s">' + estRange(e) + ' · ' + esc(e.tutor) + ' · ' + esc(e.phone) + ' · <span class="mono">' + gs(estTotal(e)) + '</span>' + ej(e) + (e.facturada ? ' · facturada ' + esc(e.facturada) : '') + '</div>' + (e.notas ? '<div class="s">Cuidados: ' + esc(e.notas) + '</div>' : '') +
    (estActive(e) ? '<div class="alerts" style="margin-top:6px">' + reqPills(p) + '</div>' : '') + '</div></div>' +
    '<span class="pill p-' + esc(e.estado === 'Reservada' ? 'Confirmado' : e.estado === 'En curso' ? 'Atendido' : e.estado === 'Finalizada' ? 'Alta' : e.estado === 'Cancelada' ? 'Cancelado' : 'Pendiente') + '">' + esc(e.estado) + ' · ' + esc(e.origin || 'Mostrador') + '</span>' + (acts ? '<div class="acts">' + acts + '</div>' : '') + '</div>';
}
function vHotel() {
  const t = today(), act = D.estadias.filter(estActive);
  const noche = D.estadias.filter(e => inHotel(e, t) && e.estado !== 'Pendiente');
  const libres = CANILES.length - D.estadias.filter(e => inHotel(e, t)).length;
  const gHoy = closedReason(t, 'Guardería') ? null : D.estadias.filter(e => inGuard(e, t) && e.estado !== 'Pendiente').length;
  const ing = act.filter(e => e.estado === 'Reservada' && e.desde <= t).sort((a, b) => a.desde < b.desde ? -1 : 1);
  const sal = act.filter(e => e.estado === 'En curso' && e.hasta <= t);
  const pend = act.filter(e => e.estado === 'Pendiente').sort((a, b) => a.desde < b.desde ? -1 : 1);
  const curso = act.filter(e => e.estado === 'En curso' && e.hasta > t).sort((a, b) => a.hasta < b.hasta ? -1 : 1);
  const prox = act.filter(e => e.estado === 'Reservada' && e.desde > t).sort((a, b) => a.desde < b.desde ? -1 : 1);
  const fin = D.estadias.filter(e => e.estado === 'Finalizada').sort((a, b) => a.hasta < b.hasta ? 1 : -1).slice(0, 6);
  const days = []; for (let i = 0; i < 14; i++) days.push(iso(addDays(noon(), i)));
  let grid = '<thead><tr><th class="rowh">Ocupación</th>' + days.map(s => { const d = fromIso(s), f = feriado(s); return '<th class="' + (f ? 'fer' : '') + (s === t ? ' today' : '') + '" title="' + esc(f) + '">' + DOW[d.getDay()] + '<br>' + d.getDate() + '/' + (d.getMonth() + 1) + '</th>'; }).join('') + '</tr></thead><tbody>';
  grid += CANILES.map(c => '<tr><td class="rowh">' + c + '</td>' + days.map(s => { const e = D.estadias.filter(x => x.canil === c && inHotel(x, s))[0]; return e ? '<td class="on' + (e.estado === 'Pendiente' ? ' pend' : '') + '" title="' + esc(e.pet + ' · ' + estRange(e) + ' · ' + e.estado) + '">' + esc(e.pet) + '</td>' : '<td></td>'; }).join('') + '</tr>').join('');
  grid += '<tr><td class="rowh">Guardería (cupo ' + CUPO_G + ')</td>' + days.map(s => { if (closedReason(s, 'Guardería')) return '<td class="closed">—</td>'; const n = guardCount(s); return '<td class="' + (n >= CUPO_G ? 'full' : n ? 'on' : '') + '">' + n + '/' + CUPO_G + '</td>'; }).join('') + '</tr></tbody>';
  const sec = (title, list, empty) => '<section class="box"><h2>' + title + '</h2>' + (list.length ? '<div class="list">' + list.map(estItem).join('') + '</div>' : '<p class="empty">' + empty + '</p>') + '</section>';
  return '<div class="view"><div class="top"><div><p>Estadías en hotel y planes de guardería</p><h1>Hotel y guardería</h1></div><div class="acts"><button class="btn line" type="button" data-act="new-est" data-tipo="Guardería">Nueva guardería</button><button class="btn primary" type="button" data-act="new-est" data-tipo="Hotel">Nueva reserva de hotel</button></div></div>' +
    '<div class="grid-k"><div class="kpi"><p>Hospedados esta noche</p><b>' + noche.length + '/' + CANILES.length + '</b><small>' + Math.max(0, libres) + ' caniles libres</small></div>' +
    '<div class="kpi"><p>Guardería hoy</p><b>' + (gHoy == null ? '—' : gHoy + '/' + CUPO_G) + '</b><small>' + (gHoy == null ? 'Hoy no funciona la guardería' : 'Cupo diario de ' + CUPO_G) + '</small></div>' +
    '<div class="kpi warn"><p>Ingresan hoy</p><b>' + ing.length + '</b><small>Reservas confirmadas</small></div>' +
    '<div class="kpi warn"><p>Salen hoy</p><b>' + sal.length + '</b><small>Para entregar y facturar</small></div>' +
    '<div class="kpi warn"><p>Solicitudes</p><b>' + pend.length + '</b><small>Esperan confirmación</small></div></div>' +
    '<section class="box"><h2>Ocupación de los próximos 14 días</h2><div class="occ-wrap"><table class="occ">' + grid + '</table></div><div class="legend"><span><i style="background:var(--lime-soft);box-shadow:inset 0 0 0 2px var(--brand)"></i>Confirmada o en curso</span><span><i style="background:var(--warn-soft);box-shadow:inset 0 0 0 2px var(--warn)"></i>Pendiente de confirmar</span><span><i style="background:var(--bad-soft);box-shadow:inset 0 0 0 2px var(--bad)"></i>Feriado</span><span>Guardería: martes a viernes</span></div></section>' +
    '<div class="cols"><div style="flex:1 1 420px;min-width:0">' + sec('Ingresos de hoy', ing, 'No hay ingresos pendientes para hoy.') + '</div><div style="flex:1 1 420px;min-width:0">' + sec('Salidas de hoy', sal, 'No hay salidas para hoy.') + '</div></div>' +
    sec('Solicitudes por confirmar', pend, 'No hay solicitudes pendientes.') + sec('Hospedados y en guardería', curso, 'No hay estadías en curso.') + sec('Próximas reservas', prox, 'No hay reservas próximas.') + sec('Finalizadas recientes', fin, 'Todavía no hay estadías finalizadas.') + '</div>';
}

/* ================= views ================= */
function vInicio() {
  const t = today(), d = noon(), f = feriado(t);
  const hoy = D.reservas.filter(r => r.date === t && r.status !== 'Cancelado').sort((a, b) => (a.time || '') < (b.time || '') ? -1 : 1);
  const pend = D.reservas.filter(r => r.status === 'Pendiente'), pendE = D.estadias.filter(e => e.estado === 'Pendiente');
  const due = dueSoon(), inter = D.internaciones.filter(i => !i.alta), urg = D.urgencias.filter(u => u.estado !== 'Finalizada');
  const cajaHoy = D.caja.filter(m => m.fecha === t).reduce((s, m) => s + (m.tipo === 'Ingreso' ? +m.monto : -m.monto), 0);
  const low = D.productos.filter(p => p.tipo === 'Producto' && +p.stock <= +p.minimo);
  const hh = D.estadias.filter(e => inHotel(e, t) && e.estado !== 'Pendiente').length, gg = D.estadias.filter(e => inGuard(e, t) && e.estado !== 'Pendiente').length;
  const nextF = Object.keys(Object.assign({}, FERIADOS_BASE, FX.reduce((o, x) => { o[x.fecha] = 1; return o; }, {}))).filter(s => s > t).sort()[0];
  return '<div class="view"><div class="top"><div><p>' + DOWL[d.getDay()].charAt(0).toUpperCase() + DOWL[d.getDay()].slice(1) + ' ' + d.getDate() + ' de ' + MON[d.getMonth()] + (nextF ? ' · Próximo feriado: ' + esc(feriado(nextF)) + ' (' + longD(nextF) + ')' : '') + '</p><h1>Buen día, equipo MoledaVet</h1></div><div class="acts"><button class="btn line" type="button" data-act="new-urg">Registrar urgencia</button><button class="btn primary" type="button" data-act="new-res">Nueva reserva</button></div></div>' +
    (f ? '<div class="alertbar">' + ICON.warn + '<span>Hoy es feriado: ' + esc(f) + '. La clínica figura cerrada para turnos.</span></div>' : '') +
    '<div class="grid-k k7"><div class="kpi"><p>Turnos de hoy</p><b>' + hoy.length + '</b><small>' + hoy.filter(r => r.status === 'Atendido').length + ' atendidos</small></div>' +
    '<div class="kpi warn"><p>Solicitudes pendientes</p><b>' + (pend.length + pendE.length) + '</b><small>Desde la web y WhatsApp</small></div>' +
    '<div class="kpi ' + (urg.length ? 'bad' : '') + '"><p>Urgencias activas</p><b>' + urg.length + '</b><small>' + urg.filter(u => u.prioridad === 'Roja').length + ' de prioridad roja</small></div>' +
    '<div class="kpi"><p>Internados</p><b>' + inter.length + '</b><small>' + inter.filter(i => i.estado === 'Crítico').length + ' en estado crítico</small></div>' +
    '<div class="kpi"><p>Hotel y guardería</p><b>' + (hh + gg) + '</b><small>' + hh + ' en hotel · ' + gg + ' en guardería</small></div>' +
    '<div class="kpi warn"><p>Recordatorios por enviar</p><b>' + due.length + '</b><small>Vencidos o de esta semana</small></div>' +
    '<div class="kpi"><p>Caja de hoy</p><b class="sm">' + gs(cajaHoy) + '</b></div></div>' +
    '<div class="cols"><section class="box" style="flex:3 1 420px"><h2>Agenda de hoy <a href="#agenda">Ver agenda</a></h2>' + (hoy.length ? '<div class="list">' + hoy.map(resItem).join('') + '</div>' : '<p class="empty">No hay turnos para hoy.</p>') + '</section>' +
    '<section class="box" style="flex:2 1 320px"><h2>Solicitudes nuevas</h2>' + (pend.length + pendE.length ? '<div class="list">' + pend.map(resItem).join('') + pendE.map(estItem).join('') + '</div>' : '<p class="empty">Todo al día. No hay solicitudes pendientes.</p>') + '</section></div>' +
    (low.length ? '<section class="box"><h2>Stock bajo <a href="#stock">Ir a stock</a></h2><div class="alerts">' + low.map(p => '<span class="pill p-warn">' + esc(p.nombre) + ' · quedan ' + esc(p.stock) + '</span>').join('') + '</div></section>' : '') +
    '<section class="box"><h2>Recordatorios de la semana <a href="#recordatorios">Ver todos</a></h2>' + (due.length ? due.slice(0, 5).map(remRow).join('') : '<p class="empty">No hay recordatorios pendientes esta semana.</p>') + '</section></div>';
}

function vAgenda() {
  const t = today(), modeChips = '<div class="chips" role="group" aria-label="Vista"><button class="chip" type="button" data-agmode="semana" aria-pressed="' + (UI.agMode === 'semana') + '">Semana</button><button class="chip" type="button" data-agmode="mes" aria-pressed="' + (UI.agMode === 'mes') + '">Mes</button></div>';
  const legend = '<div class="legend"><span><i style="background:#C4520F"></i>Pendiente de confirmar</span><span><i style="background:var(--lime)"></i>Confirmado</span><span><i style="background:var(--info)"></i>Atendido</span><span><i style="background:var(--bad-soft);box-shadow:inset 0 0 0 2px var(--bad)"></i>Feriado (cerrado)</span></div>';
  if (UI.agMode === 'mes') {
    const base = UI.agMonth || noon(), y = base.getFullYear(), m = base.getMonth();
    const firstD = new Date(y, m, 1, 12), start = addDays(firstD, -((firstD.getDay() + 6) % 7));
    let cells = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(w => '<span class="wd">' + w + '</span>').join('');
    for (let i = 0; i < 42; i++) {
      const d = addDays(start, i), s = iso(d), f = feriado(s), out = d.getMonth() !== m;
      if (i >= 35 && out && d.getDay() === 1) break;
      const n = D.reservas.filter(r => r.date === s && r.status !== 'Cancelado').length, np = D.reservas.filter(r => r.date === s && r.status === 'Pendiente').length;
      cells += '<button type="button" class="mcell' + (out ? ' out' : '') + (s === t ? ' today' : '') + (f ? ' fer' : '') + (!f && d.getDay() === 0 ? ' closed' : '') + '" data-goweek="' + s + '" aria-label="' + esc(fullD(s) + (f ? ', feriado: ' + f : '') + ', ' + n + ' turnos') + '"><span class="d">' + d.getDate() + '</span>' + (f ? '<span class="fn">' + esc(f) + '</span>' : d.getDay() === 0 ? '<span class="fn" style="color:var(--muted)">Cerrado</span>' : '') + (n ? '<span class="c">' + n + ' turno' + (n > 1 ? 's' : '') + (np ? ' · ' + np + ' pend.' : '') + '</span>' : '') + '</button>';
    }
    return '<div class="view"><div class="top"><div><p>Tocá un día para ver su semana</p><h1>Agenda · ' + MON[m].charAt(0).toUpperCase() + MON[m].slice(1) + ' ' + y + '</h1></div><div class="acts">' + modeChips + '<button class="btn line sm" type="button" data-act="mon" data-d="-1">← Mes anterior</button><button class="btn line sm" type="button" data-act="mon" data-d="0">Este mes</button><button class="btn line sm" type="button" data-act="mon" data-d="1">Siguiente →</button><button class="btn primary" type="button" data-act="new-res">Nueva reserva</button></div></div>' +
      '<div class="box"><div class="month">' + cells + '</div>' + legend + '</div></div>';
  }
  const start = addDays(noon(), UI.agOffset * 7), w = start.getDay(), mon = addDays(start, w === 0 ? -6 : 1 - w);
  let cols = '';
  for (let i = 0; i < 6; i++) {
    const d = addDays(mon, i), s = iso(d), f = feriado(s);
    const items = D.reservas.filter(r => r.date === s).sort((a, b) => (a.time || '') < (b.time || '') ? -1 : 1);
    const eh = D.estadias.filter(e => inHotel(e, s)).length, eg = D.estadias.filter(e => inGuard(e, s)).length, ei = D.estadias.filter(e => estActive(e) && e.desde === s).length;
    const estS = (eh || eg || ei) ? '<a class="slot est" href="#hotel" style="display:block;text-decoration:none;color:inherit"><b>Hotel y guardería</b>' + eh + ' en hotel · ' + eg + ' en guardería' + (ei ? ' · ingresan ' + ei : '') + '</a>' : '';
    cols += '<div class="day' + (s === t ? ' today' : '') + (f ? ' fer' : '') + '"><h3><span>' + DOW[d.getDay()] + ' ' + d.getDate() + '/' + (d.getMonth() + 1) + '</span><span class="note">' + items.length + '</span></h3>' + (f ? '<p class="ferlbl">' + ICON.cal + 'Feriado: ' + esc(f) + '</p>' : '') + estS +
      (items.length ? items.map(r => '<div class="slot ' + esc(r.status) + '"><b>' + (r.time ? esc(r.time) + ' · ' : '') + esc(r.pet) + '</b>' + esc(r.service) + (r.extra ? ' · ' + esc(r.extra) : '') + '<br><span class="note">' + esc(r.tutor) + ' · ' + esc(r.status) + '</span>' + (r.status === 'Pendiente' ? '<div class="acts"><a class="btn wa sm" data-act="res-confirm" data-id="' + r.id + '" href="' + waLink(r.phone, confMsg(r), r.ejemplo) + '" target="_blank" rel="noopener">Confirmar</a></div>' : '') + '</div>').join('') : (f || estS ? '' : '<p class="note" style="margin:0">Sin turnos</p>')) + '</div>';
  }
  return '<div class="view"><div class="top"><div><p>Semana del ' + mon.getDate() + '/' + (mon.getMonth() + 1) + ' · domingos cerrado</p><h1>Agenda y turnos</h1></div><div class="acts">' + modeChips + '<button class="btn line sm" type="button" data-act="wk" data-d="-1">← Anterior</button><button class="btn line sm" type="button" data-act="wk" data-d="0">Esta semana</button><button class="btn line sm" type="button" data-act="wk" data-d="1">Siguiente →</button><button class="btn primary" type="button" data-act="new-res">Nueva reserva</button></div></div>' +
    '<div class="week">' + cols + '</div>' + legend + '</div>';
}

const letterOf = p => { const c = String(p.nombre || '#').trim().charAt(0).toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); return /[A-ZÑ]/.test(c) ? c : '#'; };
function vPacientes() {
  const q = UI.patQ.toLowerCase(), t = today();
  const bySp = sp => D.pacientes.filter(p => sp === 'Todos' || (sp === 'Otro' ? ['Perro', 'Gato'].indexOf(p.especie) < 0 : p.especie === sp)).length;
  const list = D.pacientes.filter(p => (UI.patSp === 'Todos' || (UI.patSp === 'Otro' ? ['Perro', 'Gato'].indexOf(p.especie) < 0 : p.especie === UI.patSp)) && (!q || (p.nombre + ' ' + p.raza + ' ' + p.tutor.nombre + ' ' + p.tutor.telefono).toLowerCase().indexOf(q) >= 0)).sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
  const G = {}; list.forEach(p => { const L = letterOf(p); (G[L] = G[L] || []).push(p); });
  const letters = Object.keys(G).sort((a, b) => a.localeCompare(b, 'es'));
  const info = p => {
    const next = remindersFor(p).sort((a, b) => a.fecha < b.fecha ? -1 : 1).filter(r => !sentAt(r))[0], nd = next ? diffDays(next.fecha) : null;
    const tags = (D.internaciones.some(i => i.pacienteId === p.id && !i.alta) ? '<span class="pill p-info">Internado</span>' : '') + (D.estadias.some(e => e.pacienteId === p.id && (inHotel(e, t) || inGuard(e, t)) && e.estado === 'En curso') ? '<span class="pill p-info">En hotel o guardería</span>' : '');
    return { next, nd, tags, nextPill: next ? '<span class="pill ' + (nd < 0 ? 'p-bad' : nd <= 7 ? 'p-warn' : 'p-ok') + '">' + esc(next.titulo) + ' · ' + short(next.fecha) + '</span>' : '<span class="note">Sin vencimientos</span>' };
  };
  const card = p => { const x = info(p);
    return '<a class="pcard" href="#paciente-' + p.id + '"><div class="row"><span class="av" aria-hidden="true">' + esc(initials(p.nombre)) + '</span><div style="min-width:0"><div style="font-weight:900;font-size:17px">' + esc(p.nombre) + ej(p) + '</div><div class="note">' + esc(p.especie) + ' · ' + esc(p.raza) + ' · ' + esc(age(p.nacimiento)) + '</div></div></div>' +
      '<div class="note">Tutor: <strong style="color:var(--ink)">' + esc(p.tutor.nombre) + '</strong> · ' + esc(p.tutor.telefono) + '</div>' +
      '<div class="alerts">' + x.tags + (p.alertas || []).map(a => '<span class="pill p-bad">' + esc(a) + '</span>').join('') + (x.next ? x.nextPill : '') + '</div></a>'; };
  const row = p => { const x = info(p), al = p.alertas || [];
    return '<div class="prow"><div class="nm"><span class="av" aria-hidden="true">' + esc(initials(p.nombre)) + '</span><div style="min-width:0"><a href="#paciente-' + p.id + '">' + esc(p.nombre) + '</a>' + ej(p) + '<div class="note">' + esc(p.especie) + ' · ' + esc(p.raza) + (p.nacimiento ? ' · ' + esc(age(p.nacimiento)) : '') + '</div></div></div>' +
      '<div class="c2" style="min-width:0"><div style="font-weight:800">' + esc(p.tutor.nombre) + '</div><div class="note mono">' + esc(p.tutor.telefono) + '</div></div>' +
      '<div class="c3">' + x.nextPill + '</div>' +
      '<div class="c4 alerts">' + x.tags + al.slice(0, 2).map(a => '<span class="pill p-bad">' + esc(a) + '</span>').join('') + (al.length > 2 ? '<span class="pill p-bad">+' + (al.length - 2) + '</span>' : '') + '</div>' +
      '<div class="c5 acts"><a class="btn wa sm" href="' + waLink(p.tutor.telefono, 'Hola ' + first(p.tutor.nombre) + '! Te escribimos de MoledaVet por ' + p.nombre + '.', p.ejemplo) + '" target="_blank" rel="noopener" aria-label="WhatsApp a ' + esc(p.tutor.nombre) + '">WhatsApp</a></div></div>'; };
  const lista = UI.patView === 'lista', searching = !!q;
  const body = letters.map(L => { const ps = G[L], closed = !searching && !!UI.patC[L];
    return '<section class="pgrp" id="pg-' + L + '"><button type="button" class="pgh" data-patg="' + L + '" aria-expanded="' + !closed + '" aria-controls="pgb-' + L + '">' + CHEV + '<b>' + L + '</b><span>' + ps.slice(0, 4).map(p => esc(p.nombre)).join(', ') + (ps.length > 4 ? '…' : '') + '</span><span class="note">' + ps.length + (ps.length === 1 ? ' paciente' : ' pacientes') + '</span></button>' +
      '<div class="pgb" id="pgb-' + L + '"' + (closed ? ' hidden' : '') + '>' + (lista ? '<div class="plist">' + ps.map(row).join('') + '</div>' : '<div class="cards">' + ps.map(card).join('') + '</div>') + '</div></section>'; }).join('');
  const nClosed = letters.filter(L => UI.patC[L]).length;
  return '<div class="view"><div class="top"><div><p>' + D.pacientes.length + ' pacientes registrados</p><h1>Propietarios y pacientes</h1></div><button class="btn primary" type="button" data-act="new-pat">Nuevo paciente</button></div>' +
    '<div class="toolbar"><label for="q" style="position:absolute;left:-9999px">Buscar paciente</label><input class="search" id="q" type="search" placeholder="Buscar por mascota, raza, tutor o teléfono" value="' + esc(UI.patQ) + '"><div class="chips" role="group" aria-label="Vista"><button class="chip" type="button" data-patv="lista" aria-pressed="' + lista + '">Lista</button><button class="chip" type="button" data-patv="tarjetas" aria-pressed="' + !lista + '">Tarjetas</button></div></div>' +
    '<div class="pbar"><div class="chips" role="group" aria-label="Especie">' + [['Todos', 'Todos'], ['Perro', 'Perros'], ['Gato', 'Gatos'], ['Otro', 'Otros']].map(x => '<button class="chip" type="button" data-patsp="' + x[0] + '" aria-pressed="' + (UI.patSp === x[0]) + '">' + x[1] + ' · ' + bySp(x[0]) + '</button>').join('') + '</div>' +
    (letters.length > 1 && !searching ? '<div class="acts"><button class="btn line sm" type="button" data-patall="close"' + (nClosed === letters.length ? ' disabled' : '') + '>Contraer todo</button><button class="btn line sm" type="button" data-patall="open"' + (!nClosed ? ' disabled' : '') + '>Expandir todo</button></div>' : '') + '</div>' +
    (letters.length > 3 && !searching ? '<nav class="abc" aria-label="Ir a la letra">' + letters.map(L => '<button type="button" data-patl="' + L + '" aria-label="Ir a la letra ' + L + '">' + L + '</button>').join('') + '</nav>' : '') +
    (list.length ? body : '<p class="empty">' + (D.pacientes.length ? 'No encontramos pacientes con esa búsqueda.' : 'Todavía no hay pacientes. Cargá el primero con “Nuevo paciente”.') + '</p>') + '</div>';
}
function recetaMsg(p, r) { return 'Hola ' + first(p.tutor.nombre) + '! Te pasamos la receta de ' + p.nombre + ' (MoledaVet, ' + dmy(r.fecha) + '):\n' + (r.items || []).map(i => '• ' + i.med + ': ' + i.dosis + ', ' + i.frecuencia + ', durante ' + i.duracion).join('\n') + (r.indicaciones ? '\nIndicaciones: ' + r.indicaciones : '') + '\nCualquier duda nos escribís.'; }
function vFicha(id) {
  const p = pat(id);
  if (!p) return '<div class="view"><p class="empty">No encontramos esa ficha. <a href="#pacientes">Volver a pacientes</a></p></div>';
  const tabs = [['resumen', 'Resumen'], ['historia', 'Historia clínica'], ['vacunas', 'Vacunas'], ['antip', 'Antiparasitarios'], ['recetas', 'Recetas'], ['servicios', 'Reservas y estadías']];
  let body = '';
  const rems = remindersFor(p), T = UI.tab;
  const dt = s => s ? '<span class="mono">' + dmy(s) + '</span>' : '—';
  if (T === 'resumen') {
    body = '<div class="cols"><section class="box" style="flex:1 1 300px"><h2>Datos del paciente <button class="btn line sm" type="button" data-act="edit-pat" data-pid="' + p.id + '">Editar</button></h2><dl class="kv"><dt>Especie</dt><dd>' + esc(p.especie) + '</dd><dt>Raza</dt><dd>' + esc(p.raza) + '</dd><dt>Sexo</dt><dd>' + esc(p.sexo) + '</dd><dt>Nacimiento</dt><dd>' + (p.nacimiento ? dmy(p.nacimiento) + ' (' + age(p.nacimiento) + ')' : '—') + '</dd><dt>Peso</dt><dd class="mono">' + esc(p.peso || '—') + ' kg</dd><dt>Color</dt><dd>' + esc(p.color || '—') + '</dd><dt>Castrado</dt><dd>' + (p.castrado ? 'Sí' : 'No') + '</dd><dt>Microchip</dt><dd class="mono">' + esc(p.microchip || '—') + '</dd></dl></section>' +
      '<section class="box" style="flex:1 1 280px"><h2>Propietario</h2><dl class="kv"><dt>Nombre</dt><dd>' + esc(p.tutor.nombre) + '</dd><dt>CI / RUC</dt><dd class="mono">' + esc(p.tutor.ruc || '—') + '</dd><dt>WhatsApp</dt><dd class="mono">' + esc(p.tutor.telefono) + '</dd><dt>Dirección</dt><dd>' + esc(p.tutor.direccion || '—') + '</dd></dl><div class="acts" style="margin-top:14px"><a class="btn wa sm" href="' + waLink(p.tutor.telefono, 'Hola ' + first(p.tutor.nombre) + '! Te escribimos de MoledaVet por ' + p.nombre + '.', p.ejemplo) + '" target="_blank" rel="noopener">Escribir por WhatsApp</a><button class="btn line sm" type="button" data-act="new-pres" data-pid="' + p.id + '">Presupuesto</button></div></section></div>' +
      '<section class="box"><h2>Próximos vencimientos</h2>' + (rems.length ? rems.sort((a, b) => a.fecha < b.fecha ? -1 : 1).map(remRow).join('') : '<p class="empty">Sin vencimientos cargados.</p>') + '</section>';
  } else if (T === 'historia') {
    const cs = (p.consultas || []).slice().sort((a, b) => a.fecha < b.fecha ? 1 : -1);
    body = '<section class="box"><h2>Historia clínica <button class="btn primary sm" type="button" data-act="add-consulta" data-pid="' + p.id + '">Agregar consulta</button></h2>' + (cs.length ? '<div class="tbl-wrap"><table><thead><tr><th>Fecha</th><th>Motivo</th><th>Diagnóstico</th><th>Tratamiento</th><th>Peso</th><th>Atendió</th></tr></thead><tbody>' + cs.map(c => '<tr><td>' + dt(c.fecha) + '</td><td>' + esc(c.motivo) + '</td><td>' + esc(c.diagnostico) + '</td><td>' + esc(c.tratamiento) + '</td><td class="mono">' + esc(c.peso || '—') + '</td><td>' + esc(c.vet) + '</td></tr>').join('') + '</tbody></table></div>' : '<p class="empty">Sin consultas registradas.</p>') + '</section>';
  } else if (T === 'vacunas') {
    const vs = p.vacunas || [];
    body = '<section class="box"><h2>Vacunas <button class="btn primary sm" type="button" data-act="add-vacuna" data-pid="' + p.id + '">Registrar vacuna</button></h2>' + (vs.length ? '<div class="tbl-wrap"><table><thead><tr><th>Vacuna</th><th>Aplicada</th><th>Próxima dosis</th><th>Lote</th><th>Estado</th></tr></thead><tbody>' + vs.map(v => { const d = v.proxima ? diffDays(v.proxima) : null; return '<tr><td style="font-weight:800">' + esc(v.nombre) + '</td><td>' + dt(v.fecha) + '</td><td>' + dt(v.proxima) + '</td><td class="mono">' + esc(v.lote || '—') + '</td><td>' + (d == null ? '' : '<span class="pill ' + (d < 0 ? 'p-bad">Vencida' : d <= 30 ? 'p-warn">Por vencer' : 'p-ok">Al día') + '</span>') + '</td></tr>'; }).join('') + '</tbody></table></div>' : '<p class="empty">Sin vacunas registradas.</p>') + '</section>';
  } else if (T === 'antip') {
    const as = p.antiparasitarios || [];
    body = '<section class="box"><h2>Antiparasitarios <button class="btn primary sm" type="button" data-act="add-antip" data-pid="' + p.id + '">Registrar dosis</button></h2>' + (as.length ? '<div class="tbl-wrap"><table><thead><tr><th>Producto</th><th>Aplicado</th><th>Próxima</th><th>Estado</th></tr></thead><tbody>' + as.map(v => { const d = v.proxima ? diffDays(v.proxima) : null; return '<tr><td style="font-weight:800">' + esc(v.producto) + '</td><td>' + dt(v.fecha) + '</td><td>' + dt(v.proxima) + '</td><td>' + (d == null ? '' : '<span class="pill ' + (d < 0 ? 'p-bad">Vencido' : d <= 7 ? 'p-warn">Esta semana' : 'p-ok">Al día') + '</span>') + '</td></tr>'; }).join('') + '</tbody></table></div><p class="note">La guardería pide Nexgard o Bravecto y Scalibor al día.</p>' : '<p class="empty">Sin dosis registradas.</p>') + '</section>';
  } else if (T === 'recetas') {
    const rs = (p.recetas || []).map((r, i) => Object.assign({ i }, r)).sort((a, b) => a.fecha < b.fecha ? 1 : -1);
    body = '<section class="box"><h2>Recetas <button class="btn primary sm" type="button" data-act="new-receta" data-pid="' + p.id + '">Nueva receta</button></h2>' + (rs.length ? '<div class="list">' + rs.map(r => '<div class="item"><div style="min-width:0;flex:1 1 300px"><div class="t">' + dmy(r.fecha) + ' · ' + esc(r.vet || '') + '</div><div class="s">' + (r.items || []).map(i => esc(i.med) + ' (' + esc(i.dosis) + ', ' + esc(i.frecuencia) + ', ' + esc(i.duracion) + ')').join(' · ') + '</div></div><div class="acts"><button class="btn line sm" type="button" data-act="print-receta" data-pid="' + p.id + '" data-i="' + r.i + '">Ver e imprimir</button><a class="btn wa sm" href="' + waLink(p.tutor.telefono, recetaMsg(p, r), p.ejemplo) + '" target="_blank" rel="noopener">Enviar por WhatsApp</a></div></div>').join('') + '</div>' : '<p class="empty">Sin recetas emitidas.</p>') + '</section>';
  } else {
    const e = p.estetica || {}, rs = D.reservas.filter(r => r.pacienteId === p.id).sort((a, b) => a.date < b.date ? 1 : -1), es = D.estadias.filter(x => x.pacienteId === p.id).sort((a, b) => a.desde < b.desde ? 1 : -1);
    body = '<div class="cols"><section class="box" style="flex:1 1 280px"><h2>Estética <button class="btn line sm" type="button" data-act="edit-est" data-pid="' + p.id + '">Editar</button></h2><dl class="kv"><dt>Último baño</dt><dd>' + (e.ultimoBano ? longD(e.ultimoBano) : '—') + '</dd><dt>Frecuencia</dt><dd>' + (e.cadaSemanas ? 'cada ' + e.cadaSemanas + ' semanas' : '—') + '</dd><dt>Corte</dt><dd>' + esc(e.corte || '—') + '</dd></dl></section>' +
      '<section class="box" style="flex:2 1 380px"><h2>Reservas</h2>' + (rs.length ? '<div class="list">' + rs.map(resItem).join('') + '</div>' : '<p class="empty">Sin reservas.</p>') + '</section></div>' +
      '<section class="box"><h2>Hotel y guardería <button class="btn line sm" type="button" data-act="new-est" data-tipo="Hotel" data-pid="' + p.id + '">Nueva estadía</button></h2>' + (es.length ? '<div class="list">' + es.map(estItem).join('') + '</div>' : '<p class="empty">Sin estadías registradas.</p>') + '</section>';
  }
  return '<div class="view"><p style="margin:0 0 10px"><a href="#pacientes" style="font-weight:800">← Pacientes</a></p>' +
    '<div class="fhead"><span class="av big" aria-hidden="true">' + esc(initials(p.nombre)) + '</span><div style="flex:1 1 260px;min-width:0"><h1>' + esc(p.nombre) + ej(p) + '</h1><div class="facts"><span>' + esc(p.especie) + '</span><span>' + esc(p.raza) + '</span><span>' + esc(p.sexo) + '</span><span>' + esc(age(p.nacimiento)) + '</span><span class="mono">' + esc(p.peso || '—') + ' kg</span>' + (p.castrado ? '<span>Castrado</span>' : '') + '</div><div class="note" style="margin-top:4px">Propietario: ' + esc(p.tutor.nombre) + ' · ' + esc(p.tutor.telefono) + '</div></div><div class="acts"><button class="btn line" type="button" data-act="new-res" data-pid="' + p.id + '">Agendar turno</button><button class="btn line" type="button" data-act="new-est" data-tipo="Hotel" data-pid="' + p.id + '">Hotel / guardería</button><button class="btn line" type="button" data-act="new-int" data-pid="' + p.id + '">Internar</button><button class="btn primary" type="button" data-act="add-consulta" data-pid="' + p.id + '">Agregar consulta</button></div></div>' +
    ((p.alertas || []).length ? '<div class="alertbar" role="note">' + ICON.warn + '<span>Alertas: ' + p.alertas.map(esc).join(' · ') + '</span></div>' : '') +
    '<div class="tabs chips" role="tablist">' + tabs.map(t => '<button class="chip" type="button" role="tab" data-tab="' + t[0] + '" aria-pressed="' + (T === t[0]) + '" aria-selected="' + (T === t[0]) + '">' + t[1] + '</button>').join('') + '</div>' + body + '</div>';
}

function vInternacion() {
  const act = D.internaciones.filter(i => !i.alta).sort((a, b) => ({ 'Crítico': 0, 'Observación': 1, 'Estable': 2 }[a.estado] - { 'Crítico': 0, 'Observación': 1, 'Estable': 2 }[b.estado]));
  const alt = D.internaciones.filter(i => i.alta).sort((a, b) => a.alta < b.alta ? 1 : -1).slice(0, 10);
  const card = i => { const p = pat(i.pacienteId) || { nombre: i.pet, tutor: {} }, dias = Math.max(0, -diffDays(i.ingreso)) + 1;
    return '<article class="hcard ' + esc(i.estado) + '"><div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap"><div><div class="t" style="font-size:17px">' + (i.pacienteId ? '<a href="#paciente-' + i.pacienteId + '">' + esc(p.nombre) + '</a>' : esc(i.pet)) + ej(i) + '</div><div class="note">' + esc(i.jaula) + ' · ingresó ' + dmy(i.ingreso) + ' · día ' + dias + ' · ' + esc(i.vet || '') + '</div></div><span class="pill p-' + esc(i.estado) + '">' + esc(i.estado) + '</span></div>' +
      '<div><strong>Motivo:</strong> ' + esc(i.motivo) + '</div>' + (i.tratamiento ? '<div class="note"><strong>Plan:</strong> ' + esc(i.tratamiento) + '</div>' : '') +
      '<ul class="evo">' + (i.evolucion || []).slice().reverse().map(e => '<li><time>' + dmy(iso(new Date(e.ts))).slice(0, 5) + ' ' + hm(e.ts) + '</time>' + esc(e.nota) + '</li>').join('') + '</ul>' +
      '<div class="acts"><button class="btn line sm" type="button" data-act="evo" data-id="' + i.id + '">Agregar evolución</button><label style="position:absolute;left:-9999px" for="st-' + i.id + '">Estado</label><select id="st-' + i.id + '" data-intst="' + i.id + '" class="chip" style="min-height:36px">' + ['Estable', 'Observación', 'Crítico'].map(s => '<option' + (s === i.estado ? ' selected' : '') + '>' + s + '</option>').join('') + '</select>' + (p.tutor && p.tutor.telefono ? '<a class="btn wa sm" href="' + waLink(p.tutor.telefono, 'Hola ' + first(p.tutor.nombre) + '! Te escribimos de MoledaVet con novedades de ' + p.nombre + ': ', p.ejemplo) + '" target="_blank" rel="noopener">Avisar al propietario</a>' : '') + '<button class="btn primary sm" type="button" data-act="alta" data-id="' + i.id + '">Dar de alta</button></div></article>'; };
  return '<div class="view"><div class="top"><div><p>' + act.length + ' pacientes internados</p><h1>Internación</h1></div><button class="btn primary" type="button" data-act="new-int">Internar paciente</button></div>' +
    (act.length ? '<div class="cards" style="grid-template-columns:repeat(auto-fill,minmax(min(340px,100%),1fr))">' + act.map(card).join('') + '</div>' : '<p class="empty">No hay pacientes internados.</p>') +
    '<h2 class="grp">Altas recientes</h2>' + (alt.length ? '<div class="list">' + alt.map(i => '<div class="item"><div class="t">' + esc(i.pet) + ' · ' + esc(i.motivo) + '</div><span class="note">' + dmy(i.ingreso) + ' → ' + dmy(i.alta) + '</span><span class="pill p-Alta">Alta</span></div>').join('') + '</div>' : '<p class="empty">Sin altas registradas.</p>') + '</div>';
}

function vUrgencias() {
  const ord = { Roja: 0, Amarilla: 1, Verde: 2 };
  const act = D.urgencias.filter(u => u.estado !== 'Finalizada').sort((a, b) => ord[a.prioridad] - ord[b.prioridad] || a.llegada - b.llegada);
  const fin = D.urgencias.filter(u => u.estado === 'Finalizada').sort((a, b) => b.llegada - a.llegada).slice(0, 8);
  const row = u => '<div class="tri"><span class="dot ' + esc(u.prioridad) + '" aria-hidden="true"></span><div style="min-width:0"><div class="t">' + (u.pacienteId ? '<a href="#paciente-' + u.pacienteId + '">' + esc(u.pet) + '</a>' : esc(u.pet)) + ' · ' + esc(u.motivo) + ej(u) + '</div><div class="note"><span class="pill p-' + esc(u.prioridad) + '">Prioridad ' + esc(u.prioridad.toLowerCase()) + '</span> · llegó ' + hm(u.llegada) + ' (' + ago(u.llegada) + ') · ' + esc(u.tutor || '') + ' ' + esc(u.phone || '') + ' · <strong>' + esc(u.estado) + '</strong></div></div>' +
    '<div class="acts">' + (u.estado === 'En espera' ? '<button class="btn primary sm" type="button" data-act="urg-at" data-id="' + u.id + '">Atender</button>' : '') + (u.estado !== 'Finalizada' ? '<button class="btn line sm" type="button" data-act="urg-int" data-id="' + u.id + '">Internar</button><button class="btn line sm" type="button" data-act="urg-fin" data-id="' + u.id + '">Finalizar</button>' : '') + '</div></div>';
  return '<div class="view"><div class="top"><div><p>Ordenadas por prioridad y hora de llegada</p><h1>Urgencias</h1></div><button class="btn primary" type="button" data-act="new-urg">Registrar urgencia</button></div>' +
    '<div class="legend" style="margin:0 0 14px"><span><i style="background:#C62828"></i>Roja: atender ya</span><span><i style="background:#E0A100"></i>Amarilla: dentro de 30 min</span><span><i style="background:#6BAA2E"></i>Verde: puede esperar</span></div>' +
    (act.length ? act.map(row).join('') : '<p class="empty">No hay urgencias en espera.</p>') + '<h2 class="grp">Finalizadas</h2>' + (fin.length ? fin.map(row).join('') : '<p class="empty">Sin urgencias finalizadas.</p>') + '</div>';
}

function vEstetica() {
  const t = today(), wk = iso(addDays(noon(), 7));
  const tur = D.reservas.filter(r => r.service === 'Baño y peluquería' && r.date >= t && r.date <= wk && r.status !== 'Cancelado').sort((a, b) => (a.date + a.time) < (b.date + b.time) ? -1 : 1);
  const due = allReminders().filter(r => r.tipo === 'Baño' && diffDays(r.fecha) <= 7);
  return '<div class="view"><div class="top"><div><p>Turnos de los próximos 7 días y clientes que ya deberían volver</p><h1>Baño y peluquería</h1></div><button class="btn primary" type="button" data-act="new-res" data-svc="Baño y peluquería">Nuevo turno de baño</button></div>' +
    '<div class="cols"><section class="box" style="flex:3 1 420px"><h2>Próximos turnos</h2>' + (tur.length ? '<div class="list">' + tur.map(resItem).join('') + '</div>' : '<p class="empty">Sin turnos de baño esta semana.</p>') + '</section>' +
    '<section class="box" style="flex:2 1 320px"><h2>Les toca volver</h2>' + (due.length ? due.map(remRow).join('') : '<p class="empty">Nadie atrasado con su baño.</p>') + '</section></div></div>';
}

function vRecordatorios() {
  const all = allReminders().filter(r => UI.remF === 'Todos' || r.tipo === UI.remF);
  const venc = all.filter(r => diffDays(r.fecha) < 0), sem = all.filter(r => { const d = diffDays(r.fecha); return d >= 0 && d <= 7; }), mes = all.filter(r => { const d = diffDays(r.fecha); return d > 7 && d <= 30; });
  const grp = (t, l) => '<h2 class="grp">' + t + ' · ' + l.length + '</h2>' + (l.length ? l.map(remRow).join('') : '<p class="empty">Nada en este grupo.</p>');
  return '<div class="view"><div class="top"><div><p>Vacunas, antiparasitarios y baños que vencen</p><h1>Recordatorios</h1></div></div>' +
    '<div class="toolbar chips">' + ['Todos', 'Vacuna', 'Antiparasitario', 'Baño'].map(f => '<button class="chip" type="button" data-remf="' + f + '" aria-pressed="' + (UI.remF === f) + '">' + (f === 'Todos' ? 'Todos' : f === 'Baño' ? 'Baños' : f + 's') + '</button>').join('') + '</div>' +
    '<p class="note">Tocá “Enviar recordatorio”: se abre WhatsApp con el mensaje listo y queda registrado que ya se avisó. Si la fecha cae feriado, lo vas a ver marcado en rojo. En los pacientes de ejemplo, WhatsApp se abre sin número.</p>' +
    grp('Vencidos', venc) + grp('Esta semana', sem) + grp('Próximos 30 días', mes) + '</div>';
}

/* ---- administración ---- */
const itemsTotal = items => (items || []).reduce((s, i) => s + (+i.cant || 0) * (+i.precio || 0), 0);
function presMsg(p) { return 'Hola ' + first(p.tutor) + '! Te pasamos el presupuesto de MoledaVet para ' + p.pet + ' (N° ' + p.numero + '):\n' + (p.items || []).map(i => '• ' + i.desc + ' x' + i.cant + ': ' + gs(i.cant * i.precio)).join('\n') + '\nTotal: ' + gs(itemsTotal(p.items)) + '\nVálido por 15 días. ¿Avanzamos?'; }
function vPresupuestos() {
  const list = D.presupuestos.slice().sort((a, b) => a.numero < b.numero ? 1 : -1);
  return '<div class="view"><div class="top"><div><p>Armá, enviá por WhatsApp y convertí en factura</p><h1>Presupuestos</h1></div><button class="btn primary" type="button" data-act="new-pres">Nuevo presupuesto</button></div>' +
    (list.length ? '<div class="box tbl-wrap"><table><thead><tr><th>N°</th><th>Fecha</th><th>Paciente</th><th>Detalle</th><th class="num">Total</th><th>Estado</th><th></th></tr></thead><tbody>' + list.map(p => '<tr><td class="mono">' + esc(p.numero) + '</td><td class="mono">' + dmy(p.fecha) + '</td><td><strong>' + esc(p.pet) + '</strong><br><span class="note">' + esc(p.tutor) + '</span>' + ej(p) + '</td><td class="note">' + (p.items || []).map(i => esc(i.desc)).join(', ') + '</td><td class="num mono">' + gs(itemsTotal(p.items)) + '</td><td><span class="pill p-' + esc(p.estado) + '">' + esc(p.estado) + '</span></td><td><div class="acts"><a class="btn wa sm" data-act="pres-sent" data-id="' + p.id + '" href="' + waLink(p.phone, presMsg(p), p.ejemplo) + '" target="_blank" rel="noopener">Enviar</a>' + (p.estado !== 'Facturado' ? '<button class="btn line sm" type="button" data-act="pres-ok" data-id="' + p.id + '">Aprobar</button><button class="btn primary sm" type="button" data-act="pres-fac" data-id="' + p.id + '">Facturar</button>' : '') + '</div></td></tr>').join('') + '</tbody></table></div>' : '<p class="empty">Todavía no hay presupuestos.</p>') + '</div>';
}

function ivaOf(items) { let i10 = 0, i5 = 0, ex = 0; (items || []).forEach(i => { const t = (+i.cant || 0) * (+i.precio || 0); if (+i.iva === 10) i10 += t; else if (+i.iva === 5) i5 += t; else ex += t; }); return { g10: i10, g5: i5, ex, iva10: Math.round(i10 / 11), iva5: Math.round(i5 / 21) }; }
function vFacturacion() {
  const list = D.facturas.slice().sort((a, b) => a.numero < b.numero ? 1 : -1), t = today();
  const mes = list.filter(f => f.fecha.slice(0, 7) === t.slice(0, 7)), tot = mes.reduce((s, f) => s + itemsTotal(f.items), 0);
  const pend = list.filter(f => f.estado === 'Pendiente de cobro');
  return '<div class="view"><div class="top"><div><p>Facturas con IVA incluido y numeración propia</p><h1>Facturación</h1></div><button class="btn primary" type="button" data-act="new-fac">Nueva factura</button></div>' +
    '<div class="alertbar" style="background:var(--info-soft);color:var(--info)">' + ICON.warn + '<span>La conexión con SIFEN (factura electrónica de la DNIT) se activa en la fase de facturación del proyecto. Mientras tanto, las facturas quedan registradas como “Pendiente de envío”.</span></div>' +
    '<div class="grid-k"><div class="kpi"><p>Facturado este mes</p><b class="sm">' + gs(tot) + '</b><small>' + mes.length + ' facturas</small></div><div class="kpi warn"><p>Por cobrar</p><b class="sm">' + gs(pend.reduce((s, f) => s + itemsTotal(f.items), 0)) + '</b><small>' + pend.length + ' facturas a crédito</small></div><div class="kpi"><p>IVA del mes</p><b class="sm">' + gs(mes.reduce((s, f) => { const v = ivaOf(f.items); return s + v.iva10 + v.iva5; }, 0)) + '</b><small>Débito fiscal</small></div></div>' +
    (list.length ? '<div class="box tbl-wrap"><table><thead><tr><th>Número</th><th>Fecha</th><th>Cliente</th><th>Condición</th><th class="num">Total</th><th>Estado</th><th>SIFEN</th><th></th></tr></thead><tbody>' + list.map(f => '<tr><td class="mono">' + esc(f.numero) + '</td><td class="mono">' + dmy(f.fecha) + '</td><td><strong>' + esc(f.cliente) + '</strong><br><span class="note mono">' + esc(f.ruc || 'Sin RUC') + '</span>' + ej(f) + '</td><td>' + esc(f.condicion) + (f.medio ? '<br><span class="note">' + esc(f.medio) + '</span>' : '') + '</td><td class="num mono">' + gs(itemsTotal(f.items)) + '</td><td><span class="pill ' + (f.estado === 'Pagada' ? 'p-ok' : 'p-warn') + '">' + esc(f.estado) + '</span></td><td><span class="pill p-info">' + esc(f.sifen || 'Pendiente de envío') + '</span></td><td><div class="acts"><button class="btn line sm" type="button" data-act="view-fac" data-id="' + f.id + '">Ver</button>' + (f.estado !== 'Pagada' ? '<button class="btn primary sm" type="button" data-act="cobrar" data-id="' + f.id + '">Cobrar</button>' : '') + '</div></td></tr>').join('') + '</tbody></table></div>' : '<p class="empty">Todavía no hay facturas.</p>') + '</div>';
}

const MEDIOS = ['Efectivo', 'Transferencia', 'Tarjeta', 'QR'];
function vCaja() {
  const dia = UI.cajaDia || today(), movs = D.caja.filter(m => m.fecha === dia).sort((a, b) => (a.hora || '') < (b.hora || '') ? -1 : 1);
  const cd = D.cajadias.filter(c => c.id === dia)[0] || null;
  const by = {}; MEDIOS.forEach(m => { by[m] = 0; }); movs.forEach(m => { by[m.medio] = (by[m.medio] || 0) + (m.tipo === 'Ingreso' ? +m.monto : -m.monto); });
  const ing = movs.filter(m => m.tipo === 'Ingreso').reduce((s, m) => s + +m.monto, 0), egr = movs.filter(m => m.tipo === 'Egreso').reduce((s, m) => s + +m.monto, 0);
  const esperado = (cd ? +cd.apertura : 0) + by.Efectivo;
  return '<div class="view"><div class="top"><div><p>' + fullD(dia) + (feriado(dia) ? ' · feriado' : '') + '</p><h1>Caja diaria</h1></div><div class="acts"><div style="min-width:240px">' + dateField('caja-dia', 'Día de caja', dia, 'libre') + '</div></div></div>' +
    '<div class="grid-k"><div class="kpi"><p>Apertura</p><b class="sm">' + (cd ? gs(cd.apertura) : '—') + '</b><small>' + (cd ? 'Abierta a las ' + esc(cd.horaApertura || '') : 'Caja sin abrir') + '</small></div><div class="kpi"><p>Ingresos</p><b class="sm">' + gs(ing) + '</b><small>' + movs.filter(m => m.tipo === 'Ingreso').length + ' movimientos</small></div><div class="kpi warn"><p>Egresos</p><b class="sm">' + gs(egr) + '</b><small>' + movs.filter(m => m.tipo === 'Egreso').length + ' movimientos</small></div><div class="kpi"><p>Efectivo esperado</p><b class="sm">' + gs(esperado) + '</b><small>Apertura + efectivo del día</small></div></div>' +
    '<div class="box"><h2>Movimientos <span class="acts">' + (!cd ? '<button class="btn primary sm" type="button" data-act="caja-open">Abrir caja</button>' : '') + (cd && !cd.cierre ? '<button class="btn line sm" type="button" data-act="mov" data-t="Egreso">Registrar egreso</button><button class="btn primary sm" type="button" data-act="mov" data-t="Ingreso">Registrar ingreso</button><button class="btn line sm" type="button" data-act="caja-close">Cerrar caja</button>' : '') + '</span></h2>' +
    (cd && cd.cierre ? '<div class="alertbar" style="background:' + (cd.cierre.diferencia === 0 ? 'var(--lime-soft);color:var(--brand)' : 'var(--warn-soft);color:var(--warn)') + '">' + ICON.warn + '<span>Caja cerrada a las ' + esc(cd.cierre.hora) + '. Contado ' + gs(cd.cierre.contado) + ' · esperado ' + gs(cd.cierre.esperado) + ' · diferencia ' + gs(cd.cierre.diferencia) + '</span></div>' : '') +
    (movs.length ? '<div class="tbl-wrap"><table><thead><tr><th>Hora</th><th>Concepto</th><th>Medio</th><th class="num">Ingreso</th><th class="num">Egreso</th></tr></thead><tbody>' + movs.map(m => '<tr><td class="mono">' + esc(m.hora) + '</td><td>' + esc(m.concepto) + ej(m) + '</td><td>' + esc(m.medio) + '</td><td class="num mono">' + (m.tipo === 'Ingreso' ? gs(m.monto) : '') + '</td><td class="num mono">' + (m.tipo === 'Egreso' ? gs(m.monto) : '') + '</td></tr>').join('') + '</tbody><tfoot><tr><td colspan="3">Totales</td><td class="num mono">' + gs(ing) + '</td><td class="num mono">' + gs(egr) + '</td></tr></tfoot></table></div>' : '<p class="empty">' + (cd ? 'Sin movimientos todavía.' : 'Abrí la caja para empezar a registrar.') + '</p>') + '</div>' +
    '<div class="box"><h2>Por medio de pago</h2><div class="bars">' + barRows(MEDIOS.map(m => [m, by[m]])) + '</div></div></div>';
}
function barRows(rows, cls) { const mx = Math.max(1, ...rows.map(r => Math.abs(r[1]))); return rows.map(r => '<div class="bar"><span>' + esc(r[0]) + '</span><span class="track"><span class="fill ' + (cls || '') + '" style="display:block;width:' + Math.round(Math.abs(r[1]) / mx * 100) + '%"></span></span><span class="mono">' + (typeof r[1] === 'number' && r[2] !== 'n' ? gs(r[1]) : r[1]) + '</span></div>').join(''); }

function vStock() {
  const q = UI.stockQ.toLowerCase();
  const prods = D.productos.filter(p => p.tipo === 'Producto' && (!q || (p.nombre + ' ' + p.categoria).toLowerCase().indexOf(q) >= 0)).sort((a, b) => (+a.stock <= +a.minimo ? 0 : 1) - (+b.stock <= +b.minimo ? 0 : 1) || (a.nombre < b.nombre ? -1 : 1));
  const servs = D.productos.filter(p => p.tipo === 'Servicio');
  const valor = D.productos.filter(p => p.tipo === 'Producto').reduce((s, p) => s + (+p.stock) * (+p.costo || 0), 0);
  const comp = D.compras.slice().sort((a, b) => a.fecha < b.fecha ? 1 : -1).slice(0, 8);
  return '<div class="view"><div class="top"><div><p>Medicamentos, alimentos y accesorios</p><h1>Stock y compras</h1></div><div class="acts"><button class="btn line" type="button" data-act="new-prod" data-tipo="Servicio">Nuevo servicio</button><button class="btn line" type="button" data-act="new-prod" data-tipo="Producto">Nuevo producto</button><button class="btn primary" type="button" data-act="compra">Registrar compra</button></div></div>' +
    '<div class="grid-k"><div class="kpi"><p>Productos</p><b>' + D.productos.filter(p => p.tipo === 'Producto').length + '</b><small>En el catálogo</small></div><div class="kpi warn"><p>Stock bajo</p><b>' + D.productos.filter(p => p.tipo === 'Producto' && +p.stock <= +p.minimo).length + '</b><small>En o debajo del mínimo</small></div><div class="kpi"><p>Valor del inventario</p><b class="sm">' + gs(valor) + '</b><small>A precio de costo</small></div></div>' +
    '<div class="toolbar"><label for="sq" style="position:absolute;left:-9999px">Buscar producto</label><input class="search" id="sq" type="search" placeholder="Buscar producto o categoría" value="' + esc(UI.stockQ) + '"></div>' +
    '<div class="box tbl-wrap"><table><thead><tr><th>Producto</th><th>Categoría</th><th class="num">Stock</th><th class="num">Mínimo</th><th class="num">Costo</th><th class="num">Precio</th><th>Vence</th><th></th></tr></thead><tbody>' + (prods.length ? prods.map(p => '<tr class="' + (+p.stock <= +p.minimo ? 'low' : '') + '"><td><strong>' + esc(p.nombre) + '</strong>' + ej(p) + '</td><td>' + esc(p.categoria) + '</td><td class="num mono">' + esc(p.stock) + (+p.stock <= +p.minimo ? ' <span class="pill p-warn">Bajo</span>' : '') + '</td><td class="num mono">' + esc(p.minimo) + '</td><td class="num mono">' + gs(p.costo) + '</td><td class="num mono">' + gs(p.precio) + '</td><td class="mono">' + (p.vence ? dmy(p.vence) : '—') + '</td><td><button class="btn line sm" type="button" data-act="compra" data-id="' + p.id + '">Comprar</button></td></tr>').join('') : '<tr><td colspan="8" class="note">Sin productos.</td></tr>') + '</tbody></table></div>' +
    '<div class="cols"><section class="box" style="flex:1 1 320px"><h2>Servicios y precios</h2>' + (servs.length ? '<div class="bars">' + servs.map(s => '<div class="bar" style="grid-template-columns:1fr auto"><span>' + esc(s.nombre) + ej(s) + '</span><span class="mono">' + gs(s.precio) + '</span></div>').join('') + '</div>' : '<p class="empty">Sin servicios.</p>') + '</section>' +
    '<section class="box" style="flex:1 1 360px"><h2>Últimas compras</h2>' + (comp.length ? '<div class="list">' + comp.map(c => '<div class="item"><div><div class="t">' + esc((prod(c.productoId) || {}).nombre || c.producto) + ' x' + esc(c.cantidad) + '</div><div class="s">' + dmy(c.fecha) + ' · ' + esc(c.proveedor || 'Sin proveedor') + ej(c) + '</div></div><span class="mono">' + gs(c.cantidad * c.costo) + '</span></div>').join('') + '</div>' : '<p class="empty">Sin compras registradas.</p>') + '</section></div></div>';
}

function monthKeys(n) { const out = [], b = noon(); for (let i = n - 1; i >= 0; i--) { const d = new Date(b.getFullYear(), b.getMonth() - i, 1, 12); out.push(iso(d).slice(0, 7)); } return out; }
const mLbl = k => MON[+k.slice(5) - 1].slice(0, 3);
function vTesoreria() {
  const ks = monthKeys(6), rows = ks.map(k => { const ms = D.caja.filter(m => m.fecha.slice(0, 7) === k); return { k, ing: ms.filter(m => m.tipo === 'Ingreso').reduce((s, m) => s + +m.monto, 0), egr: ms.filter(m => m.tipo === 'Egreso').reduce((s, m) => s + +m.monto, 0) }; });
  const mx = Math.max(1, ...rows.map(r => Math.max(r.ing, r.egr))), cur = rows[rows.length - 1];
  const cobrar = D.facturas.filter(f => f.estado === 'Pendiente de cobro');
  const curM = D.caja.filter(m => m.fecha.slice(0, 7) === cur.k), cuenta = { Caja: 0, Banco: 0 };
  curM.forEach(m => { cuenta[m.medio === 'Efectivo' ? 'Caja' : 'Banco'] += m.tipo === 'Ingreso' ? +m.monto : -m.monto; });
  return '<div class="view"><div class="top"><div><p>Movimiento de dinero de los últimos 6 meses</p><h1>Tesorería</h1></div></div>' +
    '<div class="grid-k"><div class="kpi"><p>Ingresos del mes</p><b class="sm">' + gs(cur.ing) + '</b></div><div class="kpi warn"><p>Egresos del mes</p><b class="sm">' + gs(cur.egr) + '</b></div><div class="kpi"><p>Resultado del mes</p><b class="sm">' + gs(cur.ing - cur.egr) + '</b></div><div class="kpi"><p>Neto en caja (efectivo)</p><b class="sm">' + gs(cuenta.Caja) + '</b><small>Banco: ' + gs(cuenta.Banco) + '</small></div></div>' +
    '<section class="box"><h2>Ingresos y egresos por mes</h2><div class="legend" style="margin:0 0 6px"><span><i style="background:var(--brand)"></i>Ingresos</span><span><i style="background:var(--bar2)"></i>Egresos</span></div><div class="vbars">' + rows.map(r => '<div class="col" data-tip="' + esc(MON[+r.k.slice(5) - 1] + ': ingresos ' + gs(r.ing) + ' · egresos ' + gs(r.egr)) + '"><span class="v" style="height:' + (r.ing / mx * 100) + '%"></span><span class="v b2" style="height:' + (r.egr / mx * 100) + '%"></span></div>').join('') + '</div><div class="xl">' + rows.map(r => '<span>' + mLbl(r.k) + '</span>').join('') + '</div>' +
    '<div class="tbl-wrap" style="margin-top:14px"><table><thead><tr><th>Mes</th><th class="num">Ingresos</th><th class="num">Egresos</th><th class="num">Resultado</th></tr></thead><tbody>' + rows.map(r => '<tr><td>' + MON[+r.k.slice(5) - 1] + ' ' + r.k.slice(0, 4) + '</td><td class="num mono">' + gs(r.ing) + '</td><td class="num mono">' + gs(r.egr) + '</td><td class="num mono">' + gs(r.ing - r.egr) + '</td></tr>').join('') + '</tbody></table></div></section>' +
    '<section class="box"><h2>Cuentas por cobrar</h2>' + (cobrar.length ? '<div class="list">' + cobrar.map(f => '<div class="item"><div><div class="t">' + esc(f.cliente) + ' · ' + esc(f.numero) + ej(f) + '</div><div class="s">Emitida el ' + dmy(f.fecha) + ' · ' + (-diffDays(f.fecha)) + ' días</div></div><span class="mono">' + gs(itemsTotal(f.items)) + '</span><button class="btn primary sm" type="button" data-act="cobrar" data-id="' + f.id + '">Registrar cobro</button></div>').join('') + '</div>' : '<p class="empty">No hay facturas pendientes de cobro.</p>') + '</section></div>';
}

function vReportes() {
  const base = UI.repMonth || noon(), k = iso(base).slice(0, 7), mName = MON[base.getMonth()];
  const res = D.reservas.filter(r => r.date.slice(0, 7) === k && r.status !== 'Cancelado'), att = res.filter(r => r.status === 'Atendido');
  const fac = D.facturas.filter(f => f.fecha.slice(0, 7) === k), tot = fac.reduce((s, f) => s + itemsTotal(f.items), 0);
  const nuevos = D.pacientes.filter(p => p.creado && iso(new Date(p.creado)).slice(0, 7) === k).length;
  const bySvc = {}; res.forEach(r => { bySvc[r.service] = (bySvc[r.service] || 0) + 1; });
  D.estadias.filter(e => e.desde.slice(0, 7) === k && e.estado !== 'Cancelada').forEach(e => { const key = e.tipo === 'Hotel' ? 'Hotel canino' : 'Guardería'; bySvc[key] = (bySvc[key] || 0) + 1; });
  const byItem = {}; fac.forEach(f => (f.items || []).forEach(i => { byItem[i.desc] = (byItem[i.desc] || 0) + (+i.cant * +i.precio); }));
  const vac = D.pacientes.reduce((s, p) => s + (p.vacunas || []).filter(v => (v.fecha || '').slice(0, 7) === k).length, 0);
  const days = new Date(base.getFullYear(), base.getMonth() + 1, 0).getDate(), daily = [];
  for (let d = 1; d <= days; d++) { const s = k + '-' + String(d).padStart(2, '0'); daily.push([d, D.caja.filter(m => m.fecha === s && m.tipo === 'Ingreso').reduce((a, m) => a + +m.monto, 0), s]); }
  const mx = Math.max(1, ...daily.map(x => x[1]));
  const svcRows = Object.keys(bySvc).sort((a, b) => bySvc[b] - bySvc[a]).map(s => [s, bySvc[s] + ' turnos', 'n', bySvc[s]]);
  const smx = Math.max(1, ...svcRows.map(r => r[3]));
  return '<div class="view"><div class="top"><div><p>Resumen de ' + mName + ' ' + base.getFullYear() + '</p><h1>Reportes</h1></div><div class="acts"><button class="btn line sm" type="button" data-act="rep" data-d="-1">← Mes anterior</button><button class="btn line sm" type="button" data-act="rep" data-d="0">Este mes</button><button class="btn line sm" type="button" data-act="rep" data-d="1">Siguiente →</button></div></div>' +
    '<div class="grid-k"><div class="kpi"><p>Turnos</p><b>' + res.length + '</b><small>' + att.length + ' atendidos</small></div><div class="kpi"><p>Facturado</p><b class="sm">' + gs(tot) + '</b><small>' + fac.length + ' facturas</small></div><div class="kpi"><p>Ticket promedio</p><b class="sm">' + gs(fac.length ? tot / fac.length : 0) + '</b></div><div class="kpi"><p>Vacunas aplicadas</p><b>' + vac + '</b></div><div class="kpi"><p>Pacientes nuevos</p><b>' + nuevos + '</b></div></div>' +
    '<section class="box"><h2>Ingresos por día</h2><div class="vbars">' + daily.map(x => '<div class="col" data-tip="' + esc(x[0] + '/' + (base.getMonth() + 1) + (feriado(x[2]) ? ' (feriado)' : '') + ': ' + gs(x[1])) + '"><span class="v" style="height:' + (x[1] / mx * 100) + '%"></span></div>').join('') + '</div><div class="xl">' + daily.map(x => '<span>' + (x[0] === 1 || x[0] % 5 === 0 ? x[0] : '') + '</span>').join('') + '</div></section>' +
    '<div class="cols"><section class="box" style="flex:1 1 340px"><h2>Turnos y estadías por servicio</h2>' + (svcRows.length ? '<div class="bars">' + svcRows.map(r => '<div class="bar"><span>' + esc(r[0]) + '</span><span class="track"><span class="fill" style="display:block;width:' + Math.round(r[3] / smx * 100) + '%"></span></span><span class="mono">' + r[3] + '</span></div>').join('') + '</div>' : '<p class="empty">Sin turnos este mes.</p>') + '</section>' +
    '<section class="box" style="flex:1 1 340px"><h2>Lo más vendido</h2>' + (Object.keys(byItem).length ? '<div class="bars">' + barRows(Object.keys(byItem).sort((a, b) => byItem[b] - byItem[a]).slice(0, 6).map(n => [n, byItem[n]])) + '</div>' : '<p class="empty">Sin ventas este mes.</p>') + '</section></div></div>';
}

function vConfig() {
  const y = noon().getFullYear(), list = Object.keys(FERIADOS_BASE).filter(s => s >= y + '-01-01').map(s => ({ fecha: s, nombre: FERIADOS_BASE[s], base: true })).concat(FX.map(f => Object.assign({ base: false }, f))).sort((a, b) => a.fecha < b.fecha ? -1 : 1);
  const t = today();
  return '<div class="view"><div class="top"><div><p>Horarios, feriados y cierres especiales</p><h1>Ajustes</h1></div><div class="acts"><button class="btn line" type="button" id="reset-demo">Restablecer datos de ejemplo</button><button class="btn primary" type="button" data-act="new-fer">Agregar feriado o cierre</button></div></div>' +
    '<div class="cols"><section class="box" style="flex:1 1 300px"><h2>Horario de atención</h2><dl class="kv"><dt>Lunes a viernes</dt><dd>08:00 a 17:00</dd><dt>Sábados</dt><dd>08:00 a 15:00</dd><dt>Domingos</dt><dd>Cerrado</dd><dt>Guardería</dt><dd>Martes a viernes · cupo de ' + CUPO_G + ' por día</dd><dt>Hotel</dt><dd>' + CANILES.length + ' caniles</dd><dt>Sucursal</dt><dd>Boggiani 5884 c/ R.I.6 Boquerón, Asunción</dd></dl><p class="note">El calendario de reservas no deja agendar en domingos, feriados ni fechas pasadas. Si más adelante abren otra sede, se suma acá como sucursal.</p></section>' +
    '<section class="box" style="flex:2 1 420px"><h2>Feriados ' + y + '–' + (y + 1) + '</h2><p class="note" style="margin-top:0">Incluye los traslados por decreto de 2026. Los de ' + (y + 1) + ' figuran en su fecha original hasta que se publique el decreto: si se mueve alguno, agregalo acá como cierre.</p><div class="tbl-wrap"><table><thead><tr><th>Fecha</th><th>Día</th><th>Motivo</th><th>Tipo</th><th></th></tr></thead><tbody>' + list.map(f => '<tr' + (f.fecha < t ? ' style="opacity:.55"' : '') + '><td class="mono">' + dmy(f.fecha) + '</td><td>' + DOWL[fromIso(f.fecha).getDay()] + '</td><td>' + esc(f.nombre) + '</td><td><span class="pill ' + (f.base ? 'p-bad">Nacional' : 'p-warn">Cierre propio') + '</span></td><td>' + (f.base ? '' : '<button class="btn ghost sm" type="button" data-act="del-fer" data-id="' + f.id + '">Quitar</button>') + '</td></tr>').join('') + '</tbody></table></div></section></div></div>';
}

/* ================= forms ================= */
function openModal(html) { $('sheet').innerHTML = html; $('modal').hidden = false; const f = $('sheet').querySelector('input:not([type=hidden]),select,textarea,.dpbtn'); if (f) f.focus(); }
function closeModal() { $('modal').hidden = true; $('sheet').innerHTML = ''; $('dp').hidden = true; }
const fld = (id, label, type, val, extra, full) => '<div class="fld' + (full ? ' full' : '') + '"><label for="' + id + '">' + label + '</label>' + (type === 'textarea' ? '<textarea id="' + id + '"' + (extra || '') + '>' + esc(val || '') + '</textarea>' : '<input id="' + id + '" type="' + type + '" value="' + esc(val == null ? '' : val) + '"' + (extra || '') + '>') + '</div>';
const sel = (id, label, opts, val, full, extra) => '<div class="fld' + (full ? ' full' : '') + '"><label for="' + id + '">' + label + '</label><select id="' + id + '"' + (extra || '') + '>' + opts.map(o => { const v = Array.isArray(o) ? o[0] : o, l = Array.isArray(o) ? o[1] : o; return '<option value="' + esc(v) + '"' + (String(v) === String(val) ? ' selected' : '') + '>' + esc(l) + '</option>'; }).join('') + '</select></div>';
const v = id => { const e = $(id); return e ? String(e.value).trim() : ''; };
const actions = l => '<div class="sheet-acts no-print"><button class="btn line" type="button" data-act="close">Cancelar</button><button class="btn primary" type="submit">' + l + '</button></div>';
const SERVICIOS = ['Consulta veterinaria', 'Baño y peluquería', 'Vacunación', 'Cirugía', 'Control'];

function formPat(p) {
  p = p || { tutor: {} }; const e = !!p.id;
  openModal('<h2 id="m-title">' + (e ? 'Editar ' + esc(p.nombre) : 'Nuevo paciente') + '</h2><form id="f" data-form="pat"' + (e ? ' data-pid="' + p.id + '"' : '') + '><div class="form">' + fld('f-nom', 'Nombre de la mascota', 'text', p.nombre, ' required') + sel('f-esp', 'Especie', ['Perro', 'Gato', 'Otro'], p.especie || 'Perro') + fld('f-raza', 'Raza', 'text', p.raza) + sel('f-sexo', 'Sexo', ['Macho', 'Hembra'], p.sexo || 'Macho') + dateField('f-nac', 'Fecha de nacimiento', p.nacimiento, 'libre', false, true) + fld('f-peso', 'Peso (kg)', 'number', p.peso, ' step="0.1" min="0"') + fld('f-color', 'Color', 'text', p.color) + sel('f-cast', 'Castrado', [['no', 'No'], ['si', 'Sí']], p.castrado ? 'si' : 'no') + fld('f-chip', 'Microchip', 'text', p.microchip) + fld('f-alert', 'Alertas (separadas por coma)', 'text', (p.alertas || []).join(', '), ' placeholder="Ej. Alérgico a la penicilina, Muerde"') +
    fld('f-tnom', 'Nombre del propietario', 'text', p.tutor.nombre, ' required') + fld('f-truc', 'CI o RUC', 'text', p.tutor.ruc) + fld('f-ttel', 'WhatsApp', 'tel', p.tutor.telefono, ' required placeholder="0981 123 456"') + fld('f-tdir', 'Dirección', 'text', p.tutor.direccion) + '</div>' + actions(e ? 'Guardar cambios' : 'Guardar ficha') + '</form>');
}
function fillTimes() {
  const s = v('f-fecha'), svc = v('f-svc'), el = $('f-hora'); if (!el) return;
  const cur = el.value, reason = s ? closedReason(s, svc) : '';
  const busy = {}; D.reservas.filter(r => r.date === s && r.status !== 'Cancelado' && r.service === svc).forEach(r => { busy[r.time] = (busy[r.time] || 0) + 1; });
  const sl = slots(s);
  el.innerHTML = !s ? '<option value="">Elegí primero la fecha</option>' : reason ? '<option value="">' + esc(reason) + '</option>' : sl.map(h => '<option value="' + h + '"' + (h === cur ? ' selected' : '') + '>' + h + (busy[h] ? ' · ' + busy[h] + ' ya agendado' + (busy[h] > 1 ? 's' : '') : '') + '</option>').join('');
  $('f-warn').innerHTML = reason ? '<div class="alertbar" style="margin:0">' + ICON.warn + '<span>' + esc(reason) + '. Elegí otra fecha.</span></div>' : '';
}
function formRes(pid, svc) {
  openModal('<h2 id="m-title">Nueva reserva</h2><form id="f" data-form="res"><div class="form"><p class="note full" style="margin:0;display:flex;align-items:center;gap:8px;flex-wrap:wrap">¿Es hotel o guardería? <button type="button" class="btn line sm" data-act="new-est" data-tipo="Hotel"' + (pid ? ' data-pid="' + pid + '"' : '') + '>Reservar estadía</button></p>' + sel('f-pid', 'Paciente', patOpts(null, 'Paciente nuevo o sin ficha'), pid || '', true) + sel('f-svc', 'Servicio', SERVICIOS, svc || 'Consulta veterinaria') + sel('f-orig', 'Llegó por', ['Teléfono', 'WhatsApp', 'Mostrador', 'Web'], 'Teléfono') + dateField('f-fecha', 'Fecha', '', 'turno') + sel('f-hora', 'Hora', [['', 'Elegí primero la fecha']], '') + '<div class="full" id="f-warn"></div>' +
    '<div class="full" id="f-new"' + (pid ? ' hidden' : '') + '><div class="form">' + fld('f-pet', 'Mascota', 'text', '') + fld('f-tut', 'Propietario', 'text', '') + fld('f-tel', 'WhatsApp', 'tel', '', '', true) + '</div></div>' + fld('f-extra', 'Nota (opcional)', 'text', '', ' placeholder="Ej. 3 noches, plan semanal"') + sel('f-st', 'Estado', ['Confirmado', 'Pendiente'], 'Confirmado') + '</div>' + actions('Guardar reserva') + '</form>');
}
const formConsulta = pid => openModal('<h2 id="m-title">Agregar consulta</h2><form id="f" data-form="consulta" data-pid="' + pid + '"><div class="form">' + dateField('f-fecha', 'Fecha', today(), 'libre') + fld('f-vet', 'Atendió', 'text', '') + fld('f-mot', 'Motivo', 'text', '', ' required', true) + fld('f-diag', 'Diagnóstico', 'textarea', '', '', true) + fld('f-trat', 'Tratamiento', 'textarea', '', '', true) + fld('f-peso', 'Peso (kg)', 'number', '', ' step="0.1" min="0"') + '</div>' + actions('Guardar consulta') + '</form>');
const formVacuna = pid => openModal('<h2 id="m-title">Registrar vacuna</h2><form id="f" data-form="vacuna" data-pid="' + pid + '"><div class="form">' + sel('f-vac', 'Vacuna', ['Antirrábica', 'Séxtuple', 'Óctuple', 'Tos de las perreras', 'Triple felina', 'Leucemia felina'], 'Antirrábica', true) + dateField('f-fecha', 'Aplicada el', today(), 'libre') + dateField('f-prox', 'Próxima dosis', iso(addDays(noon(), 365)), 'libre', false, true) + fld('f-lote', 'Lote', 'text', '') + '</div>' + actions('Guardar vacuna') + '</form>');
const formAntip = pid => openModal('<h2 id="m-title">Registrar antiparasitario</h2><form id="f" data-form="antip" data-pid="' + pid + '"><div class="form">' + sel('f-prod', 'Producto', ['Nexgard', 'Bravecto', 'Scalibor', 'Simparica', 'Desparasitante interno'], 'Nexgard', true) + dateField('f-fecha', 'Aplicado el', today(), 'libre') + dateField('f-prox', 'Próxima dosis', iso(addDays(noon(), 30)), 'libre', false, true) + '</div>' + actions('Guardar dosis') + '</form>');
function formEst(p) { const e = p.estetica || {}; openModal('<h2 id="m-title">Estética de ' + esc(p.nombre) + '</h2><form id="f" data-form="est" data-pid="' + p.id + '"><div class="form">' + dateField('f-ub', 'Último baño', e.ultimoBano, 'libre', false, true) + sel('f-cada', 'Frecuencia', [['', 'Sin definir'], ['2', 'Cada 2 semanas'], ['3', 'Cada 3 semanas'], ['4', 'Cada 4 semanas'], ['6', 'Cada 6 semanas'], ['8', 'Cada 8 semanas']], e.cadaSemanas || '') + fld('f-corte', 'Tipo de corte o indicaciones', 'text', e.corte, '', true) + '</div>' + actions('Guardar') + '</form>'); }

let RX = [];
function rxRows() { $('rx').innerHTML = RX.map((r, i) => '<div class="form" style="border:1px solid var(--line);border-radius:14px;padding:10px">' + fld('rx-m' + i, 'Medicamento', 'text', r.med, ' data-rx="' + i + '" data-k="med" required') + fld('rx-d' + i, 'Dosis', 'text', r.dosis, ' data-rx="' + i + '" data-k="dosis" placeholder="Ej. 1 comprimido"') + fld('rx-f' + i, 'Frecuencia', 'text', r.frecuencia, ' data-rx="' + i + '" data-k="frecuencia" placeholder="Ej. cada 12 horas"') + fld('rx-u' + i, 'Duración', 'text', r.duracion, ' data-rx="' + i + '" data-k="duracion" placeholder="Ej. 7 días"') + (RX.length > 1 ? '<button type="button" class="btn ghost sm full" data-act="rx-del" data-i="' + i + '">Quitar medicamento</button>' : '') + '</div>').join(''); }
function formReceta(pid) { RX = [{ med: '', dosis: '', frecuencia: '', duracion: '' }]; openModal('<h2 id="m-title">Nueva receta</h2><form id="f" data-form="receta" data-pid="' + pid + '"><div class="form">' + dateField('f-fecha', 'Fecha', today(), 'libre') + fld('f-vet', 'Veterinario/a', 'text', '') + '<div class="full itemsed" id="rx"></div><button type="button" class="btn line sm full" data-act="rx-add">Agregar medicamento</button>' + fld('f-ind', 'Indicaciones', 'textarea', '', '', true) + '</div>' + actions('Guardar receta') + '</form>'); rxRows(); }
function printReceta(p, r) {
  openModal('<div class="doc"><div class="doc-h"><div><div class="wm" aria-label="MoledaVet"><span class="paw" aria-hidden="true"></span>Moleda<b>Vet</b></div><div class="note">Boggiani 5884 c/ R.I.6 Boquerón, Asunción · 0981 226 616</div></div><div style="text-align:right"><div class="t" style="font-size:20px">Receta</div><div class="mono">' + dmy(r.fecha) + '</div></div></div>' +
    '<dl class="kv" style="margin-bottom:14px"><dt>Paciente</dt><dd>' + esc(p.nombre) + ' · ' + esc(p.especie) + ' ' + esc(p.raza) + ' · ' + esc(p.peso || '—') + ' kg</dd><dt>Propietario</dt><dd>' + esc(p.tutor.nombre) + '</dd></dl>' +
    '<table style="min-width:0"><thead><tr><th>Medicamento</th><th>Dosis</th><th>Frecuencia</th><th>Duración</th></tr></thead><tbody>' + (r.items || []).map(i => '<tr><td><strong>' + esc(i.med) + '</strong></td><td>' + esc(i.dosis) + '</td><td>' + esc(i.frecuencia) + '</td><td>' + esc(i.duracion) + '</td></tr>').join('') + '</tbody></table>' +
    (r.indicaciones ? '<p><strong>Indicaciones:</strong> ' + esc(r.indicaciones) + '</p>' : '') + '<p style="margin-top:40px;text-align:right">______________________<br>' + esc(r.vet || 'Médico/a veterinario/a') + '</p></div>' +
    '<div class="sheet-acts no-print"><button class="btn line" type="button" data-act="close">Cerrar</button><button class="btn primary" type="button" data-act="print">Imprimir</button></div>');
}

let IT = [];
function itemRows(withIva) {
  const cat = [['', 'Elegir del catálogo…']].concat(D.productos.slice().sort((a, b) => a.tipo < b.tipo ? 1 : -1).map(p => [p.id, p.nombre + ' · ' + gs(p.precio) + (p.tipo === 'Producto' ? ' (stock ' + p.stock + ')' : '')]));
  $('its').innerHTML = IT.map((it, i) => '<div class="irow"><div class="fld"><label for="it-c' + i + '">Ítem ' + (i + 1) + '</label><select id="it-c' + i + '" data-it="' + i + '" data-k="prodId">' + cat.map(o => '<option value="' + esc(o[0]) + '"' + (o[0] === it.prodId ? ' selected' : '') + '>' + esc(o[1]) + '</option>').join('') + '</select><input aria-label="Descripción del ítem ' + (i + 1) + '" data-it="' + i + '" data-k="desc" value="' + esc(it.desc) + '" placeholder="Descripción" required></div>' +
    '<div class="fld"><label for="it-q' + i + '">Cant.</label><input id="it-q' + i + '" type="number" min="1" step="1" data-it="' + i + '" data-k="cant" value="' + esc(it.cant) + '"></div><div class="fld pr"><label for="it-p' + i + '">Precio unit.</label><input id="it-p' + i + '" type="number" min="0" step="500" data-it="' + i + '" data-k="precio" value="' + esc(it.precio) + '"></div>' +
    (withIva ? '<div class="fld"><label for="it-v' + i + '">IVA</label><select id="it-v' + i + '" data-it="' + i + '" data-k="iva">' + [[10, '10%'], [5, '5%'], [0, 'Exenta']].map(o => '<option value="' + o[0] + '"' + (+it.iva === o[0] ? ' selected' : '') + '>' + o[1] + '</option>').join('') + '</select></div>' : '<button type="button" class="btn ghost sm" data-act="it-del" data-i="' + i + '" aria-label="Quitar ítem ' + (i + 1) + '"' + (IT.length < 2 ? ' disabled' : '') + '>Quitar</button>') + '</div>').join('');
  const iv = ivaOf(IT);
  $('tot').innerHTML = '<div class="totline"><span>Total</span><span class="mono">' + gs(itemsTotal(IT)) + '</span></div>' + (withIva ? '<div class="note mono">IVA 10%: ' + gs(iv.iva10) + ' · IVA 5%: ' + gs(iv.iva5) + ' · Exentas: ' + gs(iv.ex) + '</div>' : '');
}
function formPres(pid) {
  IT = [{ prodId: '', desc: '', cant: 1, precio: 0, iva: 10 }];
  openModal('<h2 id="m-title">Nuevo presupuesto</h2><form id="f" data-form="pres"><div class="form">' + sel('f-pid', 'Paciente', patOpts(null, 'Paciente nuevo o sin ficha'), pid || '', true) + '<div class="full" id="f-new"' + (pid ? ' hidden' : '') + '><div class="form">' + fld('f-pet', 'Mascota', 'text', '') + fld('f-tut', 'Propietario', 'text', '') + fld('f-tel', 'WhatsApp', 'tel', '', '', true) + '</div></div>' + dateField('f-fecha', 'Fecha', today(), 'libre') + '<div></div><div class="full itemsed" id="its"></div><button type="button" class="btn line sm full" data-act="it-add">Agregar ítem</button><div class="full" id="tot"></div></div>' + actions('Guardar presupuesto') + '</form>');
  itemRows(false);
}
function nextFacNum() { const n = D.facturas.reduce((m, f) => Math.max(m, +String(f.numero).split('-')[2] || 0), 0) + 1; return '001-001-' + String(n).padStart(7, '0'); }
function formFac(pres) {
  const p = pres && pres.pacienteId ? pat(pres.pacienteId) : null;
  IT = pres ? pres.items.map(i => Object.assign({ iva: 10 }, i)) : [{ prodId: '', desc: '', cant: 1, precio: 0, iva: 10 }];
  openModal('<h2 id="m-title">Nueva factura <span class="mono note">' + nextFacNum() + '</span></h2><form id="f" data-form="fac"' + (pres && pres.id ? ' data-pres="' + pres.id + '"' : '') + (pres && pres.est ? ' data-est="' + pres.est + '"' : '') + '><div class="form">' + fld('f-cli', 'Cliente (razón social)', 'text', p ? p.tutor.nombre : pres ? pres.tutor : '', ' required') + fld('f-ruc', 'RUC o CI', 'text', p ? p.tutor.ruc : '', ' placeholder="Ej. 4567890-1"') + dateField('f-fecha', 'Fecha', today(), 'libre') + sel('f-cond', 'Condición', ['Contado', 'Crédito'], 'Contado') + sel('f-medio', 'Medio de pago', MEDIOS, 'Efectivo', true) + '<input type="hidden" id="f-pid" value="' + esc(pres ? pres.pacienteId || '' : '') + '">' + '<div class="full itemsed" id="its"></div><button type="button" class="btn line sm full" data-act="it-add">Agregar ítem</button><div class="full" id="tot"></div><p class="note full" style="margin:0">Los productos facturados se descuentan del stock. Si es contado, el cobro entra solo a la caja del día.</p></div>' + actions('Emitir factura') + '</form>');
  itemRows(true);
}
function viewFac(f) {
  const iv = ivaOf(f.items);
  openModal('<div class="doc"><div class="doc-h"><div><div class="wm" aria-label="MoledaVet"><span class="paw" aria-hidden="true"></span>Moleda<b>Vet</b></div><div class="note">MoledaVet · Boggiani 5884 c/ R.I.6 Boquerón, Asunción</div></div><div style="text-align:right"><div class="t" style="font-size:18px">Factura ' + esc(f.condicion.toLowerCase()) + '</div><div class="mono">' + esc(f.numero) + '</div><div class="mono">' + dmy(f.fecha) + '</div></div></div>' +
    '<dl class="kv" style="margin-bottom:14px"><dt>Cliente</dt><dd>' + esc(f.cliente) + '</dd><dt>RUC / CI</dt><dd class="mono">' + esc(f.ruc || '—') + '</dd><dt>Estado</dt><dd>' + esc(f.estado) + (f.medio ? ' · ' + esc(f.medio) : '') + '</dd></dl>' +
    '<div class="tbl-wrap"><table style="min-width:0"><thead><tr><th>Descripción</th><th class="num">Cant.</th><th class="num">Precio</th><th class="num">IVA</th><th class="num">Subtotal</th></tr></thead><tbody>' + f.items.map(i => '<tr><td>' + esc(i.desc) + '</td><td class="num">' + esc(i.cant) + '</td><td class="num mono">' + gs(i.precio) + '</td><td class="num">' + (+i.iva ? i.iva + '%' : 'Ex.') + '</td><td class="num mono">' + gs(i.cant * i.precio) + '</td></tr>').join('') + '</tbody><tfoot><tr><td colspan="4">Total</td><td class="num mono">' + gs(itemsTotal(f.items)) + '</td></tr></tfoot></table></div>' +
    '<p class="note mono">Liquidación IVA 10%: ' + gs(iv.iva10) + ' · IVA 5%: ' + gs(iv.iva5) + ' · Total IVA: ' + gs(iv.iva10 + iv.iva5) + '</p><p class="note">SIFEN: ' + esc(f.sifen || 'Pendiente de envío') + '</p></div>' +
    '<div class="sheet-acts no-print"><button class="btn line" type="button" data-act="close">Cerrar</button><button class="btn primary" type="button" data-act="print">Imprimir</button></div>');
}
const formInt = (pid, urg) => openModal('<h2 id="m-title">Internar paciente</h2><form id="f" data-form="int"' + (urg ? ' data-urg="' + urg.id + '"' : '') + '><div class="form">' + sel('f-pid', 'Paciente', patOpts(null, urg ? urg.pet + ' (sin ficha)' : 'Elegir paciente'), pid || '', true) + fld('f-jaula', 'Jaula / box', 'text', '', ' required placeholder="Ej. Box 2"') + sel('f-est', 'Estado', ['Estable', 'Observación', 'Crítico'], 'Observación') + fld('f-mot', 'Motivo de internación', 'text', urg ? urg.motivo : '', ' required', true) + fld('f-trat', 'Plan de tratamiento', 'textarea', '', '', true) + dateField('f-ing', 'Ingreso', today(), 'libre') + fld('f-vet', 'Veterinario/a a cargo', 'text', '') + '</div>' + actions('Internar') + '</form>');
const formUrg = () => openModal('<h2 id="m-title">Registrar urgencia</h2><form id="f" data-form="urg"><div class="form">' + sel('f-pid', 'Paciente', patOpts(null, 'Paciente nuevo o sin ficha'), '', true) + '<div class="full" id="f-new"><div class="form">' + fld('f-pet', 'Mascota', 'text', '') + fld('f-tut', 'Propietario', 'text', '') + fld('f-tel', 'WhatsApp', 'tel', '', '', true) + '</div></div>' + fld('f-mot', 'Qué le pasa', 'text', '', ' required placeholder="Ej. Atropellado, convulsiones, no respira bien"', true) + sel('f-pri', 'Prioridad', [['Roja', 'Roja: atender ya'], ['Amarilla', 'Amarilla: dentro de 30 min'], ['Verde', 'Verde: puede esperar']], 'Amarilla', true) + '</div>' + actions('Registrar') + '</form>');
const formEvo = id => openModal('<h2 id="m-title">Agregar evolución</h2><form id="f" data-form="evo" data-id="' + id + '"><div class="form">' + fld('f-nota', 'Evolución o medicación aplicada', 'textarea', '', ' required placeholder="Ej. Come bien, T° 38,5. Se aplicó antibiótico."', true) + '</div>' + actions('Guardar') + '</form>');
const formMov = t => openModal('<h2 id="m-title">Registrar ' + t.toLowerCase() + '</h2><form id="f" data-form="mov" data-t="' + t + '"><div class="form">' + fld('f-con', 'Concepto', 'text', '', ' required placeholder="' + (t === 'Ingreso' ? 'Ej. Venta de alimento' : 'Ej. Pago de luz') + '"', true) + fld('f-monto', 'Monto (Gs.)', 'number', '', ' required min="0" step="500"') + sel('f-medio', 'Medio', MEDIOS, 'Efectivo') + '</div>' + actions('Guardar') + '</form>');
const formCajaOpen = () => openModal('<h2 id="m-title">Abrir caja</h2><form id="f" data-form="cajaopen"><div class="form">' + fld('f-ap', 'Efectivo inicial (Gs.)', 'number', '200000', ' required min="0" step="500"', true) + '</div>' + actions('Abrir caja') + '</form>');
function formCajaClose() { const dia = UI.cajaDia || today(), cd = D.cajadias.filter(c => c.id === dia)[0]; const esp = (cd ? +cd.apertura : 0) + D.caja.filter(m => m.fecha === dia && m.medio === 'Efectivo').reduce((s, m) => s + (m.tipo === 'Ingreso' ? +m.monto : -m.monto), 0); openModal('<h2 id="m-title">Cerrar caja</h2><form id="f" data-form="cajaclose" data-esp="' + esp + '"><p>Efectivo esperado: <strong class="mono">' + gs(esp) + '</strong></p><div class="form">' + fld('f-cont', 'Efectivo contado (Gs.)', 'number', esp, ' required min="0" step="500"', true) + '</div>' + actions('Cerrar caja') + '</form>'); }
const formProd = tipo => openModal('<h2 id="m-title">Nuevo ' + tipo.toLowerCase() + '</h2><form id="f" data-form="prod" data-tipo="' + tipo + '"><div class="form">' + fld('f-nom', 'Nombre', 'text', '', ' required', true) + (tipo === 'Producto' ? sel('f-cat', 'Categoría', ['Medicamentos', 'Antiparasitarios', 'Vacunas', 'Alimentos', 'Accesorios', 'Higiene'], 'Medicamentos') + fld('f-stock', 'Stock inicial', 'number', '0', ' min="0"') + fld('f-min', 'Stock mínimo', 'number', '5', ' min="0"') + fld('f-costo', 'Costo (Gs.)', 'number', '', ' min="0" step="500"') + dateField('f-vence', 'Vencimiento', '', 'libre', false, true) : '') + fld('f-precio', 'Precio de venta (Gs.)', 'number', '', ' required min="0" step="500"') + '</div>' + actions('Guardar') + '</form>');
const formCompra = id => openModal('<h2 id="m-title">Registrar compra</h2><form id="f" data-form="compra"><div class="form">' + sel('f-prod', 'Producto', D.productos.filter(p => p.tipo === 'Producto').map(p => [p.id, p.nombre + ' (stock ' + p.stock + ')']), id || '', true) + fld('f-cant', 'Cantidad', 'number', '10', ' required min="1"') + fld('f-costo', 'Costo unitario (Gs.)', 'number', id && prod(id) ? prod(id).costo : '', ' required min="0" step="500"') + fld('f-prov', 'Proveedor', 'text', '') + dateField('f-fecha', 'Fecha', today(), 'libre') + '<label class="chk full"><input type="checkbox" id="f-caja" checked> Pagado hoy desde la caja (registra el egreso)</label>' + sel('f-medio', 'Medio de pago', MEDIOS, 'Transferencia', true) + '</div>' + actions('Guardar compra') + '</form>');
const formFer = () => openModal('<h2 id="m-title">Agregar feriado o cierre</h2><form id="f" data-form="fer"><div class="form">' + dateField('f-fecha', 'Fecha', '', 'libre', true) + fld('f-nom', 'Motivo', 'text', '', ' required placeholder="Ej. Feriado extraordinario, vacaciones del equipo"', true) + '</div>' + actions('Agregar') + '</form>');

function formEstadia(pid, tipo) {
  tipo = tipo === 'Guardería' ? 'Guardería' : 'Hotel';
  openModal('<h2 id="m-title">Nueva estadía</h2><form id="f" data-form="estadia"><div class="form"><div class="full chips" role="group" aria-label="Tipo de estadía"><button type="button" class="chip" data-esttipo="Hotel" aria-pressed="' + (tipo === 'Hotel') + '">Hotel canino</button><button type="button" class="chip" data-esttipo="Guardería" aria-pressed="' + (tipo === 'Guardería') + '">Guardería</button></div>' +
    '<input type="hidden" id="f-tipo" value="' + tipo + '"><input type="hidden" id="f-svc" value="' + (tipo === 'Hotel' ? 'Hotel canino' : 'Guardería') + '">' +
    sel('f-pid', 'Paciente', patOpts(null, 'Paciente nuevo o sin ficha'), pid || '', true) + '<div class="full" id="f-new"' + (pid ? ' hidden' : '') + '><div class="form">' + fld('f-pet', 'Mascota', 'text', '') + fld('f-tut', 'Propietario', 'text', '') + fld('f-tel', 'WhatsApp', 'tel', '', '', true) + '</div></div>' +
    dateField('f-desde', tipo === 'Hotel' ? 'Ingreso' : 'Desde', '', 'turno') + dateField('f-hasta', tipo === 'Hotel' ? 'Salida' : 'Hasta', '', 'turno') +
    '<div class="full" id="est-x"></div>' + fld('f-notas', 'Alimentación, medicación y cuidados', 'textarea', '', ' placeholder="Ej. Trae su alimento, 2 veces al día. Sin pollo."', true) +
    sel('f-orig', 'Llegó por', ['Mostrador', 'WhatsApp', 'Teléfono', 'Web'], 'Mostrador') + sel('f-st', 'Estado', ['Reservada', 'Pendiente'], 'Reservada') + '<div class="full" id="est-sum"></div></div>' + actions('Guardar estadía') + '</form>');
  estCalc();
}
function estCalc() {
  if (!$('est-x')) return;
  const tipo = v('f-tipo'), desde = v('f-desde'), hasta = v('f-hasta'), p = pat(v('f-pid'));
  $('l-f-desde').textContent = tipo === 'Hotel' ? 'Ingreso' : 'Desde';
  $('l-f-hasta').textContent = tipo === 'Hotel' ? 'Salida' : 'Hasta';
  if (tipo === 'Hotel') {
    const cur = $('f-canil') ? $('f-canil').value : '', ok = desde && hasta && hasta > desde, libres = ok ? canilesLibres(desde, hasta) : CANILES;
    $('est-x').innerHTML = sel('f-canil', 'Canil', libres.length ? libres.map(c => [c, c]) : [['', 'No hay caniles libres en esas fechas']], libres.indexOf(cur) >= 0 ? cur : libres[0] || '');
  } else {
    const cur = $('f-plan') ? $('f-plan').value : 'Semana';
    $('est-x').innerHTML = sel('f-plan', 'Plan', [['Día', 'Por día'], ['Semana', 'Semanal'], ['Mes', 'Mensual']], cur);
  }
  let sum = '';
  if (desde && hasta) {
    const e = { tipo, desde, hasta };
    if (tipo === 'Hotel' && hasta <= desde) sum = '<div class="alertbar" style="margin:0">' + ICON.warn + '<span>La salida tiene que ser posterior al ingreso.</span></div>';
    else if (tipo === 'Guardería' && hasta < desde) sum = '<div class="alertbar" style="margin:0">' + ICON.warn + '<span>La fecha “hasta” tiene que ser igual o posterior a “desde”.</span></div>';
    else {
      const full = tipo === 'Guardería' ? gDays(desde, hasta).filter(s => guardCount(s) >= CUPO_G) : [];
      sum = '<div class="totline" style="font-size:16px"><span>' + estUnits(e) + (tipo === 'Hotel' ? (nights(e) === 1 ? ' noche' : ' noches') + ' · ' + gs(priceOf('sv-hotel', 90000)) + ' por noche' : (estUnits(e) === 1 ? ' día' : ' días') + ' de guardería (mar a vie, sin feriados)') + '</span><span class="mono">' + gs(estTotal(e)) + '</span></div>' +
        (full.length ? '<div class="alertbar" style="margin:8px 0 0">' + ICON.warn + '<span>Cupo completo el ' + full.map(short).join(', ') + '.</span></div>' : '');
    }
  }
  $('est-sum').innerHTML = sum + '<div class="alerts" style="margin-top:8px"><span class="note" style="font-weight:800">Requisitos:</span>' + reqPills(p) + '</div>';
}
function cajaAdd(m) { return add('caja', Object.assign({ fecha: today(), hora: nowHM() }, m)); }
function saveForm(f) {
  const kind = f.dataset.form, pid = f.dataset.pid;
  const done = m => { closeModal(); toast(m); };
  if (kind === 'pat') {
    const data = { nombre: v('f-nom'), especie: v('f-esp'), raza: v('f-raza'), sexo: v('f-sexo'), nacimiento: v('f-nac'), peso: v('f-peso'), color: v('f-color'), castrado: v('f-cast') === 'si', microchip: v('f-chip'),
      alertas: v('f-alert') ? v('f-alert').split(',').map(s => s.trim()).filter(Boolean) : [], tutor: { nombre: v('f-tnom'), ruc: v('f-truc'), telefono: v('f-ttel'), direccion: v('f-tdir') } };
    if (pid) return upd('pacientes', pid, data).then(() => done('Ficha de ' + data.nombre + ' actualizada.')).catch(fail);
    return add('pacientes', Object.assign(data, { vacunas: [], antiparasitarios: [], consultas: [], recetas: [], estetica: {}, recordados: {}, creado: Date.now() })).then(ref => { done('Ficha de ' + data.nombre + ' creada.'); location.hash = 'paciente-' + ref.id; }).catch(fail);
  }
  if (kind === 'res') {
    if (!v('f-fecha')) return toast('Elegí la fecha del turno.');
    const reason = closedReason(v('f-fecha'), v('f-svc')); if (reason) return toast(reason + '. Elegí otra fecha.');
    const sp = pat(v('f-pid')), r = { service: v('f-svc'), date: v('f-fecha'), time: v('f-hora'), origin: v('f-orig'), status: v('f-st'), extra: v('f-extra'), createdAt: Date.now(), code: 'MV-' + (1000 + Math.floor(Math.random() * 9000)) };
    if (sp) Object.assign(r, { pacienteId: sp.id, pet: sp.nombre, tutor: sp.tutor.nombre, phone: sp.tutor.telefono }, sp.ejemplo ? { ejemplo: true } : {});
    else Object.assign(r, { pet: v('f-pet') || 'Sin nombre', tutor: v('f-tut'), phone: v('f-tel') });
    return add('reservas', r).then(() => done('Reserva de ' + r.pet + ' guardada para el ' + longD(r.date) + (r.time ? ' a las ' + r.time : '') + '.')).catch(fail);
  }
  if (kind === 'pres') {
    const sp = pat(v('f-pid')), items = IT.filter(i => i.desc).map(i => ({ prodId: i.prodId || '', desc: i.desc, cant: +i.cant || 1, precio: +i.precio || 0 }));
    if (!items.length) return toast('Agregá al menos un ítem.');
    const n = D.presupuestos.reduce((m, p) => Math.max(m, +String(p.numero).replace(/\D/g, '') || 0), 0) + 1;
    const d = { numero: 'P-' + String(n).padStart(4, '0'), fecha: v('f-fecha') || today(), items, estado: 'Borrador', creado: Date.now() };
    if (sp) Object.assign(d, { pacienteId: sp.id, pet: sp.nombre, tutor: sp.tutor.nombre, phone: sp.tutor.telefono }, sp.ejemplo ? { ejemplo: true } : {}); else Object.assign(d, { pet: v('f-pet'), tutor: v('f-tut'), phone: v('f-tel') });
    return add('presupuestos', d).then(() => done('Presupuesto ' + d.numero + ' guardado por ' + gs(itemsTotal(items)) + '.')).catch(fail);
  }
  if (kind === 'fac') {
    const items = IT.filter(i => i.desc).map(i => ({ prodId: i.prodId || '', desc: i.desc, cant: +i.cant || 1, precio: +i.precio || 0, iva: +i.iva }));
    if (!items.length) return toast('Agregá al menos un ítem.');
    const contado = v('f-cond') === 'Contado';
    const fa = { numero: nextFacNum(), fecha: v('f-fecha') || today(), cliente: v('f-cli'), ruc: v('f-ruc'), condicion: v('f-cond'), medio: contado ? v('f-medio') : '', items, estado: contado ? 'Pagada' : 'Pendiente de cobro', sifen: 'Pendiente de envío', pacienteId: v('f-pid'), presupuestoId: f.dataset.pres || '', creado: Date.now() };
    const jobs = [add('facturas', fa)];
    items.forEach(i => { const pr = prod(i.prodId); if (pr && pr.tipo === 'Producto') jobs.push(upd('productos', pr.id, { stock: Math.max(0, +pr.stock - i.cant) })); });
    if (contado) jobs.push(cajaAdd({ fecha: fa.fecha, tipo: 'Ingreso', concepto: 'Factura ' + fa.numero + ' · ' + fa.cliente, medio: fa.medio, monto: itemsTotal(items) }));
    if (fa.presupuestoId) jobs.push(upd('presupuestos', fa.presupuestoId, { estado: 'Facturado' }));
    if (f.dataset.est) jobs.push(upd('estadias', f.dataset.est, { facturada: fa.numero }));
    return Promise.all(jobs).then(() => done('Factura ' + fa.numero + ' emitida por ' + gs(itemsTotal(items)) + '.')).catch(fail);
  }
  if (kind === 'int') {
    const sp = pat(v('f-pid')), urg = f.dataset.urg ? D.urgencias.filter(u => u.id === f.dataset.urg)[0] : null;
    const d = { pacienteId: sp ? sp.id : '', pet: sp ? sp.nombre : urg ? urg.pet : 'Sin nombre', jaula: v('f-jaula'), estado: v('f-est'), motivo: v('f-mot'), tratamiento: v('f-trat'), ingreso: v('f-ing') || today(), vet: v('f-vet'), evolucion: [{ ts: Date.now(), nota: 'Ingreso: ' + v('f-mot') }], alta: '' };
    if ((sp && sp.ejemplo) || (urg && urg.ejemplo)) d.ejemplo = true;
    const jobs = [add('internaciones', d)]; if (urg) jobs.push(upd('urgencias', urg.id, { estado: 'Finalizada', resultado: 'Internado' }));
    return Promise.all(jobs).then(() => { done(d.pet + ' quedó internado en ' + d.jaula + '.'); location.hash = 'internacion'; }).catch(fail);
  }
  if (kind === 'estadia') {
    const tipo = v('f-tipo'), desde = v('f-desde'), hasta = v('f-hasta'), svc = tipo === 'Hotel' ? 'Hotel canino' : 'Guardería';
    if (!desde || !hasta) return toast('Elegí las dos fechas.');
    if (tipo === 'Hotel' ? hasta <= desde : hasta < desde) return toast('Revisá las fechas de la estadía.');
    const r1 = closedReason(desde, svc), r2 = closedReason(hasta, svc); if (r1 || r2) return toast((r1 || r2) + '. Elegí otra fecha.');
    if (tipo === 'Hotel' && !v('f-canil')) return toast('No hay caniles libres en esas fechas.');
    if (tipo === 'Guardería' && !gDays(desde, hasta).length) return toast('En ese rango no hay días de guardería.');
    const sp = pat(v('f-pid')), d = { tipo, desde, hasta, notas: v('f-notas'), origin: v('f-orig'), estado: v('f-st'), createdAt: Date.now() };
    if (tipo === 'Hotel') d.canil = v('f-canil'); else d.plan = v('f-plan');
    if (sp) Object.assign(d, { pacienteId: sp.id, pet: sp.nombre, tutor: sp.tutor.nombre, phone: sp.tutor.telefono }, sp.ejemplo ? { ejemplo: true } : {}); else Object.assign(d, { pacienteId: '', pet: v('f-pet') || 'Sin nombre', tutor: v('f-tut'), phone: v('f-tel') });
    return add('estadias', d).then(() => { done((tipo === 'Hotel' ? 'Reserva de hotel de ' : 'Guardería de ') + d.pet + ' guardada: ' + estRange(d) + '.'); location.hash = 'hotel'; }).catch(fail);
  }
  if (kind === 'urg') {
    const sp = pat(v('f-pid')), d = { motivo: v('f-mot'), prioridad: v('f-pri'), llegada: Date.now(), estado: 'En espera' };
    if (sp) Object.assign(d, { pacienteId: sp.id, pet: sp.nombre, tutor: sp.tutor.nombre, phone: sp.tutor.telefono }, sp.ejemplo ? { ejemplo: true } : {}); else Object.assign(d, { pet: v('f-pet') || 'Sin nombre', tutor: v('f-tut'), phone: v('f-tel') });
    return add('urgencias', d).then(() => { done('Urgencia de ' + d.pet + ' registrada.'); location.hash = 'urgencias'; }).catch(fail);
  }
  if (kind === 'evo') { const i = D.internaciones.filter(x => x.id === f.dataset.id)[0]; if (!i) return; return upd('internaciones', i.id, { evolucion: (i.evolucion || []).concat([{ ts: Date.now(), nota: v('f-nota') }]) }).then(() => done('Evolución guardada.')).catch(fail); }
  if (kind === 'mov') { const m = { fecha: UI.cajaDia || today(), tipo: f.dataset.t, concepto: v('f-con'), monto: +v('f-monto') || 0, medio: v('f-medio') }; return cajaAdd(m).then(() => done(m.tipo + ' de ' + gs(m.monto) + ' registrado.')).catch(fail); }
  if (kind === 'cajaopen') { const dia = UI.cajaDia || today(); return db.doc('cajadias/' + dia).set({ apertura: +v('f-ap') || 0, horaApertura: nowHM() }).then(() => done('Caja abierta.')).catch(fail); }
  if (kind === 'cajaclose') { const dia = UI.cajaDia || today(), esp = +f.dataset.esp, c = +v('f-cont') || 0; return upd('cajadias', dia, { cierre: { contado: c, esperado: esp, diferencia: c - esp, hora: nowHM() } }).then(() => done('Caja cerrada. Diferencia: ' + gs(c - esp) + '.')).catch(fail); }
  if (kind === 'prod') { const tipo = f.dataset.tipo, d = { tipo, nombre: v('f-nom'), precio: +v('f-precio') || 0 }; if (tipo === 'Producto') Object.assign(d, { categoria: v('f-cat'), stock: +v('f-stock') || 0, minimo: +v('f-min') || 0, costo: +v('f-costo') || 0, vence: v('f-vence') }); return add('productos', d).then(() => done(d.nombre + ' agregado.')).catch(fail); }
  if (kind === 'compra') {
    const pr = prod(v('f-prod')); if (!pr) return toast('Elegí un producto.');
    const c = { productoId: pr.id, producto: pr.nombre, cantidad: +v('f-cant') || 0, costo: +v('f-costo') || 0, proveedor: v('f-prov'), fecha: v('f-fecha') || today() };
    const jobs = [add('compras', c), upd('productos', pr.id, { stock: +pr.stock + c.cantidad, costo: c.costo })];
    if ($('f-caja').checked) jobs.push(cajaAdd({ fecha: c.fecha, tipo: 'Egreso', concepto: 'Compra ' + pr.nombre + ' x' + c.cantidad + (c.proveedor ? ' · ' + c.proveedor : ''), medio: v('f-medio'), monto: c.cantidad * c.costo }));
    return Promise.all(jobs).then(() => done('Compra registrada. Stock de ' + pr.nombre + ': ' + (+pr.stock + c.cantidad) + '.')).catch(fail);
  }
  if (kind === 'fer') { if (!v('f-fecha')) return toast('Elegí la fecha.'); const d = { fecha: v('f-fecha'), nombre: v('f-nom') }; return add('feriados', d).then(() => done('Cierre del ' + dmy(d.fecha) + ' agregado. El calendario ya no deja agendar ese día.')).catch(fail); }
  // patient sub-records
  const pp = pat(pid); if (!pp) return;
  let patch = {};
  if (kind === 'consulta') { const e = { fecha: v('f-fecha') || today(), vet: v('f-vet'), motivo: v('f-mot'), diagnostico: v('f-diag'), tratamiento: v('f-trat'), peso: v('f-peso') }; patch.consultas = (pp.consultas || []).concat([e]); if (e.peso) patch.peso = e.peso; }
  if (kind === 'vacuna') patch.vacunas = (pp.vacunas || []).concat([{ nombre: v('f-vac'), fecha: v('f-fecha'), proxima: v('f-prox'), lote: v('f-lote') }]);
  if (kind === 'antip') patch.antiparasitarios = (pp.antiparasitarios || []).concat([{ producto: v('f-prod'), fecha: v('f-fecha'), proxima: v('f-prox') }]);
  if (kind === 'est') patch.estetica = { ultimoBano: v('f-ub'), cadaSemanas: +v('f-cada') || 0, corte: v('f-corte') };
  if (kind === 'receta') { const items = RX.filter(r => r.med); if (!items.length) return toast('Agregá al menos un medicamento.'); patch.recetas = (pp.recetas || []).concat([{ fecha: v('f-fecha') || today(), vet: v('f-vet'), items, indicaciones: v('f-ind') }]); }
  upd('pacientes', pid, patch).then(() => done('Guardado en la ficha de ' + pp.nombre + '.')).catch(fail);
}

/* ================= routing & events ================= */
function decorateBoxes(vk) {
  document.querySelectorAll('#view .box > h2').forEach(h => {
    const tn = h.firstChild; if (!tn || tn.nodeType !== 3 || !tn.textContent.trim()) return;
    const title = tn.textContent.trim(), key = vk + '|' + title, closed = !!CZ[key];
    const b = document.createElement('button'); b.type = 'button'; b.className = 'cx'; b.dataset.cx = key; b.setAttribute('aria-expanded', !closed); b.title = closed ? 'Expandir' : 'Contraer';
    b.innerHTML = CHEV + '<span>' + esc(title) + '</span>'; h.replaceChild(b, tn);
    if (closed) h.parentElement.classList.add('cz');
  });
}
document.addEventListener('click', e => {
  const c = e.target.closest('[data-cx]');
  if (c) { const box = c.closest('.box'), closed = !box.classList.contains('cz'); box.classList.toggle('cz', closed); c.setAttribute('aria-expanded', !closed); c.title = closed ? 'Expandir' : 'Contraer'; if (closed) CZ[c.dataset.cx] = 1; else delete CZ[c.dataset.cx]; LSset('mv-cz', CZ); return; }
  const g = e.target.closest('[data-patg]');
  if (g) { const L = g.dataset.patg; if (UI.patC[L]) delete UI.patC[L]; else UI.patC[L] = 1; LSset('mv-patc', UI.patC); return render(); }
  const l = e.target.closest('[data-patl]');
  if (l) { const L = l.dataset.patl; delete UI.patC[L]; LSset('mv-patc', UI.patC); render(); const el = $('pg-' + L); if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); const hb = el.querySelector('.pgh'); if (hb) hb.focus({ preventScroll: true }); } return; }
  const pv = e.target.closest('[data-patv]'); if (pv) { UI.patView = pv.dataset.patv; LSset('mv-patview', UI.patView); return render(); }
  const ps = e.target.closest('[data-patsp]'); if (ps) { UI.patSp = ps.dataset.patsp; return render(); }
  const pa = e.target.closest('[data-patall]');
  if (pa) { if (pa.dataset.patall === 'close') { UI.patC = {}; D.pacientes.forEach(p => { UI.patC[letterOf(p)] = 1; }); } else UI.patC = {}; LSset('mv-patc', UI.patC); return render(); }
});
function render() {
  if (COLS.some(c => !ready[c])) return;
  FX = D.feriados;
  badge('agenda', D.reservas.filter(r => r.status === 'Pendiente').length);
  badge('recordatorios', dueSoon().length);
  badge('urgencias', D.urgencias.filter(u => u.estado === 'En espera').length);
  badge('hotel', D.estadias.filter(e => e.estado === 'Pendiente').length);
  badge('internacion', D.internaciones.filter(i => !i.alta).length);
  badge('stock', D.productos.filter(p => p.tipo === 'Producto' && +p.stock <= +p.minimo).length);
  badge('tesoreria', D.facturas.filter(f => f.estado === 'Pendiente de cobro').length);
  const h = location.hash.replace('#', '') || 'inicio';
  const V = { inicio: vInicio, agenda: vAgenda, pacientes: vPacientes, internacion: vInternacion, urgencias: vUrgencias, hotel: vHotel, estetica: vEstetica, recordatorios: vRecordatorios, presupuestos: vPresupuestos, facturacion: vFacturacion, caja: vCaja, stock: vStock, tesoreria: vTesoreria, reportes: vReportes, config: vConfig };
  let html;
  if (h.indexOf('paciente-') === 0) { setNav('pacientes'); html = vFicha(h.slice(9)); }
  else { const k = V[h] ? h : 'inicio'; setNav(k); html = V[k](); }
  const ae = document.activeElement, fid = ae && (ae.id === 'q' || ae.id === 'sq') ? ae.id : null, pos = fid ? ae.selectionStart : null;
  $('view').innerHTML = html;
  decorateBoxes(h.indexOf('paciente-') === 0 ? 'ficha-' + UI.tab : h);
  if (fid && $(fid)) { $(fid).focus(); $(fid).setSelectionRange(pos, pos); }
}
window.addEventListener('hashchange', () => { UI.tab = 'resumen'; $('side').classList.remove('open'); $('menu-btn').setAttribute('aria-expanded', 'false'); render(); window.scrollTo(0, 0); });
document.addEventListener('input', e => {
  const t = e.target;
  if (t.id === 'q') { UI.patQ = t.value; render(); }
  if (t.id === 'sq') { UI.stockQ = t.value; render(); }
  if (t.dataset.it != null) { IT[+t.dataset.it][t.dataset.k] = t.value; if (t.dataset.k !== 'desc') { const wi = !!$('sheet').querySelector('[data-k="iva"]'); const iv = ivaOf(IT); $('tot').innerHTML = '<div class="totline"><span>Total</span><span class="mono">' + gs(itemsTotal(IT)) + '</span></div>' + (wi ? '<div class="note mono">IVA 10%: ' + gs(iv.iva10) + ' · IVA 5%: ' + gs(iv.iva5) + ' · Exentas: ' + gs(iv.ex) + '</div>' : ''); } }
  if (t.dataset.rx != null) RX[+t.dataset.rx][t.dataset.k] = t.value;
});
document.addEventListener('change', e => {
  const t = e.target;
  if (t.id === 'f-pid' && $('f-new')) $('f-new').hidden = !!t.value;
  if ((t.id === 'f-fecha' || t.id === 'f-svc') && $('f-hora')) fillTimes();
  if (t.id === 'f-plan' && v('f-desde') && !v('f-hasta')) { const add2 = { 'Día': 0, 'Semana': 6, 'Mes': 29 }[t.value] || 0; let h = iso(addDays(fromIso(v('f-desde')), add2)); while (closedReason(h, 'Guardería') && h > v('f-desde')) h = iso(addDays(fromIso(h), -1)); $('f-hasta').value = h; $('t-f-hasta').innerHTML = dpText(h); }
  if (['f-desde', 'f-hasta', 'f-pid', 'f-plan'].indexOf(t.id) >= 0 && $('est-x')) estCalc();
  if (t.id === 'caja-dia') { UI.cajaDia = t.value || today(); render(); }
  if (t.dataset.it != null && (t.dataset.k === 'prodId' || t.dataset.k === 'iva')) { const i = +t.dataset.it; IT[i][t.dataset.k] = t.value; if (t.dataset.k === 'prodId') { const p = prod(t.value); if (p) { IT[i].desc = p.nombre; IT[i].precio = +p.precio; } } itemRows(!!$('sheet').querySelector('[data-k="iva"]')); }
  if (t.dataset.intst) upd('internaciones', t.dataset.intst, { estado: t.value }).then(() => toast('Estado actualizado.')).catch(fail);
});
document.addEventListener('submit', e => { if (e.target.id === 'f') { e.preventDefault(); if (db) saveForm(e.target); } });
document.addEventListener('keydown', e => { if (e.key !== 'Escape') return; if (!$('dp').hidden) return closeDP(); if (!$('modal').hidden) closeModal(); });
$('modal').addEventListener('click', e => { if (e.target === $('modal')) closeModal(); });
document.addEventListener('mouseover', e => { const c = e.target.closest('[data-tip]'), tp = $('tip'); if (!c) { tp.hidden = true; return; } tp.textContent = c.dataset.tip; tp.hidden = false; const r = c.getBoundingClientRect(); tp.style.left = Math.min(window.innerWidth - tp.offsetWidth - 8, Math.max(8, r.left + r.width / 2 - tp.offsetWidth / 2)) + 'px'; tp.style.top = Math.max(8, r.top - tp.offsetHeight - 6) + 'px'; });
document.addEventListener('click', e => {
  const dpb = e.target.closest('[data-dp]'); if (dpb) return openDP(dpb);
  const tt = e.target.closest('[data-esttipo]');
  if (tt) { const tp = tt.dataset.esttipo; $('f-tipo').value = tp; $('f-svc').value = tp === 'Hotel' ? 'Hotel canino' : 'Guardería'; document.querySelectorAll('[data-esttipo]').forEach(b => b.setAttribute('aria-pressed', b === tt)); estCalc(); return; }
  const t = e.target.closest('[data-act],[data-tab],[data-remf],[data-agmode],[data-goweek]'); if (!t) return;
  if (t.dataset.tab) { UI.tab = t.dataset.tab; return render(); }
  if (t.dataset.remf) { UI.remF = t.dataset.remf; return render(); }
  if (t.dataset.agmode) { UI.agMode = t.dataset.agmode; return render(); }
  if (t.dataset.goweek) { const d = fromIso(t.dataset.goweek), m0 = noon(); const mon = x => addDays(x, x.getDay() === 0 ? -6 : 1 - x.getDay()); UI.agOffset = Math.round((mon(d) - mon(m0)) / (7 * 86400000)); UI.agMode = 'semana'; return render(); }
  const a = t.dataset.act, id = t.dataset.id;
  const R = { close: closeModal, print: () => window.print(), 'new-pat': () => formPat(), 'edit-pat': () => formPat(pat(t.dataset.pid)), 'new-res': () => formRes(t.dataset.pid, t.dataset.svc), 'add-consulta': () => formConsulta(t.dataset.pid), 'add-vacuna': () => formVacuna(t.dataset.pid), 'add-antip': () => formAntip(t.dataset.pid), 'edit-est': () => formEst(pat(t.dataset.pid)),
    'new-receta': () => formReceta(t.dataset.pid), 'print-receta': () => { const p = pat(t.dataset.pid); printReceta(p, p.recetas[+t.dataset.i]); }, 'rx-add': () => { RX.push({ med: '', dosis: '', frecuencia: '', duracion: '' }); rxRows(); }, 'rx-del': () => { RX.splice(+t.dataset.i, 1); rxRows(); },
    'new-pres': () => formPres(t.dataset.pid), 'it-add': () => { IT.push({ prodId: '', desc: '', cant: 1, precio: 0, iva: 10 }); itemRows(!!$('sheet').querySelector('[data-k="iva"]')); }, 'it-del': () => { IT.splice(+t.dataset.i, 1); itemRows(false); },
    'new-fac': () => formFac(), 'view-fac': () => viewFac(D.facturas.filter(f => f.id === id)[0]), 'pres-fac': () => formFac(D.presupuestos.filter(p => p.id === id)[0]),
    'new-int': () => formInt(t.dataset.pid), 'new-est': () => formEstadia(t.dataset.pid, t.dataset.tipo),
    'est-fac': () => { const x = D.estadias.filter(y => y.id === id)[0]; if (!x) return; const n = estUnits(x), h = x.tipo === 'Hotel'; formFac({ est: x.id, pacienteId: x.pacienteId, tutor: x.tutor, items: [{ prodId: h ? 'sv-hotel' : 'sv-guarderia', desc: (h ? 'Hotel canino · ' + n + (n === 1 ? ' noche' : ' noches') : 'Guardería plan ' + String(x.plan || 'Día').toLowerCase() + ' · ' + n + (n === 1 ? ' día' : ' días')) + ' · ' + x.pet, cant: n, precio: h ? priceOf('sv-hotel', 90000) : priceOf('sv-guarderia', 60000) }] }); }, 'new-urg': formUrg, evo: () => formEvo(id), mov: () => formMov(t.dataset.t), 'caja-open': formCajaOpen, 'caja-close': formCajaClose, 'new-prod': () => formProd(t.dataset.tipo), compra: () => formCompra(id), 'new-fer': formFer,
    wk: () => { UI.agOffset = +t.dataset.d === 0 ? 0 : UI.agOffset + +t.dataset.d; render(); },
    mon: () => { const b = UI.agMonth || noon(); UI.agMonth = +t.dataset.d === 0 ? noon() : new Date(b.getFullYear(), b.getMonth() + +t.dataset.d, 1, 12); render(); },
    rep: () => { const b = UI.repMonth || noon(); UI.repMonth = +t.dataset.d === 0 ? noon() : new Date(b.getFullYear(), b.getMonth() + +t.dataset.d, 1, 12); render(); } };
  if (R[a]) return R[a]();
  if (!db) return;
  if (a === 'remind') { const r = allReminders().filter(x => x.key === t.dataset.key && x.p.id === t.dataset.pid)[0]; if (r) { const patch = { recordados: Object.assign({}, r.p.recordados || {}) }; patch.recordados[r.key] = Date.now(); upd('pacientes', r.p.id, patch).then(() => toast('Recordatorio marcado como enviado a ' + r.p.tutor.nombre + '.')).catch(fail); } return; }
  if (a === 'res-confirm' || a === 'res-cancel' || a === 'res-done') { const st = { 'res-confirm': 'Confirmado', 'res-cancel': 'Cancelado', 'res-done': 'Atendido' }[a], r = D.reservas.filter(x => x.id === id)[0]; return upd('reservas', id, { status: st }).then(() => toast('Reserva de ' + (r ? r.pet : '') + ': ' + st.toLowerCase() + '.')).catch(fail); }
  if (a === 'alta') { const i = D.internaciones.filter(x => x.id === id)[0]; const jobs = [upd('internaciones', id, { alta: today(), estado: 'Alta' })]; const p = i && pat(i.pacienteId); if (p) jobs.push(upd('pacientes', p.id, { consultas: (p.consultas || []).concat([{ fecha: today(), motivo: 'Internación: ' + i.motivo, diagnostico: 'Alta médica tras ' + (Math.max(0, -diffDays(i.ingreso)) + 1) + ' días', tratamiento: i.tratamiento || '', vet: i.vet || '' }]) })); return Promise.all(jobs).then(() => toast((i ? i.pet : 'Paciente') + ' recibió el alta. Quedó registrado en su historia clínica.')).catch(fail); }
  if (a === 'est-conf' || a === 'est-cancel' || a === 'est-in' || a === 'est-out') {
    const x = D.estadias.filter(y => y.id === id)[0], st = { 'est-conf': 'Reservada', 'est-cancel': 'Cancelada', 'est-in': 'En curso', 'est-out': 'Finalizada' }[a], patch = { estado: st };
    if (a === 'est-in') patch.ingresoReal = today() + ' ' + nowHM(); if (a === 'est-out') patch.salidaReal = today() + ' ' + nowHM();
    const msg = { 'est-conf': 'Estadía de ' + (x ? x.pet : '') + ' confirmada.', 'est-cancel': 'Estadía cancelada.', 'est-in': 'Ingreso de ' + (x ? x.pet : '') + ' registrado.', 'est-out': 'Salida de ' + (x ? x.pet : '') + ' registrada. Ya podés facturar la estadía.' }[a];
    return upd('estadias', id, patch).then(() => toast(msg)).catch(fail);
  }
  if (a === 'urg-at') return upd('urgencias', id, { estado: 'En atención' }).catch(fail);
  if (a === 'urg-fin') return upd('urgencias', id, { estado: 'Finalizada' }).catch(fail);
  if (a === 'urg-int') { const u = D.urgencias.filter(x => x.id === id)[0]; return formInt(u.pacienteId, u); }
  if (a === 'pres-sent') { const p = D.presupuestos.filter(x => x.id === id)[0]; if (p && p.estado === 'Borrador') upd('presupuestos', id, { estado: 'Enviado' }).catch(fail); return; }
  if (a === 'pres-ok') return upd('presupuestos', id, { estado: 'Aprobado' }).then(() => toast('Presupuesto aprobado.')).catch(fail);
  if (a === 'cobrar') { const f = D.facturas.filter(x => x.id === id)[0]; if (!f) return; return Promise.all([upd('facturas', id, { estado: 'Pagada', medio: 'Efectivo' }), cajaAdd({ tipo: 'Ingreso', concepto: 'Cobro factura ' + f.numero + ' · ' + f.cliente, medio: 'Efectivo', monto: itemsTotal(f.items) })]).then(() => toast('Cobro de ' + gs(itemsTotal(f.items)) + ' registrado en la caja de hoy.')).catch(fail); }
  if (a === 'del-fer') return del('feriados', id).then(() => toast('Cierre quitado.')).catch(fail);
});

const KEY = 'mv-demo-db-v3';
function loadStore() { try { const s = localStorage.getItem(KEY); if (s) return JSON.parse(s); } catch (e) {} return JSON.parse(JSON.stringify(window.SEED)); }
let STORE = loadStore(); const LS = {};
function persist() { try { localStorage.setItem(KEY, JSON.stringify(STORE)); } catch (e) {} }
const snap = c => ({ docs: Object.keys(STORE[c] || {}).map(id => ({ id, data: () => JSON.parse(JSON.stringify(STORE[c][id])) })) });
const emit = c => (LS[c] || []).forEach(cb => cb(snap(c)));
const mockDb = {
  collection: c => ({
    onSnapshot: cb => { (LS[c] = LS[c] || []).push(cb); cb(snap(c)); return () => {}; },
    add: d => { const id = 'd' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); (STORE[c] = STORE[c] || {})[id] = d; persist(); emit(c); return Promise.resolve({ id }); }
  }),
  doc: p => {
    const s = p.split('/'), c = s[0], id = s[1];
    return {
      update: d => { if (!STORE[c] || !STORE[c][id]) return Promise.reject(new Error('no existe')); Object.assign(STORE[c][id], d); persist(); emit(c); return Promise.resolve(); },
      set: d => { (STORE[c] = STORE[c] || {})[id] = d; persist(); emit(c); return Promise.resolve(); },
      delete: () => { if (STORE[c]) delete STORE[c][id]; persist(); emit(c); return Promise.resolve(); }
    };
  }
};
const USER = 'moledavet', PASS = 'Demo2026';
function authed() { try { return localStorage.getItem('mv-demo-auth') === '1'; } catch (e) { return window.__auth === true; } }
function start() {
  $('login').hidden = true;
  if (db) return render();
  db = mockDb;
  COLS.forEach(col => db.collection(col).onSnapshot(s => {
    D[col] = s.docs.map(x => { const o = Object.assign({}, x.data(), { id: x.id }); if (col === 'pacientes') o.tutor = o.tutor || {}; return o; });
    ready[col] = true; render();
  }));
}
$('lf').addEventListener('submit', e => {
  e.preventDefault();
  if ($('lu').value.trim().toLowerCase() === USER && $('lp').value === PASS) { try { localStorage.setItem('mv-demo-auth', '1'); } catch (er) { window.__auth = true; } $('lerr').textContent = ''; start(); }
  else { $('lerr').textContent = 'Usuario o contraseña incorrectos.'; $('lp').value = ''; $('lp').focus(); }
});
$('logout').addEventListener('click', () => { try { localStorage.removeItem('mv-demo-auth'); } catch (e) {} window.__auth = false; $('login').hidden = false; $('lu').focus(); });
document.addEventListener('click', e => { if (e.target.closest('#reset-demo')) { try { localStorage.removeItem(KEY); } catch (er) {} STORE = JSON.parse(JSON.stringify(window.SEED)); COLS.forEach(emit); toast('Datos de ejemplo restablecidos.'); } });
if (authed()) start(); else { $('login').hidden = false; $('lu').focus(); }
