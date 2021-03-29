


// - - - - R E Q U I R E S - - - -

// express expone unicamente un metodo. Al ejecutarlo, ese metodo retorna un objeto, con propiedades y operaciones que es lo que usaremos.

const path = require("path")
const express = require("express")

// Importamos hbs para usar los partials (lo que nos permite tener codigo fijo en todas las paginas, ejemplo: footer).
// El directorio de partials tiene que ser diferente al de 'views'.
const hbs = require("hbs")

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")



// - - - C O N S T A N T S - - -

const defaultCoordinates = {latitude: "-34.9032800", longitude: "-56.1881600", location: "Montevideo, Uruguay"}

const app = express()

const port = process.env.PORT || 3000


// - - - - C O N F I G U R A T I O N - - - -


// podemos acceder a example.html: localhost:3000/example.html (ya que esta en public!)

// Cada cosa que este en public es accessible desde afuera. Como? url/nombreRecurso. Ej: localhost:3000/css/styles.css nos muestra el css 'styles'.
publicDir = path.join(__dirname, "../public")
app.use(express.static(publicDir))

// Express usa hbs desde una carpeta que si o si tiene que llamarse 'views' y vivir en el root. Si queremos cambiar su ubicacion, hacemos esto.
viewsPath = path.join(__dirname, "../templates/views") // La nueva direccion
app.set("views", viewsPath)

// Analogo a lo de arriba, pero para los partials
partialsPath = path.join(__dirname, "../templates/partials") // La nueva direccion
hbs.registerPartials(partialsPath)

// esta linea, sirve para servir contenido dinamico, en vez desde public, desde views. views es una carpeta que tiene que llamarse asi (aunque la cambiamos a 'templates' antes), 
// y encontrarse en la root del webserver, y es la que usa hbs para servir contenido dinamico.
// En vez de usar adentro de la ruta 'res.send' usamos 'res.render' pasandole como parametro el nombre (sin extension) del archivo a renderear.
/// Sino, mirar documentacion de 'express'.
app.set("view engine", "hbs")



// - - - - E N D P O I N T S - - - -

// Cuando recibamos una request, get, a la ruta (localhost:puerto), retornara index.hbs con los parametros 'title' y 'name'.
app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Mastermind"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Mastermind",
        img_description: "tremenda placa"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Mastermind",
    })
})

// usamos send en vez de render, mandamos un JSON (podriamos haber mandado otra cosa, por ejemplo texto)
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "No address provided in query"
        })    
    }

    geocode.getCoordinates(req.query.address, (error, { latitude, longitude, location } = defaultCoordinates) => {
        if (error) {
            return res.send({error: error})
        }

        forecast.getForecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({error: error})
            }

            res.send({
                forecast: forecast,
                location: location,
                address: req.query.address
            })
        })

    })
})

// ---- ERROR ENDPOINTS ----

// error handling (for when user enters an invalid request. i.g.: localhost:port/invalid/request)
app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Mastermind",
        error_msg: "Article Not Found!"
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Mastermind",
        error_msg: "page not found"
    })
})

app.listen(port, () => {
    console.log("Server initialized on port " + port)
})