function Promise2(fn){
    var self = this;

    // 三种状态，pending, err, success
    this.status = 0

    this.callback = null;

    function resolved (value){
        self.callback && self.callback(value)
    }

    fn(resolved)
}

Promise2.prototype.then = function(cb){
    this.callback = cb;
    return this
}

const p = new Promise(function(resolve, reject){
    setTimeout(function(){
        console.log('get data')
        reject(1)
    },10)
})

const a = p.then(function(value){
    console.log(value)
    return value + 1
})
// a.then(function(value){
//     console.log(value)
// })

console.log('a',a)