import type { Product } from "@/models/product";

export const PRODUCTS: Product[] = [
  { id: "p-001", title: "Veste Horizon", category: "men", price: 89, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85", description: "Une veste légère aux lignes épurées.", inStock: true },
  { id: "p-002", title: "Pull Studio", category: "women", price: 64, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85", description: "Maille douce et coupe décontractée.", inStock: true },
  { id: "p-003", title: "Chemise Atelier", category: "men", price: 58, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=900&q=85", description: "Une chemise intemporelle pour tous les jours.", inStock: true },
  { id: "p-004", title: "Sac Forme", category: "accessories", price: 72, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85", description: "Un essentiel compact et pratique.", inStock: true },
  { id: "p-005", title: "Jean droit", category: "women", price: 79, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=85", description: "Denim confortable, coupe droite.", inStock: true },
  { id: "p-006", title: "Surchemise Terrain", category: "men", price: 96, image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85", description: "Une pièce de superposition pour la mi-saison.", inStock: true },
  { id: "p-007", title: "Top essentiel", category: "women", price: 39, image: "https://images.unsplash.com/photo-1564257577-1b7d8edc6e1b?auto=format&fit=crop&w=900&q=85", description: "Un basique facile à associer.", inStock: true },
  { id: "p-008", title: "Casquette Club", category: "accessories", price: 32, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=85", description: "La touche finale du quotidien.", inStock: true },
];
