const tabNavs = document.querySelectorAll('.tab-nav');
const tabContents = document.querySelectorAll('.tab-content');

tabNavs[0].classList.add('active');
tabContents[0].style.display = 'block';

tabNavs.forEach((tab, i) =>{
  tab.addEventListener('click', () => onSwitchTab(i));
});

function onSwitchTab(i) {
  tabNavs.forEach((tab) => {
    tab.classList.remove('active');
  });
  tabContents.forEach((content) => {
    content.style.display = 'none';
  });

  tabNavs[i].classList.add('active');
  tabContents[i].style.display = 'block';
}