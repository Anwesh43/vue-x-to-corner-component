const scGap = 0.02
const delay = 30
const w = window.innerWidth
const h = window.innerHeight

class State {

    scale = 0

    update(cb) {
        this.scale += scGap
        this.sf = Math.sin(this.scale * Math.PI)
        if (this.scale > 1) {
            this.scale = 0
            this.sf = 0
            cb()
        }
    }
}

class Animator {

    animated = false
    interval

    start(cb) {
        if (!this.animated) {
            this.animated = true
            this.interval = setInterval(cb, delay)
        }
    }

    stop() {
        if (this.animated) {
            console.log("stopping animation")
            this.animated = false
            clearInterval(this.interval)
        }
    }
}

Vue.component('corner-lines', {
    data() {
        const state = new State()
        const animator = new Animator()
        const sf = state.sf
        return {state, animator, sf, w, h}
    },

    methods : {
        start() {
            this.animator.start(() => {
                this.sf = this.state.sf
                this.state.update(() => {
                    this.animator.stop()
                    this.sf = this.state.sf
                })
            })
        },

        getLineStyle(i) {
            const {w, h} = this
            const strokeWidth = Math.min(w, h) / 50
            const position = 'absolute'
            const wDynamic = Math.sqrt(w * w + h  * h) * this.sf
            const left = `${w / 2 - wDynamic / 2}px`
            const top = `${h / 2 - strokeWidth / 2}px`
            const width = `${wDynamic}px`
            const height = `${strokeWidth}px`
            const background = '#673AB7'
            const deg = Math.atan(h / w) * 180 / Math.PI
            const WebkitTransform = `rotate(${deg * (1 - 2 * i)}deg)`
            return {position, left, top, width, height, background, WebkitTransform}
        }
    },

    created() {
        console.log("component is created")
        window.onresize = () => {
            this.w = window.innerWidth
            this.h = window.innerHeight
        }
    },

    computed : {
        lineStyle1() {
            return this.getLineStyle(0)
        },
        lineStyle2() {
            return this.getLineStyle(1)
        },
        buttonStyle() {
            const {w, h} = this
            const position = 'absolute'
            const left = `${0.5 * w}px`
            const top = `${0.1 * h}px`
            return {position, top, left}
        }
    },
    template : '<div><button @click = "start" :style = "buttonStyle">Start</button><div :style = "lineStyle1"></div><div :style = "lineStyle2"></div></div>'
})

const vueInstance = new Vue({
    el : "#app",
})
