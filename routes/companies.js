const express = require('express')
const ExpressError = require('../expressError')
const router = express.Router();
const db = require('../db');
const { route } = require('../app');



router.get('/', async (res, req, next) => {
    try{
        const results = await db.query(
            `SELECT code, name 
            FROM companies 
            ORDER BY name`)
        return res.json({companies: results.rows})
    }
    catch(e){
        return next(e)
}
})


router.get('/:code', async (res, req, next) => {
    try{
        const { code } = req.params;
        const results = await db.query(`SELECT * FROM companies WHERE id = $1`, [code])
        if (results.rows.length === 0) {
            throw new ExpressError(`Can't find Company with code: ${code}`, 404);
        }

    }
    catch(e){
        return next(e)
}
})


router.post('/', (res, req, next) => {
    try{}
    catch(e){
       return next(e)
    }
})


router.put('/companies', (res, req, next) => {
    try{}
    catch(e){
        return next(e)
}
})


router.delete('/companies', (res, req, next) => {
    try{}
    catch(e){
        return next(e)
}
})


module.exports = router;