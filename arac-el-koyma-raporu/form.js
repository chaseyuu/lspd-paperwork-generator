/* Araç El Koyma: alanlar ve çıktı şablonu. */
window.REPORT_FORM = {
  "emptyValue": "—",
  "title": "Araç El Koyma Raporu",
  "titleTemplate": "{HLAL_TARIH_538EMNO} - {PLAKA_2667IPU} - {MODEL_2555NYG}",
  "required": true,
  "draftMaxAgeMs": 3600000,
  "sections": [
    {
      "title": "İhlal Türü",
      "cols": 3,
      "fields": [
        {
          "key": "INFRACTION_4853P",
          "label": "Infraction",
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
        },
        {
          "key": "MISDEMEANOR_80TIL",
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
        },
        {
          "key": "FELONY_127SK8",
          "label": "Felony",
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
          "key": "DIVISION_118SPF",
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
          "prefill": "assignment",
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
          "ids": [
            "115"
          ],
          "ranges": [
            [
              400,
              500
            ]
          ],
          "target": "CEZA_KANUNU_493TFFU",
          "typeTargets": {
            "I": "INFRACTION_4853P",
            "M": "MISDEMEANOR_80TIL",
            "F": "FELONY_127SK8"
          },
          "typeOn": "☒",
          "typeOff": "☐"
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
          "key": "CEKIM_GUN",
          "label": "Kaç Gün Çekildi?",
          "type": "number",
          "min": 1,
          "max": 30,
          "placeholder": "1-30"
        },
        {
          "key": "AIKLAMA_21HVEH",
          "label": "Açıklama",
          "type": "textarea",
          "rows": 6,
          "span": "all",
          "placeholder": "Hatalı bir şekilde, özel bir mülkün giriş çıkışını kapatacak pozisyonda park edildiğinden ötürü çekildi."
        }
      ]
    }
  ],
  "template": "<div style=\"background-color:white;border:1px solid black;width: 800px; margin: auto;padding:25px\">\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #ffffff;background:#ffffff;vertical-align:top;text-align:left;width:15%;padding:10px\">\n<div style=\"text-align:left\"><span style=\"color:#000000\">LOS SANTOS POLICE DEPARTMENT<br>\nCITY OF LOS SANTOS<br>\n<strong><span style=\"font-size:130%;line-height:116%\">ARAÇ EL KOYMA RAPORU</span></strong></span></div>\n</td></tr></tbody></table>\n\n\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #ffffff;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"></td>\n<td style=\"border:1px solid #ffffff;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">İHLAL TÜRÜ</span></span><br>\n<span style=\"font-size:120%;line-height:116%\"><span style=\"color:#000000\">{INFRACTION_4853P}</span></span> <span style=\"font-size:95%;line-height:116%\"><span style=\"color:#000000\">Infraction</span></span><span style=\"color:#FFFFFF\">___</span><span style=\"font-size:120%;line-height:116%\"><span style=\"color:#000000\">{MISDEMEANOR_80TIL}</span></span> <span style=\"font-size:95%;line-height:116%\"><span style=\"color:#000000\">Misdemeanor</span></span><span style=\"color:#FFFFFF\">___</span><span style=\"font-size:120%;line-height:116%\"><span style=\"color:#000000\">{FELONY_127SK8}</span></span> <span style=\"font-size:95%;line-height:116%\"><span style=\"color:#000000\">Felony</span></span></div></td></tr>\n</tbody></table>\n\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:3%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">PERSONEL BİLGİSİ<br>\n{PERSONEL_BILGISI_83SVB0}</span></span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">SERİ NO.<br>\n{SERI_NO_118VO9P}</span></span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">DIVISION<br>\n{DIVISION_118SPF}</span></span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">GÖREVLENDİRME<br>\n{GREVLENDIRME_191M7HR}</span></span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">TARİH<br>\n{TARIH_8IB6X}</span></span></div></td></tr></tbody></table>\n\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #ffffff;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><strong><span style=\"color:#000000\">ARAÇ BİLGİSİ</span></strong></span></div>\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">MARKA<br>\n{MARKA_242IXFH}</span></span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">MODEL<br>\n{MODEL_2555NYG}</span></span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">PLAKA<br>\n{PLAKA_2667IPU}</span></span></div></td></tr></tbody></table></td></tr></tbody></table>\n\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #ffffff;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><strong><span style=\"color:#000000\">ŞÜPHELİ BİLGİSİ</span></strong></span></div>\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">ADI SOYADI<br>\n{AD_SOYADI_2911L1G}</span></span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">CİNSİYETİ<br>\n{CNSYET_306FE08}</span></span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">KÖKEN<br>\n{KKEN_394JO84}</span></span></div></td></tr></tbody></table></td></tr></tbody></table>\n\n\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #ffffff;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><strong><span style=\"color:#000000\">İHLAL BİLGİSİ</span></strong></span></div>\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">KONUM<br>\n{HLAL_KONUMU_4493B3H}</span></span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">CEZA KANUNU<br>\n{CEZA_KANUNU_493TFFU}</span></span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">TARİH<br>\n{HLAL_TARIH_538EMNO}</span></span></div></td>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:1%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">SAAT<br>\n{HLAL_SAATI_13562E}</span></span></div></td>\n</tr></tbody></table></td></tr></tbody></table>\n\n\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #ffffff;background:#ffffff;vertical-align:top;text-align:left;width:2%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><strong><span style=\"color:#000000\">AÇIKLAMA</span></strong></span></div>\n<table border=\"1\"><tbody><tr>\n<td style=\"border:1px solid #d0dade;background:#ffffff;vertical-align:top;text-align:left;width:4%;padding:1px\"><span style=\"font-size:85%;line-height:116%\"></span><div style=\"padding-left:2px\"><span style=\"font-size:85%;line-height:116%\"><span style=\"color:#000000\">TANIM<br>\n{AIKLAMA_21HVEH}<br>\n<br>\n</span></span></div></td></tr></tbody></table></td></tr></tbody></table></div>"
};

