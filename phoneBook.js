function init(){
    displayContactList("#list");
}
var contacts = [];
var contact = "";


$(document).ready(function() {
    // Run the start-up routine, which, in this case, loads the current list of entries from
    // local storage and displays them on the main (list) page...
    init();

    // Now install the event handlers for buttons the user can click or tap on.
    // 1. The "Add" button (for adding a new entry)...
    $("#add").click(function() {
        if(contact === ""){
            addNewContact();
        } else {
            updateContact();

        }
        displayContactList("#list");
        contact = "";
        makeFormEmpty();
        location.assign("#homePage");


    });

    // 2. The "Del" button, for deleting an entry...
    $("#del").click(function() {
        if(contact !== ""){
            removeContact(contact);
            displayContactList("#list");
            contact = "";
            makeFormEmpty();
            location.assign("#homePage");
        }
    });

    $("#edit").click(function() {
        if(contact !== ""){
        var c = getContactFromDisplayName(contact);
            displayContact(c);
        }
    });
});

function backPressed(){
    console.log("in backPressed button");
    contact = "";
    makeFormEmpty();
}

function setPhone(){
    if(contact !== null && contact !== ""){
        var c = getContactFromDisplayName(contact);
        console.log(c.phone);
        document.getElementById("tel").href="tel:" + c.phone;
    }


}


$(document).on('click', "#list a.a1", function() {
    contact = $(this).find("span").text();
    console.log("item clicked");
    console.log(contact);

    console.log($(this).find("img").attr("src"));
    $("#img").attr("src", $(this).find("img").attr("src"));
    var c = getContactFromDisplayName(contact);
    $("#gender").val(c.gender);

});


var Contact = function(name, phone, email, gender) {
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.gender = gender;

}



function  addContact(name, phone, email, gender){
    var contact = new Contact(name, phone, email, gender);
    contacts.push(contact);
    sortContacts();
    return contact;
}

function sortContacts() {
    contacts.sort(function(a, b) {
        if(a.name < b.name){
            return -1;
        }
        if(a.name > b.name) {
            return 1;
        }
        return 0;
    });
    return contacts;
}

function removeContact(name){
    var pos = -1, index, contact = null;
    for(index = 0; index < contacts.length; index += 1){
        if(name === contacts[index].name) {
            pos = index;
            break;
        }
    }
    if(pos > -1) {
        contact = contacts[pos];
        contacts.splice(pos, 1);
    }
    return contact;
}
//        list += "<li><a href='#viewContactPage'> <img src='images/m1.png' width='120' height='120'/> <span id='sp'>" + contacts[index].name + "</span></a></li>"; // name='item'
function makeContactList(){
    var index, list = "";
    for(index = 0; index < contacts.length; index += 1){
    console.log(contacts[index].gender);
       //list += "<li><a href='#viewContactPage'>" + contacts[index].name + "</a></li>"; // name='item'
       var img = contacts[index].gender == "male" ? "images/m1.png" : "images/f.png";
       list += "<li><a class='a1' href='#viewContactPage'><img src='" + img + "'/><span>"  + contacts[index].name + "</span></a><a class='a2' href='tel:" + contacts[index].phone + "' data-role='button' data-icon='phone'> </a></li>";
       //list += "<li><a href='#viewContactPage'> <img id = 'img" + index + "' src='" + img + "' width='120' height='120'/> <span id = 'span" + index + "'>" + contacts[index].name + "</span></a></li>"; // name='item'

    }
    return list;
}

function displayContactList(listElement){
    $(listElement).html(makeContactList()).listview('refresh');
    return $(listElement);
}

function getContactFromDisplayName(name){
    var index, e;
    for(index = 0; index < contacts.length; index += 1){
        if(contacts[index].name === name){
            return contacts[index];
        }
    }
    return null;
}

function displayContact(c){
    $("#name").val(c.name);
    $("#phone").val(c.phone);
    $("#email").val(c.email);
    $("#gender").val(c.gender);
}

function displayContactData(c){

}

function updateContact(){
    var c = getContactFromDisplayName(contact);
    c.name = $("#name").val();
    c.phone = $("#phone").val();
    c.email = $("#email").val();
    c.gender = $("#gender").val();
}

/**
 * Adds a new entry based on the contents of the form fields on the entry page...
 * @returns {*}
 */
function addNewContact(){
    var c = getContactFromDisplayName($("#name").val());
    if(c !== null && c.name !== ""){
        console.log("user aready exist");
        alert("user aready exist");
    }
    else{
        var name = $("#name").val(),
            phone = $("#phone").val(),
            email = $("#email").val(),
            gender = $("#gender").val();
        if(name !== "") {
            return addContact(name, phone, email, gender);
        } else {
            return null;
        }
    }

}

function makeFormEmpty(){
    $("#name").val("");
    $("#phone").val("");
    $("#email").val("");
    $("#gender").val("");
}

