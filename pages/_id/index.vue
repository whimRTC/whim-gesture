<template>
  <div class="container" style="background-color:transparent;">
    <div v-if="playerId===0">
      <v-card>
        <v-card-title>
          正解数: {{room.appState.nAnswer}}
          あと{{room.appState.time}}秒！
        </v-card-title>
      </v-card>
    </div>
    <div
      class="player"
      :width="videoWidth" 
      :height="videoHeight" 
      v-else-if="$route.query.isMe === 'True' && playerId === room.appState.questioner"
    >
      <div>
        <v-card>
          <v-card-title>
            {{theme}}
          </v-card-title>
          <v-card-subtitle>
            正解数: {{room.appState.nAnswer}}
            あと{{room.appState.time}}秒！
          </v-card-subtitle>
          <v-btn color="danger" @click="newTheme">パス</v-btn>
          <v-btn color="success" @click="correct">OK</v-btn>
        </v-card>
      </div>
    </div>
    <v-btn v-else-if="$route.query.isMe === 'True' && !room.appState.questioner" @click="initialize">出題者になる</v-btn>
  </div>
</template>


<script>

import firebase from "~/plugins/firebase.js"
// import func from '../../vue-temp/vue-editor-bridge';
const db = firebase.firestore();

export default {
  data: function () {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      appUserState: [],
      users: [],
      theme: '',
      room: {
        appState: {}
      },
      appState: {},
      indices: [],
      vocabulary: ['ウサギ', 'キツネ', '野球', 'サッカー', 'バスケットボール', '料理', '先生', 'ふりかけ', '恐竜', 'テニス', 'ラグビー', '柔道', '剣道', '空手', '水泳', 'スケート', '棒高跳び', '砲丸投げ', '編み物', '茶道', '乳搾り', 'パソコン', 'テレビゲーム', '掃除', '漫才', '宇宙飛行士', '運転', '飛行機', 'オートバイ']
    }
  },
  computed: {
    videoWidth: function(){
      return Math.floor(this.width/2)
    },
    videoHeight: function(){
      return Math.floor(this.height/2)
    },
    roomId() {
      return this.$route.query.roomId
    },
    playerId() {
      return this.$route.params.id
    },
    fireRoom: function(){
      return db.collection('rooms').doc(this.roomId)
    },
  },
  methods: {
    newTheme() {
      if(this.indices.length === 0) {
        this.indices = Array.from({length: this.vocabulary.length}, (v, k) => k)
      }
      const arrayIdx = Math.floor(Math.random() * this.indices.length)
      this.theme = this.vocabulary[this.indices[arrayIdx]]
      this.indices.splice(arrayIdx, 1) // 既出単語を削除
    },
    initialize() {
      this.fireRoom.update({appState: {
        questioner: this.playerId,
        nAnswer: 0,
        time: 60
      }})
      this.newTheme()
      // return /***** この上の設定がthis.appStateに反映されない */
      const timeKeeper = () => {
        // const state = await this.fireRoom.get()
        // const time = state.data().appState.time
        const time = this.room.appState.time
        console.log(time)
        if(time === 0) {
          this.finish()
          return
        }
        this.fireRoom.update({appState: {
          questioner: this.room.appState.questioner,
          nAnswer: this.room.appState.nAnswer,
          time: time-1
        }})
        setTimeout(timeKeeper, 1000)
      }
      setTimeout(timeKeeper, 1000)
    },
    correct() {
      this.fireRoom.update({appState: {
          questioner: this.room.appState.questioner,
          nAnswer: this.room.appState.nAnswer + 1,
          time: this.room.appState.time
      }})
      this.newTheme()
    },
    finish() {}
  },
  async mounted() {
    console.log('roomId:' + this.roomId)

    const data = await firebase.auth().signInAnonymously()

    this.uid = data.user.uid

    await this.fireRoom.collection('appClients').doc(this.uid).set({});
    await this.fireRoom.update({appState: {
      questioner: null,
      nAnswer: 0,
      time: 60
    }})
    this.$bind('room', this.fireRoom)
    this.$bind('appUserState', this.fireRoom.collection('appUserState'))
    this.$bind('users', this.fireRoom.collection('users'))
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
.player {
  position: absolute;
  z-index:0;
  border: 1px black;
}
</style>
