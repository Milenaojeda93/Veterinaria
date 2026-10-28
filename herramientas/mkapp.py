import os
import re
s = open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'../sistema/index.html')).read()
js = s[s.index('<script>')+8 : s.rindex('</script>')]
WM = '<div class="wm" aria-label="MoledaVet"><span class="paw" aria-hidden="true"></span>Moleda<b>Vet</b></div>'
js = js.replace('<img src="img/logo.png" alt="MoledaVet">', WM)
js = js.replace('''<button class="btn primary" type="button" data-act="new-fer">Agregar feriado o cierre</button></div>''', '''<div class="acts"><button class="btn line" type="button" id="reset-demo">Restablecer datos de ejemplo</button><button class="btn primary" type="button" data-act="new-fer">Agregar feriado o cierre</button></div></div>''', 1)
i0 = js.index('(function init() {')
mock = r'''const KEY = 'mv-demo-db-v3';
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
'''
js = js[:i0] + mock
open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'../demo/app.js'), 'w').write(js.lstrip('\n'))
print(len(js), 'img' in js and js.count('img/logo'))
