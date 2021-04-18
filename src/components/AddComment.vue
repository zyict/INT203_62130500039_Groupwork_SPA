 <template>
  <!-- submit comment -->
  <div class="flex flex-col items-center half pt-8">
    <div class="container">
      <form
        @submit.prevent="submitForm"
        class="w-3/6 py-2 px-24 bg-white bg-opacity-20 rounded-lg"
      >
        <h1 class="text-2xl text-white font-bold bg-green-500 bg-opacity-90">
          Leave a Comment
        </h1>
        <ul>
          <li class="flex">
            <label class="label">Name:</label>
            <span v-if="emptyName" class="errormsg">Name required!</span>
          </li>
          <div>
            <input v-model="name" type="text" class="input w-full" />
          </div>
          <div class="flex">
            <label class="label">Email: </label>
            <span v-if="emptyEmail" class="errormsg">Email required!</span>
            <span v-if="invalidEmail" class="errormsg"> Invalid Email! </span>
          </div>
          <div>
            <input v-model="email" type="email" class="input w-full" />
          </div>

          <div class="flex">
            <label class="label">Comments: </label>
            <span v-if="emptyComment" class="errormsg">
              You haven't type anything!
            </span>
          </div>
          <div>
            <textarea
              v-model="comment"
              rows="4"
              cols="30"
              class="input w-full"
            />
          </div>
        </ul>
        <button class="btn">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddComment",
  emits: ["new-comment"],
  data() {
    return {
      name: null,
      email: null,
      comment: null,
      emptyName: false,
      emptyEmail: false,
      invalidEmail: false,
      emptyComment: false,
      // commentLists: [],
      url: "http://localhost:5000/commentLists",
    };
  },
  methods: {
    submitForm() {
      this.emptyName = this.name === null ? true : false;
      this.emptyEmail = this.email === null ? true : false;
      this.emptyComment = this.comment === null ? true : false;
      if (!this.emptyEmail && !this.validateEmail(this.email)) {
        this.invalidEmail = true;
      } else if (!this.emptyEmail && this.validateEmail(this.email)) {
        this.invalidEmail = false;
      }

      if (
        !this.emptyName &&
        !this.emptyEmail &&
        !this.emptyComment &&
        !this.invalidEmail
      ) {
        this.addComment({
          name: this.name,
          email: this.email,
          comment: this.comment,
        });
      }
    },
    validateEmail(email) {
      var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return re.test(email);
    },
    async addComment(newComment) {
      try {
        const res = await fetch(this.url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newComment),
        });
        const data = await res.json();
        this.$emit("new-comment", data);
        this.name = null;
        this.email = null;
        this.comment = null;
      } catch (error) {
        console.log(`Could not add new comment! ${error}`);
      }
    },
  },
};
</script>