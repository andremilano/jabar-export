"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Role = "buyer" | "sme" | "admin";

export interface Company {
  id: string;
  name: string;
  establishedYear: number;
  description: string;
  isVerified: boolean;
  nib: string;
  npwp: string;
  location: string;
  logo: string;
}

export interface Product {
  id: string;
  companyId: string;
  companyName: string;
  name: string;
  category: "Kopi" | "Teh" | "Kriya" | "Tekstil";
  monthlyCapacity: number;
  unit: string;
  description: string;
  imageUrl: string;
  certifications: string[];
}

export interface Inquiry {
  id: string;
  productId: string;
  productName: string;
  companyId: string;
  buyerName: string;
  buyerEmail: string;
  country: string;
  quantity: number;
  message: string;
  createdAt: string;
}

interface DemoContextType {
  role: Role;
  setRole: (role: Role) => void;
  companies: Company[];
  products: Product[];
  inquiries: Inquiry[];
  updateCompanyVerification: (companyId: string, verified: boolean) => void;
  addCompany: (company: Omit<Company, "id" | "isVerified">) => void;
  addProduct: (product: Omit<Product, "id" | "companyId" | "companyName">) => void;
  editProduct: (productId: string, updatedProduct: Partial<Product>) => void;
  addInquiry: (inquiry: Omit<Inquiry, "id" | "createdAt" | "productName" | "companyId">) => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

const initialCompanies: Company[] = [
  {
    id: "comp-1",
    name: "Priangan Coffee Cooperative",
    establishedYear: 2015,
    description: "Koperasi produsen kopi Arabika specialty Sunda Hejo di dataran tinggi Ciwidey dengan proses pasca-panen basah, natural, dan honey. Berkomitmen pada keberlanjutan lingkungan dan pemberdayaan petani kopi lokal Jawa Barat.",
    isVerified: true,
    nib: "9120005432101",
    npwp: "01.234.567.8-403.000",
    location: "Bandung Regency, West Java",
    logo: "coffee",
  },
  {
    id: "comp-2",
    name: "Java Silk Weavers",
    establishedYear: 2012,
    description: "Pusat tenun sutra alam premium khas Garut. Kami menggunakan serat sutra alami pilihan dan pewarna organik dari tumbuh-tumbuhan lokal untuk menciptakan kain tenun bermotif tradisional Sunda yang mewah dan ramah lingkungan.",
    isVerified: true,
    nib: "9120005432102",
    npwp: "01.234.567.8-442.000",
    location: "Garut Regency, West Java",
    logo: "textile",
  },
  {
    id: "comp-3",
    name: "Sunda Woodcraft & Rattan",
    establishedYear: 2020,
    description: "Pengrajin kriya kayu dan rotan estetik untuk pasar ekspor. Kami mendesain mebel kecil, dekorasi dinding, dan perabot rumah tangga dengan sentuhan minimalis modern yang dipadukan dengan teknik anyaman rotan tradisional Cirebon.",
    isVerified: false,
    nib: "9120005432103",
    npwp: "01.234.567.8-426.000",
    location: "Cirebon Regency, West Java",
    logo: "craft",
  },
];

const initialProducts: Product[] = [
  {
    id: "prod-1",
    companyId: "comp-1",
    companyName: "Priangan Coffee Cooperative",
    name: "Sunda Hejo Specialty Coffee Arabica",
    category: "Kopi",
    monthlyCapacity: 5000,
    unit: "kg",
    description: "Biji kopi Arabika pilihan yang ditanam di ketinggian 1.400 mdpl. Memiliki profil rasa buah (fruity) yang cerah, keasaman sedang, dengan notes gula aren dan teh hitam di bagian akhir. Cocok untuk roaster internasional.",
    imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop",
    certifications: ["Halal", "Organic Indonesia", "Fair Trade"],
  },
  {
    id: "prod-2",
    companyId: "comp-2",
    companyName: "Java Silk Weavers",
    name: "Premium Garut Silk Sarong",
    category: "Tekstil",
    monthlyCapacity: 200,
    unit: "pcs",
    description: "Sarung sutra eksklusif yang ditenun secara manual menggunakan ATBM (Alat Tenun Bukan Mesin). Memiliki tekstur halus, kilau alami yang menawan, dan motif khusus Priangan yang tidak luntur karena menggunakan pewarna alami.",
    imageUrl: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=600&auto=format&fit=crop",
    certifications: ["Halal", "Indonesian Handwoven Certification"],
  },
  {
    id: "prod-3",
    companyId: "comp-3",
    companyName: "Sunda Woodcraft & Rattan",
    name: "Handcrafted Rattan Armchair",
    category: "Kriya",
    monthlyCapacity: 150,
    unit: "pcs",
    description: "Kursi santai rotan dengan rangka kayu mahoni solid. Desain ergonomis yang sangat nyaman digunakan untuk area lounge atau teras. Tahan cuaca dan telah di-treatment antijamur untuk standar pengiriman kontainer internasional.",
    imageUrl: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=600&auto=format&fit=crop",
    certifications: ["SVLK (Sistem Verifikasi Legalitas Kayu)"],
  },
  {
    id: "prod-4",
    companyId: "comp-1",
    companyName: "Priangan Coffee Cooperative",
    name: "Ciwidey Highland Green Tea (Premium Leaf)",
    category: "Teh",
    monthlyCapacity: 3000,
    unit: "kg",
    description: "Teh hijau premium hasil petikan pucuk daun teh segar di pagi hari dari lereng Gunung Patuha. Diproses dengan pemanasan uap minimal untuk menjaga aroma rumput segar yang manis, kaya antioksidan, dan rasa umami yang seimbang.",
    imageUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop",
    certifications: ["Halal", "HACCP", "Organic Indonesia"],
  },
];

const initialInquiries: Inquiry[] = [
  {
    id: "inq-1",
    productId: "prod-1",
    productName: "Sunda Hejo Specialty Coffee Arabica",
    companyId: "comp-1",
    buyerName: "Hans Müller",
    buyerEmail: "hans.mueller@alpsroasters.de",
    country: "Germany",
    quantity: 1200,
    message: "Hallo, we are interested in importing your specialty green beans. Could you please provide a sample of 2kg to Munich? Also, do you offer FOB Port of Tanjung Priok pricing for 1.2 tons?",
    createdAt: "2026-07-05T09:30:00Z",
  },
  {
    id: "inq-2",
    productId: "prod-3",
    productName: "Handcrafted Rattan Armchair",
    companyId: "comp-3",
    buyerName: "Sarah Connor",
    buyerEmail: "s.connor@ausdecor.com.au",
    country: "Australia",
    quantity: 50,
    message: "Hi, I am looking to purchase 50 units of the rattan armchair for our showroom in Sydney. Can you confirm if you have the SVLK documents completed, and what is the lead time for this order?",
    createdAt: "2026-07-06T03:15:00Z",
  },
];

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>("buyer");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  // Load from localStorage or set defaults
  useEffect(() => {
    const storedCompanies = localStorage.getItem("jebar_companies");
    const storedProducts = localStorage.getItem("jebar_products");
    const storedInquiries = localStorage.getItem("jebar_inquiries");
    const storedRole = localStorage.getItem("jebar_role");

    if (storedCompanies) setCompanies(JSON.parse(storedCompanies));
    else {
      setCompanies(initialCompanies);
      localStorage.setItem("jebar_companies", JSON.stringify(initialCompanies));
    }

    if (storedProducts) setProducts(JSON.parse(storedProducts));
    else {
      setProducts(initialProducts);
      localStorage.setItem("jebar_products", JSON.stringify(initialProducts));
    }

    if (storedInquiries) setInquiries(JSON.parse(storedInquiries));
    else {
      setInquiries(initialInquiries);
      localStorage.setItem("jebar_inquiries", JSON.stringify(initialInquiries));
    }

    if (storedRole) setRole(storedRole as Role);
  }, []);

