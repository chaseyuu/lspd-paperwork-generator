/* Tutuklama Raporu: alanlar ve çıktı şablonu (BBCode). */
window.REPORT_FORM = {
  "emptyValue": "—",
  "title": "Tutuklama Raporu",
  "titleTemplate": "TR — {TARIH_RAPOR} - {AD_SOYADI_2911L1G}",
  "outputFormat": "bbcode",
  "sections": [
    {
      "title": "Personel Bilgileri",
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
          "countDuplicates": true
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
      "title": "Tutuklamayı Yapan İkinci Personel Bilgisi",
      "cols": 4,
      "fields": [
        {
          "key": "PERSONEL_BILGISI_151KSJP1",
          "label": "Adı Soyadı",
          "type": "text",
          "placeholder": "JOHN DOE",
          "default": "—",
          "hint": "Büyük harflerle doldurun.",
          "upper": "en"
        },
        {
          "key": "SERI_NO_159LJQF1",
          "label": "Seri No.",
          "type": "text",
          "placeholder": "00000",
          "default": "—"
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
      "blockTemplate": "[*][url={KANIT_{{N}}_ICERIK}]{KANIT_{{N}}_BASLIK}[/url]"
    }
  ],
  "template": "[table=#d0dade,white][tr]\n[tdwidth=#ffffff,#ffffff,top,left,2,1][/tdwidth]\n[tdwidth=#ffffff,#ffffff,top,left,14,1]\n[center][size=125]LOS SANTOS POLICE DEPARTMENT\n[b]TUTUKLAMA RAPORU[/b][/size][/center][/tdwidth]\n[tdwidth=#ffffff,#ffffff,top,left,2,1][/tdwidth]\n[/table]\n\n\n[table=#d0dade,white][tr]\n[tdwidth=#ffffff,#ffffff,top,left,2,1][b]PERSONEL BİLGİLERİ[/b]\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,3,1][size=85][indent=2]ADI SOYADI\n{PERSONEL_BILGISI_151KSJP}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,1,1][size=85][indent=2]SERİ NO.\n{SERI_NO_159LJQF}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,1,1][size=85][indent=2]DIVISION\n{DIVISION_12Z4CJ}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2]GÖREVLENDİRME\n{GREVLENDIRME_177LU8}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,1,1][size=85][indent=2]TARİH\n{TARIH_RAPOR}[/indent][/size][/tdwidth][/table]\n\n[table=#d0dade,white][tr]\n[tdwidth=#ffffff,#ffffff,top,left,2,1][b]ŞÜPHELİ BİLGİSİ[/b][/table]\n\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,4,1][size=85][indent=2]ADI SOYADI\n{AD_SOYADI_2911L1G}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2]CİNSİYETİ\n{CNSYET_306FE08}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2]YAŞ\n{YA_13T170}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,4,1][size=85][indent=2]KÖKEN\n{KKEN_394JO84}[/indent][/size][/tdwidth][/table]\n\n[table=#d0dade,white][tr]\n[tdwidth=#ffffff,#ffffff,top,left,2,1][b]TUTUKLAMA BİLGİSİ[/b][/table]\n\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,6,1][size=85][indent=2]KONUM\n{KONUM_53B0BK}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2]TARİH\n{TARH_108BV3Y}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2]SAAT\n{SAAT_104SXC0}[/indent][/size][/tdwidth][/table]\n\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2]CEZA KANUNU\n{CEZA_KANUNU_97NVWS}[/indent][/size][/tdwidth][/table]\n\n[table=#d0dade,white][tr]\n[tdwidth=#ffffff,#ffffff,top,left,2,1][b]TUTUKLAMAYI YAPAN İKİNCİ PERSONEL BİLGİSİ[/b]\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,3,1][size=85][indent=2]ADI SOYADI\n{PERSONEL_BILGISI_151KSJP1}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,1,1][size=85][indent=2]SERİ NO.\n{SERI_NO_159LJQF1}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,1,1][size=85][indent=2]DIVISION\n{DIVISION_21NN6U}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2]GÖREVLENDİRME\n{GREVLENDIRME_36Y25T}[/indent][/size][/tdwidth][/table]\n\n[/tdwidth][/table]\n\n[table=#d0dade,white][tr]\n[tdwidth=#ffffff,#ffffff,top,left,2,1][b]DETAYLAR[/b]\n\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2]AÇIKLAMA\n{AIKLAMA_5CY4S}\n\n\n\n\n\n[/indent][/size][/tdwidth][/table]\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2]KANITLAR\n[list]\n{KANIT_LISTESI}\n[/list][/indent][/size][/tdwidth][/table]\n\n[/table][/tdwidth]\n[/table]\n[size=75]Form 05.02.00[/size]"
};
