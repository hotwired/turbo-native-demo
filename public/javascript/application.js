import "/dist/turbo.es2017-umd.js"
import { Application } from "/dist/stimulus.js"
import "/vendor/strada.js"

import FormController from "./controllers/bridge/form_controller.js"

window.Stimulus = Application.start()
Stimulus.register("bridge--form", FormController)
