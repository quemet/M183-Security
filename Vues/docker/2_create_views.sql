--	Une vue v_studentsGrades soit présente.
-- Cette vue affiche le nom et le prénom de l’étudiant, le cours évalué, la date d’évaluation et la note obtenue.

USE db_students;

CREATE VIEW v_studentsGrades AS 
SELECT stuName, stuFirstName, t_course.courName, t_evaluation.evaDate, t_evaluation.evaGrade 
FROM t_student 
JOIN t_evaluation ON t_student.idStudent = t_evaluation.idStudent 
JOIN t_course ON t_evaluation.idCourse = t_course.idCourse;

CREATE VIEW v_studentsBadGrades AS 
SELECT stuName, stuFirstName, t_course.courName, t_evaluation.evaDate, t_evaluation.evaGrade 
FROM t_student 
JOIN t_evaluation ON t_student.idStudent = t_evaluation.idStudent 
JOIN t_course ON t_evaluation.idCourse = t_course.idCourse
WHERE t_evaluation.evaGrade < 4.0;

CREATE VIEW v_absentStudents AS 
SELECT stuName, stuFirstName, t_reason.reaDescription, t_absence.absDate, t_absence.absPeriodStart, t_absence.absPeriodEnd
FROM t_student 
JOIN t_absence ON t_student.idStudent = t_absence.idStudent 
JOIN t_reason ON t_absence.idReason = t_reason.idReason;
