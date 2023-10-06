import { v4 as uuidv4 } from "uuid";
const RenderCurrentPage = (props)=>{
    const {
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
    } = props;
    const rows=[];
    for(let index = currentPage*10;index<currentPage*10+10 && index<totalUsers;index++){
        rows.push(editIndex===index?
                <tr key={uuidv4()} className={`font-serif ${deleteList.includes(index)?"bg-gray-200":""}`}>
                    <td><input type="checkbox" className="mr-2 rounded text-blue-500" disabled/></td>
                    <td><input ref={nameRef} className="w-40 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" defaultValue={editDefaultState.name}></input></td>
                    <td><input ref={emailRef} className="shadow appearance-none border rounded w-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" defaultValue={editDefaultState.email}></input></td>
                    <td><input ref={roleRef} className="shadow appearance-none border rounded w-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" defaultValue={editDefaultState.role}></input></td>   
                    <td>
                        <button className="font-sans w-20 mx-2 text-xs items-center p-2 bg-green-500 text-white rounded-full hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300" onClick={()=>{saveUser(index)}}>Save</button>
                    </td>
                </tr>
                :
                <tr key={uuidv4()} className={`font-serif ${deleteList.includes(index)?"bg-gray-200":""}`}>
                    <td><input defaultChecked={checkAll || deleteList.includes(index)} className="mr-2 rounded text-blue-500" type="checkbox" onClick={()=>{selectUser(index)}}/></td>
                    <td className="w-40 truncate whitespace-nowrap">{users[index].name}</td>
                    <td className="w-40 truncate whitespace-nowrap">{users[index].email}</td>
                    <td className="w-40 truncate whitespace-nowrap">{users[index].role}</td>
                    <td>
                    <button className="font-sans w-20 mx-2 text-xs items-center p-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 focus:outline-none focus:ring focus:border-blue-300" onClick={()=>{editUser(index)}}>Edit</button>
                    <button className="font-sans w-20 mx-2 text-xs items-center p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300" onClick={()=>{deleteUser(index)}}>
                        Delete
                    </button>
                    </td>
                </tr>
        )
    }
    return rows;
}

export default RenderCurrentPage;