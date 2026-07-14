"use client";

import React, { useState } from "react";
import { useDemo, Product } from "@/context/DemoContext";
import { ShoppingBag, Plus, X, Edit, Eye, Check } from "lucide-react";
import Link from "next/link";

export default function DashboardProducts() {
  const { products, companies, addProduct, editProduct, currentUser } = useDemo();

  const myCompany = companies.find((c) => c.id === currentUser?.companyId) || companies[0];
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
  const [basePrice, setBasePrice] = useState("");

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
    setBasePrice("");
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
    setBasePrice(prod.basePrice?.toString() || "");
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

    let finalImageUrl = imageUrl;
    if (!finalImageUrl) {
      if (category === "Kopi") finalImageUrl = "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop";
      else if (category === "Teh") finalImageUrl = "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop";
      else if (category === "Tekstil") finalImageUrl = "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600&auto=format&fit=crop";
      else finalImageUrl = "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=600&auto=format&fit=crop";
    }

    if (editingProduct) {
      editProduct(editingProduct.id, {
        name,
        category,
        monthlyCapacity: Number(monthlyCapacity),
        unit,
        description,
        imageUrl: finalImageUrl,
        certifications: selectedCerts,
        basePrice: Number(basePrice) || 0,
      });
    } else {
      addProduct({
        name,
        category,
        monthlyCapacity: Number(monthlyCapacity),
        unit,
        description,
        imageUrl: finalImageUrl,
        certifications: selectedCerts,
        basePrice: Number(basePrice) || 0,
      });
    }

    setIsOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1C1917] font-serif">My Commodities</h1>
          <p className="text-xs text-[#57534E] mt-1">Manage catalog listings visible in the global directory.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="btn-primary flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Product List Table / Grid */}
      <div className="p-6 bg-white rounded-[12px] border border-[#E7E5E4] border-b-2 border-b-[#D6D3D1]">
        {myProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-[#E7E5E4] text-[#57534E] font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Commodity</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Capacity</th>
                  <th className="py-3 px-4">Certifications</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myProducts.map((prod) => (
                  <tr key={prod.id} className="border-b border-[#E7E5E4] hover:bg-[#F5F5EB] transition-colors">
                    {/* Title & Image */}
                    <td className="py-4 px-4 font-bold text-[#1C1917]">
                      <div className="flex items-center gap-3 font-sans">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={prod.imageUrl}
                          alt={prod.name}
                          className="w-12 h-12 object-cover rounded-[8px] border border-[#D6D3D1]"
                        />
                        <span className="line-clamp-1">{prod.name}</span>
                      </div>
                    </td>
                    {/* Category */}
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 rounded-[4px] bg-[#F5F5EB] border border-[#D6D3D1] text-[#166534] text-[10px] font-bold">
                        {prod.category}
                      </span>
                    </td>
                    {/* Capacity */}
                    <td className="py-4 px-4 font-semibold text-[#1C1917]">
                      {prod.monthlyCapacity.toLocaleString()} {prod.unit} / month
                    </td>
                    {/* Certs */}
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1 font-sans">
                        {prod.certifications.map((cert) => (
                          <span
                            key={cert}
                            className="px-1.5 py-0.5 rounded-[4px] bg-[#F5F5EB] border border-[#D6D3D1] text-[9px] font-medium text-[#57534E]"
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
                          className="p-2 rounded-[8px] bg-[#F5F5EB] border border-[#D6D3D1] hover:bg-[#E7E5E4] text-[#166534] text-xs flex items-center justify-center cursor-pointer"
                          title="View on Public Catalog"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleOpenEdit(prod)}
                          className="p-2 rounded-[8px] bg-[#166534] border border-[#166534] hover:bg-[#14532D] text-white text-xs flex items-center justify-center cursor-pointer"
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
          <div className="py-12 text-center text-[#57534E]">
            <ShoppingBag className="w-12 h-12 text-[#A8A29E] mx-auto mb-2" />
            <p className="font-bold text-[#1C1917]">Catalog is Empty</p>
            <p className="text-xs text-[#57534E] max-w-sm mx-auto mt-1 leading-normal">
              You haven&apos;t added any commodities. Add your products now to list them in the international buyers index directory.
            </p>
          </div>
        )}
      </div>

      {/* Form Dialog Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1917]/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[12px] border border-[#D6D3D1] border-b-[3px] border-b-[#A8A29E] w-full max-w-2xl p-8 relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto shadow-none">
            
            {/* Close */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-1.5 rounded-[4px] hover:bg-[#F5F5EB] text-[#A8A29E] hover:text-[#1C1917] cursor-pointer bg-transparent border-none"
            >
              <X className="w-4 h-4" />
            </button>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <span className="text-[10px] font-bold text-[#A47148] uppercase tracking-widest block mb-1">
                  Catalog Management
                </span>
                <h3 className="text-lg font-bold text-[#1C1917] font-serif">
                  {editingProduct ? `Edit Listing: ${editingProduct.name}` : "List New Commodity"}
                </h3>
                <p className="text-xs text-[#57534E] mt-1">
                  Semua inputan terhubung secara dinamis dan memperbarui data simulasi platform secara langsung.
                </p>
              </div>

              <div className="space-y-4">
                {/* Product Name */}
                <div className="space-y-1">
                  <label className="input-label">Product Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sunda Hejo Specialty Arabica Beans"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-text"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category */}
                  <div className="space-y-1">
                    <label className="input-label">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full text-xs p-3 bg-white border border-[#D6D3D1] rounded-[8px] outline-none cursor-pointer focus:border-[#166534] focus:ring-2 focus:ring-[#166534]/20"
                    >
                      <option value="Kopi">Kopi</option>
                      <option value="Teh">Teh</option>
                      <option value="Kriya">Kriya</option>
                      <option value="Tekstil">Tekstil</option>
                    </select>
                  </div>

                  {/* Base Price */}
                  <div className="space-y-1">
                    <label className="input-label">Base Price (USD / Unit)</label>
                    <input
                      type="number"
                      required
                      min="0.01"
                      step="0.01"
                      placeholder="e.g. 8.50"
                      value={basePrice}
                      onChange={(e) => setBasePrice(e.target.value)}
                      className="input-text"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Capacity */}
                  <div className="space-y-1">
                    <label className="input-label">Monthly Capacity</label>
                    <input
                      type="number"
                      required
                      min="1"
                      placeholder="e.g. 5000"
                      value={monthlyCapacity}
                      onChange={(e) => setMonthlyCapacity(e.target.value)}
                      className="input-text"
                    />
                  </div>

                  {/* Unit */}
                  <div className="space-y-1">
                    <label className="input-label">Unit</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. kg, pcs, tons"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="input-text"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="input-label">Product Description</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide export quality specifications, grades, moisture, flavor profiles..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="input-text h-auto py-3"
                  ></textarea>
                </div>

                {/* Image URL */}
                <div className="space-y-1">
                  <label className="input-label">Photo URL (Optional)</label>
                  <input
                    type="url"
                    placeholder="Leave empty for category default, or enter Unsplash image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="input-text"
                  />
                </div>

                {/* Certifications Checklist */}
                <div className="space-y-2">
                  <label className="input-label">Certifications</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {certOptions.map((cert) => {
                      const isChecked = selectedCerts.includes(cert);
                      return (
                        <button
                          type="button"
                          key={cert}
                          onClick={() => handleCertToggle(cert)}
                          className={`flex items-center justify-between p-2.5 rounded-[8px] border text-[11px] font-semibold transition-all cursor-pointer ${
                            isChecked
                              ? "bg-[#F0FDF4] border-[#166534] text-[#166534] font-bold"
                              : "border-[#D6D3D1] bg-white text-[#57534E] hover:border-[#A8A29E]"
                          }`}
                        >
                          <span>{cert}</span>
                          {isChecked && <Check className="w-3.5 h-3.5 text-[#166534]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-[#E7E5E4] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn-secondary cursor-pointer border-2 border-[#166534] rounded-[8px] px-5 py-3 text-xs font-bold hover:bg-[#F5F5EB] text-[#166534] bg-transparent"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary cursor-pointer px-6 py-3"
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
