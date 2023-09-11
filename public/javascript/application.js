import "@hotwired/turbo"
import { Application } from "@hotwired/stimulus"
import "./vendor/strada.js"

// Controllers
import MenuController from "./controllers/menu_controller.js"

// Bridge Components
import BridgeFormController from "./controllers/bridge/form_controller.js"
import BridgeMenuController from "./controllers/bridge/menu_controller.js"
import BridgeOverflowMenuController from "./controllers/bridge/overflow_menu_controller.js"

// Start Stimulus
window.Stimulus = Application.start()

// Register Controllers
Stimulus.register("menu", MenuController)

// Register Bridge Components
Stimulus.register("bridge--form", BridgeFormController)
Stimulus.register("bridge--menu", BridgeMenuController)
Stimulus.register("bridge--overflow-menu", BridgeOverflowMenuController)
