const rp = require('request-promise');
const months = ['Janruary', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function padNum(num, size) {
    var s = "0000" + num;
    return s.substr(s.length - size);
}

module.exports = (app) => {

    app.get('/admin1/main-table', [
    (req, res, next) => {
        rp({
        method: 'GET',
        uri: `${process.env.API_URI}allCourses`,
        simple: false,
        })
        .then((response) => {
            res.locals.apiResponse = JSON.parse(response);
            res.locals.apiResponse.sort((a, b) => {
                if (a.startDate < b.startDate) {
                    return -1;
                }
                if (a.startDate > b.startDate) {
                    return 1;
                }
                return 0;
            });
            res.locals.apiResponse.forEach((r) => {
                let sd = new Date(r.startDate);
                let ed = new Date(r.endDate);
                r.start = `${padNum(sd.getDate(), 2)}/${sd.getMonth() + 1}/${sd.getFullYear()}`;
                r.end = `${padNum(ed.getDate(), 2)}/${ed.getMonth() + 1}/${ed.getFullYear()}`;
            });
            next();
        });
    },
    (req, res, next) => {
        res.render('admin1/main-table');
    }]);

    app.get('/admin1/individual-course/:id', [
        (req, res, next) => {
            rp({
            method: 'GET',
            uri: `${process.env.API_URI}byId`,
            form: {
                id: req.params.id
            },
            simple: false,
            })
            .then((response) => {
                res.locals.course = JSON.parse(response);
                    let sd = new Date(res.locals.course.startDate);
                    let ed = new Date(res.locals.course.endDate);
                    res.locals.course.start = `${padNum(sd.getDate(), 2)}/${sd.getMonth() + 1}/${sd.getFullYear()}`;
                    res.locals.course.end = `${padNum(ed.getDate(), 2)}/${ed.getMonth() + 1}/${ed.getFullYear()}`;
                next();
            })
            .catch((error) => {
                console.log(error);
            });
        },
        (req, res, next) => {
            res.render('admin1/individual-course');
        }
    ]);

    app.post('/admin1/individual-course', [
        (req, res, next) => {
            res.redirect(`/admin1/individual-course/${req.body['table-form']}`);
        }
    ]);

    return app;
};
