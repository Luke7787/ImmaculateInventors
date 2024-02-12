import React from 'react';
import styles from './ItemBox.module.css';

const ItemBox = () => {
    return (
        <div className={styles.gridContainer}>
            {Array.from({ length: 16 }).map((_, index) => (
                <div className={styles.gridItem} key={index}></div>
            ))}
        </div>
    );
}

export default ItemBox;
