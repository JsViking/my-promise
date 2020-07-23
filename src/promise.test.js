const MyPromise = require('./promise')

describe('My promise', () => {

  let executorSpy
  let promise

  const succsessResult = 660
  const errorResult = 'Error'

  beforeEach(() => {
    executorSpy = jest.fn(resolve => setTimeout(() => {
      resolve(succsessResult)
    }, 150))
    promise = new MyPromise(executorSpy)
  })
  
  test('Should exists and to be typeof function', () => {
    expect(MyPromise).toBeDefined()
    expect(typeof MyPromise).toBe('function')
  })

  test('Instans should have methods: then, catch, finally', () => {
    expect(promise.then).toBeDefined()
    expect(promise.catch).toBeDefined()
    expect(promise.finally).toBeDefined()
  })

  test('Should call executor function', () => {
    expect(executorSpy).toHaveBeenCalled()
  })

  test('Should get data in then block and chain them', async () => {
    const result = await promise.then(num => num).then(num => num + 6)
    expect(result).toBe(succsessResult + 6)
  })

  test('Should catch error', async () => {
    const errorExecuter = (resolve, reject) => setTimeout(() => reject(errorResult), 150)
    const errorPromise = new MyPromise(errorExecuter)

    return new Promise(resolve => {
      errorPromise.catch(error => {
        expect(error).toBe(errorResult)
        resolve()
      })
    })
  })

  test('Should call finally method', async () => {
    const finallySpy = jest.fn(() => {})
    await promise.finally(finallySpy)
    expect(finallySpy).toHaveBeenCalled()
  })
})