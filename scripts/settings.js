var localStorage = window.localStorage;

settings = {

    setTimeout : function (t) {
        localStorage.setItem('timeout', t);
        logHelpers.logHelper("</br>Timeout has been changed to " + localStorage.getItem('timeout'));
    },

    getTimeout : function() {
        if(localStorage.getItem('timeout') == null) {
            localStorage.setItem('timeout', 1000)
        }
        return localStorage.getItem('timeout');
    },

    setTransactionNumber : function(number) {
        //alert(number.lastTxn)
        localStorage.setItem('txn', number)
        logHelpers.logHelper("</br>Transaction number has been changed to " + localStorage.getItem('txn'));
    },

    getTransactionNumber : function() {
        if (localStorage.getItem('txn') !== null) {
            var newTxn = parseInt(localStorage.getItem('txn')) + 1;
            localStorage.removeItem("txn");
            localStorage.setItem('txn', newTxn);
            return newTxn;
        }
        else if (localStorage.getItem("lastTxn") !== null) {
            var lastTxn = localStorage.setItem("txn", localStorage.getItem("lastTxn"));
            localStorage.setItem("txn", lastTxn);
            return lastTxn;
        }
        else {
            localStorage.setItem("txn", "1");
            return "1";
        }
    }
}