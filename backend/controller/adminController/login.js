const Admin = require('../../models/admin');
const { generateToken } = require('../../middleware/auth');

const adminlogin = async (req, res) => {
    try{
        const data = req.body
        const newAdmin = new Admin(data)

        if (!newAdmin) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const responce = await newAdmin.save();
        console.log('data saved')

        const payload = {
            id: responce.id,
            username: responce.username,
            password: responce.password        
        }

        const token = generateToken(payload);

        res.cookie("token", token, {httpOnly:true})
        console.log("login succesfull")


        return res.status(200).json({
            message: 'Login successful',
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: 'internal server error'});
    }
};

module.exports = adminlogin;