function expandHeader() {
    const hambergerIcon = document.getElementById("hamberger-icon");
    hambergerIcon.classList.toggle("hamberger-icon-expand");
  
    const headerSectionExpand = document.getElementById("header-section-expand");
    headerSectionExpand.classList.toggle("visible");
  
    const header = document.getElementsByTagName('header');
    console.log(header);
    header[0].classList.toggle('color-black');
}