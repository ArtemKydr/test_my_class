const yup = require('yup');

yup.addMethod(yup.array, 'list', function list(separator = ',') {
    return this.transform((val) => val.split(separator));
});
