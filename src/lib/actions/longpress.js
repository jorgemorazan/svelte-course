export default function longpress(node, options) {
  console.log(node, options)

  return {
    update(newOptions) {
      console.log('Updated', newOptions)
    },
    destroy() {
      console.log('DESTROYED')
    }
  }
}