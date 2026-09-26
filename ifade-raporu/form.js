/* İfade Raporu: alanlar ve çıktı şablonu (BBCode). */

/* Olay Türlerini kontrol edip seçili olanları topla */
function ifadeOlayTurleri(v) {
  var types = [];
  var typeMap = {
    'ARA_TAKIBI_4IJPE': 'Araç Takibi',
    'SILAHLI_SALDIRI_8NEX9': 'Silahlı Saldırı',
    'CINAYET_128B5T': 'Cinayet',
    'ETE_BALANTILI_16CLA1': 'Çete Bağlantılı',
    'HIRSIZLIK_20A97R': 'Hırsızlık',
    'TRAFIK_KAZASI_24207K': 'Trafik Kazası',
    'DARP_28CH0W': 'Darp',
    'DIER_32R6TT': 'Diğer'
  };
  for (var key in typeMap) {
    if (v[key] && v[key].indexOf('cbc') >= 0) {
      types.push(typeMap[key].toLocaleLowerCase('en-US'));
    }
  }
  if (!types.length) return '';
  return types.length > 1 ? types.slice(0, -1).join(', ') + ' ve ' + types[types.length - 1] : types[0];
}

/* Tarih ve saati formatla (gün adı ve ay adı ile birlikte) */
function ifadeTarihFormatla(dateStr) {
  if (!dateStr) return '';
  var gunler = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
  var aylar = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
  var date = new Date(dateStr + 'T00:00:00');
  if (isNaN(date.getTime())) return dateStr;
  var gun = gunler[date.getDay()];
  var ay = aylar[date.getMonth()];
  var gün = date.getDate();
  return gün + ' ' + ay + ' ' + date.getFullYear();
}

/* Giriş Açıklaması oluştur: "15 Mayıs 2026'de Mission Row Police Station'da meydana gelen trafik kazası olayı hakkında Simon Graves'den ifade aldım." */
function ifadeGirisAciklamasi(v) {
  function p(val, label) { return val ? val : '{' + label + '}'; }
  var tarih = p(ifadeTarihFormatla(v.FADE_TARH_5888JI), 'İfade Tarihi');
  var konum = p(String(v.FADE_ALINAN_KONUM_49SAXV || '').trim().toLocaleLowerCase('en-US'), 'İfade Alınan Konum');
  var olayTuru = ifadeOlayTurleri(v);
  var olayAcik = olayTuru ? olayTuru + ' olayı' : '{Olay Türü}';
  var ifadeVeren = p(String(v.ADI_SOYADI_19FJ2A || '').trim().toLocaleUpperCase('en-US'), 'İfadeyi Verenin Adı Soyadı');
  var ifadeAlan = p(String(v.ADI_SOYADI_11692Z || '').trim().toLocaleUpperCase('en-US'), 'İfadeyi Alan Memur');

  return tarih + '\'de ' + konum + '\'da meydana gelen ' + olayAcik + ' hakkında ' + ifadeVeren + '\'dan ifade aldım.';
}

