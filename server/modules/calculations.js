let calculations = {
    all: [],
    recent: function(){
        console.log('in recent');
        if( this.all.length > 0 ){
            return 'empty';
            // console.log('recent', this.all[ this.all.length - 1]);
            // return this.all[ this.all.length - 1];
        }
        else {
            return 'empty';
        }
        
    }
    };

module.exports = calculations;