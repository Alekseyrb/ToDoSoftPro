<template>
  <div class="text" v-if="tasks.length === 0">Список завдань порожній</div>
  <div class="taskList" v-else>
    <ul>
      <li v-for="(task, i) in tasks" :key="task.id">
        {{ i + 1 + '.' }}
        <TaskItem
            :task="task"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import TaskItem from './TaskItem.vue';

export default {
  name: 'TaskList',
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  components: {
    TaskItem,
  },
};
</script>
