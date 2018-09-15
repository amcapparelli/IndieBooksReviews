import './styles/main.scss';
import reviewsIcon from './resources/img/icono-reseñas2.png';

const printLogo = () => {
    const headerLogo = document.querySelector('.logo-container')
    headerLogo.innerHTML = `<img src="${reviewsIcon}" alt="logo reseñas literarias"> `
    console.log('headerLogo')
    return headerLogo
}

printLogo()


