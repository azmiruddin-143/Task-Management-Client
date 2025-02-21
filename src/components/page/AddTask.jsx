import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const AddTask = () => {
   const { user } = useContext(AuthContext)
    const addTask = (e) => {
        e.preventDefault()
        const title = e.target.title.value
        const description = e.target.description.value
        const category = e.target.category.value
        const date = Date.now()
        const userEmail = user?.email
        const taskAdd = {
            title,
            description,
            category,
            date,
            userEmail
        }
        // e.target.reset()
        axios.post('http://localhost:5000/task', taskAdd)
            .then(result => {
                console.log(result.data);
                // navigate('/')
            })
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Create Task</h2>

            <form onSubmit={addTask} className="space-y-4">
                {/* Title Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter title"
                    />
                </div>

                {/* Description Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        rows="3"
                        name="description"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter description"
                    />
                </div>

                {/* Category Select Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select name="category" className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        <option value="To-Do">Select Category</option>
                        <option value="To-Do">To-Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                >
                    Add Task
                </button>
            </form>
        </div>
    );
};

export default AddTask;