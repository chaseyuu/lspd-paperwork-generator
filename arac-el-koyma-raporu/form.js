/* Araç El Koyma Formu: alanlar ve çıktı şablonu. */
window.REPORT_FORM = {
  "title": "Araç El Koyma Formu",
  "titleTemplate": "{HLAL_TARIH_538EMNO} - {PLAKA_2667IPU} - {MODEL_2555NYG}",
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
          "lockedTitle": "Seçilen suçlamalara göre otomatik belirlenir."
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
          "lockedTitle": "Seçilen suçlamalara göre otomatik belirlenir."
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
          "lockedTitle": "Seçilen suçlamalara göre otomatik belirlenir."
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
          "label": "Suçlama",
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
          "hint": "San Andreas Ceza Kanununa göre ihlal edilen kanunların kodlarını yazın.",
          "locked": true,
          "lockedTitle": "Seçilen suçlamalara göre otomatik doldurulur."
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
