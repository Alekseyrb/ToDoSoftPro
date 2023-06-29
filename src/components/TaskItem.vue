<template>
  <span v-if="!editing">{{ task.title }}</span>
    <input
        v-else
        v-model="editedTaskTitle"
        @keydown.enter="saveTask"
    />
  <div>
    <button class="btn primary" @click="toggleComplete">
      {{ task.completed ? 'Отменить' : 'Выполнить' }}
    </button>
    <button class="btn" @click="saveTask">
      {{editing ? 'Сохранить' : 'Изменить'}}
    </button>
    <button class="btn danger" @click="deleteTask">Удалить</button>
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
