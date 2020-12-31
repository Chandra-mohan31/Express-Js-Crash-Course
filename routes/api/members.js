const express= require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require("../../Members");
//gets all members
router.get("/",(req,res)=>{
    res.json(members);
})

//get single member
router.get('/:id',(req,res)=>{
const found = members.some(member => member.id === parseInt(req.params.id));
console.log(req.params.id);
if(found){
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
}else{
    res.status(400).json({
        msg:`member not found with id of ${req.params.id}`
    })
}

});

//create member

router.post('/',(req,res)=>{

    const newMember = {
        id : uuid.v4(),
        name : req.body.name,
        
        status: 'active'
    }  

    if(!newMember.name || !newMember.id){
        return(
        res.status(400).json({
            msg:'Please include a name'
        })
        )
        
    }
    members.push(newMember);
    res.json(members);//return a json response
    //res.redirect('/');//redirects to the same page updated
});

//Update member
router.put('/:id',(req,res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    console.log(req.params.id);
    if(found){
        const updateMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updateMember.name ? updateMember.name : req.body.name;

                res.json({
                    msg: 'Member was updated',
                    member
                })
                
            }
        });
    }else{
        res.status(400).json({
            msg:`member not found with id of ${req.params.id}`
        })
    }
    
    });

    router.delete('/:id',(req,res)=>{
        const found = members.some(member => member.id === parseInt(req.params.id));
        console.log(req.params.id);
        if(found){
            res.json({
                        msg : "Member deleted", 
                        members : members.filter(member => member.id !== parseInt(req.params.id))
                     });
        }else{
            res.status(400).json({
                msg:`member not found with id of ${req.params.id}`
            })
        }
        
        });

module.exports = router