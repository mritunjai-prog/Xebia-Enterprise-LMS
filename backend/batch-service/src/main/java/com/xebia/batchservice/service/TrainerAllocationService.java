package com.xebia.batchservice.service;

import com.xebia.batchservice.model.TrainerAllocation;
import com.xebia.batchservice.repository.TrainerAllocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TrainerAllocationService {

    @Autowired
    private TrainerAllocationRepository allocationRepository;

    @Autowired
    private BatchService batchService;

    public List<TrainerAllocation> getAllAllocations() {
        return allocationRepository.findAll();
    }

    public List<TrainerAllocation> getAllocations(String trainerId, String batchId, String courseId, String status) {
        if (trainerId != null) return allocationRepository.findByTrainerId(trainerId);
        if (batchId != null) return allocationRepository.findByBatchId(batchId);
        if (courseId != null) return allocationRepository.findByCourseId(courseId);
        if (status != null) return allocationRepository.findByStatus(status);
        return allocationRepository.findAll();
    }

    public Optional<TrainerAllocation> getAllocationById(String id) {
        return allocationRepository.findById(id);
    }

    public TrainerAllocation createAllocation(TrainerAllocation allocation) {
        allocation.setStatus(allocation.getStatus() != null ? allocation.getStatus() : "active");
        allocation.setAssignedAt(Instant.now().toString());
        TrainerAllocation saved = allocationRepository.save(allocation);

        // Update batch with trainer and course info
        try {
            batchService.updateBatchFields(allocation.getBatchId(), 
                allocation.getTrainerId(), allocation.getCourseId(),
                allocation.getAcademicSession(),
                allocation.getStartDate(), allocation.getEndDate());
        } catch (Exception e) {
            // Batch might not exist yet, that's okay
        }

        return saved;
    }

    public TrainerAllocation updateAllocation(String id, TrainerAllocation updated) {
        Optional<TrainerAllocation> existing = allocationRepository.findById(id);
        if (existing.isPresent()) {
            TrainerAllocation allocation = existing.get();
            if (updated.getTrainerId() != null) allocation.setTrainerId(updated.getTrainerId());
            if (updated.getBatchId() != null) allocation.setBatchId(updated.getBatchId());
            if (updated.getCourseId() != null) allocation.setCourseId(updated.getCourseId());
            if (updated.getAcademicSession() != null) allocation.setAcademicSession(updated.getAcademicSession());
            if (updated.getStatus() != null) allocation.setStatus(updated.getStatus());
            if (updated.getStartDate() != null) allocation.setStartDate(updated.getStartDate());
            if (updated.getEndDate() != null) allocation.setEndDate(updated.getEndDate());
            if (updated.getNotes() != null) allocation.setNotes(updated.getNotes());
            return allocationRepository.save(allocation);
        }
        return allocationRepository.save(updated);
    }

    public void deleteAllocation(String id) {
        allocationRepository.deleteById(id);
    }

    public List<TrainerAllocation> createBulkAllocations(List<TrainerAllocation> allocations) {
        for (TrainerAllocation allocation : allocations) {
            allocation.setStatus(allocation.getStatus() != null ? allocation.getStatus() : "active");
            allocation.setAssignedAt(Instant.now().toString());
        }
        return allocationRepository.saveAll(allocations);
    }

    public Map<String, Object> getDashboardSummary() {
        Map<String, Object> summary = new HashMap<>();
        summary.put("totalAllocations", allocationRepository.count());
        summary.put("activeAllocations", allocationRepository.countByStatus("active"));
        summary.put("completedAllocations", allocationRepository.countByStatus("completed"));
        summary.put("cancelledAllocations", allocationRepository.countByStatus("cancelled"));
        summary.put("activeTrainers", allocationRepository.countActiveTrainers());
        summary.put("assignedCourses", allocationRepository.countAssignedCourses());
        return summary;
    }

    public Map<String, Object> getAnalytics() {
        Map<String, Object> analytics = new HashMap<>();
        analytics.put("bySession", allocationRepository.countBySessionGrouped());
        analytics.put("byStatus", Map.of(
            "active", allocationRepository.countByStatus("active"),
            "completed", allocationRepository.countByStatus("completed"),
            "cancelled", allocationRepository.countByStatus("cancelled")
        ));
        return analytics;
    }
}
