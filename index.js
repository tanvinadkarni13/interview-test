const FAQ = [
    {
        q: "How much does Photoshop cost?",
        a: "Plans start at US$22.99/mo."
    },
    {
        q: "Can you use Photoshop to edit videos?",
        a: "Yes, you can use Photoshop to edit videos."
    },
    {
        q: "Is Photoshop available without a subscription?",
        a: "Photoshop is only available as part of a Creative Cloud plan, which includes the latest features, updates, fonts, and more."
    }
];


/**
 * For any given element it extracts the color from the first paragraph and sets it as the background color of the element and then deleted this paragraph.
 * This method should not be called on an element where the first paragraph does not contain a color.
 */
function processBackgroundColor(el) {
    el.querySelectorAll('p:first-child').forEach(p => {
        // if the p contains color. 
        if(p.textContent.indexOf('#')==0){
            el.style.backgroundColor = p.textContent;
        }else{
            el.style.backgroundImage = p.textContent;
        }
    })
    el.querySelector('div:first-child').remove();
}

function processHero(el) {
    processBackgroundColor(el);
    const paragraphsWithLinks = document.querySelectorAll('p a');
    paragraphsWithLinks.forEach(link => {
      link.closest('p').classList.add('action-area');
    });

    el.querySelectorAll('p.action-area').forEach(p => {
        processButtons(p, 'i',['con-button'])
        processButtons(p, 'b',['con-button', 'blue'])
    });
}

// This function remove the wrapping tags and applies classes to the buttons.
function processButtons(el, wrapperTag, buttonClasses){
    const wrapperElements = el.querySelectorAll(wrapperTag);
    wrapperElements.forEach(wrapperElement => {
        while (wrapperElement.firstChild) {
            wrapperElement.firstChild.classList.add(...buttonClasses);
            wrapperElement.parentNode.insertBefore(wrapperElement.firstChild, wrapperElement); 
        }
        wrapperElement.remove();
    });
}

function processBrick(el) {
    processBackgroundColor(el);
    const paragrpahs = el.querySelectorAll('p');
    if(paragrpahs.length == 3){
        processBrickContent(paragrpahs);
    }
    
}

function processBrickContent(p){
    p[0].classList.add('title');
    p[1].classList.add('price');
    p[2].classList.add('description');
}

function processFaq(el) {
    let faqHTML = '';
    for (let i = 0; i < FAQ.length; i++) {
        faqHTML += `
            <div class="faq-set">
                <div id="question-${i}" class="question " onClick="toggleAnswer(${i})">
                    <div>
                        <h3>${FAQ[i].q}</h3>
                    </div>
                </div>
                <div id="answer-${i}" class="answer  hidden">
                    <div>
                        <p>${FAQ[i].a}</p>
                    </div>
                </div>
            </div>`;
    }
    el.innerHTML = faqHTML;
}

// This function toggles the answer and question classes.
// This is a global function and assumed only one set of FAQs are present on the page.
function toggleAnswer(i) {
    document.getElementById(`answer-${i}`).classList.toggle('hidden');
    document.getElementById(`question-${i}`).classList.toggle('expanded');
}

function processBanner(el) {
    let heroElement = document.querySelector('.hero');
    // Detect when .hero is visible
    let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                el.classList.remove('banner-visible')
            } else {
                el.classList.add('banner-visible')
            }
        });
    });
    observer.observe(heroElement);

    processButtons(el, 'b',['con-button', 'blue']);
    el.classList.add('bottom-fixed');
    let bannerHeight = el.offsetHeight;
    document.body.style.paddingBottom = bannerHeight + 'px';
}

document.querySelectorAll('.hero').forEach(processHero);
document.querySelectorAll('.brick').forEach(processBrick);
document.querySelectorAll('.faq').forEach(processFaq);
document.querySelectorAll('.banner').forEach(processBanner);