const log = console.log

function MyPromise(fn){
    var _this = this

    // 状态：pending fulfilled rejected
    this.status = 'pending'

    this.value = null
    this.reason = null

    this.fulfilledCallback = null
    this.rejectedCallback = null

    function resolve(value){
        if(isFinish()){
            return null
        }

        _this.status = 'fulfilled'
        _this.value = value

        let cb = _this.fulfilledCallback
        if(typeof(cb) == 'function') {
            cb(value)
        }
    }

    function reject(value){
        if(isFinish()){
            return null
        }

        _this.status = 'rejected'
        _this.reason = value

        let cb = _this.rejectedCallback
        if(typeof(cb) == 'function'){
            cb(value)
        }
    }

    function isFinish(){
        return _this.status != 'pending'
    }

    fn && fn(resolve, reject)
}

MyPromise.prototype.then = function(onFulfilled, onReject){
    if(this.status == 'fulfilled'){
        onFulfilled(this.value)
        return null
    }

    if(this.status == 'rejected'){
        onReject(this.reason)
        return null
    }

    this.fulfilledCallback = onFulfilled
    this.rejectedCallback = onReject
}

// 测试代码
const p = new MyPromise((resolve, reject) => {
    log('init')
    setTimeout(() => {
        resolve(100)
        // reject(200)
    }, 100)
})

setTimeout(() => {
    p.then((value) => {
        log('resolve', value)
        // log(p.status)
    }, (value2) => {
        log('reject', value2)
    })
}, 200)
