import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./ViewRecipe.module.scss";

export default function ViewRecipe() {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        axios
            .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`, {
                signal: controller.signal,
            })
            .then((response) => {
                setMeal(response.data.meals ? response.data.meals[0] : null);
            })
            .catch((error) => {
                if (error.name !== "CanceledError") {
                    console.error("Error fetching meal details:", error);
                }
            });

        return () => controller.abort();
    }, [id]);

    if (!meal) return <p>No meal found.</p>;

    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            ingredients.push({ ingredient, measure });
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{meal.strMeal}</h1>

            <div className={styles.recipeContent}>
                <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className={styles.mealImage}
                />

                <p className={styles.instructions}>{meal.strInstructions}</p>

                <div className={styles.ingredientCard}>
                    <h2>Ingredients</h2>
                    <ul>
                        {ingredients.map((item, index) => (
                            <li key={`${item.ingredient}-${index}`}>
                                <strong>{item.ingredient}:</strong> {item.measure}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.buttons}>
                    {meal.strYoutube && (
                        <a
                            href={meal.strYoutube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.youtube}
                        >
                            YouTube
                        </a>
                    )}
                    {meal.strSource && (
                        <a
                            href={meal.strSource}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.source}
                        >
                            Source
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
