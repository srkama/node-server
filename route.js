const home = (data) => {
    return {
        statusCode: 200,
        data: "This from home"
    }
}

const hello = (data) => {
    const name = data.queryParams['name'] ? data.queryParams['name'] : 'Node Js'
    return {
        statusCode: 200,
        data: 'hello ' + name 
    }
}

const route = {
    '': home,
    '/hello': hello,
    defaultHandler: home
}

const handleRoute = (data) => {
    var handler = route[data.path] ? route[data.path] : route.defaultHandler
    return handler(data)
}




module.exports = handleRoute


