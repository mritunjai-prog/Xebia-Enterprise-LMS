package com.xebia.lms.notification.adapter;

import com.xebia.lms.notification.entity.NotificationEntity;
import org.springframework.stereotype.Component;

@Component
public class SmsAdapter implements NotificationAdapter {
    @Override public boolean supports(String channel) { return "SMS".equals(channel); }
    @Override public String send(NotificationEntity notification) { return "SMS_ADAPTER_STUB"; }
}
