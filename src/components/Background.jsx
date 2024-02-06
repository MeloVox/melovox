import React, { useEffect } from 'react';

function Background() {
    useEffect(() => {
        const colors = ['#0DD940', '#1D2DB6', '#1E0126', '#6B1669', '#D340AA'];
        const body = document.querySelector('body');
        const numColors = colors.length;

        const getRandomColor = () => {
            return colors[Math.floor(Math.random() * numColors)];
        };

        const createRandomSpot = () => {
            const spot = document.createElement('div');
            spot.className = 'spot';
            spot.style.backgroundColor = getRandomColor();

            // Générer une taille de spot aléatoire entre 75 et 150 pixels
            const spotSize = Math.floor(Math.random() * (150 - 75 + 1)) + 75;

            const maxWidth = window.innerWidth - spotSize; 
            const maxHeight = window.innerHeight - spotSize; 
            
            // Générer des positions aléatoires à l'intérieur des limites de la fenêtre
            const randomLeft = Math.random() * maxWidth;
            const randomTop = Math.random() * maxHeight;

            // Assurez-vous que les taches restent entièrement visibles à l'intérieur de la fenêtre
            spot.style.width = `${spotSize}px`;
            spot.style.height = `${spotSize}px`;
            spot.style.left = `${Math.min(maxWidth, randomLeft)}px`;
            spot.style.top = `${Math.min(maxHeight, randomTop)}px`;

            body.appendChild(spot);
        };

        // Create multiple random spots
        for (let i = 0; i < 75; i++) {
            createRandomSpot();
        }

        const handleResize = () => {
            // Recalculate and adjust spots on window resize
            const spots = document.querySelectorAll('.spot');
            spots.forEach((spot) => {
                const spotSize = Math.floor(Math.random() * (150 - 75 + 1)) + 75;
                const maxWidth = window.innerWidth - spotSize;
                const maxHeight = window.innerHeight - spotSize;
                const randomLeft = Math.random() * maxWidth;
                const randomTop = Math.random() * maxHeight;
                spot.style.width = `${spotSize}px`;
                spot.style.height = `${spotSize}px`;
                spot.style.left = `${Math.min(maxWidth, randomLeft)}px`;
                spot.style.top = `${Math.min(maxHeight, randomTop)}px`;
            });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            // Clean up event listener and any DOM elements created
            window.removeEventListener('resize', handleResize);
            const spots = document.querySelectorAll('.spot');
            spots.forEach((spot) => spot.remove());
        };
    }, []);

    return null;
}

export default Background;