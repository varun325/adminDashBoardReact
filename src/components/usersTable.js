import React, { useEffect } from "react";
import { useState } from "react";
import RenderCurrentPage from "./renderCurrentPage";
import RenderButtons from "./renderButtons";
const UserTable = ()=>{
    const [users,setUsers] = useState({});
    const [apiResponse,setApiResponse] = useState({});
    const [currentPage, setCurrentPage] = useState(0);
    const [editIndex, setEditIndex] = useState(-1);
    const [editDefaultState, setEditDefaultState] = useState({name:'',email:'',role:''});
    const [checkAll,setCheckAll] = useState(false);
    const [deleteList,setDeleteList] = useState([]);

    //input form references
    const nameRef = React.createRef();
    const emailRef = React.createRef();
    const roleRef = React.createRef();

    //Get call for fetching the users
    const URL = "data/data.json";
    const getData = async ()=>{
        const response = await fetch(URL);
        const data = await response.json();
        return data;
    }

    //Fetch users only on the first render
    useEffect(()=>{
        getData().then(data=>{setApiResponse(data)}).catch(error=>console.log(error));
    },[]);


    //passing data to presentational users state which supports in memory editing and deletion
    useEffect(()=>{setUsers(apiResponse)},[apiResponse]);


    //pagination logic starts here

    const goToFirstPage = ()=>{
        setCurrentPage(0);
    }

    const goToLastPage = ()=>{
        setCurrentPage(Math.floor(totalUsers/10));
    }
    const next = ()=>{
        if(currentPage===Math.floor(totalUsers/10))
            return;
        setCurrentPage(currentPage => currentPage+1);
    }
    const prev = ()=>{
        if(currentPage===0)
            return;
        setCurrentPage(currentPage=>currentPage-1);
    }
    const totalUsers = Object.keys(users).length;

    //pagination logic ends here
    

    const selectUser = (index)=>{

        if(deleteList.includes(index)){
            setDeleteList(deleteList.filter((element)=>element!==index));
        }
        else{
            setDeleteList([...deleteList,index]);
        }
    }


    const deleteUser=(index)=>{
        const newUsers = users.filter((element,i)=>i!==index);
        setUsers(users=>{
            return newUsers;
        });
    }

    const deleteUserGroup = (deleteList)=>{
        const newUsers = users.filter((element,i)=>!deleteList.includes(i));
        setDeleteList([]);
        setUsers(newUsers);
        setCheckAll(false);
    }

    const editUser = (index)=>{
        if(index!==-1){
            setEditDefaultState({
                ...users[index]
            });
            setEditIndex(index);
        }
        else{
            setEditIndex(-1);
        }
    }

    const saveUser = (index)=>{
        const updatedUsers = [...users];
        updatedUsers[index] = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            role: roleRef.current.value
        }
        setUsers(updatedUsers);
        editUser(-1);
    }

    //Select all the users on a current page
    const selectAll=()=>{
        if(!checkAll){
            let tempList = [];
            for(let index = currentPage*10;index<currentPage*10+10 && index<totalUsers;index++){
                tempList.push(index);
            }
            setDeleteList(tempList);
        }
        else{
            setDeleteList([]);
        }
        setCheckAll(checkAll=>!checkAll);
    }


    const searchUser = (searchTerm)=>{
        const filtered = apiResponse.filter(user => {
            const { name, email, role } = user;
            return (
              name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              email.toLowerCase().includes(searchTerm.toLowerCase()) ||
              role.toLowerCase().includes(searchTerm.toLowerCase())
            );

          });
        
      console.log(searchTerm,filtered);
      setUsers(filtered);
    }

    return<>
    <div className="flex items-center justify-center min-h-screen">
    <div className="table-auto border-collapse border rounded-lg shadow-md">
    <div className="m-4">
    <input className="font-serif shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e)=>{searchUser(e.target.value)}} type="text" placeholder="Search by name, email or role" style={{ width: '100%' }}></input>
    <table className="my-2">
        <thead>
            <tr>
                <th><input type="checkbox" checked={checkAll} className="mr-2 rounded text-blue-500" onChange={()=>{selectAll()}}/></th>
                <th className="w-40 text-left truncate whitespace-nowrap">Name</th>
                <th className="w-40 text-left truncate whitespace-nowrap">Email</th>
                <th className="w-40 text-left truncate whitespace-nowrap">Role</th>
                <th className="">Actions</th>
            </tr>
        </thead>
        <tbody>
            <RenderCurrentPage {
                ...{
                    currentPage,
                    nameRef,
                    emailRef,
                    roleRef,
                    totalUsers,
                    editIndex,
                    checkAll,
                    deleteList,
                    users,
                    editUser,
                    deleteUser,
                    selectUser,
                    editDefaultState,
                    saveUser
                }
            }/>
        </tbody>
        <tfoot>
                
        </tfoot>
    </table>
    <div>
    <button className="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-1 px-2 rounded-full h-8 w-40" onClick={()=>{deleteUserGroup(deleteList)}}>Delete Selected Rows</button>
    <div className="inline-flex">
        <button className="font-sans bg-gray-300 w-8 h-8 mx-2 hover:bg-gray-400 text-xs text-gray-800 font-bold pb-1 px-1 rounded-full" onClick={goToFirstPage}>{"<<"}</button>
        <button className="font-sans bg-gray-300 w-8 h-8 mx-2 hover:bg-gray-400 text-xs text-gray-800 font-bold pb-1 px-1 rounded-full" onClick={prev}>{"<"}</button>
        {
         <RenderButtons {...{totalUsers,currentPage,setCurrentPage}}/>
        }
        <button className="font-sans bg-gray-300 w-8 h-8 mx-2 hover:bg-gray-400 text-xs text-gray-800 font-bold pb-1 px-1 rounded-full" onClick={next}>{">"}</button>
        <button  className="font-sans bg-gray-300 w-8 h-8 mx-2 hover:bg-gray-400 text-xs text-gray-800 font-bold pb-1 px-1 rounded-full" onClick={goToLastPage}>{">>"}</button>
    </div>
    </div>
    
    </div>
    </div>
    </div>
    </>
}

export default UserTable;