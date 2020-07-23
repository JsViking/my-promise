class myPromise {
  constructor(executor) {
    this.queue = []
    this.errorHandler = function() {}
    this.finnalyHandler = function() {}
    try {
      executor.call(null, this.onResolve.bind(this), this.onReject.bind(this))
    } catch (error) {
      this.errorHandler(error)
    }
  }

  onResolve(data) {
    this.queue.forEach(callBack => {
      data = callBack(data)
    })
    this.onFinally(data)
  }

  onReject(error) {
    this.errorHandler(error)
    this.onFinally()
  }

  onFinally(data) {
    this.finnalyHandler(data)
  }

  then(fn) {
    this.queue.push(fn)
    return this
  }

  catch(fn) {
    this.errorHandler = fn
    return this
  }

  finally(fn) {
    this.finnalyHandler = fn
    return this
  }
}

module.exports = myPromise