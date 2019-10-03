import React from "react"
import ReactDOM from "react-dom"
import App from "./pages/index"
import { unregister } from "./serviceWorker"

ReactDOM.render(<App />, document.getElementById("root"))

if ((module as any).hot) {
    ;(module as any).hot.accept("./pages/index", () => {
        const NextApp = require("./pages/index").default
        ReactDOM.render(<NextApp />, document.getElementById("root"))
    })
}

// unregister service worker
unregister()
