class checkCPF {
    
    constructor (){}

    
    // Verifica se é sequencia
    #isSequence(cpf){
        const checkSequence = this.#clearCPF(cpf);
        return  checkSequence.charAt(0).repeat(checkSequence.length) === checkSequence;
    }
    
    // Faz a validação
    validCPF(cpf){
        if(!cpf) return false;
        if(this.#clearCPF(cpf).length !== 11) return false;
        if(typeof cpf !== 'string') return false;
        if(this.#isSequence(cpf)) return false;

        const checkCPF = this.#calculatingCPFNumber(cpf);
        if(checkCPF !== this.#clearCPF(cpf)) return false;
        
        return true;
    }
    
    // limpando o CPF;
    #clearCPF(cpf){
        const clean = cpf.replace(/\D+/g, '');
        return clean;
    }

    // Formula para verificar os digitos
    #validateCPFNumber(number){
        return (11 - (number % 11)) >= 9 ? 0 : (11 - (number % 11));
    }
    
    // Calculando os números do CPF
    #calculatingCPFNumber(cpf){
        const clearCPF = this.#clearCPF(cpf);
        const sliceCPF = clearCPF.slice(0, -2);
        
        const firstNumber = this.#generateNewNumberCPF(sliceCPF);
        const firstCalculating = this.#validateCPFNumber(firstNumber);

        const secondNumber = this.#generateNewNumberCPF(sliceCPF + firstCalculating);
        const secondCalculating = this.#validateCPFNumber(secondNumber);

        const joinNewCPF = sliceCPF + firstCalculating + secondCalculating;

        return joinNewCPF;
    }


    #generateNewNumberCPF(cpf){
        const cpfArray = Array.from(cpf);
        const calculateCPF = cpfArray.map((value, index) => +value * ((cpfArray.length + 1) - index));
        return calculateCPF.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }
}