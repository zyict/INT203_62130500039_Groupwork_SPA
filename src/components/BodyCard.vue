<template>
  <div class="content">
    <slot></slot>
  </div>
  <div id="bg-viewport">
  <video autoplay muted loop class="bgvdo">
    <source src="../assets/vdo/hwaa.mp4" type="video/mp4" />
  </video>
  </div>
</template>

<style scoped>
.bgvdo{
  display: block;
  width: 100%;
  height: auto;
  opacity: 50%;
}
#bg-viewport{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}

.content{
  width: 100%;
  max-width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0;
  position: relative;
  z-index: 2;
}
</style>