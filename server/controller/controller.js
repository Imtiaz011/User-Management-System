import Userdb from "../model/model.js";

//create and save new user
export const create = (req,res) =>{
    //validate request
    if(!req.body){
        res.status(400).send({message: "Content can not be empty!"})
    }

    //new user
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status,
    })

    //save user in database
    user
        .save(user)
        .then(data =>{
            //res.send(data)

            res.redirect('/add-user');
        })
        .catch(err =>{
            res.status(500).send({
                message: err.message || "Some error occurred while creating a create operation"
            });

        });
}

//retrieve and return all user/retrieve and return a single user
export const find = (req,res) =>{
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({message:`Not found user with id ${id}`});
                }
                else{
                    res.send(data);
                }
            })
            .catch(err =>{
                res.status(500).send({message:`Error retrieving user with id ${id}`})
            })
    }
        else{
            Userdb.find()
        .then(user =>{
            res.send(user)
        })
        .catch(err =>{
            res.status(500).send({
                message: err.message || "Error occurred while retriving user information"
            })
        })
    }
    
}

//Update a new identified user by user id
export const update = (req,res) =>{
    if(!req.body){
        return res
            .status(400)
            .send({message:"Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
        .then(data =>{
            if(!data){
                res.status(404).send({message:`Cannot Update user with ${id}.User not found!`})
            }
            else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message: err.message || "Error update user information"})
        })
}

//Delete a user with specified user id in the request
export const remove = (req,res) =>{
    const id = req.params.id;
    Userdb.findByIdAndDelete(id)
        .then(data =>{
            if(!data){
                res.status(404).send({message:`Cannot delete with ${id}.Id is wrong`})
            }
            else{
                res.send({
                    message:`User was deleted successfully!`
                })
            }
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || `Could not delete User with id ${id}`
            });
        });

}