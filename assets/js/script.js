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
                if(!this.#validatingCPF(field)) valid = false;
            }

            if(field.classList.contains('input-name')){
                let valid = true;
                const username = field.value;
                if(field.value.length < 3 || field.value.length > 12){
                    this.#createAlert(field, `O campo ${label} precisa ter ao mínimo 3 a 12 caracteres`);
                    valid = false;
                }
                
                if(!username.match(/^[\p{L}\p{N} ]+$/u)){
                    this.#createAlert(field, `O nome do usuário precisa conter letras ou números`);
                    valid = false;
                }
            }

            if(field.classList.contains('input-email')){
                
            }
            
            if(field.classList.contains('input-password')){
                firstPassword = field.value;
                passwordName = label;
                if(firstPassword.length < 6 || firstPassword.length > 12){
                    this.#createAlert(field, `É necessário digitar no mínimo 12 letras.`);
                    valid = false;
                }
            }

            if(field.classList.contains('input-validation-password')){
                firstPassword = field.value;
                confirmPassword = field.value;
                if(firstPassword != confirmPassword){
                    this.#createAlert(field, `Os campos "${passwordName}s" precisam ser iguais.`)
                    valid = false;
                }
            }

            return valid;
        }
    }

    #validatingCPF(field){
        const cpf = new checkCPF();
        if(!cpf.validCPF(field.value)){
            this.#createAlert(field, 'O CPF é invalido.');
            return false;
        }
        return true;
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
