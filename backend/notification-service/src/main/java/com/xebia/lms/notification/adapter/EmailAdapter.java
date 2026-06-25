package com.xebia.lms.notification.adapter;

import com.xebia.lms.notification.entity.NotificationEntity;
import org.springframework.stereotype.Component;

@Component
public class EmailAdapter implements NotificationAdapter {
    @Override public boolean supports(String channel) { return "EMAIL".equals(channel); }
    @Override public String send(NotificationEntity notification) { return "EMAIL_ADAPTER_STUB"; }
}
