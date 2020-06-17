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
import { Howl } from "howler";

const SE = {
  ok: new Howl({ src: require("@/assets/poka01.mp3") }),
  ng: new Howl({ src: require("@/assets/coin06.mp3") }),
  cheer: new Howl({ src: require("@/assets/people-performance-cheer1.mp3") }),
  chanchan: new Howl({ src: require("@/assets/chan-chan2.mp3") })
};

export default {
  name: "Main",
  components: {
    Instruction: () => import("@/components/main/Instruction"),
    OnPlaying: () => import("@/components/main/OnPlaying")
  },
  computed: {
    sound() {
      return this.$whim.state.sound;
    }
  },
  mixins: [Mixins],
  watch: {
    sound: function(newSound) {
      if (newSound) {
        const s = SE[newSound];
        s.volume(0.05);
        s.play();
        this.$whim.assignState({
          sound: null
        });
      }
    }
  }
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
  height: 100px;
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
