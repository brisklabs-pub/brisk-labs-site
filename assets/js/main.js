const companyList = document.getElementById('company-list-id');
const buttonRight = document.getElementById('company-button-right');
const buttonLeft = document.getElementById('company-button-left');
const extendedPadding = 40;
var bodyWidth = 0;
var scrollPos = 0;

window.onload = (event) => {
    AOS.init();
    scrollPos = 0;
    bodyWidth = companyList.offsetWidth;
}


function getCompanyList() {
    let childWidths = 0;
    if (companyList && companyList.children) {
        for (let x = 0; x < companyList.children.length; x++) {
            childWidths += companyList.children[x].offsetWidth;
        }
    }
    return childWidths;
}

function scrollBack() {
    const childWidths = getCompanyList();
    if (scrollPos <= 0) {
        return;
    }
    if (buttonRight && buttonRight.hasAttribute('disabled')) {
        buttonRight.removeAttribute('disabled');
    }
    scrollPos -= 300;
    companyList.scroll({ left: scrollPos, behavior: 'smooth' });
    if (scrollPos <= 0 && buttonLeft && !buttonLeft.hasAttribute('disabled')) {
        buttonLeft.setAttribute('disabled', 'disabled');
    }
}

function scrollRight() {
    const childWidths = getCompanyList();
    const totalWidth = childWidths - bodyWidth;
    if (scrollPos == totalWidth) {
        return;
    }
    if (buttonLeft && buttonLeft.hasAttribute('disabled')) {
        buttonLeft.removeAttribute('disabled');
    }
    scrollPos += 300;
    if (scrollPos > totalWidth) {
        const discrepancy = scrollPos - totalWidth;
        scrollPos -= discrepancy;
    }
    companyList.scroll({ left: scrollPos, behavior: 'smooth' });
    if (scrollPos == totalWidth && buttonRight && !buttonRight.hasAttribute('disabled')) {
        buttonRight.setAttribute('disabled', 'disabled');
    }
}

function sendMessage() {
    let form = document.getElementById('contact-form');
    if (form) {
        var formData = new FormData(form);
        $.ajax({
            url: "https://brisklabs.pythonanywhere.com/message",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                form.reset();
                alert(response.message);
            },
            error: function(xhr, status, error) {
                form.reset();
                alert("Problem sending message");
            }
        });
    }
}