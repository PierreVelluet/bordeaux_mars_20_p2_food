import React, {Component} from 'react';
import styles from './CategoryIngredient.module.css'
import CategoryIcon from '../../../Assets/CategoryIcon/CatergoryIcon';
import ingredientsList from '../../../../data/IngredientsList';
import Switch from '@material-ui/core/Switch';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Checkbox from '@material-ui/core/Checkbox';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#10AC84',
      }
    },
  });

class CategoryIngredient extends Component{

    state = {
        toggle: false,
        ingredientsList: ingredientsList
    }

    handleToggle = () => {
        this.setState({
            toggle : !this.state.toggle
        });
    }

    async handleChecked (event) {
        const item = event.target.name;
        const checked = event.target.checked;
        const updatedIngredientsList = this.state.ingredientsList.map(element => {
            if(Object.keys(element) == item){
                return {[item]: checked}
            }
            else{
                return element
            }
        });
        
        await this.setState({ingredientsList: updatedIngredientsList});
        this.toGiveToParent();
    }
    
    toGiveToParent = () => {
        const { ingredientsList } = this.state;
        this.props.callbackFromParent(ingredientsList);
    }

    render(){
        return (
            <React.Fragment>
                <div className= {this.state.toggle ? `${styles.ItemWithCat}` : `${styles.Item}`}>
                    <div className={styles.IconAndName}>
                        <CategoryIcon
                            imageUrl={this.props.imageUrl}
                        />
                        <h3>{this.props.itemName}</h3>
                    </div>
                    <ThemeProvider theme={theme}>
                        <Switch 
                        onChange={this.handleToggle}
                        color="primary"
                        />
                    </ThemeProvider>
                </div>
                <div>
                    {this.state.toggle ?
                        <div className={styles.List}>
                            {this.props.categoryIngredientsName.sort().map((element, index) =>  {
                               
                                const checkList = this.state.ingredientsList.filter(element2 => { //filter the ingredientList and keep only the ingredients checked.
                                    if(Object.values(element2)[0] === true){
                                        return element2
                                    }
                                    return null;
                                })
                                const arrayOfarrays = checkList.map(element=> Object.keys(element)) //get the ingredients names (keys).
                                let checkedIngredientsList = Array.prototype.concat.apply([], arrayOfarrays);// transform the arrayOfArray into a unique array.
                
                                return  <div key={index} className={styles.ItemList}>
                                            <p>{element}</p>
                                            <ThemeProvider theme={theme}>
                                            <Checkbox
                                                style={{ width: 8, height: 8 }}
                                                name={element}
                                                color="primary"
                                                size="small"
                                                onChange={this.handleChecked.bind(this)}
                                                defaultChecked={checkedIngredientsList.indexOf(element) != -1 ? true: false} // check if the element is already in the checkedIngredientList, and if so, check the checkbox.
                                                       
                                            />
                                            </ThemeProvider>
                                        </div>
                                })
                            }
                        </div>
                        :null
                    }
                </div>
            </React.Fragment>
        )
    }
}

export default CategoryIngredient;