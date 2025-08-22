import { Request, Response } from "express";
import axios from "axios";
const HOOK_URL = process.env.WEBHOOK_URL as string;
const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET as string;

const SERVICIOS_PERMITIDOS = new Set([
  "sistemas",
  "web",
  "chatbot",
  "automatizacion",
  "cloud",
  "consultoria",
  "otro",
]);
export class HomeController {
  home = async (req: Request, res: Response) => {
    res.render("index.njk", { title: "Inicio" });
  };
  contacto = async (req: Request, res: Response) => {
    res.render("contacto.njk", {
      title: "Contacto",
      errors: {},
      old: {},
      turnstileSiteKey: process.env.TURNSTILE_SITE_KEY,
    });
  };
   contactoPost = async (req: Request, res: Response) => {
    const { nombre, apellidos, email, telefono, servicio, mensaje, website } = req.body || {};
    const errors: Record<string, string> = {};

    // 0) Honeypot: si viene lleno, es bot
    if (website && String(website).trim().length > 0) {
      return res.status(400).render("contacto.njk", {
        title: "Contacto",
        errors: { global: "Validación fallida." },
        old: {},
        turnstileSiteKey: process.env.TURNSTILE_SITE_KEY,
      });
    }

    // 1) Validación Turnstile (obligatoria)
    try {
      const token = req.body["cf-turnstile-response"];
      if (!token) {
        errors.captcha = "Por favor, verifica el captcha.";
      } else {
        const resp = await axios.post(
          "https://challenges.cloudflare.com/turnstile/v0/siteverify",
          new URLSearchParams({
            secret: TURNSTILE_SECRET,
            response: token,
            remoteip: req.ip || "",
          }).toString(),
          { headers: { "content-type": "application/x-www-form-urlencoded" }, timeout: 7000 }
        );
        if (!resp.data?.success) {
          errors.captcha = "No pudimos verificar que seas humano. Intenta de nuevo.";
        }
      }
    } catch {
      errors.captcha = "Error al verificar el captcha. Intenta nuevamente.";
    }

    // 2) Validaciones del formulario
    if (!nombre || String(nombre).trim().length < 2)
      errors.nombre = "Ingresa tu nombre (mínimo 2 caracteres).";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email)))
      errors.email = "Ingresa un correo válido.";
    if (!servicio || !SERVICIOS_PERMITIDOS.has(String(servicio)))
      errors.servicio = "Selecciona un servicio.";
    if (!mensaje || String(mensaje).trim().length < 5)
      errors.mensaje = "Cuéntanos un poco más (mín. 5 caracteres).";

    if (Object.keys(errors).length) {
      return res.status(400).render("contacto.njk", {
        title: "Contacto",
        errors,
        old: { nombre, apellidos, email, telefono, servicio, mensaje },
        turnstileSiteKey: process.env.TURNSTILE_SITE_KEY,
      });
    }

    // 3) Envío al webhook
    const payload = {
      nombre,
      apellidos: apellidos || "",
      email,
      telefono: telefono || "",
      servicio_clave: servicio,
      mensaje,
      origen: "web",
    };

    try {
      await axios.post(HOOK_URL, payload, { timeout: 8000 });
      return res.render("contacto.njk", {
        title: "Contacto",
        success: "¡Gracias! Recibimos tu solicitud. Te contactaremos pronto.",
        errors: {},
        old: {},
        turnstileSiteKey: process.env.TURNSTILE_SITE_KEY,
      });
    } catch {
      return res.status(502).render("contacto.njk", {
        title: "Contacto",
        errors: { global: "No pudimos enviar tu solicitud en este momento. Intenta más tarde." },
        old: { nombre, apellidos, email, telefono, servicio, mensaje },
        turnstileSiteKey: process.env.TURNSTILE_SITE_KEY,
      });
    }
  };
  nosotros = async(req: Request, res: Response)=>{
      res.render("about.njk", {
      title: "Nosotros",
      
    });
  }
}
