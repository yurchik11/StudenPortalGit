$(document).ready(function () {
    $("div:contains('You have installed DevExpress Products in Evaluation Mode')").remove();
});
setTimeout(RemoveTrialMessage, 100);
function RemoveTrialMessage() {
    $("div:contains('You have installed DevExpress Products in Evaluation Mode')").remove();
}