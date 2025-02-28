import { Router } from "express";
import User from "../dao/models/User.js";
import { faker } from "@faker-js/faker";

const router = Router();

router.post('/',async(req,res)=>{
    const {first_name,last_name,email,password} = req.body;
    if(!first_name||!last_name||!email||!password) return res.status(400).send({status:"error",error:"Incomplete values"})
    let newUser = {
        first_name,
        last_name,
        email,
        password
    }
    const result = await usersModel.create(newUser);
    if(req.query.redirect){
        res.redirect('/')
    }else{
        res.send({status:"success",payload:result._id})
    }
})

router.get('/test',(req,res)=>{
    let first_name = faker.person.firstName();
    let last_name = faker.person.lastName();
    let email = faker.internet.email();
    let password =  faker.internet.password();
    res.send({first_name,last_name,email,password})
})

export default router;