<template>
  <div class="container" :class="{ border: isQuestioner }">
    <div
      class="player"
      v-if="
        isMe &&
          $whim.accessUser.id === appState.questioner &&
          appState.phase === 'playing'
      "
    >
      <div class="theme">
        {{ theme }}
      </div>
      <div class="answer">
        正解数: {{ appState.nAnswer }} あと{{ timeLeft }}秒！
      </div>
      <button class="btn-flat-border red" @click="newTheme">パス</button>
      <button class="btn-flat-border blue" @click="correct">正解</button>
    </div>
    <div v-else-if="isMe && appState.phase === 'finished'" class="player">
      <div class="answer">結果: {{ appState.nAnswer }}ポイント</div>
      <button class="btn-flat-border blue" @click="initialize">
        もう一度やる!！
      </button>
    </div>
    <div
      v-else-if="
        displayUser.id === appState.questioner && appState.phase === 'playing'
      "
      class="gesture"
    >
      ジェスチャーちゅう
    </div>
    <a
      v-else-if="isMe && !appState.phase"
      @click="start"
      class="fuwatto_btn_yellow"
      >出題者になる</a
    >
  </div>
</template>
<script>
import THEMES from "@/themes";
const TIME_LIMIT = 60;

export default {
  name: "Player",
  props: ["displayUser"], // 表示されているUserの情報
  data() {
    return {
      now: new Date().getTime(),
      indices: []
    };
  },
  computed: {
    isMe() {
      return this.$whim.accessUser.id === this.displayUser.id;
    },
    appState() {
      return this.$whim.state;
    },
    timeLeft() {
      console.log("timeLeft");
      if (this.appState.phase !== "playing") return undefined;
      const timeBegin = this.appState.timeBegin;
      if (timeBegin === undefined) return undefined;
      const between = this.now - timeBegin;
      const t = TIME_LIMIT - Math.floor(between / 1000);
      if (t <= 0) {
        this.$whim.assignState({ phase: "finished" });
      }
      return t;
    },
    isQuestioner() {
      return this.displayUser.id === this.$whim.state.questioner;
    }
  },
  methods: {
    start() {
      console.log("started");
      this.$whim.assignState({
        questioner: this.$whim.accessUser.id,
        nAnswer: 0,
        timeBegin: new Date().getTime(),
        phase: "playing"
      });
      this.newTheme();
    },
    initialize() {
      this.$whim.resetState();
    },
    newTheme() {
      if (this.indices.length === 0) {
        this.indices = Array.from({ length: THEMES.length }, (v, k) => k);
      }
      const arrayIdx = Math.floor(Math.random() * this.indices.length);
      this.theme = THEMES[this.indices[arrayIdx]];
      this.indices.splice(arrayIdx, 1); // 既出単語を削除
    },
    correct() {
      this.$whim.assignState({
        nAnswer: this.appState["nAnswer"] + 1
      });
      this.newTheme();
    }
  },
  mounted() {
    setInterval(() => {
      this.now = new Date().getTime();
    }, 100);
  }
};
</script>
<style lang="scss" scoped>
.fuwatto_btn_yellow {
  display: block;
  background-color: #ffc605;
  color: #fff;
  padding: 0.8em;
  text-decoration: none;
  border-radius: 4px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  transition: 0.3s ease-out;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  text-align: center; /*一応BOX内の文字も中央寄せ*/
}
.fuwatto_btn_yellow:hover {
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.12), 0 3px 20px 0 rgba(0, 0, 0, 0.12),
    0 5px 6px -2px rgba(0, 0, 0, 0.2);
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

.theme {
  font: 20px;
}

.answer {
  margin: 10px;
}

.player {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 100px;
  text-align: center;
  background: rgba(256, 256, 256, 0.7);
  border-radius: 10px;
}
.gesture {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -10%);
  width: 200px;
  height: 20px;
  text-align: center;
  font-size: 100%;
  background: rgba(256, 256, 256, 0.7);
  border-radius: 10px;
}
.border {
  // border: solid;
  box-sizing: border-box;
  border-radius: 20px;
  border-width: 10px;
  // box-shadow: #67c5ff;
  box-shadow: 0 0 0 10px #67c5ff inset;
}
</style>
