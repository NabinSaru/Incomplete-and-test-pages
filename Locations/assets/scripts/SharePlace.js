import {Modal} from './UI/Modal'


class PlaceFinder{
    constructor(){
        const addressForm = document.querySelector('form');
        const locateUserBtn = document.querySelector('#locate-btn');
        locateUserBtn.addEventListener('click',this.locateUserHandler);
        addressForm.addEventListener('submit',this.findAddressHandler);
    }
    locateUserHandler(){
        
        if (!navigator.geolocation) {
            status.textContent = 'Geolocation is not supported by your browser';
            return;
        } 
        const modal =new Modal('loading-modal-content','Loading Location- please wait');
        modal.show();
        navigator.geolocation.getCurrentPosition(
            success=>{
                modal.hide();
                const coordinates={
                    lat:success.coords.latitude,
                    lng:success.coords.longitude,
                };
                console.log(coordinates);
        }, 
            error=>{
                modal.hide();
                alert('Couldn\'t find you, Enter your location Manually')});
    }
    findAddressHandler(){}
    
}
new PlaceFinder();