// This script makes the TOC indicate the currently read section by adding the "active" class
// to the section which is in view.
// Code adapted from https://iamsorush.com/posts/table-of-content-blog/
window.addEventListener('DOMContentLoaded', () => {
    const observerForTableOfContentActiveState = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id')
            if (entry.intersectionRatio > 0) {					
                clearActiveStatesInTableOfContents()	
                const anchor = document.querySelector(`nav li a[href="#${id}"]`)
                if (anchor !== null) {
                    anchor.parentElement.classList.add('active')
                }
            }
        })
    })
    document.querySelectorAll('h1[id],h2[id],h3[id],h4[id]').forEach((section) => {
        observerForTableOfContentActiveState.observe(section)
    })
})

function clearActiveStatesInTableOfContents() {
    document.querySelectorAll('nav li').forEach((section) => {
        section.classList.remove('active')
    })
}
