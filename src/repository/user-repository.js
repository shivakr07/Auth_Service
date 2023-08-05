const { User, Role }  = require('../models/index'); 

class UserRepository {
    async create(data) { 
        try{
            const user = await User.create(data);
            return user;
        } catch(error){
            console.log('something went wrong at the repository layer');
            throw error;
        }
    }
    async desroy(userId){
        try{
            await User.destroy({
                where:{
                    id : userId
                }
            });
            return true;
        } catch(error){
            console.log('something went wrong at the repository layer');
            throw error;
        }
    }
    async getById(userId){
        try{
            const user = await User.findByPk(userId,{
                attributes : ['email','id']
            });
            return user;
        }catch(error){
            console.log('sonmehting went wront at the repo layer')
        }
    }
    async getByEmail(userEmail) {
        try{    
            const user = await User.findOne({
                where : {
                    email : userEmail
                }
            })
            return user;
        }catch(error){
            console.log('Something went wrong in the repository layer');
            throw error;
        }
    }

    async isAdmin(userId){
        try{
            const user = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where : {
                    name : 'ADMIN'
                }
            });
            // console.log(user)
            return user.hasRole(adminRole);
        } catch(error){
            console.log("something went wrong at the repository layer");
            throw error;
        }
    } 
    
}
module.exports = UserRepository;