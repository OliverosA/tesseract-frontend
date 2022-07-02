import axios from "axios";

export async function getTodos() {
  try {
    const {
      data: { todos },
    } = await axios.get("http://localhost:3000/api/v1/to-dos");
    return todos;
  } catch (error) {
    return [];
  }
}

export async function updateData(todoID, todoData){
    try {
        await axios.patch(`http://localhost:3000/api/v1/to-dos/${todoID}`, { ...todoData });
    } catch (response) {
        throw new Error(response.data.message);
    }
}

