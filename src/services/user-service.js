const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../config/serverConfig');
const bcrypt = require('bcrypt');

class UserService{
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try{
            const user = await this.userRepository.create(data);
            return user
        } catch(error){
            console.log('something went wrong in the service layer');
            throw error;
        }
    }

    async signIn(email, plainPassword){
        try{
            // step1 -> fetch user using email
            const user = await this.userRepository.getByEmail(email);
            // step2 -> compare incoming plainPassword to encryptedPassword
            const passwordsMatch = this.checkPassword(plainPassword, user.password);

            if(!passwordsMatch){
                console.log('Password doesnt match');
                throw {error : 'Incorrect password'};
            }
            // step3 -> if pw match create token and send it to the user
            const newKJWT = this.createToken({email : user.email, id : user.id});
            return newKJWT;

        }catch(error){
            console.log('something went wrong in the sign in process');
            throw error;
        }
    }


    createToken(user) {
        try{
            const result = jwt.sign(user,JWT_KEY,{expiresIn:'120'});
            return result;
        }catch{
            console.log('something went wrong in token creation');
            throw error;
        }
    }

    verifyToken(token) {
        try{
            const response = jwt.verify(token, JWT_KEY);
            return response;
        }catch(error){
            console.log('something went wrong in token validation', error);
            throw error;
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword){
        try{
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        } catch(error){
            console.log('Something went wrong in the comparison');
            throw error;
        }
    }
}
module.exports = UserService;