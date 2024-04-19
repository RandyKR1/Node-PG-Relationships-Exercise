const express = require('express')
const ExpressError = require('../expressError')
const db = require('../db');
const slugify = require('slugify');

const router = new express.Router();


router.get('/', async (res, req, next) => {
    try{
        const results = await db.query(
            `SELECT code, name 
            FROM companies 
            ORDER BY name`)
        return res.json({'Companies': results.rows})
    }
    catch(e){
        return next(e)
}
})


router.get('/:code', async (res, req, next) => {
    try{
        const { code } = req.params;
        const results = await db.query(
            `SELECT * 
            FROM companies 
            WHERE id = $1`, [code])
        
        res.json({'Company': results.rows})
            
        if (results.rows.length === 0) {
            throw new ExpressError(`Can't find Company with code: ${code}`, 404);
        }
    }
    catch(e){
        return next(e)
}
})


router.post('/', async (res, req, next) => {
    try{
        const { name, description } = req.body;

        results = await db.query(
            `INSERT INTO companies (code, name, description)
            VALUES ($1, $2, $3)
            RETURNING code, name, description`[code, name, description]);

        return res.status(201).json({'company': results.rows})
    }
    catch(e){
       return next(e)
    }
})


router.put('/:code', async (res, req, next) => {
    try{
        const { code } = req.params;
        const { name, description } = req.body;

        const results = await db.query(
            `UPDATE companies 
            SET name=$1, description=$2
            WHERE code=$3 
            RETURNING code, name, description`, [name,description,code]);

        if (results.rows.length === 0) {
            throw new ExpressError(`Can't find Company with code: ${code}`, 404);
        }else{
            results.json({'Company': results.rows[0]})
        }
    }
    catch(e){
        return next(e)
}
})


router.delete("/:code", async (req, res, next) => {
    try {
      const {code} = req.params;
  
      const results = await db.query(
            `DELETE FROM companies
             WHERE code=$1
             RETURNING code`,
          [code]);
  
      if (results.rows.length == 0) {
        throw new ExpressError(`Can't find Company with code: ${code}`, 404)
      } else {
        return res.json({"status": "deleted"});
      }
    }
  
    catch (err) {
      return next(err);
    }
  });


module.exports = router;