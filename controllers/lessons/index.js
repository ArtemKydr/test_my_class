const lessonModel = require('../../models/lessonsModel');
const yup = require('yup');
const dict = require('../../modules/dictionary');

class LessonsController {
    async getList(queryParams) {
        const Schema = yup.object({
            date: yup.array().of(yup.date()).list(),
            status: yup.string().oneOf(dict.getStatusesList()),
            teacherIds: yup.array().of(yup.number()).list(),
            studentsCount: yup.array().of(yup.number().positive()).list(),
            page: yup.number().integer().positive().min(1).default(1),
            lessonsPerPage: yup.number().integer().min(0).max(100).default(5),
        });

        const filters = await Schema.validate(queryParams);

        return lessonModel.findAll(filters, filters.page, filters.lessonsPerPage);
    }
}

module.exports = new LessonsController();
