class ConsentManager {
    enableTargeting() {
        event.preventDefault();
        OneTrust.UpdateConsent("Category", "C0004:1").then(() => {
            this.hideElements();
        }).catch(error => {
            console.error('Error updating consent:', error);
        });
    }
    isC0004Active() {
        if (typeof OnetrustActiveGroups !== 'undefined') {
            return OnetrustActiveGroups.includes('C0004');
        }
        return false;
    }
    hideElements() {
        var videoElem = document.getElementsByClassName("vimeo-video");
        var warningElem = document.getElementsByClassName("video-consent-warning");
        if (this.isC0004Active()) {
            for (let i = 0; i < warningElem.length; i++) {
                warningElem[i].style.display = "none";
            }
            for (let i = 0; i < videoElem.length; i++) {
                videoElem[i].style.display = "block";
            }
        } else {
            for (let i = 0; i < warningElem.length; i++) {
                warningElem[i].style.display = "block";
            }
            for (let i = 0; i < videoElem.length; i++) {
                videoElem[i].style.display = "none";
            }
        }
    }
}
var consentManager = new ConsentManager();
window.addEventListener('load', function() {
    consentManager.hideElements();
});