

// 1.0 Select and cache the <main> element in a variable named mainEl.
const mainEl = document.querySelector('main');

// 1.1 Set the background color of mainEl to the value stored in the --main-bgCSS custom property.
mainEl.style.backgroundColor = "var(--main-bg)";

// 1.2 Set the content of mainEl to <h1>SEI Rocks!</h1>.
mainEl.innerHTML = "<h1>SEI Rocks!</h1>";

// 1.3 Add a class of flex-ctr to mainEl.
mainEl.classList.add("flex-ctr");

// 2.0 Select and cache the <nav id="top-menu"> element in a variable named topMenuEl
const topMenuEl = document.querySelector('nav');

//  2.1 Set the height topMenuElelement to be 100%.
topMenuEl.style.height = '100%';

// 2.2  Set the background color of topMenuElto the value stored in the --top-menu-bgCSS custom property.
topMenuEl.style.backgroundColor = 'var(--top-menu-bg)';

// 2.3 Add a class of flex-aroundto topMenuEl.
topMenuEl.classList.add('flex-around');


// Menu data structure (copied from lab page)
var menuLinks = [
  {text: 'about', href: '/about'},
  {text: 'catalog', href: '#', subLinks: [
    {text: 'all', href: '/catalog/all'},
    {text: 'top selling', href: '/catalog/top'},
    {text: 'search', href: '/catalog/search'},
  ]},
  {text: 'orders', href: '#' , subLinks: [
    {text: 'new', href: '/orders/new'},
    {text: 'pending', href: '/orders/pending'},
    {text: 'history', href: '/orders/history'},
  ]},
  {text: 'account', href: '#', subLinks: [
    {text: 'profile', href: '/account/profile'},
    {text: 'sign out', href: '/account/signout'},
  ]},
];

// 3.1 Iterate over the entire menuLinksarray and for each "link" object:
// Create an <a> element
// On the new element, add an href attribute with its value set to the href property of the "link" object.
// Set the new element's content to the value of the textproperty of the "link" object.
// Append the new element to the topMenuElelement.

for (let link of menuLinks) { // this sets the 
    const a = document.createElement('a'); // created a variable for each of the and elements for the links
    a.setAttribute('href', link.href); // has 2 arguments/properties has the name(href) and the value is whats in quotatons
    a.innerText=link.text; // calls the text to show in each button
    topMenuEl.append(a); // this attaches the elements that were created to the parent
}

// =====================================================================

// 4.0 Select and cache the <nav id="sub-menu"> element in a variable named subMenuEl. - //* done
const subMenuEl = document.querySelector('#sub-menu');

// 4.1 Set the height subMenuEl element to be 100%. //* done
subMenuEl.style.height = '100%';

// 4.2 Set the background color of subMenuEl to the value stored in the --sub-menu-bg CSS custom property. //* done
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)';

// 4.3 Add the class of flex-around to the subMenuEl element. //* done
subMenuEl.classList.add('flex-around');

//4.4 Set the CSS position property of subMenuEl to the value of absolute. //* done
subMenuEl.style.position = 'absolute';

// 4.5 Set the CSS top property of subMenuElto the value of 0. //* done
subMenuEl.style.top = '0';

// Update the menuLinksarray in script.js to this: //* done above

// 5.1 Select and cache the all of the <a>elements inside of topMenuElin a variable named topMenuLinks. //* done
// Declare a global showing SubMenuvariable and initialize it to false;
const topMenuLinks = topMenuEl.querySelectorAll('a');
let showingSubMenu = false;
console.log(topMenuEl);
console.log(topMenuLinks);
console.log(subMenuEl);


// 5.2 Attach a delegated 'click' event listener to topMenuEl.
// The first line of code of the event listener function should call the event object's preventDefault()method.
// The second line of code function should immediately return if the element clicked was not an <a>element.
// console.logthe content of the <a>to verify the handler is working.

topMenuEl.addEventListener('click', handleTopMenu);

// below is the function for handling the top menu
function handleTopMenu(e) {
  e.preventDefault();

    // return if the clicked property is not an <a>
    if(e.target.localName !== 'a') return;

    // checks to see if the target is 'active' and sets 'showingSubMenu' accordingly
    if(e.target.classList.contains('active')) {
      e.target.classList.remove('active');
      showingSubMenu = false;
      subMenuEl.style.top = 0;

      return;
    }

    // below removes the 'active' class from all '<a>' elements in topMenuLinks
    // Removes the 'active' class from all '<a>' elements in topMenuLinks
	topMenuLinks.forEach(link => link.classList.remove('active'));

	// Adds the 'active' class to the clicked element
	e.target.classList.add('active');
	showingSubMenu = true;

	// Searches for the clicked element to determine if it contains 'subLinks, and returns the element/object and sets the 'showingSubMenu' accordingly
	function findLink(link) {
		if (e.target.textContent === link.text && link.subLinks) {
			showingSubMenu = true;
			return link.subLinks;
		} else {
			showingSubMenu = false;

			// Displays 'Congrats' within the body's '<h1>' tag if the clicked element is the 'About' tab
			if (e.target.textContent === 'about') {
				const congrats = mainEl.querySelector('h1');
				congrats.textContent = 'Congrats!';
			}
			return;
		}
	}

	// Cache the returned object from the 'findLink' function call
	const subLinks = menuLinks.find(findLink);

	// Task 5.7 - Build the Sub-menu from the returned 'subLinks' object
	if (showingSubMenu === true) {
		buildSubMenu(subLinks);
		subMenuEl.style.top = '100%';
	} else subMenuEl.style.top = '0';
}

// Task 5.8 - Builds the Sub-menu
function buildSubMenu(subLinks) {
	// Clear the contents of the existing sub-menue
	subMenuEl.innerHTML = null;

	subLinks.subLinks.forEach(link => {
		const newLink = document.createElement('a');
		newLink.setAttribute('href', link.href);
		newLink.textContent = link.text;
		subMenuEl.appendChild(newLink);
	});
}

// Task 6.0 - Add a 'click' event listener
subMenuEl.addEventListener('click', handleSubMenu);

// Function for handling 'subMenuEl' events
function handleSubMenu(e) {
	e.preventDefault();

	// Return if the clicked element is not an '<a>'
	if (e.target.localName !== 'a') return;
	console.log(e.target);

	// Task 6.1 - Set showingSubMenu to false
	showingSubMenu = false;
	subMenuEl.style.top = '0';

	// Task 6.2 - Remove active classes
	topMenuLinks.forEach(link => link.classList.remove('active'));

	// Task 6.3 - Update the contents of mainEl
	let content = mainEl.querySelector('h1');
	content.textContent = e.target.textContent.toUpperCase();
	console.log(content);
}