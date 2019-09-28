<template>
  <div class="boards">
<div class="centered">
    <h1 class="position">Hello, {{user.name}}</h1>
    <div class="d-flex justify-content-end">
      <button class="btn btn-danger btn-sm" @click="logout">Logout</button>
    </div>
</div>
    <form @submit.prevent="addBoard" class="my-4">
      <input type="text" placeholder="title" v-model="newBoard.title" required />
      <input type="text" placeholder="description" v-model="newBoard.description" />
      <button class="btn btn-danger btn-sm ml-3" type="submit">Create Board</button>
    </form>
    <div v-for="board in boards" :key="board._id">
      <router-link class="board-list" :to="{name: 'board', params: {boardId: board._id}}">{{board.title}}</router-link><span class="btn" @click= "deleteBoard(board)"><i class="far fa-times-circle"></i></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("getBoards");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: ""
      }
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    },
    user(){
      return this.$store.state.user;
    }
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    },
    logout(){
      this.$store.dispatch("logout")
    },
    deleteBoard(board){
      this.$store.dispatch('deleteBoard', board)
    }
  }
};
</script>


<style scoped>
.board-list{
  font-size: 25px
}
.centered{
  background-image: url('../assets/kanbanheader.png');
  background-size: cover;
  height: 30vh;
}
.position{
  position: absolute;
  top:15%;
  left:45%;
  transform: translate(-50%, -50%)
}


</style>