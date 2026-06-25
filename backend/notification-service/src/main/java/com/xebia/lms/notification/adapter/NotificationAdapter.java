package com.xebia.lms.notification.adapter;

import com.xebia.lms.notification.entity.NotificationEntity;

public interface NotificationAdapter {
    boolean supports(String channel);
    String send(NotificationEntity notification);
}
