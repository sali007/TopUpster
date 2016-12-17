formHelpers = {

    fileReader : function() {
        document.getElementById('phones').addEventListener('change', function(e) {
            var file = this.files[0];
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function(e) {
                document.getElementById('store').innerText = e.target.result;
            }
        })
    },

    parseformData : function(formType) {
        var form = document.getElementById(formType).parentNode;
        var data = {};
        for(i=0;i<form.elements.length-1;i++) {
            if(form.elements[i].id == "transit"){
                //alert(form.elements[i].checked);
                data.trans = form.elements[i].checked;
            }
            data[(form.elements[i].id)] = form.elements[i].value;
        }
        return data;
    },

    formRenderer : function(formType) {
        var form =  "<form method=\"post\">";

        if(formType == "checkPaymentStatus" || formType == "checkUser" || formType == "getProviderByPhone") {
            form += "</br><span>Phone</br></span><input type=\"text\" id=\"phone\" name=\"phone\" class=\"fields\">";
            if(formType == "checkPaymentStatus") {
                form += "</br><span>Transaction number</br></span><input type=\"text\" id=\"txn\" name=\"txn\" class=\"fields\">";
            }
        }
        if(formType == "pay") {
            form += "</br><span>List of QW numbers</br></span><input type='file' id=\"phones\"  name=\"phones\" onclick='formHelpers.fileReader()'>";
            form += "</br><span>Tries</br></span><input type=\"text\" id=\"tries\" name=\"tries\" class=\"fields\">" +
            "</br><span>Amount</br></span><input type=\"text\" id=\"amount\" name=\"amount\" class=\"fields\">" +
            "</br><span>Is Transit</span></br></span><input type=\"checkbox\" checked=\"checked\" id=\"transit\" name=\"transit\">" +
            "</br><span>Account</br></span><input type=\"text\" id=\"account\" name=\"account\" class=\"fields\">" +
            "</br><span>Service ID</span></br></span><input type=\"text\" id=\"prvId\" value=\"23554\" name=\"prvId\" class=\"fields\">";
        }
        if(formType == "pwdChange") {
            form += "</br><span>New Password</br></span><input type=\"text\" id=\"newPass\" name=\"newPass\" class=\"fields\">";
        }
        if(formType == "settingsForm") {
            form += "</br><span>Last transaction number</br></span><input type=\"text\" id=\"lastTxn\" name=\"lastTxn\" class=\"fields\">" +
            "</br><span>Timeout</br></span><input type=\"text\" id=\"timeout\" name=\"timeout\" class=\"fields\">"+
            "</br><input type='button'  name=\"submit\" value='submit' id=" + formType + "></form>";
            document.getElementById('forms').innerHTML = form;
            document.getElementById('lastTxn').value = settings.getTransactionNumber();
            document.getElementById('timeout').value = settings.getTimeout();
            return;
        }
        if(formType == "auth") {
            form += "</br><span>Login</br></span><input type=\"text\" id=\"log\" name=\"log\" class=\"fields\">"+
            "</br><span>Password</br></span><input type=\"text\" id=\"password\" name=\"password\" class=\"fields\">";
        }
        form += "</br><input type='button'  name=\"submit\" value='submit' id=" + formType + "></form>";

        document.getElementById('forms').innerHTML = form;

    }
}