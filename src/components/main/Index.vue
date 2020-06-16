<template>
  <div
    :class="{
      'container-top': !phase,
      'container-center': phase === 'playing' || phase === 'finished'
    }"
  >
    <Instruction v-if="!phase" />
    <OnPlaying v-else-if="phase === 'playing' || phase === 'finished'" />
  </div>
</template>
<script>
import Mixins from "@/mixins";
export default {
  name: "Main",
  components: {
    Instruction: () => import("@/components/main/Instruction"),
    OnPlaying: () => import("@/components/main/OnPlaying")
  },
  mixins: [Mixins]
};
</script>
<style lang="scss" scoped>
.container-top {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -10%);
  width: 30px;
  min-width: 180px;
  height: 70px;
  background: rgba(256, 256, 256, 0.7);
  border-radius: 10px;
}
.container-center {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -100%);
}
</style>
