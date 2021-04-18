<template>
  <div id="c-section">
    <div class="flex flex-col m-container bg-white bg-opacity-50">
      <!-- show comments -->
      <button
        class="bg-red-500 text-white mt-24 px-4 py-2 absolute right-8 rounded-md"
        @click="signIn"
        v-if="!adminMode"
      >
        Toggle Admin Mode
      </button>
      <button
        class="bg-red-500 text-white mt-24 px-4 py-2 absolute right-8 rounded-md"
        @click="signIn"
        v-if="adminMode"
      >
        Toggle User Mode
      </button>
      <div class="half pt-24">
        <ul
          v-for="c in commentLists"
          :key="c.id"
          class="flex flex-col justify-center items-center"
        >
          <div
            class="bg-white bg-opacity-30 border border-opacity-50 border-white rounded-lg shadow p-2 my-1 max-w-lg"
          >
            <li>
              <div class="font-semibold">
                {{ c.name }}
              </div>
              <div>
                {{ c.comment }}
              </div>
              <button
                v-if="adminMode"
                class="bg-red-500 text-white px-2 py-1 rounded-md text-sm"
                @click="deleteComment(c.id)"
              >
                DELETE
              </button>
            </li>
          </div>
        </ul>
      </div>
      <add-comment @new-comment="newComment" />
    </div>
  </div>
</template>

<script>
import AddComment from "../components/AddComment.vue";

export default {
  name: "Comments",
  components: {
    AddComment,
  },
  data() {
    return {
      url: "http://localhost:5000/commentLists",
      commentLists: [],
      adminMode: false,
    };
  },
  methods: {
    async getComments() {
      try {
        const res = await fetch(this.url);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log(`Could not get reserved rooms! ${error}`);
      }
    },
    signIn() {
      this.adminMode = !this.adminMode;
    },
    newComment(passingData) {
      this.commentLists = [...this.commentLists, passingData];
    },
    async deleteComment(commentId) {
      try {
        await fetch(`${this.url}/${commentId}`, {
          method: "DELETE",
        });
        this.commentLists = this.commentLists.filter(
          (comment) => comment.id !== commentId
        );
      } catch (error) {
        console.log(`Could not delete comment! ${error}`);
      }
    },
  },
  async created() {
    this.commentLists = await this.getComments();
  },
};
</script>

<style scoped>
#c-section {
  background-image: url("../assets/idle_bg.png");
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: 100%;
  max-width: none;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  z-index: -1;
}

.half {
  flex: 0 0 100%;
  max-height: 50%;
  min-height: 50%;
  min-width: 100%;
  width: auto;
  max-width: none;
}

.m-container {
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: 100%;
  position: absolute;
}
</style>