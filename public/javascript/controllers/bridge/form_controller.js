import { BridgeComponent } from "/vendor/strada.js"
import { BridgeElement } from "/vendor/strada.js"

export default class extends BridgeComponent {
  static component = "form"
  static targets = [ "submit" ]

  connect() {
    super.connect()
    this.notifyBridgeOfConnect()
  }

  notifyBridgeOfConnect() {
    const submitButton = new BridgeElement(this.submitTarget)
    const title = submitButton.title

    this.send("connect", { title }, () => {
      this.submitTarget.click()
    })
  }

  submitStart(event) {
    this.send("submitDisabled")
  }

  submitEnd(event) {
    this.send("submitEnabled")
  }
}
