const BaseRouter = require('../../modules/app/BaseRouter');
const lessonsController = require('../../controllers/lessons');
const { formatList } = require('./formatter');

class LessonsRouter extends BaseRouter {
    constructor() {
        super();
    }

    initRoutes() {
        this.router.get('/', this.getLessonsList);
    }

    /**
     * @api {get} /api/lessons/ Список занятий
     * @apiName LessonsList
     * @apiGroup Lessons
     * @apiVersion 0.1.0
     * @apiDescription Получить список занятий c учетом фильтров и пагинации
     *
     * @apiParam {String} [date] Либо одна дата в формате YYYY-MM-DD, либо две в таком же формате через запятую (например, «2019-01-01,2019-09-01» ПОРЯДОК ДАТ ВАЖЕН!)
     * @apiParam {Number} [status] Статус занятия (0 - не проведено, 1 - проведено)
     * @apiParam {String} [teacherIds] Идентификаторы учителей через запятую (выбираются все занятия, которые ведет хотя бы один из указанных учителей)
     * @apiParam {Number} [studentsCount] Количество записанных на занятия учеников (одно число - строгое сравнение, 2 числа через запятую - выборка в диапазоне, включительно)
     * @apiParam {Number} [page=1] Страница
     * @apiParam {Number} [lessonsPerPage=5] Количество элементов на странице (мин - 0, макс - 100)
     *
     * @apiExample Пример Curl-запроса:
     * curl --location 'http://localhost:3000/api/lessons?date=2019-01-01,2019-09-02&status=1&teacherIds=1,3&studentsCount=1,2&lessonsPerPage=100' \
     *
     * @apiSuccessExample Успешный ответ:
     *     HTTP/1.1 200 OK
     * {
     *     "data": [
     *         {
     *             "id": 6,
     *             "date": "2019-05-15",
     *             "title": "Red Color",
     *             "status": 1,
     *             "visitCount": 0,
     *             "students": [
     *                 {
     *                     "id": 1,
     *                     "name": "Ivan",
     *                     "visit": false
     *                 },
     *                 {
     *                     "id": 3,
     *                     "name": "Maxim",
     *                     "visit": false
     *                 }
     *             ],
     *             "teachers": [
     *                 {
     *                     "id": 3,
     *                     "name": "Angelina"
     *                 }
     *             ]
     *         },
     *         {
     *             "id": 9,
     *             "date": "2019-06-20",
     *             "title": "Yellow Color",
     *             "status": 1,
     *             "visitCount": 0,
     *             "students": [
     *                 {
     *                     "id": 2,
     *                     "name": "Sergey",
     *                     "visit": false
     *                 }
     *             ],
     *             "teachers": [
     *                 {
     *                     "id": 3,
     *                     "name": "Angelina"
     *                 }
     *             ]
     *         }
     *     ],
     *     "total": 2,
     *     "success": true
     * }
     *
     * @apiErrorExample Ошибка, связанная с БД:
     *     HTTP/1.1 400 OK
     *     {
     *       "success": false,
     *       "error": "DB error. Code: 42P01"
     *     }
     */
    async getLessonsList(req, res) {
        const list = await lessonsController.getList(req.query);
        const data = formatList(list);

        res.sendSuccess({ data, total: data.length });
    }
}

module.exports = new LessonsRouter();
