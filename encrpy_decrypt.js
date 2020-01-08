
const PIN = ()=>{
    return parseInt(Math.random()*1000000);
};


exports.Encrypt= function(str){
    let pin = PIN();
    pin_spliced=parseInt(pin.toString().slice(2,4));
    var encrypted="";
    for(let i=0;i<str.length;i++)
    {
       if(i%2==0)
            encrypted = encrypted+String.fromCharCode(parseInt(str.charCodeAt(i))+pin_spliced);
        else
        encrypted = encrypted+String.fromCharCode(str.charCodeAt(i)-pin_spliced);
     }

    return {
        "InputText":str,
        "PassKey":pin,
        "OutputText":encrypted
    };

}


exports.Decrypt=function(str,pin){
    pin_spliced=parseInt(pin.toString().slice(2,4));
    var decrypted="";
    for(let i=0;i<str.length;i++)
    {
       if(i%2==0)
        decrypted = decrypted+String.fromCharCode(parseInt(str.charCodeAt(i))-(pin_spliced));
        else
        decrypted = decrypted+String.fromCharCode(str.charCodeAt(i)+pin_spliced);
    }

    return {
        "InputText":str,
        "PassKey":pin,
        "OutputText":decrypted
    }
}
