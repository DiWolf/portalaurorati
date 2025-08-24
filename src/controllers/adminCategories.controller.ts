import { Request, Response } from "express";
import {
  findAllCategories,
  insertCategory,
  updateCategory,
  deleteCategory,
  findCategoriesPage
} from "@queries/categories.query";

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // sin acentos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 140);
}

export class AdminCategoriesController {
   list = async (req: Request, res: Response) => {
    try {
      const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';

      // Si no quieres paginación aún, trae solo la “página 1” con un límite razonable
      const categories = q
        ? await findCategoriesPage(q, 100, 0)  // filtra por name/slug
        : await findAllCategories();           // listado completo

      res.render("admin/blog/categories/list.njk", {
        title: "Categorias",
        navegacion: "Categorias",
        categories,
        q,                 // ← para rellenar el input
        page: 1,           // defaults mientras no uses paginación real
        total_pages: 1,
        prev_page: null,
        next_page: null,
      });
    } catch (err) {
      console.error('Error al listar categorías:', err);
      res.status(500).send('Error al listar categorías');
    }
  };
  create = async (req: Request, res: Response) => {
    try {
      const { name } = req.body as { name?: string };
      if (!name || !name.trim()) {
        return res
          .status(400)
          .json({ ok: false, error: "El nombre es requerido." });
      }
      const slug = slugify(name);
      await insertCategory(name.trim(), slug);
      return res.json({ ok: true });
    } catch (err: any) {
      if (err?.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
          ok: false,
          error: "La categoría ya existe (slug duplicado).",
        });
      }
      console.error("Error creando categoría:", err);
      return res.status(500).json({ ok: false, error: "Error del servidor." });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { name } = req.body as { name?: string };
      if (!id || Number.isNaN(id)) {
        return res.status(400).json({ ok: false, error: "ID inválido." });
      }
      if (!name || !name.trim()) {
        return res
          .status(400)
          .json({ ok: false, error: "El nombre es requerido." });
      }
      const slug = slugify(name);
      await updateCategory(id, name.trim(), slug);
      return res.json({ ok: true });
    } catch (err: any) {
      if (err?.code === "ER_DUP_ENTRY") {
        return res.status(409).json({
          ok: false,
          error: "Ya existe otra categoría con ese nombre/slug.",
        });
      }
      console.error("Error actualizando categoría:", err);
      return res.status(500).json({ ok: false, error: "Error del servidor." });
    }
  };
  remove = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      if (!id || Number.isNaN(id)) {
        return res.status(400).json({ ok: false, error: "ID inválido." });
      }

      const result: any = await deleteCategory(id);

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ ok: false, error: "Categoría no encontrada." });
      }

      return res.json({ ok: true });
    } catch (err) {
      console.error("Error eliminando categoría:", err);
      return res.status(500).json({ ok: false, error: "Error del servidor." });
    }
  };
}
