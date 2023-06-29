const state = {
    tasks: [],
};

const mutations = {
    addTask(state, task) {
        state.tasks.push(task);
    },
    deleteTask(state, taskId) {
        state.tasks = state.tasks.filter((task) => task.id !== taskId)
    },
    updateTask(state, updatedTask) {
        const index = state.tasks.findIndex((task) => task.id === updatedTask.id);
        if (index !== -1) {
            state.tasks.splice(index, 1, updatedTask);
        }
    },
};

const getters = {
    completedTasksCount: (state) => {
        return state.tasks.filter((task) => task.completed).length;
    },
    completedTasks: (state) => {
        return state.tasks.filter((task) => task.completed);
    },
    incompleteTasks: (state) => {
        return state.tasks.filter((task) => !task.completed);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
};
