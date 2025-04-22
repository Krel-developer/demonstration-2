export const krelMaskInput = function (
  element: HTMLElement,
  mask: string
): void {
  if (element.tagName === 'INPUT') {
    const i = element as HTMLInputElement

    const d: { [key: string]: string } = { 9: '[0-9]', a: '[a-z]' },
      msk = mask.split('')
    i.addEventListener('input', handler)
    i.addEventListener('focus', handler)
    i.addEventListener('blur', (e: Event) => {
      const value = (e.target as HTMLInputElement).value
      if (value[value.length - 1] === '_') {
        ;(e.target as HTMLInputElement).value = ''
      }
    })
    let firstIndex = mask.indexOf('9') - 1
    function handler(e: Event) {
      if (e.type === 'focus' && (i as HTMLInputElement).value !== '') return
      let mskd: string[] = [],
        s = firstIndex

      msk.forEach((el, n) => {
        if (d[el]) {
          let t = new RegExp(d[el], 'i').test(i.value.charAt(n))
          mskd.push(t ? i.value.charAt(n) : '_')
          if (t && s === n && i.value.charAt(n) !== '_') {
            s++
          }
        } else {
          mskd.push(el)
          if (s === n) s++
        }
      })

      i.value = mskd.join('')
      i.selectionStart = i.selectionEnd = s < 0 ? 0 : s
      setTimeout(function () {
        i.selectionStart = i.selectionEnd = s < 0 ? 0 : s
      }, 0)

      if (
        e.type === 'input' &&
        (e as InputEvent).inputType === 'deleteContentBackward'
      ) {
        if (msk[i.selectionStart - 1] === '-') {
          i.selectionStart = i.selectionEnd = i.selectionStart
            ? i.selectionStart - 1
            : i.selectionStart
          setTimeout(function () {
            i.selectionStart = i.selectionEnd = i.selectionStart
              ? i.selectionStart - 1
              : i.selectionStart
          }, 0)
        }
        if (msk[i.selectionStart - 2] === ')') {
          i.selectionStart = i.selectionEnd = i.selectionStart - 2
          setTimeout(function () {
            i.selectionStart = i.selectionEnd = i.selectionStart
              ? i.selectionStart - 2
              : i.selectionStart
          }, 0)
        }
      }
    }
  } else {
    console.warn('KrelMaskInput(warn): Первым элементом нужно передавать input')
  }
}
