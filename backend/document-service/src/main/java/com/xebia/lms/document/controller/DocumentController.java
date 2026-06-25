package com.xebia.lms.document.controller;

import java.util.Map;
import java.util.UUID;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class DocumentController {
    @PostMapping("/generate")
    Map<String, Object> generate() {
        return Map.of("documentId", UUID.randomUUID(), "engine", "JasperReports", "formats", "PDF,XLSX,DOCX");
    }
}
