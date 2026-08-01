'use client'

import { motion } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  merchant: string;
  price: string;
  rating: number;
  category: string;
}

interface Merchant {
  id: number;
  name: string;
  specialty: string;
  description: string;
  featured: number;
}

interface BoutiqueMarketplaceProps {}

const products: Product[] = [
  { id: 1, name: "Vintage Chronograph", merchant: "Timepiece Collective", price: "$4,200", rating: 4.9, category: "Watches" },
  { id: 2, name: "Diamond Pendant", merchant: "Gemstone Archive", price: "$8,500", rating: 5, category: "Jewelry" },
  { id: 3, name: "Silk Scarf", merchant: "Heritage Textiles", price: "$1,200", rating: 4.8, category: "Accessories" },
  { id: 4, name: "Leather Portfolio", merchant: "Artisan Leather", price: "$2,800", rating: 4.9, category: "Leather Goods" },
  { id: 5, name: "Gold Cufflinks", merchant: "Gemstone Archive", price: "$3,600", rating: 5, category: "Jewelry" },
  { id: 6, name: "Cashmere Shawl", merchant: "Heritage Textiles", price: "$2,200", rating: 4.8, category: "Textiles" }
];

const merchants: Merchant[] = [
  { id: 1, name: "Timepiece Collective", specialty: "Luxury Watches", description: "Curated selection of rare and vintage timepieces", featured: 12 },
  { id: 2, name: "Gemstone Archive", specialty: "Fine Jewelry", description: "Exclusive gemstones and bespoke jewelry", featured: 18 },
  { id: 3, name: "Heritage Textiles", specialty: "Luxury Fabrics", description: "Premium silks, cashmere, and rare textiles", featured: 24 }
];

export default function BoutiqueMarketplace(_props: BoutiqueMarketplaceProps = {}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMerchant, setSelectedMerchant] = useState<number | null>(null);

  const filteredProducts = selectedMerchant
    ? products.filter((p) => merchants[selectedMerchant - 1]?.name === p.merchant)
    : products;

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <section className="space-y-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="rounded-lg overflow-hidden border border-slate-700/50 bg-gradient-to-br from-amber-950/40 via-slate-950 to-slate-950 h-56 flex items-center justify-center"
      >
        <p className="text-amber-300/60 text-xs tracking-[0.4em] uppercase">Boutique Marketplace</p>
      </motion.div>

      {/* Merchant Filter */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-100">Exclusive Merchants</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {merchants.map((merchant) => (
            <motion.button
              key={merchant.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedMerchant(selectedMerchant === merchant.id ? null : merchant.id)}
              className={`p-4 rounded-lg border transition-all text-left ${
                selectedMerchant === merchant.id
                  ? "border-amber-400 bg-slate-800/50"
                  : "border-slate-700/50 hover:border-slate-600 bg-slate-900/50"
              }`}
            >
              <p className="font-semibold text-amber-300">{merchant.name}</p>
              <p className="text-sm text-slate-400 mt-1">{merchant.specialty}</p>
              <p className="text-xs text-slate-500 mt-2">{merchant.description}</p>
              <p className="text-xs text-slate-600 mt-2">{merchant.featured} items</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-100">
            {selectedMerchant ? `${merchants[selectedMerchant - 1]?.name} Collection` : "Featured Collection"}
          </h3>
          {selectedMerchant && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedMerchant(null)}
              className="text-sm text-amber-300 hover:text-amber-200 transition"
            >
              Clear Filter
            </motion.button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="group rounded-lg border border-slate-700/50 hover:border-amber-400 bg-slate-900/50 overflow-hidden transition-all cursor-pointer"
            >
              {/* Product Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-amber-300/20 group-hover:text-amber-300/40 transition-colors"
                >
                  <ShoppingBag className="w-16 h-16" />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <button className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded transition-colors text-sm">
                    View Details
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-3">
                <div>
                  <p className="text-sm text-amber-300 font-medium">{product.category}</p>
                  <h4 className="text-slate-100 font-semibold mt-1">{product.name}</h4>
                  <p className="text-xs text-slate-400 mt-1">{product.merchant}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(product.rating)
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-600"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-slate-400 ml-1">{product.rating}</span>
                  </div>
                  <p className="text-amber-300 font-semibold">{product.price}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Merchant Showcase */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="rounded-lg overflow-hidden border border-slate-700/50 bg-gradient-to-br from-slate-900 via-slate-950 to-amber-950/30 h-40 flex items-center justify-center"
      >
        <p className="text-amber-300/60 text-xs tracking-[0.4em] uppercase">Exclusive Merchants</p>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-8 rounded-lg border border-amber-400/30 bg-gradient-to-r from-amber-500/10 to-amber-600/5 text-center space-y-4"
      >
        <h3 className="text-2xl font-bold text-slate-100">Become an Exclusive Merchant</h3>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Join our curated network of luxury brands. Showcase your finest collections to discerning members.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded-lg transition-colors"
        >
          Apply Now
        </motion.button>
      </motion.div>
    </section>
  );
}
