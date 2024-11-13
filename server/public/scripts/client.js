console.log('client.js is sourced!');

function setOperator(){
    event.preventDefault();
    let allButtons = document.querySelectorAll('.button-operator');
    allButtons.forEach( el => el.classList = "button-operator");

    let chosenOperator = event.target.innerHTML;
    console.log(chosenOperator);
    document.getElementById('operatorIn').value = chosenOperator;
    event.target.classList = 'button-operator selected';
}

function getCalculations(){
    console.log('in getCalculations');

    axios.get( '/calculations' )
    .then( (response)=>{
        console.log( response.data );

        const calculations = response.data;
        const contentDivAll = document.getElementById( 'resultHistoryOut' );

        contentDivAll.innerHTML = '';
        let contentHTML = '';

        for(let calculation of calculations){
            contentHTML += `
            <div class="result">
            ${calculation.numOne}${calculation.operator}${calculation.numTwo} = ${calculation.result}
            </div>
            `
        }
        contentDivAll.innerHTML = contentHTML;   
    }).catch();
 } // end getCalculations

 function getRecent(){
    console.log('in getRecent');
    axios.get( '/calculations/recent' ).then( (response)=>{
        console.log( response.data );
        if( response.data !== 'empty'){
            document.getElementById( 'recentResultOut' ).innerHTML = `${response.data.numOne}${response.data.operator}${response.data.numTwo} = ${response.data.result}`
        }
        else {
            document.getElementById( 'recentResultOut' ).innerHTML = `No calculations Yet`
        }
    })
 } // end getRecent

function calculate(){
    event.preventDefault();
    let numOneIn = Number(document.getElementById( 'numOneIn' ).value);
    let numTwoIn = Number(document.getElementById( 'numTwoIn' ).value);
    let operatorIn = document.getElementById( 'operatorIn' ).value;

    // start to assemble object
    let objectToSend = {
        numOne: numOneIn,
        numTwo: numTwoIn,
        operator: operatorIn
    }

    // calculate result and add to object
    if(operatorIn === '+' ){
        objectToSend.result = numOneIn + numTwoIn;
    } 
    else if( operatorIn === '-' ){
        objectToSend.result = numOneIn - numTwoIn;
    }
    else if( operatorIn === '*' ){
        objectToSend.result = numOneIn * numTwoIn;
    }
    else if( operatorIn === '/' ){
        objectToSend.result = numOneIn / numTwoIn;
    }

    console.log('assembled objectToSend:', objectToSend);

    // send to server
    axios.post( '/calculations', objectToSend ).then( function(response){
        console.log( response.data );
        getCalculations();
        getRecent();
    })

    // clear inputs and styles to reset form
    clearCalc();
} // end calculate

function clearCalc(){
    event.preventDefault();

    document.getElementById( 'numOneIn' ).value = '';
    document.getElementById( 'numTwoIn' ).value = '';
    document.getElementById( 'operatorIn' ).value = '';

    let allButtons = document.querySelectorAll('.button-operator');
    allButtons.forEach( el => el.classList = "button-operator");
} // end clearCalc


 getCalculations();
 getRecent();
