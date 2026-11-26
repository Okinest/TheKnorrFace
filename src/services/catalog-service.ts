import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  type DocumentData,
} from "firebase/firestore";

import { CATEGORY_LABELS, type Product, type ProductCategory, type ProductInput } from "@/models/product";
import { db } from "@/services/firebase";

// Catalogue commun à tous les utilisateurs : products/{productId}
// Chaque document porte l'uid de son auteur dans ownerId.
const products = collection(db, "products");

function toCategory(value: unknown): ProductCategory {
  return typeof value === "string" && value in CATEGORY_LABELS ? (value as ProductCategory) : "accessories";
}

function toProduct(id: string, data: DocumentData): Product {
  return {
    id,
    title: data.title ?? "",
    description: data.description ?? "",
    price: typeof data.price === "number" ? data.price : 0,
    category: toCategory(data.category),
    brand: data.brand ? data.brand : undefined,
    image: data.image ?? "",
    inStock: data.inStock ?? true,
    ownerId: data.ownerId,
  };
}

function toFields(input: ProductInput) {
  return {
    title: input.title.trim(),
    description: input.description.trim(),
    price: input.price,
    category: input.category,
    brand: input.brand.trim(),
    image: input.image.trim(),
    inStock: input.inStock,
  };
}

// Écoute tout le catalogue en temps réel. Renvoie la fonction qui arrête l'écoute
export function subscribeToCatalog(
  onChange: (items: Product[]) => void,
  onError: (error: Error) => void,
) {
  return onSnapshot(
    query(products, orderBy("createdAt", "desc")),
    (snap) => onChange(snap.docs.map((d) => toProduct(d.id, d.data()))),
    onError,
  );
}

// Écoute un seul article. `null` signifie qu'il n'existe pas (ou plus)
export function subscribeToCatalogProduct(
  id: string,
  onChange: (product: Product | null) => void,
  onError: (error: Error) => void,
) {
  return onSnapshot(
    doc(products, id),
    (snap) => onChange(snap.exists() ? toProduct(snap.id, snap.data()) : null),
    onError,
  );
}

export async function createProduct(ownerId: string, input: ProductInput): Promise<string> {
  const ref = await addDoc(products, { ...toFields(input), ownerId, createdAt: Date.now() });
  return ref.id;
}

export function updateProduct(id: string, input: ProductInput) {
  return updateDoc(doc(products, id), toFields(input));
}

export function deleteProduct(id: string) {
  return deleteDoc(doc(products, id));
}