/*
 * Açıklama otomatik yazılır:
 * {İhlal Tarihi} tarihinde, {İhlal Saati}'de {Şüpheli Ad Soyadı} tarafından sürülen {Plaka} plakalı,
 * {Model} model aracın, San Andreas Ceza Kanunu'nun {Kanunlar: numara. ad (tür)} maddelerini ihlal etmesi
 * üzerine {Kaç Gün Çekildi?} günlüğüne çekimi sağlandı.
 * Bilgi girildikçe canlı yazılır; henüz girilmemiş kısımlar {Alan} olarak görünür.
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

  // "115,401,410" -> "115. Kolluk Kuvvetlerinden Kaçmak (F), 401. ... (M) ve 410. Hız İhlali (I)"
  function chargeList(ids) {
    var code = window.PENAL_CODE || [], seen = [], parts = [];
    String(ids || '').split(',').forEach(function (id) {
      if (!id || seen.indexOf(id) >= 0) return;
      seen.push(id);
      var c = code.filter(function (x) { return x.id === id; })[0];
      if (c) parts.push(c.id + '. ' + c.charge + ' (' + c.type + ')');
    });
    if (parts.length < 2) return parts.join('');
    return parts.slice(0, -1).join(', ') + ' ve ' + parts[parts.length - 1];
  }

  window.REPORT_FORM.autoText = {
    target: 'AIKLAMA_21HVEH',
    build: function (v) {
      var days = String(v.CEKIM_GUN || '').trim();
      if (!/^\d+$/.test(days) || Number(days) < 1 || Number(days) > 30) days = '';
      var parts = {
        date: longDate(v.HLAL_TARIH_538EMNO),
        time: timeWithSuffix(v.HLAL_SAATI_13562E),
        name: titleCase(v.AD_SOYADI_2911L1G),
        plate: String(v.PLAKA_2667IPU || '').trim().toLocaleUpperCase('en-US'),
        model: titleCase(v.MODEL_2555NYG),
        charges: chargeList(v.SUCLAMA),
        days: days,
      };
      // Live preview: written as soon as any piece is known; missing pieces show as {Alan}.
      var any = parts.time || parts.name || parts.plate || parts.model || parts.charges || parts.days;
      if (!any) return '';
      function p(k, label) { return parts[k] || '{' + label + '}'; }
      return p('date', 'İhlal Tarihi') + ' tarihinde, ' + p('time', 'İhlal Saati') + ' ' + p('name', 'Şüpheli Ad Soyadı') +
        ' tarafından sürülen ' + p('plate', 'Plaka') + ' plakalı, ' + p('model', 'Model') +
        " model aracın, San Andreas Ceza Kanunu'nun " + p('charges', 'Kanunlar') +
        ' maddelerini ihlal etmesi üzerine ' + p('days', 'Kaç Gün') + ' günlüğüne çekimi sağlandı.';
    },
  };
})();
