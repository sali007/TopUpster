//var element = new gui.ElementName(option);

// Example of creating a menu
//var menu = new gui.Menu({ title: 'Menu Title' });
//gui.close();
//global.gui          = gui;
//global.mainWindow   = gui.Window.get();
//global.jQuery       = jQuery;

auth = {
    login : "",
    password : "",

    start : function() {
        formHelpers.formRenderer("auth");
        document.getElementById("auth").addEventListener('click', function() {
            auth.login = document.getElementById('log').value;
            auth.password = document.getElementById('password').value;
            requestHandler.processRequest(null,null, "getBalance")
            formHelpers.formRenderer("pay");
            requestHandler.attachEvent("pay");
            for(i=0;i<document.getElementsByTagName("li").length;i++) {
                document.getElementsByTagName("li")[i].addEventListener('click', function(e) {
                    formHelpers.formRenderer(this.getAttribute('name'));
                    requestHandler.attachEvent(this.getAttribute('name'));
                })
            }
        })

    }

}