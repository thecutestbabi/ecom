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
    
    message += `\n💰 <b>Tổng cộng:</b> ${formatPrice(order.total)}\n`;
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
