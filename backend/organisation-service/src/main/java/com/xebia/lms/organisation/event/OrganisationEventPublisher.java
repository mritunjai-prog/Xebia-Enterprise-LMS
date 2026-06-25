package com.xebia.lms.organisation.event;

import com.xebia.lms.common.event.LmsEvent;
import java.util.Map;
import java.util.UUID;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class OrganisationEventPublisher {
    private final KafkaTemplate<String, LmsEvent> kafkaTemplate;

    public OrganisationEventPublisher(KafkaTemplate<String, LmsEvent> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void universityCreated(UUID tenantId, UUID actorUserId, UUID universityId, String contactEmail) {
        kafkaTemplate.send("lms.university.created", universityId.toString(), LmsEvent.of(
                "UNIVERSITY_CREATED",
                tenantId,
                actorUserId,
                "organisation-service",
                Map.of("universityId", universityId.toString(), "officialContactEmail", contactEmail)
        ));
    }
}
