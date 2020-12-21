/* eslint-disable linebreak-style */
// eslint-disable-next-line linebreak-style
import React, { useState, useEffect } from 'react';
import './TodoList.css';
import { nanoid } from 'nanoid';
import axios from 'axios';

export default function TodoList() {

    const [task, setTask] = useState('');
    const [submitedTask, setSubmitedTask] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/')
            .then(res => {
                setSubmitedTask(res.data);
            })
    }, []);


    const submitTask = (e) => {
        e.preventDefault();

        const todo = { id: nanoid(), text: task, completed: false, toggleEdit: false }

        if (task !== '') {
            axios.post(`http://localhost:4000/`, todo)
                .then(response => {
                    axios.get('http://localhost:4000/')
                        .then(res => {
                            setSubmitedTask(res.data);
                        })

                })
        }
        setTask('');


    };

    const handleDelete = (_id) => {

        axios.delete(`http://localhost:4000/${_id}`)
            .then(res => {
                console.log(res)
                axios.get('http://localhost:4000/')
                    .then(res => {
                        setSubmitedTask(res.data);
                    })
            })
            .catch(err => {
                console.log(err)
            });


    };

    const handleComplete = (item) => {


        submitedTask.map((element) => {
            if (item._id === element._id) {
                axios.patch(`http://localhost:4000/${item._id}`, { ...element, completed: !element.completed })
                    .then(res => {
                        console.log(res)
                        axios.get('http://localhost:4000/')
                            .then(res => {
                                setSubmitedTask(res.data);
                            })
                    })
                    .catch(err => {
                        console.log(err)
                    });
                return { ...element, completed: !element.completed }

            } else {
                return { ...element }
            }
        });

    };

    const handleEdit = (e, item) => {

        const Edit = submitedTask.map((element) => {
            if (item.id === element.id) {
                if (element.toggleEdit) {
                    return { ...element, text: e.target.value }
                } else {
                    return { ...element }
                }
            } else {
                return { ...element }
            }
        })
        setSubmitedTask(Edit);

    };

    const handleToggleEdit = (item) => {

        submitedTask.map((element) => {
            if (item.id === element.id) {
                axios.patch(`http://localhost:4000/${item._id}`, { ...element, toggleEdit: !element.toggleEdit })
                    .then(res => {
                        console.log(res)
                        axios.get('http://localhost:4000/')
                            .then(res => {
                                setSubmitedTask(res.data);
                            })
                    })

                return { ...element, toggleEdit: !element.toggleEdit }
            } else {
                return { ...element }
            }
        })

    };

    return (
        <>  <h1 className="header"> Todo List</h1>
            <div className="task-container">
                <form>
                    <input onChange={(e) => setTask(e.target.value)} value={task} className="task-input" type="text" id="taskInput" name="taskInput" />
                    <button onClick={submitTask} className="task-button" type="submit"><i class="task-icon fas fa-plus-square"></i></button>
                </form>
            </div>
            <div className="task-list">
                {submitedTask.map(item => (
                    <div className="task-single">
                        <input onChange={(e) => handleEdit(e, item)} className="task-text" type="text" value={item.text} />
                        <p onClick={() => handleComplete(item)} className="task-icon">{item.completed ? <i class="fas fa-check-square completed"></i> : <i class="fas fa-check-square"></i>}</p>
                        <p onClick={() => handleToggleEdit(item)} className="task-icon">{item.toggleEdit ? <i class="fas fa-pen-square completed"></i> : <i class="fas fa-pen-square"></i>}</p>
                        <p onClick={() => handleDelete(item._id)} className="task-icon"><i class="fas fa-minus-square"></i></p>
                    </div>
                ))}
            </div>
        </>
    );
}
