import dotenv from "dotenv";
dotenv.config(); // Asegura que las variables de entorno se carguen
import i18n from "i18n";
import path from "path";
import express from "express";
import methodOverride from "method-override";
import nunjucks from "nunjucks";
import expressSession from "express-session";
import flash from "connect-flash"; // Importa connect-flash
import cookieParser from "cookie-parser"; // <--- ¡Asegúrate de tenerlo!
import fs from "fs";
//Middleware y utilidades
import homeRoute from "@routes/portal.route";
//import { mergeLocales } from "@utils/merge-locales";
//Rutas
const localesPath = path.join(__dirname, "../locales");
const app = express();
// Servir archivos estáticos desde /public

app.use("/public", express.static(path.join(__dirname, "..", "public")));
// Configuración de vistas con Nunjucks
nunjucks.configure(path.join(__dirname, ".", "views"), {
  autoescape: true,
  express: app,
  watch: true,
});
app.use(cookieParser()); // <-- antes que i18n.init
// i18n.configure({
//   locales: ["es", "en", "zh"],
//   defaultLocale: "en",
//   queryParameter: "lang",
//   cookie: "lang",
//   autoReload: true,
//   updateFiles: false,
//   objectNotation: true,
//   //staticCatalog: mergeLocales(localesPath),
// });
// app.use(i18n.init);

app.use("/public", express.static(path.join(__dirname, "..", "public")));
// Configuración de vistas con Nunjucks

app.use((req, res, next) => {
  if (req.query.lang && i18n.getLocales().includes(req.query.lang as string)) {
    res.cookie("lang", req.query.lang, {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 días
    });
    req.setLocale(req.query.lang as string);
  }
  next();
});
app.set("view engine", "njk");
const env = nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
  watch: true,
});

// Registrar como filtro para usar en la vista
env.addFilter("startsWith", function (value: any, prefix: string) {
  if (typeof value !== "string") return false;
  return value.startsWith(prefix);
});

// Configurar flash
app.use(flash()); // Habilitar connect-flash

// Middleware nativo de Express para parsear JSON
app.use(express.json()); // Para manejar solicitudes JSON
app.use(express.urlencoded({ extended: true })); // Para manejar formularios URL-encoded
// Permite usar ?_method=PUT o ?_method=DELETE en formularios
app.use(methodOverride("_method"));
app.use(
  expressSession({
    secret: "mysecretkey", // Clave secreta para firmar las sesiones
    resave: false,
    saveUninitialized: true, // Asegúrate de no guardar sesiones vacías
    cookie: { secure: false }, // Para pruebas locales, debe ser true en producción
  })
);

// Filtro date: soporta "DD/MM/YYYY"
env.addFilter("date", (value: any, pattern = "DD/MM/YYYY") => {
  if (!value) return "—";
  const d = value instanceof Date ? value : new Date(value);
  if (isNaN(+d)) return "—";
  const pad = (n: number) => String(n).padStart(2, "0");
  const map: Record<string, string> = {
    DD: pad(d.getDate()),
    MM: pad(d.getMonth() + 1),
    YYYY: String(d.getFullYear()),
  };
  return pattern.replace(/YYYY|MM|DD/g, (m: any) => map[m]);
});
// env.addGlobal("site", {
//   name: "The Brothers Logistic",
//   phone1: "753 130 8284",
//   phone2: "753 104 2916",
//   email1: "thebrotherslogistic@gmail.com",
//   email2: "rauul-1@hotmail.com",
// });
// (opcional) exponer __ en Nunjucks

// ✅ año disponible en todas las vistas
env.addGlobal("year", new Date().getFullYear());

// Rutas
app.use((req, res, next) => {
  res.locals.currentPath = req.path;

  next();
});

app.use("/", homeRoute);

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