  const saveToStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const handleSetRole = (newRole: Role) => {
    setRole(newRole);
    localStorage.setItem("jebar_role", newRole);
  };

  const updateCompanyVerification = (companyId: string, verified: boolean) => {
    const updated = companies.map((c) =>
      c.id === companyId ? { ...c, isVerified: verified } : c
    );
    setCompanies(updated);
    saveToStorage("jebar_companies", updated);
  };

  const addCompany = (companyData: Omit<Company, "id" | "isVerified">) => {
    const newCompany: Company = {
      ...companyData,
      id: `comp-${Date.now()}`,
      isVerified: false,
    };
    const updated = [...companies, newCompany];
    setCompanies(updated);
    saveToStorage("jebar_companies", updated);
  };

  const addProduct = (productData: Omit<Product, "id" | "companyId" | "companyName">) => {
    // For demo, assume added by the active SME company (comp-1)
    const activeCompany = companies.find((c) => c.id === "comp-1") || companies[0];
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now()}`,
      companyId: activeCompany.id,
      companyName: activeCompany.name,
    };
    const updated = [...products, newProduct];
    setProducts(updated);
    saveToStorage("jebar_products", updated);
  };

  const editProduct = (productId: string, updatedProduct: Partial<Product>) => {
    const updated = products.map((p) =>
      p.id === productId ? { ...p, ...updatedProduct } : p
    );
    setProducts(updated);
    saveToStorage("jebar_products", updated);
  };

  const addInquiry = (inquiryData: Omit<Inquiry, "id" | "createdAt" | "productName" | "companyId">) => {
    const targetProduct = products.find((p) => p.id === inquiryData.productId);
    if (!targetProduct) return;

    const newInquiry: Inquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      productName: targetProduct.name,
      companyId: targetProduct.companyId,
      createdAt: new Date().toISOString(),
    };
    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    saveToStorage("jebar_inquiries", updated);
  };

  return (
    <DemoContext.Provider
      value={{
        role,
        setRole: handleSetRole,
        companies,
        products,
        inquiries,
        updateCompanyVerification,
        addCompany,
        addProduct,
        editProduct,
        addInquiry,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) throw new Error("useDemo must be used within a DemoProvider");
  return context;
};
