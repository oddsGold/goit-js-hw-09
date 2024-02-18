class Feedback {
  feedbackForm = document.querySelector(".feedback-form");
  localStorageKey = "feedback-form-state";
  feedbackFormObj = {};

  constructor() {
    this.bindEvents();
  }

  bindEvents(){
    document.addEventListener("DOMContentLoaded", () => {
      if(localStorage.getItem(this.localStorageKey)) {
        //check if there is data with the required key in local storage (if there is, overwrite the local object)
        this.feedbackFormObj = JSON.parse(localStorage.getItem(this.localStorageKey));

        //insert data to form fields
        this.insertValues(localStorage.getItem(this.localStorageKey));
      }
    });

    this.feedbackForm.addEventListener("input", (e) => {
      //add to local object input value
      this.handleForm(e);

      //add to localStorage object with form data
      this.setToStorage(this.feedbackFormObj);
    });

    this.feedbackForm.addEventListener("submit", (e) => {
      e.preventDefault();
      //clear the form, localStorage and object with form data fields
      if(this.feedbackForm.elements.message.value && this.feedbackForm.elements.email.value !== "") {
        this.removeStorageItem(e);
      }
    });
  }

  insertValues(localStorageObj) {
    const jsonData = JSON.parse(localStorageObj);
    for (let key in jsonData) {
      this.feedbackForm.querySelector('[name="'+key+'"]').value = (jsonData[key]);
    }
  }

  handleForm(e) {
    this.feedbackFormObj[e.target.name] = e.target.value;
  }

  setToStorage(formObj) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(formObj));
  }

  removeStorageItem(e)  {
    console.log(this.feedbackFormObj);
    localStorage.removeItem(this.localStorageKey);
    this.feedbackForm.reset();
    Object.keys(this.feedbackFormObj).forEach(key => delete this.feedbackFormObj[key]);
  }
}

new Feedback();