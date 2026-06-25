package com.xebia.lms.assessment.entity;

import com.xebia.lms.common.domain.TenantScopedEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "submissions", schema = "assessment")
public class Submission extends TenantScopedEntity {
    @Column(nullable = false)
    private UUID assessmentId;

    @Column(nullable = false)
    private UUID studentId;

    private String submissionRef;

    private BigDecimal marks;

    private String evaluatorComment;

    public UUID getAssessmentId() { return assessmentId; }
    public void setAssessmentId(UUID assessmentId) { this.assessmentId = assessmentId; }
    public UUID getStudentId() { return studentId; }
    public void setStudentId(UUID studentId) { this.studentId = studentId; }
    public String getSubmissionRef() { return submissionRef; }
    public void setSubmissionRef(String submissionRef) { this.submissionRef = submissionRef; }
    public BigDecimal getMarks() { return marks; }
    public void setMarks(BigDecimal marks) { this.marks = marks; }
    public String getEvaluatorComment() { return evaluatorComment; }
    public void setEvaluatorComment(String evaluatorComment) { this.evaluatorComment = evaluatorComment; }
}
