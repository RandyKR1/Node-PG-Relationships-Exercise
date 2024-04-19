const express = require("express");
const ExpressError = require("../expressError")
const db = require("../db");

const router = new express.Router();

router.get('/', async (req, res, next) =>{
    try{
        const results = await db.query(
            `SELECT id, comp_code FROM invoices ORDER BY id`)

        res.json({'Invoices': results.rows})
    }
    catch(e){
        return next(e)
    }
})

router.get('/:id', async (req, res, next) => {
    try{
        const { id } = req.params;
        const results = await db.query(
            `SELECT * 
            FROM invoices 
            WHERE id=$1`, [id])

        if (results.rows.length == 0) {
            throw new ExpressError(`Can't find Invoice with id: ${id}`, 404)
            }else {
                res.json({'Invoice': results.rows})
            }
    }
    catch(e){
        return next(e)
    }
})

router.post('/', async (req, res, next) => {
    try{
        const { comp_code, amt } = req.body;
        
        const results = await db.query(`
        INSERT INTO invoices (comp_code, amt)
        VALUES ($1, $2)
        RETURNING id, comp_code, amt, paid, add_date, paid_date`,
        [comp_code,amt]);

        res.status(201).json({'Invoice': results.rows});
    } catch(e){
        return next(e);
    }
})

router.put('/:id', async (req, res, next)=> {
    try{
        const {id} = req.params;
        const {amt} = req.body;

        const results = await db.query(
            `UPDATE invoices
            SET amt=$1
            WHERE id=$2
            RETURNING id, comp_code, amt, paid, add_date, paid_date`,
            [id, amt]);
    }
    catch(e){
        return next(e)
    }
})

router.delete('/:id', async (req, res, next)=>{
    try{
        const { id } = req.params;

        const results = await db.query(
            `DELTE FROM invoices
            WHERE id=$1
            RETURNING id`,
            [id]);

        if (results.rows.length == 0) {
            throw new ExpressError(`Can't find Invoice with id: ${id}`, 404)
            } else {
                return res.json({"status": "deleted"});
            }
    }
    catch(e){
        return next(e);
    }
})

module.exports = router;