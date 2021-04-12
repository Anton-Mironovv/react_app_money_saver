import style from './NavigationItem.css';

const NavigationItem = (props) => {
    return (
            <span className={style.navListItem}>{props.children}</span>
    );
}

export default NavigationItem;