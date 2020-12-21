import React from 'react'
import "./Home.css"

export default function Home() {
    return (
        <div className="home-container">
            <h1> This is a Secret Task</h1>
            <p>You can add your secret task to this list and nobody which<br />
                is not logged in is able to see or edit your tasks.<br />
                You can create, read, update, detele also mark them as completed. Enjoy!</p>
        </div>
    )
}
