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
        this.#removeAlertField();
        let valid = true;
        let passwordName;
        let firstPassword;
        let confirmPassword;

        for(let field of this.#form.querySelectorAll('input')){
            const label = field.previousElementSibling.innerText;
            // Se os campos forem nulos
            if(!field.value){
                this.#createAlert(field, `O campo "${label}" é obrigatório!`);
                valid = false;
            }

            if(field.classList.contains('input-cpf')){
                
                valid = false;
            }
            
            if(field.classList.contains('input-password')){
                firstPassword = field.value;
                passwordName = label;
                if(firstPassword.length < 12){
                    this.#createAlert(field, `É necessário digitar no mínimo 12 letras.`);
                }
            }

            if(field.classList.contains('input-validation-password')){
                confirmPassword = field.value;
                if(firstPassword != confirmPassword){
                    this.#createAlert(field, `Os campos "${passwordName}s" precisam ser iguais.`)
                }
            }
        }
    }

    #removeAlertField(){
        for(let invalidText of this.#form.querySelectorAll('.invalid-field')){
            invalidText.remove();
        }
    }

    #createAlert(name_value, message){
        const p = document.createElement('p');
        p.innerHTML = message;
        p.classList.add('invalid-field');
        name_value.insertAdjacentElement('afterend', p);
    }
}

const valid = new ValidateForm();
