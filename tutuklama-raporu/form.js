/* Tutuklama Raporu: alanlar ve çıktı şablonu (HTML — forumun orijinal Tutuklama Raporu şablonu). */

/* "15:29" -> "1529'da" — ek, saatin dört haneli halinin SON RAKAMINA göre seçilir
   (Türkçe sayı okunuşu değil, sabit bir tablo: bkz. kullanıcı talimatı). */
var TUTUKLAMA_BOOKING_SUFFIX = ["da", "de", "de", "te", "te", "te", "da", "de", "de", "da"];
function tutuklamaBookingTime(t) {
  var m = /^(\d{2}):(\d{2})$/.exec(t || '');
  if (!m) return '';
  var digits = m[1] + m[2];
  return digits + "'" + TUTUKLAMA_BOOKING_SUFFIX[Number(digits.charAt(digits.length - 1))];
}
function tutuklamaCap(s) {
  return String(s || '').trim().toLocaleLowerCase('en-US').replace(/(^|[\s\-'])(\S)/g, function (m, sep, ch) { return sep + ch.toLocaleUpperCase('en-US'); });
}
function tutuklamaLastName(full) {
  var parts = String(full || '').trim().split(/\s+/).filter(Boolean);
  return parts.length ? tutuklamaCap(parts[parts.length - 1]) : '';
}
/* "115, 116 (x2), 701" -> { text: "115. Kolluk Kuvvetlerinden Kaçmak (F), 116. Tutuklamaya
   Direnmek (M), 701. İzinsiz Ateşli Silah Bulundurmak (M)", count: 3 } — madde numarasını,
   başlığını ve türünü (F/M) window.PENAL_CODE'dan bulup yazar; (xN) tekrar sayısı yok sayılır
   (her madde tek kez listelenir). Bulunamayan bir id olduğu gibi bırakılır. */
function tutuklamaChargesText(rawList) {
  var code = window.PENAL_CODE || [];
  var ids = String(rawList || '').split(',').map(function (s) { return s.replace(/\s*\(x\d+\)\s*$/, '').trim(); }).filter(Boolean);
  var parts = ids.map(function (id) {
    var entry = code.filter(function (c) { return c.id === id; })[0];
    return entry ? (entry.id + '. ' + entry.charge + ' (' + entry.type + ')') : id;
  });
  return { text: parts.join(', '), count: parts.length };
}
/* 0-999 arası tam sayıyı Türkçe okunuşuna çevirir ("5" -> "beş", "19" -> "on dokuz"). Aralık
   dışı/sayı olmayan girdi için null döner (çağıran yer {Miktar} placeholder'ına düşürür). */
var TUTUKLAMA_SAYI_BIRLER = ['', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz'];
var TUTUKLAMA_SAYI_ONLAR = ['', 'on', 'yirmi', 'otuz', 'kırk', 'elli', 'altmış', 'yetmiş', 'seksen', 'doksan'];
function tutuklamaSayiOku(raw) {
  if (!/^\d+$/.test(String(raw || '').trim())) return null;
  var n = parseInt(raw, 10);
  if (n < 0 || n > 999) return null;
  if (n === 0) return 'sıfır';
  var yuz = Math.floor(n / 100), on = Math.floor((n % 100) / 10), bir = n % 10;
  var parts = [];
  if (yuz) parts.push(yuz === 1 ? 'yüz' : TUTUKLAMA_SAYI_BIRLER[yuz] + ' yüz');
  if (on) parts.push(TUTUKLAMA_SAYI_ONLAR[on]);
  if (bir) parts.push(TUTUKLAMA_SAYI_BIRLER[bir]);
  return parts.join(' ');
}
/* Materyal Türü -> belirtme hali (accusative) eki ve miktarın gram mı adet mi okunacağı
   ("kontrollü madde" gram, silahlar adet/"tane"). */
var TUTUKLAMA_MATERYAL_TIPLERI = {
  'Tabanca': { acc: 'tabancayı', gram: false },
  'Yarı Otomatik Tüfek': { acc: 'yarı otomatik tüfeği', gram: false },
  'Pompalı Tüfek': { acc: 'pompalı tüfeği', gram: false },
  'Tam Otomatik Tüfek': { acc: 'tam otomatik tüfeği', gram: false },
  'Kontrollü Madde': { acc: 'kontrollü maddeyi', gram: true }
};
/* "Şüpheliye ait beş gram PCP kontrollü maddeyi ve bir tane Vom Feuer 19 tabancayı, Property
   Room'a EV-20260616-173 kayıt numarası ile teslim ettim." — MATERYAL_1_*, MATERYAL_2_* ...
   grup alanlarını (kaç tanesi eklenmişse) okuyup tek cümlede birleştirir. */
function tutuklamaMaterialLine(v) {
  function p(val, label) { return val ? val : '{' + label + '}'; }
  var items = [];
  for (var i = 1; i <= 8; i++) {
    var tur = v['MATERYAL_' + i + '_TUR'];
    if (!tur) continue;
    var bilgi = TUTUKLAMA_MATERYAL_TIPLERI[tur];
    if (!bilgi) continue;
    var adi = String(v['MATERYAL_' + i + '_ADI'] || '').trim();
    var sayi = tutuklamaSayiOku(v['MATERYAL_' + i + '_MIKTAR']);
    var miktar = sayi ? (sayi + (bilgi.gram ? ' gram' : ' tane')) : '';
    items.push(p(miktar, 'Miktar') + ' ' + p(adi, 'Materyal Adı') + ' ' + bilgi.acc);
  }
  if (!items.length) return '';
  var joined = items.length > 1 ? items.slice(0, -1).join(', ') + ' ve ' + items[items.length - 1] : items[0];
  return 'Şüpheliye ait ' + joined + ', Property Room\'a ' + p(v.EVIDENCE_KAYIT_NO, 'Evidence Kayıt Numarası') + ' kayıt numarası ile teslim ettim.';
}
function tutuklamaBookingLine(v) {
  function p(val, label) { return val ? val : '{' + label + '}'; }
  var kanit = v.KANIT_TESLIM === 'Evet' ? '\n' + tutuklamaMaterialLine(v) : '';
  if (v.KAYIT_ISLEMLERI !== 'Evet') return 'Kayıt İşlemleri: ' + (v.KAYIT_ISLEMLERI || 'Hayır') + kanit;

  var saat = p(tutuklamaBookingTime(v.BOOKING_SAAT), 'Booking Saati');
  var supheli = p(tutuklamaCap(v.AD_SOYADI_2911L1G), 'Şüpheli Adı Soyadı');
  var chargesInfo = tutuklamaChargesText(v.CEZA_KANUNU_97NVWS && v.CEZA_KANUNU_97NVWS !== '—' ? v.CEZA_KANUNU_97NVWS : '');
  var kanunlar = p(chargesInfo.text, 'Kanunlar');
  var madde = chargesInfo.count > 1 ? 'maddelerine' : 'maddesine';
  var kendimYaptim = v.BOOKING_KENDIM_YAPTIM === 'Evet';
  var ikinciPersonel = String(v.PERSONEL_BILGISI_151KSJP1 || '').trim();
  var hasSecondOfficer = ikinciPersonel && ikinciPersonel !== '—';

  if (!kendimYaptim) {
    var rutbe = p(v.BOOKING_MEMUR_RUTBE, 'Rütbe');
    var soyad = p(tutuklamaLastName(v.BOOKING_MEMUR_ADSOYAD), 'Booking Yapan Memur Soyadı');
    var seriNo = p(v.BOOKING_MEMUR_SERI_NO, 'BookingYapanMemurSeriNo');
    return saat + ' ' + supheli + ' için kayıt işlemleri, Mission Row Community Police Station\'da ' + rutbe + ' ' + soyad + ' (Seri No. ' + seriNo + ') tarafından tamamlandı. ' +
      supheli + ' için San Andreas Ceza Kanunu\'nun ' + kanunlar + ' ' + madde + ' yönelik suçlama gerçekleştirdik ve sevk edilmesini sağlattık.' + kanit;
  }
  if (hasSecondOfficer) {
    return saat + ' ' + supheli + ' için kayıt işlemlerini, Mission Row Community Police Station\'da tamamladım. ' +
      supheli + ' için San Andreas Ceza Kanunu\'nun ' + kanunlar + ' ' + madde + ' yönelik suçlama gerçekleştirdik ve sevk edilmesini sağlattık.' + kanit;
  }
  return saat + ' ' + supheli + ' için kayıt işlemlerini, Mission Row Community Police Station\'da tamamladım. ' +
    supheli + ' için San Andreas Ceza Kanunu\'nun ' + kanunlar + ' ' + madde + ' yönelik suçlama gerçekleştirdim ve sevk edilmesini sağlattım.' + kanit;
}

/* "JOHN CLARK" -> Sworn Roster'da "CLARK, JOHN" satırını arar, bulursa seri no.'yu döndürür.
   Roster window.SWORN_ROSTER (lspd-tools/assets/sworn-roster.js) üzerinden gelir; sayfa onu
   yüklemediyse ya da eşleşme yoksa null döner (alan boş/elle girilmiş halinde kalır). */
function tutuklamaSeriLookup(fullName) {
  var roster = window.SWORN_ROSTER || [];
  var parts = String(fullName || '').trim().split(/\s+/).filter(Boolean);
  if (parts.length < 2) return null;
  var ad = parts.shift().toLocaleUpperCase('en-US');
  var soyad = parts.join(' ').toLocaleUpperCase('en-US');
  for (var i = 0; i < roster.length; i++) {
    var comma = roster[i].name.indexOf(',');
    if (comma < 0) continue;
    var rSoyad = roster[i].name.slice(0, comma).trim().toLocaleUpperCase('en-US');
    var rAd = roster[i].name.slice(comma + 1).trim().toLocaleUpperCase('en-US');
    if (rSoyad === soyad && rAd === ad) return roster[i].seri;
  }
  return null;
}

window.REPORT_FORM = {
  "emptyValue": "—",
  "title": "Tutuklama Raporu",
  "titleTemplate": "TR — {TARIH_RAPOR} - {AD_SOYADI_2911L1G}",
  "sendUrl": function (v) {
    function cap(s) {
      return s.toLocaleLowerCase('en-US').replace(/(^|[\s\-'])(\S)/g, function (m, sep, ch) { return sep + ch.toLocaleUpperCase('en-US'); });
    }
    var name = String(v.AD_SOYADI_2911L1G || '').trim().split(/\s+/);
    var ad = cap(name.shift() || '');
    var soyad = cap(name.join(' '));
    return 'https://mdc-tr.gta.world/record/' + encodeURIComponent(ad) + '_' + encodeURIComponent(soyad);
  },
  "autoText": {
    "target": "KAYIT_ANLATI_74HXQ2",
    "build": function (v) { return tutuklamaBookingLine(v); }
  },
  "sections": [
    {
      "title": "Personel Bilgisi – 1",
      "cols": 3,
      "fields": [
        {
          "key": "PERSONEL_BILGISI_151KSJP",
          "label": "Adı Soyadı",
          "type": "text",
          "placeholder": "JOHN DOE",
          "hint": "Büyük harflerle doldurun.",
          "upper": "en",
          "prefill": "name"
        },
        {
          "key": "SERI_NO_159LJQF",
          "label": "Seri No.",
          "type": "text",
          "placeholder": "00000",
          "prefill": "badge"
        },
        {
          "key": "DIVISION_12Z4CJ",
          "label": "Division",
          "type": "select",
          "placeholder": "Seçim Yapın",
          "prefill": "division",
          "values": [
            { "label": "MISN", "value": "MISN" },
            { "label": "MISN B", "value": "MISN B" },
            { "label": "CTD", "value": "CTD" },
            { "label": "METRO", "value": "METRO" },
            { "label": "ASD", "value": "ASD" },
            { "label": "VES", "value": "VES" }
          ]
        },
        {
          "key": "GREVLENDIRME_177LU8",
          "label": "Görevlendirme",
          "type": "select",
          "search": true,
          "prefill": "assignment",
          "values": [
            { "label": "Adam", "value": "A" },
            { "label": "Desk Officer", "value": "DESK" },
            { "label": "Detective Unit", "value": "W" },
            { "label": "Extra Patrol Unit", "value": "X" },
            { "label": "Field Supervisor", "value": "FS" },
            { "label": "Gang Enforcement Detail", "value": "GIT, GED" },
            { "label": "Mary", "value": "M" },
            { "label": "Metropolitan Division Unit", "value": "R" },
            { "label": "Other Units (Lincoln dahil)", "value": "O" },
            { "label": "Senior Lead Officer", "value": "SL" },
            { "label": "Tom", "value": "T" },
            { "label": "Tom Lincoln", "value": "TL" }
          ],
          "default": "A"
        },
        {
          "key": "TARIH_RAPOR",
          "label": "Tarih",
          "type": "date",
          "today": true
        }
      ]
    },
    {
      "title": "Personel Bilgisi – 2",
      "cols": 4,
      "fields": [
        {
          "key": "PERSONEL_BILGISI_151KSJP1",
          "label": "Adı Soyadı",
          "type": "text",
          "placeholder": "JOHN DOE",
          "default": "—",
          "hint": "Büyük harflerle doldurun.",
          "upper": "en",
          "lookupTarget": "SERI_NO_159LJQF1",
          "lookup": tutuklamaSeriLookup
        },
        {
          "key": "SERI_NO_159LJQF1",
          "label": "Seri No.",
          "type": "text",
          "placeholder": "00000",
          "hint": "Adı Soyadı Sworn Roster'da bulunursa otomatik doldurulur."
        },
        {
          "key": "DIVISION_21NN6U",
          "label": "Division",
          "type": "select",
          "placeholder": "Seçim Yapın",
          "values": [
            { "label": "MISN", "value": "MISN" },
            { "label": "MISN B", "value": "MISN B" },
            { "label": "CTD", "value": "CTD" },
            { "label": "METRO", "value": "METRO" },
            { "label": "ASD", "value": "ASD" },
            { "label": "VES", "value": "VES" }
          ]
        },
        {
          "key": "GREVLENDIRME_36Y25T",
          "label": "Görevlendirme",
          "type": "select",
          "search": true,
          "values": [
            { "label": "Adam", "value": "A" },
            { "label": "Desk Officer", "value": "DESK" },
            { "label": "Detective Unit", "value": "W" },
            { "label": "Extra Patrol Unit", "value": "X" },
            { "label": "Field Supervisor", "value": "FS" },
            { "label": "Gang Enforcement Detail", "value": "GIT, GED" },
            { "label": "Mary", "value": "M" },
            { "label": "Metropolitan Division Unit", "value": "R" },
            { "label": "Other Units (Lincoln dahil)", "value": "O" },
            { "label": "Senior Lead Officer", "value": "SL" },
            { "label": "Tom", "value": "T" },
            { "label": "Tom Lincoln", "value": "TL" }
          ]
        }
      ]
    },
    {
      "title": "Şüpheli Bilgisi",
      "cols": 4,
      "fields": [
        {
          "key": "AD_SOYADI_2911L1G",
          "label": "Adı Soyadı",
          "type": "text",
          "placeholder": "JOHN DOE",
          "hint": "Büyük harflerle doldurun.",
          "upper": "en"
        },
        {
          "key": "CNSYET_306FE08",
          "label": "Cinsiyeti",
          "type": "select",
          "placeholder": "Seçim Yapın",
          "values": [
            { "label": "Erkek", "value": "E" },
            { "label": "Kadın", "value": "K" }
          ]
        },
        {
          "key": "YA_13T170",
          "label": "Yaş",
          "type": "text",
          "placeholder": "—",
          "default": "—"
        },
        {
          "key": "KKEN_394JO84",
          "label": "Köken",
          "type": "select",
          "placeholder": "Seçim Yapın",
          "values": [
            { "label": "Siyahi", "value": "SIYAHI" },
            { "label": "Hispanik veya Latin", "value": "HISPANIK" },
            { "label": "Asyalı", "value": "ASYALI" },
            { "label": "Beyaz", "value": "BEYAZ" },
            { "label": "Filipinli", "value": "FILIPINLI" },
            { "label": "Orta Doğulu", "value": "ORTA DOGULU" }
          ]
        }
      ]
    },
    {
      "title": "Tutuklama Bilgisi",
      "cols": 3,
      "fields": [
        {
          "key": "KONUM_53B0BK",
          "label": "Konum",
          "type": "text",
          "placeholder": "1234 Sinner Street, Mission Row",
          "default": "—",
          "hint": "Büyük harflerle doldurun.",
          "upper": "en"
        },
        {
          "key": "TARH_108BV3Y",
          "label": "Tarih",
          "type": "date",
          "today": true
        },
        {
          "key": "SAAT_104SXC0",
          "label": "Saat",
          "type": "time"
        },
        {
          "key": "SUCLAMA",
          "label": "Kanunlar",
          "type": "charges",
          "span": "all",
          "target": "CEZA_KANUNU_97NVWS",
          "addLabel": "Suçlama Ekle",
          "countDuplicates": true,
          "sortNumeric": true,
          "types": ["M", "F"]
        },
        {
          "key": "CEZA_KANUNU_97NVWS",
          "label": "Ceza Kanunu",
          "type": "text",
          "placeholder": "401, 410",
          "locked": true,
          "lockedTitle": "Seçilen kanunlara göre otomatik doldurulur."
        }
      ]
    },
    {
      "title": "Detaylar",
      "cols": 1,
      "fields": [
        {
          "key": "AIKLAMA_5CY4S",
          "label": "Açıklama",
          "type": "textarea",
          "rows": 10,
          "span": "all",
          "hideLabel": true,
          "hint": "Tutuklamaya götüren olayları, kullanılan gücü ve şüphelinin müdahaleye uyumunu kronolojik olarak anlatın. Kayıt İşlemleri ve El Koyulan Materyal kutularındaki durum buraya canlı olarak otomatik eklenir."
        }
      ]
    },
    {
      "title": "Kayıt İşlemleri",
      "cols": 2,
      "fields": [
        {
          "key": "KAYIT_ISLEMLERI",
          "label": "Kayıt İşlemleri",
          "type": "toggle"
        },
        {
          "key": "BOOKING_SAAT",
          "label": "Booking Saati",
          "type": "time",
          "showWhen": { "key": "KAYIT_ISLEMLERI", "equals": "Evet" }
        },
        {
          "key": "BOOKING_KENDIM_YAPTIM",
          "label": "Kendim Yaptım",
          "type": "toggle",
          "showWhen": { "key": "KAYIT_ISLEMLERI", "equals": "Evet" }
        },
        {
          "key": "BOOKING_MEMUR_ADSOYAD",
          "label": "Booking Yapan Memur Adı Soyadı",
          "type": "text",
          "placeholder": "JOHN DOE",
          "upper": "en",
          "lookupTarget": "BOOKING_MEMUR_SERI_NO",
          "lookup": tutuklamaSeriLookup,
          "showWhen": [
            { "key": "KAYIT_ISLEMLERI", "equals": "Evet" },
            { "key": "BOOKING_KENDIM_YAPTIM", "equals": "Hayır" }
          ]
        },
        {
          "key": "BOOKING_MEMUR_SERI_NO",
          "label": "Booking Yapan Memur Seri No.",
          "type": "text",
          "placeholder": "00000",
          "hint": "Adı Soyadı Sworn Roster'da bulunursa otomatik doldurulur.",
          "showWhen": [
            { "key": "KAYIT_ISLEMLERI", "equals": "Evet" },
            { "key": "BOOKING_KENDIM_YAPTIM", "equals": "Hayır" }
          ]
        },
        {
          "key": "BOOKING_MEMUR_RUTBE",
          "label": "Booking Yapan Memur Rütbe",
          "type": "select",
          "placeholder": "Seçim Yapın",
          "values": [
            { "label": "Officer", "value": "Officer" },
            { "label": "Detective", "value": "Detective" },
            { "label": "Sergeant", "value": "Sergeant" },
            { "label": "Lieutenant", "value": "Lieutenant" },
            { "label": "Captain", "value": "Captain" }
          ],
          "showWhen": [
            { "key": "KAYIT_ISLEMLERI", "equals": "Evet" },
            { "key": "BOOKING_KENDIM_YAPTIM", "equals": "Hayır" }
          ]
        },
        {
          "key": "KAYIT_ANLATI_74HXQ2",
          "label": "Kayıt & Kanıt Anlatısı (Rapora Eklenecek)",
          "type": "textarea",
          "rows": 4,
          "span": "all",
          "hint": "Yukarıdaki alanlara göre canlı güncellenir. Buraya elle yazarsanız (veya değiştirirseniz) o andan itibaren otomatik güncellenmeyi bırakır — kutuyu boşaltırsanız yeniden otomatik güncellenmeye döner."
        }
      ]
    },
    {
      "group": true,
      "layout": "inline",
      "key": "MATERYAL",
      "label": "El Koyulan Materyal",
      "title": "El Koyulan Materyal",
      "min": 1,
      "max": 5,
      "addLabel": "Materyal Ekle",
      "cols": 3,
      "showWhen": { "key": "KANIT_TESLIM", "equals": "Evet" },
      "target": "MATERYAL_DUMMY_TARGET",
      "joinWith": "",
      "blockTemplate": "",
      "sharedFields": [
        {
          "key": "KANIT_TESLIM",
          "label": "Kanıt Teslim Etme",
          "type": "toggle",
          "span": "all"
        },
        {
          "key": "EVIDENCE_KAYIT_NO",
          "label": "Evidence Kayıt Numarası",
          "type": "text",
          "placeholder": "EV-20260616-173",
          "showWhen": { "key": "KANIT_TESLIM", "equals": "Evet" }
        }
      ],
      "fields": [
        {
          "suffix": "TUR",
          "label": "{{N}}) Materyal Türü",
          "type": "select",
          "placeholder": "Seçim Yapın",
          "values": [
            { "label": "Tabanca", "value": "Tabanca" },
            { "label": "Yarı Otomatik Tüfek", "value": "Yarı Otomatik Tüfek" },
            { "label": "Pompalı Tüfek", "value": "Pompalı Tüfek" },
            { "label": "Tam Otomatik Tüfek", "value": "Tam Otomatik Tüfek" },
            { "label": "Kontrollü Madde", "value": "Kontrollü Madde" }
          ]
        },
        {
          "suffix": "ADI",
          "label": "{{N}}) Materyal Adı",
          "type": "text",
          "placeholder": "Vom Feuer 19 / PCP"
        },
        {
          "suffix": "MIKTAR",
          "label": "{{N}}) Miktar",
          "type": "text",
          "placeholder": "1",
          "hint": "Kontrollü madde için gram, diğerlerinde adet girin."
        }
      ]
    },
    {
      "group": true,
      "layout": "inline",
      "key": "KANIT",
      "label": "Kanıt",
      "title": "Kanıtlar",
      "min": 4,
      "max": 7,
      "addLabel": "Kanıt Ekle",
      "target": "KANIT_LISTESI",
      "joinWith": "\n",
      "cols": 3,
      "fields": [
        {
          "suffix": "TUR",
          "label": "{{N}}) Kanıt Türü",
          "type": "select",
          "search": true,
          "placeholder": "Seçim Yapın",
          "fillTarget": "BASLIK",
          "values": [
            { "label": "Olay Raporu", "value": "OR — 00/00/2025 — 00000" },
            { "label": "İfade Raporu", "value": "IR — 00/00/2025 — 00000" },
            { "label": "Evidence Locker Kaydı", "value": "EV-20260000-000" },
            { "label": "CCTV Görüntüsü", "value": "CCTV ID #000 — Konum — GG/AA/YYYY" },
            { "label": "DICVS Görüntüsü", "value": "DICVS Seri No. 00000 - GG/AA/YYYY" },
            { "label": "BWV Görüntüsü", "value": "BWV A. Soyadı #00000 - GG/AA/YYYY" },
            { "label": "Trafik Kazası Fotoğrafları", "value": "Trafik Kazası Fotoğrafları (Plaka)" },
            { "label": "Araç El Koyma Raporu", "value": "Impound Report - Araç Modeli - Plaka" },
            { "label": "Tutuklama Raporu", "value": "Tutuklama Raporu (Şüpheli Adı)" },
            { "label": "FSD Balistik İnceleme Raporu", "value": "FSD Silah Adı - Balistik İncelemesi" },
            { "label": "FSD Parmak İzi İnceleme Raporu", "value": "FSD Eşya Adı - Parmak İzi İncelemesi" },
            { "label": "FSD DNA İnceleme Raporu", "value": "FSD DNA İnceleme Raporu" },
            { "label": "FSD Kovan İnceleme Raporu", "value": "FSD Kovan İnceleme Raporu" },
            { "label": "APB", "value": "APB - Şüpheli Adı (APB Numarası)" },
            { "label": "Coroner Raporu", "value": "Coroner Raporu (Mağdur Adı)" }
          ]
        },
        {
          "suffix": "BASLIK",
          "label": "{{N}}) Kanıt Başlığı",
          "type": "text",
          "placeholder": "—"
        },
        {
          "suffix": "ICERIK",
          "label": "{{N}}) Kanıt İçeriği",
          "type": "text",
          "placeholder": "—",
          "tooltip": "URL'yi buraya yapıştırın."
        }
      ],
      "blockTemplate": "<li><a href=\"{KANIT_{{N}}_ICERIK}\" target=\"_blank\">{KANIT_{{N}}_BASLIK}</a></li>"
    },
    {
      "title": "Inmate Check",
      "fields": [
        {
          "key": "INMATE_CHECK",
          "label": "Inmate Check",
          "type": "toggle"
        },
        {
          "key": "SAVUNMA_SECENEGI",
          "label": "Savunma",
          "type": "select",
          "placeholder": "Seçim Yapın",
          "showWhen": { "key": "INMATE_CHECK", "equals": "Evet" },
          "values": [
            { "label": "Suçsuz", "value": "Suçsuz" },
            { "label": "Suçlu", "value": "Suçlu" },
            { "label": "Zorunlu Mahkeme", "value": "Zorunlu Mahkeme" },
            { "label": "Savunma Yok", "value": "Savunma Yok" }
          ]
        },
        {
          "key": "DISCORD_ADRESI",
          "label": "Oyuncunun Discord Adresi",
          "type": "text",
          "placeholder": "kullaniciadi",
          "showWhen": { "key": "INMATE_CHECK", "equals": "Evet" }
        }
      ]
    }
  ],
  "secondaryOutput": {
    "showField": "INMATE_CHECK",
    "showValue": "Evet",
    "build": function (v, link) {
      function cap(s) {
        return String(s || '').trim().toLocaleLowerCase('en-US').replace(/(^|[\s\-'])(\S)/g, function (m, sep, ch) { return sep + ch.toLocaleUpperCase('en-US'); });
      }
      return '# ' + v.TARH_108BV3Y + ' - ' + v.SAAT_104SXC0 +
        '\n\n**Şüpheli:** ' + cap(v.AD_SOYADI_2911L1G) +
        '\n**Suçlama:** ' + v.CEZA_KANUNU_97NVWS +
        '\n**Savunma:** ' + v.SAVUNMA_SECENEGI +
        '\n**Departman:** LSPD' +
        '\n**Oyuncunun Discord Adresi:** ' + v.DISCORD_ADRESI +
        '\n**Arrest Report Linki:** ' + link;
    }
  },
  "template": "<head>\n    <style>\n     table {\n    border-collapse: collapse;\n    width: 100%;\n    table-layout: fixed; /* Ensures consistent layout */\n}\n\ntd {\n    padding: 5px;\n    white-space: normal; /* Allows wrapping to avoid overflow */\n    word-wrap: break-word; /* Forces long words to break */\n    text-align: left;\n}\n\ntd div {\n    padding-left: 5px;\n}\n\n/* Specific column width control */\ntd[style*=\"width:2%\"] { min-width: 15%; max-width: 20%; }\ntd[style*=\"width:1%\"] { min-width: 10%; max-width: 15%; }\ntd[style*=\"width:3%\"] { min-width: 20%; max-width: 25%; }\ntd[style*=\"width:4%\"] { min-width: 25%; max-width: 30%; }\n\n    </style>\n</head>\n\n\n<div class=\"content\"><div style=\"background-color:white;border:1px solid black;width: 800px; margin: auto;padding:25px\">\n<span style=\"color:#000000\">\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #ffffff;background:#ffffff;vertical-align:top;text-align:left;width:15%;padding:10px\">\n<div style=\"text-align:left\"><span style=\"color:#000000\">LOS SANTOS POLICE DEPARTMENT<br>\nCITY OF LOS SANTOS<br>\n<strong><span style=\"font-size:130%;line-height:116%\">TUTUKLAMA RAPORU</span></strong><br>\nFORM 05.02.00</span></div>\n</td></tr></tbody></table>\n\n<br>\n<br>\n<br>\n<br>\n\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #ffffff;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><strong>ŞÜPHELİ BİLGİSİ</strong></span></div>\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">ADI SOYADI<br>\n{AD_SOYADI_2911L1G}</span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">CİNSİYETİ<br>\n{CNSYET_306FE08}</span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">YAŞ<br>\n{YA_13T170}</span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">KÖKEN<br>\n{KKEN_394JO84}</span></div></td></tr></tbody></table></td></tr></tbody></table>\n\n\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #ffffff;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><strong>TUTUKLAMA BİLGİSİ</strong></span></div>\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">KONUM<br>\n{KONUM_53B0BK}</span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">CEZA KANUNU<br>\n{CEZA_KANUNU_97NVWS}</span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">TARİH<br>\n{TARH_108BV3Y}</span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">SAAT<br>\n{SAAT_104SXC0}</span></div></td>\n</tr></tbody></table></td></tr></tbody></table>\n\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #ffffff;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><strong>PERSONEL BİLGİSİ</strong></span></div>\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:3%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">ADI SOYADI<br>\n{PERSONEL_BILGISI_151KSJP}</span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">SERİ NO.<br>\n{SERI_NO_159LJQF}</span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">DIVISION<br>\n{DIVISION_12Z4CJ}</span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">GÖREVLENDİRME<br>\n{GREVLENDIRME_177LU8}</span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">TARİH<br>\n{TARIH_RAPOR}</span></div></td></tr></tbody></table>\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:3%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">ADI SOYADI<br>\n{PERSONEL_BILGISI_151KSJP1}</span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">SERİ NO.<br>\n{SERI_NO_159LJQF1}</span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">DIVISION<br>\n{DIVISION_21NN6U}</span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">GÖREVLENDİRME<br>\n{GREVLENDIRME_36Y25T}</span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">TARİH<br>\n{TARIH_RAPOR}</span></div></td></tr></tbody></table></td></tr></tbody></table>\n\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #ffffff;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><strong><span style=\"color:#000000\">AÇIKLAMA</span></strong></span></div>\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:4%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">TANIM<br>\n{AIKLAMA_5CY4S}<br>\n<br>\n{KAYIT_ANLATI_74HXQ2}<br>\n<br>\n<br>\n</span></span></div></td></tr></tbody></table>\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:4%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">KANITLAR</span></span>\n<ul>\n{KANIT_LISTESI}\n</ul>\n</div></td>\n</tr></tbody></table>\n</td></tr></tbody></table>\n</span></div></div>\n"
};
