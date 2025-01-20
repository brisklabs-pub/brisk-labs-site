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

function resetBtnState() { 
    let submitBtn = document.getElementById('submit-btn');
    if (!submitBtn) {
        return;
    }
    submitBtn.innerText = "Send Message";
    submitBtn.removeAttribute('disabled');
}

function sendMessage() {
    let form = document.getElementById('contact-form');
    let submitBtn = document.getElementById('submit-btn');
    if (form) {
        var formData = new FormData(form);
        submitBtn.innerText = "Sending...";
        submitBtn.setAttribute('disabled', 'true');
        $.ajax({
            url: "https://contact-form-9mm9.onrender.com/msg/brisklabs",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                alert(response.message);
                resetBtnState();
                form.reset();
            },
            error: function(xhr, status, error) {
                resetBtnState();
                alert("Sent message to Brisklabs support, please email us at contact@brisklabs.dev for further assistance.");
                form.reset();
            }
        });
    } else {
        resetBtnState();
        alert("Problem encounter, please email us at contact@brisklabs.dev");
    }
}