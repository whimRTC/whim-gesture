<template>
  <div id="app">
    <Main class="main" v-if="!appState.phase" />

    <Player
      v-for="user in $store.state.users"
      :key="user.id"
      class="box"
      :class="`pos${user.positionNumber}`"
      :displayUser="user"
    />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    Main: () => import("@/components/main/Index"),
    Player: () => import("@/components/player/Index")
  },
  computed: {
    appState() {
      return this.$store.state.appState;
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  height: 20%;
  text-align: center;
  background: rgba(256, 256, 256, 0.7);
  z-index: 1;
  border-radius: 10px;
}

.box {
  width: 50%;
  height: 50%;
  position: absolute;
  text-align: center;

  &.pos1 {
    top: 0%;
    left: 0%;
  }

  &.pos2 {
    top: 0%;
    left: 50%;
  }

  &.pos3 {
    top: 50%;
    left: 0%;
  }

  &.pos4 {
    top: 50%;
    left: 50%;
  }
}
</style>
