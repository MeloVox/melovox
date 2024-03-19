import { useState } from "react";
import Modal from './Modal';
import TestSpotify from '../assets/logo_spotify.png';


const Test = () => {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");


    const handleOpenModal = () => {
        setOpen(true);
    };


    const handleCloseModal = () => {
        setOpen(false);
    };


    const handleRatingChange = (value) => {
        setRating(value);
    };


    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };


    const handleSubmit = () => {
        // Mettez ici la logique pour envoyer les données du formulaire
        console.log("Note :", rating);
        console.log("Commentaire :", comment);
        setOpen(false); // Ferme la modale après l'envoi
    };


    return (
        <div className="App" style={{ border: "2px solid red" }}>
            <button onClick={handleOpenModal} style={{ display: "flex", flexDirection: "row", color: "red", padding: "3px" }}>
                Noter l'album
            </button>
            <Modal open={open} onClose={handleCloseModal}>
                <div className="text-center w-96">
                    <div className="flex justify-between items-center">
                        <img src={TestSpotify} alt="Couverture de l'album" className="w-16 h-16" />
                        <div>
                            {[1, 2, 3, 4, 5].map((index) => (
                                <button
                                    key={index}
                                    onClick={() => handleRatingChange(index)}
                                    className={`text-xl ${index <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
                                >
                                    &#9733;
                                </button>
                            ))}
                        </div>
                    </div>
                    <p className="text-gray-500 mt-2">Écrivez votre critique ici :</p>


                    <textarea
                        value={comment}
                        onChange={handleCommentChange}
                        className="w-full h-40 mt-4 p-2 border border-gray-300 rounded-md resize-none text-black"
                        placeholder="Laisser parler votre imagination"
                    />
                    <div className="flex justify-center mt-4">
                        <button onClick={handleSubmit} className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Publier</button>
                        <button onClick={handleCloseModal} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">Annuler</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};


export default Test;
