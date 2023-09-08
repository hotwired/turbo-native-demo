import "@hotwired/turbo"
import { Application } from "@hotwired/stimulus"
import "./vendor/strada.js"

import FormController from "./controllers/bridge/form_controller.js"

window.Stimulus = Application.start()
Stimulus.register("bridge--form", FormController)
