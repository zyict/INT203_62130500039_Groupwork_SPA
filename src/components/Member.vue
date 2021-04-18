<template>
  <div
    class="flex flex-col w-1/2 justify-start items-center"
    
  >
    <div class="pt-10">
      <img
        :src="require(`../assets/members/${member.photo}`)"
        class="h-96 w-64"
      />
    </div>
    <div class="pt-5">
      <p class="text-white text-xl p-2">
        <span class="font-bold">NAME: </span> {{ member.name }}
      </p>
      <p class="text-white text-xl p-2">
        <span class="font-bold">POSITION: </span> {{ member.position }}
      </p>
      <p class="text-white text-xl p-2">
        <span class="font-bold">BIRTH DATE: </span> {{ member.bd }}
      </p>
      <p class="text-white text-xl p-2">
        <span class="font-bold">BLOOD TYPE: </span> {{ member.bloodtype }}
      </p>
      <p class="text-white text-xl p-2">
        <span class="font-bold">NATIONALITY: </span>
        {{ member.nationality }}
      </p>
    </div>
  </div>
  <div class="w-1/2 pt-16 pr-28 flex flex-col">
    <form @submit.prevent="submitEdit(member)">
      <h1 class="font-bold text-2xl text-white">Edit Member Info</h1>
      <div class="py-4">
        <label class="text-white">Name: </label>
        <input v-model="memname" name="memname" type="text" class="input" />
      </div>
      <div class="py-4">
        <label class="text-white">Position: </label>
        <input v-model="position" name="position" type="text" class="input" />
      </div>
      <div class="py-4">
        <label class="text-white">Birth Date: </label>
        <input v-model="bd" name="bd" type="text" class="input" />
      </div>
      <div class="py-4">
        <label class="text-white">Blood Type: </label>
        <input v-model="bloodtype" name="bloodtype" type="text" class="input" />
      </div>
      <div class="py-4">
        <label class="text-white">Nationality: </label>
        <input
          v-model="nationality"
          name="nationality"
          type="text"
          class="input"
        />
      </div>
      <button class="btn">Submit Change</button>
    </form>
  </div>
</template>

<script>
export default {
  props:['member','mname','pos','img','dob','blood','nation','id'],
  emits:['new-member'],
  data() {
    return {
      editId: this.id,
      memname: this.mname,
      photo: this.img,
      position: this.pos,
      bd: this.dob,
      bloodtype: this.blood,
      nationality: this.nation,
    };
  },
  methods: {
    submitEdit() {
      this.editInfo({
        id: this.editId,
        name: this.memname,
        photo: this.photo,
        position: this.position,
        bd: this.bd,
        bloodtype: this.bloodtype,
        nationality: this.nationality,
      });
    },
    async editInfo(newMember) {
      this.$emit('new-member', newMember)
        this.memname = null;
        this.position = null;
        this.bd = null;
        this.bloodtype = null;
        this.nationality = null;
    },
  },
};
</script>


