package com.xebia.lms.engagement.controller;

import java.util.Map;
import java.util.UUID;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class EngagementController {
    @PostMapping("/comments")
    Map<String, Object> createComment() {
        return Map.of("commentId", UUID.randomUUID(), "threadedReplies", true);
    }

    @PostMapping("/feedback")
    Map<String, Object> trainerFeedback() {
        return Map.of("feedbackId", UUID.randomUUID(), "routeTo", "MANAGER");
    }
}
