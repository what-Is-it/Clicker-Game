<template>
    <div>
        <header>Monster Slayer</header>
        <div id="game">
            <section id="player" class="container">
                <h2>Your Health</h2>
                <div class="healthbar">
                    <div class="healthbar__value" :style="playerBarStyles">
                        <span>{{playerHealth}}%</span>
                    </div>
                </div>
            </section>
            <section id="monster" class="container">
                <h2>Monster health</h2>
                <div class="healthbar">
                    <div class="healthbar__value" :style="monsterBarStyles">
                        <span>{{monsterHealth}}%</span>
                    </div>
                </div>
            </section>
            <section class="container" v-if="winner">
                <h2>Game over!</h2>
                <h3 v-if="winner === 'player'">You win</h3>
                <h3 v-else-if="winner === 'monster'">You lost</h3>
                <h3 v-else>It's a draw</h3>
                <button @click="startGame">New Game</button>
            </section>
            <section id="controls" v-if="!winner">
                <button @click="playerAttack" :disabled="winner">ATTACK</button>
                <button
                    :disabled="mayUseMagicAttack || winner"
                    @click="playerMagicAttack"
                >MAGIC ATTACK</button>
                <button @click="healPlayer" :disabled="healCount >=3 || winner">HEAL</button>
                <button :disabled="winner" @click="surrender">SURRENDER</button>
            </section>
            <section id="log" class="container">
                <h2>Battle log</h2>
                <ul>
                    <li v-for="logMessage in logMessages" :key="logMessages.indexOf(logMessage)">
                        <div class="round" v-if="logMessages.indexOf(logMessage)%2 === 0"><span>Round: {{logMessage.round}}</span></div>
                        <span :class="{'log--player' : logMessage.actionBy === 'player', 'log--monster' : logMessage.actionBy==='monster'}">{{logMessage.actionBy === 'player'? 'Player' : 'Monster'}}</span>
                        <span v-if="logMessage.actionType==='heal'"> Heal player for <span class="log--heal">{{logMessage.actionValue}}</span></span>
                        <span v-else-if="logMessage.actionType==='magicAttack'">
                            Magic attack <span class="log--damage">{{logMessage.actionValue}}</span> damage
                        </span>
                        <span v-else-if="logMessage.actionType==='attack'">
                            Attack <span class="log--damage">{{logMessage.actionValue}}</span> damage
                        </span>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
import init from '../anim'
import {defineComponent, ref, onMounted, watch, computed, Ref} from 'vue'
export default defineComponent({
    props: {},

    setup() {
        type Log = {
            round: number
            actionBy: string
            actionType: string
            actionValue: number
        }
        const playerHealth= ref<number>(100)
        const monsterHealth = ref<number>(100)
        const currentRounds = ref<number>(0)
        const winner = ref<null | string>(null)
        const healCount = ref<number>(0)
        const logMessages: Ref<Array<Log>> = ref([])

        const playerBarStyles = computed(() => {
            if (playerHealth.value < 0) {
                return {width: 0 + '%'}
            }
            return {width: playerHealth.value + '%'}
        })
        const monsterBarStyles = computed(() => {
            if (monsterHealth.value < 0) {
                return {width: 0 + '%'}
            }
            return {width: monsterHealth.value + '%'}
        })
        const mayUseMagicAttack = computed(() => {
            return currentRounds.value % 3 !== 0
        })

        watch(playerHealth, value => {
            if (value <= 0 && monsterHealth.value <= 0) {
                winner.value = 'draw'
            } else if (value <= 0) {
                winner.value = 'monster'
            }
        })
        watch(monsterHealth, value => {
            if (value <= 0 && playerHealth.value <= 0) {
                winner.value = 'draw'
            } else if (value <= 0) {
                winner.value = 'player'
            }
        })

        // watch(monsterHealth, (newVal, oldVal) => console.log(newVal, oldVal))

        function getRandomValue(max: number, min: number): number {
            return Math.floor(Math.random() * (max - min) + min)
        }

        function monsterAttack(max, min) {
            const attackValue = getRandomValue(max, min)
            if (playerHealth.value < attackValue) {
                playerHealth.value = 0
            } else {
                playerHealth.value -= attackValue
            }
            addLogMessage('monster', 'attack', attackValue)
        }
        function playerAttack() {
            currentRounds.value++
            const attackValue = getRandomValue(2, 15)
            if (monsterHealth.value < attackValue) {
                monsterHealth.value = 0
            } else {
                monsterHealth.value -= attackValue
            }

            monsterAttack(5, 12)
            addLogMessage('player', 'attack', attackValue)
        }
        function playerMagicAttack() {
            currentRounds.value++
            const attackValue = getRandomValue(7, 20)
            if (monsterHealth.value < attackValue) {
                monsterHealth.value = 0
            } else {
                monsterHealth.value -= attackValue
            }

            monsterAttack(7, 17)
            addLogMessage('player', 'magicAttack', attackValue)
        }
        function healPlayer() {
            currentRounds.value++
            healCount.value++
            const healValue = getRandomValue(9, 20)

            if (playerHealth.value + healValue > 100) {
                playerHealth.value = 100
            } else {
                playerHealth.value += healValue
            }
            monsterAttack(5, 12)
            addLogMessage('player', 'heal', healValue)
        }
        function surrender() {
            winner.value = 'monster'
        }
        function startGame() {
            playerHealth.value = 100
            monsterHealth.value = 100
            healCount.value = 0
            currentRounds.value = 0
            winner.value = null
        }
        function addLogMessage(who: string, what: string, value: number): void {
            logMessages.value.unshift({
                round: currentRounds.value,
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        }

        onMounted(() => {
            console.log(logMessages)
        })

        return {
            getRandomValue,
            playerHealth,
            monsterHealth,
            playerAttack,
            playerMagicAttack,
            monsterAttack,
            healPlayer,
            playerBarStyles,
            monsterBarStyles,
            currentRounds,
            mayUseMagicAttack,
            winner,
            healCount,
            startGame,
            surrender,
            addLogMessage,
            logMessages
        }
    }
})
</script>

<style scoped>
</style>