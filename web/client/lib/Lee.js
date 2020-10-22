const addClass = (element, className) => {
  const check = new RegExp("(\\s|^)" + className + "(\\s|$)");
  if (element) {
    if (check.test(element.className)) {
      return 0;
    } else {
      element.className += " " + className;
    }
  }
};

const removeClass = (element, className) => {
  const check = new RegExp("(\\s|^)" + className + "(\\s|$)");
  if (element) {
    element.className = element.className.replace(check, " ").trim();
  }
};

const removeAllClass = (element) => {
  element.className = " ";
};

const toggleClass = (element, className) => {
  const check = new RegExp("(\\s|^)" + className + "(\\s|$)");
  if (check.test(element.className)) {
    element.className = element.className.replace(check, " ").trim();
  } else {
    element.className += " " + className;
  }
};

const checkClass = (element, className) => {
  const check = new RegExp("(\\s|^)" + className + "(\\s|$)");
  if (check.test(element.className)) {
    return true;
  } else {
    return false;
  }
};

const get = (element) => {
  return document.getElementById(element);
};

const gets = (element) => {
  return document.getElementsByClassName(element);
};

const loadingStart = () => {
  const content = get("content");

  addClass(content, "fade");

  setTimeout(() => {
    addClass(content, "lock");
    window.scrollTo(0, 0);
  }, 200);
};

const loadingFinish = () => {
  const content = get("content");

  removeClass(content, "lock");
  window.scrollTo(0, 0);
  addClass(content, "lock");

  setTimeout(() => {
    removeClass(content, "fade");
  }, 200);

  setTimeout(() => {
    removeClass(content, "lock");
  }, 400);
};

// login library
let loginAnimationIndex = 0;

const openLogin = () => {
  const login = get("Login");

  if (loginAnimationIndex === 0) {
    loginAnimationIndex = 1;
    addClass(login, "active");
    setTimeout(() => {
      loginAnimationIndex = 0;
    }, 400);
  }
};

const openRegistration = () => {
  const registration = get("Registration");

  if (loginAnimationIndex === 0) {
    loginAnimationIndex = 1;
    addClass(registration, "active");
    setTimeout(() => {
      loginAnimationIndex = 0;
    }, 400);
  }
};

const openRegistrationCharacter = () => {
  const registrationCharacter = get("RegistrationCharacter");

  if (loginAnimationIndex === 0) {
    loginAnimationIndex = 1;
    addClass(registrationCharacter, "active");
    setTimeout(() => {
      loginAnimationIndex = 0;
    }, 400);
  }
};

const openMenu = () => {
  if (loginAnimationIndex === 0) {
    loginAnimationIndex = 1;
    const menuIcon = get("menuIcon");
    const mobileMenu = get("mobileMenu");

    if (checkClass(mobileMenu, "open")) {
      setTimeout(() => {
        removeClass(menuIcon, "open");
        removeClass(mobileMenu, "open");
        loginAnimationIndex = 0;
      }, 200);

      removeClass(mobileMenu, "active");
    } else {
      toggleClass(menuIcon, "open");
      toggleClass(mobileMenu, "open");

      setTimeout(() => {
        toggleClass(mobileMenu, "active");
        loginAnimationIndex = 0;
      }, 400);
    }

    closeChatbot();
  }
};

const closeChatbot = () => {
  const Chatbot = get("Chatbot");
  const chatbotTab = get("chatbotTab");
  const consultingTab = get("consultingTab");
  const mypageTab = get("mypageTab");

  if (location.pathname === "/mypage") {
    addClass(mypageTab, "active");
    removeClass(consultingTab, "active");
  } else if (
    location.pathname === "/consultingList" ||
    location.pathname === "/consulting" ||
    location.pathname === "/viewConsulting"
  ) {
    addClass(consultingTab, "active");
    removeClass(mypageTab, "active");
  } else {
    removeClass(consultingTab, "active");
    removeClass(mypageTab, "active");
  }

  addClass(Chatbot, "hide");
  removeClass(chatbotTab, "active");

  setTimeout(() => {
    addClass(Chatbot, "invisible");
  }, 200);
};

const closeMenu = () => {
  const menuIcon = get("menuIcon");
  const mobileMenu = get("mobileMenu");

  setTimeout(() => {
    removeClass(menuIcon, "open");
    removeClass(mobileMenu, "open");
  }, 200);

  removeClass(mobileMenu, "active");
};

module.exports = {
  addClass,
  removeClass,
  removeAllClass,
  toggleClass,
  checkClass,
  get,
  gets,
  loadingStart,
  loadingFinish,
  openLogin,
  openRegistration,
  openRegistrationCharacter,
  closeChatbot,
  openMenu,
  closeMenu,
};
