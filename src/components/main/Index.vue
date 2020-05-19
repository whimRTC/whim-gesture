<template>
  <div class="container">
    <div class="player subtitle">
      出題者は「出題者になる」を押してスタート！
    </div>
  </div>
</template>
<script>
export default {
  name: "Main",
  data: function() {
    return {};
  }
};
</script>
<style lang="scss" scoped>
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.player {
  position: absolute;
  z-index: 0;
  border: 1px black;
}
</style>
