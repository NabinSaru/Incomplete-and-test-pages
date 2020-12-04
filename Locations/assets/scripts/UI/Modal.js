export class Modal{
    constructor(contentId,fallback)
    {
        this.fallbackText=fallback;
        this.contentTemplateEl = document.getElementById(contentId);
        this.modalTemplateEl = document.getElementById('modal-template');
    }
    show()
    {
        if('content' in document.createElement('template')){
            const modalElements = document.importNode(this.modalTemplateEl.content,true);
            //true is used for cloning the original node
            const modalElement = modalElements.querySelector('.modal');
            const backdropElement = modalElements.querySelector('.backdrop');
            const contentElement = document.importNode(this.contentTemplateEl.content,true);
            modalElement.appendChild(contentElement);
            document.body.insertAdjacentElement('afterbegin',modalElement);
            document.body.insertAdjacentElement('afterbegin',backdropElement);
        }
        else{
            alert(this.fallbackText);
        }
    }
    hide()
    {

    }
}