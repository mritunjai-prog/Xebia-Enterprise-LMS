package com.xebia.lms.notification.adapter;

import com.xebia.lms.notification.entity.NotificationEntity;
import org.springframework.stereotype.Component;

@Component
public class WhatsAppAdapter implements NotificationAdapter {
    @Override public boolean supports(String channel) { return "WHATSAPP".equals(channel); }
    @Override public String send(NotificationEntity notification) { return "WHATSAPP_ADAPTER_STUB"; }
}
