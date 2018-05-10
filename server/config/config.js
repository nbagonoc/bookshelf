const config ={
    production:{
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default:{
        SECRET: 'qwerty123',
        // DATABASE: 'mongodb://localhost:27017/bookshelf'
        DATABASE: 'mongodb://nbagonoc:FuckTh3G0v3rnm3nt@ds119640.mlab.com:19640/nb-mern-stack'
    }
}

exports.get = function get(env){
    return config[env] || config.default
}