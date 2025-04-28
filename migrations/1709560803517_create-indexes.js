exports.up = pgm => {
    // Индекс на поле lesson_id в таблице lesson_students (оставить)
    pgm.createIndex('lesson_students', 'lesson_id', {
        name: 'lesson_students_lesson_id_idx'
    });

    // Составной индекс (lesson_id, student_id) в lesson_students
    pgm.createIndex('lesson_students', ['lesson_id', 'student_id'], {
        name: 'lesson_students_lesson_id_student_id_idx'
    });

    // Индекс на поле lesson_id в таблице lesson_teachers (оставить)
    pgm.createIndex('lesson_teachers', 'lesson_id', {
        name: 'lesson_teachers_lesson_id_idx'
    });

    // Составной индекс (lesson_id, teacher_id) в lesson_teachers
    pgm.createIndex('lesson_teachers', ['lesson_id', 'teacher_id'], {
        name: 'lesson_teachers_lesson_id_teacher_id_idx'
    });

    // Индекс на поле status в таблице lessons (оставить)
    pgm.createIndex('lessons', 'status', {
        name: 'lessons_status_idx'
    });

    // Индекс на поле date в таблице lessons (оставить)
    pgm.createIndex('lessons', 'date', {
        name: 'lessons_date_idx'
    });
};

exports.down = pgm => {
    pgm.dropIndex('lesson_students', 'lesson_id');
    pgm.dropIndex('lesson_students', ['lesson_id', 'student_id']);
    pgm.dropIndex('lesson_teachers', 'lesson_id');
    pgm.dropIndex('lesson_teachers', ['lesson_id', 'teacher_id']);
    pgm.dropIndex('lessons', 'status');
    pgm.dropIndex('lessons', 'date');
};
