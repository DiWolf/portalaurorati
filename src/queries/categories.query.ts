// src/queries/categories.query.ts
import { query } from "@config/database";

export type CategoryRow = {
  id: number;
  name: string;
  slug: string;
  created_at: string; // o Date si tu driver no usa dateStrings
};

/**
 * Listado simple (sin búsqueda ni paginación)
 */
export async function findAllCategories(): Promise<CategoryRow[]> {
  return await query<CategoryRow[]>(
    "SELECT id, name, slug, created_at FROM categories ORDER BY created_at DESC"
  );
}

/**
 * Total de categorías (útil si luego haces paginación)
 */
export async function countCategories(q?: string): Promise<number> {
  if (q && q.trim()) {
    const like = `%${q.trim()}%`;
    const rows = await query<Array<{ total: number }>>(
      "SELECT COUNT(*) AS total FROM categories WHERE name LIKE ? OR slug LIKE ?",
      [like, like]
    );
    return rows[0]?.total ?? 0;
  }
  const rows = await query<Array<{ total: number }>>(
    "SELECT COUNT(*) AS total FROM categories"
  );
  return rows[0]?.total ?? 0;
}

/**
 * Listado paginado + búsqueda opcional
 * - q: texto para filtrar por name/slug
 * - limit/offset: paginación
 */
export async function findCategoriesPage(
  q: string | undefined,
  limit: number,
  offset: number
): Promise<CategoryRow[]> {
  if (q && q.trim()) {
    const like = `%${q.trim()}%`;
    return await query<CategoryRow[]>(
      `SELECT id, name, slug, created_at
         FROM categories
        WHERE name LIKE ? OR slug LIKE ?
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?`,
      [like, like, limit, offset]
    );
  }

  return await query<CategoryRow[]>(
    `SELECT id, name, slug, created_at
       FROM categories
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?`,
    [limit, offset]
  );
}

export async function insertCategory(name: string, slug: string) {
  return await query("INSERT INTO categories (name, slug) VALUES (?, ?)", [
    name,
    slug,
  ]);
}

export async function updateCategory(id: number, name: string, slug: string) {
  return await query("UPDATE categories SET name = ?, slug = ? WHERE id = ?", [
    name,
    slug,
    id,
  ]);
}

export async function deleteCategory(id: number) {
  return await query("DELETE FROM categories WHERE id = ?", [id]);
}
