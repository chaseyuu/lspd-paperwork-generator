/* İhlal Raporu Formu: alanlar ve çıktı şablonu. */
window.REPORT_FORM = {
  "emptyValue": "—",
  "title": "İhlal Raporu Formu",
  "required": true,
  "sections": [
    {
      "title": "İhlal Türü",
      "cols": 3,
      "fields": [
        {
          "key": "TRAFIK_97AM0",
          "label": "Trafik",
          "type": "select",
          "values": [
            {
              "label": "Evet",
              "value": "☒"
            },
            {
              "label": "Hayır",
              "value": "☐"
            }
          ],
          "default": "☐"
        },
        {
          "key": "TRAFIK_DII_5W23J",
          "label": "Trafik Dışı",
          "type": "select",
          "values": [
            {
              "label": "Evet",
              "value": "☒"
            },
            {
              "label": "Hayır",
              "value": "☐"
            }
          ],
          "default": "☐"
        },
        {
          "key": "MISDEMEANOR_13TFTD",
          "label": "Misdemeanor",
          "type": "select",
          "values": [
            {
              "label": "Evet",
              "value": "☒"
            },
            {
              "label": "Hayır",
              "value": "☐"
            }
          ],
          "default": "☐",
          "locked": true,
          "lockedTitle": "Seçilen kanunlara göre otomatik belirlenir."
        }
      ]
    },
    {
      "title": "Genel Bilgiler",
      "cols": 3,
      "fields": [
        {
          "key": "PERSONEL_BILGISI_83SVB0",
          "label": "Personel Bilgisi",
          "type": "text",
          "placeholder": "JOHN DOE",
          "hint": "Büyük harflerle yazın.",
          "upper": "en",
          "prefill": "name"
        },
        {
          "key": "SERI_NO_118VO9P",
          "label": "Seri No.",
          "type": "text",
          "placeholder": "00000",
          "tooltip": "Beş haneli seri numarasını yazın.",
          "prefill": "badge"
        },
        {
          "key": "DIVISION_12QT6K",
          "label": "Division",
          "type": "select",
          "values": [
            {
              "label": "MISN",
              "value": "MISN"
            },
            {
              "label": "CTD",
              "value": "CTD"
            },
            {
              "label": "METRO",
              "value": "METRO"
            },
            {
              "label": "VES",
              "value": "VES"
            }
          ],
          "placeholder": "Seçim Yapın",
          "prefill": "division"
        },
        {
          "key": "GREVLENDIRME_191M7HR",
          "label": "Görevlendirme",
          "type": "select",
          "search": true,
          "values": [
            {
              "label": "Adam",
              "value": "A"
            },
            {
              "label": "Desk Officer",
              "value": "DESK"
            },
            {
              "label": "Detective Unit",
              "value": "W"
            },
            {
              "label": "Extra Patrol Unit",
              "value": "X"
            },
            {
              "label": "Field Supervisor",
              "value": "FS"
            },
            {
              "label": "Gang Enforcement Detail",
              "value": "GIT, GED"
            },
            {
              "label": "Mary",
              "value": "M"
            },
            {
              "label": "Metropolitan Division Unit",
              "value": "R"
            },
            {
              "label": "Other Units (Lincoln dahil)",
              "value": "O"
            },
            {
              "label": "Senior Lead Officer",
              "value": "SL"
            },
            {
              "label": "Tom",
              "value": "T"
            },
            {
              "label": "Tom Lincoln",
              "value": "TL"
            }
          ],
          "default": "A"
        },
        {
          "key": "TARIH_8IB6X",
          "label": "Tarih",
          "type": "date",
          "tooltip": "Tarih bilgisini girin.",
          "today": true
        }
      ]
    },
    {
      "title": "Araç Bilgileri",
      "cols": 3,
      "fields": [
        {
          "key": "MARKA_242IXFH",
          "label": "MARKA",
          "type": "text",
          "placeholder": "VAPID",
          "hint": "Büyük harflerle yazın.",
          "upper": "en"
        },
        {
          "key": "MODEL_2555NYG",
          "label": "MODEL",
          "type": "text",
          "placeholder": "SCOUT",
          "hint": "Büyük harflerle yazın.",
          "upper": "en"
        },
        {
          "key": "PLAKA_2667IPU",
          "label": "PLAKA",
          "type": "text",
          "placeholder": "JBC123",
          "hint": "Büyük harflerle yazın.",
          "upper": "en"
        }
      ]
    },
    {
      "title": "Şüpheli Bilgisi",
      "cols": 3,
      "fields": [
        {
          "key": "AD_SOYADI_2911L1G",
          "label": "AD SOYADI",
          "type": "text",
          "placeholder": "JOHN DOE",
          "hint": "Büyük harflerle yazın.",
          "upper": "en"
        },
        {
          "key": "CNSYET_306FE08",
          "label": "CİNSİYETİ",
          "type": "select",
          "placeholder": "Seçim Yapın",
          "values": [
            {
              "label": "Erkek",
              "value": "E"
            },
            {
              "label": "Kadın",
              "value": "K"
            }
          ]
        },
        {
          "key": "KKEN_394JO84",
          "label": "KÖKEN",
          "type": "select",
          "placeholder": "Seçim Yapın",
          "values": [
            {
              "label": "Siyahi",
              "value": "SIYAHI"
            },
            {
              "label": "Hispanik veya Latin",
              "value": "HISPANIK"
            },
            {
              "label": "Asyalı",
              "value": "ASYALI"
            },
            {
              "label": "Beyaz",
              "value": "BEYAZ"
            },
            {
              "label": "Filipinli",
              "value": "FILIPINLI"
            },
            {
              "label": "Orta Doğulu",
              "value": "ORTA DOGULU"
            }
          ]
        }
      ]
    },
    {
      "title": "İhlal Bilgisi",
      "cols": 2,
      "fields": [
        {
          "key": "SUCLAMA",
          "label": "Kanunlar",
          "type": "charges",
          "span": "all",
          "types": ["I", "M"],
          "target": "CEZA_KANUNU_493TFFU",
          "typeTargets": {
            "MISDEMEANOR": "MISDEMEANOR_13TFTD"
          },
          "typeOn": "☒",
          "typeOff": "☐",
          "filter": function (c) {
            // Misdemeanor articles are limited to the 400–699 range plus a short allow-list of
            // commonly cited out-of-range articles; Infraction articles are not restricted here.
            if (c.type !== 'M') return true;
            var n = parseInt(c.id, 10);
            if (n >= 400 && n <= 699) return true;
            var allowed = ['110', '117', '118', '119a', '119b', '125', '137', '138'];
            return allowed.indexOf(c.id) >= 0;
          },
          "classify": function (opt) {
            // Misdemeanor kutucuğu seçilen kanunlara göre otomatik işaretlenir. Trafik ve
            // Trafik Dışı kutucukları artık elle seçilir; buradan işaretlenmezler.
            return opt.type === 'M' ? 'MISDEMEANOR' : null;
          }
        },
        {
          "key": "HLAL_KONUMU_4493B3H",
          "label": "İhlal Konumu",
          "type": "text",
          "placeholder": "SINNER STREET, MISSION ROW",
          "hint": "Büyük harflerle yazın.",
          "upper": "en"
        },
        {
          "key": "CEZA_KANUNU_493TFFU",
          "label": "Ceza Kanunu",
          "type": "text",
          "placeholder": "401, 410",
          "locked": true,
          "lockedTitle": "Seçilen kanunlara göre otomatik doldurulur."
        },
        {
          "key": "HLAL_TARIH_538EMNO",
          "label": "İhlal Tarih",
          "type": "date",
          "tooltip": "Tarih bilgisini girin."
        },
        {
          "key": "HLAL_SAATI_13562E",
          "label": "İhlal Saati",
          "type": "time",
          "tooltip": "Saat bilgisini girin."
        },
        {
          "key": "AIKLAMA_534E88E",
          "label": "Açıklama",
          "type": "textarea",
          "rows": 6,
          "span": "all",
          "placeholder": "22:37 civarında Nikola Avenue, Mirror Park üzerinde sürüş gerçekleştirdiği sırada şerit atlayarak kontrolsüz bir şekilde kavşağa çıktı."
        }
      ]
    }
  ],
  "template": "<div style=\"background-color:white;border:1px solid black;width: 800px; margin: auto;padding:25px\">\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #ffffff;background:#ffffff;vertical-align:top;text-align:left;width:15%;padding:10px\">\n<div style=\"text-align:left\"><span style=\"color:#000000\">LOS SANTOS POLICE DEPARTMENT<br>\nCITY OF LOS SANTOS<br>\n<strong><span style=\"font-size:130%;line-height:116%\">İHLAL RAPORU</span></strong><br>\nFORM 05.07.19</span></div>\n</td></tr></tbody></table>\n\n\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #ffffff;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"></td>\n<td style=\"border:1px solid #ffffff;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">İHLAL TÜRÜ</span></span><br>\n<span style=\"font-size:120%;line-height:116%\"><span style=\"color:#000000\">{TRAFIK_97AM0}</span></span> <span style=\"font-size:95%;line-height:116%\"><span style=\"color:#000000\">Trafik</span></span><span style=\"color:#FFFFFF\">___</span><span style=\"font-size:120%;line-height:116%\"><span style=\"color:#000000\">{TRAFIK_DII_5W23J}</span></span> <span style=\"font-size:95%;line-height:116%\"><span style=\"color:#000000\">Trafik Dışı</span></span><span style=\"color:#FFFFFF\">___</span><span style=\"font-size:120%;line-height:116%\"><span style=\"color:#000000\">{MISDEMEANOR_13TFTD}</span></span> <span style=\"font-size:95%;line-height:116%\"><span style=\"color:#000000\">Misdemeanor</span></span></div></td></tr>\n</tbody></table>\n\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:3%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">PERSONEL BİLGİSİ<br>\n{PERSONEL_BILGISI_83SVB0}</span></span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">SERİ NO.<br>\n{SERI_NO_118VO9P}</span></span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">DIVISION<br>\n{DIVISION_12QT6K}</span></span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">GÖREVLENDİRME<br>\n{GREVLENDIRME_191M7HR}</span></span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">TARİH<br>\n{TARIH_8IB6X}</span></span></div></td></tr></tbody></table>\n\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #ffffff;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><strong><span style=\"color:#000000\">ARAÇ BİLGİSİ</span></strong></span></div>\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">MARKA<br>\n{MARKA_242IXFH}</span></span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">MODEL<br>\n{MODEL_2555NYG}</span></span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">PLAKA<br>\n{PLAKA_2667IPU}</span></span></div></td></tr></tbody></table></td></tr></tbody></table>\n\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #ffffff;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><strong><span style=\"color:#000000\">ŞÜPHELİ BİLGİSİ</span></strong></span></div>\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">ADI SOYADI<br>\n{AD_SOYADI_2911L1G}</span></span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">CİNSİYETİ<br>\n{CNSYET_306FE08}</span></span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">KÖKEN<br>\n{KKEN_394JO84}</span></span></div></td></tr></tbody></table></td></tr></tbody></table>\n\n\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #ffffff;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><strong><span style=\"color:#000000\">İHLAL BİLGİSİ</span></strong></span></div>\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">KONUM<br>\n{HLAL_KONUMU_4493B3H}</span></span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">CEZA KANUNU<br>\n{CEZA_KANUNU_493TFFU}</span></span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">TARİH<br>\n{HLAL_TARIH_538EMNO}</span></span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">SAAT<br>\n{HLAL_SAATI_13562E}</span></span></div></td>\n</tr></tbody></table></td></tr></tbody></table>\n\n\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #ffffff;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><strong><span style=\"color:#000000\">AÇIKLAMA</span></strong></span></div>\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:4%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">TANIM<br>\n{AIKLAMA_534E88E}<br>\n<br>\n</span></span></div></td></tr></tbody></table></td></tr></tbody></table></div>"
};

