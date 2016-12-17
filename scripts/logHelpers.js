logHelpers = {

    responseParser : function(result, reqtype) {
        if(reqtype == "getBalance") {
            document.getElementById("balance-result").innerHTML = result;
        }
        else
            document.getElementById("printResult").innerHTML = result;
    },

    logHelper: function (text) {
        if(text == "clean") {
            document.getElementById("console").innerHTML = "";
        } else
            document.getElementById("console").innerHTML += text;
    }
}
