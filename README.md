# Rapor Oluşturucu

LSPD Tools ailesinin rapor oluşturma aracı. Yayındaki adres: https://chaseyuu.github.io/lspd-paperwork-generator/

## Oluşturucular

| Rapor | Klasör | Durum |
|---|---|---|
| Araç El Koyma Raporu | `arac-el-koyma-raporu/` | Hazır |
| İhlal Raporu | `ihlal-raporu/` | Hazır |

## Nasıl çalışır

Her rapor klasöründe bir `form.js` dosyası bulunur. Bu dosya formun bölümlerini, alanlarını (etiket, örnek
yazı, açıklama, ipucu, seçenekler) ve raporun HTML çıktı şablonunu tanımlar. Şablondaki `{ALAN_ANAHTARI}`
ifadeleri formdaki değerlerle değiştirilir. Formu ekrana çizen ve raporu oluşturan ortak kod
`assets/form-engine.js`, ek görünüm kuralları `assets/form.css` dosyasındadır.

- **Oluştur** düğmesi raporu hazırlar; rapor başlığı ve raporun kaynak kodu (HTML) gösterilir.
- **Raporu Kopyala** raporun HTML kodunu, **Başlığı Kopyala** rapor başlığını panoya kopyalar.
- **Kanunlar** alanı Tutuklama Hesaplayıcı'daki suçlama menüsünün aynısıdır (`assets/penal-code.js`).
  Araç El Koyma Formu'nda 115 ve 400–500 arasındaki maddeler listelenir; **İhlal Ekle** ile birden fazla
  madde seçilebilir. Seçilen maddelerin yalnızca numaraları Ceza Kanunu alanına `401, 410` biçiminde yazılır.
- İhlal Türü kutucukları (Infraction, Misdemeanor, Felony) seçilen kanunların türüne göre otomatik
  işaretlenir ve elle değiştirilemez. Ceza Kanunu alanı da yalnızca Kanunlar menüsünden doldurulur.
- **Formu Düzenle** girilen bilgiler kaybolmadan forma geri döner.
- Personel Bilgisi, Seri No. ve Division alanları sağ üstte seçili karakterin bilgileriyle otomatik doldurulur.
  Karakter değiştirildiğinde bu alanlar da güncellenir; elle değiştirilen bir alana dokunulmaz.
- "Büyük harflerle yazın." açıklaması olan alanlar yazılırken otomatik olarak büyük harfe çevrilir.
- Genel Bilgiler'deki Tarih alanı bilgisayarın o günkü tarihiyle başlar.
- Boş bırakılan alanlar raporda `—` olarak yazılır.
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
