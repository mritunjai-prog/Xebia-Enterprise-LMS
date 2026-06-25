package com.xebia.lms.batch.event;

import com.xebia.lms.common.event.LmsEvent;
import java.util.Map;
import java.util.UUID;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class EnrolmentEventPublisher {
    private final KafkaTemplate<String, LmsEvent> kafkaTemplate;
    public EnrolmentEventPublisher(KafkaTemplate<String, LmsEvent> kafkaTemplate) { this.kafkaTemplate = kafkaTemplate; }
    public void enrolmentCreated(UUID tenantId, UUID actorUserId, UUID enrolmentId) {
        kafkaTemplate.send("lms.enrolment.created", enrolmentId.toString(), LmsEvent.of("ENROLMENT_CREATED", tenantId, actorUserId, "batch-enrolment-service", Map.of("enrolmentId", enrolmentId.toString())));
    }
}
