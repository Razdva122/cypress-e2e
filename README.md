# Cypress

### Какую задачу решает предложенное решение?

E2E/Regression/Screenshot testing на JavaScript/TypeScript

Cypress - все в одном framework для тестирования, с моками и стабами, без использования Selenium.

Cypress состоит из полностью бесплатного, [локально установленного](https://docs.cypress.io/guides/getting-started/installing-cypress.html) Test Runner с [открытым исходным кодом](https://github.com/cypress-io/cypress) и службы панели инструментов для [записи ваших тестов](https://docs.cypress.io/guides/dashboard/introduction.html).

### Какие технологии/библиотеки/сервисы использует?

Cypress не является библиотекой/фреймворкой. При загрузке из npm он скачивает установочные файлы, которые потом устанавливают сам Cypress на машине.

[Исходный код](https://github.com/cypress-io/cypress)

### Как с ним взаимодействовать?

Для визуального прогона и дебага используется Test Runner

Полное его описание с скриншотами и видео -> [Test Runner](https://docs.cypress.io/guides/core-concepts/test-runner.html#Overview)

Пример теста login.spec.ts:

```typescript
context('Test Example', () => {
  beforeEach(() => {
    // Перед каждым тестом зайти на страницу https://avtocod.ru
    cy.visit('https://avtocod.ru/') 
  })


  it('login invalid account', () => { // Пример теста с не корректным логином
    // Найти на странице кнопку с id auth и проверить что она соотвествует скриншоту auth-button
    cy.get(`button#auth`).matchImageSnapshot('auth-button')

    // Кликнуть на кнопку и проверить что произошел переход на страницу '/auth/login'
    cy.get(`button#auth`)
      .click()
      .url().should('include', '/auth/login')
    
    // Ввести в input невалидный email и проверить что символы появились в поле
    cy.get(`input[type='email']`) 
      .type('unvalid@email.com', { delay: 100 })
      .should('have.value', 'unvalid@email.com') 
    
    // Ввести в input невалидный пароль и проверить что символы появились в поле
    cy.get(`input[type='password']`)
      .type('unvalidpassword', { delay: 100 })
      .should('have.value', 'unvalidpassword') 

    // Найти на странице кнопку с id login и кликнуть на нее
    cy.get(`button#login`)
      .click() 
    
    // Проверить что на странице появился алерт и он соотвествует скриншоту alert-invalid-account
    cy.get('div#alert').matchImageSnapshot('alert-invalid-account') 
    
    // Изменить viewport до мобильного
    cy.viewport(320, 568);

    // Проверить что в мобильной версии есть alert и он соотвествует скриншоту alert-invalid-account--mobile
    cy.get('div#alert').matchImageSnapshot('alert-invalid-account--mobile')
  })
})
```

### Что необходимо для локального запуска силами CLI?

`cypress run` - запускает тесты без использования Test Runner

```
$ cypress run
                                        Tests  Passing  Failing
    ✔  All specs passed!      00:16       17       17        0
```

`cypress open` - открывает тесты в Test Runner 

```
$ cypress open
```

[Подробнее о командах и дополнительных опциях](https://docs.cypress.io/guides/guides/command-line.html#How-to-run-commands)

### Какие существуют ограничения?

Постоянные ограничения:
* Cypress не является универсальным средством автоматизации. (Подходит только для e2e-тестирования)
* Cypress выполняет комманды в браузере. (Поддерживается только JS)
* Несколько вкладок в браузере никогда не будут поддерживаться.
* Cypress может использовать только один браузер в еденицу времени. 
* Каждый тест ограничен посещением только доменов имеющих одиннаковый корневой уровень. ✔️(profi.avtocod.ru, avtocod.ru) ❌(google.com, apple.com)

[Подробнее](https://docs.cypress.io/guides/references/trade-offs.html#Permanent-trade-offs-1)
