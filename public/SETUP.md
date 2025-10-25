# Hướng dẫn Setup Telegram Bot cho Vercel

## 1. Tạo Telegram Bot

1. Mở Telegram và tìm `@BotFather`
2. Gửi lệnh `/newbot`
3. Đặt tên cho bot (ví dụ: "DrinkHub Order Bot")
4. Đặt username cho bot (ví dụ: "drinkhub_order_bot")
5. Lưu lại **Bot Token** được cung cấp

## 2. Lấy Chat ID

### Cách 1: Sử dụng @userinfobot
1. Tìm `@userinfobot` trên Telegram
2. Gửi `/start` cho bot
3. Bot sẽ trả về Chat ID của bạn

### Cách 2: Thêm bot vào group
1. Tạo group mới hoặc sử dụng group có sẵn
2. Thêm bot vào group
3. Gửi tin nhắn bất kỳ trong group
4. Truy cập: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
5. Tìm `chat.id` trong response

## 3. Deploy lên Vercel

### Cách 1: Sử dụng Vercel CLI
```bash
# Cài đặt Vercel CLI
npm i -g vercel

# Login vào Vercel
vercel login

# Deploy project
vercel

# Thêm environment variables
vercel env add TELEGRAM_BOT_TOKEN
vercel env add TELEGRAM_CHAT_ID
```

### Cách 2: Sử dụng Vercel Dashboard
1. Truy cập [vercel.com](https://vercel.com)
2. Import project từ GitHub
3. Vào Settings > Environment Variables
4. Thêm các biến môi trường:
   - `TELEGRAM_BOT_TOKEN`: Token bot của bạn
   - `TELEGRAM_CHAT_ID`: Chat ID của bạn

## 4. Test Bot

1. Mở website đã deploy
2. Tạo đơn hàng test
3. Kiểm tra Telegram để xem thông báo

## 5. Cấu trúc Project

```
├── api/
│   └── send-telegram.js    # API route cho Telegram
├── index.html              # Trang chủ
├── styles.css             # CSS styles
├── script.js              # JavaScript logic
├── vercel.json            # Vercel config
└── SETUP.md               # Hướng dẫn này
```

## 6. Troubleshooting

### Lỗi "Telegram configuration missing"
- Kiểm tra environment variables đã được set chưa
- Đảm bảo tên biến đúng: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`

### Lỗi "Bot was blocked by the user"
- Bot cần được start trước khi gửi tin nhắn
- Gửi `/start` cho bot trước khi test

### Lỗi "Chat not found"
- Kiểm tra Chat ID có đúng không
- Đảm bảo bot đã được thêm vào chat/group

## 7. Security Notes

- Không commit Bot Token vào code
- Sử dụng environment variables
- Bot Token có quyền gửi tin nhắn, giữ bí mật
