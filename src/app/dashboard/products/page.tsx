"use client";

import React, { useState } from "react";
import { useDemo, Product } from "@/context/DemoContext";
import { ShoppingBag, Plus, X, Edit, Eye, ShieldCheck, Check } from "lucide-react";
import Link from "next/link";

export default function DashboardProducts() {
  const { products, companies, addProduct, editProduct } = useDemo();

  const myCompany = companies.find((c) => c.id === "comp-1") || companies[0];
  const myProducts = products.filter((p) => p.companyId === myCompany.id);

  // Modal / Form state
  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form Fields
  const [name, setName] = useState("");
  const [category, setCategory] = useState<"Kopi" | "Teh" | "Kriya" | "Tekstil">("Kopi");
  const [monthlyCapacity, setMonthlyCapacity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);

  const certOptions = ["Halal", "HACCP", "Fair Trade", "SVLK", "Organic Indonesia"];

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setName("");
    setCategory("Kopi");
    setMonthlyCapacity("");
    setUnit("kg");
    setDescription("");
    setImageUrl("");
    setSelectedCerts([]);
    setIsOpen(true);
  };

  const handleOpenEdit = (prod: Product) => {
    setEditingProduct(prod);
    setName(prod.name);
    setCategory(prod.category);
    setMonthlyCapacity(prod.monthlyCapacity.toString());
    setUnit(prod.unit);
    setDescription(prod.description);
    setImageUrl(prod.imageUrl);
    setSelectedCerts(prod.certifications);
    setIsOpen(true);
  };

  const handleCertToggle = (cert: string) => {
    if (selectedCerts.includes(cert)) {
      setSelectedCerts(selectedCerts.filter((c) => c !== cert));
    } else {
      setSelectedCerts([...selectedCerts, cert]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !monthlyCapacity || !unit || !description) return;

    // Use default Unsplash image if none provided
    let finalImageUrl = imageUrl;
    if (!finalImageUrl) {
      if (category === "Kopi") finalImageUrl = "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop";
      else if (category === "Teh") finalImageUrl = "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop";
      else if (category === "Tekstil") finalImageUrl = "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600&auto=format&fit=crop";
      else finalImageUrl = "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=600&auto=format&fit=crop";
    }

    if (editingProduct) {
      // Edit mode
      editProduct(editingProduct.id, {
        name,
        category,
        monthlyCapacity: Number(monthlyCapacity),
        unit,
        description,
        imageUrl: finalImageUrl,
        certifications: selectedCerts,
      });
    } else {
      // Add mode
      addProduct({
        name,
        category,
        monthlyCapacity: Number(monthlyCapacity),
        unit,
        description,
        imageUrl: finalImageUrl,
        certifications: selectedCerts,
      });
    }

    setIsOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-forest-950 dark:text-white">My Commodities</h1>
          <p className="text-xs text-forest-700 mt-1">Manage catalog listings visible in the global directory.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-white text-xs font-bold transition-all shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Product List Table / Grid */}
      <div className="p-6 bg-white dark:bg-forest-900/10 rounded-2xl border border-forest-100/20 dark:border-forest-900/20 shadow-sm">
        {myProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-forest-100/10 dark:border-forest-900/20 text-forest-700 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Commodity</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Capacity</th>
                  <th className="py-3 px-4">Certifications</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myProducts.map((prod) => (
                  <tr key={prod.id} className="border-b border-forest-50/10 dark:border-forest-900/10 hover:bg-forest-50/20 dark:hover:bg-forest-900/20 transition-colors">
                    {/* Title & Image */}
                    <td className="py-4 px-4 font-bold text-forest-900 dark:text-white">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={prod.imageUrl}
                          alt={prod.name}
                          className="w-12 h-12 object-cover rounded-xl border border-forest-100/10"
                        />
                        <span className="line-clamp-1">{prod.name}</span>
                      </div>
                    </td>
                    {/* Category */}
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded bg-forest-500/10 text-forest-600 dark:text-forest-700 text-[10px] font-bold">
                        {prod.category}
                      </span>
                    </td>
                    {/* Capacity */}
                    <td className="py-4 px-4 font-semibold">
                      {prod.monthlyCapacity.toLocaleString()} {prod.unit} / month
                    </td>
                    {/* Certs */}
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {prod.certifications.map((cert) => (
                          <span
                            key={cert}
                            className="px-1.5 py-0.5 rounded bg-forest-50 dark:bg-forest-900 text-[9px] font-medium text-forest-600 dark:text-forest-700"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>
                    </td>
                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/product/${prod.id}`}
                          target="_blank"
                          className="p-2 rounded-lg bg-forest-50 hover:bg-forest-100 text-forest-600 dark:bg-forest-900/50 dark:hover:bg-forest-900 text-xs flex items-center justify-center"
                          title="View on Public Catalog"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleOpenEdit(prod)}
                          className="p-2 rounded-lg bg-forest-600 hover:bg-forest-700 text-white text-xs flex items-center justify-center"
                          title="Edit Listing"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 text-center text-forest-700">
            <ShoppingBag className="w-12 h-12 text-forest-800 mx-auto mb-2 animate-pulse" />
            <p className="font-bold text-forest-700 dark:text-forest-800">Catalog is Empty</p>
            <p className="text-xs text-forest-700 max-w-sm mx-auto mt-1 leading-normal">
              You haven&apos;t added any commodities. Add your products now to list them in the international buyers index directory.
            </p>
          </div>
        )}
      </div>

      {/* Form Dialog Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-forest-950 rounded-3xl border border-forest-100/20 dark:border-forest-900/30 w-full max-w-2xl p-8 relative shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            
            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-forest-50 dark:hover:bg-forest-900 text-forest-700 hover:text-forest-950 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <span className="text-[10px] font-bold text-gold-500 uppercase tracking-widest block mb-1">
                  Catalog Management
                </span>
                <h3 className="text-lg font-bold text-forest-950 dark:text-white">
                  {editingProduct ? `Edit Listing: ${editingProduct.name}` : "List New Commodity"}
                </h3>
                <p className="text-xs text-forest-700 mt-1">
                  Semua inputan terhubung secara dinamis dan memperbarui data simulasi platform secara langsung.
                </p>
              </div>

              <div className="space-y-4">
                {/* Product Name */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-forest-700 uppercase tracking-wider">Product Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sunda Hejo Specialty Arabica Beans"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs p-3 bg-forest-50/50 dark:bg-forest-900 border border-forest-100 dark:border-forest-900 rounded-xl outline-none focus:border-forest-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Category */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-forest-700 uppercase tracking-wider">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full text-xs p-3 bg-forest-50/50 dark:bg-forest-900 border border-forest-100 dark:border-forest-900 rounded-xl outline-none"
                    >
                      <option value="Kopi">Kopi</option>
                      <option value="Teh">Teh</option>
                      <option value="Kriya">Kriya</option>
                      <option value="Tekstil">Tekstil</option>
                    </select>
                  </div>

                  {/* Capacity */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-forest-700 uppercase tracking-wider">Monthly Capacity</label>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="e.g. 5000"
                      value={monthlyCapacity}
                      onChange={(e) => setMonthlyCapacity(e.target.value)}
                      className="w-full text-xs p-3 bg-forest-50/50 dark:bg-forest-900 border border-forest-100 dark:border-forest-900 rounded-xl outline-none focus:border-forest-500"
                    />
                  </div>

                  {/* Unit */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-forest-700 uppercase tracking-wider">Unit</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. kg, pcs, tons"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="w-full text-xs p-3 bg-forest-50/50 dark:bg-forest-900 border border-forest-100 dark:border-forest-900 rounded-xl outline-none focus:border-forest-500"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-forest-700 uppercase tracking-wider">Product Description</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide export quality specifications, grades, moisture, flavor profiles..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full text-xs p-3 bg-forest-50/50 dark:bg-forest-900 border border-forest-100 dark:border-forest-900 rounded-xl outline-none focus:border-forest-500"
                  ></textarea>
                </div>

                {/* Image URL */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-forest-700 uppercase tracking-wider">Photo URL (Optional)</label>
                  <input
                    type="url"
                    placeholder="Leave empty for category default, or enter Unsplash image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full text-xs p-3 bg-forest-50/50 dark:bg-forest-900 border border-forest-100 dark:border-forest-900 rounded-xl outline-none focus:border-forest-500"
                  />
                </div>

                {/* Certifications Checklist */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-forest-700 uppercase tracking-wider block">Certifications</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {certOptions.map((cert) => {
                      const isChecked = selectedCerts.includes(cert);
                      return (
                        <button
                          type="button"
                          key={cert}
                          onClick={() => handleCertToggle(cert)}
                          className={`flex items-center justify-between p-2.5 rounded-xl border text-[11px] font-semibold transition-all ${
                            isChecked
                              ? "bg-forest-500/10 border-forest-500 text-forest-600 dark:text-forest-700 font-bold"
                              : "border-forest-100 dark:border-forest-900 text-forest-800 hover:bg-forest-50 dark:hover:bg-forest-900/30"
                          }`}
                        >
                          <span>{cert}</span>
                          {isChecked && <Check className="w-3.5 h-3.5 text-forest-800" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-forest-100/10 dark:border-forest-900/20 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-3 rounded-xl border border-forest-100 text-forest-800 text-xs font-bold hover:bg-forest-50 dark:border-forest-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-forest-600 hover:bg-forest-700 text-white text-xs font-bold transition-all shadow-md"
                >
                  {editingProduct ? "Save Changes" : "Submit Listing"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
