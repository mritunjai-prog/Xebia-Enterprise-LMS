package com.xebia.lms.media.controller;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/videos")
public class MediaController {
    @PostMapping
    Map<String, Object> createVideoMetadata() {
        return Map.of("videoId", UUID.randomUUID(), "hlsStatus", "PENDING_TRANSCODE");
    }

    @GetMapping("/{id}/signed-url")
    Map<String, Object> signedUrl(@PathVariable UUID id) {
        return Map.of("videoId", id, "expiresAt", Instant.now().plusSeconds(300), "url", "s3://signed-url-placeholder");
    }
}
