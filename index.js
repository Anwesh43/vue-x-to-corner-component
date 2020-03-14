const scGap = 0.02
const delay = 30
const w = window.innerWidth
const h = window.innerHeight

class State {

    scale = 0

    update(cb) {
        this.scale += scGap
        this.sf = Math.sin(this.scale * Math.PI)
        if (Math.abs(this.scale - this.prevScale) > 1) {
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
        return {state, animator, sf}
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
            const strokeWidth = Math.min(w, h) / 50
            const position = 'absolute'
            const wDynamic = Math.sqrt(w * w + h  * h) * 0.5 * this.sf
            const left = `${w / 2 - wDynamic / 2}px`
            const top = `${h / 2 - strokeWidth / 2}px`
            const width = `${wDynamic}px`
            const height = `${strokeWidth / 2}px`
            const background = '#673AB7'
            const deg = Math.atan(h / w) * 180 / Math.PI
            const WebkitTransform = `rotate(${deg * (1 - 2 * i)}deg)`
            return {position, left, top, width, height, background}
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
            const position = 'absolute'
            const left = `${0.5 * w}px`
            const top = `${0.2 * h}px`
            return {position, top, left}
        }
    },
    template : '<div><button @click = "start" :style = "buttonStyle">Start</button><div :style = "lineStyle1"></div><div :style = "lineStyle2"></div></div>'
})

const vueInstance = new Vue({
    el : "#app",
})
