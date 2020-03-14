const scGap = 0.02
const delay = 30

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
