import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import LoadingSpinner from '../Shared/LoadingSpinner';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { key } from 'localforage';
const Task = () => {
    const { data: task = [], isLoading, refetch } = useQuery({
        queryKey: ['task'],
        queryFn: async () => {
            const { data } = await axios.get('http://localhost:5000/task');
            return data;
        }
    });

    console.log(task);
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
                <TabPanel className="">
                    {/* <h1 className="text-xl font-bold">Azmir</h1> */}
                    <div>
                        {
                            task.filter(task => task.category === "To-Do").map(filteredTask =>
                                <div key={filteredTask._id} >
                                    <h1>{filteredTask.title}</h1>
                                    <p>{filteredTask.description}</p>
                                    <h1>{filteredTask.category}</h1>
                                </div>
                            )

                        }
                    </div>


                </TabPanel>
                <TabPanel className="p-4 bg-gray-50 rounded-lg shadow">
                    <div>
                        {
                            task.filter(task => task.category === "In Progress").map(filteredTask =>

                                <div key={filteredTask._id} >
                                    <h1>{filteredTask.title}</h1>
                                </div>
                            )

                        }
                    </div>
                </TabPanel>
                <TabPanel className="p-4 bg-gray-50 rounded-lg shadow">
                    <div>
                        {
                            task.filter(task => task.category === "Done").map(filteredTask =>

                                <div key={filteredTask._id} >
                                    <h1>{filteredTask.title}</h1>
                                </div>
                            )

                        }
                    </div>
                </TabPanel>
            </TabPanels>
        </TabGroup>
    );
};

export default Task;
