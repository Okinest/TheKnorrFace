import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  type DocumentData,
} from "firebase/firestore";

import type { CartItem } from "@/models/cart";
import { db } from "@/services/firebase";

// Le panier d'un utilisateur : users/{uid}/cart/{productId}
function cartOf(uid: string) {
  return collection(db, "users", uid, "cart");
}

// Traduit un document Firestore en modèle. L'identifiant du document est le productId
function toCartItem(id: string, data: DocumentData): CartItem {
  return {
    productId: id,
    quantity: data.quantity ?? 1,
    addedAt: data.addedAt ?? 0,
  };
}

// Écoute le panier en temps réel. Renvoie la fonction qui arrête l'écoute
export function subscribeToCart(
  uid: string,
  onChange: (items: CartItem[]) => void,
  onError: (error: Error) => void,
) {
  const q = query(cartOf(uid), orderBy("addedAt", "desc"));
  return onSnapshot(
    q,
    (snap) => onChange(snap.docs.map((d) => toCartItem(d.id, d.data()))),
    onError,
  );
}

export function saveCartItem(uid: string, item: CartItem) {
  return setDoc(doc(cartOf(uid), item.productId), item);
}

export function deleteCartItem(uid: string, productId: string) {
  return deleteDoc(doc(cartOf(uid), productId));
}