window.REPORT_FORM = {
  "emptyValue": "—",
  "title": "İfade Raporu",
  "titleTemplate": "IR — {TARH_17YUM7} - {RAPOR_NO_8992V}",
  "outputFormat": "bbcode",
  "sendUrl": "https://lspd-tr.gta.world/viewforum.php?f=201",
  "autoText": [
    {
      "target": "GIRIS_ACIKLAMASI_FADE",
      "alwaysLive": true,
      "build": function (v) { return ifadeGirisAciklamasi(v); }
    }
  ],
  "sections": [
    {
      "title": "Personel Bilgileri",
      "cols": 3,
      "fields": [
        {
          "key": "RAPOR_NO_8992V",
          "label": "Rapor No.",
          "type": "text",
          "placeholder": "00000",
          "default": "00000",
          "tooltip": "Forum üzerindeki son rapor numarasını kontrol etmeyi unutmayın."
        },
        {
          "key": "ADI_SOYADI_11692Z",
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
          "key": "DIVISION_11XSCY",
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
          "key": "GREVLENDRME_22B7Q4",
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
          "key": "TARH_17YUM7",
          "label": "Tarih",
          "type": "date",
          "today": true
        }
      ]
    },
    {
      "title": "Olay Türü",
      "cols": 3,
      "fields": [
        {
          "key": "ARA_TAKIBI_4IJPE",
          "label": "Araç Takibi",
          "type": "checkbox",
          "onValue": "cbC",
          "offValue": "cb"
        },
        {
          "key": "SILAHLI_SALDIRI_8NEX9",
          "label": "Silahlı Saldırı",
          "type": "checkbox",
          "onValue": "cbc",
          "offValue": "cb"
        },
        {
          "key": "CINAYET_128B5T",
          "label": "Cinayet",
          "type": "checkbox",
          "onValue": "cbc",
          "offValue": "cb"
        },
        {
          "key": "ETE_BALANTILI_16CLA1",
          "label": "Çete Bağlantılı",
          "type": "checkbox",
          "onValue": "cbc",
          "offValue": "cb"
        },
        {
          "key": "HIRSIZLIK_20A97R",
          "label": "Hırsızlık",
          "type": "checkbox",
          "onValue": "cbc",
          "offValue": "cb"
        },
        {
          "key": "TRAFIK_KAZASI_24207K",
          "label": "Trafik Kazası",
          "type": "checkbox",
          "onValue": "cbc",
          "offValue": "cb"
        },
        {
          "key": "DARP_28CH0W",
          "label": "Darp",
          "type": "checkbox",
          "onValue": "cbc",
          "offValue": "cb"
        },
        {
          "key": "DIER_32R6TT",
          "label": "Diğer",
          "type": "checkbox",
          "onValue": "cbc",
          "offValue": "cb"
        }
      ]
    },
    {
      "title": "İfadeyi Veren",
      "cols": 3,
      "fields": [
        {
          "key": "ADI_SOYADI_19FJ2A",
          "label": "Adı Soyadı",
          "type": "text",
          "placeholder": "Adı Soyadı",
          "hint": "Büyük harflerle doldurun.",
          "upper": "en"
        },
        {
          "key": "LETM_BLGS_12C2ZB",
          "label": "İletişim Bilgisi",
          "type": "text",
          "placeholder": "00000",
          "default": "—"
        },
        {
          "key": "KAMETGAH_ADRES_20QFQA",
          "label": "İkametgah Adresi",
          "type": "text",
          "hint": "Büyük harflerle doldurun.",
          "tooltip": "Yaşadığı yerin adresini girin.",
          "upper": "en",
          "default": "—"
        },
        {
          "key": "CNSYET_46IS2W",
          "label": "Cinsiyet",
          "type": "select",
          "default": "[size=85][cb] Erkek[color=#FFFFFF]___[/color][/size][size=85][cb] Kadın",
          "values": [
            { "label": "Erkek", "value": "[size=85][cbC] Erkek[color=#FFFFFF]___[/color][/size][size=85][cb] Kadın" },
            { "label": "Kadın", "value": "[size=85][cb] Erkek[color=#FFFFFF]___[/color][/size][size=85][cbC] Kadın" },
            { "label": "—", "value": "[size=85][cb] Erkek[color=#FFFFFF]___[/color][/size][size=85][cb] Kadın" }
          ]
        },
        {
          "key": "FADE_TARH_5888JI",
          "label": "İfade Tarihi",
          "type": "date"
        },
        {
          "key": "FADE_ALINAN_KONUM_49SAXV",
          "label": "İfade Alınan Konum",
          "type": "text",
          "hint": "Büyük harflerle doldurun.",
          "tooltip": "İfade alınan konumu girin. (PILLBOX HILL MEDICAL CENTER, MISSION ROW STATION)",
          "upper": "en",
          "default": "—"
        }
      ]
    },
    {
      "title": "Detaylar",
      "cols": 3,
      "fields": [
        {
          "key": "OLAY_AIKLAMASI_VE_FADE_1735NQX",
          "label": "Olay Açıklaması ve İfade",
          "type": "textarea",
          "rows": 12,
          "span": "all",
          "hideLabel": true,
          "hint": "Bu kısımda ifade alınmasına sebebiyet veren olayı, genel hatlarıyla kısaca tanımlayın. İkinci paragraftan itibaren ifadeyi aktarın."
        }
      ]
    },
    {
      "group": true,
      "panelPerInstance": false,
      "key": "KANIT",
      "label": "Kanıt",
      "title": "Kanıtlar",
      "min": 3,
      "max": 5,
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
            { "label": "İmza", "value": "İmza" },
            { "label": "Olay Raporu", "value": "OR — 00/00/2025 — 00000" },
            { "label": "İfade Raporu", "value": "IR — 00/00/2025 — 00000" },
            { "label": "Evidence Locker Kaydı", "value": "EL/0/000/2025" },
            { "label": "CCTV Görüntüsü", "value": "CCTV ID #000 — Konum — GG/AA/YYYY" },
            { "label": "DICVS Görüntüsü", "value": "DICVS Seri No. 00000 - GG/AA/YYYY" },
            { "label": "BWV Görüntüsü", "value": "BWV A. Soyadı #00000 - GG/AA/YYYY" }
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
          "tooltip": "Kanıt içeriğine URL yerleştirmelisiniz."
        }
      ],
      "blockTemplate": "[*][url={KANIT_{{N}}_ICERIK}]{KANIT_{{N}}_BASLIK}[/url]"
    },
    {
      "title": "Miranda Bilgilendirmesi",
      "cols": 3,
      "fields": [
        {
          "type": "copylist",
          "intro": "Miranda Bilgilendirmesine ihtiyaç duyulmadıysa bu bölümü işaretlemenize gerek yok. Ayrıca oyun içerisinde kullanmak için buradan kopyalama yapabilirsiniz.",
          "items": [
            "Sessiz kalma hakkına sahipsiniz.",
            "Söyleyeceğiniz herhangi bir şey mahkeme sırasında aleyhinizde kullanılabilir veya kullanılacaktır.",
            "İfadeniz öncesinde veya sırasında bir avukatla konuşma ve sizinle birlikte bulunması hakkına sahipsiniz.",
            "Eğer bir avukat tutacak maddi durumunuz bulunmuyorsa istemeniz durumunda sizi ücretsiz olarak temsil edecek bir avukat atanacaktır."
          ]
        },
        {
          "key": "MIRANDA_BILGILENDIRMESI_383WN5K",
          "label": "Miranda Haklarını Anladı",
          "type": "checkbox",
          "onValue": "cbc",
          "offValue": "cb",
          "tooltip": "Sessiz kalma hakkına sahipsiniz. Söyleyeceğiniz herhangi bir şey mahkeme sırasında aleyhinizde kullanılabilir veya kullanılacaktır. İfadeniz öncesinde veya sırasında bir avukatla konuşma ve sizinle birlikte bulunması hakkına sahipsiniz. Eğer bir avukat tutacak maddi durumunuz bulunmuyorsa istemeniz durumunda sizi ücretsiz olarak temsil edecek bir avukat atanacaktır."
        }
      ]
    },
    {
      "title": "Giriş Açıklaması",
      "cols": 1,
      "fields": [
        {
          "key": "GIRIS_ACIKLAMASI_FADE",
          "label": "Giriş Açıklaması",
          "type": "textarea",
          "rows": 3,
          "span": "all",
          "copyable": true,
          "hint": "Yukarıdaki alanlara göre her zaman canlı güncellenir; elle yazdığınız bir metin kalıcı olmaz, bir sonraki değişiklikte üzerine yazılır."
        }
      ]
    }
  ],
  "template": "[center][size=125]LOS SANTOS POLICE DEPARTMENT\n[b]İFADE RAPORU[/b][/size][/center]\n\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,3,1][size=85][indent=2][b]İFADEYİ ALAN[/b] \n{ADI_SOYADI_11692Z}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,1,1][size=85][indent=2][b]SERİ NO.[/b]\n{SER_NO_22H7AT}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,1,1][size=85][indent=2][b]DIVISION[/b]\n{DIVISION_11XSCY}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2][b]GÖREVLENDİRME[/b]\n{GREVLENDRME_22B7Q4}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,1,1][size=85][indent=2][b]TARİH[/b]\n{TARH_17YUM7}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,1,1][size=85][indent=2][b]RAPOR NO.[/b]\n{RAPOR_NO_8992V}[/indent][/size][/tdwidth][/table]\n\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,10,1][size=85][indent=2][b]OLAY TÜRÜ[/b][/size]\n[size=85][{ARA_TAKIBI_4IJPE}] Araç Takibi[color=#FFFFFF]___[/color][{SILAHLI_SALDIRI_8NEX9}] Silahlı Saldırı[color=#FFFFFF]___[/color][{CINAYET_128B5T}] Cinayet[color=#FFFFFF]___[/color][{ETE_BALANTILI_16CLA1}] Çete Bağlantılı[color=#FFFFFF]___[/color][{HIRSIZLIK_20A97R}] Hırsızlık[color=#FFFFFF]___[/color][{TRAFIK_KAZASI_24207K}] Trafik Kazası[color=#FFFFFF]___[/color][{DARP_28CH0W}] Darp[color=#FFFFFF]___[/color][{DIER_32R6TT}] Diğer[/tdwidth][/size][/table]\n\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,3,1][size=85][indent=2][b]İFADEYİ VERENİN ADI SOYADI[/b]\n{ADI_SOYADI_19FJ2A}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2][b]İFADEYİ VERENİN CİNSİYETİ[/b][/size]\n{CNSYET_46IS2W}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2][b]İFADE ALINAN KONUM[/b]\n{FADE_ALINAN_KONUM_49SAXV}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,1,1][size=85][indent=2][b]İFADE TARİHİ[/b]\n{FADE_TARH_5888JI}[/indent][/size][/tdwidth][/table]\n\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2][b]İLETİŞİM BİLGİSİ[/b]\n{LETM_BLGS_12C2ZB}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2][b]İKAMETGAH ADRESİ[/b]\n{KAMETGAH_ADRES_20QFQA}[/size][/tdwidth][/table]\n\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2][b]DETAYLAR[/b]\n{OLAY_AIKLAMASI_VE_FADE_1735NQX}\n\n\n\n\n\n[/indent][/size][/tdwidth][/table]\n\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2][b]KANITLAR[/b]\n[list]\n{KANIT_LISTESI}\n[/list][/indent][/size][/tdwidth][/table]\n\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2][b]MİRANDA BİLGİLENDİRMESİ[/b][/size][size=85][list]\n[*] [{MIRANDA_BILGILENDIRMESI_383WN5K}] Sessiz kalma hakkına sahipsiniz.\n[*] [{MIRANDA_BILGILENDIRMESI_383WN5K}] Söyleyeceğiniz herhangi bir şey mahkeme sırasında aleyhinizde kullanılabilir veya kullanılacaktır.\n[*] [{MIRANDA_BILGILENDIRMESI_383WN5K}] İfadeniz öncesinde veya sırasında bir avukatla konuşma ve sizinle birlikte bulunması hakkına sahipsiniz. \n[*] [{MIRANDA_BILGILENDIRMESI_383WN5K}] Eğer bir avukat tutacak maddi durumunuz bulunmuyorsa istemeniz durumunda sizi ücretsiz olarak temsil edecek bir avukat atanacaktır.\n[/list][/tdwidth][/table]\n\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2][b]GİRİŞ AÇIKLAMASI[/b]\n{GIRIS_ACIKLAMASI_FADE}\n[/indent][/size][/tdwidth][/table]"
};
