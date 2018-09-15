import './styles/main.scss';
import reviewsIcon from './resources/img/icono-resenas.png';

const printLogo = () => {
    const headerLogo = document.querySelector('.logo-container')
    headerLogo.innerHTML = `<img src="${reviewsIcon}" alt="logo reseñas literarias"> `
    return headerLogo
}

printLogo()


