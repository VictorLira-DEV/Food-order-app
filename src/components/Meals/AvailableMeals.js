import styles from "../../styles/Meals/AvailableMeals/AvailableMeals.module.css";
import { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                "https://react-http-d779a-default-rtdb.firebaseio.com/meals.json"
            );

            if(!response.ok){
                throw new Error('Something went wrong')
            }

            const data = await response.json();
            const loadedMeals = [];

            for (const key in data) {
                loadedMeals.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price,
                });
            }
            setMeals(loadedMeals);
            setIsLoading(false)
        };

        fetchData().catch(error => {
            setIsLoading(false);
            setHttpError(error.message)
        })

    }, []);

    if(isLoading){
        return <section className={styles.mealsLoading}>
            <p>Loading...</p>
        </section>
    }

    if(httpError){
        return <section className={styles.mealsError}>
            <p>{httpError}</p>
        </section>
    }

    const mealsList = meals.map((meal) => (
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));

    return (
        <section className={styles.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;
