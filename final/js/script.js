const preloader = document.querySelector("#js-preloader");

const URL_APP = 'https://script.google.com/macros/s/AKfycbyV1s0h0gpW3ayUTK4-H-1OX5T-tOMa7CbvpcAp0IQHoVgyU6pVg3hkSUW-8b3NYH5Vmw/exec';
const form = document.querySelector("#user_form");

form.action = URL_APP;

function isFilled(details) {
  const { name, phone } = details;
  if (!name) return false;
  if (!phone) return false;
  return true;
}

form.addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const name = document.querySelector("[name=name]");
  const phone = document.querySelector("[name=phone]");
  const checkbox_self_information = document.querySelector("#checkbox_self_information");
  const checkbox_privacy_policy = document.querySelector("#checkbox_privacy_policy");
  const form_submit_btn = document.querySelector("#form_submit_btn");
  if(checkbox_self_information.checked === false || checkbox_privacy_policy.checked === false) {
    alert("Пожалуйста, согласитесь с обработкой персональных данных и с условиями политики конфиденциальности.");
    return;
  } else if (name.value.trim() === '' || phone.value.trim() === '') {
    alert("Пожалуйста, заполните все поля.");
    return;
  }
  let details = {
    name: name.value.trim(),
    phone: phone.value.trim(),
  };

  if (!isFilled(details)) return;

  let formBody = [];
  for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  form_submit_btn.disabled = true;
  form_submit_btn.value = 'Отправка...';
  const result = await fetch(URL_APP, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    mode: "cors",
    body: formBody,
  })
    .then((res) => res.json())
    .catch((err) => {
      console.error("Error fetching data:", err);
      alert("Ошибка!");
    }).finally(() => {
      name.value = '';
      phone.value = '';
      form_submit_btn.disabled = false;
      form_submit_btn.value = 'Отправить';
    });
  
  console.log(result);
  
  if (result.type === 'success') {
    alert('Спасибо за заявку!');
  }
  if (result.type === 'error') {
    alert(`Ошибка( ${result.errors}`);
  }
});

window.addEventListener("load", () => {
  preloader.classList.add("loaded");
});

const updateScrollPercentage = function () {
  const heightOfWindow = window.innerHeight,
    contentScrolled = window.pageYOffset,
    bodyHeight = document.body.offsetHeight,
    percentage = document.querySelector(".percentage"),
    percentageVal = document.querySelector("#percentage-value");
  if (bodyHeight - contentScrolled <= heightOfWindow) {
    percentageVal.textContent = percentage.style.width = "100%";
  } else {
    const total = bodyHeight - heightOfWindow,
      got = contentScrolled,
      percent = parseInt((got / total) * 100);
    percentageVal.textContent = percentage.style.width = percent + "%";
  }
};

window.addEventListener("DOMContentLoaded", () => {
  const mobile_menu = document.getElementById("mobile_menu");
  const open_menu = document.getElementById("open_menu");
  const close_menu = document.getElementById("close_menu");
  const selector = document.getElementById("language");
  const accordions = document.querySelectorAll('.accordion-wrapper');

  window.addEventListener("scroll", updateScrollPercentage);
  
  // ===================

  selector.addEventListener("click", () => {
    selector.classList.toggle("show");
  })

  // ===================

  open_menu.addEventListener("click", () => {
    document.querySelector("body").style.overflow = "hidden";
    mobile_menu.style.right = "0";
  });
  close_menu.addEventListener("click", () => {
    mobile_menu.style.right = "-100%";
    document.querySelector("body").style.overflow = "auto";
  });

  mobile_menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobile_menu.style.right = "-100%";
      document.querySelector("body").style.overflow = "auto";
    });
  });

  // ===================

  accordions.forEach(accordion => {
    accordion.addEventListener('click', () => accordion.classList.toggle('open'))
  })
});