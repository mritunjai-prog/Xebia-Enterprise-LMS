package com.xebia.batchservice.service;

import com.xebia.batchservice.model.Batch;
import com.xebia.batchservice.repository.BatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BatchService {
    @Autowired
    private BatchRepository batchRepository;

    public List<Batch> getAllBatches() {
        return batchRepository.findAll();
    }

    public Batch createBatch(Batch batch) {
        return batchRepository.save(batch);
    }

    public Batch updateBatch(String id, Batch updated) {
        Optional<Batch> existing = batchRepository.findById(id);
        if (existing.isPresent()) {
            Batch batch = existing.get();
            if (updated.getName() != null) batch.setName(updated.getName());
            if (updated.getCourse() != null) batch.setCourse(updated.getCourse());
            if (updated.getStatus() != null) batch.setStatus(updated.getStatus());
            if (updated.getStudents() != null) batch.setStudents(updated.getStudents());
            if (updated.getStudentCount() != null) batch.setStudentCount(updated.getStudentCount());
            if (updated.getIcon() != null) batch.setIcon(updated.getIcon());
            if (updated.getTrainerId() != null) batch.setTrainerId(updated.getTrainerId());
            if (updated.getCourseId() != null) batch.setCourseId(updated.getCourseId());
            if (updated.getAcademicSession() != null) batch.setAcademicSession(updated.getAcademicSession());
            if (updated.getStartDate() != null) batch.setStartDate(updated.getStartDate());
            if (updated.getEndDate() != null) batch.setEndDate(updated.getEndDate());
            if (updated.getMaxStudents() != null) batch.setMaxStudents(updated.getMaxStudents());
            if (updated.getCreatedBy() != null) batch.setCreatedBy(updated.getCreatedBy());
            if (updated.getCreatedByName() != null) batch.setCreatedByName(updated.getCreatedByName());
            return batchRepository.save(batch);
        }
        return batchRepository.save(updated);
    }

    public void updateBatchFields(String batchId, String trainerId, String courseId,
                                   String academicSession,
                                   String startDate, String endDate) {
        Optional<Batch> existing = batchRepository.findById(batchId);
        if (existing.isPresent()) {
            Batch batch = existing.get();
            if (trainerId != null) batch.setTrainerId(trainerId);
            if (courseId != null) batch.setCourseId(courseId);
            if (academicSession != null) batch.setAcademicSession(academicSession);
            if (startDate != null) batch.setStartDate(startDate);
            if (endDate != null) batch.setEndDate(endDate);
            batchRepository.save(batch);
        }
    }

    public void deleteBatch(String id) {
        batchRepository.deleteById(id);
    }
}
