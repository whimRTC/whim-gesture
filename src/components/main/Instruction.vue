<template>
  <div class="subtitle">
    出題者は<br />「出題者になる」<br />を押してスタート！
  </div>
</template>
<script>
export default {
  name: "Instruction"
};
</script>
<style lang="scss" scoped>
.subtitle {
  text-align: center;
  font-weight: 300;
  font-size: 20px;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.container-center {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -10%);
  width: 30px;
  min-width: 180px;
  height: 100px;
  background: rgba(256, 256, 256, 0.7);
  border-radius: 10px;
}
</style>
