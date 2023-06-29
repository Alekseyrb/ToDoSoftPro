<template>
  <div>
    <input
        v-model="newTask"
        @keydown.enter="addTask"
        placeholder="Введите новую задачу"
        :class="{invalidInput : error}"
    />
    <button @click="addTask" class="btn">Добавить</button>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import {ref} from 'vue';
import {useStore} from "vuex";

export default {
  name: 'TaskInput',
  emits: ['addTask'],
  setup() {
    const newTask = ref('');
    const error = ref('');
    const tasks = ref([]);
    const store = useStore();

    const addTask = () => {
      if (newTask.value.trim() === '') {
        error.value = 'Введите задачу';
        newTask.value = '';
        return;
      }

      tasks.value = {
        id: Date.now(),
        title: newTask.value,
        completed: false,
      };

      store.commit('tasks/addTask', tasks.value);
      newTask.value = '';
      error.value = '';
    };

    return {
      newTask,
      addTask,
      error,
    };
  },
};
</script>
