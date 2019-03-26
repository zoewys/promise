const MyPromise = function(fn) {
    var _this = this;

    this.thenFn = [];

    this.resolve = function(value) {
        // console.log('resolve fn')
        // let fns = _this.thenFn.reverse()
        _this.thenFn.forEach( fn => {
            fn && (value = fn(value))
        })
    }

    this.reject = function() {
        // console.log('reject fn')
    }

    fn(this.resolve, this.reject)
}

MyPromise.prototype.then = function(fn) {
    this.thenFn.push(fn)
    return this;
}

const p = new MyPromise((resolve, reject) => {
    console.log('promise function')
    setTimeout(function(){
        // reject(1)
        resolve(100)
    },100)
})

setTimeout(() => {
    p.then(v1 => {
        console.log(v1)
        // setTimeout(() => {
        //     return 'then 1'
        // })
        console.log(this)
        return 100 * 2
    })
},1000)
// const p1 = p.then(v1 => {
//     console.log(v1)
//     // setTimeout(() => {
//     //     return 'then 1'
//     // })
//     return 100 * 2
// })

// console.log('p1', p1)
// const p2 = p.then(v2 => {
//     console.log(v2)
// })

