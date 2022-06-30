import axios from "axios";

export async function getTodos(){
    try {
        const { todoData: { todos }, } = await axios.axios.get("http://localhost:3000/api/v1/to-dos/");
        return todos;
    } catch (response) {
        throw new Error(response.data.message);
    }
}

export async function updateTodo(todoID, todoData){
    try {
        await axios.patch(`http://localhost:3000/api/v1/to-dos/${todoID}`, { ...todoData });
    } catch (response) {
        throw new Error(response.data.message);
    }
}

