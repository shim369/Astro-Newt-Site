let headerInner = document.querySelector(".header-inner");

window.addEventListener("scroll", () => {
	if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
		headerInner.classList.add("active");
	} else {
		headerInner.classList.remove("active");
	}
})