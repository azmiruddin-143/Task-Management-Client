import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from "../Shared/LoadingSpinner";
import Todo from "../../categories/Todo";
import InProgress from "../../categories/InProgress";
import Done from "../../categories/Done";
const Task = () => {
    const { user } = useContext(AuthContext);

    // Fetch tasks from backend
    const { data: task = [], isLoading, refetch } = useQuery({
        queryKey: ['task', user?.email],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:5000/task/${user?.email}`);
            return data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    // Drag and Drop Function
    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const { source, destination, draggableId } = result;

        const newCategory = destination.droppableId;

        try {
            await axios.put(`http://localhost:5000/task/update/${draggableId}`, { category: newCategory });
            refetch(); 
        } catch (error) {
            console.error("Error updating task category:", error);
        }
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className='grid lg:grid-cols-3 grid-cols-1 gap-6 2xl:mx-36 mx-2 lg:mx-4 xl:mx-20 my-10'>

                {/* TO-DO */}
                <Droppable droppableId="To-Do">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <h1 className='text-center pb-3.5 text-xl font-bold sm:text-2xl'>TO-DO</h1>
                            <div className='bg-[#0000000e] shadow-sm backdrop-blur-md sm:p-6 p-3 rounded-2xl'>
                                {task.filter(task => task.category === "To-Do").map((filteredTask, index) => (
                                    <Draggable key={filteredTask._id} draggableId={filteredTask._id} index={index}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <Todo filteredTask={filteredTask} refetch={refetch} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        </div>
                    )}
                </Droppable>

                {/* IN PROGRESS */}
                <Droppable droppableId="In Progress">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <h1 className='text-center text-xl font-bold sm:text-2xl pb-3.5'>In Progress</h1>
                            <div className='bg-[#0000000e] sm:p-6 p-3 rounded-2xl'>
                                {task.filter(task => task.category === "In Progress").map((filteredTask, index) => (
                                    <Draggable key={filteredTask._id} draggableId={filteredTask._id} index={index}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <InProgress filteredTask={filteredTask} refetch={refetch} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        </div>
                    )}
                </Droppable>

                {/* DONE */}
                <Droppable droppableId="Done">
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            <h1 className='text-center text-xl font-bold sm:text-2xl pb-3.5'>Done</h1>
                            <div className='bg-[#0000000e] sm:p-6 p-3 rounded-2xl'>
                                {task.filter(task => task.category === "Done").map((filteredTask, index) => (
                                    <Draggable key={filteredTask._id} draggableId={filteredTask._id} index={index}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <Done filteredTask={filteredTask} refetch={refetch} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        </div>
                    )}
                </Droppable>

            </div>
        </DragDropContext>
    );
};

export default Task;
