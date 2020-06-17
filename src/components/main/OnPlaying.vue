<template>
  <div class="onplaying-container">
    <countdown
      v-if="phase === 'playing'"
      :time="TIME_LIMIT * 1000"
      @end="end"
      :transform="transform"
      class="countdown"
      ref="countdown"
    >
      <template slot-scope="props">
        <div class="points">
          {{ $whim.state.nAnswer }}<small>ポイント</small>
        </div>
        <small class="small">残り</small>{{ props.seconds
        }}<small class="small">秒</small>
      </template>
    </countdown>
    <div class="countdown" v-else>
      <div>結果</div>
      <div class="points">{{ $whim.state.nAnswer }}<small>ポイント</small></div>
      <button class="btn-flat-border blue position-below" @click="initialize">
        もう一度やる!！
      </button>
    </div>
  </div>
</template>
<script>
import Mixins from "@/mixins";

const TIME_LIMIT = 60;

export default {
  name: "OnPlaying",
  data() {
    return {
      TIME_LIMIT
    };
  },
  methods: {
    end() {
      if (this.$whim.accessUser.id === this.$whim.state.questioner) {
        this.$whim.assignState({
          phase: "finished",
          sound: this.$whim.state.nAnswer > 0 ? "cheer" : "chanchan"
        });
      }
    },
    transform(props) {
      props.seconds += props.minutes * 60;
      props.seconds = props.seconds.toString().padStart(2, "0");
      return props;
    },
    initialize() {
      this.$whim.resetState();
    }
  },
  mixins: [Mixins]
};
</script>
<style lang="scss" scoped>
.countdown {
  // display: inline-block;
  background: #000000d0;
  color: #fff;
  padding: 5px;
  margin: 0px;
  font: 40px "f5.6";
  width: 150px;
  text-align: center;
}
.onplaying-container {
  display: flex;
  justify-content: center;
}
small {
  margin: 0;
  padding: 0;
  font-family: "Noto Sans JP", sans-serif;
  font-size: 25px;
}
.points {
  font: 40px "f5.6";
}
.btn-flat-border {
  display: inline-block;
  padding: 0.3em 1em;
  margin: 0px 5px;
  text-decoration: none;
  height: 26px;

  border-radius: 3px;
  transition: 0.4s;

  &.blue {
    color: #67c5ff;
    border: solid 2px #67c5ff;
    &:hover {
      background: #67c5ff;
      color: white;
    }
  }
  &.red {
    color: #ff67a6;
    border: solid 2px #ff67a6;
    &:hover {
      background: #ff67a6;
      color: white;
    }
  }
}
</style>
