const popup = document.getElementById('popup');
const showPopupButton = document.getElementById('showPopup');
const closePopupButton = document.getElementById('closePopup');


function closePopup() {
    popup.style.display = 'none';
    resetGame()
}

closePopupButton.addEventListener('click', closePopup);
