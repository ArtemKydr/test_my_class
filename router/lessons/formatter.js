const moment = require('moment');
const _ = require('underscore');

class Formatter {
  formatOne(item) {
    return {
      id: item.id,
      date: moment(item.date).format('YYYY-MM-DD'),
      title: item.title,
      status: _.isNumber(item.status) ? Number(item.status) : null,
      visitCount: _.isNumber(item.status) ? Number(item.visitCount) : null,
      students: item.students || [],
      teachers: item.teachers || [],
    };
  }

  formatList = (items) => {
    return items.map(user => this.formatOne(user));
  }
}


module.exports = new Formatter();
