class Dictionary {
    constructor() {
        this.LessonType = {
            DONE: 'Проведено',
            UNDONE: 'Не проведено',
        };

        this.LessonStatus = {
            0: this.LessonType.UNDONE,
            1: this.LessonType.DONE,
        };
    }

    getStatusesList () {
        return Object.keys(this.LessonStatus);
    }
}

module.exports = new Dictionary();
