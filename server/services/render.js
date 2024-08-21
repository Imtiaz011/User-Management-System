import axios from "axios";


export const homeRoutes = (req,res) => {
    //Make a get request to /api/users
    axios.get('http://localhost:8000/api/users')
        .then(function(user){
            res.render('index', {users: user.data});
        })
        .catch(err =>{
            res.send(err);
        })
}

export const add_user = (req,res) => {
    res.render('add_user');
}

export const update_user = (req,res) => {
    axios.get('http://localhost:8000/api/users',{params:{id:req.query.id}})
        .then(function(userdata){
            res.render('update_user',{user:userdata.data})
        })
        .catch(err=>{
            res.send(err);
        })
    
}