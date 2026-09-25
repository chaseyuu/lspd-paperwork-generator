# Rapor Oluşturucu

LSPD Tools ailesinin rapor oluşturma aracı. Yayındaki adres: https://chaseyuu.github.io/lspd-paperwork-generator/

## Oluşturucular

| Rapor | Klasör | Durum |
|---|---|---|
| Araç El Koyma Raporu | `arac-el-koyma-raporu/` | Hazır |
| İhlal Raporu | `ihlal-raporu/` | Hazır |
| Field Interview Kartı | `field-interview-karti/` | Hazır |
| Olay Raporu | `olay-raporu/` | Hazır |

## Nasıl çalışır

Her rapor klasöründe bir `form.js` dosyası bulunur. Bu dosya formun bölümlerini, alanlarını (etiket, örnek
yazı, açıklama, ipucu, seçenekler) ve raporun çıktı şablonunu tanımlar. Şablondaki `{ALAN_ANAHTARI}`
ifadeleri formdaki değerlerle değiştirilir. Formu ekrana çizen ve raporu oluşturan ortak kod
`assets/form-engine.js`, ek görünüm kuralları `assets/form.css` dosyasındadır. Çıktı formatı varsayılan
olarak HTML'dir; bir formun `form.js` dosyasında `"outputFormat": "bbcode"` ayarlanırsa (Field Interview
Kartı'nda olduğu gibi) çıktı ham BBCode metni olarak üretilir.

- **Oluştur** düğmesi raporu hazırlar; rapor başlığı ve raporun kaynak kodu gösterilir.
- **Raporu Kopyala** raporun kaynak kodunu (HTML veya BBCode), **Başlığı Kopyala** rapor başlığını panoya kopyalar.
- **Kanunlar** alanı Tutuklama Hesaplayıcı'daki suçlama menüsünün aynısıdır (`assets/penal-code.js`).
  Araç El Koyma Formu'nda 115 ve 400–500 arasındaki maddeler listelenir; **İhlal Ekle** ile birden fazla
  madde seçilebilir. Seçilen maddelerin yalnızca numaraları Ceza Kanunu alanına `401, 410` biçiminde yazılır.
- İhlal Türü kutucukları (Infraction, Misdemeanor, Felony) seçilen kanunların türüne göre otomatik
  işaretlenir ve elle değiştirilemez. Ceza Kanunu alanı da yalnızca Kanunlar menüsünden doldurulur.
- **Formu Düzenle** girilen bilgiler kaybolmadan forma geri döner.
- Personel Bilgisi, Seri No. ve Division alanları sağ üstte seçili karakterin bilgileriyle otomatik doldurulur.
  Karakter değiştirildiğinde bu alanlar da güncellenir; elle değiştirilen bir alana dokunulmaz.
- "Büyük harflerle yazın." açıklaması olan alanlar yazılırken otomatik olarak büyük harfe çevrilir.
- Elle yazılan metin alanları tarayıcının kayıtlı gerçek (OOC) verilerini (Chrome/Firefox'un adres,
  isim vb. bilgileri, şifre yöneticileri) hiçbir şekilde önermeyecek/doldurmayacak şekilde
  tasarlanmıştır: bu alanlar `type="search"` olarak işaretlenir (tarayıcılar kişisel bilgi
  otomatik doldurmasını `search` tipi alanlarda hiç uygulamaz — görünüşte normal bir metin
  kutusundan farksızdır) ve ayrıca kullanıcı tıklayana kadar salt okunur (`readonly`) kalır. Böylece
  karakterin Adı Soyadı, Adres Bilgisi gibi alanlarına gerçek (OOC) bilgilerin görünmesi/önerilmesi
  (tıklandığında bile) engellenir. Sağ üstteki karakterden otomatik doldurulan alanlar (Personel
  Bilgisi/Memur, Seri No., Division) bu kısıtlamadan etkilenmez.
- Genel Bilgiler'deki Tarih alanı bilgisayarın o günkü tarihiyle başlar.
- Boş bırakılan alanlar raporda `—` olarak yazılır.
- Her bölümün başlığı kendi kutusunun (panelin) dışında, üstünde gösterilir; kutular arasında makul
  boşluk bırakılır. Bu genel `assets/form-engine.js` davranışı olduğu için tüm raporlarda geçerlidir.
