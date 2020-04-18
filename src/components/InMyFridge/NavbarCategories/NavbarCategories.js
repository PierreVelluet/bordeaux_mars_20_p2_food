import React, { Component } from 'react';
import styles from './NavbarCategories.module.css';
import CategoryIngredient from './CategoryIngredient/CategoryIngredient';
// import Fish from '../../../Images/Icone/Fish.png'
// import Vegetables from '../../../Images/Icone/Vegetables.png'
// import Meat from '../../../Images/Icone/Meat.png'
// import Cereals from '../../../Images/Icone/Cereals.png'
// import axios from 'axios'
import ingredients from '../../../data/Ingredients'

class NavbarCategories extends Component{

    state={
        ingredientsList: null,
    }
        
    render() {
    console.log(this.state.ingredientsList)
        return (
            <div className={styles.CategoryContainer}>

                {ingredients.map((element, index) => {
                    return <CategoryIngredient
                        callbackFromParent={this.props.ingredientChoice}
                        key={index}
                        imageUrl={element.icon}
                        itemName={element.title}
                        ingredientsList={element.ingredientsName.map(element => element.name)}
                        
                    />
                })}
                <button onClick={this.props.buttonCall}>Get a recipe !</button>
            </div>
        )
    }
}

export default NavbarCategories;