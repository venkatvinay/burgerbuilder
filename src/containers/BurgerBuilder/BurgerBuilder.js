import React, { Component } from 'react';

import Aux from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES = {

    salad : 0.5,
    bacon : 0.6,
    meat : 1.3,
    cheese : 0.4

}

class BurgerBuilder extends Component {

    state = {

        ingredients : {

            salad: 0,
            bacon: 0,
            meat : 0,
            cheese : 0

        },

        totalPrice : 4,

        purchaseable : false,

        purchasing: false

    }


    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {

                return sum + el;

            },0);

        this.setState({
            purchaseable:sum>0
        });

    }



    addIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice : newPrice,
            ingredients: updatedIngredients
        });

        this.updatePurchaseState(updatedIngredients);

    }

    removeIngredientHandler = (type) => {

        const oldCount = this.state.ingredients[type];

        if(oldCount <= 0)
        {
            return;

        }
        const updateCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updateCount;

            const priceDown = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDown;

            this.setState({
                totalPrice: newPrice,
                ingredients: updatedIngredients
            });
        
            this.updatePurchaseState(updatedIngredients);

    }

    purchaseHandler = () => {

        this.setState({purchasing: true});

    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        alert('You Can Continue !!!');
    }



    render() {

        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo) {

            disabledInfo[key] = disabledInfo[key] <= 0;

        }

        return(
            <Aux>
                
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BurgerControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    purchaseable={this.state.purchaseable}
                    disabled = {disabledInfo}
                    price = {this.state.totalPrice}
                    ordered = {this.purchaseHandler}
                    />
            </Aux>
        );

    }

}

export default BurgerBuilder;