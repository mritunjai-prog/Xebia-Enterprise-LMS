package com.xebia.lms.course.event;

import com.xebia.lms.common.event.LmsEvent;
import java.util.Map;
import java.util.UUID;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class CourseEventPublisher {
    private final KafkaTemplate<String, LmsEvent> kafkaTemplate;
    public CourseEventPublisher(KafkaTemplate<String, LmsEvent> kafkaTemplate) { this.kafkaTemplate = kafkaTemplate; }
    public void courseAssigned(UUID tenantId, UUID actorUserId, UUID courseId, UUID batchId, UUID studentId) {
        kafkaTemplate.send("lms.course.assigned", courseId.toString(), LmsEvent.of("COURSE_ASSIGNED", tenantId, actorUserId, "course-service",
                Map.of("courseId", courseId.toString(), "batchId", String.valueOf(batchId), "studentId", String.valueOf(studentId))));
    }
}
