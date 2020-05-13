<template>
  <div class="container" style="background-color:transparent;">
    <div
      class="player"
      :width="videoWidth" 
      :height="videoHeight" 
      v-if="appState.phase === 'notStarted'"
    >
      <v-card>
        <v-card-title>
          出題者は「出題者になる」を押してスタート！
        </v-card-title>
        <!-- <v-btn v-for="user of users" :key="user.id" @click="start(user.id)">{{user.name}}</v-btn> -->
      </v-card>
    </div>
  </div>
</template>


<script>
const TIME_LIMIT = 60

export default {
  name: 'rooms-id',
  data: function () {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      users: [],
      theme: '',
      loading: true,
      room: {
        appState: {}
      },
      indices: [],
    }
  },
  computed: {
    videoWidth: function(){
      return Math.floor(this.width/2)
    },
    videoHeight: function(){
      return Math.floor(this.height/2)
    },
    userId() {
      return this.$route.query.userId
    },
    displayUserId() {
      return this.$route.query.displayUserId
    },
    isMe() {
      return this.userId === this.displayUserId
    },
    appState() {
      return this.room.appState || {}
    },
    // この画面のプレイヤーを返す
    user() {
      return this.users.find(user => user.id === this.userId);
    },
  },
  methods: {
    start(id) {
      const appState = this.appState
      appState['questioner'] = id
      appState['nAnswer'] = 0
      appState['timeBegin'] = new Date().getTime()
      appState['phase'] = 'playing'
      window.parent.postMessage({appState}, process.env.whimUrl)
      this.newTheme()
      // return /***** この上の設定がthis.appStateに反映されない */
    },
  },
  async mounted() {
    console.log('game successfully started: front')
    setInterval(() => {
      this.now = new Date().getTime()
    }, 100)

    // wh.im本体との通信を開始
    window.parent.postMessage("connect", process.env.whimUrl);

    // wh.imから room / users情報が送られてきたら登録
    window.addEventListener('message', (event) => {
      console.log("get event: " + event)
      if(event.data.room){
        console.log("room: " + event.data.room)
        this.room = event.data.room
      } else if(event.data.users){
        console.log("user: " + event.data.users)
        this.users = event.data.users
      }
    }, false);
    // this.loading = false
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
