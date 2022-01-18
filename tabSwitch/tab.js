function openCity(event, cityId) {
  const tabContents = document.querySelectorAll('.tabcontent');
  const tabLinks = document.querySelectorAll('.tablinks');

  tabContents.forEach(ele => {
    ele.style.display = 'none';
  });
  tabLinks.forEach(ele => {
    ele.classList.remove('active');
  });

  document.getElementById(cityId).style.display = "block";
  event.target.classList.add('active');
}