<template>
<div class="col-3 pt-3">
<div class="card shadow">
  <div class="card-header ">
   <h2>{{listProp.title}} <span class="btn btn-sm" @click="deleteList(listProp)"><i class="far fa-times-circle fa-2x"></i></span></h2>
  </div>
  <div class="card-body list">
         <CreateTaskModal :list="listProp" />
      <task v-for="task in tasks" :taskProp="task" :key="task._id" />
      <button
        class="btn btn-primary btn-sm mt-3"
        data-toggle="modal"
        :data-target="'#create-task-modal'+listProp._id"
      >Add Task</button>
  </div>
</div>
</div>
</template>


<script>
import Task from "../components/Task";
import CreateTaskModal from "../components/CreateTaskModal";
export default {
  name: "List",
  props: ["listProp"],
  mounted() {
    this.$store.dispatch("getTasks", this.listProp._id);
  },

  computed: {
    tasks() {
      return this.$store.state.tasks[this.listProp._id]; //this is getting the task at the specific list ID
    }
  },
  components: { Task, CreateTaskModal },
  methods: {
      deleteList(list){
      this.$store.dispatch('deleteList', list)
    },
  }
};

</script>

<style scoped>
.card-body{
  background-color: rgba(199, 199, 199,.08);
}
</style>
