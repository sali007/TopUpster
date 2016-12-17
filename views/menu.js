var mainWindow = global.mainWindow,
    gui        = global.gui,
    $          = global.jQuery;

function initContextMenu() {
    // ������� ������ ����, ��������� ���������� nw.gui
    contextMenu = new gui.Menu();
    // �������� ������ document
    var mainWindowDocument = mainWindow.window.document;

    // �������� � ���� ����� �����
    contextMenu.append(new gui.MenuItem({
        label: 'Copy',
        click: function() {
            // ���������� ���������� �����
            mainWindowDocument.execCommand('copy');
        }
    }));

    contextMenu.append(new gui.MenuItem({
        label: 'Cut',
        click: function() {
            // �������� ���������� �����
            mainWindowDocument.execCommand('cut');
        }
    }));

    contextMenu.append(new gui.MenuItem({
        label: 'Paste',
        click: function() {
            // ������� ������ �� ������ ������
            mainWindowDocument.execCommand('paste');
        }
    }));

    contextMenu.append(new gui.MenuItem({
        type: 'separator'
    }));

    contextMenu.append(new gui.MenuItem({
        label: 'Select All',
        click: function() {
            // ��������� ����� ������ � �����
            mainWindowDocument.execCommand('selectAll');
        }
    }));
}

function initBarMenu() {
    // ������ ������ ���� ���� menubar
    var nativeMenuBar = new gui.Menu({ type: "menubar" });

    // ���� ���������� �������� �� OS X ���������, �� ��������� ���
    if (process.platform === "darwin") {
        // ���������� �������� ����������, �������, �����
        nativeMenuBar.createMacBuiltin("NodePad", {
            hideEdit: false,
            hideWindow: false
        });
    }
    mainWindow.menu = nativeMenuBar;
}

// ������ ������� ����������� � ������
exports.initContextMenu = initContextMenu;
exports.initBarMenu = initBarMenu;