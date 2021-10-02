const {Pool} = require('pg');

const client = new Pool({ 
    connectionString: process.env.DATABASE_URL || 'postgres://evnlgyqgqdcjip:4aa23d3cddb1a6f968a52566d468aa02035132f8d5c2132a3e330f0d73a6d36d@ec2-44-198-204-136.compute-1.amazonaws.com:5432/ddrc0pspgrcklh',
    
    ssl:{
        rejectUnauthorized:false
    }

})

module.exports = client;