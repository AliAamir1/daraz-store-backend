import { Users } from "../db/connection.js";



const get_all_users = async (req, res) => {
    const AllUsers = await Users.scope('without_sensitive_data').findAll();
    console.log(AllUsers);
    return res.status(200).json({ data: AllUsers })
}

// const get_user_by_id = async(req, res)=>{
//     const 
// }



export { get_all_users }