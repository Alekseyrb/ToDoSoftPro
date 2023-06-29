<template>
  <span v-if="!editing">{{ task.title }}</span>
    <input
        v-else
        v-model="editedTaskTitle"
        @keydown.enter="saveTask"
    />
  <div class="btnContainer">
    <button class="btn primary" @click="toggleComplete">
      {{ task.completed ? 'Скасувати' : 'Виконати' }}
    </button>
    <button class="btn" @click="saveTask">
      {{editing ? 'Зберегти' : 'Змінити'}}
    </button>
    <button class="btn danger" @click="deleteTask">Видалити</button>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {ref} from "vue";

export default {
  name: 'TaskItem',
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const editing = ref(false);
    const editedTaskTitle = ref(props.task.title);

    function toggleComplete() {
      props.task.completed = !props.task.completed;
      const updatedTask = { ...props.task, completed: props.task.completed };
      store.commit('tasks/updateTask', updatedTask);
    }

    function deleteTask() {
      store.commit('tasks/deleteTask', props.task.id);
      console.log(props.task.id);
      console.log('adasd');
    }

    function saveTask() {
      editing.value = !editing.value;
      const updatedTask = { ...props.task, title: editedTaskTitle.value };
      console.log(updatedTask);
      store.commit('tasks/updateTask', updatedTask);
    }

    return {
      toggleComplete,
      deleteTask,
      editing,
      editedTaskTitle,
      saveTask,
    }
  }
};
</script>
