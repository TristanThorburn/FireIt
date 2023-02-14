import MenuCategoriesHome from "./menu_tab_components/MenuCategoriesHome";
import TableCheck from "./menu_tab_components/TableCheck";
import MenuTabNav from "./navs/MenuTabNav";

const MenuTab = () => {
    return(
        <div className='menuTab'>
            <div className='activeCheck'>
                <TableCheck />
            </div>
            
            <div className='activeMenuCategory'>
                <MenuCategoriesHome />
            </div>
            
            <MenuTabNav />
        </div>
    )
}

export default MenuTab;

// Thoughts:
// I need a way to select/confirm the selection of tables data, left side 20% component?
// Menu Categories component right side 80%
// Replicate nav links between categories?
// Base components on how logic pulls happen as they ARE from specific library paths that so far
//      in the project pulls all of the data from the library, or should I get doc single for each?
// Components:
//      -App Component
            // -Pop Food Adds
            // Modifiers
//      -Mains Component
            // -Pop Food Adds
            // Modifiers
//      -Desert Component
            // -Pop Food Adds
            // Modifiers
//      -Non Alch Tab
//      -Beer Tab
            // -Bottle
            // -Can
            // -Draft
            // Modifiers
//      -Wine Tab
            // Red
            // White
            // Bubbly
            // Modifiers
//      -Mixed Drinks
            // Cocktails
            // Shots
            // Modifiers
//      -Liquor
            // Gin
            // Rum
            // Tequila
            // Vodka
            // Whiskey
            // Modifiers