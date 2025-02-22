import axios from "axios";

const TaskForm = ({filteredTask,refetch,setIsEditModalOpen}) => {
    const { title, description, category,_id } = filteredTask
    const updateTask = (e) => {
        e.preventDefault()
        const title = e.target.title.value
        const description = e.target.description.value
        const category = e.target.category.value
        const date = Date.now()
        const taskUpdate = {
            title,
            description,
            category,
            date
            
        }
        // e.target.reset()
        axios.put(`https://task-management-server-olive-three.vercel.app/task/${_id}`, taskUpdate)
            .then(result => {
                console.log(result.data);
                refetch()
                setIsEditModalOpen(false)
                // navigate('/')
            })
    }
    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center">Update Task</h2>

            <form onSubmit={updateTask}  className="space-y-4">
                {/* Title Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        defaultValue={title}
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
                        defaultValue={description}
                        name="description"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter description"
                    />
                </div>

                {/* Category Select Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select name="category"  defaultValue={category || "To-Do"}  className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                        
                        <option value="Select Category">Select Category</option>
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
                    Update Task
                </button>
            </form>
        </div>
    );
};

export default TaskForm;