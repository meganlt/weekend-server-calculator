const express = require( 'express' );
const calculationsRouter = require( 'express' ).Router();
const calculationsModule = require( '../modules/calculations' );

calculationsRouter.get( '/', (req, res)=>{
    console.log( '/calculations GET' );
    res.send( calculationsModule.all );
})

calculationsRouter.get( '/recent', (req, res)=>{
    console.log( '/calculations/recent GET' );
    res.send( calculationsModule.recent() );
})

calculationsRouter.post('/', (req, res)=>{
    console.log( '/calculations POST', req.body );
    let responseObject = req.body;
    let operator = req.body.operator;
    console.log(operator);

    // calculate result and add to object
    if(operator === '+' ){
        responseObject.result = Number(responseObject.numOne + responseObject.numTwo);
    } 
    else if( operator === '-' ){
        responseObject.result = responseObject.numOne - responseObject.numTwo;
    }
    else if( operator === '*' ){
        responseObject.result = responseObject.numOne * responseObject.numTwo;
    }
    else if( operator === '/' ){
        responseObject.result = responseObject.numOne / responseObject.numTwo;
    }
    console.log('response with math:', responseObject);

    calculationsModule.all.push(responseObject);
    res.sendStatus(201);
    // res.send( calculationsModule );

})


module.exports = calculationsRouter;