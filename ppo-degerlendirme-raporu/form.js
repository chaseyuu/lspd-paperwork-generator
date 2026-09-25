/* PPO Değerlendirme Raporu: alanlar ve çıktı şablonu (BBCode).
   25 değerlendirme kriteri aynı 6 seçenekli (1/2/3/4/N-O/NRT) puanlama ölçeğini
   paylaştığı için, hem seçenek listesi hem de rapor şablonundaki satırlar elle
   25 kere tekrar yazılmak yerine aşağıdaki yardımcı fonksiyonlarla üretiliyor. */
(function () {
  var SCALE = ['1', '2', '3', '4', 'N/O', 'NRT'];

  function scaleValues() {
    return SCALE.map(function (sel) {
      var row = SCALE.map(function (l) {
        return '[' + (l === sel ? 'cbC' : 'cb') + '] ' + l;
      }).join('[color=#FFFFFF]_____[/color]');
      return { label: sel, value: '[size=85]' + row + '[/size]' };
    });
  }

  function ratingField(key, num, label) {
    var values = scaleValues();
    var noOption = values.filter(function (v) { return v.label === 'N/O'; })[0];
    return {
      key: key,
      label: num + '. ' + label,
      type: 'select',
      placeholder: 'Seçim Yapın',
      default: noOption.value,
      values: values
    };
  }

  function critRow(num, label, key) {
    return '[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,6,1][size=85][indent=2]' + num + '. ' + label +
      '[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,4,1][indent=2]{' + key + '}[/indent][/tdwidth][/table]';
  }

  var CRITERIA_GROUPS = [
    { title: 'Dış Görünüş', items: [
      ['GENEL_GORUNUS', 1, 'Genel Görünüş']
    ] },
    { title: 'Davranış', items: [
      ['GERI_DONUS_ALMASI', 2, 'Geri Dönüş Alması'],
      ['MESLEGE_TAVIR', 3, 'Mesleğe Yönelik Tavrı ve Davranışları'],
      ['LIDERLIK', 4, 'Liderlik']
    ] },
    { title: 'Bilgi', items: [
      ['DEPARTMAN_POLITIKALARI', 5, 'Departman Politikaları ve Prosedürleri'],
      ['KANUNLAR_ARAMA_EL_KOYMA', 6, 'Kanunlar, Arama ve El Koyma Prosedürleri']
    ] },
    { title: 'Performans', items: [
      ['SURUS_NORMAL', 7, 'Sürüş Yeteneği: Normal Koşullar Altında'],
      ['SURUS_STRESLI', 8, 'Sürüş Yeteneği: Zor ve Stresli Koşullar Altında'],
      ['HARITA_GPS', 9, 'Harita/GPS Kullanımı: Pratiklik/Yönelme Süresi'],
      ['RAPOR_YAZMA', 10, 'Rapor Yazma: Organizasyon/Yazım/Düzen'],
      ['SAHA_PERF_NORMAL', 11, 'Saha Performansı: Normal Koşullar Altında'],
      ['SAHA_PERF_STRESLI', 12, 'Saha Performansı: Stresli Koşullar Altında'],
      ['KENDI_BASINA_SAHA', 13, 'Kendi Başına Yürüttüğü Saha Aktiviteleri'],
      ['INTERVIEW_SORUSTURMA', 14, 'Interview ve Soruşturma Becerisi'],
      ['MEMUR_GUVENLIGI_GENEL', 15, 'Memur Güvenliği: Genel'],
      ['MEMUR_GUVENLIGI_SUPHELI', 16, 'Memur Güvenliği: Şüpheliler/Tutuklular'],
      ['ANLASMAZLIK_KONTROLU', 17, 'Anlaşmazlığın Kontrolü'],
      ['PROBLEM_COZME', 18, 'Problem Çözme Yöntemleri/Karar Verme'],
      ['TELSIZ_KODLAR', 19, 'Telsiz/MDC: İletişim Kodlarının Doğru Kullanımı'],
      ['TELSIZ_GENEL', 20, 'Telsiz/MDC: Genel İletişim']
    ] },
    { title: 'İlişkiler', items: [
      ['VATANDAS_ILETISIM', 21, 'Vatandaşlarla İletişimi'],
      ['DIGER_FTO_SERGEANT', 22, 'Diğer: FTO/Field Sergeant/Watch Commander'],
      ['DIGER_PERSONEL_ILETISIM', 23, 'Diğer Personellerle İletişimi']
    ] },
    { title: '(( Rol Kalitesi ))', items: [
      ['ROL_MOTIVASYONU', 24, 'Rol Motivasyonu'],
      ['OOC_TUTUM', 25, 'Out-of-Character Tutumu']
    ] }
  ];

  var criteriaSections = CRITERIA_GROUPS.map(function (g) {
    return {
      title: g.title,
      cols: 2,
      fields: g.items.map(function (item) { return ratingField(item[0], item[1], item[2]); })
    };
  });

  var criteriaTemplateBlocks = CRITERIA_GROUPS.map(function (g) {
    var rows = g.items.map(function (item) { return critRow(item[1], item[2], item[0]); }).join('\n');
    return '[table=#d0dade,white][tr]\n[tdwidth=#ffffff,#ffffff,top,left,2,1][b]' + g.title.toLocaleUpperCase('tr-TR') +
      '[/b][/table]\n\n' + rows;
  }).join('\n\n');

  var aktiviteRows = [1, 2, 3, 4].map(function (n) {
    return '[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,3,1][size=85][indent=2]RAPOR TÜRÜ\n{RAPOR_TURU_' + n +
      '}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,3,1][size=85][indent=2]BAĞLANTI\n{BAGLANTI_' + n +
      '}[/indent][/size][/tdwidth][/table]';
  }).join('\n');

  var DIVISION_VALUES = [
    { label: 'MISN', value: 'MISN' },
    { label: 'MISN B', value: 'MISN B' },
    { label: 'CTD', value: 'CTD' },
    { label: 'METRO', value: 'METRO' },
    { label: 'ASD', value: 'ASD' },
    { label: 'VES', value: 'VES' }
  ];

  var AKTIVITE_TUR_VALUES = [
    { label: '—', value: '—' },
    { label: 'Olay Raporu', value: 'Olay Raporu' },
    { label: 'İfade Raporu', value: 'İfade Raporu' },
    { label: 'FI Kart', value: 'FI Kart' },
    { label: 'İhlal Raporu', value: 'İhlal Raporu' },
    { label: 'Araç El Koyma Raporu', value: 'Araç El Koyma Raporu' },
    { label: 'Tutuklama Raporu', value: 'Tutuklama Raporu' },
    { label: 'Gözaltı Kayıt Formu', value: 'Gözaltı Kayıt Formu' }
  ];

  var aktiviteFields = [1, 2, 3, 4].reduce(function (fields, n) {
    return fields.concat([
      { key: 'RAPOR_TURU_' + n, label: 'Rapor Türü - ' + n, type: 'select', default: '—', values: AKTIVITE_TUR_VALUES },
      { key: 'BAGLANTI_' + n, label: 'Bağlantı', type: 'text', placeholder: '—', default: '—' }
    ]);
  }, []);

  window.REPORT_FORM = {
    "emptyValue": "—",
    "title": "PPO Değerlendirme Raporu",
    "titleTemplate": "PPO — {TARIH_RAPOR} - {PPO_ADI}",
    "outputFormat": "bbcode",
    "sections": [
      {
        "title": "Çalışan Bilgileri",
        "cols": 3,
        "fields": [
          { "key": "RAPOR_NO", "label": "Rapor No.", "type": "text", "placeholder": "00000", "default": "00000" },
          { "key": "PPO_ADI", "label": "Probationary Police Officer", "type": "text", "placeholder": "JOHN DOE", "upper": "en", "tooltip": "PPO'nun adını büyük harfler ile yazın." },
          { "key": "PPO_SERI_NO", "label": "Seri No.", "type": "text", "placeholder": "00000", "tooltip": "PPO'nun beş haneli seri numarasını yazın." },
          { "key": "FTO_ADI", "label": "Field Training Officer", "type": "text", "placeholder": "JOHN DOE", "upper": "en", "prefill": "name", "tooltip": "FTO'nun adını büyük harflerle yazın." },
          { "key": "FTO_SERI_NO", "label": "FTO Seri No.", "type": "text", "placeholder": "00000", "prefill": "badge" },
          { "key": "DIVISION", "label": "Division", "type": "select", "placeholder": "Seçim Yapın", "prefill": "division", "values": DIVISION_VALUES },
          { "key": "VARDIYA", "label": "Vardiya", "type": "text", "placeholder": "W2/W3" },
          { "key": "GOREVLENDIRME", "label": "Görevlendirme", "type": "text", "placeholder": "A/S/O" },
          { "key": "TARIH_RAPOR", "label": "Tarih", "type": "date", "today": true }
        ]
      }
    ].concat(criteriaSections).concat([
      {
        "title": "Genel Değerlendirme",
        "cols": 1,
        "fields": [
          { "key": "GENEL_AIKLAMA", "label": "Açıklama", "type": "textarea", "rows": 8, "span": "all", "hideLabel": true, "hint": "PPO'nun genel performansı hakkındaki değerlendirmenizi yazın." },
          { "key": "GENEL_PERFORMANSI", "label": "Genel Performansı", "type": "select", "default": "[cbC] Yeterliydi[color=#FFFFFF]_____[/color][cb] Yetersizdi", "values": [
            { "label": "Yeterli", "value": "[cbC] Yeterliydi[color=#FFFFFF]_____[/color][cb] Yetersizdi" },
            { "label": "Yetersiz", "value": "[cb] Yeterliydi[color=#FFFFFF]_____[/color][cbC] Yetersizdi" }
          ] },
          { "key": "FTO_IMZA_ADI", "label": "Field Training Officer İmzası", "type": "text", "placeholder": "J. DOE", "upper": "en", "prefill": "name", "tooltip": "Büyük harflerle A. SOYADI formatında imzanızı yazın." },
          { "key": "FTO_IMZA_SERI_NO", "label": "Field Training Officer Seri No.", "type": "text", "placeholder": "00000", "prefill": "badge" }
        ]
      },
      {
        "title": "Aktiviteler",
        "cols": 2,
        "fields": aktiviteFields
      }
    ]),
    "template": "[table=#d0dade,white][tr]\n[tdwidth=#ffffff,#ffffff,top,left,2,1][/tdwidth]\n[tdwidth=#ffffff,#ffffff,top,left,12,1]\n[center][size=125]LOS SANTOS POLICE DEPARTMENT\n[b]PPO DEĞERLENDİRME RAPORU[/b][/size][/center][/tdwidth]\n[tdwidth=#ffffff,#ffffff,top,left,2,1][size=85][indent=2][b]RAPOR NO.[/b]\n{RAPOR_NO}[/indent][/size][/tdwidth]\n[/table]\n\n\n[table=#d0dade,white][tr]\n[tdwidth=#ffffff,#ffffff,top,left,2,1][b]ÇALIŞAN BİLGİLERİ[/b]\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,3,1][size=85][indent=2]PROBATIONARY POLICE OFFICER\n{PPO_ADI}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,1,1][size=85][indent=2]SERİ NO.\n{PPO_SERI_NO}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2]DIVISION\n{DIVISION}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,1,1][size=85][indent=2]TARİH\n{TARIH_RAPOR}[/indent][/size][/tdwidth][/table]\n\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,3,1][size=85][indent=2]FIELD TRAINING OFFICER\n{FTO_ADI}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,1,1][size=85][indent=2]SERİ NO.\n{FTO_SERI_NO}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2]VARDİYA\n{VARDIYA}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,1,1][size=85][indent=2]GÖREVLENDİRME\n{GOREVLENDIRME}[/indent][/size][/tdwidth][/table]\n\n[/tdwidth][/table]\n\n" + criteriaTemplateBlocks + "\n\n[table=#d0dade,white][tr]\n[tdwidth=#ffffff,#ffffff,top,left,2,1][b]GENEL DEĞERLENDİRME[/b]\n\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2]AÇIKLAMA\n{GENEL_AIKLAMA}[/indent][/size][/tdwidth][/table]\n\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2]GENEL PERFORMANSI\n{GENEL_PERFORMANSI}[/indent][/size][/tdwidth][/table]\n\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,4,1][size=85][indent=2]FIELD TRAINING OFFICER İMZASI\n{FTO_IMZA_ADI}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,1,1][size=85][indent=2]SERİ NO.\n{FTO_IMZA_SERI_NO}[/indent][/size][/tdwidth][/table]\n\n[/tdwidth][/table]\n\n[table=#d0dade,white][tr]\n[tdwidth=#ffffff,#ffffff,top,left,2,1][b]AKTİVİTELER[/b]\n" + aktiviteRows + "\n[/tdwidth][/table]\n[size=75]Form 01.78.01 (07/25)[/size]"
  };
})();
