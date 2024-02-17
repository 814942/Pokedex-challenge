import swaggerJSDoc from "swagger-jsdoc"
import path from "path"

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      version: "v1.0.0",
      title: "Pokedex API documentacion",
      description: "Api de prueba para Natural Tech House"
    }
  },
  apis: [`${path.join(__dirname, "./router/*")}`]
}

const swaggerSpec = swaggerJSDoc(options)

export default swaggerSpec