/*
 * Açıklama, seçilen kanunlardan en az biri 400-499 arasındaysa otomatik yazılır:
 * {İhlal Tarihi} tarihinde, {İhlal Saati} {Şüpheli Ad Soyadı} tarafından sürülen {Plaka} plakalı,
 * {Model} model aracın, {İhlal Konumu} üzerinde - BURAYA KANUNU NASIL İHLAL ETTİĞİN KISACA KENDİNİZ YAZIN -
 * San Andreas Ceza Kanunu'nun {Kanunlar: numara. ad (tür)} maddesini/maddelerini ihlal etmesi üzerine
 * para cezası uygulandı.
 * İhlal Konumu yazılırken yalnızca kelimelerin ilk harfi büyük geçirilir (Sinner Street); "/" ile
 * ayrılmış birden çok konum "ile" bağlacıyla yazılır (SINNER STREET / ATLEE STREET -> Sinner Street
 * ile Atlee Street). Kanunun nasıl ihlal edildiğini anlatan kısım her zaman elle yazılır; metnin geri
 * kalanı bilgi girildikçe canlı yazılır. Seçilen kanunların hiçbiri 400-499 arasında değilse açıklama
 * hiç yazılmaz.
 */
(function () {
  var MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];

  // "2026-09-25" -> "25 Eylül 2026"
  function longDate(v) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || '');
    return m ? Number(m[3]) + ' ' + MONTHS[Number(m[2]) - 1] + ' ' + m[1] : '';
  }

  // Locative suffix for a number as it is read aloud: 1312 -> 'de, 1340 -> 'ta, 1300 -> 'de.
  var ONES = { 1: 'de', 2: 'de', 3: 'te', 4: 'te', 5: 'te', 6: 'da', 7: 'de', 8: 'de', 9: 'da' };
  var TENS = { 1: 'da', 2: 'de', 3: 'da', 4: 'ta', 5: 'de', 6: 'ta', 7: 'te', 8: 'de', 9: 'da' };
  function locative(numStr) {
    var n = Number(numStr);
    if (!n) return 'da';                      // sıfır
    if (n % 10) return ONES[n % 10];
    if (n % 100) return TENS[(n % 100) / 10];
    if (n % 1000) return 'de';                // yüz
    return 'de';                              // bin
  }

  // "14:05" -> "1405'te"
  function timeWithSuffix(v) {
    var m = /^(\d{2}):(\d{2})$/.exec(v || '');
    if (!m) return '';
    var t = m[1] + m[2];
    return t + "'" + locative(t);
  }

  // "JONATHAN MENDEZ" -> "Jonathan Mendez"
  function titleCase(v) {
    return String(v || '').trim().toLocaleLowerCase('en-US').replace(/(^|[\s\-'])(\S)/g, function (m, sep, ch) {
      return sep + ch.toLocaleUpperCase('en-US');
    });
  }

  // "SINNER STREET / ATLEE STREET" -> "Sinner Street ile Atlee Street"
  function locationText(v) {
    var raw = String(v || '').trim();
    if (!raw) return '';
    return raw.split('/').map(function (part) { return titleCase(part); }).filter(Boolean).join(' ile ');
  }

  // "401,410" -> "401. ... (M) ve 410. ... (I)"
  function chargeList(ids) {
    var code = window.PENAL_CODE || [], seen = [], parts = [];
    ids.forEach(function (id) {
      if (!id || seen.indexOf(id) >= 0) return;
      seen.push(id);
      var c = code.filter(function (x) { return x.id === id; })[0];
      if (c) parts.push(c.id + '. ' + c.charge + ' (' + c.type + ')');
    });
    if (parts.length < 2) return parts.join('');
    return parts.slice(0, -1).join(', ') + ' ve ' + parts[parts.length - 1];
  }

  window.REPORT_FORM.autoText = {
    target: 'AIKLAMA_534E88E',
    build: function (v) {
      var ids = String(v.SUCLAMA || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
      if (!ids.length) return '';
      // Seçilen kanunlardan en az biri 400-499 aralığındaysa açıklama otomatik yazılır.
      var anyInRange = ids.some(function (id) {
        var n = parseInt(id, 10);
        return n >= 400 && n <= 499;
      });
      if (!anyInRange) return '';
      var parts = {
        date: longDate(v.HLAL_TARIH_538EMNO),
        time: timeWithSuffix(v.HLAL_SAATI_13562E),
        name: titleCase(v.AD_SOYADI_2911L1G),
        plate: String(v.PLAKA_2667IPU || '').trim().toLocaleUpperCase('en-US'),
        model: titleCase(v.MODEL_2555NYG),
        location: locationText(v.HLAL_KONUMU_4493B3H),
        charges: chargeList(ids),
      };
      // Live preview: written as soon as any piece is known; missing pieces show as {Alan}.
      var any = parts.time || parts.name || parts.plate || parts.model || parts.location || parts.charges;
      if (!any) return '';
      function p(k, label) { return parts[k] || '{' + label + '}'; }
      var madde = ids.length > 1 ? 'maddelerini' : 'maddesini';
      return p('date', 'İhlal Tarihi') + ' tarihinde, ' + p('time', 'İhlal Saati') + ' ' + p('name', 'Şüpheli Ad Soyadı') +
        ' tarafından sürülen ' + p('plate', 'Plaka') + ' plakalı, ' + p('model', 'Model') +
        ' model aracın, ' + p('location', 'İhlal Konumu') +
        " üzerinde - BURAYA KANUNU NASIL İHLAL ETTİĞİN KISACA KENDİNİZ YAZIN - San Andreas Ceza Kanunu'nun " +
        p('charges', 'Kanunlar') + ' ' + madde + ' ihlal etmesi üzerine para cezası uygulandı.';
    },
  };
})();
