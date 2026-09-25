# Rapor Oluşturucu

LSPD Tools ailesinin rapor oluşturma aracı. Yayındaki adres: https://chaseyuu.github.io/lspd-paperwork-generator/

## Oluşturucular

| Rapor | Klasör | Durum |
|---|---|---|
| Araç El Koyma Raporu | `arac-el-koyma-raporu/` | Hazırlanıyor |
| İhlal Raporu | `ihlal-raporu/` | Hazırlanıyor |

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
