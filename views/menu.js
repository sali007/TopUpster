var mainWindow = global.mainWindow,
    gui        = global.gui,
    $          = global.jQuery;

function initContextMenu() {
    // Создать пустое меню, используя библиотеку nw.gui
    contextMenu = new gui.Menu();
    // Получить объект document
    var mainWindowDocument = mainWindow.window.document;

    // Добавить в меню новый пункт
    contextMenu.append(new gui.MenuItem({
        label: 'Copy',
        click: function() {
            // Копировать выделенный текст
            mainWindowDocument.execCommand('copy');
        }
    }));

    contextMenu.append(new gui.MenuItem({
        label: 'Cut',
        click: function() {
            // Вырезать выделенный текст
            mainWindowDocument.execCommand('cut');
        }
    }));

    contextMenu.append(new gui.MenuItem({
        label: 'Paste',
        click: function() {
            // Вставка текста из буфера обмена
            mainWindowDocument.execCommand('paste');
        }
    }));

    contextMenu.append(new gui.MenuItem({
        type: 'separator'
    }));

    contextMenu.append(new gui.MenuItem({
        label: 'Select All',
        click: function() {
            // Выделение всего текста в блоке
            mainWindowDocument.execCommand('selectAll');
        }
    }));
}

function initBarMenu() {
    // Создаём пустое меню типа menubar
    var nativeMenuBar = new gui.Menu({ type: "menubar" });

    // Если приложение запущено на OS X платформе, то формируем бар
    if (process.platform === "darwin") {
        // Управление пунктами «Заголовок», «Правка», «Окно»
        nativeMenuBar.createMacBuiltin("NodePad", {
            hideEdit: false,
            hideWindow: false
        });
    }
    mainWindow.menu = nativeMenuBar;
}

// Отдать функцию вызывающему её модулю
exports.initContextMenu = initContextMenu;
exports.initBarMenu = initBarMenu;