import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import LoadingSpinner from '../Shared/LoadingSpinner';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Todo from '../../categories/Todo';
import InProgress from '../../categories/InProgress';
import Done from '../../categories/Done';
const Task = () => {
    const { data: task = [], isLoading, refetch } = useQuery({
        queryKey: ['task'],
        queryFn: async () => {
            const { data } = await axios.get('http://localhost:5000/task');
            return data;
        }
    });


    if (isLoading) return <LoadingSpinner />;
    return (
        <TabGroup>
            <TabList className="flex justify-center gap-3.5  p-2 rounded-lg">
                <Tab
                    className={({ selected }) =>
                        `px-4 py-2 text-lg font-semibold rounded-lg transition-all ${selected ? "bg-red-500 text-white" : "bg-white text-black"
                        }`
                    }
                >
                    To-Do
                </Tab>
                <Tab
                    className={({ selected }) =>
                        `px-4 py-2 text-lg font-semibold rounded-lg transition-all ${selected ? "bg-red-500 text-white" : "bg-white text-black"
                        }`
                    }
                >
                    In Progress
                </Tab>
                <Tab
                    className={({ selected }) =>
                        `px-4 py-2 text-lg font-semibold rounded-lg transition-all ${selected ? "bg-red-500 text-white" : "bg-white text-black"
                        }`
                    }
                >
                    Done
                </Tab>
            </TabList>

            <TabPanels className="mt-4">
                <TabPanel >

                    <div className='grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2.5 container mx-auto'>
                        {
                            task.filter(task => task.category === "To-Do").map(filteredTask =>
                                <Todo key={filteredTask._id} filteredTask={filteredTask} refetch={refetch}  ></Todo>
                            )
                        }
                    </div>


                </TabPanel>
                <TabPanel className="p-4 bg-gray-50 rounded-lg shadow">

                    <div className='grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2.5 container mx-auto'>
                        {
                            task.filter(task => task.category === "In Progress").map(filteredTask =>
                                <InProgress key={filteredTask._id} filteredTask={filteredTask} refetch={refetch} ></InProgress>
                            )
                        }
                    </div>
                </TabPanel>
                <TabPanel className="p-4 bg-gray-50 rounded-lg shadow">
                    <div className='grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2.5 container mx-auto'>
                        {
                            task.filter(task => task.category === "Done").map(filteredTask =>
                                <Done key={filteredTask._id} filteredTask={filteredTask} refetch={refetch} ></Done>
                            )
                        }
                    </div>
                </TabPanel>
            </TabPanels>
        </TabGroup>
    );
};

export default Task;
