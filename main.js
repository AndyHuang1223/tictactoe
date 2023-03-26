const app = Vue.createApp({
    data() {
        return {
            items: [],
            stepCount: 0,
            isXTurn: false,
            isTie:false
        }
    },
    mounted() {
        this.initialData()
    },
    methods: {
        initialData() {
            this.items = []
            this.isXTurn = false
            this.stepCount = 0
            this.isTie = false
            for (let i = 0; i < 9; i++) {
                const item = { id: i, content: '' }
                this.items.push(item)
            }
        },
        clickItem(id) {
            if (this.items[id]['content'] == '') {
                this.items[id]['content'] = this.isXTurn ? 'X' : 'O'
                this.isXTurn = !this.isXTurn
                this.stepCount++
            }
            this.checkGameStatus()
        },
        restart() {
            myModel.toggle()
            this.initialData()
        },
        checkGameStatus() {
            if (this.isEndGame) {
                myModel.toggle()
            } else if (this.stepCount >= 9) {
                this.isTie = true
                myModel.toggle()
            }
        },
        isRowCheckEnd() {
            for (let i = 0; i <= 6; i = i + 3) {
                if (this.items[i]['content'] !== '' || this.items[i + 1]['content'] !== '' || this.items[i + 2]['content'] !== '') {
                    if (this.items[i]['content'] == this.items[i + 1]['content'] &&
                        this.items[i + 1]['content'] == this.items[i + 2]['content'] &&
                        this.items[i]['content'] == this.items[i + 2]['content']) {
                        return true
                    }
                }
            }
        },
        isColCheckEnd() {
            for (let i = 0; i < 3; i++) {
                if (this.items[i]['content'] !== '' || this.items[i + 3]['content'] !== '' || this.items[i + 6]['content'] !== '') {
                    if ((this.items[i]['content'] == this.items[i + 3]['content'] &&
                        this.items[i + 3]['content'] == this.items[i + 6]['content'] &&
                        this.items[i]['content'] == this.items[i + 6]['content'])) {
                        return true
                    }
                }
            }
        },
        isCrossCheckEnd() {
            for (let i = 2; i <= 4; i = i + 2) {
                if (this.items[4 - i]['content'] !== '' || this.items[4]['content'] !== '' || this.items[4 + i]['content'] !== '') {
                    if ((this.items[4 - i]['content'] == this.items[4]['content'] &&
                        this.items[4 + i]['content'] == this.items[4]['content'] &&
                        this.items[4 - i]['content'] == this.items[4 + i]['content'])) {
                        return true
                    }
                }
            }
        },
    },
    computed: {
        isEndGame() {
            return this.stepCount > 4 && this.isRowCheckEnd() || this.isColCheckEnd() || this.isCrossCheckEnd()
        }
    }
})

app.mount('#app')

const myModel = new bootstrap.Modal(document.getElementById('notification-modal'))