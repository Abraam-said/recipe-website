import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Home.module.scss";

export default function Home() {
    const [meals, setMeals] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Lamb");
    const navigate = useNavigate();

    const categories = [
        "All",
        "Beef",
        "Breakfast",
        "Chicken",
        "Dessert",
        "Goat",
        "Lamb",
        "Miscellaneous",
        "Pasta",
        "Pork",
        "Seafood",
        "Side",
        "Starter",
        "Vegan",
        "Vegetarian",
    ];

    useEffect(() => {
        fetchMeals(selectedCategory);
    }, [selectedCategory]);

    const fetchMeals = (category) => {
        const url =
            category === "All"
                ? "https://www.themealdb.com/api/json/v1/1/search.php?s="
                : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

        axios
            .get(url)
            .then((response) => {
                setMeals(response.data.meals || []);
            })
            .catch((error) => console.error("Error fetching meals:", error));
    };

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (search.length > 2) {
                axios
                    .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
                    .then((response) => {
                        setMeals(response.data.meals || []);
                    })
                    .catch((error) => console.error("Error fetching meals:", error));
            } else {
                fetchMeals(selectedCategory);
            }
        }, 500);

        return () => clearTimeout(delayDebounce);
    }, [search, selectedCategory]);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Learn, Cook, Eat Your Food</h1>

            <div className={styles.categories}>
                {categories.map((category) => (
                    <button
                        key={category}
                        className={
                            selectedCategory === category
                                ? styles.activeButton
                                : styles.categoryButton
                        }
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <input
                type="text"
                placeholder="Search for a meal..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchBar}
            />

            <div className={styles.mealGrid}>
                {meals.length > 0 ? (
                    meals.map((meal) => (
                        <div key={meal.idMeal} className={styles.mealCard}>
                            <img
                                src={meal.strMealThumb}
                                alt={meal.strMeal}
                                className={styles.mealImage}
                            />
                            <h3 className={styles.mealTitle}>{meal.strMeal}</h3>
                            <button
                                className={styles.recipeButton}
                                onClick={() => navigate(`/recipe/${meal.idMeal}`)}
                            >
                                View Recipe
                            </button>
                        </div>
                    ))
                ) : (
                    <p className={styles.noResults}>No meals found.</p>
                )}
            </div>
        </div>
    );
}
