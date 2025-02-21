import { useState } from "react";
import TaskEdidModal from "../modal/TaskEdidModal";
import { FaEye } from 'react-icons/fa6';
import TaskDelete from "../modal/TaskDelete";
import { GiClick } from 'react-icons/gi';
import axios from "axios";

const InProgress = ({ filteredTask, refetch }) => {
    const { title, description, category,_id} = filteredTask
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    let [isOpen, setIsOpen] = useState(false)
    function openModal() {
        setIsOpen(true)
    }
    function closeModal() {
        setIsOpen(false)
    }
    const taskDelete = () => {
        axios.delete(`http://localhost:5000/task/${_id}`)
            .then(result => {
                console.log(result.data);
                refetch()
                setIsEditModalOpen(false)

            })
    }

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
                    refetch={refetch}
                />
            </div>
            {/* delete */}
            <div className=''>
                <div className='flex justify-end' >
                    <span
                        onClick={openModal}
                        className='relative cursor-pointer  inline-block px-3 py-2 font-semibold text-white leading-tight'
                    >
                        <span
                            aria-hidden='true'
                            className='absolute inset-0 bg-black  rounded-full'
                        ></span>

                        <div className='flex items-center gap-0'>
                            <span className='relative'>Delete</span>
                            <GiClick className=' relative text-lg' />
                        </div>
                    </span>
                </div>
                <TaskDelete isOpen={isOpen} closeModal={closeModal} taskDelete={taskDelete} />
            </div>
        </div>
    );
};

export default InProgress;