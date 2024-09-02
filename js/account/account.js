const headerAccount = document.querySelector('.header.header-account');

const profileContent = document.querySelector('.main.main-account');
const profileModal = document.querySelector('.modal-account');

const userIcon = document.querySelector('.header__user-logo.user-main-logo');
const closeIcon = document.querySelector('.header__account-close');

const asideItem = document.querySelectorAll('.aside__account-list-item');

const sections = document.querySelectorAll('.account');

const accountTab = document.querySelectorAll('.account__tab');

const paymentMethodsMobile = document.querySelector(
 '.account__payment-methods.mobile'
);
const paymentList = document.querySelector('.account__payment-methods-list');
const paymentListItems = document.querySelectorAll(
 '.account__payment-method-list-item'
);
const activePaymentItemMobile = document.querySelector(
 '.account__payment-method-active'
);
const activePaymentIconMobile = activePaymentItemMobile.querySelector(
 '.account__payment-method-icon'
);

const depositTabs = document.querySelectorAll('.account__deposit-tab');

const paymentItems = document.querySelectorAll(
 '.account__payment-method-wrapper'
);

const backPage = document.querySelector('.main__back-wrapper');

const scrollAccountHeader = (scroll) => {
 scroll > 0
  ? headerAccount.classList.add('fixed')
  : headerAccount.classList.remove('fixed');
};

const smoothOpacity = () => {
 if (profileModal.classList.contains('active')) {
  profileContent.style.opacity = 0;
  profileContent.style.transition = 'opacity 1s';
 } else {
  profileContent.style.opacity = 1;
  profileContent.style.transition = 'opacity 7s';
 }
};
const openModalAccount = () => {
 smoothOpacity();
 profileModal.classList.add('active');
 document.body.classList.add('scroll-disabled');
};
const closeModalAccount = () => {
 smoothOpacity();
 profileModal.classList.remove('active');
 document.body.classList.remove('scroll-disabled');
};

const openPaymentList = () => {
 paymentMethodsMobile.classList.toggle('active');
 paymentList.classList.toggle('active');
};

const selectListPayment = (item) => {
 item.addEventListener('click', () => {
  const itemIcon = item.querySelector('.account__payment-method-icon');
  activePaymentIconMobile.src = itemIcon.src;
 });
};
const selectPayment = (item, item2) => {
 if (item2 != item) {
  item.addEventListener('click', () => {
   item.classList.toggle('active');
  });
 }
};

profileModal.addEventListener('scroll', (e) => {
 const scroll = e.target.scrollTop;
 scrollAccountHeader(scroll);
});
asideItem.forEach((item) => {
 item.addEventListener('click', () => {
  item.classList.add('active');
  asideItem.forEach((item2) => {
   if (item2 != item) {
    item2.classList.remove('active');
    item.classList.add('active');
   }
  });
  sections.forEach((section) => {
   const itemID = item.dataset.page;
   const sectionID = section.dataset.page;
   if (itemID == sectionID) {
    section.classList.remove('inactive');
    sections.forEach((section2) => {
     if (section2 != section) {
      section2.classList.add('inactive');
     }
    });
   }
  });
 });
});
accountTab.forEach((tab) => {
 tab.addEventListener('click', () => {
  tab.classList.add('active');
  accountTab.forEach((tab2) => {
   if (tab2 != tab) {
    tab2.classList.remove('active');
    tab.classList.add('active');
   }
  });
  sections.forEach((section) => {
   const itemID = tab.dataset.page;
   const sectionID = section.dataset.page;
   if (itemID == sectionID) {
    section.classList.remove('inactive');
    sections.forEach((section2) => {
     if (section2 != section) {
      section2.classList.add('inactive');
     }
    });
   }
  });
 });
});
depositTabs.forEach((tab) => {
 tab.addEventListener('click', () => {
  tab.classList.add('active');
  depositTabs.forEach((tab2) => {
   if (tab2 != tab) tab2.classList.remove('active');
  });
 });
});
userIcon.addEventListener('click', () => {
 openModalAccount();
});

closeIcon.addEventListener('click', () => {
 closeModalAccount();
});

paymentMethodsMobile.addEventListener('click', openPaymentList);
backPage.addEventListener('click', closeModalAccount);

paymentListItems.forEach((item) => {
 selectListPayment(item);
});
paymentItems.forEach((item) => {
 item.addEventListener('click', () => {
  item.classList.add('active');
  paymentItems.forEach((item2) => {
   if (item2 != item) {
    item2.classList.remove('active');
    item.classList.toggle('active');
   }
  });
 });
});
