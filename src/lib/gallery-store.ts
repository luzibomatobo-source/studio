
"use client";

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface GalleryImage {
    src: string;
    alt: string;
    aiHint: string;
}

interface GalleryState {
    images: GalleryImage[];
    addImage: (image: GalleryImage) => void;
    removeImage: (src: string) => void;
}

const initialImages: GalleryImage[] = [
    {
        src: "https://images.pexels.com/photos/54340/sun-rose-teanature-flower-54340.jpeg",
        alt: "A golden sunrise over young plants seen through a protective net.",
        aiHint: "farm sunrise"
    },
    {
        src: "https://images.pexels.com/photos/265076/pexels-photo-265076.jpeg",
        alt: "A close-up of water droplets on vibrant green leaves.",
        aiHint: "fresh leaves"
    },
    {
        src: "https://images.pexels.com/photos/4197483/pexels-photo-4197483.jpeg",
        alt: "A farmer holding a wooden crate filled with fresh, colorful vegetables.",
        aiHint: "farmer holding vegetables"
    },
    {
        src: "https://images.pexels.com/photos/161963/chilis-pepperoni-peppers-spicy-161963.jpeg",
        alt: "A person's hand picking a fresh red chili from a woven basket on the grass.",
        aiHint: "chili basket"
    },
    {
        src: "https://images.pexels.com/photos/235656/pexels-photo-235656.jpeg",
        alt: "Rows of lush green lettuce growing in a field.",
        aiHint: "lettuce field"
    },
    {
        src: "https://images.unsplash.com/photo-1594056501292-c419c968846f",
        alt: "Hands gently holding a freshly opened pomegranate, revealing its vibrant red seeds.",
        aiHint: "pomegranate hands"
    }
];

export const useGalleryStore = create<GalleryState>()(
    persist(
        (set) => ({
            images: initialImages,
            addImage: (image) => set((state) => ({ images: [...state.images, image] })),
            removeImage: (src) => set((state) => ({ images: state.images.filter((img) => img.src !== src) })),
        }),
        {
            name: 'gallery-storage', // name of the item in storage (must be unique)
            storage: createJSONStorage(() => localStorage), // use localStorage
        }
    )
);
