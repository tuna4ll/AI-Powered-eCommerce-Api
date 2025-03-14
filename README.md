# AI-Powered-eCommerce-Api
A modern and scalable e-commerce REST API with AI-powered product recommendations.

## E-ticaret Sistemi:

- GET /products: Tüm ürünleri listeleyen API.
- POST /products: Adminlerin ürün ekleyebileceği API.
- GET /cart: Kullanıcının sepetini görüntülemesi.
- POST /cart: Kullanıcıların sepete ürün eklemeleri.
- POST /orders: Sipariş oluşturma API'si.
- GET /orders: Kullanıcıların siparişlerini görüntülemeleri.

## AI-powered Öneri Sistemi:

Kullanıcıların önceki alışverişlerine göre ürün önerileri yapılır.
Bu öneri, sadece basit kategorilerle (örneğin, "electronics") yapılmış, ancak burayı gerçek makine öğrenmesi algoritmaları ile entegre edebilirsin.

## JWT Authentication:

API’ye erişimi kullanıcı doğrulamasıyla sağlıyoruz. Token tabanlı kimlik doğrulama yapılıyor.

## Makine Öğrenmesi Entegrasyonu:

Öneri sistemi için basit bir placeholder ekledik, ancak buraya gerçek bir model ekleyebilir ve kullanıcı alışveriş geçmişine göre öneri yapabilirsin (TensorFlow.js veya başka bir ML kütüphanesi ile).
