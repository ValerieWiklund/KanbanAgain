<template>
  <div>
    <div class="centered">
      <div class="d-flex justify-content-start">
        <button @click="backNav">
          <i class="fas fa-arrow-circle-left fa-2x"></i>
        </button>
      </div>
      <h1 class="position size">
        {{board.title}}
        <br />
        <h3>{{board.description}}</h3>
      </h1>
    </div>
    <div class="row justify-content-center">
      <div class="board">
        <CreateListModal />
        <button
          class="btn btn-danger btn-sm mt-4"
          data-toggle="modal"
          data-target="#create-list-modal"
        >Create List</button>
      </div>
    </div>
    <div class="row mx-2">
      <list v-for="list in lists" :listProp="list" :key="list._id" />
    </div>
  </div>
</template>

<script>
import List from "../components/List";
import CreateListModal from "../components/CreateListModal";
export default {
  name: "board",
  mounted() {
    this.$store.dispatch("getActiveBoard", this.$route.params.boardId);
    this.$store.dispatch("getBoards");
    this.$store.dispatch("getLists", this.$route.params.boardId);
  },
  computed: {
    board() {
      return (
        this.$store.state.boards.find(
          b => b._id == this.$route.params.boardId
        ) || {
          title: "Loading..."
        }
      );
    },
    lists() {
      return this.$store.state.lists;
    }
  },
  methods: {
    backNav() {
      this.$store.dispatch("backNav");
    }
  },
  components: { List, CreateListModal }
};
</script>


<style scoped>
.centered {
  background-image: url("../assets/kanbanheader.png");
  background-size: cover;
  height: 30vh;
}
.position {
  position: absolute;
  top: 15%;
  left: 45%;
  transform: translate(-50%, -50%);
}
.size {
  font-size: 50px;
}
</style>
