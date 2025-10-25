# 🥤 DrinkHub - Ứng dụng đặt đồ uống

Ứng dụng web đặt đồ uống từ các cửa hàng xung quanh trường đại học với tính năng gửi thông tin đơn hàng qua Telegram bot.

## ✨ Tính năng

- 🏪 **Chọn cửa hàng**: Danh sách các cửa hàng đồ uống gần trường đại học
- 🍹 **Menu đa dạng**: Cà phê, trà sữa, sinh tố, nước ép
- 🛒 **Giỏ hàng thông minh**: Thêm/sửa/xóa sản phẩm dễ dàng
- 📱 **Responsive**: Giao diện đẹp trên mọi thiết bị
- 🤖 **Telegram Bot**: Tự động gửi thông tin đơn hàng qua Telegram
- 💳 **Thanh toán**: Form đặt hàng hoàn chỉnh

## 🚀 Cài đặt

### 1. Tải về và chạy ứng dụng

```bash
# Clone hoặc tải về các file
# Mở file index.html trong trình duyệt
```

### 2. Cấu hình Telegram Bot

#### Bước 1: Tạo Telegram Bot
1. Mở Telegram và tìm `@BotFather`
2. Gửi lệnh `/newbot`
3. Đặt tên cho bot (ví dụ: "DrinkHub Order Bot")
4. Đặt username cho bot (ví dụ: "drinkhub_order_bot")
5. Lưu lại **Bot Token** được cung cấp

#### Bước 2: Lấy Chat ID
1. Gửi tin nhắn cho bot vừa tạo
2. Truy cập: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
3. Tìm `"chat":{"id":` trong response và lưu lại số ID

#### Bước 3: Cập nhật cấu hình
Mở file `script.js` và thay đổi:

```javascript
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE'; // Thay bằng token của bạn
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID_HERE'; // Thay bằng chat ID của bạn
```

## 📁 Cấu trúc dự án

```
drinkhub/
├── index.html          # Trang chính
├── styles.css          # CSS styling
├── script.js           # JavaScript logic
└── README.md           # Hướng dẫn
```

## 🎨 Giao diện

- **Header**: Logo và giỏ hàng
- **Store Selection**: Danh sách cửa hàng với rating và thời gian giao hàng
- **Menu**: Danh mục sản phẩm với bộ lọc
- **Cart Sidebar**: Giỏ hàng với tổng tiền
- **Checkout Modal**: Form thông tin khách hàng
- **Success Modal**: Xác nhận đặt hàng thành công

## 🔧 Tùy chỉnh

### Thêm cửa hàng mới
Chỉnh sửa mảng `stores` trong `script.js`:

```javascript
const stores = [
    {
        id: 4,
        name: "Tên cửa hàng",
        description: "Mô tả cửa hàng",
        rating: 4.5,
        deliveryTime: "15-20 phút",
        location: "Địa điểm",
        menu: [
            {
                id: 11,
                name: "Tên sản phẩm",
                price: 25000,
                description: "Mô tả sản phẩm",
                category: "coffee", // coffee, tea, smoothie, juice
                image: "☕"
            }
        ]
    }
];
```

### Thêm danh mục mới
1. Thêm button trong HTML:
```html
<button class="category-btn" data-category="new-category">Tên danh mục</button>
```

2. Cập nhật CSS nếu cần
3. Thêm sản phẩm với category tương ứng

## 📱 Responsive Design

Ứng dụng được thiết kế responsive cho:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)

## 🤖 Telegram Integration

Khi khách hàng đặt hàng, thông tin sẽ được gửi đến Telegram với format:

```
🛍️ ĐƠN HÀNG MỚI

🏪 Cửa hàng: Café Sinh Viên
👤 Khách hàng: Nguyễn Văn A
📞 Số điện thoại: 0123456789
📍 Địa chỉ: Phòng 101, KTX ĐH Bách Khoa

📋 Chi tiết đơn hàng:
• ☕ Cà phê đen x2 - 30,000 ₫
• 🥛 Cà phê sữa x1 - 20,000 ₫

💰 Tổng cộng: 50,000 ₫
⏰ Thời gian: 15/12/2024, 14:30:25
```

## 🛠️ Công nghệ sử dụng

- **HTML5**: Cấu trúc trang web
- **CSS3**: Styling với Flexbox, Grid, Animations
- **JavaScript ES6+**: Logic xử lý
- **Telegram Bot API**: Gửi thông báo
- **Font Awesome**: Icons
- **Google Fonts**: Typography

## 📞 Hỗ trợ

Nếu gặp vấn đề:
1. Kiểm tra console browser (F12)
2. Xác nhận Bot Token và Chat ID đúng
3. Kiểm tra kết nối internet
4. Test với đơn hàng mẫu

## 🔄 Cập nhật

Để cập nhật dữ liệu:
1. Chỉnh sửa mảng `stores` trong `script.js`
2. Thêm/sửa sản phẩm trong menu
3. Cập nhật thông tin cửa hàng
4. Refresh trang để thấy thay đổi

---

**Lưu ý**: Đây là ứng dụng frontend thuần túy, không có cơ sở dữ liệu. Tất cả dữ liệu được lưu trong JavaScript và sẽ mất khi refresh trang.
