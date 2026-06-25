package com.xebia.lms.iam.event;

import com.xebia.lms.common.event.LmsEvent;
import java.util.Map;
import java.util.UUID;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class IamEventPublisher {
    private final KafkaTemplate<String, LmsEvent> kafkaTemplate;

    public IamEventPublisher(KafkaTemplate<String, LmsEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void roleChanged(UUID tenantId, UUID actorUserId, UUID roleId) {
        kafkaTemplate.send("lms.role.changed", roleId.toString(), LmsEvent.of(
                "ROLE_CHANGED",
                tenantId,
                actorUserId,
                "iam-service",
                Map.of("roleId", roleId.toString())
        ));
    }
}
