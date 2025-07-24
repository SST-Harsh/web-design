import Hero from "../Components/Hero";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { motion, AnimatePresence } from "framer-motion";
import Galaxy from "../Components/Galaxy";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TodoPage() {
    const [taskInput, setTaskInput] = useState("");
    const [taskList, setTaskList] = useState(LoadTask());
    const [editingIndex, setEditingIndex] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dueDate, setDueDate] = useState(null);

    function LoadTask() {
        const savedTasks = localStorage.getItem('taskList');
        if (savedTasks) {
            try {
                const parsedTasks = JSON.parse(savedTasks);
                return parsedTasks.map(task => ({
                    ...task,
                    dueDate: task.dueDate ? new Date(task.dueDate) : null
                }));
            } catch (err) {
                console.error("Failed to parse tasks from localStorage", err);
            }
        }
        return [];
    };


    // Save to localStorage whenever taskList changes
    useEffect(() => {
        localStorage.setItem('taskList', JSON.stringify(taskList));
    }, [taskList]);

    const handleAddTask = () => {
        if (taskInput.trim() === "") {
            toast.error('Please enter a task!', {
                position: "top-right",
                autoClose: 3000,
                theme: "light",
                transition: Bounce
            });
            return;
        }

        if (editingIndex !== null) {
            const updated = taskList.map((task, i) =>
                i === editingIndex ? {
                    ...task,
                    text: taskInput,
                    dueDate: dueDate
                        ? (dueDate instanceof Date ? dueDate.toISOString() : new Date(dueDate).toISOString())
                        : (task.dueDate ? (task.dueDate instanceof Date ? task.dueDate.toISOString() : new Date(task.dueDate).toISOString()) : null)
                } : task
            );
            setTaskList(updated);
            setEditingIndex(null);
            setDueDate(null);

            toast.success('Task updated successfully!');
        } else {
            setTaskList([...taskList, {
                text: taskInput,
                completed: false,
                id: Date.now(),
                createdAt: new Date().toISOString(),
                dueDate: dueDate
                    ? (dueDate instanceof Date ? dueDate.toISOString() : new Date(dueDate).toISOString())
                    : null
            }]);
            toast.success('Task added successfully!');
        }
        setTaskInput("");
        setDueDate(null);
        setShowDatePicker(false);
    };

    const handleRemoveTask = (index) => {
        setTaskList(taskList.filter((_, i) => i !== index));
        if (editingIndex === index) {
            setEditingIndex(null);
            setTaskInput("");
            setDueDate(null);

        }
        toast.info('Task removed!');
    };

    const handleToggleComplete = (index) => {
        const updated = taskList.map((task, i) =>
            i === index ? {
                ...task,
                completed: !task.completed,
                completedAt: !task.completed ? new Date().toISOString() : null
            } : task
        );
        setTaskList(updated);
        const action = updated[index].completed ? 'completed' : 'marked incomplete';
        toast.success(`Task ${action}!`);
    };

    const handleEditTask = (index) => {
        setEditingIndex(index);
        setTaskInput(taskList[index].text);
        setDueDate(taskList[index].dueDate ? new Date(taskList[index].dueDate) : null);

    };

    const handleDateChange = (date) => {
        setDueDate(date);
        setShowDatePicker(false);
    };

    // Framer Motion animations
    const taskVariants = {
        initial: { opacity: 0, y: 20 },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            x: -100,
            transition: {
                duration: 0.2,
                ease: "easeIn"
            }
        },
        hover: {
            scale: 1.02,
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        },
        tap: { scale: 0.98 }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    return (
        <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-900 to-indigo-950  overflow-hidden">
            {/* Galaxy Background */}
            <div className="fixed inset-0 z-0">
                {/* <Galaxy
                    mouseRepulsion={true}
                    mouseInteraction={true}
                    density={1.5}
                    glowIntensity={0.5}
                    saturation={0.8}
                    hueShift={240}
                /> */}
            </div>

            {/* Content Container */}
            <div className="relative z-10 min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
                <Hero />
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    toastStyle={{
                        backgroundColor: '#1F2937',
                        color: '#F3F4F6'
                    }}
                />

                {/* Input Section */}
                <motion.div
                    className="w-full max-w-2xl bg-gray-800/70 backdrop-blur-md p-6 rounded-xl shadow-lg mb-8 border border-gray-700/50"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                        duration: 0.5,
                        type: "spring",
                        stiffness: 100
                    }}
                >

                    <div className="flex flex-col md:flex-row gap-4">

                        <div className="relative flex-1">
                            {/* Task Input Field */}
                            <motion.input
                                type="text"
                                placeholder={editingIndex !== null ? "Edit your task" : "Add your task"}
                                value={taskInput}
                                onChange={(e) => setTaskInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                                className="w-full pl-4 pr-12 py-3 rounded-lg bg-gray-700/80 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                whileFocus={{
                                    scale: 1.01,
                                    boxShadow: "0 0 0 2px rgba(124, 58, 237, 0.5)"
                                }}
                            />

                            {/* Due Date Display */}
                            {dueDate && (
                                <span className="absolute right-48 top-4 text-sm text-gray-400">
                                    Due: {new Date(dueDate).toLocaleDateString()}
                                </span>
                            )}

                            {/* Calendar Icon and DatePicker */}
                            <div className="absolute top-3 right-3 text-gray-400 hover:text-purple-400 transition-colors">
                                <FontAwesomeIcon
                                    icon={faCalendarDays}
                                    className="text-xl cursor-pointer"
                                    onClick={() => setShowDatePicker(!showDatePicker)}
                                />
                            </div>

                            {/* Show Date Picker */}
                            {showDatePicker && (
                                <div className="absolute right-0 mt-2 z-[1000]">
                                    <DatePicker
                                        selected={dueDate}
                                        onChange={handleDateChange}
                                        minDate={new Date()}
                                        inline
                                        calendarClassName="bg-gray-800 text-white p-2 rounded-lg border border-indigo-700 shadow-xl"
                                        dayClassName={(date) =>
                                            date < new Date() ? 'text-gray-500' : 'text-white'
                                        }
                                    />
                                </div>
                            )}

                        </div>
                        <div className="flex gap-2">
                            <motion.button
                                onClick={handleAddTask}
                                className={`px-6 py-3 rounded-lg font-medium ${editingIndex !== null ?
                                    'bg-green-600 hover:bg-green-700' :
                                    'bg-purple-600 hover:bg-purple-700'
                                    } transition-colors`}
                                whileHover={{
                                    scale: 1.03,
                                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                                }}
                                whileTap={{
                                    scale: 0.97,
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                                }}
                            >
                                {editingIndex !== null ? 'Update' : 'Add'}
                            </motion.button>
                            {editingIndex !== null && (
                                <motion.button
                                    onClick={() => {
                                        setEditingIndex(null);
                                        setTaskInput("");
                                        setDueDate(null);

                                        toast.info('Edit cancelled');
                                    }}
                                    className="px-4 py-3  bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    Cancel
                                </motion.button>
                            )}
                        </div>
                    </div>


                </motion.div>

                {/* Tasks List */}
                <motion.div
                    className="w-full max-w-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        delay: 0.2,
                        duration: 0.5
                    }}
                >

                    {taskList.length > 0 ? (

                        <motion.div
                            className="bg-gray-800/70 relative mt-55 z-0 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-gray-700/50"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <h2 className="text-xl font-semibold p-4 bg-gray-700/50 text-white border-b border-gray-700/50">
                                Task List ({taskList.length ? ("") : (0)} remaning)
                            </h2>
                            <AnimatePresence>
                                <div className="divide-y divide-gray-700/50">
                                    {taskList.map((task, index) => (
                                        <motion.div
                                            key={task.id}
                                            variants={taskVariants}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            whileHover="hover"
                                            whileTap="tap"
                                            className={`p-4 ${task.completed ?
                                                'bg-gray-700/30' :
                                                'bg-gray-800/30 hover:bg-gray-700/40'
                                                } transition-colors`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                                    <motion.input
                                                        type="checkbox"
                                                        checked={task.completed}
                                                        onChange={() => handleToggleComplete(index)}
                                                        className="w-5 h-5 cursor-pointer accent-purple-500 flex-shrink-0"
                                                        whileTap={{ scale: 0.9 }}
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <span className={`block truncate ${task.completed ?
                                                            'line-through text-gray-400' :
                                                            'text-white'
                                                            }`}>
                                                            {task.text}
                                                        </span>
                                                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">

                                                            {task.dueDate && (
                                                                <span className={`text-xs ${new Date(task.dueDate) < new Date() && !task.completed ?
                                                                    'text-red-400' : 'text-purple-300'
                                                                    }`}>
                                                                    Due: {new Date(task.dueDate).toLocaleDateString()}

                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 ml-2">
                                                    <motion.button
                                                        onClick={() => handleEditTask(index)}
                                                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors whitespace-nowrap"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                         <FontAwesomeIcon
                                                            icon={faEdit}
                                                            className="text-sm cursor-pointer"
                                                        />Edit
                                                    </motion.button>
                                                    <motion.button
                                                        onClick={() => handleRemoveTask(index)}
                                                        className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded  transition-colors whitespace-nowrap"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                            className="text-sm cursor-pointer"
                                                        />Remove

                                                    </motion.button>
                                                </div>
                                            </div>

                                        </motion.div>
                                    ))}

                                </div>

                            </AnimatePresence>

                        </motion.div>


                    ) : (
                        <motion.p
                            className="text-center text-gray-400 py-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            No tasks yet. Add one above!
                        </motion.p>

                    )}</motion.div>

            </div>

        </div>

    );
}