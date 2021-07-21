// APOLOGIES THIS IS A VERY SIMPLE EXAMPLE & CERTAINLY NOT ELOQUENT

class iocContainer {

    constructor() {
        this._services = new Map()
    }

    register(name, definition, dependencies) {
        this._services.set(name, {definition: definition, dependencies: dependencies})
    }

    get(name) {
        var c = this._services.get(name)
        return (this._isClass(c.definition)) ? this._createInstance(c) : c.definition
    }

    _getDependencies(service) {
        var dependencies = []
        if (service.dependencies) {
            dependencies = service.dependencies.map((dep) => {
                return this.get(dep)
            })
        }

        return dependencies

    }

    _createInstance(service) {
        return new service.definition(...this._getDependencies(service))
    }

    _isClass(definition) {
        return typeof definition === 'function'
    }
}

// EXAMPLE

const aObj = {
    a: 'a',
    b: 'b'
}

class firstClass {
    constructor(a) {
        this.a = a
    }
}

class secondClass {
    constructor(first) {
        this.first = first
    } 
}

var container = new iocContainer()

container.register('a', aObj)
container.register('first', firstClass, ['a'])
container.register('second', secondClass, ['first'])

var myObj = container.get('second')

console.log('MYOBJ : ' + JSON.stringify(myObj) )