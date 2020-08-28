var Variables = module.exports = {
    count: null,
    value:function(){
        
        return Variables.count;
    },
    add: function(val) {

        Variables.count += val;
        console.log(Variables.count)
    },
    remove: function() {
        Variables.count += 10;
    }
}