- Araç El Koyma Formu ve İhlal Raporu'nda **tüm alanlar zorunludur** (otomatik doldurulan/kilitli
  alanlar hariç). Boş bir alanla **Oluştur**'a basılırsa rapor oluşturulmaz; boş alanın kutusu
  turuncu ile vurgulanır ve altında "Bu alan zorunludur." (Kanunlar için "En az bir kanun
  seçmelisiniz.") uyarısı gösterilir. **Field Interview Kartı'nda alanlar zorunlu değildir**; boş
  bırakılan herhangi bir alan (seçmeli alanlar dahil) raporda otomatik olarak `—` yazılır ve
  **Oluştur** her durumda çalışır.
- **Açıklama** alanı, gerekli bilgiler (İhlal Tarih, İhlal Saati, Şüpheli Ad Soyadı, Plaka, Model, Kanunlar ve
  Kaç Gün Çekildi?) girildikçe canlı olarak yazılır (henüz girilmemiş kısımlar `{Alan}` şeklinde görünür); örneğin: *25 Eylül 2026 tarihinde, 1312'de Jonathan Mendez
  tarafından sürülen JBC123 plakalı, Scout model aracın, San Andreas Ceza Kanunu'nun 115. Kolluk Kuvvetlerinden
  Kaçmak (F), 401. Geçerli Bir Sürücü Lisansı Olmadan Araç Kullanma (M) ve 410. Hız İhlali (I) maddelerini ihlal
  etmesi üzerine 7 günlüğüne çekimi sağlandı.* Açıklama elle değiştirilirse otomatik yazım durur; kutu
  temizlenirse yeniden başlar.
- **Kaç Gün Çekildi?** alanı 1 ile 30 arasında bir sayı kabul eder.
- İhlal Raporu'nda **Kanunlar** menüsü yalnızca Infraction ve Misdemeanor türündeki maddeleri listeler
  (Felony maddeleri bu raporda seçilemez). Misdemeanor maddeler ayrıca 400–699 aralığı ile 110, 117,
  118, 119a, 119b, 125, 137 ve 138 maddeleriyle sınırlıdır; bu aralık ve listenin dışındaki
  Misdemeanor maddeler menüde görünmez. **Trafik** ve **Trafik Dışı** kutucukları elle işaretlenir
  (kilitli değildir); **Misdemeanor** kutucuğu ise kilitlidir ve yalnızca seçilen kanunlara göre
  otomatik işaretlenir: herhangi bir Misdemeanor madde seçildiğinde işaretlenir. İhlal Raporu'ndaki
  **Açıklama** alanı, seçilen kanunlardan **en az biri 400–499 aralığındaysa** canlı olarak otomatik
  yazılır (örn: *25 Eylül 2026 tarihinde, 1312'de Jonathan Mendez tarafından sürülen JBC123 plakalı,
  Scout model aracın, Sinner Street üzerinde - BURAYA KANUNU NASIL İHLAL ETTİĞİN KISACA KENDİNİZ
  YAZIN - San Andreas Ceza Kanunu'nun 410. Hız İhlali (I) maddesini ihlal etmesi üzerine para cezası
  uygulandı.*); İhlal Konumu yazılırken yalnızca kelimelerin ilk harfi büyük geçirilir (Sinner
  Street); "/" ile ayrılmış birden çok konum "ile" bağlacıyla yazılır (SINNER STREET / ATLEE STREET
  -> *Sinner Street ile Atlee Street*). Seçilen kanunların hiçbiri bu aralıkta değilse (örn. yalnızca
  bir Misdemeanor madde) açıklama hiç yazılmaz ve tamamen elle girilir. "BURAYA KANUNU NASIL İHLAL
  ETTİĞİN KISACA KENDİNİZ YAZIN" kısmı her durumda elle doldurulmalıdır; bu kısmı düzenlemek (veya
  kutuyu herhangi bir şekilde elle değiştirmek) otomatik yazımı durdurur, kutu temizlenirse yeniden
  başlar. İhlal Raporu'nun sonuç
  ekranında Araç El Koyma Formu'ndaki gibi bir rapor başlığı çıktısı yoktur; yalnızca raporun kaynak
  kodu gösterilir.
