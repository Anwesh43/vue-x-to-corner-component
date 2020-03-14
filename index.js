const scGap = 0.02

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
