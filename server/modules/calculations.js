let calculations = {
    all: [
        {
            numOne: 10,    // 👈 number
            numTwo: 5,     // 👈 number
            operator: '+', // 👈 string
            result: 15     // 👈 number
        }
    ],
    recent: function(){
        console.log('recent', this.all[ this.all.length - 1]);
        return this.all[ this.all.length - 1];
    }
    };

module.exports = calculations;