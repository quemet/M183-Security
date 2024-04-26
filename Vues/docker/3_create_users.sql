-- Modifiez le fichier 3_create_users pour ajouter un utilisateur « teacher » qui ne puisse que consulter la vue v_studentsGrades.
DROP USER 'teacher'@'localhost';
CREATE USER 'teacher'@'localhost' IDENTIFIED BY 'teacher';
GRANT SELECT ON v_studentsGrades TO 'teacher'@'localhost';
GRANT SELECT ON v_studentsBadGrades TO 'teacher'@'localhost';