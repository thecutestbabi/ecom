// API route để gửi thông tin đơn hàng qua Telegram bot
export default async function handler(req, res) {
    // Chỉ cho phép POST request
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { order } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!order) {
            return res.status(400).json({ error: 'Order data is required' });
        }

        // Lấy thông tin bot từ environment variables
        const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
        const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

        if (!BOT_TOKEN || !CHAT_ID) {
            console.error('Missing Telegram configuration');
            return res.status(500).json({ error: 'Telegram configuration missing' });
        }

        // Format thông điệp cho Telegram
        const message = formatOrderMessage(order);

        // Gửi tin nhắn qua Telegram API
        const telegramResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });

        // Gửi ảnh chuyển khoản nếu có
        if (order.paymentMethod === 'transfer' && order.paymentScreenshot) {
            console.log('Attempting to send payment screenshot to Telegram...');
            
            try {
                // Format caption với thông tin đơn hàng
                const photoCaption = `📸 <b>XÁC NHẬN CHUYỂN KHOẢN</b>\n\n` +
                    `👤 <b>Khách hàng:</b> ${order.customer.name}\n` +
                    `📞 <b>SĐT:</b> ${order.customer.phone}\n` +
                    `💰 <b>Số tiền:</b> ${formatPrice(order.total)}\n` +
                    `🏪 <b>Cửa hàng:</b> ${order.store}\n` +
                    `⏰ <b>Thời gian:</b> ${order.timestamp}`;

                // Gửi text message với link tới ảnh thay vì gửi ảnh trực tiếp
                const messageWithPhoto = `${photoCaption}\n\n` +
                    `🔗 <b>Xem ảnh chuyển khoản:</b>\n` +
                    `<a href="${order.paymentScreenshot}">Click để xem ảnh</a>`;

                const photoResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: CHAT_ID,
                        text: messageWithPhoto,
                        parse_mode: 'HTML',
                        disable_web_page_preview: false
                    })
                });

                const photoResult = await photoResponse.json();
                
                if (!photoResponse.ok) {
                    console.error('Failed to send photo to Telegram:', photoResult);
                    
                    // Gửi thông báo lỗi qua text message
                    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            chat_id: CHAT_ID,
                            text: `⚠️ <b>LỖI GỬI ẢNH CHUYỂN KHOẢN</b>\n\n` +
                                  `Không thể gửi ảnh cho đơn hàng của: ${order.customer.name}\n` +
                                  `Lỗi: ${photoResult.description || 'Unknown error'}\n\n` +
                                  `Vui lòng yêu cầu khách hàng gửi lại ảnh qua SĐT: ${order.customer.phone}`,
                            parse_mode: 'HTML'
                        })
                    });
                } else {
                    console.log('Payment screenshot sent successfully to Telegram');
                }
            } catch (photoError) {
                console.error('Error sending photo to Telegram:', photoError);
                
                // Gửi thông báo lỗi
                try {
                    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            chat_id: CHAT_ID,
                            text: `⚠️ <b>LỖI NGHIÊM TRỌNG KHI GỬI ẢNH</b>\n\n` +
                                  `Đơn hàng: ${order.customer.name} - ${order.customer.phone}\n` +
                                  `Lỗi: ${photoError.message}`,
                            parse_mode: 'HTML'
                        })
                    });
                } catch (e) {
                    console.error('Failed to send error notification:', e);
                }
            }
        } else {
            console.log('No payment screenshot to send (payment method or screenshot missing)');
        }

        if (!telegramResponse.ok) {
            const errorData = await telegramResponse.json();
            console.error('Telegram API error:', errorData);
            return res.status(500).json({ 
                error: 'Failed to send message to Telegram',
                details: errorData.description 
            });
        }

        const telegramData = await telegramResponse.json();
        
        return res.status(200).json({ 
            success: true, 
            message: 'Order sent to Telegram successfully',
            telegram_message_id: telegramData.result.message_id
        });

    } catch (error) {
        console.error('Error sending to Telegram:', error);
        return res.status(500).json({ 
            error: 'Internal server error',
            details: error.message 
        });
    }
}

// Format thông điệp đơn hàng cho Telegram
function formatOrderMessage(order) {
    let message = `🛍️ <b>ĐƠN HÀNG MỚI</b>\n\n`;
    message += `🎓 <b>Trường:</b> ${order.university}\n`;
    message += `🏪 <b>Cửa hàng:</b> ${order.store}\n`;
    message += `👤 <b>Khách hàng:</b> ${order.customer.name}\n`;
    message += `📞 <b>Số điện thoại:</b> ${order.customer.phone}\n`;
    message += `📍 <b>Địa chỉ:</b> ${order.customer.address}\n`;
    
    if (order.customer.notes) {
        message += `📝 <b>Ghi chú:</b> ${order.customer.notes}\n`;
    }
    
    message += `\n📋 <b>Chi tiết đơn hàng:</b>\n`;
    
    order.items.forEach(item => {
        const totalPrice = item.price * item.quantity;
        message += `• ${item.image} ${item.name} x${item.quantity} - ${formatPrice(totalPrice)}\n`;
    });
    
    message += `\n━━━━━━━━━━━━━━━━━━━━\n`;
    message += `📦 <b>Tạm tính:</b> ${formatPrice(order.subtotal || order.total)}\n`;
    message += `🚚 <b>Phí ship:</b> ${formatPrice(order.shippingFee || 0)}\n`;
    message += `💰 <b>Tổng cộng:</b> ${formatPrice(order.total)}\n`;
    
    // Thêm phương thức thanh toán
    if (order.paymentMethod === 'transfer') {
        message += `💳 <b>Phương thức:</b> Chuyển khoản ✅\n`;
        if (order.paymentScreenshot) {
            message += `📸 <b>Trạng thái:</b> Đã gửi kèm ảnh xác nhận\n`;
        }
    } else {
        message += `💳 <b>Phương thức:</b> Thanh toán khi nhận hàng (COD)\n`;
    }
    
    message += `⏰ <b>Thời gian:</b> ${order.timestamp}`;
    
    return message;
}

// Format giá tiền
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}
