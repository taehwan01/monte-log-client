'use client';

import { useParams } from 'next/navigation';
import styles from './Categories.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Category from './category.interface';

export default function Categories() {
    const router = useRouter();
    const { id } = useParams();
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
                setCategories(response.data.categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (categories.length > 0) {
            const categoryId = Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id ?? '', 10);

            if (isNaN(categoryId) || !categories.some((category) => category.category_id === categoryId)) {
                router.push('/posts');
            }
        }
    }, [id, categories, router]);

    const handleCategoryClick = (categoryId: number) => {
        router.push(`/posts?category=${categoryId}`);
    };

    return (
        <div id={styles.categoryList}>
            {categories.map((category) => (
                <button
                    key={category.category_id}
                    className={styles.categoryButtons}
                    onClick={() => handleCategoryClick(category.category_id)}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
}
