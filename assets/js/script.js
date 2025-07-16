class ValidateForm {

    #form;
    constructor(){
        this.#form = document.querySelector('.formulario');
        this.#submitEvent();
    }

    #submitEvent(){
        this.#form.addEventListener('submit', e =>{
            e.preventDefault();
            this.#checkField();
        });
    }

    #checkField(){
        for(let field of this.#form.querySelectorAll('input')){
            if(!field.value){
                this.#createAlert(field);
            }
        }
    }

    #createAlert(name_value){
        const p = document.createElement('p');
        let labelTitle = name_value.previousElementSibling.innerHTML;
        p.innerHTML = `O campo ${labelTitle} não pode estar em branco`;
        p.classList.add('invalid-field');
        name_value.insertAdjacentElement('afterend', p);
    }
}

const valid = new ValidateForm();
