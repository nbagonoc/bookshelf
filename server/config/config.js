const config ={
    production:{
        SECRET: process.env.SECRET,
        // DATABASE: process.env.MONGODB_URI
        DATABASE: 'mongodb://nbagonoc:FuckTh3G0v3rnm3nt@ds119640.mlab.com:19640/nb-mern-stack'
    },
    default:{
        SECRET: 'qwerty123',
        DATABASE: 'mongodb://localhost:27017/bookshelf'
    }
}

exports.get = function get(env){
    return config[env] || config.default
}