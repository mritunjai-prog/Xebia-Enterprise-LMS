package com.xebia.lms.users.event;

import com.xebia.lms.common.event.LmsEvent;
import com.xebia.lms.users.entity.ManagedUser;
import java.util.Map;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class UserEventPublisher {
    private final KafkaTemplate<String, LmsEvent> kafkaTemplate;
    public UserEventPublisher(KafkaTemplate<String, LmsEvent> kafkaTemplate) { this.kafkaTemplate = kafkaTemplate; }
    public void userCreated(ManagedUser user) {
        kafkaTemplate.send("lms.user.created", user.getId().toString(), LmsEvent.of("USER_CREATED", user.getTenantId(), null, "user-management-service",
                Map.of("managedUserId", user.getId().toString(), "iamUserId", user.getIamUserId().toString(), "userType", user.getUserType().name(), "email", user.getEmail())));
    }
}
