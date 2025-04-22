interface IDragToast {
  node: HTMLDivElement | null
  startX: number
  width: number
  xPos: number
  time: number
  delta: number
  velocityX: number
}

const dragTostDefaultValue: IDragToast = {
  node: null,
  startX: 0,
  width: 0,
  xPos: 0,
  time: 0,
  delta: 0,
  velocityX: 0,
}

class KrelToast {
  private dragToast = dragTostDefaultValue
  private $wrapper: HTMLDivElement = document.createElement('div')

  constructor() {
    this.init()
  }
  private init(): void {
    this.onDragStart = this.onDragStart.bind(this)

    this.onDragMove = this.onDragMove.bind(this)

    this.onDragEnd = this.onDragEnd.bind(this)

    this.$wrapper.classList.add('krel-toast-wrapper')

    this.$wrapper.addEventListener('mousedown', this.onDragStart)
    this.$wrapper.addEventListener('touchstart', this.onDragStart)
  }
  toast(text: string, type: string = ''): void {
    if (!this.$wrapper.children.length) {
      document.body.append(this.$wrapper)
    }
    const toast: HTMLDivElement = document.createElement('div')

    toast.classList.add('krel-toast')
    if (type) {
      toast.classList.add(`krel-toast-${type}`)
    }
    toast.innerHTML = text
    toast.style.marginTop = '30px'
    this.$wrapper.append(toast)

    setTimeout(() => {
      toast.style.marginTop = '0'
    }, 0)
    toast.dataset.id = this.closeTimeOut(toast)
  }
  error(text: string) {
    this.toast(text, 'error')
  }
  success(text: string) {
    this.toast(text, 'success')
  }

  private onDragStart(e: TouchEvent | MouseEvent) {
    e.preventDefault()

    const target = e.target as HTMLDivElement

    if (target && target.closest('.krel-toast')) {
      const timeoutID = target.dataset.id
      if (timeoutID) {
        clearTimeout(+timeoutID)
      }

      this.dragToast.node = target
      this.dragToast.startX = this.clientX(e)
      this.dragToast.width = target.offsetWidth
      this.dragToast.xPos = this.clientX(e)

      this.dragToast.time = Date.now()
      this.dragToast.node.style.transition = '0s'
      document.addEventListener('mousemove', this.onDragMove)
      document.addEventListener('mouseup', this.onDragEnd)
      document.addEventListener('touchmove', this.onDragMove)
      document.addEventListener('touchend', this.onDragEnd)
    }
  }

  private onDragMove(e: MouseEvent | TouchEvent): void {
    this.dragToast.delta = this.clientX(e) - this.dragToast.startX

    this.dragToast.xPos = this.dragToast.velocityX =
      Math.abs(this.dragToast.xPos - this.clientX(e)) /
      (Date.now() - this.dragToast.time)

    this.dragToast.time = Date.now()
    this.dragToast.xPos = this.clientX(e)

    if (this.dragToast.node && this.dragToast.delta && this.dragToast.width) {
      this.dragToast.node.style.transform = `translate(${this.dragToast.delta}px)`
      this.dragToast.node.style.opacity = `${
        1 - Math.abs(this.dragToast.delta / (this.dragToast.width * 0.6))
      }`
    }
  }

  private onDragEnd(e: MouseEvent | TouchEvent): void {
    e.preventDefault()

    if (
      Math.abs(this.dragToast.delta) > this.dragToast.width * 0.6 ||
      this.dragToast.velocityX > 1
    ) {
      const toast: HTMLDivElement | null = this.dragToast.node
      if (toast) {
        toast.style.transition = 'height 0.2s,  padding 0.2s, margin 0.2s'
        toast.style.opacity = '0'
        toast.style.height = '0'
        toast.style.margin = '0'
        toast.style.padding = '0'
        setTimeout(() => {
          toast.remove()
        }, 300)
      }
    } else {
      if (this.dragToast.node) {
        this.dragToast.node.style.transform = ''
        this.dragToast.node.style.opacity = ''
        this.dragToast.node.style.transition = ''

        this.dragToast.node.dataset.id = this.closeTimeOut(this.dragToast.node)
      }
    }

    this.dragToast = dragTostDefaultValue
    document.removeEventListener('mousemove', this.onDragMove)
    document.removeEventListener('mouseup', this.onDragEnd)
    document.removeEventListener('touchmove', this.onDragMove)
    document.removeEventListener('touchend', this.onDragEnd)
  }

  private closeTimeOut(toast: HTMLDivElement): string {
    const timeOutId = setTimeout(() => {
      toast.style.marginTop = '-20px'
      toast.style.opacity = '0'
      setTimeout(() => {
        toast.remove()
        if (!this.$wrapper.children.length) {
          this.$wrapper.remove()
        }
      }, 500)
    }, 5000)

    return timeOutId.toString()
  }
  private clientX(e: TouchEvent | MouseEvent): number {
    if (e.type === 'TouchEvent') {
      const event = e as TouchEvent
      if (event.targetTouches.length >= 0.8) {
        return event.targetTouches[0].clientX
      }
    }
    const event = e as MouseEvent
    // mouse event
    return event.clientX
  }
}

export const toast = new KrelToast()
