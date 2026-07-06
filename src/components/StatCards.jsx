function StatCards({ tasks }) {
    const totalTasks = tasks.length; 
    const completedTasks = tasks.filter((task) => task.completed).length; 
    const pendingTasks = tasks.filter((task) => !task.completed).length; 
    const dueTodayTasks = 0; 

    return (
        <div className="stats-grid">
            <div className="stat-card">
                <div className="stat-icon">☷</div>
                <div>
                    <h2>{totalTasks}</h2>
                    <p>Total tasks</p>
                </div>
            </div>

            <div className="stat-card">
                <div className="stat-icon completed">✓</div>
                <div>
                    <h2>{completedTasks}</h2>
                    <p>Completed</p>
                </div>
            </div>
            
            <div className="stat-card">
                <div className="stat-icon pending">○</div>
                <div>
                    <h2>{pendingTasks}</h2>
                    <p>Pending</p>
                </div>
            </div>

            <div className="stat-card">
                <div className="stat-icon due">♨</div>
                <div>
                    <h2>{dueTodayTasks}</h2>
                    <p>Due today</p>
                </div>
            </div>
        </div>
    ); 
}

export default StatCards; 