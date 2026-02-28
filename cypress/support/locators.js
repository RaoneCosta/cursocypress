const locators = {
    LOGIN: {
        USER: '[data-test=email]',
        PASSWORD: '[data-test="passwd"]',
        BTN_LOGIN: '.btn'
    },
    MENU: {
        HOME: '[data-test="menu-home"]',
        SETTINGS: '[data-test="menu-settings"]',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        MOVIMENTACAO: '[data-test="menu-movimentacao"]',
        EXTRATO: '[data-test="menu-extrato"]'
    },
    CONTAS: {
        NOME: '[data-test="nome"]',
        BTN_SALVAR: '.btn',
        FN_XP_BTN_ALTERAR: conta => `//table//td[contains(.,'${conta}')]/..//i[@class='far fa-edit']`
    },
    MOVIMENTACAO : {
        DESCRICAO: '[data-test="descricao"]',
        VALOR: '[data-test="valor"]',
        INTERESSADO: '[data-test="envolvido"]',
        STATUS: '[data-test="status"]',
        CONTA: '[data-test="conta"]',
        BTN_SALVAR: '.btn-primary'
    },
    EXTRATO: {
        LINHAS: '.list-group > li',
        FN_XP_BUSCA_ELEMENTO: (desc, value) => `//span[contains(.,'${desc}')]/following-sibling::small[contains(.,'${value}')]`,
        FN_XP_BUSCA_ELEMENTO_DELETAR: (desc) => `//li[contains(.,'${desc}')]/div/div[2]/a[2]/i`,
        FN_XP_BUSCA_ELEMENTO_ALTERAR: (desc) => `//li[contains(.,'${desc}')]/div/div[2]/a[1]/i`
    },
    SALDO: {
        FN_XP_SALDO_CONTA: (conta) => `//td[contains(.,'${conta}')]/../td[2]`
    },
    MESSAGE: '.toast-message'
}

export default locators;