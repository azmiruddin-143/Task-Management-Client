import { useState } from "react";
import TaskEdidModal from "../modal/TaskEdidModal";
import { FaEye } from 'react-icons/fa6';
const Todo = ({ filteredTask,refetch }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const { title, description, category } = filteredTask
    return (
        <div className='border p-2 rounded-sm' >
            <h1>{title}</h1>
            <p>{description}</p>
            <h1>{category}</h1>

            {/* */}
            <div className=' py-5 border-b border-gray-200 bg-white text-sm'>
                <span
                    onClick={() => { setIsEditModalOpen(true) }}
                    className='relative cursor-pointer inline-block px-3 py-2 font-semibold text-white leading-tight'
                >

                    <span
                        aria-hidden='true'
                        className='absolute inset-0  bg-black black rounded-full'
                    ></span>
                    <div className='flex items-center gap-2'>
                        <span className='relative '>Update</span>
                        <FaEye className=' relative text-lg' />
                    </div>

                </span>
                <TaskEdidModal
                    isOpen={isEditModalOpen}
                    setIsEditModalOpen={setIsEditModalOpen}
                    filteredTask={filteredTask}
                    refetch ={refetch}
                />
            </div>
        </div>

    );
};

export default Todo;