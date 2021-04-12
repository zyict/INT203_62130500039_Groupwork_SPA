<template>
  <body-card>
    <template v-slot:text>
      <div class="h-56 w-full mt-72 pt-10 bg-gray-800 bg-opacity-30">
        <div class="text-white text-3xl font-sans">
          <p class="mb-1">(G)I-DLE (아이들) Cube Entertainment</p>
          <p>BECOME NEVERLAND NOW!</p>
        </div>
        <button class="joinbtn hover:bg-red-600 mt-5">
          <a
            class="font-sans text-lg"
            target="_blank"
            href="https://united-cube.com/"
            >JOIN US</a
          >
        </button>
      </div>
    </template>
    <template v-slot:vdo>
      <source src="../assets/vdo/idle-visual.mp4" type="video/mp4" />
    </template>
  </body-card>
</template>

<script>
// @ is an alias to /src

export default {};
</script>
