const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig')
const apiRoutes = require('./routes/index');
// const UserRepository = require('./repository/user-repository');
const UserService = require('./services/user-service');

const db = require('./models/index')
// const {User, Role}  = require('./models/index')

const app = express();



const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));

    app.use('/api',apiRoutes);
    
    app.listen(PORT, async () => {
        console.log(`Server Started on Port : ${PORT}`);

        if(process.env.DB_SYNC){
            db.sequelize.sync({alter : true});
        }

        // const u2 = await User.findByPk(2); //3 is id of alan and
        // const r2 = await Role.findByPk(3);  // id 2 is for role customer
        // u2.addRole(r2);
        // const response = await u1.getRoles();
        // const response = await r2.getUsers();
        // const response = await u1.hasRole(r1);
        // console.log(response);

        // const service = new UserService();
        // const newToken = service.createToken({email : 'evans@admin.com', id : 1});
        // console.log('new token is', newToken);
        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImV2YW5zQGFkbWluLmNvbSIsImlkIjoxLCJpYXQiOjE2OTAwMzMyNzksImV4cCI6MTY5MDAzMzI3OX0.Vnbeb5-b1fUbu3veLcVrwtRwzDycgb7tFXI_q2BjbXg';
        // const response = service.verifyToken(token);
        // console.log(response);

        // const repo = new UserRepository();
        // const response = await repo.getById(2);
        // console.log(response);
    })
}

prepareAndStartServer();