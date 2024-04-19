const express = require('express')
const ExpressError = require('../expressError')
const router = express.Router();
const db = require('../db');
const { route } = require('../app');




router.get('/', (res, req, next) => {
    try{}
    catch(e){
        return next(e)
}
})


router.get('/:code', (res, req, next) => {
    try{}
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