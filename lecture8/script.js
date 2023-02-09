const filterForm = document.forms.filterForm; // Ищем форму.
// проверяем наличие поискового запроса в нашем URL.
if (location.search) {
    // создадим объект для будущих параметров.
    const params = {};
    
    // создадим массив строк параметров ["phoneId=apple", "phoneId=xiaomi", "howShow=10"]
    const arrayStringParams = location.search.substring(1).split('&');

    // Перебор массива, котоырй мы создали выше
    for ( let stringParam of arrayStringParams ) {
        const param = stringParam.split('='); // Создаем массив параметра с ключом и значением.
        const nameParam = param[0]; // Получаем имя параметра ( ключ ).
        const valueParam = param[1]; // Получаем значение параметра ( значение ).
        // Выполняем проверку на то если имя параметра уже существует в объекте параметров, тогда добавляй в массив занчение параметра, иначе создай свойство внутри объекта параметров, создай в нем массив положи в него значение параметра {phoneId: Array(2), howShow: Array(1)}
        if ( nameParam in params ) {
            params[nameParam].push(valueParam);
        } else {
            params[nameParam] = [valueParam];
        }
    }

    const updateInput = (gInputs, typeParam) => {
        for (let input of gInputs) {
            const param = params[typeParam];
            for (let partParam of param) {
                if (partParam === input.value) {
                    input.checked = true;
                }
            }
        }
    }

    updateInput(filterForm.modelPhone, 'phoneId');
    updateInput(filterForm.howShow, 'howShow');
}

filterForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let arrayCheckedInput = []; // массив выбранных инпутов пользователем для фильтрации.

    const addCheckedInput = (nameGroupInput, typeParam) => {
        for (let input of nameGroupInput) {
            if (input.checked) {
                arrayCheckedInput.push(`${typeParam}=${input.value}`);
            }
        }
    };

    addCheckedInput(e.target.modelPhone, 'phoneId');
    addCheckedInput(e.target.howShow, 'howShow');

    let stringCheckedInput = '';

    for ([index, activeInput] of arrayCheckedInput.entries()) {
        stringCheckedInput += activeInput;

        if (index != arrayCheckedInput.length - 1) {
            stringCheckedInput += '&';
        }
    }

    const baseUrl = `${location.origin}${location.pathname}`;
    const newUrl = baseUrl + `?${stringCheckedInput}`; // https://localhost:4848/index.html?phoneId=samsung&phoneId=apple&howShow=5
    location = newUrl;
})

