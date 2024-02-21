import Card from "./Card"
import styles from "../styles/Main.module.css"
const Main = () =>{
    let cardsARenderizar =  []; //Utilizo un arreglo hardcodeado para terminar el primer sprin, despues hay que hacer un map con los datos que se trae del back
    for (let index = 0; index < 10; index++) {
        cardsARenderizar[index] = <Card/>;
        
    }
    return (
        <main className={styles.container}>
            <div className={styles.cardsContainer}>
            {cardsARenderizar}
            </div>
        </main>
    )
}

export default Main;