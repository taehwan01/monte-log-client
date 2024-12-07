'use client';

import { useParams } from 'next/navigation';
import styles from './Categories.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Category from './category.interface';

export default function Categories() {
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

    return (
        <div id={styles.categoryList}>
            {categories.map((category) => (
                <Link
                    key={category.category_id}
                    href={`/posts?category=${category.category_id}`}
                    className={styles.categoryButtons}
                >
                    {category.name}
                </Link>
            ))}
        </div>
    );
}
