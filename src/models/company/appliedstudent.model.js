//const { EmptyResultError } = require('sequelize/types');
const db = require('../../../config/db_config');

const postfetch = function(fetchData) {
    this.apply_id = fetchData.apply_id,
        this.p_id = fetchData.p_id,
        this.cmp_id = fetchData.cmp_id,
        this.stud_id = fetchData.stud_id,
        this.apply_id = fetchData.apply_id,
        this.status = fetchData.status,
        this.curr_time = fetchData.curr_time,
        this.stud_name = fetchData.stud_name,
        this.title = fetchData.title,
        this.start_date = fetchData.start_date,
        this.curr_date = fetchData.curr_date
}

postfetch.enterData = function(cmp_id, result) {

    console.log('in student applied model:', cmp_id)
    let sql = 'select p.title, s.stud_name, s.stud_id, p.start_date, a.curr_time, p.curr_date, a.status, a.apply_id from apply a INNER join student s on a.stud_id=s.stud_id INNER join post_intern p on p.p_id = a.p_id INNER join company c on a.cmp_id = c.cmp_id where a.cmp_id = ?';

    var test = db.query(sql, cmp_id, (err, res) => {
        //console.log(res);
        if (err) {
            result(err, null);
        } else {

            result(null, res);
        }
    })
    console.log(test.sql);
}

postfetch.changestatus = function(cmp_id, result) {
    console.log('date in model:', cmp_id);
    const sql = 'update apply set status = 2 where curr_time < CURRENT_DATE - 7 && status = 0 && cmp_id = ?';
    db.query(sql, cmp_id, (err, res) => {
        console.log(res);
        if (err) {
            console.log('error in update:', err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

postfetch.fetchdate = function(id, result) {
    console.log('id in model:', id);
    const sql = 'select a.curr_time from apply a INNER join student s on a.stud_id=s.stud_id INNER join post_intern p on p.p_id = a.p_id INNER join company c on a.cmp_id = c.cmp_id where a.cmp_id = ?';

    db.query(sql, id, (err, res) => {
        console.log(res);
        if (err) {
            console.log('error while fetching date in apply:', err);
            result(err, null);
        } else {
            result(null, res);
        }
    })
}

module.exports = postfetch;