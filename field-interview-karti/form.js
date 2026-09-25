/* Field Interview Kartı: alanlar ve çıktı şablonu (BBCode). */
window.REPORT_FORM = {
  "emptyValue": "—",
  "title": "Field Interview Kartı",
  "titleTemplate": "{ADI_SOYADI_1593E71} - {TARIH_89ZX5M}",
  "outputFormat": "bbcode",
  "sections": [
    {
      "title": "Kişi Bilgileri",
      "cols": 3,
      "fields": [
        {
          "key": "ADI_SOYADI_1593E71",
          "label": "Adı Soyadı",
          "type": "text",
          "placeholder": "Adı Soyadı",
          "hint": "Büyük harflerle doldurun.",
          "upper": "en"
        },
        {
          "key": "TAKMA_ADI_170G07T",
          "label": "Takma Adı",
          "type": "text",
          "placeholder": "Takma Adı",
          "hint": "Büyük harflerle doldurun.",
          "upper": "en"
        },
        {
          "key": "CINSIYET_623WJNO",
          "label": "Cinsiyet",
          "type": "select",
          "values": [
            {
              "label": "Erkek",
              "value": "[cbC] Erkek[color=#FFFFFF]___[/color][cb] Kadın"
            },
            {
              "label": "Kadın",
              "value": "[cb] Erkek[color=#FFFFFF]___[/color][cbC] Kadın"
            },
            {
              "label": "Hiçbiri",
              "value": "[cb] Erkek[color=#FFFFFF]___[/color][cb] Kadın"
            }
          ],
          "default": "[cbC] Erkek[color=#FFFFFF]___[/color][cb] Kadın"
        },
        {
          "key": "ADRES_BILGISI_173EJOS",
          "label": "Adres Bilgisi",
          "type": "text",
          "placeholder": "İkametgah Adresi",
          "hint": "Büyük harflerle doldurun.",
          "tooltip": "İkametgah adresini girin.",
          "upper": "en"
        },
        {
          "key": "LETIIM_BILGISI_610HXQS",
          "label": "İletişim Bilgisi",
          "type": "text",
          "placeholder": ""
        },
        {
          "key": "KII_BILGISI_1495W4M",
          "label": "Kişi Bilgisi",
          "type": "select",
          "span": "all",
          "search": true,
          "placeholder": "Seçim Yapın",
          "tooltip": "FI Kartlarının temel amacı, doğru bilgileri kayıt etmektir. Memurlar hiçbir şekilde kişisel düşüncelerini veya fikirlerini kayıt etmeyeceklerdir.",
          "default": "[cb] Mağdur [color=#FFFFFF]___[/color][cb] Tanık [color=#FFFFFF]___[/color][cb] Evsiz [color=#FFFFFF]___[/color][cb] Çete Aktivitesi [color=#FFFFFF]___[/color][cb] Şartlı Tahliyede [color=#FFFFFF]___[/color][cb] Denetimli Serbestlik [color=#FFFFFF]___[/color][cb] Sicil Kaydı Bulunuyor",
          "values": [
            {
              "label": "Mağdur",
              "value": "[cbC] Mağdur [color=#FFFFFF]___[/color][cb] Tanık [color=#FFFFFF]___[/color][cb] Evsiz [color=#FFFFFF]___[/color][cb] Çete Aktivitesi [color=#FFFFFF]___[/color][cb] Şartlı Tahliyede [color=#FFFFFF]___[/color][cb] Denetimli Serbestlik [color=#FFFFFF]___[/color][cb] Sicil Kaydı Bulunuyor"
            },
            {
              "label": "Tanık",
              "value": "[cb] Mağdur [color=#FFFFFF]___[/color][cbC] Tanık [color=#FFFFFF]___[/color][cb] Evsiz [color=#FFFFFF]___[/color][cb] Çete Aktivitesi [color=#FFFFFF]___[/color][cb] Şartlı Tahliyede [color=#FFFFFF]___[/color][cb] Denetimli Serbestlik [color=#FFFFFF]___[/color][cb] Sicil Kaydı Bulunuyor"
            },
            {
              "label": "Evsiz",
              "value": "[cb] Mağdur [color=#FFFFFF]___[/color][cb] Tanık [color=#FFFFFF]___[/color][cbC] Evsiz [color=#FFFFFF]___[/color][cb] Çete Aktivitesi [color=#FFFFFF]___[/color][cb] Şartlı Tahliyede [color=#FFFFFF]___[/color][cb] Denetimli Serbestlik [color=#FFFFFF]___[/color][cb] Sicil Kaydı Bulunuyor"
            },
            {
              "label": "Çete Aktivitesi",
              "value": "[cb] Mağdur [color=#FFFFFF]___[/color][cb] Tanık [color=#FFFFFF]___[/color][cb] Evsiz [color=#FFFFFF]___[/color][cbC] Çete Aktivitesi [color=#FFFFFF]___[/color][cb] Şartlı Tahliyede [color=#FFFFFF]___[/color][cb] Denetimli Serbestlik [color=#FFFFFF]___[/color][cb] Sicil Kaydı Bulunuyor"
            },
            {
              "label": "Şartlı Tahliyede",
              "value": "[cb] Mağdur [color=#FFFFFF]___[/color][cb] Tanık [color=#FFFFFF]___[/color][cb] Evsiz [color=#FFFFFF]___[/color][cb] Çete Aktivitesi [color=#FFFFFF]___[/color][cbC] Şartlı Tahliyede [color=#FFFFFF]___[/color][cb] Denetimli Serbestlik [color=#FFFFFF]___[/color][cb] Sicil Kaydı Bulunuyor"
            },
            {
              "label": "Denetimli Serbestlik",
              "value": "[cb] Mağdur [color=#FFFFFF]___[/color][cb] Tanık [color=#FFFFFF]___[/color][cb] Evsiz [color=#FFFFFF]___[/color][cb] Çete Aktivitesi [color=#FFFFFF]___[/color][cb] Şartlı Tahliyede [color=#FFFFFF]___[/color][cbC] Denetimli Serbestlik [color=#FFFFFF]___[/color][cb] Sicil Kaydı Bulunuyor"
            },
            {
              "label": "Sicil Kaydı Bulunuyor",
              "value": "[cb] Mağdur [color=#FFFFFF]___[/color][cb] Tanık [color=#FFFFFF]___[/color][cb] Evsiz [color=#FFFFFF]___[/color][cb] Çete Aktivitesi [color=#FFFFFF]___[/color][cb] Şartlı Tahliyede [color=#FFFFFF]___[/color][cb] Denetimli Serbestlik [color=#FFFFFF]___[/color][cbC] Sicil Kaydı Bulunuyor"
            },
            {
              "label": "Hiçbiri",
              "value": "[cb] Mağdur [color=#FFFFFF]___[/color][cb] Tanık [color=#FFFFFF]___[/color][cb] Evsiz [color=#FFFFFF]___[/color][cb] Çete Aktivitesi [color=#FFFFFF]___[/color][cb] Şartlı Tahliyede [color=#FFFFFF]___[/color][cb] Denetimli Serbestlik [color=#FFFFFF]___[/color][cb] Sicil Kaydı Bulunuyor"
            }
          ]
        }
      ]
    },
    {
      "title": "Olay Bilgisi",
      "cols": 3,
      "fields": [
        {
          "key": "EK_BILGI_504UAJM",
          "label": "Ek Bilgi",
          "type": "textarea",
          "rows": 6,
          "span": "all",
          "tooltip": "Açıklama kısmı içerisinde kişilerin beyanlarını aktarabilirsiniz. Harici olarak kişinin elektronik posta adresi, sosyal medya hesapları veya görüşülen diğer kişilere ait çeşitli bilgilere de yer verebilirsiniz.",
          "placeholder": "John Doe, 11 Temmuz 2025 tarihinde, 2230'da Hawick Avenue'de aracıyla seyir ederken Alta Place kesişiminde siyah üst giyimli, beyaz alt giyimli, beyaz spor ayakkabılı, genç yaşlardaki beyaz bir erkeğin elindeki tabancayla bir kişinin peşinden koşturduğunu gördüğünü belirtti."
        },
        {
          "key": "TARIH_89ZX5M",
          "label": "Tarih",
          "type": "date",
          "today": true
        },
        {
          "key": "SAAT_105U7AE",
          "label": "Saat",
          "type": "time"
        },
        {
          "key": "KONUM_176N7PI",
          "label": "Konum",
          "type": "text",
          "hint": "Büyük harflerle doldurun.",
          "tooltip": "FI Kartın doldurulduğu adresi girin.",
          "upper": "en"
        }
      ]
    },
    {
      "title": "Memur Bilgisi",
      "cols": 3,
      "fields": [
        {
          "key": "MEMUR_202DY12",
          "label": "Memur",
          "type": "text",
          "placeholder": "Adı Soyadı",
          "hint": "Büyük harflerle doldurun.",
          "upper": "en",
          "prefill": "name"
        },
        {
          "key": "SERI_NO_206CVET",
          "label": "Seri No.",
          "type": "text",
          "placeholder": "00000",
          "prefill": "badge"
        },
        {
          "key": "MEMUR_210A0SW",
          "label": "Memur",
          "type": "text",
          "placeholder": "Adı Soyadı",
          "hint": "Büyük harflerle doldurun.",
          "upper": "en",
          "default": "—"
        },
        {
          "key": "SERI_NO_214NCC8",
          "label": "Seri No.",
          "type": "text",
          "placeholder": "00000",
          "default": "—"
        },
        {
          "key": "DIVISION_10SBD3",
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
          "key": "GREVLENDIRME_602AO4K",
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
        }
      ]
    }
  ],
  "template": "[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,3,1][size=85][indent=2]ADI SOYADI\n{ADI_SOYADI_1593E71}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2]TAKMA ADI\n{TAKMA_ADI_170G07T}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2]CİNSİYET\n{CINSIYET_623WJNO}[/indent][/size][/tdwidth][/table]\n\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,6,1][size=85][indent=2]ADRES BİLGİSİ\n{ADRES_BILGISI_173EJOS}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,3,1][size=85][indent=2]İLETİŞİM BİLGİSİ\n{LETIIM_BILGISI_610HXQS}[/indent][/size][/tdwidth]\n[/table]\n\n\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,4,1][size=85][indent=2]KİŞİ BİLGİSİ\n{KII_BILGISI_1495W4M}[/indent][/size]\n[/tdwidth][/table]\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,7,1][size=85][indent=2][b][center]EK BİLGİ: ELEKTRONİK POSTA ADRESİ, SOSYAL MEDYA HESAPLARI, DİĞER KİŞİLER[/center][/b][/indent][/size][/tdwidth][/table]\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,10,1][size=85][indent=2]{EK_BILGI_504UAJM}\n[/indent][/size][/tdwidth][/table]\n\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2]TARİH\n{TARIH_89ZX5M}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,1,1][size=85][indent=2]SAAT\n{SAAT_105U7AE}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,4,1][size=85][indent=2]KONUM\n{KONUM_176N7PI}[/indent][/size][/tdwidth]\n[/table]\n\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2]MEMUR\n{MEMUR_202DY12}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,1,1][size=85][indent=2]SERİ NO.\n{SERI_NO_206CVET}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2]MEMUR\n{MEMUR_210A0SW}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,1,1][size=85][indent=2]SERİ NO.\n{SERI_NO_214NCC8}[/indent][/size][/tdwidth]\n[/table]\n\n[table=#d0dade,white][tr]\n[tdwidth=#d0dade,#ffffff,top,left,1,1][size=85][indent=2][b]FIELD INTERVIEW[/b]\n15.43.00 (06/25)[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2]DIVISION\n{DIVISION_10SBD3}[/indent][/size][/tdwidth]\n[tdwidth=#d0dade,#ffffff,top,left,2,1][size=85][indent=2]GÖREVLENDİRME\n{GREVLENDIRME_602AO4K}[/indent][/size][/tdwidth]\n[/table]"
};
