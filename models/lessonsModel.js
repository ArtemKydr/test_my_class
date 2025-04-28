const db = require('../modules/postgres/db');
const _ = require('lodash');

class LessonModel {
    constructor() {
        this.view = 'lessons_view';
    }

    async findAll(filters, page = 1, perPage = 5) {
        const {
            date,
            status,
            teacherIds,
            studentsCount
        } = filters;

        const offset = (page - 1) * perPage;

        return db(this.view)
            .where(function() {
                if (!_.isUndefined(date) && !_.isEmpty(date)) {
                    if (date.length === 1) this.where({ date: date[0] });
                    if (date.length === 2) this.whereBetween('date', date);
                }
                if (!_.isUndefined(studentsCount)  && !_.isEmpty(studentsCount)) {
                    if (studentsCount.length === 1) this.where({ students_count: studentsCount[0] });
                    if (studentsCount.length === 2) this.whereBetween('students_count', studentsCount);
                }
                if (!_.isUndefined(teacherIds) && !_.isEmpty(teacherIds)) this.whereRaw('teacher_ids && ?', [teacherIds]);
                if (!_.isUndefined(status)) this.where({ status })
            })
            .offset(offset)
            .limit(perPage);

    }
}

module.exports = new LessonModel();
