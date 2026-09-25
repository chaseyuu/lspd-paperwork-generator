# Rapor Oluşturucu

LSPD Tools ailesinin rapor oluşturma aracı. Yayındaki adres: https://chaseyuu.github.io/lspd-paperwork-generator/

## Oluşturucular

| Rapor | Klasör | Durum |
|---|---|---|
| Araç El Koyma Raporu | `arac-el-koyma-raporu/` | Hazır |
| İhlal Raporu | `ihlal-raporu/` | Hazırlanıyor |

## Nasıl çalışır

Her rapor klasöründe bir `form.js` dosyası bulunur. Bu dosya formun bölümlerini, alanlarını (etiket, örnek
yazı, açıklama, ipucu, seçenekler) ve raporun HTML çıktı şablonunu tanımlar. Şablondaki `{ALAN_ANAHTARI}`
ifadeleri formdaki değerlerle değiştirilir. Formu ekrana çizen ve raporu oluşturan ortak kod
`assets/form-engine.js`, ek görünüm kuralları `assets/form.css` dosyasındadır.

- **Oluştur** düğmesi raporu hazırlar ve rapor başlığını gösterir.
- **Raporu Kopyala** raporun HTML kodunu, **Başlığı Kopyala** rapor başlığını panoya kopyalar.
- **Suçlama** alanı Tutuklama Hesaplayıcı'daki suçlama menüsünün aynısıdır (`assets/penal-code.js`).
  Araç El Koyma Formu'nda 115 ve 400–500 arasındaki maddeler listelenir; **Suçlama Ekle** ile birden fazla
  madde seçilebilir. Seçilen maddelerin yalnızca numaraları Ceza Kanunu alanına `401, 410` biçiminde yazılır.
- İhlal Türü kutucukları (Infraction, Misdemeanor, Felony) seçilen suçlamaların türüne göre otomatik
  işaretlenir ve elle değiştirilemez. Ceza Kanunu alanı da yalnızca Suçlama menüsünden doldurulur.
- **Formu Düzenle** girilen bilgiler kaybolmadan forma geri döner.
- Personel Bilgisi, Seri No. ve Division alanları sağ üstte seçili karakterin bilgileriyle otomatik doldurulur.
  Karakter değiştirildiğinde bu alanlar da güncellenir; elle değiştirilen bir alana dokunulmaz.
- "Büyük harflerle yazın." açıklaması olan alanlar yazılırken otomatik olarak büyük harfe çevrilir.
- Genel Bilgiler'deki Tarih alanı bilgisayarın o günkü tarihiyle başlar.

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
