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
function tutuklamaBookingLine(v) {
  function p(val, label) { return val ? val : '{' + label + '}'; }
  if (v.KAYIT_ISLEMLERI !== 'Evet') return 'Kayıt İşlemleri: ' + (v.KAYIT_ISLEMLERI || 'Hayır');

  var saat = p(tutuklamaBookingTime(v.BOOKING_SAAT), 'Booking Saati');
  var supheli = p(tutuklamaCap(v.AD_SOYADI_2911L1G), 'Şüpheli Adı Soyadı');
  var kanunlar = p(v.CEZA_KANUNU_97NVWS && v.CEZA_KANUNU_97NVWS !== '—' ? v.CEZA_KANUNU_97NVWS : '', 'Kanunlar');
  var kendimYaptim = v.BOOKING_KENDIM_YAPTIM === 'Evet';
  var ikinciPersonel = String(v.PERSONEL_BILGISI_151KSJP1 || '').trim();
  var hasSecondOfficer = ikinciPersonel && ikinciPersonel !== '—';

  if (!kendimYaptim) {
    var rutbe = p(v.BOOKING_MEMUR_RUTBE, 'Rütbe');
    var soyad = p(tutuklamaLastName(v.BOOKING_MEMUR_ADSOYAD), 'Booking Yapan Memur Soyadı');
    return saat + ' ' + supheli + ' için kayıt işlemleri, Mission Row Community Police Station\'da ' + rutbe + ' ' + soyad + ' tarafından tamamlandı. ' +
      supheli + ' için San Andreas Ceza Kanunu\'nun ' + kanunlar + ' maddelerine yönelik suçlama gerçekleştirdik ve sevk edilmesini sağlattık.';
  }
  if (hasSecondOfficer) {
    return saat + ' ' + supheli + ' için kayıt işlemlerini, Mission Row Community Police Station\'da tamamladım. ' +
      supheli + ' için San Andreas Ceza Kanunu\'nun ' + kanunlar + ' maddelerine yönelik suçlama gerçekleştirdik ve sevk edilmesini sağlattık.';
  }
  return saat + ' ' + supheli + ' için kayıt işlemlerini, Mission Row Community Police Station\'da tamamladım. ' +
    supheli + ' için San Andreas Ceza Kanunu\'nun ' + kanunlar + ' maddelerine yönelik suçlama gerçekleştirdim ve sevk edilmesini sağlattım.';
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
    "target": "ISLEMLER_ONIZLEME",
    "build": function (v) {
      return tutuklamaBookingLine(v) + '\nKanıt Teslim Etme: ' + (v.KANIT_TESLIM || 'Hayır');
    }
  },
  "beforeFill": function (v) {
    v.KAYIT_ISLEMLERI_METIN = tutuklamaBookingLine(v);
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
          "hint": "Tutuklamaya götüren olayları, kullanılan gücü ve şüphelinin müdahaleye uyumunu kronolojik olarak anlatın."
        }
      ]
    },
    {
      "title": "Kayıt & Kanıt İşlemleri",
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
          "key": "KANIT_TESLIM",
          "label": "Kanıt Teslim Etme",
          "type": "toggle"
        },
        {
          "key": "ISLEMLER_ONIZLEME",
          "label": "Önizleme",
          "type": "textarea",
          "rows": 4,
          "span": "all",
          "locked": true,
          "hint": "Bu metin rapor çıktısının en altına otomatik eklenir."
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
  "template": "<head>\n    <style>\n     table {\n    border-collapse: collapse;\n    width: 100%;\n    table-layout: fixed; /* Ensures consistent layout */\n}\n\ntd {\n    padding: 5px;\n    white-space: normal; /* Allows wrapping to avoid overflow */\n    word-wrap: break-word; /* Forces long words to break */\n    text-align: left;\n}\n\ntd div {\n    padding-left: 5px;\n}\n\n/* Specific column width control */\ntd[style*=\"width:2%\"] { min-width: 15%; max-width: 20%; }\ntd[style*=\"width:1%\"] { min-width: 10%; max-width: 15%; }\ntd[style*=\"width:3%\"] { min-width: 20%; max-width: 25%; }\ntd[style*=\"width:4%\"] { min-width: 25%; max-width: 30%; }\n\n    </style>\n</head>\n\n\n<div class=\"content\"><div style=\"background-color:white;border:1px solid black;width: 800px; margin: auto;padding:25px\">\n<span style=\"color:#000000\">\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #ffffff;background:#ffffff;vertical-align:top;text-align:left;width:15%;padding:10px\">\n<div style=\"text-align:left\"><span style=\"color:#000000\">LOS SANTOS POLICE DEPARTMENT<br>\nCITY OF LOS SANTOS<br>\n<strong><span style=\"font-size:130%;line-height:116%\">TUTUKLAMA RAPORU</span></strong><br>\nFORM 05.02.00</span></div>\n</td></tr></tbody></table>\n\n<br>\n<br>\n<br>\n<br>\n\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #ffffff;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><strong>ŞÜPHELİ BİLGİSİ</strong></span></div>\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">ADI SOYADI<br>\n{AD_SOYADI_2911L1G}</span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">CİNSİYETİ<br>\n{CNSYET_306FE08}</span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">YAŞ<br>\n{YA_13T170}</span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">KÖKEN<br>\n{KKEN_394JO84}</span></div></td></tr></tbody></table></td></tr></tbody></table>\n\n\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #ffffff;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><strong>TUTUKLAMA BİLGİSİ</strong></span></div>\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">KONUM<br>\n{KONUM_53B0BK}</span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">CEZA KANUNU<br>\n{CEZA_KANUNU_97NVWS}</span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">TARİH<br>\n{TARH_108BV3Y}</span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">SAAT<br>\n{SAAT_104SXC0}</span></div></td>\n</tr></tbody></table></td></tr></tbody></table>\n\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #ffffff;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><strong>PERSONEL BİLGİSİ</strong></span></div>\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:3%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">ADI SOYADI<br>\n{PERSONEL_BILGISI_151KSJP}</span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">SERİ NO.<br>\n{SERI_NO_159LJQF}</span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">DIVISION<br>\n{DIVISION_12Z4CJ}</span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">GÖREVLENDİRME<br>\n{GREVLENDIRME_177LU8}</span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">TARİH<br>\n{TARIH_RAPOR}</span></div></td></tr></tbody></table>\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:3%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">ADI SOYADI<br>\n{PERSONEL_BILGISI_151KSJP1}</span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">SERİ NO.<br>\n{SERI_NO_159LJQF1}</span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">DIVISION<br>\n{DIVISION_21NN6U}</span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">GÖREVLENDİRME<br>\n{GREVLENDIRME_36Y25T}</span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\">TARİH<br>\n{TARIH_RAPOR}</span></div></td></tr></tbody></table></td></tr></tbody></table>\n\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #ffffff;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><strong><span style=\"color:#000000\">AÇIKLAMA</span></strong></span></div>\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:4%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">TANIM<br>\n{AIKLAMA_5CY4S}<br>\n<br>\n<br>\n</span></span></div></td></tr></tbody></table>\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:4%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">KANITLAR</span></span>\n<ul>\n{KANIT_LISTESI}\n</ul>\n</div></td>\n</tr></tbody></table>\n</td></tr></tbody></table>\n\n<p>{KAYIT_ISLEMLERI_METIN}</p>\n<p>Kanıt Teslim Etme: {KANIT_TESLIM}</p>\n</span></div></div>\n"
};
