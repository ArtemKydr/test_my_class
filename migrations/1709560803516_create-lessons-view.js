exports.up = pgm => {
    pgm.sql(`
CREATE OR REPLACE VIEW public.lessons_view AS
SELECT
    l.id,
    l.date,
    l.title,
    l.status,
    (SELECT COUNT(*) FROM lesson_students ls WHERE ls.lesson_id = l.id AND ls.visit = true) AS visit_count,
    (SELECT COUNT(*) FROM lesson_students ls WHERE ls.lesson_id = l.id) AS students_count,
    (SELECT JSON_AGG(JSON_BUILD_OBJECT(
        'id', s.id,
        'name', s.name,
        'visit', ls.visit
    ))
     FROM lesson_students ls
     JOIN students s ON s.id = ls.student_id
     WHERE ls.lesson_id = l.id
    ) AS students,
    (SELECT JSON_AGG(JSON_BUILD_OBJECT(
        'id', t.id,
        'name', t.name
    ))
     FROM lesson_teachers lt
     JOIN teachers t ON t.id = lt.teacher_id
     WHERE lt.lesson_id = l.id
    ) AS teachers,
    (SELECT ARRAY_AGG(t.id)
     FROM lesson_teachers lt
     JOIN teachers t ON t.id = lt.teacher_id
     WHERE lt.lesson_id = l.id
    ) AS teacher_ids
FROM lessons l;
  `);
};

exports.down = pgm => {
    pgm.sql('DROP VIEW IF EXISTS lessons_view');
};
