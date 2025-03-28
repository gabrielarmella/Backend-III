import { usersService } from "../services/index.js"

const getAllUsers = async(req,res)=>{
    const users = await usersService.getAll();
    res.send({status:"success",payload:users})
};

const getUser = async(req,res)=> {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error",error:"User not found"})
    res.send({status:"success",payload:user})
};

const updateUser =async(req,res)=>{
    const updateBody = req.body;
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) return res.status(404).send({status:"error", error:"User not found"})
    const result = await usersService.update(userId,updateBody);
    res.send({status:"success",message:"User updated"})
};

const deleteUser = async(req,res) =>{
    const userId = req.params.uid;
    const result = await usersService.getUserById(userId);
    res.send({status:"success",message:"User deleted"})
};

const addDocuments = async(req,res)=>{
    const userId = req.params.uid;
    const files = req.files;
    const documents = files.map(file => {
        return {
            name:file.originalname,
            reference:`${__dirname}/../public/img/${file.filename}`
        }
    })
    console.log(documents)
    const result = await usersService.addDocuments(userId,documents);
    res.send({status:"success",message:"Documents added"})

};

export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
    addDocuments 
};