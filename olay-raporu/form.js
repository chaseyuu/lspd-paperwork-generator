/* Olay Raporu Formu: alanlar ve çıktı şablonu (BBCode). */
window.REPORT_FORM = {
  "emptyValue": "—",
  "title": "Olay Raporu Formu",
  "titleTemplate": "OR — {TARH_17YUM7} - {RAPOR_NO_148S5HW}",
  "outputFormat": "bbcode",
  "sections": [
    {
      "title": "Personel Bilgileri",
      "cols": 3,
      "fields": [
        {
          "key": "RAPOR_NO_148S5HW",
          "label": "Rapor No.",
          "type": "text",
          "placeholder": "00000",
          "tooltip": "Forum üzerindeki son rapor numarasını kontrol etmeyi unutmayın."
        },
        {
          "key": "ADI_SOYADI_14W7FR",
          "label": "Adı Soyadı",
          "type": "text",
          "placeholder": "Adı Soyadı",
          "hint": "Büyük harflerle doldurun.",
          "upper": "en",
          "prefill": "name"
        },
        {
          "key": "SER_NO_22H7AT",
          "label": "Seri No.",
          "type": "text",
          "placeholder": "00000",
          "prefill": "badge"
        },
        {
          "key": "DIVISION_12GSH2",
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
          "key": "GREVLENDRME_219KDQ",
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
          ],
          "default": "A"
        },
        {
          "key": "TARH_17YUM7",
          "label": "Tarih",
          "type": "date",
          "today": true
        }
      ]
    },
    {
      "title": "Olay Bilgileri",
      "cols": 3,
      "fields": [
        {
          "key": "OLAY_TARIHI_VE_SAATI_132MZ65",
          "label": "Olay Tarihi ve Saati",
          "type": "text",
          "placeholder": "GG/AA/YYYY - SS:DD",
          "tooltip": "GG/AA/YYYY - SS:DD"
        },
        {
          "key": "OLAY_KONUMU_1383ZVF",
          "label": "Olay Konumu",
          "type": "text",
          "placeholder": "SINNER STREET / VESPUCCI BOULEVARD",
          "hint": "Büyük harflerle doldurun.",
          "tooltip": "Kapı numarası varsa yazın. Kesişimleri de yazın.",
          "upper": "en"
        },
        {
          "key": "BLGE_5U0WX",
          "label": "Bölge",
          "type": "select",
          "search": true,
          "hint": "Aratarak seçebilirsiniz.",
          "default": "LS COUNTY",
          "values": [
            { "label": "Alta", "value": "ALTA" },
            { "label": "Backlot City", "value": "BACKLOT CITY" },
            { "label": "Burton", "value": "BURTON" },
            { "label": "Cypress Flats", "value": "CYPRESS FLATS" },
            { "label": "Chamberlain Hills", "value": "CHAMBERLAIN HILLS" },
            { "label": "Davis", "value": "DAVIS" },
            { "label": "Del Perro", "value": "DEL PERRO" },
            { "label": "Downtown", "value": "DOWNTOWN" },
            { "label": "Downtown Vinewood", "value": "DOWNTOWN VINEWOOD" },
            { "label": "East Vinewood", "value": "EAST VINEWOOD" },
            { "label": "El Burro Heights", "value": "EL BURRO HEIGHTS" },
            { "label": "Hawick", "value": "HAWICK" },
            { "label": "Little Seoul", "value": "LITTLE SEOUL" },
            { "label": "LS County", "value": "LS COUNTY" },
            { "label": "Mission Row", "value": "MISSION ROW" },
            { "label": "Morningwood", "value": "MORNINGWOOD" },
            { "label": "La Puerta", "value": "LA PUERTA" },
            { "label": "La Mesa", "value": "LA MESA" },
            { "label": "Mirror Park", "value": "MIRROR PARK" },
            { "label": "Richman", "value": "RICHMAN" },
            { "label": "Rockford Hills", "value": "ROCKFORD HILLS" },
            { "label": "Pillbox Hill", "value": "PILLBOX HILL" },
            { "label": "Textile City", "value": "TEXTILE CITY" },
            { "label": "Vespucci", "value": "VESPUCCI" },
            { "label": "Vespucci Canals", "value": "VESPUCCI CANALS" },
            { "label": "Vinewood", "value": "VINEWOOD" },
            { "label": "Vinewood Hills", "value": "VINEWOOD HILLS" },
            { "label": "West Vinewood", "value": "WEST VINEWOOD" },
            { "label": "Strawberry", "value": "STRAWBERRY" },
            { "label": "Rancho", "value": "RANCHO" },
            { "label": "LSIA", "value": "LSIA" }
          ]
        }
      ]
    },
    {
      "title": "Olay Türü",
      "cols": 3,
      "fields": [
        {
          "key": "ARA_TAKIBI_4PFCW",
          "label": "Araç Takibi",
          "type": "checkbox",
          "onValue": "[cbC] Araç Takibi",
          "offValue": "[cb] Araç Takibi"
        },
        {
          "key": "SILAHLI_SALDIRI_8EM9C",
          "label": "Silahlı Saldırı",
          "type": "checkbox",
          "onValue": "[cbC] Silahlı Saldırı",
          "offValue": "[cb] Silahlı Saldırı"
        },
        {
          "key": "CINAYET_12KQEB",
          "label": "Cinayet",
          "type": "checkbox",
          "onValue": "[cbC] Cinayet",
          "offValue": "[cb] Cinayet"
        },
        {
          "key": "ETE_BALANTILI_16VQ5E",
          "label": "Çete Bağlantılı",
          "type": "checkbox",
          "onValue": "[cbC] Çete Bağlantılı",
          "offValue": "[cb] Çete Bağlantılı"
        },
        {
          "key": "NARKOTIK_201Q6T",
          "label": "Narkotik",
          "type": "checkbox",
          "onValue": "[cbC] Narkotik",
          "offValue": "[cb] Narkotik"
        },
        {
          "key": "HIRSIZLIK_2443SO",
          "label": "Hırsızlık",
          "type": "checkbox",
          "onValue": "[cbC] Hırsızlık",
          "offValue": "[cb] Hırsızlık"
        },
        {
          "key": "TRAFIK_KAZASI_28T5Y0",
          "label": "Trafik Kazası",
          "type": "checkbox",
          "onValue": "[cbC] Trafik Kazası",
          "offValue": "[cb] Trafik Kazası"
        },
        {
          "key": "DIER_337H01",
          "label": "Diğer",
          "type": "checkbox",
          "onValue": "[cbC] Diğer",
          "offValue": "[cb] Diğer"
        }
      ]
    },
    {
      "group": true,
      "key": "KISI",
      "label": "İlgili Kişi",
      "min": 2,
      "max": 5,
      "addLabel": "Kişi Ekle",
      "target": "ILGILI_KISI_BLOKLARI",
      "joinWith": "\n\n",
      "cols": 3,
      "fields": [
        {
          "suffix": "ADI_SOYADI",
          "label": "Adı Soyadı",
          "type": "text",
          "placeholder": "Adı Soyadı",
          "default": "—"
        },
        {
          "suffix": "ILETISIM",
          "label": "İletişim Bilgisi",
          "type": "text",
          "placeholder": "00000",
          "default": "—"
        },
        {
          "suffix": "ADRES",
          "label": "Adresi",
          "type": "text",
          "tooltip": "Yaşadığı yerin adresini girin.",
          "default": "—"
        },
        {
          "suffix": "STATU",
          "label": "Statü",
          "type": "select",
          "search": true,
          "default": "[cb] MAĞDUR[color=#FFFFFF]___[/color][cb] TANIK",
          "values": [
            { "label": "Mağdur", "value": "[cbC] MAĞDUR[color=#FFFFFF]___[/color][cb] TANIK" },
            { "label": "Tanık", "value": "[cb] MAĞDUR[color=#FFFFFF]___[/color][cbC] TANIK" },
            { "label": "Hiçbiri", "value": "[cb] MAĞDUR[color=#FFFFFF]___[/color][cb] TANIK" }
          ]
        }
      ],
      "blockTemplate": "[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2]ADI SOYADI\n{KISI_{{N}}_ADI_SOYADI}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2]İLETİŞİM BİLGİSİ [size=80](varsa)[/size]\n{KISI_{{N}}_ILETISIM}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,3,1][size=85][indent=2]ADRESİ [size=80](varsa)[/size]\n{KISI_{{N}}_ADRES}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2]STATÜ\n{KISI_{{N}}_STATU}[/indent][/size][/tdwidth][/table]"
    },
    {
      "title": "Açıklama",
      "cols": 3,
      "fields": [
        {
          "key": "AIKLAMA_11KPDM",
          "label": "Açıklama",
          "type": "textarea",
          "rows": 8,
          "span": "all",
          "hideLabel": true,
          "hint": "Lütfen açıklama içerisinde sokak veya cadde adlarından sonra en az bir kere bölge adına atıfta bulunduğunuzdan emin olun (ör. Jamestown Street, Rancho veya West Mirror Drive, Mirror Park)."
        },
        {
          "key": "G_KULLANILDI_46A850",
          "label": "Güç Kullanıldı",
          "type": "select",
          "default": "cb",
          "values": [
            { "label": "Evet", "value": "cbc" },
            { "label": "Hayır", "value": "cb" }
          ]
        },
        {
          "key": "TUTUKLAMA_YAPILDI_50GA9S",
          "label": "Tutuklama Yapıldı",
          "type": "select",
          "default": "cb",
          "values": [
            { "label": "Evet", "value": "cbc" },
            { "label": "Hayır", "value": "cb" }
          ]
        },
        {
          "key": "TAKIP_SORUTURMASI_GEREKIYOR_541YNH",
          "label": "Takip Soruşturması Gerekiyor",
          "type": "select",
          "default": "cb",
          "values": [
            { "label": "Evet", "value": "cbc" },
            { "label": "Hayır", "value": "cb" }
          ]
        },
        {
          "key": "APB_5XJ9B",
          "label": "APB",
          "type": "select",
          "default": "cb",
          "values": [
            { "label": "Gerekiyor", "value": "cbc" },
            { "label": "Gerekmiyor", "value": "cb" }
          ]
        },
        {
          "key": "SONULANDI_58ZH2F",
          "label": "Sonuçlandı",
          "type": "select",
          "default": "cb",
          "values": [
            { "label": "Evet", "value": "cbc" },
            { "label": "Hayır", "value": "cb" }
          ]
        }
      ]
    },
    {
      "title": "Kanıtlar",
      "cols": 2,
      "fields": [
        {
          "key": "1_KANIT_BALII_114ISKZ",
          "label": "1) Kanıt Başlığı",
          "type": "text",
          "placeholder": "—",
          "tooltip": "Temel olarak şu başlıklar haricine çıkmamaya özen gösterin: OR — 00/00/2025 — 00000, IR — 00/00/2025 — 00000, EV-20250000-000, CCTV ID #000 — Konum — GG/AA/YYYY, DICVS Seri No. 00000 - GG/AA/YYYY, BWV A. Soyadı #00000 - GG/AA/YYYY, Trafik Kazası Fotoğrafları (Plaka), Impound Report - Araç Modeli - Plaka, Tutuklama Raporu (Şüpheli Adı), FSD Silah Adı - Balistik İncelemesi, FSD Eşya Adı - Parmak İzi İncelemesi, FSD DNA İnceleme Raporu, FSD Kovan İnceleme Raporu, APB - Şüpheli Adı (APB Numarası), Coroner Raporu (Mağdur Adı)."
        },
        {
          "key": "1_KANIT_ERII_130EI6X",
          "label": "1) Kanıt İçeriği",
          "type": "text",
          "placeholder": "—",
          "tooltip": "Kanıt içeriğine URL yerleştirmelisiniz."
        },
        {
          "key": "2_KANIT_BALII_117C591",
          "label": "2) Kanıt Başlığı",
          "type": "text",
          "placeholder": "—"
        },
        {
          "key": "2_KANIT_ERII_133V4BJ",
          "label": "2) Kanıt İçeriği",
          "type": "text",
          "placeholder": "—"
        },
        {
          "key": "3_KANIT_BALII_121Q94V",
          "label": "3) Kanıt Başlığı",
          "type": "text",
          "placeholder": "—"
        },
        {
          "key": "3_KANIT_ERII_136WWUR",
          "label": "3) Kanıt İçeriği",
          "type": "text",
          "placeholder": "—"
        },
        {
          "key": "4_KANIT_BALII_124Z0FL",
          "label": "4) Kanıt Başlığı",
          "type": "text",
          "placeholder": "—"
        },
        {
          "key": "4_KANIT_ERII_139YYCO",
          "label": "4) Kanıt İçeriği",
          "type": "text",
          "placeholder": "—"
        },
        {
          "key": "5_KANIT_BALII_127TF57",
          "label": "5) Kanıt Başlığı",
          "type": "text",
          "placeholder": "—"
        },
        {
          "key": "5_KANIT_ERII_142DY7M",
          "label": "5) Kanıt İçeriği",
          "type": "text",
          "placeholder": "—"
        }
      ]
    }
  ],
  "template": "[table=#d0dade,white][tr]\n[tdwidth=#ffffff,#ffffff,top,left,2,1][/tdwidth]\n[tdwidth=#ffffff,#ffffff,top,left,12,1]\n[center][size=125]LOS SANTOS POLICE DEPARTMENT\n[b]OLAY RAPORU[/b][/size][/center][/tdwidth]\n[tdwidth=#ffffff,#ffffff,top,left,2,1][size=85][indent=2][b]RAPOR NO.[/b]\n26-{RAPOR_NO_148S5HW}[/indent][/size][/tdwidth]\n[/table]\n\n\n[table=#d0dade,white][tr]\n[tdwidth=#ffffff,#ffffff,top,left,2,1][b]PERSONEL BİLGİLERİ[/b]\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,3,1][size=85][indent=2]ADI SOYADI\n{ADI_SOYADI_14W7FR}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,1,1][size=85][indent=2]SERİ NO.\n{SER_NO_22H7AT}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,1,1][size=85][indent=2]DIVISION\n{DIVISION_12GSH2}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2]GÖREVLENDİRME\n{GREVLENDRME_219KDQ}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,1,1][size=85][indent=2]TARİH\n{TARH_17YUM7}[/indent][/size][/tdwidth][/table]\n\n[table=#d0dade,white][tr]\n[tdwidth=#ffffff,#ffffff,top,left,2,1][b]OLAY BİLGİLERİ[/b][/table]\n\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2]TARİH ve SAAT\n{OLAY_TARIHI_VE_SAATI_132MZ65}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,4,1][size=85][indent=2]KONUM\n{OLAY_KONUMU_1383ZVF}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2]BÖLGE\n{BLGE_5U0WX}[/indent][/size][/tdwidth]\n[/table]\n\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,10,1][size=85][indent=2]OLAY TÜRÜ[/size]\n[size=85]{ARA_TAKIBI_4PFCW}[color=#FFFFFF]___[/color]{SILAHLI_SALDIRI_8EM9C}[color=#FFFFFF]___[/color]{CINAYET_12KQEB}[color=#FFFFFF]___[/color]{ETE_BALANTILI_16VQ5E}[color=#FFFFFF]___[/color]{NARKOTIK_201Q6T}[color=#FFFFFF]___[/color]{HIRSIZLIK_2443SO}[color=#FFFFFF]___[/color]{TRAFIK_KAZASI_28T5Y0}[color=#FFFFFF]___[/color]{DIER_337H01}[color=#FFFFFF]___[/color][/tdwidth][/table]\n\n[table=#d0dade,white][tr]\n[tdwidth=#ffffff,#ffffff,top,left,2,1][b]DETAYLAR[/b]\n{ILGILI_KISI_BLOKLARI}\n\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2]AÇIKLAMA\n{AIKLAMA_11KPDM}\n\n\n\n\n\n[/indent][/size][/tdwidth][/table]\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2]KANITLAR\n[list]\n[*][url={1_KANIT_ERII_130EI6X}]{1_KANIT_BALII_114ISKZ}[/url]\n[*][url={2_KANIT_ERII_133V4BJ}]{2_KANIT_BALII_117C591}[/url]\n[*][url={3_KANIT_ERII_136WWUR}]{3_KANIT_BALII_121Q94V}[/url]\n[*][url={4_KANIT_ERII_139YYCO}]{4_KANIT_BALII_124Z0FL}[/url]\n[*][url={5_KANIT_ERII_142DY7M}]{5_KANIT_BALII_127TF57}[/url]\n[/list][/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2]SÜREÇ[/size]\n[size=85][list]\n[*] [{G_KULLANILDI_46A850}] Güç Kullanıldı\n[*] [{TUTUKLAMA_YAPILDI_50GA9S}] Tutuklama Yapıldı\n[*] [{TAKIP_SORUTURMASI_GEREKIYOR_541YNH}] Takip Soruşturması Gerekiyor\n[*] [{APB_5XJ9B}] APB Gerekiyor\n[*] [{SONULANDI_58ZH2F}] Sonuçlandı\n[/list][/tdwidth][/table]\n\n[/table][/tdwidth]\n\n[table=#d0dade,white][tr]\n[tdwidth=#ffffff,#ffffff,top,left,2,1][b]İDARİ BİLGİLER[/b]\n\n[table=#ffffff,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,5,1][size=85][indent=2]TAKİP SORUŞTURMASI[/size]\n[size=85][cb] DB:[color=#FFFFFF] X [/color][color=#FFFFFF]___[/color][cb] Traffic Division[color=#FFFFFF]___[/color][cb] Area GIT[color=#FFFFFF]___[/color][cb] Area Detective Division[color=#FFFFFF]___[/color][cb] Area Vice[color=#FFFFFF]___[/color][cb] Diğer: [color=#FFFFFF] X [/color][/tdwidth][/size][/table]\n\n[/tdwidth][/table]\n\n[table=#ffffff,white][tr]\n[tdwidth=#d0dade,#ffffff,middle,left,4,1][size=85][indent=2]FIELD SUPERVISOR İMZASI\n[color=#000000]A. SOYADI[/color][/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,middle,left,1,1][size=85][indent=2]SERİ NO.\n[color=#000000]00000[/color][/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,middle,left,4,1][size=85][indent=2]WATCH COMMANDER İMZASI\n[color=#000000]A. SOYADI[/color][/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,middle,left,1,1][size=85][indent=2]SERİ NO.\n[color=#000000]00000[/color][/indent][/size][/tdwidth][/table]\n[/tdwidth][/table]\n[size=75]Form 03.04.25 (01/25)[/size]"
};