- **Field Interview Kartı** çıktısı HTML değil **BBCode**'dur (forum yazılımına doğrudan yapıştırılabilir).
  **Memur** (1.) ve onun **Seri No.**'su sağ üstte seçili karakterin bilgileriyle otomatik doldurulur
  (diğer formlardaki Personel Bilgisi ile aynı mekanizma); ikinci **Memur** ve onun **Seri No.**'su elle
  yazılır ve boş bırakılırsa (tek memur varsa) `—` olarak kutuda hazır gelir, gerekirse üzerine
  yazılabilir. **Görevlendirme** alanı Araç El Koyma Formu'ndakiyle aynı aramalı seçim listesidir.
  Diğer tüm alanlar da (Cinsiyet, Kişi Bilgisi ve Görevlendirme hariç, bunlar seçmelidir) elle
  doldurulur; boş bırakılırlarsa raporda `—` yazılır.
- **Olay Raporu** çıktısı da Field Interview Kartı gibi **BBCode**'dur ve **alanlar zorunlu değildir**;
  boş bırakılan herhangi bir alan raporda otomatik olarak `—` yazılır. Rapor No. varsayılan olarak
  `00000` ile, Personel Bilgileri'ndeki Adı Soyadı/Seri No./Division sağ üstte seçili karakterle,
  Tarih bilgisayarın o günkü tarihiyle otomatik doldurulur/başlar. **Olay Türü** (Araç Takibi, Silahlı
  Saldırı, Cinayet, Çete Bağlantılı, Narkotik, Hırsızlık, Trafik Kazası, Diğer) kendi kutusunda ayrı
  ayrı **checkbox** olarak işaretlenir; işaretlenen her kutu raporda `[cb]` yerine `[cbc]` olarak
  yazılır, işaretlenmeyenler `[cb]` (Hayır) kalır. **İlgili Kişi** bölümü tek bir kutu içinde, her
  kişiyi kendi ince kenarlıklı kartında gösterir (MDCPanel'deki "Involved People" kutu tasarımına
  benzer); varsayılan 2 kişiyle başlar, **Kişi Ekle** ile en fazla 5 kişiye kadar çoğaltılabilir.
  Her kişinin Adı Soyadı, İletişim Bilgisi ve Adresi kutuları boşken hazır olarak `—` gösterir;
  **Statü** varsayılan olarak **Hiçbiri**'dir. **Açıklama** bölümündeki Süreç kutucukları (Güç
  Kullanıldı, Tutuklama Yapıldı vb.) varsayılan olarak **Hayır**'dır. **Kanıtlar** bölümü varsayılan
  5 kanıt başlığı/içeriği çiftiyle başlar, **Kanıt Ekle** ile en fazla 10'a kadar çoğaltılabilir;
  **Kanıt Başlığı** artık serbest metin değil, forumda kullanılan 15 standart başlıktan (Olay Raporu,
  İfade Raporu, Evidence Locker Kaydı, CCTV/DICVS/BWV Görüntüsü, FSD İnceleme Raporları, APB, Coroner
  Raporu vb.) birini seçtiren aramalı bir seçim kutusudur; boş bırakılan çiftler raporda `—` olarak
  görünür. Bir kişi/kanıt eklendikten sonra yalnızca **en son eklenen** geri kaldırılabilir (böylece
  numaralandırma bozulmaz); kaldırma düğmesi sürekli görünmez, yalnızca ilgili kart/satırın üzerine
  gelindiğinde belirir.

## Ortak tasarım

Site kendi tema dosyasını taşımaz; üst çubuk, renkler, tema tercihi, ekran ölçeklemesi ve sağ üstteki karakter
seçici doğrudan LSPD Tools deposundan yüklenir:

- `/lspd-tools/assets/theme.css`
- `/lspd-tools/assets/prefs.js`
- `/lspd-tools/assets/character-switcher.js`
- `/lspd-tools/img/lspd.webp`

Bütün araçlar `chaseyuu.github.io` altında yayınlandığı için bu dosyalar ve çerezler ortaktır. LSPD Tools'ta yapılan
bir tasarım değişikliği bu sayfaya da otomatik olarak yansır.

## Yayınlama

Site statik HTML dosyalarından oluşur ve derleme gerektirmez. Depo ayarlarında **Settings → Pages** altında
kaynak olarak **Deploy from a branch**, dal olarak `main` ve klasör olarak `/ (root)` seçilmelidir.
